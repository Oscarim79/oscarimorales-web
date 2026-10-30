#!/usr/bin/env node
// Voz de un video corto con ElevenLabs — Secundum Fidem · Oscar I. Morales
//   · voz.mp3       la narración
//   · tiempos.json  cada palabra con su segundo de inicio y fin, y dónde empieza cada escena
//
// Uso:
//   node scripts/reel-voz.mjs recursos/video/<NNN-slug> [--velocidad 1.0]
//
// El guion vive en <carpeta>/guion.json. En el texto, {609|seiscientos nueve} significa:
// en pantalla sale «609» y la voz lee «seiscientos nueve». Sirve para números y para
// palabras que la voz pronuncia mal ({Samhain|Sáuin}).
// La clave se lee de .env.local (ver scripts/revisar-elevenlabs.mjs) y nunca se imprime.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODELO = 'eleven_multilingual_v2';

const argv = process.argv.slice(2);
const opt = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i]; else pos.push(argv[i]);
}
if (!pos.length) { console.error('Uso: node scripts/reel-voz.mjs recursos/video/<NNN-slug> [--velocidad 1.0]'); process.exit(1); }

const DIR = path.resolve(pos[0]);
const guion = JSON.parse(fs.readFileSync(path.join(DIR, 'guion.json'), 'utf8'));
const linea = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').match(/^ELEVENLABS_API_KEY=(.*)$/m);
const clave = linea ? linea[1].trim() : '';
if (!clave) { console.error('✗ Falta la clave en .env.local'); process.exit(1); }

// ── guion → texto hablado + palabras en pantalla ──────────────────────────────
let hablado = '';
const palabras = [];
const escenas = [];
for (const e of guion.escenas) {
  const desde = palabras.length;
  for (const crudo of e.texto.trim().split(/\s+(?![^{]*\})/)) {
    const pantalla = crudo.replace(/\{([^|}]*)\|[^}]*\}/g, '$1');
    const voz = crudo.replace(/\{[^|}]*\|([^}]*)\}/g, '$1');
    if (hablado) hablado += ' ';
    palabras.push({ texto: pantalla, escena: e.id, ini: hablado.length, fin: hablado.length + voz.length });
    hablado += voz;
  }
  escenas.push({ id: e.id, desde, hasta: palabras.length });
}

// ── ElevenLabs ────────────────────────────────────────────────────────────────
const res = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${guion.voz}/with-timestamps?output_format=mp3_44100_128`,
  {
    method: 'POST',
    headers: { 'xi-api-key': clave, 'content-type': 'application/json' },
    body: JSON.stringify({
      text: hablado,
      model_id: MODELO,
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true, speed: Number(opt.velocidad || 1) },
    }),
  },
);
if (!res.ok) {
  console.error(`✗ ElevenLabs respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}
const { audio_base64, alignment } = await res.json();
fs.writeFileSync(path.join(DIR, 'voz.mp3'), Buffer.from(audio_base64, 'base64'));

// ── tiempos de cada palabra ───────────────────────────────────────────────────
const ini = alignment.character_start_times_seconds;
const fin = alignment.character_end_times_seconds;
const salida = palabras.map(p => ({ texto: p.texto, escena: p.escena, ini: ini[p.ini], fin: fin[p.fin - 1] }));
const tiempos = {
  duracion: fin[fin.length - 1],
  palabras: salida,
  escenas: escenas.map(e => ({ id: e.id, ini: salida[e.desde].ini, fin: salida[e.hasta - 1].fin })),
};
fs.writeFileSync(path.join(DIR, 'tiempos.json'), JSON.stringify(tiempos, null, 1));

console.log(`✓ Voz lista: ${tiempos.duracion.toFixed(1)} s · ${hablado.length} caracteres · ${salida.length} palabras`);
for (const e of tiempos.escenas) console.log(`  ${e.id.padEnd(11)} ${e.ini.toFixed(1)}–${e.fin.toFixed(1)} s`);
