# Bitácora del Blog "Secundum Fidem" — Oscar I. Morales

> **Para Claude (se inyecta al iniciar cada sesión):**
> 1. **Al INICIAR:** saluda a Oscar en español y recuérdale brevemente "dónde
>    quedamos" y los pendientes de abajo. No actúes sin que él lo pida.
> 2. **Al TERMINAR (siempre):** antes de cerrar, **actualiza este archivo** —
>    mueve a "Hecho" lo completado y deja claro el "dónde nos quedamos" y los
>    próximos pasos. Así la próxima sesión arranca con el contexto al día.

---

## 📍 Dónde nos quedamos (al 12-jun-2026)
El sitio está **publicado y funcionando** en GitHub Pages (rama `main`), ya **con
las suscripciones de Buttondown activas** (la rama de Buttondown se mergeó a `main`).

Hoy se agregó y **se publicó (PR #2 mergeado a `main`)** la **sección "Sermones"
en la portada** ("Para ver y escuchar", entre el Archivo y la Suscripción): un
video destacado + lista de 4 sermones más, con carga diferida (no carga nada de
YouTube hasta hacer clic), enlace en la nav y el footer. Los 5 videos están en
`project/ui_kits/landing_blog/site-config.js` (campo `sermons`). El botón
"Ver más en YouTube" lleva a la búsqueda "Oscar Morales Iglesia Reforma Guatemala"
(Oscar no tiene canal propio; los sermones están en el canal de Iglesia Reforma).

**Próximo paso (acordado con Oscar):** lo de **Buttondown** (ver Pendiente #2):
confirmar en su panel el doble opt-in, la bienvenida con PDF y el RSS-to-email.

Detalle menor de sermones: los títulos quedaron en `""` (el sitio intenta leerlos
de YouTube solo; si no, muestra "Sermón · Ps. Oscar I. Morales"). Si Oscar pasa
los títulos reales, escribirlos en `site-config.js` → `sermons[].title`.

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

### 2. Buttondown (suscripciones por correo) — *casi listo*
✅ Cuenta aceptada, usuario `oscarim` configurado y **mergeado a `main`** (ya activo).
Falta solo confirmar en el panel de Buttondown: **doble opt-in**, **bienvenida con
PDF**, y **RSS-to-email** a `https://oscarim79.github.io/oscarimorales-web/feed.xml`.
Guía: `SUBSCRIPTIONS.md`.

### 2b. Sermones — títulos (opcional)
Si Oscar pasa los títulos de los 5 sermones, escribirlos en `site-config.js`
→ `sermons[].title` (hoy se leen de YouTube automáticamente como respaldo).

### 3. (Opcional) Quitar "desde 2014" de los metadatos SEO de la portada
Solo si Oscar lo pide. Está en las metaetiquetas `description`/`og`/`twitter` de
`index.html` (texto no visible, solo para buscadores/al compartir).

## ✅ Hecho (referencia rápida)
- Sección "Sermones" en la portada (video destacado + lista, carga diferida,
  nav + footer). Videos editables en `site-config.js`.
- Suscripciones Buttondown activas en `main` (usuario `oscarim`).
- Importación de 51 posts + tubería de publicación (build, GitHub Action).
- Skill `blog-oims` (voz + estructura + publicar) con sus 3 referencias + banco de ideas.
- Marca sin "Meam"; textos de portada; footer con bio.
- Compartir en redes: páginas estáticas por post con Open Graph/Twitter, fb:app_id,
  texto "Título — Por: Ps. Oscar I. Morales — #SecundumFidem".
- Compartir-selección + notita de lectura; botón "Empieza aquí" legible; responsive.
- Guía `COMO-TRABAJO-MI-BLOG.md` y este hook de recordatorios.
