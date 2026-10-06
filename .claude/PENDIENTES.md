# Bitácora del Blog "Secundum Fidem" — Oscar I. Morales

> **Para Claude (se inyecta al iniciar cada sesión):**
> 1. **Al INICIAR:** saluda a Oscar en español y recuérdale brevemente "dónde
>    quedamos" y los pendientes de abajo. No actúes sin que él lo pida.
> 2. **Al TERMINAR (siempre):** antes de cerrar, **actualiza este archivo** —
>    mueve a "Hecho" lo completado y deja claro el "dónde nos quedamos" y los
>    próximos pasos. Así la próxima sesión arranca con el contexto al día.

---

## 🔄 En curso (6-oct-2026): propuesta del post #58 «Más Abuelos que Niños»

Oscar pidió un post (Modo B, Cultura y Actualidad) sobre la noticia de que hay más
personas de 65+ que niños de 5 o menos en el mundo (Oficina del Censo de EE. UU.,
informe «An Aging World: 2025», 31-ago-2026: 852 millones de 65+, 10.5 %; cruce entre
2020 y 2025; 2060 → ~2 mil millones, 1 de cada 5). Ángulo: la idea egoísta de que
«muchos hijos» es malo vs. los hijos como herencia de Jehová (Gn 1:28; Sal 127:3-5;
Sal 128:3-4; Mr 10:14-16; Is 9:6; Is 54:1; Pr 17:6 — todas verificadas en RVR1960).
- **Borrador entregado** (sin publicar): `vista-previa/058-borrador.md` + PDF de
  lectura `vista-previa/058-propuesta-mas-abuelos-que-ninos.pdf` (carpeta ignorada
  por git). ~1,550 palabras (~8 min). Generador del PDF: receta de la skill
  (markdown-it + playwright-core + @fontsource en el scratchpad).
- **Portadas candidatas** en `content/covers/candidata-1-flux.webp` (olivos en
  macetas alrededor de la mesa, FLUX semilla 963729750) y `candidata-2-zimage.webp`
  (columpio vacío al amanecer, Z-Image semilla 31679). Falta que Oscar elija.
- **Siguiente:** Oscar revisa (entrada, pivote, cierre, longitud) → elige título y
  portada → «publícalo» → n=58, slug del título, build, push a `main`, pack social.
  Si se publica, borrar las candidatas y mover este bloque a «Dónde nos quedamos».

## 📍 Dónde nos quedamos (cierre 29-sep-2026)

**Se publicó el post #57 «Mi Hijo Ya No es un Niño: Pastorear a un Preadolescente
Sin Perderlo»** (Familia · Caminar Cristiano, 7 min) →
https://oscarimorales.com/mi-hijo-ya-no-es-un-nino-pastorear-a-un-preadolescente-sin-perderlo
Continuación natural del #54: Alex llega a los 12, sus preguntas cambian, su
atención se mueve, hay que hablarle claro de los cambios del cuerpo y lograr que
siga contándoles todo. Título tomado del banco de ideas (Modo A, sección III).
Columna del texto: Lucas 2:41-52 — las 4 «marcas» de Lc 2:52 (sabiduría,
estatura, gracia con Dios, gracia con los hombres) — y el pivote «El que también
tuvo doce» (Heb 4:15-16). Enlaza al #54 y NO repite su marco (creación-caída-
esperanza). ~1,480 palabras; sin Guía de Estudio (no viene de un sermón).

- **Publicado hoy** tras el «Listo, publícalo» de Oscar: push directo a `main`
  (avance rápido desde la rama de trabajo). La Action "Compilar blog" (#21) y
  "pages build and deployment" (#70) terminaron en verde y el bot subió
  `<slug>.html`, `post-57.html`, feed y sitemap. Desde el entorno remoto NO se
  puede abrir oscarimorales.com (HTTP 000), así que la comprobación en vivo la
  hace Oscar.
- **Portada** (FLUX.1 Krea, 1344×768 → JPG 108 KB, semilla **1053508593**): niño
  de espaldas midiéndose junto a una regla dibujada en el marco de una puerta.
  Prompt exacto: "Photograph of a twelve-year-old boy seen from behind, standing
  straight beside a weathered white wooden doorframe with a vertical measuring
  ruler printed along its edge, elbow bent and one hand resting flat on top of
  his head to measure his height, soft warm golden light from behind the camera,
  evenly lit wall with no cast shadows, quiet intimate mood, film photography,
  35mm lens, shallow depth of field, face not visible". (El commit 67c1954 anota
  por error el prompt de otra variante; este es el bueno.) Oscar pidió un niño
  en la portada: excepción a "no people" — siempre de espaldas o en sombra, sin
  rostro. La 1ª versión tenía una sombra que parecía un segundo brazo; se
  arregló pidiendo luz sin sombras proyectadas.
- **Citas** en RVR1960, verificadas palabra por palabra con WebSearch (curl a
  los sitios bíblicos está bloqueado en el entorno remoto).
- **Pack social listo (a pedido de Oscar tras publicar el #57)**: tarjetas de Instagram con la marca —
  publicación cuadrada 1080×1080 e Historia vertical 1080×1920 (foto de la portada, frase en Playfair,
  «Nuevo en el blog · oscarimorales.com»)— más caption y correo del boletín. Diseño APROBADO por Oscar.
  Todo en `recursos/social/` (`plantilla.html`, `README.md`, y la carpeta del #57 con `post.jpg`,
  `historia.jpg`, `frase.txt`, `caption.txt`, `boletin.md`). Generador:
  `node scripts/social-cards.mjs <n> --frase "Renglón 1|Renglón 2|*énfasis*"` (instala las tipografías
  solo; regenera las del #57 pixel a pixel). Skill blog-oims **v6** con las secciones «Pack social» y
  «Cómo mostrarle archivos a Oscar». Instagram NO permite links clicables en el caption → link en la
  bio + sticker de enlace en la Historia. Se agregó `.gitignore` (`vista-previa/`, `node_modules/`).
- **#56 «Los apodos de los profetas»** (Mt 5:10-12, publicado el 21-sep, con
  Guía de Estudio #3 `recursos/guias/guia-los-apodos-de-los-profetas.pdf` y
  portada cruz + corona de espinas) tampoco se había anotado aquí — queda
  registrado. No consta si su correo del boletín se envió: preguntar a Oscar.

**Próximos pasos, en orden:**
1. Oscar: abrir el enlace del #57 y comprobar que carga; compartirlo después
   (si se comparte antes de que cargue, Facebook puede cachear un error).
2. Oscar: pegar el correo del boletín #57 en Buttondown → Emails → New email (el texto está en
   `recursos/social/057-…/boletin.md`) y confirmar si el del #56 ya se envió. Y publicar en Instagram:
   post (`post.jpg` + `caption.txt` + link en la bio) e Historia (`historia.jpg` + sticker de enlace).
3. Oscar: Sharing Debugger de Facebook → "Volver a extraer" (pendiente desde jun).
4. Entorno de nube (claude.ai/code → ☁ → Nube → engranaje): Network access
   **Custom** con `oscarimorales.com`, `fonts.googleapis.com`, `fonts.gstatic.com`
   (+ casilla de gestores de paquetes). YA NO hace falta para las portadas: el
   conector de Hugging Face deja la imagen en disco (la ruta sale en el resultado
   de la herramienta) → basta `cp` al repo, sin hf.space ni Drive. Sí serviría
   para verificar la publicación en vivo desde la sesión. (Oscar no pudo poner
   "Allowed domains" el 28-ago; reintentar con calma.)
5. Skills: **blog-oims ya quedó en v6** (29-sep) con el pack social, el correo del boletín, portadas
   desde el resultado del MCP, SendUserFile/PDF de lectura, verificación de citas y la regla
   «sin reformado/Reforma». Falta: (a) si Oscar usa blog-oims desde claude.ai, volver a subirla: el repo
   guarda solo la carpeta `.claude/skills/blog-oims/`, no el `.skill` empaquetado (se comprime esa
   carpeta, o pedirle a Claude que la empaquete); OJO: `scripts/social-cards.mjs` y `recursos/social/`
   viven en el repo, no dentro de la skill; (b) sermon-oims: grabar el flujo remoto de las guías (fuentes
   npm para el PDF) y el flujo de guías (validado 3 veces); (c) opcional: guardar en `scripts/` el
   generador del PDF de lectura (hoy solo está la receta en la skill). Si el Bash falla con «auto mode
   classifier gave no verdict» es transitorio: reintentar UNA vez y seguir con otra cosa.
6. (Futuro, con 3-4 guías acumuladas) Sección "Recursos" del sitio que las liste.
7. Ideas que siguen la línea de Alex: «Pantallas, Identidad y un Muchacho de
   Doce» y «Cuando tu Hijo Empieza a Preguntar lo que Tú También Te Preguntas»
   (banco de ideas, sección III).

**Cómo retomar:** abrir Claude Code en este repo y decir "¿en qué nos quedamos?".

## 📜 Detalle del 28-ago (post #55, primera publicación desde sesión remota)

**Se publicó el post #55 «El hambre de medianoche»** (Mateo 5:6, serie
Bienaventuranzas Parte IV) → https://oscarimorales.com/el-hambre-de-medianoche
Primera publicación completa desde una **sesión remota** (claude.ai/code):

- **El texto salió del "Paquete del predicador"** en Drive (regenerado el 21-ago
  desde el manuscrito FINAL del sermón): la sección "Propuesta de entrada de
  blog" ya venía lista; Oscar eligió el título principal. Categoría
  Meditaciones, n=55, fecha 28-ago.
- **Guía de Estudio #2** con la plantilla de `recursos/guias/src/` →
  `recursos/guias/guia-el-hambre-de-medianoche.pdf` + `guia:` en el frontmatter.
  Truco para sesiones remotas: las fuentes de marca se instalan desde npm
  (`@fontsource/playfair-display`, `spectral`, `montserrat`) porque Google
  Fonts está bloqueado; el PDF se imprime con el Chromium preinstalado.
- **Portada**: Z-Image generó 2 candidatas, pero la red del entorno remoto
  (política "Trusted") NO deja descargar de hf.space. Solución que funcionó:
  Oscar subió la elegida ("la refri") a Drive
  (`OSCARIMORALES - MARCA/POSTS-REDES/Refrigerador.webp`) y se bajó por el
  conector MCP de Drive (base64) → JPG 55 KB. **Semillas Z-Image guardadas por
  si hay que regenerar idéntico: refri=577837, mesa=335629.**
- **Push a main a las 12:00 en punto** vía trigger programado (Oscar pidió
  publicar a mediodía). El correo del boletín #55 quedó redactado en el chat
  del 28-ago.
- Nota: el post #54 («No Retrases la Conversación…», 30-jul) se publicó en una
  sesión que no actualizó esta bitácora — queda registrado aquí.

*(Los próximos pasos de ese cierre quedaron absorbidos en el cierre del 29-sep, arriba.)*

## 📜 Detalle del 23-jul (estreno de la Guía de Estudio)

**Día completo: se estrenó la Guía de Estudio descargable** (el pendiente ⭐ del
22-jul) con el sermón de Romanos 7 (post #52 "Querer no es poder"), afinada en
3 versiones con Oscar y verificada en vivo:
- **PDF de marca de 2 páginas** en `recursos/guias/guia-querer-no-es-poder.pdf`
  (Playfair/Spectral, terracota, logo). Contenido final: título con Mayúsculas
  En Cada Palabra, "Antes de empezar" (es parte de una serie + leer el texto
  primero), **el pasaje completo en NTV** (con el crédito de Tyndale, requisito
  de la traducción), idea central, "El recorrido del pasaje" (las 3 imágenes del
  sermón), 3 aplicaciones y 3 preguntas difíciles con respuestas.
- **Plantilla reutilizable:** la fuente HTML editable vive en
  `recursos/guias/src/` y se imprime a PDF con Chrome headless (make-pdf de
  gstack NO soporta marca propia — no usarlo para esto).
- **Campo `guia:` en el frontmatter** → el build valida que el PDF exista y la
  página del post muestra la tarjeta "Llévate la Guía de Estudio de este sermón".
- **A cambio del correo:** la tarjeta pide el correo (Buttondown, etiqueta
  `guia-<slug>` para saber de dónde vino cada suscriptor) y revela la descarga
  ahí mismo; el navegador recuerda el desbloqueo (localStorage).
- **Insignia "Guía de Estudio"** en las tarjetas del home y en el archivo
  (automática para todo post con `guia:`), y el cajón de suscripción ahora
  menciona "guías de estudio descargables de los sermones". Decisión: NO se puso
  anuncio en el home (envejece mal); el anuncio va en el boletín y redes.

*(Los próximos pasos de este cierre quedaron completados o absorbidos en el
cierre del 28-ago, arriba.)*

## 📜 Detalle del 22-jul (post #53 + URLs con nombre + preview arreglada)

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

### 1. ✅ Pack social para redes — "Nivel 1" (HECHO 29-sep-2026)
Tarjetas de Instagram (publicación 1080×1080 + Historia 1080×1920) y captions, con la marca. Plantilla
`recursos/social/plantilla.html`, generador `scripts/social-cards.mjs`, guía `recursos/social/README.md`;
la skill blog-oims v6 lo entrega después de publicar cada post. Ejemplo aprobado: #57.
Decisiones: Facebook y X NO llevan tarjeta propia (la vista previa sale del `og:image`/`twitter:card` de la
portada; solo se escribe el texto). El enlace en Instagram va en la bio + sticker de Historia. Se descartó
el rasterizador WASM en el build: el enfoque es **asistido** (el skill genera el pack; Oscar publica).
Abierto y opcional: versión 4:5 (1080×1350), carrusel de varias tarjetas, tarjeta para X (1200×675).

### 2. Correo del boletín en el skill `blog-oims` (acordado con Oscar)
El RSS-to-email de Buttondown es de pago, así que: **al publicar un post, el
skill debe generar también el correo del boletín redactado** (asunto + cuerpo
con una línea de contexto + enlace al post), para que Oscar solo lo pegue en
Buttondown (Emails → New email) y lo envíe. Encaja natural con el Pendiente #1.
**DECIDIDO (22-jul):** seguimos con este flujo asistido (gratis) mientras la
lista sea pequeña; cuando crezca (~50-100 suscriptores), se activa el plan de
$9/mes y el RSS-to-email con `feed.xml` — el sitio ya está listo, no hay que
cambiar nada. Los correos de los posts #52 y #53 ya se le entregaron redactados.
**HECHO 29-sep:** la skill v6 incluye el correo del boletín dentro del pack social; el del #57 quedó
guardado en `recursos/social/057-…/boletin.md`.

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
- **Pack social** (29-sep): plantilla + generador + skill v6; tarjetas de Instagram del #57 aprobadas por Oscar.
- **Post #57 «Mi Hijo Ya No es un Niño…»** (29-sep): del banco de ideas; Lc 2:52
  y las 4 «marcas»; portada FLUX (niño midiéndose); publicado con push a main
  tras la aprobación de Oscar. Detalle arriba.
- **Post #56 «Los apodos de los profetas»** (21-sep): Mt 5:10-12; Guía de
  Estudio #3; portada cruz + corona de espinas.
- **Post #55 «El hambre de medianoche»** (28-ago): del paquete del predicador
  (Mateo 5:6), con Guía de Estudio #2 y portada de la refri vía Drive; publicado
  a las 12:00 desde sesión remota con push programado.
- **Post #54 «No Retrases la Conversación Más Dura…»** (30-jul): publicado con
  portada propia (papá e hijo al horizonte).
- **Guía de Estudio descargable** (23-jul): estrenada con el post #52 (Romanos 7).
  Campo `guia:` en el frontmatter → tarjeta en el post que pide el correo
  (Buttondown, tag `guia-<slug>`) y revela el PDF; desbloqueo recordado en el
  navegador. PDF de marca en `recursos/guias/` (plantilla HTML en
  `recursos/guias/src/`, se imprime con Chrome headless). El build valida que
  el PDF exista. Las descargas del PDF NO se ven en Cloudflare Analytics.
- **Estadísticas de visitas** (22-jul): Cloudflare Web Analytics (gratis, sin
  cookies — no requiere banner) en portada, posts, post.html y bienvenida; NO en
  las redirecciones (evita doble conteo). Oscar ve los datos en
  dash.cloudflare.com → Web Analytics (visitantes, páginas, referidos, países).
  Los datos cuentan desde hoy — no hay historial hacia atrás.
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
