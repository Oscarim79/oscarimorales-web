# Recordatorios pendientes — Blog "Secundum Fidem" (Oscar I. Morales)

> Para Claude: al iniciar la sesión, **saluda a Oscar y recuérdale en español, de
> forma breve, estos pendientes.** No actúes sin que él lo pida — solo recuérdaselos
> y ofrécele continuar. Cuando un pendiente se complete, edita o quita su sección.

## 1. (PRIORITARIO) Pack social para redes — "Nivel 1"
Oscar pidió agregar al skill `blog-oims` que, **al publicar un post**, genere
automáticamente:
- **Tarjetas de cita** (imágenes con un extracto del post + su firma + #SecundumFidem),
  en **1080×1080** (IG/FB) y **1200×675** (X).
- **Captions listos para pegar** en IG, FB y X.

Acordado:
- Antes de automatizar, **mostrarle primero un DISEÑO de la tarjeta** (estilo/colores)
  para que lo apruebe.
- Implementación: generar las imágenes en el build con un rasterizador WASM
  (tipo `@resvg/resvg-js`) que corre en el GitHub Action sin dependencias nativas.
- Publicar **automático** a IG/X NO es viable sin backend/API de pago → quedamos en
  el enfoque **asistido** (el skill genera el pack; Oscar publica, o usa Meta Business
  Suite / Buffer / Metricool).

## 2. Buttondown (suscripciones por correo)
La cuenta estaba **en verificación** (hasta 2 días hábiles desde el 1-jun-2026).
Cuando esté lista:
- Pedirle su **usuario de Buttondown** y ponerlo en
  `project/ui_kits/landing_blog/site-config.js` (reemplazar `"TU_USUARIO_BUTTONDOWN"`).
- Confirmar en Buttondown: **doble opt-in**, correo de **bienvenida con PDF**, y
  **RSS-to-email** apuntando a `https://oscarim79.github.io/oscarimorales-web/feed.xml`.
- Guía: `SUBSCRIPTIONS.md`.

## 3. (Opcional) Quitar "desde 2014" de los metadatos SEO de la portada
Solo si Oscar lo pide. Está en las metaetiquetas `description`/`og`/`twitter` de
`index.html` (texto no visible en la página, solo para buscadores/al compartir).
