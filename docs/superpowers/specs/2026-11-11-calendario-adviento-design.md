# Calendario de Adviento para llevar en familia — diseño

Fecha: 2026-11-11 · Estado: aprobado por Oscar en conversación

## 1. Propósito

Un recurso descargable y gratuito de oscarimorales.com para que un papá o una mamá
dirija, sin preparación previa, una sesión de adviento con sus hijos. Cinco
sesiones (los cuatro domingos de adviento y Nochebuena), cada una de **10 minutos o
menos**, con la liturgia completa de la corona de adviento y contenido adaptado a tres
edades: preescolar (3-6), primaria (6-11) y preadolescentes (11-14).

Éxito: una familia lo usa de principio a fin solo con los PDF, una corona con cinco
velas y tijeras. Objetivo de temporada: **visitas y alcance**, no captura de correos.

Marco: Confesión de 1689, cristocéntrico. El adviento se presenta como espera del
Salvador prometido y cumplimiento de la promesa en Cristo. Nada de "portarse bien
para que llegue la Navidad" ni de sincretismo.

## 2. Decisiones tomadas

| Pregunta | Decisión |
|---|---|
| Edades | Tres niveles por sesión: preescolar, primaria, preadolescentes |
| Ritmo | Cuatro domingos (29-nov, 6, 13, 20-dic) más Nochebuena (24-dic) |
| Formato | Cinco PDF separados, uno por sesión, liberados semana a semana por el boletín |
| Acceso | **Descarga libre**, sin correo ni desbloqueo |
| Hilo | Híbrido: velas con nombres clásicos, cada una contada desde un tramo de la historia de la redención |
| Nombre | «Calendario de Adviento para llevar en familia» |

## 3. Contenido de las sesiones

### Estructura litúrgica fija (misma en las cinco)

| # | Momento | Tiempo | Contenido |
|---|---|---|---|
| 1 | Encendido de la vela | 1 min | Quién enciende, qué se dice al encender, y la **frase de la familia** que se repite todas las semanas |
| 2 | Lectura breve | 2 min | Pasaje eje. Se marca el versículo clave para leer solo ese si hay pequeños |
| 3 | La historia contada | 3 min | El tramo de la historia en voz de cuento, para que el adulto lo lea tal cual |
| 4 | Hablemos | 2 min | Una pregunta por nivel (Preescolar / Primaria / Preadolescentes); se usa la que toque |
| 5 | Oración y canto | 2 min | Oración corta guiada y una estrofa de un villancico conocido en español, con enlace a una versión para cantar |

### Las cinco semanas

| Sesión | Fecha | Vela | Tramo | Pasaje eje | Recortable |
|---|---|---|---|---|---|
| 1 | Dom 29-nov | Esperanza | La promesa: Edén y Abraham | Génesis 3:15; 12:3 | Estrella |
| 2 | Dom 6-dic | Paz | Los profetas: Isaías anuncia al Príncipe de Paz | Isaías 9:6-7 | Ángel |
| 3 | Dom 13-dic | Gozo | El anuncio: Gabriel a María; el canto de María | Lucas 1:26-38, 46-55 | Pastor |
| 4 | Dom 20-dic | Amor | José y el Dios con nosotros | Mateo 1:18-25 | María y José |
| 5 | Jue 24-dic | Cristo | El nacimiento y los pastores | Lucas 2:1-20 | Niño Jesús |

El recortable es una pieza del pesebre que se arma semana a semana. Es la actividad
manual de los niños y no consume tiempo del adulto: se recorta durante o después de la
historia.

### Voz

La de Oscar en el blog y las Guías de Estudio: cálida, directa, pastoral. La "historia
contada" se escribe en segunda persona del plural hacia los niños, con frases cortas.
Las preguntas por nivel suben en abstracción: preescolar (observar y repetir),
primaria (entender y relacionar), preadolescentes (aplicar y cuestionar).

## 4. Producto

### Los PDF

Carpeta: `recursos/adviento/`. Nombres fijos y compartibles:

```
recursos/adviento/adviento-00-guia-para-papas.pdf   (2 páginas)
recursos/adviento/adviento-01-esperanza.pdf
recursos/adviento/adviento-02-paz.pdf
recursos/adviento/adviento-03-gozo.pdf
recursos/adviento/adviento-04-amor.pdf
recursos/adviento/adviento-05-cristo.pdf
```

Cada sesión: portada (vela, fecha, título), hoja litúrgica de dos páginas con los
cinco momentos y sus tiempos, y una tercera página con el recortable. Tamaño carta,
menos de 1 MB cada uno.

La guía para papás: qué es el adviento y por qué hacerlo en casa, cómo armar la
corona (cuatro velas más la de Cristo al centro; sirve cualquier vela), cómo usar los
tres niveles, y la frase de la familia.

Producción: plantilla HTML con la marca (misma paleta y tipografías que
`recursos/guias/src/`) impresa a PDF con Chromium. Fuentes en
`recursos/adviento/src/`, un HTML por PDF más una hoja de estilos compartida.

### La página en el sitio

Post **#64**, `content/posts/064-calendario-de-adviento-para-llevar-en-familia.md`.
Título: «Calendario de Adviento para llevar en familia». Categorías: `["Familia",
"Caminar Cristiano"]`. Portada propia (JPG ligero). Destacado en portada mientras dure
la temporada.

Cuerpo: qué es el adviento y por qué vale la pena en casa (breve, en la voz de Oscar),
cómo funciona el calendario (cinco domingos, 10 minutos, tres edades), y la **lista de
las cinco sesiones** con fecha, vela, tramo y botón de descarga directa al PDF, más la
guía para papás arriba. Los cinco enlaces se muestran desde el primer día.

No se usa el campo `guia:` del frontmatter: ese flujo pide correo. Los botones son
enlaces normales dentro del cuerpo, con una clase propia (`.prose__descargas`) para
la lista de sesiones, definida en la hoja de estilos del post.

### Enlaces cruzados

- El #64 lleva la caja `.prose__serie` «Serie sobre la Navidad» con los seis posts.
- Los seis posts de la serie (#30 a #35) reciben una línea al calendario dentro de su
  caja de serie.

### Difusión

- Pack social del #64 el día del estreno (flujo habitual del skill blog-oims).
- Cinco correos cortos para Buttondown, uno por domingo, con el enlace del PDF de la
  semana. Se entregan redactados en `recursos/social/064-.../boletin-semanas.md`;
  Oscar los programa.

## 5. Calendario de producción

| Paso | Entrega | Revisión de Oscar |
|---|---|---|
| 1 | Sesión 1 (Esperanza) en PDF + guía para papás | Voz, tiempos, nivel de los niños |
| 2 | Sesiones 2 a 5 con los ajustes aplicados | Lectura final |
| 3 | Post #64 con portada, lista de sesiones, caja de serie; línea en #30-#35 | Vista del post |
| 4 | Pack social y cinco correos | Textos |
| 5 | Publicación alrededor del **22-nov** | Él publica en redes y programa correos |

## 6. Verificación

- Cada PDF se imprime a carta sin cortes raros de página y pesa menos de 1 MB.
- La hoja litúrgica se cronometra en voz alta: 10 minutos o menos.
- `node scripts/build-posts.mjs` corre sin errores y el sitemap incluye el #64.
- Cada botón de la página publicada abre el PDF correcto.
- La vista previa del post se ve bien al pegarla en WhatsApp (portada JPG < 300 KB).

## 7. Fuera de alcance (2027 si funciona)

Página web interactiva, versión en inglés, versión del 1 al 24 de diciembre.
