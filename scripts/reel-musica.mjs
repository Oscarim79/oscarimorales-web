#!/usr/bin/env node
// Música de fondo para un video corto — Secundum Fidem · Oscar I. Morales
//   1. Genera con ElevenLabs una pieza instrumental del largo del video (<carpeta>/musica.mp3),
//      a partir del campo `musica` de guion.json. Si ya existe, la reutiliza.
//   2. La mezcla debajo de la voz, sin volver a generar las imágenes.
//
// Uso:
//   node scripts/reel-musica.mjs recursos/video/<NNN-slug> --video vista-previa/reel.mp4 --salida vista-previa/reel-con-musica.mp4
//   --nivel 0.4     volumen de la música (por defecto 0.4)
//   --nueva         genera otra pieza aunque ya exista una
//
// Condiciones (plan Starter, Music Terms de ElevenLabs, oct-2026): uso comercial permitido salvo cine,
// TV, radio y videojuegos; sin crédito obligatorio; no subirla sola a plataformas de música; respetar
// la etiqueta de IA de cada red; no pedir artistas ni canciones concretas en la descripción.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const argv = process.argv.slice(2);
const opt = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--nueva') opt.nueva = true;
  else if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i];
  else pos.push(argv[i]);
}
if (!pos.length || !opt.video || !opt.salida) {
  console.error('Uso: node scripts/reel-musica.mjs recursos/video/<NNN-slug> --video <entrada.mp4> --salida <salida.mp4> [--nivel 0.4] [--nueva]');
  process.exit(1);
}

const DIR = path.resolve(pos[0]);
const guion = JSON.parse(fs.readFileSync(path.join(DIR, 'guion.json'), 'utf8'));
const tiempos = JSON.parse(fs.readFileSync(path.join(DIR, 'tiempos.json'), 'utf8'));
const MUSICA = path.join(DIR, 'musica.mp3');
const NIVEL = Number(opt.nivel || 0.4);
const herramienta = n => {
  const w = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Links', `${n}.exe`);
  return fs.existsSync(w) ? w : n;
};

if (!guion.musica) { console.error('✗ Falta el campo "musica" en guion.json'); process.exit(1); }

if (opt.nueva || !fs.existsSync(MUSICA)) {
  const linea = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').match(/^ELEVENLABS_API_KEY=(.*)$/m);
  const clave = linea ? linea[1].trim() : '';
  if (!clave) { console.error('✗ Falta la clave en .env.local'); process.exit(1); }
  const ms = Math.ceil((tiempos.duracion + 3) * 1000);
  const res = await fetch('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', {
    method: 'POST',
    headers: { 'xi-api-key': clave, 'content-type': 'application/json' },
    body: JSON.stringify({ prompt: guion.musica, music_length_ms: ms, force_instrumental: true }),
  });
  if (!res.ok) {
    console.error(`✗ ElevenLabs respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }
  fs.writeFileSync(MUSICA, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ Música generada (${(ms / 1000).toFixed(0)} s)`);
}

// La música baja sola cuando habla la voz y se apaga al final
const fin = tiempos.duracion + 1.8;
const filtro = [
  `[1:a]aresample=44100,aformat=channel_layouts=stereo,loudnorm=I=-20:TP=-3:LRA=7,aresample=44100,atrim=0:${fin.toFixed(2)},volume=${NIVEL},afade=t=in:d=1.5,afade=t=out:st=${(fin - 2.5).toFixed(2)}:d=2.5[m]`,
  `[0:a]aresample=44100,aformat=channel_layouts=stereo,apad=whole_dur=${fin.toFixed(2)},asplit=2[v1][v2]`,
  '[m][v1]sidechaincompress=threshold=0.03:ratio=4:attack=30:release=500[md]',
  '[v2][md]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]',
].join(';');
const salida = path.resolve(opt.salida);
const r = spawnSync(herramienta('ffmpeg'), ['-y', '-v', 'error', '-i', path.resolve(opt.video), '-i', MUSICA,
  '-filter_complex', filtro, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-movflags', '+faststart', salida], { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status || 1);
console.log(`✓ Video con música: ${salida} (${(fs.statSync(salida).size / 1e6).toFixed(1)} MB)`);
