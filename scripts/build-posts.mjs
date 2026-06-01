#!/usr/bin/env node
// ============================================================================
// build-posts.mjs — Compila content/posts/*  →  posts-data.js + post-html.js + sitemap.xml
// ----------------------------------------------------------------------------
// Cada post es un archivo en content/posts/ con frontmatter (entre ---) y cuerpo:
//   - .md   → el cuerpo se escribe en Markdown (se convierte a HTML)
//   - .html → el cuerpo ya es HTML (se usa tal cual)
//
// Frontmatter (cada valor es JSON válido):
//   n:        52                 ← id estable y permalink (post.html?n=52). Obligatorio.
//   title:    "Título"
//   date:     "2026-06-01"
//   cats:     ["Categoría A", "Categoría B"]
//   excerpt:  "Resumen para tarjetas y compartir."   (opcional)
//   quote:    "Cita destacada."                        (opcional)
//   featured: true                                      (opcional)
//   cover:    "auto"   o   "ruta/imagen.jpg"   o   "https://…"
//
// Uso:  node scripts/build-posts.mjs
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const OUT_DATA = path.join(ROOT, 'project', 'ui_kits', 'landing_blog', 'posts-data.js');
const OUT_HTML = path.join(ROOT, 'project', 'ui_kits', 'landing_blog', 'post-html.js');
const OUT_MAP  = path.join(ROOT, 'sitemap.xml');

// URL base del sitio publicado. Cámbiala aquí si migras a un dominio propio
// (p. ej. "https://www.oscarimorales.com/blog").
const SITE = 'https://oscarim79.github.io/oscarimorales-web';

// ----------------------------------------------------------------------------
// Frontmatter
// ----------------------------------------------------------------------------
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf(':');
    if (i < 0) continue;
    const key = t.slice(0, i).trim();
    const rest = t.slice(i + 1).trim();
    try { meta[key] = JSON.parse(rest); }
    catch { meta[key] = rest.replace(/^["']|["']$/g, ''); }
  }
  return { meta, body: raw.slice(m[0].length) };
}

// ----------------------------------------------------------------------------
// Markdown → HTML (subconjunto pensado para artículos del blog)
// ----------------------------------------------------------------------------
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function ytEmbed(id) {
  return `<div class="embed"><iframe src="https://www.youtube.com/embed/${id}?rel=0" ` +
         `allowfullscreen title="Video"></iframe></div>`;
}
function ytId(url) {
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function inline(s) {
  // imágenes ![alt](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, a, src) => `<img src="${src}" alt="${a.replace(/"/g, '&quot;')}" loading="lazy">`);
  // enlaces [texto](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
    const ext = /^https?:\/\//.test(u) && !u.includes('oscarimorales');
    return `<a href="${u}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
  });
  // negrita / cursiva
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/_([^_\n]+)_/g, '<em>$1</em>');
  return s;
}

function mdToHtml(md) {
  const blocks = md.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim().split(/\n\n+/);
  const out = [];
  for (const block of blocks) {
    const b = block.trim();
    if (!b) continue;
    // regla horizontal
    if (/^(-{3,}|\*{3,})$/.test(b)) { out.push('<hr>'); continue; }
    // video de YouTube (línea sola con la URL)
    if (/^https?:\/\/\S+$/.test(b) && ytId(b)) { out.push(ytEmbed(ytId(b))); continue; }
    // imagen sola
    if (/^!\[[^\]]*\]\([^)]+\)$/.test(b)) { out.push(inline(b)); continue; }
    // encabezados
    let h = b.match(/^(#{1,4})\s+(.*)$/);
    if (h) { const lv = Math.min(Math.max(h[1].length, 2), 4); out.push(`<h${lv}>${inline(h[2].trim())}</h${lv}>`); continue; }
    // cita
    if (/^>\s?/.test(b)) {
      const inner = b.split('\n').map(l => l.replace(/^>\s?/, '')).join(' ').trim();
      out.push(`<blockquote><p>${inline(inner)}</p></blockquote>`); continue;
    }
    // lista ordenada
    if (/^\d+\.\s+/.test(b)) {
      const items = b.split('\n').filter(l => l.trim()).map(l => l.replace(/^\d+\.\s+/, ''));
      out.push('<ol>' + items.map(i => `<li>${inline(i.trim())}</li>`).join('') + '</ol>'); continue;
    }
    // lista con viñetas
    if (/^[-*]\s+/.test(b)) {
      const items = b.split('\n').filter(l => l.trim()).map(l => l.replace(/^[-*]\s+/, ''));
      out.push('<ul>' + items.map(i => `<li>${inline(i.trim())}</li>`).join('') + '</ul>'); continue;
    }
    // párrafo (saltos simples → <br>)
    out.push('<p>' + inline(b.replace(/\n/g, '<br>\n')) + '</p>');
  }
  return out.join('\n');
}

// ----------------------------------------------------------------------------
// Cargar posts
// ----------------------------------------------------------------------------
function load() {
  if (!fs.existsSync(POSTS_DIR)) { console.error('No existe', POSTS_DIR); process.exit(1); }
  const files = fs.readdirSync(POSTS_DIR).filter(f => /\.(md|html)$/i.test(f));
  const posts = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    if (meta.n == null) { console.error(`⚠️  ${f}: falta "n" en el frontmatter — omitido`); continue; }
    const isMd = /\.md$/i.test(f);
    const html = (isMd ? mdToHtml(body) : body).trim();
    posts.push({
      n: Number(meta.n),
      title: String(meta.title || '').trim(),
      date: String(meta.date || '').slice(0, 10),
      cats: Array.isArray(meta.cats) ? meta.cats : (meta.cats ? [meta.cats] : []),
      excerpt: meta.excerpt || '',
      quote: meta.quote || '',
      featured: meta.featured === true,
      cover: (meta.cover && meta.cover !== 'auto') ? String(meta.cover) : '',
      html,
      file: f,
    });
  }
  // detectar n duplicados
  const seen = new Map();
  for (const p of posts) {
    if (seen.has(p.n)) { console.error(`❌ n=${p.n} duplicado: ${seen.get(p.n)} y ${p.file}`); process.exit(1); }
    seen.set(p.n, p.file);
  }
  // orden de visualización: más reciente primero (por fecha, desempata por n)
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.n - a.n));
  return posts;
}

// ----------------------------------------------------------------------------
// Generadores
// ----------------------------------------------------------------------------
function genData(posts) {
  const lines = posts.map(p => {
    const f = [`n: ${p.n}`, `title: ${JSON.stringify(p.title)}`, `date: ${JSON.stringify(p.date)}`,
               `cats: ${JSON.stringify(p.cats)}`, `url: ${JSON.stringify(`${SITE}/post.html?n=${p.n}`)}`];
    if (p.cover) f.push(`image: ${JSON.stringify(p.cover)}`);
    if (p.excerpt) f.push(`excerpt: ${JSON.stringify(p.excerpt)}`);
    if (p.quote) f.push(`quote: ${JSON.stringify(p.quote)}`);
    if (p.featured) f.push(`featured: true`);
    return '  { ' + f.join(', ') + ' },';
  });
  return [
    '// ============================================================================',
    '// posts-data.js — GENERADO por scripts/build-posts.mjs · NO editar a mano.',
    '// Fuente: content/posts/*. Para cambiar un post, edita su archivo y re-ejecuta el build.',
    `// ${posts.length} posts, del más reciente al más antiguo.`,
    '// ============================================================================',
    '',
    'window.POSTS = [',
    ...lines,
    '];',
    '',
  ].join('\n');
}

function genHtml(posts) {
  const byN = [...posts].sort((a, b) => a.n - b.n);
  const lines = byN.map(p => `  ${JSON.stringify(String(p.n))}: ${JSON.stringify(p.html)},`);
  return [
    '// ============================================================================',
    '// post-html.js — GENERADO por scripts/build-posts.mjs · NO editar a mano.',
    '// Cuerpo HTML de cada post (window.POST_HTML[n]). Fuente: content/posts/*.',
    '// Se renderiza dentro de <div class="prose__html"> con el estilo editorial.',
    '// ============================================================================',
    '',
    'window.POST_HTML = {',
    ...lines,
    '};',
    '',
  ].join('\n');
}

function genSitemap(posts) {
  const byN = [...posts].sort((a, b) => a.n - b.n);
  const u = [`  <url>\n    <loc>${SITE}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`];
  for (const p of byN) {
    u.push(`  <url>\n    <loc>${SITE}/post.html?n=${p.n}</loc>\n    <lastmod>${p.date}</lastmod>` +
           `\n    <changefreq>yearly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + u.join('\n') + '\n</urlset>\n';
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
const posts = load();
fs.writeFileSync(OUT_DATA, genData(posts));
fs.writeFileSync(OUT_HTML, genHtml(posts));
fs.writeFileSync(OUT_MAP, genSitemap(posts));
console.log(`✅ Build OK — ${posts.length} posts`);
console.log(`   → ${path.relative(ROOT, OUT_DATA)}`);
console.log(`   → ${path.relative(ROOT, OUT_HTML)}`);
console.log(`   → ${path.relative(ROOT, OUT_MAP)}`);
const newest = posts[0];
console.log(`   más reciente: n=${newest.n} · ${newest.title} · ${newest.date}`);
