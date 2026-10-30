#!/usr/bin/env node
// Convierte las escenas de un video corto en un .mp4 vertical — Secundum Fidem · Oscar I. Morales
//
// Uso:
//   node scripts/reel-render.mjs recursos/video/<NNN-slug> [--salida vista-previa/reel.mp4] [--fps 30]
//   node scripts/reel-render.mjs recursos/video/<NNN-slug> --cuadros 2,9.5,20 --salida <carpeta>
//
// Abre <carpeta>/escenas.html en Chromium, le pide cada cuadro con seek(t) y se los pasa a FFmpeg
// junto con voz.mp3. Con --cuadros solo guarda esas imágenes, para revisar sin esperar el video.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execSync, spawn } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CIERRE = 1.8; // segundos de imagen después de que termina la voz

const argv = process.argv.slice(2);
const opt = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i]; else pos.push(argv[i]);
}
if (!pos.length) { console.error('Uso: node scripts/reel-render.mjs recursos/video/<NNN-slug> [--salida archivo.mp4] [--fps 30] [--cuadros 2,9.5]'); process.exit(1); }

const DIR = path.resolve(pos[0]);
const FPS = Number(opt.fps || 30);
const tiempos = JSON.parse(fs.readFileSync(path.join(DIR, 'tiempos.json'), 'utf8'));
const mapa = JSON.parse(fs.readFileSync(path.join(ROOT, 'recursos', 'video', '_comun', 'mapa.json'), 'utf8'));
const FIN = tiempos.duracion + CIERRE;

function playwright() {
  const raices = [ROOT, execSync('npm root -g').toString().trim(), path.join(os.homedir(), '.claude', 'skills', 'gstack')];
  for (const r of raices) {
    const q = createRequire(path.join(r, 'x.js'));
    for (const n of ['playwright', 'playwright-core']) { try { return q(n); } catch { /* sigue */ } }
  }
  console.error('✗ No encuentro Playwright'); process.exit(1);
}
function ffmpeg() {
  const winget = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Links', 'ffmpeg.exe');
  return fs.existsSync(winget) ? winget : 'ffmpeg';
}

const browser = await playwright().chromium.launch();
const pagina = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
pagina.on('pageerror', e => { console.error('✗ Error en escenas.html:', e.message); process.exit(1); });
await pagina.addInitScript(`window.TIEMPOS=${JSON.stringify(tiempos)};window.MAPA=${JSON.stringify(mapa)};window.FIN=${FIN};`);
await pagina.goto(pathToFileURL(path.join(DIR, 'escenas.html')).href);
await pagina.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map(i => i.decode()));
});

if (opt.cuadros) {
  const carpeta = path.resolve(opt.salida || path.join(DIR, 'cuadros'));
  fs.mkdirSync(carpeta, { recursive: true });
  for (const t of opt.cuadros.split(',').map(Number)) {
    await pagina.evaluate(x => window.seek(x), t);
    const f = path.join(carpeta, `t${String(t).padStart(5, '0')}.jpg`);
    await pagina.screenshot({ path: f, type: 'jpeg', quality: 80 });
    console.log(f);
  }
  await browser.close();
  process.exit(0);
}

const salida = path.resolve(opt.salida || path.join(DIR, 'reel.mp4'));
fs.mkdirSync(path.dirname(salida), { recursive: true });
const ff = spawn(ffmpeg(), [
  '-y', '-v', 'error',
  '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', 'pipe:0',
  '-i', path.join(DIR, 'voz.mp3'),
  '-map', '0:v', '-map', '1:a', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11',
  '-vf', 'scale=in_range=pc:out_range=tv,format=yuv420p', '-color_range', 'tv',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '19',
  '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-movflags', '+faststart', salida,
], { stdio: ['pipe', 'inherit', 'inherit'] });
const cerrado = new Promise((ok, mal) => ff.on('close', c => (c === 0 ? ok() : mal(new Error(`FFmpeg terminó con código ${c}`)))));

const total = Math.ceil(FIN * FPS);
const inicio = Date.now();
for (let i = 0; i < total; i++) {
  await pagina.evaluate(x => window.seek(x), i / FPS);
  const cuadro = await pagina.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(cuadro)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 150 === 0) console.log(`  cuadro ${i}/${total} · ${((Date.now() - inicio) / 1000).toFixed(0)} s`);
}
ff.stdin.end();
await cerrado;
await browser.close();
console.log(`✓ Video listo: ${salida} (${FIN.toFixed(1)} s, ${(fs.statSync(salida).size / 1e6).toFixed(1)} MB)`);
