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
Hoy las **suscripciones por correo quedaron funcionando de punta a punta**: la cuenta
de Buttondown de Oscar (usuario **`oscarim`**, enlazada a me@oscarimorales.com) ya está
configurada en `site-config.js`, el PR #1 se **mergeó a `main`** y se desplegó. Oscar
probó suscribirse en vivo y vio la pantalla "You've successfully subscribed to Oscar
Morales!" → **confirmado funcionando.** ✅

## ⏰ RECORDATORIO PARA HOY (pedido por Oscar el 2-jun): terminar ajustes de Buttondown
Oscar pidió que se le recuerde **hoy** completar 3 ajustes en su **panel de Buttondown**
(no es código; los hace él dentro de su cuenta). Guía: `SUBSCRIPTIONS.md`.
- ☐ **Doble opt-in** (recomendado activarlo; hoy te suscribe directo sin confirmar correo).
- ☐ **Email de bienvenida con su PDF** de regalo.
- ☐ **RSS-to-email** → `https://oscarim79.github.io/oscarimorales-web/feed.xml`
  (para que cada post nuevo se envíe solo por correo).
Ofrecerle guiarlo paso a paso en cada uno si lo desea.

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

### 2. Buttondown (suscripciones por correo) — *casi terminado*
✅ Usuario `oscarim` configurado, PR #1 mergeado a `main`, desplegado y **probado en
   vivo con éxito** (suscripción funcionando de punta a punta).
Falta solo (en el panel de Buttondown, lo hace Oscar) — ver "RECORDATORIO PARA HOY" arriba:
- **doble opt-in**, **bienvenida con PDF**, y
- **RSS-to-email** a `https://oscarim79.github.io/oscarimorales-web/feed.xml`.
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
