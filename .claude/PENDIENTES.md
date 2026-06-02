# Bitácora del Blog "Secundum Fidem" — Oscar I. Morales

> **Para Claude (se inyecta al iniciar cada sesión):**
> 1. **Al INICIAR:** saluda a Oscar en español y recuérdale brevemente "dónde
>    quedamos" y los pendientes de abajo. No actúes sin que él lo pida.
> 2. **Al TERMINAR (siempre):** antes de cerrar, **actualiza este archivo** —
>    mueve a "Hecho" lo completado y deja claro el "dónde nos quedamos" y los
>    próximos pasos. Así la próxima sesión arranca con el contexto al día.

---

## 📍 Dónde nos quedamos (al 2-jun-2026)
El sitio está **publicado y funcionando** en GitHub Pages (rama `main`).
Hoy se **activaron las suscripciones por correo**: la cuenta de Buttondown de Oscar
ya fue aceptada (enlazada a me@oscarimorales.com, usuario **`oscarim`**) y se puso
ese usuario en `project/ui_kits/landing_blog/site-config.js`. El cambio quedó
commiteado y pusheado a la rama `claude/youthful-johnson-AJZq0`.

**Próximo paso:** abrir PR / mergear esa rama a `main` para que las suscripciones
queden activas en el sitio en vivo, y confirmar en el panel de Buttondown la
configuración de doble opt-in, bienvenida con PDF y RSS-to-email (ver Pendiente #2).

## ⏳ Pendientes

### 1. (PRIORITARIO) Pack social para redes — "Nivel 1"
Agregar al skill `blog-oims` que, **al publicar un post**, genere automáticamente:
- **Tarjetas de cita** (imagen con extracto del post + firma + #SecundumFidem),
  en **1080×1080** (IG/FB) y **1200×675** (X).
- **Captions listos para pegar** en IG, FB y X.

Acordado:
- Antes de automatizar, **mostrarle primero un DISEÑO de la tarjeta** para aprobar.
- Implementación: generar las imágenes en el build con un rasterizador WASM
  (tipo `@resvg/resvg-js`), que corre en el GitHub Action sin dependencias nativas.
- Publicar **automático** a IG/X NO es viable sin backend/API de pago → enfoque
  **asistido** (el skill genera el pack; Oscar publica, o usa Meta Business Suite/Buffer).

### 2. Buttondown (suscripciones por correo) — *parcialmente hecho*
✅ Cuenta aceptada y usuario `oscarim` ya configurado en
   `project/ui_kits/landing_blog/site-config.js` (los formularios salen de "modo seguro").
Falta:
- **Mergear** la rama `claude/youthful-johnson-AJZq0` a `main` (o esperar al próximo
  build) para que se active en el sitio en vivo.
- Confirmar en el panel de Buttondown: **doble opt-in**, **bienvenida con PDF**, y
  **RSS-to-email** a `https://oscarim79.github.io/oscarimorales-web/feed.xml`.
  Guía: `SUBSCRIPTIONS.md`.

### 3. (Opcional) Quitar "desde 2014" de los metadatos SEO de la portada
Solo si Oscar lo pide. Está en las metaetiquetas `description`/`og`/`twitter` de
`index.html` (texto no visible, solo para buscadores/al compartir).

## ✅ Hecho (referencia rápida)
- Importación de 51 posts + tubería de publicación (build, GitHub Action).
- Skill `blog-oims` (voz + estructura + publicar) con sus 3 referencias + banco de ideas.
- Marca sin "Meam"; textos de portada; footer con bio.
- Compartir en redes: páginas estáticas por post con Open Graph/Twitter, fb:app_id,
  texto "Título — Por: Ps. Oscar I. Morales — #SecundumFidem".
- Compartir-selección + notita de lectura; botón "Empieza aquí" legible; responsive.
- Guía `COMO-TRABAJO-MI-BLOG.md` y este hook de recordatorios.
