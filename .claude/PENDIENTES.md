# Bitácora del Blog "Secundum Fidem" — Oscar I. Morales

> **Para Claude (se inyecta al iniciar cada sesión):**
> 1. **Al INICIAR:** saluda a Oscar en español y recuérdale brevemente "dónde
>    quedamos" y los pendientes de abajo. No actúes sin que él lo pida.
> 2. **Al TERMINAR (siempre):** antes de cerrar, **actualiza este archivo** —
>    mueve a "Hecho" lo completado y deja claro el "dónde nos quedamos" y los
>    próximos pasos. Así la próxima sesión arranca con el contexto al día.

---

## 📍 Dónde nos quedamos (al 12-jun-2026, sesión de migración de dominio)
**EN CURSO: mover el sitio a oscarimorales.com (DNS en GoDaddy).** El lado
del repositorio quedó LISTO en la rama `claude/kind-bell-obuis9`:

- `CNAME` con `oscarimorales.com`; URL base cambiada en `scripts/build-posts.mjs`,
  `index.html`, `robots.txt`, `post-app.js` y docs; los 51 posts + sitemap +
  feed regenerados. Cero URLs `oscarim79.github.io` restantes.
- **Hallazgo clave:** las imágenes de los 51 posts viven en el WordPress viejo
  (`oscarimorales.com/wp-content/uploads/`, 91 archivos). Se creó el Action de
  un solo uso **"Rescatar imágenes de WordPress"** (`rescatar-imagenes.yml` +
  `scripts/descargar-imagenes.sh` + lista `scripts/imagenes-wordpress.txt`) que
  las descarga al repo en la MISMA ruta, para que nada se rompa al cambiar DNS.

**Pasos que faltan (EN ORDEN):**
1. ✅ Merge de la rama a `main` — HECHO (12-jun).
2. ✅ Action "Rescatar imágenes" — HECHO: 90 imágenes commiteadas en
   `wp-content/uploads/` (1 era una miniatura 404 que ya no existía; el
   post 13 se apuntó a su imagen de portada). Corrió 2 veces: la 1ª falló
   por ese 404, la 2ª en verde.
3. ⏳ OSCAR — GoDaddy: editar el registro A `@` a `185.199.108.153` y
   agregar 3 A más `@`: `.109.153`, `.110.153`, `.111.153`; CNAME `www` →
   `oscarim79.github.io`. **NO tocar MX/TXT** (correo me@oscarimorales.com).
4. ⏳ OSCAR — GitHub Settings → Pages: confirmar dominio `oscarimorales.com`
   y al verificar DNS marcar Enforce HTTPS.
5. ⏳ OSCAR — Buttondown: redirect de confirmación →
   `https://oscarimorales.com/bienvenida.html`.
6. ⏳ Después: borrar `rescatar-imagenes.yml` y `scripts/descargar-imagenes.sh`
   (eran de un solo uso) y verificar el sitio en el dominio nuevo.

## ⏳ Pendientes

### 0. (EN CURSO) Terminar migración a oscarimorales.com
Ver "Dónde nos quedamos" arriba — faltan los pasos 1–6.

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

### 2. Correo del boletín en el skill `blog-oims` (acordado con Oscar)
El RSS-to-email de Buttondown es de pago, así que: **al publicar un post, el
skill debe generar también el correo del boletín redactado** (asunto + cuerpo
con una línea de contexto + enlace al post), para que Oscar solo lo pegue en
Buttondown (Emails → New email) y lo envíe. Encaja natural con el Pendiente #1.

### 3. (Opcional) Quitar "desde 2014" de los metadatos SEO de la portada
Solo si Oscar lo pide. Está en las metaetiquetas `description`/`og`/`twitter` de
`index.html` (texto no visible, solo para buscadores/al compartir).

### 4. (Opcional) Títulos fijos de los sermones
Hoy se leen de YouTube automáticamente (funciona). Si Oscar quiere blindarlos,
escribirlos en `site-config.js` → `sermons[].title`.

## ✅ Hecho (referencia rápida)
- **Sermones en la portada** (12-jun): sección "Para ver y escuchar", carga
  diferida, fix Error 153 de YouTube (referrerpolicy origin), nav + footer.
- **Buttondown completo en plan gratis** (12-jun): formularios sin popup
  (fetch urlencoded), `bienvenida.html` + PDF de Pink en `recursos/`,
  doble opt-in, welcome email apagado, `SUBSCRIPTIONS.md` al día.
- **Calidad** (12-jun): reset de `<button>`; responsive 320–1440px sin
  desborde; verificación con navegador automatizado.
- Importación de 51 posts + tubería de publicación (build, GitHub Action).
- Skill `blog-oims` (voz + estructura + publicar) con sus 3 referencias + banco de ideas.
- Marca sin "Meam"; textos de portada; footer con bio.
- Compartir en redes: páginas estáticas por post con Open Graph/Twitter, fb:app_id,
  texto "Título — Por: Ps. Oscar I. Morales — #SecundumFidem".
- Compartir-selección + notita de lectura; botón "Empieza aquí" legible; responsive.
- Guía `COMO-TRABAJO-MI-BLOG.md` y este hook de recordatorios.
