#!/usr/bin/env node
// Comprueba que la clave de ElevenLabs guardada en .env.local funciona — Secundum Fidem · Oscar I. Morales
// Muestra el plan y los créditos que quedan. Nunca imprime la clave.
//
// Uso: node scripts/revisar-elevenlabs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENV = path.join(ROOT, '.env.local');

function salir(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(ENV)) salir('No existe .env.local en la raíz del proyecto.');
const linea = fs.readFileSync(ENV, 'utf8').match(/^ELEVENLABS_API_KEY=(.*)$/m);
const clave = linea ? linea[1].trim() : '';
if (!clave) salir('La clave está vacía: pégala en .env.local después del signo = y guarda.');

const api = (ruta) => fetch(`https://api.elevenlabs.io${ruta}`, { headers: { 'xi-api-key': clave } });

const sub = await api('/v1/user/subscription');
if (sub.status === 401) {
  const cuerpo = await sub.json().catch(() => ({}));
  const estado = cuerpo?.detail?.status || '';
  if (estado === 'missing_permissions') salir('La clave funciona, pero le falta el permiso «User: Read».');
  salir('ElevenLabs rechazó la clave. Revisa que esté completa en .env.local.');
}
if (!sub.ok) salir(`ElevenLabs respondió ${sub.status} al consultar el plan.`);
const s = await sub.json();
console.log(`✓ Clave válida · plan: ${s.tier}`);
console.log(`  Créditos: ${s.character_count} usados de ${s.character_limit}`);

const voces = await api('/v1/voices');
if (voces.ok) console.log(`  Voces disponibles: ${(await voces.json()).voices.length}`);
else console.log(`  ⚠ No pude leer las voces (${voces.status}): la clave necesita el permiso «Voices: Read».`);
