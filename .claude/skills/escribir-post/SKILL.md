---
name: escribir-post
description: >-
  Escribe y publica un artículo nuevo en el blog estático de Oscar I. Morales.
  Usar cuando el usuario quiera crear, redactar, agregar o publicar un post,
  ensayo o artículo en el sitio (oscarimorales-web). Calcula el número (n)
  siguiente, crea el archivo en content/posts/, compila con build-posts.mjs y
  (si se pide) commitea y publica. Reemplaza por completo el flujo de WordPress.
---

# Escribir y publicar un post

Este sitio es **estático**. Publicar = crear un archivo `.md` en `content/posts/`
y correr el build. No hay WordPress, base de datos ni panel.

```
content/posts/052-mi-post.md   ← se escribe ESTE archivo
        │  node scripts/build-posts.mjs
        ▼
posts-data.js · post-html.js · sitemap.xml · feed.xml   ← se regeneran solos
        │  git add -A && git commit && git push
        ▼
GitHub Pages publica · Buttondown envía el correo (vía feed RSS)
```

## Flujo paso a paso

Sigue estos pasos en orden. No te saltes el build.

### 1. Reúne el contenido con el usuario

Necesitas, como mínimo: **título** y **cuerpo** del artículo. Pide lo que falte.
Confirma o propón tú (con buen criterio editorial):

- `cats` — categorías. La **primera** se usa como sección. Reutiliza las que ya
  existen en el blog cuando encajen (mira `content/posts/` o `posts-data.js`).
- `excerpt` — un resumen de una línea (tarjetas, SEO y al compartir). Muy
  recomendado; si el usuario no lo da, redáctalo tú a partir del texto.
- `quote` — una cita destacada del propio texto (opcional).
- `featured` — `true` solo si el usuario quiere destacarlo en la portada.
- `cover` — déjalo en `"auto"` (portada tipográfica on-brand) salvo que el
  usuario dé una imagen real (ruta dentro del repo o URL `https://`).
- `date` — usa la fecha de **hoy** en formato `"AAAA-MM-DD"` salvo que pidan otra.

### 2. Calcula `n` (número/permalink estable)

`n` es el id permanente del post (`post.html?n=52`). **Nunca** se reutiliza ni se
cambia una vez publicado.

```bash
ls content/posts/ | grep -oE '^[0-9]+' | sort -n | tail -1
```

`n` nuevo = ese número **+ 1**. Si el build luego avisa de un `n` duplicado,
hubo un choque: usa el siguiente libre.

### 3. Genera el `slug` y escribe el archivo

- `slug` = el título en **minúsculas, sin tildes ni ñ, con guiones**, sin
  palabras de relleno excesivas. Ej.: `"El Temor de Dios"` → `el-temor-de-dios`.
- Nombre del archivo: `content/posts/<NNN>-<slug>.md` con `<NNN>` = `n` a **3
  dígitos** (`052`, `007`).

Escribe el archivo con este formato. **Cada valor del frontmatter es JSON
válido** (comillas en strings, corchetes en listas):

```markdown
---
n: 52
title: "El Temor de Dios"
date: "2026-06-01"
cats: ["Caminar Cristiano", "Meditaciones"]
excerpt: "Una línea que resume el post para tarjetas y al compartir."
quote: "Una cita destacada del texto."
featured: false
cover: "auto"
---

Primer párrafo del artículo (lleva letra capital automáticamente).

## Una sección

Cuerpo en Markdown...
```

#### Markdown que soporta el build (no inventes otra sintaxis)

- Párrafos separados por una línea en blanco. El **primer** párrafo recibe
  capital automática.
- Encabezados: `## Sección`, `### Subsección`, `#### Menor` (h1 se trata como h2).
- **Negrita** `**...**`, _cursiva_ `*...*` o `_..._`.
- Enlaces `[texto](https://...)` — los externos abren en pestaña nueva solos.
- Imágenes `![alt](https://.../img.jpg)`.
- Listas: viñetas `- item` y numeradas `1. item`.
- Citas: línea que empieza con `> `.
- **Video de YouTube**: una línea sola con la URL (`https://youtu.be/ID` o
  `watch?v=ID`) → se incrusta el reproductor.
- Regla divisoria: `---` en su propia línea.

### 4. Compila

```bash
node scripts/build-posts.mjs
```

Regenera `posts-data.js`, `post-html.js`, `sitemap.xml` y `feed.xml` desde
**todos** los archivos de `content/posts/`. Esos cuatro son **generados — nunca
los edites a mano**. El build:

- **falla** si hay un `n` duplicado (corrígelo y vuelve a compilar);
- **omite con aviso** un archivo al que le falte `n`;
- imprime `✅ Build OK — N posts` y cuál es el más reciente. **Verifica que tu
  post nuevo aparezca como el más reciente** (o donde corresponda por su fecha).

### 5. Publica

Por defecto, deja que el usuario decida. Ofrece estas opciones:

- **A — Solo el archivo (lo más automático):** commitea únicamente el `.md` a
  `main`; el **GitHub Action** (`.github/workflows/build.yml`) compila y commitea
  los generados solo. Útil incluso desde el GitHub móvil.
- **B — Un comando:** `./scripts/publish.sh "Nuevo post: El Temor de Dios"`
  (compila + commit + push de una vez).
- **C — Manual / lo que harás tú aquí:**
  ```bash
  git add -A && git commit -m "Nuevo post: El Temor de Dios" && git push
  ```

Tras publicar: **GitHub Pages** sirve el sitio y **Buttondown** envía el artículo
por correo vía el feed RSS. No hay que tocar nada más.

## Reglas y errores a evitar

- **No cambies el `n`** de un post ya publicado: rompe su permalink y el correo
  ya enviado.
- **No edites** `posts-data.js`, `post-html.js`, `sitemap.xml` ni `feed.xml` a
  mano. Para corregir un post, edita su `.md` y vuelve a compilar.
- Mantén el frontmatter como **JSON válido** (un string sin comillas o una lista
  sin corchetes hará que se interprete mal).
- Si migran a un dominio propio, hay que actualizar la constante `SITE` en
  `scripts/build-posts.mjs` y re-compilar (eso ya está fuera de este skill).

## Referencia

- Guía humana equivalente: `PUBLISHING.md`.
- Suscripciones/correo (Buttondown): `SUBSCRIPTIONS.md`.
- Lógica de build y Markdown soportado: `scripts/build-posts.mjs`.
