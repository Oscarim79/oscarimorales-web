# Bitácora del Blog "Secundum Fidem" — Oscar I. Morales

> **Para Claude (se inyecta al iniciar cada sesión):**
> 1. **Al INICIAR:** saluda a Oscar en español y recuérdale brevemente "dónde
>    quedamos" y los pendientes de abajo. No actúes sin que él lo pida.
> 2. **Al TERMINAR (siempre):** antes de cerrar, **actualiza este archivo** —
>    mueve a "Hecho" lo completado y deja claro el "dónde nos quedamos" y los
>    próximos pasos. Así la próxima sesión arranca con el contexto al día.

---

## 📍 Dónde nos quedamos (al 12-jun-2026, cierre de la migración de dominio)
**🎉 MIGRACIÓN COMPLETADA: el sitio vive en https://oscarimorales.com.**
Verificado por Oscar desde su teléfono: portada e imágenes cargando.

Lo que se hizo (12-jun, tarde):
- `CNAME` + URL base `https://oscarimorales.com` en build, portada, robots,
  post-app y docs; 51 posts + sitemap + feed regenerados.
- **90 imágenes rescatadas del WordPress viejo** al repo (misma ruta
  `wp-content/uploads/`) con un Action de un solo uso, YA BORRADO tras
  cumplir su misión (junto con su script y la lista de URLs).
- DNS en GoDaddy (lo hizo Oscar guiado): 4 registros A de GitHub, AAAA del
  servidor viejo eliminado (¡estaba oculto y habría roto IPv6!), registro A
  "old" eliminado, MX/TXT intactos (correo OK). Verificado con consultas
  directas a los nameservers autoritativos hasta verlo estable.
- GitHub Pages: dominio custom + certificado HTTPS emitido (hubo que hacer
  Remove + re-add del dominio para forzarlo). Buttondown: redirect de
  confirmación actualizado a `https://oscarimorales.com/bienvenida.html`.

**Nota:** la primera carga fue lenta (caché de la CDN en frío + imágenes
originales de WordPress pesadas). Ver nuevo pendiente de optimización.

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

### 2. Correo del boletín en el skill `blog-oims` (acordado con Oscar)
El RSS-to-email de Buttondown es de pago, así que: **al publicar un post, el
skill debe generar también el correo del boletín redactado** (asunto + cuerpo
con una línea de contexto + enlace al post), para que Oscar solo lo pegue en
Buttondown (Emails → New email) y lo envíe. Encaja natural con el Pendiente #1.

### 3. Revisar compartir en Facebook (pedido por Oscar, 12-jun)
En el Sharing Debugger de Facebook Developers, oscarimorales.com mostraba:
- Advertencia: «La propiedad "og:image" debe proporcionarse de forma explícita».
- La extracción en caché era VIEJA (29-dic-2022, era WordPress). Oscar debía
  pulsar "Volver a extraer" tras la migración — verificar si lo hizo y si la
  advertencia persiste con las etiquetas nuevas.
Revisar: og:image/og:url de portada y posts contra lo que reporta el debugger,
y repasar las opciones de la app de Facebook (fb:app_id ya está en el sitio).

### 4. Revisar y mejorar la versión móvil (pedido por Oscar, 12-jun)
Oscar la vio "muy apretada en algunas secciones" desde su teléfono el día de
la migración. Parte pudo ser el certificado pendiente (imágenes bloqueadas),
pero quiere una revisión a fondo: auditar la portada y los posts en viewport
de teléfono real, aflojar espaciados/tipografía donde haga falta.

### 5. (Opcional, recomendado) Optimizar imágenes heredadas de WordPress
Las 90 imágenes en `wp-content/uploads/` son los originales (algunos PNG de
1500px, varios cientos de KB). Comprimirlas/redimensionarlas (p. ej. a WebP,
ancho máx ~1200px) para que el blog cargue rápido incluso en primera visita.
Oscar notó la lentitud en la primera carga tras la migración.

### 6. (Opcional) Quitar "desde 2014" de los metadatos SEO de la portada
Solo si Oscar lo pide. Está en las metaetiquetas `description`/`og`/`twitter` de
`index.html` (texto no visible, solo para buscadores/al compartir).

### 7. (Opcional) Títulos fijos de los sermones
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
