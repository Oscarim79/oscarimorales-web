# Bitácora del Blog "Secundum Fidem" — Oscar I. Morales

> **Para Claude (se inyecta al iniciar cada sesión):**
> 1. **Al INICIAR:** saluda a Oscar en español y recuérdale brevemente "dónde
>    quedamos" y los pendientes de abajo. No actúes sin que él lo pida.
> 2. **Al TERMINAR (siempre):** antes de cerrar, **actualiza este archivo** —
>    mueve a "Hecho" lo completado y deja claro el "dónde nos quedamos" y los
>    próximos pasos. Así la próxima sesión arranca con el contexto al día.

---

## 📍 Dónde nos quedamos (al 22-jul-2026: post #53 + URLs con nombre + preview arreglada)

**Se publicó el post #53** con la skill blog-oims v5 (2º estreno completo del flujo):
**"¿Qué Dice la Biblia sobre la Cremación?"** →
https://oscarimorales.com/que-dice-la-biblia-sobre-la-cremacion
Nació de una pregunta que le hicieron a Oscar en el trabajo. Portada IA (Z-Image,
semilla sembrada, 1 Co 15) ya en JPG ligero. Regla de voz nueva grabada en sesión:
**evitar la etiqueta "reformado/Reforma" en los posts** (las verdades, confesiones
y catecismos se citan; el rótulo se evita para no espantar lectores) — PENDIENTE
pasarla al SKILL.md en la próxima edición de la skill.
- **Boletín de Buttondown:** el correo del post #53 quedó redactado en el chat del
  22-jul; Oscar debe pegarlo en Buttondown → Emails → New email.

**También hoy (22-jul):** los 2 pendientes ⭐ del 20-jul quedaron resueltos (ver "Hecho"):
- URLs con el título: `oscarimorales.com/<slug>`; los `post-<n>.html` viejos redirigen.
- Vista previa al compartir con imagen: portadas JPG ligeras + og:image completo.
- La skill blog-oims v5 quedó empaquetada y Oscar la subió a claude.ai.
- **Falta un paso manual de Oscar:** pasar por el Sharing Debugger de Facebook
  (developers.facebook.com/tools/debug) y darle "Volver a extraer" a los enlaces
  ya compartidos, para que Facebook/WhatsApp refresquen su caché (Pendiente #3).

## 📜 Sesión anterior (20-jul-2026, estreno completo de la skill blog-oims)
**🎉 PRIMER POST PUBLICADO DE PUNTA A PUNTA CON LA SKILL:**
**#52 "Querer no es poder"** → https://oscarimorales.com/post-52.html
El texto vino de la skill de sermones, se preparó como propuesta editorial,
Oscar eligió portada y dio el "publícalo". Verificado en vivo (post, portada
y feed respondiendo 200).

Lo que se hizo (20-jul):
- **Portada generada con IA** vía el conector MCP de Hugging Face (activo en
  Claude Code, usuario `omorales`): se probaron **FLUX.1 Krea** y **Z-Image
  Turbo** con el mismo concepto; Oscar eligió la de Z-Image (cadena rota bajo
  un rayo de luz). Guardada en `content/covers/052-querer-no-es-poder.webp`.
- **Flujo automático de portadas grabado en la skill**
  (`.claude/skills/blog-oims/SKILL.md`, sección "Portada con imagen generada"):
  cada propuesta de post trae 2 candidatas (FLUX + Z-Image, con reintento si
  el servidor falla), Oscar elige 1/2/auto, y la portada NUNCA bloquea la
  publicación (respaldo: cover auto + prompt para Grok).
- **OJO:** el correo del boletín NO sale solo (el RSS-to-email de Buttondown
  es de pago — ver Pendiente #2). El correo del post #52 quedó redactado en
  el chat del 20-jul para que Oscar lo pegue en Buttondown → Emails → New email.

**Cierre de la noche (20-jul):** Oscar añadió desde el móvil los "minutos de
lectura" (en posts y en las tarjetas del inicio, commits 558348f y 946d5c3).
Al compartir el post #52 detectó dos cosas nuevas → son los 2 pendientes ⭐
de abajo. Post publicado y verificado; boletín pendiente de pegar en Buttondown.

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
**DECIDIDO (22-jul):** seguimos con este flujo asistido (gratis) mientras la
lista sea pequeña; cuando crezca (~50-100 suscriptores), se activa el plan de
$9/mes y el RSS-to-email con `feed.xml` — el sitio ya está listo, no hay que
cambiar nada. Los correos de los posts #52 y #53 ya se le entregaron redactados.

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
- **URLs con el título del post** (22-jul): cada post vive en
  `oscarimorales.com/<slug>` (el slug sale del nombre del archivo en
  `content/posts/`, p. ej. `052-querer-no-es-poder.md` → `/querer-no-es-poder`).
  El build genera `<slug>.html` + redirección `post-<n>.html` (permalinks viejos
  intactos); sitemap y feed usan la URL nueva (guid del RSS quedó estable a
  propósito). REGLA NUEVA: no renombrar el archivo de un post publicado.
- **Vista previa con imagen al compartir** (22-jul): `og:image` ahora siempre es
  JPG ligero — `og-default.jpg` (1200×630, ~100 KB) reemplaza al `oscar-stage.png`
  de 7.4 MB; portada del #52 convertida de webp a jpg; 27 portadas pesadas de la
  era WordPress tienen versión ligera en `content/covers/og/<NNN>.jpg` (solo para
  compartir; el sitio muestra las originales). Se añadieron og:image:width/height/
  type. La skill blog-oims ahora exige portadas JPG < 300 KB.
- **Primer post con blog-oims + portadas IA** (20-jul): #52 "Querer no es poder"
  publicado y verificado; flujo de portadas (HF: FLUX + Z-Image) grabado en la skill.
- **Migración a oscarimorales.com** (12-jun): DNS en GoDaddy, HTTPS de GitHub
  Pages, 90 imágenes rescatadas del WordPress viejo a `wp-content/uploads/`,
  Buttondown apuntando a `bienvenida.html`. (Detalle completo en el historial git.)
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
