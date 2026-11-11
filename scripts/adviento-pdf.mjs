#!/usr/bin/env node
// Calendario de Adviento para llevar en familia — imprime y verifica los PDF.
//
// Uso:
//   node scripts/adviento-pdf.mjs                 → imprime todos los recursos/adviento/src/*.html
//                                                   (menos los que empiezan con «_»)
//   node scripts/adviento-pdf.mjs adviento-01-esperanza [otro…]
//
// Cada recursos/adviento/src/<nombre>.html se imprime a recursos/adviento/<nombre>.pdf
// (tamaño carta) y se verifica:
//   · páginas: 4 por sesión, 2 para la guía (adviento-00-*)
//   · peso: menos de 1 MB
//   · lectura en voz alta: el texto marcado con data-leer suma 950 palabras o menos,
//     y el marcado data-leer="historia" 420 o menos (≈ 10 minutos por sesión).
// Sale con código 1 si algo falla. Requisitos: Node 18+ y Playwright con Chromium.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'recursos', 'adviento', 'src');
const OUT = path.join(ROOT, 'recursos', 'adviento');
const LIMITE = { bytes: 1024 * 1024, leer: 950, historia: 420 };
const paginasEsperadas = nombre => (nombre.startsWith('adviento-00-') ? 2 : 4);

// ── tipografías de marca (locales, sin depender de Google Fonts) ───────────────
const FUENTES = [ // [paquete fontsource, peso, estilo, familia CSS]
  ['playfair-display', 400, 'italic', 'Playfair Display'],
  ['playfair-display', 600, 'normal', 'Playfair Display'],
  ['playfair-display', 700, 'normal', 'Playfair Display'],
  ['spectral', 400, 'normal', 'Spectral'],
  ['spectral', 400, 'italic', 'Spectral'],
  ['spectral', 600, 'normal', 'Spectral'],
  ['montserrat', 700, 'normal', 'Montserrat'],
  ['montserrat', 800, 'normal', 'Montserrat'],
];
const PAQUETES = [...new Set(FUENTES.map(f => `@fontsource/${f[0]}`))];
const fuenteEn = (base, slug, w, st) => path.join(base, '@fontsource', slug, 'files', `${slug}-latin-${w}-${st}.woff2`);
const tieneFuentes = base => FUENTES.every(([slug, w, st]) => fs.existsSync(fuenteEn(base, slug, w, st)));
const cssLocal = base => FUENTES.map(([slug, w, st, fam]) =>
  `@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url(${pathToFileURL(fuenteEn(base, slug, w, st)).href}) format('woff2');}`).join('\n');
function prepararFuentes() {
  const tmp = path.join(os.tmpdir(), 'secundum-fuentes');
  for (const c of [process.env.FONTS_DIR, path.join(ROOT, 'node_modules'), path.join(tmp, 'node_modules')].filter(Boolean)) {
    if (tieneFuentes(c)) return cssLocal(c);
  }
  console.log('Instalando las tipografías de marca desde npm (una sola vez)…');
  fs.mkdirSync(tmp, { recursive: true });
  execSync(`npm i --silent --no-save --prefix "${tmp}" ${PAQUETES.join(' ')}`, { stdio: 'inherit', timeout: 180000 });
  if (!tieneFuentes(path.join(tmp, 'node_modules'))) throw new Error('No pude instalar las tipografías de marca.');
  return cssLocal(path.join(tmp, 'node_modules'));
}

function cargarPlaywright() {
  const intentar = req => { for (const n of ['playwright', 'playwright-core']) { try { return req(n); } catch { /* sigue */ } } return null; };
  let pw = intentar(createRequire(import.meta.url));
  if (!pw) { try { pw = intentar(createRequire(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'x.js'))); } catch { /* sin npm */ } }
  if (!pw) { console.error('No encuentro Playwright. Instálalo con: npm i -g playwright && npx playwright install chromium'); process.exit(1); }
  return pw;
}

const contarPaginas = buf => (buf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length;
const palabras = t => (t.trim().match(/\S+/g) || []).length;

// ── main ──────────────────────────────────────────────────────────────────────
const pedidos = process.argv.slice(2).map(a => path.basename(a).replace(/\.(html|pdf)$/i, ''));
const nombres = pedidos.length ? pedidos
  : fs.readdirSync(SRC).filter(f => f.endsWith('.html') && !f.startsWith('_')).map(f => f.replace(/\.html$/, '')).sort();
if (!nombres.length) { console.error('No hay HTML que imprimir en', SRC); process.exit(1); }

const fuentesCss = prepararFuentes();
const { chromium } = cargarPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 816, height: 1056 } }); // carta a 96 ppp
let fallos = 0;

for (const nombre of nombres) {
  const html = path.join(SRC, `${nombre}.html`);
  if (!fs.existsSync(html)) { console.error(`❌ No existe ${path.relative(ROOT, html)}`); fallos++; continue; }
  await page.goto(pathToFileURL(html).href, { waitUntil: 'load' });
  await page.addStyleTag({ content: fuentesCss });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  // Alto de cada hoja en pulgadas: una hoja de más de 11 in se parte en dos páginas.
  const altos = await page.$$eval('.hoja', els => els.map(e => e.getBoundingClientRect().height / 96));

  const conteo = await page.$$eval('[data-leer]', els => els.map(e => [e.dataset.leer, e.innerText]));
  let leer = 0, historia = 0;
  for (const [tipo, txt] of conteo) { const n = palabras(txt); leer += n; if (tipo === 'historia') historia += n; }

  const pdf = path.join(OUT, `${nombre}.pdf`);
  // Fecha fija (mismo largo que la real): el PDF sale idéntico si el contenido no cambió,
  // y git no ve cambios cada vez que se corre el script.
  const buf = Buffer.from((await page.pdf({ format: 'Letter', printBackground: true, preferCSSPageSize: true }))
    .toString('latin1').replace(/\/(CreationDate|ModDate) \(D:\d{14}/g, '/$1 (D:20261129000000'), 'latin1');
  fs.writeFileSync(pdf, buf);
  const pags = contarPaginas(buf);

  const errores = [];
  if (pags !== paginasEsperadas(nombre)) {
    const largas = altos.map((h, i) => [i + 1, h]).filter(([, h]) => h > 11).map(([i, h]) => `hoja ${i} mide ${h.toFixed(2)} in`);
    errores.push(`${pags} págs (se esperaban ${paginasEsperadas(nombre)})` + (largas.length ? ` [${largas.join(', ')}; el máximo es 11 in]` : ''));
  }
  if (buf.length >= LIMITE.bytes) errores.push(`pesa ${(buf.length / 1048576).toFixed(2)} MB`);
  if (leer > LIMITE.leer) errores.push(`leer ${leer} > ${LIMITE.leer}`);
  if (historia > LIMITE.historia) errores.push(`historia ${historia} > ${LIMITE.historia}`);

  const resumen = `${nombre}.pdf · ${pags} págs · ${Math.round(buf.length / 1024)} KB · leer: ${leer} palabras (historia ${historia})`;
  if (errores.length) { fallos++; console.log(`❌ ${resumen} → ${errores.join('; ')}`); }
  else console.log(`✅ ${resumen}`);
}

await browser.close();
process.exit(fallos ? 1 : 0);
