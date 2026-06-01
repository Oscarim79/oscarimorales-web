# Publicar en el sitio (sin WordPress)

Este sitio es **estático**. "Publicar" un artículo = agregar un archivo en
`content/posts/` y correr el build. Sin base de datos, sin panel, sin
vulnerabilidades de WordPress.

```
content/posts/052-mi-post.md   ← escribes ESTE archivo
        │
        ▼   node scripts/build-posts.mjs
posts-data.js + post-html.js + sitemap.xml   ← se regeneran solos
        │
        ▼   git add -A && git commit && git push
publicado ✅
```

---

## 1. Crear el archivo del post

Ruta y nombre: `content/posts/<NNN>-<slug>.md`
(p. ej. `content/posts/052-el-temor-de-dios.md`)

- `<NNN>` = el número **`n`** con 3 dígitos. Es el **permalink** del post
  (`post.html?n=52`) y **no debe cambiar nunca** una vez publicado.
- Para un post nuevo, usa **el `n` más alto que exista + 1**.
- Extensión: **`.md`** (cuerpo en Markdown, recomendado) o **`.html`** (cuerpo en HTML).

### Frontmatter (cabecera entre `---`)

Cada valor es **JSON válido**:

```markdown
---
n: 52
title: "El Temor de Dios"
date: "2026-06-01"
cats: ["Caminar Cristiano", "Meditaciones"]
excerpt: "Una línea que resume el post (tarjetas y al compartir)."
quote: "Una cita destacada del texto."
featured: true
cover: "auto"
---
```

| Campo      | Obligatorio | Notas |
|------------|:-----------:|-------|
| `n`        | ✅ | Número/permalink estable. El más alto existente + 1. |
| `title`    | ✅ | Título del artículo. |
| `date`     | ✅ | `"AAAA-MM-DD"`. Ordena el blog (más reciente primero). |
| `cats`     | ✅ | Lista de categorías. La primera se usa como sección. |
| `excerpt`  | recomendado | Resumen para tarjetas, SEO y compartir. |
| `quote`    | opcional | Cita destacada (se muestra en algunas tarjetas). |
| `featured` | opcional | `true` para destacarlo en la portada. |
| `cover`    | opcional | `"auto"` = portada tipográfica generada (on-brand). O una ruta/URL de imagen real. |

### Cuerpo (Markdown)

Debajo del segundo `---`. Soporta:

- Párrafos (el primero lleva letra capital automáticamente).
- Encabezados: `## Sección`, `### Subsección`, `#### Menor`.
- **Negrita** `**...**`, _cursiva_ `*...*` o `_..._`.
- Enlaces `[texto](https://...)` (los externos abren en pestaña nueva).
- Imágenes `![alt](https://.../img.jpg)`.
- Listas con viñetas (`- item`) y numeradas (`1. item`).
- Citas: línea que empieza con `> `.
- **Videos de YouTube**: una línea sola con la URL
  (`https://www.youtube.com/watch?v=ID` o `https://youtu.be/ID`).
- Regla divisoria: `---` en su propia línea.

---

## 2. Compilar

```bash
node scripts/build-posts.mjs
```

Regenera `posts-data.js`, `post-html.js`, `sitemap.xml` y `feed.xml` desde
**todos** los archivos de `content/posts/`. Esos archivos son **generados — no los
edites a mano** (para corregir un post, edita su `.md` y vuelve a compilar).

> `feed.xml` es el RSS del blog: alimenta lectores de RSS y el **envío automático
> del artículo por correo** (ver más abajo). Se actualiza solo en cada build.

El build avisa si falta `n` o si hay un `n` duplicado.

## 3. Publicar

Tienes **tres formas**, de más a menos automática:

**A) Solo agregar el archivo (lo más automático).**
Sube el `.md` a `content/posts/` (incluso desde la web/móvil de GitHub) y haz
commit a `main`. El **GitHub Action** (`.github/workflows/build.yml`) compila solo
y deja todo listo. No necesitas terminal ni correr el build.

**B) Un comando (desde una terminal):**
```bash
./scripts/publish.sh "Nuevo post: El Temor de Dios"
```
Compila, commitea y sube de una vez.

**C) Manual:**
```bash
node scripts/build-posts.mjs
git add -A && git commit -m "Nuevo post: El Temor de Dios" && git push
```

En los tres casos, **GitHub Pages publica** el sitio y **Buttondown envía** el
artículo por correo (vía el feed RSS).

> ⚙️ Para que el Action pueda commitear: en GitHub → **Settings → Actions →
> General → Workflow permissions** debe estar en **"Read and write permissions"**
> (se configura una sola vez).

---

## Cómo conectar tu skill de escribir posts

Tu skill solo necesita, al final de escribir el artículo:

1. **Calcular `n`**: leer `content/posts/`, tomar el número más alto y sumarle 1.
2. **Escribir** `content/posts/<NNN>-<slug>.md` con el frontmatter + el cuerpo en Markdown.
   - `slug`: el título en minúsculas, sin tildes, con guiones.
   - `cover: "auto"` salvo que tengas una imagen real.
3. **Ejecutar** `node scripts/build-posts.mjs`.
4. (Opcional) `git add -A && git commit -m "..." && git push`.

Eso reemplaza por completo la llamada a la API de WordPress.

---

## Cambiar de dominio

Cuando muevas el sitio a un dominio propio (p. ej. `www.oscarimorales.com/blog`),
edita la constante `SITE` al inicio de `scripts/build-posts.mjs` y vuelve a
compilar. Eso actualiza los enlaces canónicos, de compartir y el sitemap.
