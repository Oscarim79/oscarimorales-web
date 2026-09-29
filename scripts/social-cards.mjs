#!/usr/bin/env node
// Tarjetas para redes de un post — Secundum Fidem · Oscar I. Morales
//   · post.jpg      1080×1080 → publicación cuadrada del feed (Instagram / Facebook)
//   · historia.jpg  1080×1920 → Historia de Instagram (con espacio libre para el sticker de enlace)
//
// Uso:
//   node scripts/social-cards.mjs <n | ruta/al/post.md> [--frase "Renglón 1|Renglón 2|*énfasis*"]
//                                 [--solo post|historia] [--tam 80] [--fonts <carpeta node_modules>]
//
//   --frase   El texto grande de la tarjeta. «|» parte el renglón; *palabras* salen en terracota.
//             Se guarda en recursos/social/<NNN>-<slug>/frase.txt, así que la próxima vez basta
//             con `node scripts/social-cards.mjs 57`. Sin --frase ni frase.txt usa el `quote` del post.
//   --solo    Genera un solo formato.
//   --tam     Fuerza el tamaño de letra (px). Por defecto se calcula según el largo de la frase.
//   --fonts   Carpeta node_modules que contenga @fontsource/playfair-display y @fontsource/montserrat.
//             Si no se indica, se busca en FONTS_DIR, ./node_modules y en la carpeta temporal; si
//             tampoco están, se instalan desde npm (Google Fonts suele estar bloqueado en sesiones
//             remotas de Claude Code).
//
// Requisitos: Node 18+ y Playwright con Chromium (npm i -g playwright && npx playwright install chromium).
// Diseño editable en recursos/social/plantilla.html. Guía completa: recursos/social/README.md
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = path.join(ROOT, 'content', 'posts');
const SOCIAL = path.join(ROOT, 'recursos', 'social');
const SITIO = 'oscarimorales.com';
const FORMATOS = {
  post: { w: 1080, h: 1080, archivo: 'post.jpg' },
  historia: { w: 1080, h: 1920, archivo: 'historia.jpg' },
};
const FUENTES = [ // [paquete fontsource, peso, estilo, familia CSS]
  ['playfair-display', 400, 'italic', 'Playfair Display'],
  ['montserrat', 700, 'normal', 'Montserrat'],
  ['montserrat', 800, 'normal', 'Montserrat'],
];

function uso(msg) {
  if (msg) console.error(`✗ ${msg}\n`);
  console.error('Uso: node scripts/social-cards.mjs <n | ruta/al/post.md> [--frase "Renglón 1|Renglón 2|*énfasis*"] [--solo post|historia] [--tam 80] [--fonts <node_modules>]');
  process.exit(1);
}

// ── argumentos ────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const opt = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i]; else pos.push(argv[i]);
}
if (!pos.length) uso();
if (opt.solo && !FORMATOS[opt.solo]) uso(`--solo debe ser "post" o "historia" (recibí "${opt.solo}")`);

// ── el post ───────────────────────────────────────────────────────────────────
function buscarPost(arg) {
  if (/\.md$/i.test(arg)) return path.resolve(arg);
  if (/^\d+$/.test(arg)) {
    const nnn = arg.padStart(3, '0');
    const f = fs.readdirSync(POSTS).find(x => x.startsWith(nnn + '-') && x.endsWith('.md'));
    if (f) return path.join(POSTS, f);
  }
  uso(`No encuentro el post "${arg}" en content/posts/ (solo los posts .md; los importados de WordPress son .html).`);
}
function leerFrontmatter(file) {
  const m = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) uso('El post no tiene frontmatter.');
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const k = line.match(/^(\w+):\s*(.*)$/);
    if (!k) continue;
    try { fm[k[1]] = JSON.parse(k[2]); } catch { fm[k[1]] = k[2]; }
  }
  return fm;
}

// ── tipografías de marca ──────────────────────────────────────────────────────
const fuenteEn = (base, slug, w, st) => path.join(base, '@fontsource', slug, 'files', `${slug}-latin-${w}-${st}.woff2`);
const tieneFuentes = base => FUENTES.every(([slug, w, st]) => fs.existsSync(fuenteEn(base, slug, w, st)));
const cssLocal = base => FUENTES.map(([slug, w, st, fam]) =>
  `@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url(${pathToFileURL(fuenteEn(base, slug, w, st)).href}) format('woff2');}`).join('\n');
function prepararFuentes(pedida) {
  const tmp = path.join(os.tmpdir(), 'secundum-fuentes');
  for (const c of [pedida, process.env.FONTS_DIR, path.join(ROOT, 'node_modules'), path.join(tmp, 'node_modules')].filter(Boolean)) {
    if (tieneFuentes(c)) return cssLocal(c);
  }
  try {
    console.log('Instalando las tipografías de marca desde npm (una sola vez)…');
    fs.mkdirSync(tmp, { recursive: true });
    execSync(`npm i --silent --no-save --prefix "${tmp}" @fontsource/playfair-display @fontsource/montserrat`, { stdio: 'inherit', timeout: 180000 });
    if (tieneFuentes(path.join(tmp, 'node_modules'))) return cssLocal(path.join(tmp, 'node_modules'));
  } catch (e) { console.warn('⚠ No pude instalar las tipografías desde npm:', e.message); }
  console.warn('⚠ Uso Google Fonts (necesita internet); si está bloqueado saldrán tipografías de reemplazo.');
  return "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=Montserrat:wght@700;800&display=swap');";
}

// ── la frase ──────────────────────────────────────────────────────────────────
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fraseHtml = f => f.split('|').map(l => esc(l.trim()).replace(/\*(.+?)\*/g, '<em>$1</em>')).join('<br>');
function tamFrase(frase) { // tamaño según el renglón más largo (o el total si no hay saltos)
  const lineas = frase.split('|').map(l => l.replace(/\*/g, '').trim());
  if (lineas.length > 1) { const L = Math.max(...lineas.map(l => l.length)); return L <= 26 ? 80 : L <= 30 ? 72 : L <= 36 ? 62 : 54; }
  const n = lineas[0].length; return n <= 60 ? 72 : n <= 100 ? 60 : n <= 140 ? 52 : 46;
}

// ── Playwright (local o global) ───────────────────────────────────────────────
function cargarPlaywright() {
  const intentar = req => { for (const n of ['playwright', 'playwright-core']) { try { return req(n); } catch { /* sigue */ } } return null; };
  let pw = intentar(createRequire(import.meta.url));
  if (!pw) { try { pw = intentar(createRequire(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'x.js'))); } catch { /* sin npm */ } }
  if (!pw) uso('No encuentro Playwright. Instálalo con: npm i -g playwright && npx playwright install chromium');
  return pw;
}

// ── main ──────────────────────────────────────────────────────────────────────
const file = buscarPost(pos[0]);
const fm = leerFrontmatter(file);
const base = path.basename(file, '.md');
const salida = path.join(SOCIAL, base);
fs.mkdirSync(salida, { recursive: true });

let frase = opt.frase;
const fraseFile = path.join(salida, 'frase.txt');
if (frase) fs.writeFileSync(fraseFile, frase.trim() + '\n');
else if (fs.existsSync(fraseFile)) frase = fs.readFileSync(fraseFile, 'utf8').trim();
else if (fm.quote) { frase = fm.quote; console.warn('⚠ Sin --frase: uso la frase-ancla (`quote`) del post.'); }
else uso('Falta la frase: usa --frase "Renglón 1|Renglón 2|*énfasis*"');

if (!fm.cover || fm.cover === 'auto') uso('Este post no tiene portada de imagen (cover: "auto"); las tarjetas usan la portada como fondo.');
const cover = path.join(ROOT, fm.cover);
if (!fs.existsSync(cover)) uso(`No existe la portada: ${fm.cover}`);

const plantilla = fs.readFileSync(path.join(SOCIAL, 'plantilla.html'), 'utf8');
const fontsCss = prepararFuentes(opt.fonts);
const tam = Number(opt.tam) || tamFrase(frase);
const lineasEsperadas = frase.split('|').length;
const tmp = path.join(os.tmpdir(), 'secundum-social'); fs.mkdirSync(tmp, { recursive: true });

const { chromium } = cargarPlaywright();
const browser = await chromium.launch({ args: ['--no-sandbox', '--allow-file-access-from-files'] });
let avisos = 0;
try {
  for (const [nombre, f] of Object.entries(FORMATOS)) {
    if (opt.solo && opt.solo !== nombre) continue;
    const html = plantilla
      .replaceAll('{{FONTS_CSS}}', fontsCss).replaceAll('{{FORMATO}}', nombre)
      .replaceAll('{{COVER}}', pathToFileURL(cover).href)
      .replaceAll('{{ICON}}', pathToFileURL(path.join(SOCIAL, 'assets', 'icono-crema.png')).href)
      .replaceAll('{{NUM}}', `N.º ${fm.n ?? ''}`.trim()).replaceAll('{{FRASE}}', fraseHtml(frase))
      .replaceAll('{{Q_SIZE}}', String(tam)).replaceAll('{{SITIO}}', SITIO);
    const htmlFile = path.join(tmp, `${base}-${nombre}.html`);
    fs.writeFileSync(htmlFile, html);

    const page = await browser.newPage({ viewport: { width: f.w, height: f.h }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlFile).href, { waitUntil: 'load' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    });
    await page.waitForTimeout(250);
    const m = await page.evaluate(() => {
      const q = document.querySelector('.q').getBoundingClientRect();
      return { top: q.top, alto: q.height, fs: parseFloat(getComputedStyle(document.querySelector('.q')).fontSize) };
    });
    const lineas = Math.round(m.alto / (m.fs * 1.14));
    if (lineas > lineasEsperadas) { console.warn(`⚠ [${nombre}] un renglón se parte solo (${lineas} líneas en vez de ${lineasEsperadas}): acorta la frase o baja --tam.`); avisos++; }
    if (nombre === 'post' && m.top < 600) { console.warn(`⚠ [post] la frase sube demasiado (${Math.round(m.top)} px) y tapará al sujeto de la foto: acórtala o baja --tam.`); avisos++; }
    const destino = path.join(salida, f.archivo);
    await page.screenshot({ path: destino, type: 'jpeg', quality: 92 });
    await page.close();
    console.log(`✓ ${path.relative(ROOT, destino)}  ${f.w}×${f.h}  ${Math.round(fs.statSync(destino).size / 1024)} KB  (letra ${tam}px)`);
  }
} finally { await browser.close(); }
console.log(avisos ? `\nTerminó con ${avisos} aviso(s): MIRA las imágenes antes de enviarlas.` : '\nListo. MIRA las imágenes (Read) antes de enviarlas a Oscar.');
