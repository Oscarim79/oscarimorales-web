#!/usr/bin/env node
// Hornea el mapa ilustrado de Europa para los videos cortos — Secundum Fidem · Oscar I. Morales
//   · recursos/video/_comun/mapa-europa.jpg   el mapa grande (costas de Natural Earth, dominio público)
//   · recursos/video/_comun/zona-<id>.png     manchas de color recortadas a la tierra firme
//   · recursos/video/_comun/mapa.json         medidas y dónde cae cada lugar
//
// Solo hace falta correrlo una vez, o al agregar lugares o zonas.
// Uso: REEL_DEPS=<carpeta con d3-geo, topojson-client y world-atlas> node scripts/reel-mapa.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COMUN = path.join(ROOT, 'recursos', 'video', '_comun');
const DEPS = process.env.REEL_DEPS;
if (!DEPS) { console.error('✗ Falta REEL_DEPS'); process.exit(1); }

const req = createRequire(path.join(DEPS, 'x.js'));
const { geoConicConformal, geoPath, geoGraticule } = await import(new URL(`file:///${req.resolve('d3-geo').replaceAll('\\', '/')}`));
const { feature } = await import(new URL(`file:///${req.resolve('topojson-client').replaceAll('\\', '/')}`));
const atlas = JSON.parse(fs.readFileSync(path.join(DEPS, 'node_modules', 'world-atlas', 'land-50m.json'), 'utf8'));

function playwright() {
  const raices = [ROOT, execSync('npm root -g').toString().trim(), path.join(os.homedir(), '.claude', 'skills', 'gstack')];
  for (const r of raices) {
    const q = createRequire(path.join(r, 'x.js'));
    for (const n of ['playwright', 'playwright-core']) { try { return q(n); } catch { /* sigue */ } }
  }
  console.error('✗ No encuentro Playwright'); process.exit(1);
}

const W = 4800, H = 6000;
const proy = geoConicConformal().parallels([40, 60]).rotate([-10, 0]).center([0, 49]).scale(6400).translate([W / 2, H / 2]);
const KM = proy.scale() / 6371; // píxeles por kilómetro, aproximado en el centro

const tierra = feature(atlas, atlas.objects.land);
const camino = geoPath(proy);
const costa = camino(tierra);
const retícula = camino(geoGraticule().step([5, 5])());

const LUGARES = {
  roma: [12.48, 41.9], inglaterra: [-1.6, 52.6], alemania: [9.8, 50.8], irlanda: [-8.0, 53.2],
  wittenberg: [12.65, 51.87], europa: [8, 48.5],
};
const ZONAS = [
  { id: 'roma', lugar: 'roma', km: 210, color: '#C47E5A' },
  { id: 'inglaterra', lugar: 'inglaterra', km: 290, color: '#C47E5A' },
  { id: 'alemania', lugar: 'alemania', km: 340, color: '#C47E5A' },
  { id: 'irlanda', lugar: 'irlanda', km: 240, color: '#2F7A68' },
];

const SVG_DEF = `<clipPath id="tierra"><path d="${costa}"/></clipPath>`;
const mapa = `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0}body{background:#0D1B2A}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${SVG_DEF}
<clipPath id="marfuera"><path d="M0 0H${W}V${H}H0Z${costa}" clip-rule="evenodd"/></clipPath>
<radialGradient id="mar" cx="50%" cy="46%" r="72%"><stop offset="0" stop-color="#1D3E58"/><stop offset=".62" stop-color="#14304A"/><stop offset="1" stop-color="#0D1B2A"/></radialGradient>
<filter id="papel" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".0016" numOctaves="5" seed="7"/><feColorMatrix values="0 0 0 0 .42  0 0 0 0 .27  0 0 0 0 .14  1.5 0 0 0 -.62"/></filter>
<filter id="grano" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".32" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .2  0 0 0 0 .1  .9 0 0 0 -.38"/></filter>
<filter id="suave"><feGaussianBlur stdDeviation="22"/></filter>
</defs>
<!-- La tierra se pinta en todo el lienzo y el mar la tapa: Chromium no recorta los filtros con clip-path a este tamaño -->
<rect width="${W}" height="${H}" fill="#E7D4AE"/>
<rect width="${W}" height="${H}" filter="url(#papel)"/>
<rect width="${W}" height="${H}" filter="url(#grano)" opacity=".55"/>
<path d="${retícula}" fill="none" stroke="#5A3F2B" stroke-opacity=".12" stroke-width="3"/>
<path d="${costa}" fill="none" stroke="#9C6F45" stroke-width="46" stroke-opacity=".55" filter="url(#suave)"/>
<path d="M0 0H${W}V${H}H0Z${costa}" fill="url(#mar)" fill-rule="evenodd"/>
<path d="M0 0H${W}V${H}H0Z${costa}" fill="none"/>
<g clip-path="url(#marfuera)" fill="none">
  <path d="${retícula}" stroke="#F5F0E8" stroke-opacity=".07" stroke-width="3"/>
  <g stroke="#DFAA94" stroke-linejoin="round">
    <path d="${costa}" stroke-width="130" stroke-opacity=".05"/>
    <path d="${costa}" stroke-width="84" stroke-opacity=".07"/>
    <path d="${costa}" stroke-width="42" stroke-opacity=".10"/>
  </g>
</g>
<path d="${costa}" fill="none" stroke="#3B2A1E" stroke-width="4.5" stroke-linejoin="round"/>
</svg></body></html>`;

const browser = await playwright().chromium.launch();
const pagina = await browser.newPage({ viewport: { width: W, height: H } });
await pagina.setContent(mapa, { waitUntil: 'load' });
await pagina.screenshot({ path: path.join(COMUN, 'mapa-europa.jpg'), type: 'jpeg', quality: 86, timeout: 280000 });

const zonas = {};
for (const z of ZONAS) {
  const [cx, cy] = proy(LUGARES[z.lugar]);
  const r = z.km * KM;
  const x = Math.max(0, Math.round(cx - r)), y = Math.max(0, Math.round(cy - r));
  const lado = Math.round(r * 2);
  await pagina.setContent(`<!doctype html><html><head><style>*{margin:0}html,body{background:transparent}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${SVG_DEF}
<radialGradient id="g"><stop offset="0" stop-color="${z.color}" stop-opacity=".88"/><stop offset=".74" stop-color="${z.color}" stop-opacity=".78"/><stop offset="1" stop-color="${z.color}" stop-opacity="0"/></radialGradient></defs>
<g clip-path="url(#tierra)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g)"/></g></svg></body></html>`, { waitUntil: 'load' });
  await pagina.screenshot({ path: path.join(COMUN, `zona-${z.id}.png`), omitBackground: true, clip: { x, y, width: lado, height: lado }, timeout: 120000 });
  zonas[z.id] = { x, y, lado };
}
await browser.close();

const lugares = Object.fromEntries(Object.entries(LUGARES).map(([k, v]) => [k, proy(v).map(Math.round)]));
fs.writeFileSync(path.join(COMUN, 'mapa.json'), JSON.stringify({ W, H, lugares, zonas }, null, 1));
console.log('✓ Mapa horneado', lugares);
