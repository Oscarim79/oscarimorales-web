# Calendario de Adviento para llevar en familia — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar en oscarimorales.com cinco PDF de sesiones de adviento (más una guía para papás) de descarga libre, con un post #64 que los lista, enlaces cruzados con la serie de Navidad, pack social y cinco correos de boletín.

**Architecture:** Los PDF nacen de HTML con la marca (una hoja de estilos compartida más un HTML por PDF) impresos con Playwright/Chromium por un script nuevo, `scripts/adviento-pdf.mjs`, que además verifica páginas, peso y palabras en voz alta. El post es un archivo `.html` en `content/posts/` que el build existente convierte; los botones de descarga son enlaces normales con una clase nueva en la hoja de estilos del post.

**Tech Stack:** Node 18+, Playwright con Chromium preinstalado, fuentes `@fontsource` (playfair-display, spectral, montserrat) como en `scripts/social-cards.mjs`, `scripts/build-posts.mjs`, `scripts/social-cards.mjs`.

**Spec:** `docs/superpowers/specs/2026-11-11-calendario-adviento-design.md`

## Global Constraints

- Nombre del recurso, verbatim: «Calendario de Adviento para llevar en familia».
- Fechas: dom 29-nov (Esperanza), dom 6-dic (Paz), dom 13-dic (Gozo), dom 20-dic (Amor), jue 24-dic (Cristo). Año 2026.
- Tres niveles, con estos rótulos exactos: **Preescolar (3-6)**, **Primaria (6-11)**, **Preadolescentes (11-14)**.
- Cada sesión: 10 minutos o menos. Límite medible: el texto que el adulto lee en voz alta (marcado con `data-leer`) no pasa de **950 palabras** por sesión, y la «historia contada» no pasa de **420 palabras**.
- Frase de la familia, verbatim, en las cinco sesiones y en la guía: Adulto: «¿Por qué encendemos esta luz?» Niños: «Porque Jesús es la Luz del mundo, y Dios cumple lo que promete».
- PDF: tamaño carta, menos de 1 MB cada uno, sesiones de exactamente 4 páginas (portada, liturgia ×2, recortable); guía para papás de exactamente 2 páginas.
- Nombres de archivo fijos: `recursos/adviento/adviento-00-guia-para-papas.pdf`, `adviento-01-esperanza.pdf`, `adviento-02-paz.pdf`, `adviento-03-gozo.pdf`, `adviento-04-amor.pdf`, `adviento-05-cristo.pdf`.
- Texto bíblico impreso: solo el versículo clave, en NTV, con la línea de crédito usada en las guías («Texto bíblico: Nueva Traducción Viviente, © Tyndale House Foundation. Usado con permiso.»), verificado contra la NTV antes de imprimir. El pasaje completo se lee de la Biblia de la familia.
- Villancicos: una estrofa de traducciones tradicionales de dominio público; el enlace para cantar es una búsqueda de YouTube (`https://www.youtube.com/results?search_query=<título>`), que no caduca.
- Paleta y tipografías: las de `recursos/guias/src/guia-querer-no-es-poder.html` (variables `--noche`, `--terracota`, `--crema-*`, `--dorado`; Playfair Display, Spectral, Montserrat).
- Voz: la de Oscar (`.claude/skills/blog-oims/references/voz-y-marco.md`). Marco 1689, cristocéntrico. Prohibido: «portarse bien para que llegue la Navidad», Santa, sincretismo.
- Acceso libre: ningún PDF usa el campo `guia:` del frontmatter ni el desbloqueo por correo.
- Post #64 como `.html`: `content/posts/064-calendario-de-adviento-para-llevar-en-familia.html` (el conversor Markdown envuelve el HTML crudo en `<p>`).
- Nada de identificadores de modelo en commits ni archivos publicados.

## Review Focus

1. Una familia imprime en blanco y negro: las velas y rótulos de nivel deben distinguirse sin color (Task 1 prueba con `-grayscale` visual; los niveles llevan icono o texto, no solo color).
2. Una familia empieza tarde (p. ej. el 13-dic): la guía para papás dice que se puede empezar cualquier semana y encender las velas anteriores juntas (Task 2).
3. Una familia sin corona: la guía dice que sirve cualquier vela, o cinco dibujadas en papel (Task 2).
4. El adulto lee en pantalla del teléfono, no imprime: la liturgia no depende de «ver la página siguiente»; cada momento cabe en su propia sección con título (Task 3).
5. Alguien comparte el enlace del PDF por WhatsApp: la URL es corta y estable, y el post tiene portada JPG < 300 KB para la vista previa (Task 6).

---

### Task 1: Base del paquete PDF (estilos compartidos y script de impresión)

**Files:**
- Create: `recursos/adviento/src/adviento.css`
- Create: `recursos/adviento/src/_prueba.html` (temporal, se borra al final de la tarea)
- Create: `scripts/adviento-pdf.mjs`
- Modify: `recursos/README.md` (sección nueva «Calendario de Adviento»)

**Interfaces:**
- Produces: `node scripts/adviento-pdf.mjs [nombre-sin-extensión…]` imprime cada `recursos/adviento/src/<nombre>.html` a `recursos/adviento/<nombre>.pdf`; sin argumentos imprime todos salvo los que empiezan con `_`. Al terminar imprime una línea por PDF: `✅ adviento-01-esperanza.pdf · 4 págs · 312 KB · leer: 870 palabras (historia 390)` y sale con código 1 si falla alguna regla: páginas ≠ 4 (≠ 2 para `adviento-00-*`), peso ≥ 1 MB, `data-leer` total > 950, `data-leer="historia"` > 420.
- Produces: clases CSS compartidas que usan las sesiones: `.portada`, `.portada__vela` (con `data-vela="esperanza|paz|gozo|amor|cristo"`), `.momento` (bloque de la liturgia con `.momento__n`, `.momento__t`, `.momento__min`), `.nivel` (con `data-nivel="preescolar|primaria|preadolescentes"`), `.recortable`, `.frase-familia`, `.pie`.
- Produces: el marcado `data-leer="<nombre>"` en cualquier elemento cuyo texto lee el adulto; el script suma palabras por atributo.

- [ ] **Step 1: Escribir `_prueba.html`** con las cuatro páginas vacías de una sesión (portada, dos de liturgia con cinco `.momento`, recortable) y un `data-leer="historia"` de 500 palabras de relleno, para que la regla falle.

- [ ] **Step 2: Escribir `scripts/adviento-pdf.mjs`.** Reutiliza el enfoque de fuentes de `scripts/social-cards.mjs` (`prepararFuentes`, paquetes `@fontsource/playfair-display`, `@fontsource/spectral`, `@fontsource/montserrat`; inyectar `@font-face` con `file://` a los `.woff2`), `page.pdf({ format: 'Letter', printBackground: true, preferCSSPageSize: true })`, contar páginas con una expresión regular sobre `/Type\s*/Page[^s]` en el PDF, y contar palabras de `data-leer` con `page.$$eval`.

- [ ] **Step 3: Correr y ver que falla por palabras**

Run: `node scripts/adviento-pdf.mjs _prueba`
Expected: salida con `❌ _prueba.pdf … historia 500 > 420` y código de salida 1.

- [ ] **Step 4: Escribir `adviento.css`** con la marca, `@page { size: letter; margin: 0.7in 0.85in 0.6in }`, portada a sangre (`.portada` con `margin: -0.7in -0.85in` y `page-break-after: always`), cinco velas dibujadas en CSS/SVG inline con un rótulo de texto debajo (legibles en gris), `.nivel` con rótulo de texto y un icono distinto por nivel (círculo, cuadrado, triángulo), `.recortable` con línea punteada y tijera, y `.pie` con «oscarimorales.com · Secundum Fidem» en cada página de liturgia.

- [ ] **Step 5: Recortar el relleno de `_prueba.html` a 400 palabras, correr y ver que pasa**

Run: `node scripts/adviento-pdf.mjs _prueba`
Expected: `✅ _prueba.pdf · 4 págs · … · leer: 400 palabras (historia 400)`, código 0.

- [ ] **Step 6: Prueba visual en gris.** Convertir la página 2 del PDF a PNG en escala de grises (`pdftoppm -gray -r 60 -f 2 -l 2` si existe; si no, captura de Playwright con `filter: grayscale(1)` inyectado) y mirar que velas y niveles se distinguen. Guardar la captura en `vista-previa/` (ignorado por git).

- [ ] **Step 7: Borrar `_prueba.html` y su PDF; documentar en `recursos/README.md`** una sección «Calendario de Adviento»: carpeta, nombres fijos, cómo regenerar (`node scripts/adviento-pdf.mjs`), y las reglas que el script verifica.

- [ ] **Step 8: Commit**

```bash
git add recursos/adviento/src/adviento.css scripts/adviento-pdf.mjs recursos/README.md
git commit -m "Adviento: estilos compartidos y script que imprime y verifica los PDF"
```

---

### Task 2: Guía para papás (adviento-00)

**Files:**
- Create: `recursos/adviento/src/adviento-00-guia-para-papas.html`
- Create (generado): `recursos/adviento/adviento-00-guia-para-papas.pdf`

**Interfaces:**
- Consumes: `adviento.css`, `scripts/adviento-pdf.mjs` (Task 1).
- Produces: el texto de la «frase de la familia» y la tabla de las cinco fechas, que las sesiones repiten tal cual.

- [ ] **Step 1: Escribir el HTML de dos páginas.** Página 1: título del recurso, qué es el adviento en tres párrafos (espera del Salvador prometido; la corona y sus velas como costumbre, no mandato; Cristo como cumplimiento), «Lo que necesitan» (cinco velas de cualquier tipo, o cinco dibujadas en papel; tijeras; una Biblia; el PDF de la semana impreso o en el teléfono), y la tabla de las cinco fechas con vela, tramo y nombre del PDF. Página 2: cómo va una sesión (los cinco momentos con sus minutos), los tres niveles y cómo elegir la pregunta si hay hijos de edades distintas (se hacen dos preguntas, no tres; se empieza por el menor), «Si empiezan tarde» (se puede arrancar cualquier semana; ese día se encienden juntas las velas anteriores), «Si un día no se pudo» (se hace entre semana, no se salta), la frase de la familia destacada en `.frase-familia`, y el pie.

- [ ] **Step 2: Imprimir y verificar**

Run: `node scripts/adviento-pdf.mjs adviento-00-guia-para-papas`
Expected: `✅ adviento-00-guia-para-papas.pdf · 2 págs · <1 MB`.

- [ ] **Step 3: Leer el PDF entero** (abrir con `Read`) y corregir cortes de página o viudas.

- [ ] **Step 4: Commit**

```bash
git add recursos/adviento/src/adviento-00-guia-para-papas.html recursos/adviento/adviento-00-guia-para-papas.pdf
git commit -m "Adviento: guía para papás"
```

---

### Task 3: Sesión 1, Esperanza (la muestra que revisa Oscar)

**Files:**
- Create: `recursos/adviento/src/adviento-01-esperanza.html`
- Create (generado): `recursos/adviento/adviento-01-esperanza.pdf`

**Interfaces:**
- Consumes: Task 1 (clases, `data-leer`, script) y Task 2 (frase de la familia).
- Produces: la **estructura de sesión** que las sesiones 2 a 5 copian sin cambiar: portada (`.portada` con vela, «Sesión 1 de 5», «Domingo 29 de noviembre», «Esperanza», subtítulo «La promesa: Edén y Abraham»); página 2 con momentos 1 a 3; página 3 con momentos 4 y 5 y la frase de la familia; página 4 recortable.

Contenido fijado por la spec y por este plan:

| Momento | Contenido de la sesión 1 |
|---|---|
| 1 Encendido (1 min) | Quién enciende: el hijo menor con ayuda. Qué se dice: una línea sobre la primera vela, la Esperanza. Luego la frase de la familia. |
| 2 Lectura (2 min) | Leer de la Biblia Génesis 3:8-15 y 12:1-3. Versículo clave impreso: Génesis 3:15 (NTV). |
| 3 Historia (3 min, ≤ 420 palabras, `data-leer="historia"`) | Del jardín perdido a la promesa a Abraham: Dios promete, en el mismo lugar del pecado, un hijo de mujer que aplastará a la serpiente; siglos después promete a Abraham que por su familia serán bendecidas todas las naciones. La esperanza no es «ojalá»: es Dios que ya dijo lo que va a hacer. Cierra apuntando a Jesús. |
| 4 Hablemos (2 min) | Preescolar: «¿Qué prometió Dios en el jardín?» con la respuesta esperada. Primaria: «¿En qué se parece esperar a Jesús a esperar algo que alguien ya te prometió y siempre cumple?». Preadolescentes: «Si Dios ya había prometido un Salvador desde Génesis 3, ¿por qué crees que tardó tanto? ¿Qué dice eso de cómo Dios cumple?» (con una pista para el adulto, Gálatas 4:4). |
| 5 Oración y canto (2 min) | Oración guiada de ≤ 80 palabras que el adulto lee y los niños repiten por frases. Villancico: «Oh ven, oh ven, Emanuel», primera estrofa; enlace de búsqueda. |
| Recortable | Estrella de ocho puntas con el rótulo «Esperanza · Génesis 3:15», SVG inline con trazo para recortar. |

- [ ] **Step 1: Verificar el texto de Génesis 3:15 en la NTV** (web-fetch a bible.com o biblegateway, versión NTV) y guardarlo en el HTML con la línea de crédito.

- [ ] **Step 2: Escribir el HTML de la sesión** según la tabla, con `data-leer` en encendido, historia, preguntas y oración.

- [ ] **Step 3: Imprimir y verificar**

Run: `node scripts/adviento-pdf.mjs adviento-01-esperanza`
Expected: `✅ adviento-01-esperanza.pdf · 4 págs · <1 MB · leer: ≤950 (historia ≤420)`.

- [ ] **Step 4: Cronometrar.** Leer en voz alta la hoja litúrgica (o estimar a 140 palabras por minuto más 1 minuto de encendido y 2 de diálogo) y anotar el total en el commit. Debe dar 10 minutos o menos.

- [ ] **Step 5: Leer el PDF entero** y corregir cortes, viudas y legibilidad del recortable.

- [ ] **Step 6: Commit y entregar a Oscar** el PDF de la sesión 1 y la guía con `SendUserFile`. **Parar aquí hasta que Oscar apruebe o pida cambios.** Los cambios se aplican a `adviento-01` y, si tocan la estructura, también a `adviento.css` antes de seguir.

```bash
git add recursos/adviento/src/adviento-01-esperanza.html recursos/adviento/adviento-01-esperanza.pdf
git commit -m "Adviento: sesión 1, Esperanza (muestra para revisión)"
```

---

### Task 4: Sesiones 2 a 5

**Files:**
- Create: `recursos/adviento/src/adviento-02-paz.html`, `adviento-03-gozo.html`, `adviento-04-amor.html`, `adviento-05-cristo.html`
- Create (generados): los cuatro PDF correspondientes.

**Interfaces:**
- Consumes: la estructura de sesión aprobada en Task 3. No se cambia la estructura; solo el contenido.

Contenido fijado por sesión:

| # | Portada | Lectura de la Biblia | Clave impreso (NTV) | Historia (≤ 420 palabras) | Villancico | Recortable |
|---|---|---|---|---|---|---|
| 2 | Sesión 2 de 5 · Domingo 6 de diciembre · Paz · «Los profetas: Isaías anuncia al Príncipe de Paz» | Isaías 9:2-7 | Isaías 9:6 | Setecientos años antes, en tiempos de guerra, Isaías anuncia un niño que será Dios fuerte y Príncipe de Paz. Paz no es que no pase nada: es estar bien con Dios. | «Noche de paz», primera estrofa | Ángel |
| 3 | Sesión 3 de 5 · Domingo 13 de diciembre · Gozo · «El anuncio: Gabriel a María» | Lucas 1:26-38 y 46-49 | Lucas 1:46-47 | Gabriel llega a una muchacha de un pueblo pequeño; ella pregunta, cree y canta. El gozo nace de que Dios se acordó de su promesa. | «Ángeles cantando están», primera estrofa | Pastor |
| 4 | Sesión 4 de 5 · Domingo 20 de diciembre · Amor · «José y el Dios con nosotros» | Mateo 1:18-25 | Mateo 1:23 | José, el justo que quería proteger a María; el ángel en sueños; el nombre Jesús, «el Señor salva», y Emanuel, «Dios con nosotros». El amor de Dios no se queda lejos: viene a vivir con nosotros. | «Venid, fieles todos», primera estrofa | María y José |
| 5 | Sesión 5 de 5 · Jueves 24 de diciembre · Cristo · «El nacimiento y los pastores» | Lucas 2:1-20 | Lucas 2:11 | El censo, el pesebre, los pastores que eran los últimos de la lista y fueron los primeros en saberlo. La vela del centro se enciende con las otras cuatro: la promesa cumplida. Cierre: este niño creció, murió y resucitó por nosotros. | «Al mundo paz, nació Jesús», primera estrofa | Niño Jesús en el pesebre |

Preguntas por nivel: tres por sesión, siguiendo la escalera de Task 3 (observar y repetir; entender y relacionar; aplicar y cuestionar), con respuesta esperada para preescolar y pista bíblica para preadolescentes.

- [ ] **Step 1: Verificar los cuatro versículos clave en la NTV** y las primeras estrofas tradicionales de los cuatro villancicos (versiones de dominio público).

- [ ] **Step 2: Escribir los cuatro HTML.**

- [ ] **Step 3: Imprimir y verificar los cinco de una vez**

Run: `node scripts/adviento-pdf.mjs`
Expected: seis líneas `✅`, código 0.

- [ ] **Step 4: Leer los cuatro PDF** y corregir.

- [ ] **Step 5: Commit**

```bash
git add recursos/adviento/
git commit -m "Adviento: sesiones 2 a 5 (Paz, Gozo, Amor, Cristo)"
```

---

### Task 5: Estilo de la lista de descargas en el post

**Files:**
- Modify: `project/ui_kits/landing_blog/post-prod.css` (después del bloque `.prose__serie`, línea ~64)

**Interfaces:**
- Produces: el marcado que usa Task 6:

```html
<div class="prose__descargas">
  <a class="prose__descarga" href="recursos/adviento/adviento-01-esperanza.pdf" download>
    <span class="prose__descarga-fecha">Dom 29 nov</span>
    <span class="prose__descarga-t">Sesión 1 · Esperanza</span>
    <span class="prose__descarga-s">La promesa: Edén y Abraham</span>
    <span class="prose__descarga-btn">Descargar PDF ↓</span>
  </a>
</div>
```

- [ ] **Step 1: Escribir el CSS**: `.prose__descargas` como lista en columna con separadores; `.prose__descarga` como fila en rejilla (fecha | título y subtítulo | botón), sin subrayado, fondo crema al pasar; `.prose__descarga-btn` con el estilo del botón `.guia__btn` existente; en pantallas de menos de 560 px la rejilla pasa a una columna.

- [ ] **Step 2: Comprobar en el navegador.** Crear una copia temporal de un post en `vista-previa/` con el marcado de arriba, servirlo localmente y capturar a 1280 px y 390 px con Playwright. Ver que el botón es tocable en móvil.

- [ ] **Step 3: Commit**

```bash
git add project/ui_kits/landing_blog/post-prod.css
git commit -m "Post: lista de descargas (.prose__descargas) para recursos de acceso libre"
```

---

### Task 6: Post #64 y enlaces cruzados

**Files:**
- Create: `content/posts/064-calendario-de-adviento-para-llevar-en-familia.html`
- Create: `content/covers/064-calendario-de-adviento-para-llevar-en-familia.jpg` (JPG < 300 KB)
- Modify: `content/posts/030-…html` a `035-…html` (la `<ul>` dentro de `.prose__serie`)

**Interfaces:**
- Consumes: nombres de PDF (Task 1), marcado `.prose__descargas` (Task 5).
- Produces: slug público `calendario-de-adviento-para-llevar-en-familia`.

- [ ] **Step 1: Frontmatter** con `n: 64`, título exacto, `date` = fecha de publicación (prevista 2026-11-22; se ajusta al publicar), `cats: ["Familia", "Caminar Cristiano"]`, `excerpt` de una línea con «cinco sesiones de 10 minutos», `quote` corta, `featured: true`, `cover` con la ruta del JPG.

- [ ] **Step 2: Portada.** Seguir el flujo de portada del skill blog-oims (dos candidatas, Oscar elige). Si no hay cuota de imágenes, `cover: "auto"` y la imagen se cambia después; la publicación no se bloquea.

- [ ] **Step 3: Cuerpo en HTML**, en este orden: caja `.prose__serie` «Serie sobre la Navidad» con los cinco posts de la serie más esta entrada en negrita; tres o cuatro párrafos en la voz de Oscar (qué es el adviento, por qué hacerlo en casa con los hijos, qué no es); «Cómo funciona» en tres puntos (cinco encuentros, 10 minutos, tres edades); la guía para papás como primer enlace de descarga; la lista `.prose__descargas` con las cinco sesiones; un cierre breve que invita a compartir el enlace con otra familia. Entre 600 y 900 palabras.

- [ ] **Step 4: Enlaces cruzados.** En cada uno de #30 a #35, añadir al final de la `<ul>` de `.prose__serie`: `<li><a href="calendario-de-adviento-para-llevar-en-familia">Calendario de Adviento para llevar en familia</a></li>`.

- [ ] **Step 5: Compilar**

Run: `node scripts/build-posts.mjs`
Expected: sin `❌`; `sitemap.xml` incluye `calendario-de-adviento-para-llevar-en-familia`; existe `calendario-de-adviento-para-llevar-en-familia.html` en la raíz.

- [ ] **Step 6: Comprobar en local.** Servir la raíz, abrir el post con Playwright, hacer clic en cada uno de los seis enlaces de descarga y verificar que responden 200 con `Content-Type: application/pdf`. Capturar el post a 1280 px y 390 px y enviar a Oscar con `SendUserFile`.

- [ ] **Step 7: Commit**

```bash
git add content/posts/064-* content/covers/064-* content/posts/03[0-5]-*.html
git add -A  # salida del build
git commit -m "#64: Calendario de Adviento para llevar en familia; enlace desde la serie de Navidad"
```

---

### Task 7: Pack social y correos del boletín

**Files:**
- Create: `recursos/social/064-calendario-de-adviento-para-llevar-en-familia/` con `frase.txt`, `post.jpg`, `historia.jpg`, `caption.txt`, `facebook.txt`, `x.txt`, `boletin.md`, `boletin-semanas.md`

**Interfaces:**
- Consumes: post #64 con portada de imagen (Task 6); `scripts/social-cards.mjs`.

- [ ] **Step 1: Tarjetas.** `node scripts/social-cards.mjs 64 --frase "Cinco domingos,|diez minutos,|*una promesa cumplida*"` (Oscar puede cambiar la frase).

- [ ] **Step 2: Textos** según el skill blog-oims: caption de Instagram, Facebook, X y el correo de estreno en `boletin.md`.

- [ ] **Step 3: `boletin-semanas.md`**: cinco correos de menos de 120 palabras cada uno, con asunto, fecha de envío (sábado anterior a cada sesión: 28-nov, 5, 12, 19 y 23-dic), una línea del tramo de la semana y el enlace directo al PDF (`https://oscarimorales.com/recursos/adviento/adviento-0N-….pdf`) más el enlace al post.

- [ ] **Step 4: Commit**

```bash
git add recursos/social/064-*
git commit -m "#64: pack social y correos semanales del Calendario de Adviento"
```

---

### Task 8: Publicación y bitácora

**Files:**
- Modify: `.claude/PENDIENTES.md`
- Modify: `recursos/social/temporada-navidad-2026.md` (añadir el calendario al plan de difusión)

- [ ] **Step 1: Esperar el «publícalo» de Oscar.** Ajustar `date` del #64 al día real, recompilar, y empujar la rama con `git push -u origin ccr-5fe6ee1c-4moqt2` (reintentos 2 s, 4 s, 8 s, 16 s si falla la red). Si Oscar pide PR o merge a `main`, hacerlo entonces, no antes.

- [ ] **Step 2: Verificar en producción** una vez desplegado: cada URL de PDF responde 200; pegar la URL del post en un verificador de Open Graph (o `curl -sI`) y confirmar `og:image` con el JPG.

- [ ] **Step 3: Bitácora.** En `.claude/PENDIENTES.md`: mover el calendario a «Hecho», dejar en «Dónde nos quedamos» los pendientes de Oscar (programar los cinco correos, publicar en redes el día del estreno) y las fechas. En `temporada-navidad-2026.md`, añadir las cinco fechas de los correos al calendario de difusión.

- [ ] **Step 4: Commit y push**

```bash
git add .claude/PENDIENTES.md recursos/social/temporada-navidad-2026.md
git commit -m "Bitacora: Calendario de Adviento publicado; correos semanales pendientes de programar"
git push -u origin ccr-5fe6ee1c-4moqt2
```
