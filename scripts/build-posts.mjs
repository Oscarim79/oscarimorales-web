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
const OUT_FEED = path.join(ROOT, 'feed.xml');

const SITE_TITLE = 'Oscar I. Morales · Secundum Fidem';
const SITE_DESC  = 'Ensayos y meditaciones para pensar el evangelio despacio.';

// URL base del sitio publicado (dominio propio vía GitHub Pages + CNAME).
const SITE = 'https://oscarimorales.com';

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
               `cats: ${JSON.stringify(p.cats)}`, `url: ${JSON.stringify(`${SITE}/post-${p.n}.html`)}`];
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
    u.push(`  <url>\n    <loc>${SITE}/post-${p.n}.html</loc>\n    <lastmod>${p.date}</lastmod>` +
           `\n    <changefreq>yearly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + u.join('\n') + '\n</urlset>\n';
}

function xmlEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;');
}

// Resumen para el RSS: usa el excerpt o el texto plano del cuerpo.
function feedSummary(p) {
  if (p.excerpt) return p.excerpt;
  const text = p.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 280 ? text.slice(0, 280).replace(/\s+\S*$/, '') + '…' : text;
}

function genFeed(posts) {
  const items = posts.map(p => {
    const link = `${SITE}/post-${p.n}.html`;
    const pub = new Date(p.date + 'T08:00:00Z').toUTCString();
    const cats = p.cats.map(c => `      <category>${xmlEsc(c)}</category>`).join('\n');
    return [
      '    <item>',
      `      <title>${xmlEsc(p.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${pub}</pubDate>`,
      cats,
      `      <description>${xmlEsc(feedSummary(p))}</description>`,
      '    </item>',
    ].filter(Boolean).join('\n');
  }).join('\n');
  // Fecha de actualización estable: la del post más reciente (no la hora del build).
  // Así feed.xml solo cambia cuando cambia el contenido — sin commits de ruido.
  const latest = posts.reduce((a, p) => (p.date > a ? p.date : a), '1970-01-01');
  const now = new Date(latest + 'T08:00:00Z').toUTCString();
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xmlEsc(SITE_TITLE)}</title>`,
    `    <link>${SITE}/</link>`,
    `    <description>${xmlEsc(SITE_DESC)}</description>`,
    '    <language>es</language>',
    `    <lastBuildDate>${now}</lastBuildDate>`,
    `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

// ----------------------------------------------------------------------------
// Páginas estáticas por artículo (post-<n>.html)
// ----------------------------------------------------------------------------
// Cada post se publica también como una página HTML propia con los metadatos
// (título, descripción, imagen) ya "horneados" en el HTML. Así Facebook,
// WhatsApp y X — que NO ejecutan JavaScript — muestran la vista previa correcta
// (imagen + título del artículo). El cuerpo lo renderiza post-app.js leyendo
// window.POST_N. Es la URL canónica y compartible de cada escrito.

const DEFAULT_IMAGE = `${SITE}/project/assets/oscar-stage.png`;

// Descripción corta (excerpt o texto del cuerpo, recortada a ~175 caracteres).
function metaDesc(p) {
  let s = p.excerpt || p.html.replace(/<[^>]+>/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length <= 175) return s;
  const cut = s.slice(0, 175);
  const sp = cut.lastIndexOf(' ');
  return (sp > 40 ? cut.slice(0, sp) : cut).replace(/[\s,;:.]+$/, '') + '…';
}

// URL absoluta de la imagen de portada (o la imagen por defecto del sitio).
function absImage(p) {
  if (!p.cover) return DEFAULT_IMAGE;
  return /^https?:\/\//.test(p.cover) ? p.cover : `${SITE}/${p.cover.replace(/^\//, '')}`;
}

function genPostPage(p) {
  const url = `${SITE}/post-${p.n}.html`;
  const title = `${p.title} · Oscar I. Morales`;
  const desc = metaDesc(p);
  const img = absImage(p);
  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.title, description: desc, datePublished: p.date, inLanguage: 'es',
    url, mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', name: 'Oscar I. Morales' },
    publisher: {
      '@type': 'Person', name: 'Oscar I. Morales',
      logo: { '@type': 'ImageObject', url: `${SITE}/project/assets/logo-icon.png` }
    },
    image: img, keywords: p.cats.join(', ')
  };
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${xmlEsc(title)}</title>
  <meta name="description" content="${xmlEsc(desc)}" />
  <meta name="author" content="Oscar I. Morales" />
  <meta name="theme-color" content="#0D1B2A" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" type="application/rss+xml" title="${xmlEsc(SITE_TITLE)}" href="feed.xml" />

  <!-- Open Graph -->
  <meta property="fb:app_id" content="1364767002169360" />
  <meta property="og:site_name" content="${xmlEsc(SITE_TITLE)}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:title" content="${xmlEsc(p.title)}" />
  <meta property="og:description" content="${xmlEsc(desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${xmlEsc(img)}" />
  <meta property="og:image:alt" content="${xmlEsc(p.title + ' — Oscar I. Morales')}" />
  <meta property="article:published_time" content="${p.date}" />
  <meta property="article:author" content="Oscar I. Morales" />
${p.cats[0] ? `  <meta property="article:section" content="${xmlEsc(p.cats[0])}" />\n` : ''}\
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@oscarimoraless" />
  <meta name="twitter:creator" content="@oscarimoraless" />
  <meta name="twitter:title" content="${xmlEsc(p.title)}" />
  <meta name="twitter:description" content="${xmlEsc(desc)}" />
  <meta name="twitter:image" content="${xmlEsc(img)}" />
  <meta name="twitter:image:alt" content="${xmlEsc(p.title + ' — Oscar I. Morales')}" />

  <script type="application/ld+json">${JSON.stringify(ld)}</script>

  <link rel="icon" href="project/assets/logo-icon.png" />
  <link rel="stylesheet" href="project/colors_and_type.css" />
  <link rel="stylesheet" href="project/ui_kits/landing_blog/landing.css" />
  <link rel="stylesheet" href="project/ui_kits/landing_blog/post.css" />
  <link rel="stylesheet" href="project/ui_kits/landing_blog/post-prod.css" />
</head>
<body>
  <div id="app"></div>

  <script>window.POST_N = ${p.n};</script>
  <script src="project/ui_kits/landing_blog/site-config.js"></script>
  <script src="project/ui_kits/landing_blog/posts-data.js"></script>
  <script src="project/ui_kits/landing_blog/covers.js"></script>
  <script src="project/ui_kits/landing_blog/post-content.js"></script>
  <script src="project/ui_kits/landing_blog/post-html.js"></script>
  <script src="project/ui_kits/landing_blog/subscribe.js"></script>
  <script src="project/ui_kits/landing_blog/post-app.js"></script>
</body>
</html>
`;
}

function genPostPages(posts) {
  // Limpia páginas viejas (post-<n>.html) antes de regenerar.
  for (const f of fs.readdirSync(ROOT)) {
    if (/^post-\d+\.html$/.test(f)) fs.unlinkSync(path.join(ROOT, f));
  }
  for (const p of posts) {
    fs.writeFileSync(path.join(ROOT, `post-${p.n}.html`), genPostPage(p));
  }
  return posts.length;
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
const posts = load();
fs.writeFileSync(OUT_DATA, genData(posts));
fs.writeFileSync(OUT_HTML, genHtml(posts));
fs.writeFileSync(OUT_MAP, genSitemap(posts));
fs.writeFileSync(OUT_FEED, genFeed(posts));
const pageCount = genPostPages(posts);
console.log(`✅ Build OK — ${posts.length} posts`);
console.log(`   → ${path.relative(ROOT, OUT_DATA)}`);
console.log(`   → ${path.relative(ROOT, OUT_HTML)}`);
console.log(`   → ${path.relative(ROOT, OUT_MAP)}`);
console.log(`   → ${path.relative(ROOT, OUT_FEED)}`);
console.log(`   → ${pageCount} páginas post-<n>.html`);
const newest = posts[0];
console.log(`   más reciente: n=${newest.n} · ${newest.title} · ${newest.date}`);
