# Landing — Blog `oscarimorales.com`

Landing nueva pensada para que el archivo del blog sea el protagonista. Sin
foto, sin descriptores de oficio, sin libros aún. Diseño editorial / revista
pastoral, en la voz visual del sistema (Montserrat + Playfair editorial,
Crema / Noche / Terracota / Dorado).

## Estructura
1. **Nav** — minimal: logo + Inicio · Blog · Boletín.
2. **Hero** — wordmark "Secundum Fidem" + statement editorial, sin imagen.
3. **Último publicado** — featured grande con el post más reciente.
4. **Más leídos** — 3 entradas con número editorial.
5. **Por tema** — grid de categorías sobre fondo Noche.
6. **Archivo** — lista cronológica agrupada por año, estilo índice de libro.
7. **Boletín** — captura de correos (CTA Noche).
8. **Footer** — redes + créditos.

## Datos
`posts-data.js` contiene los 51 posts existentes de `oscarimorales.com/blog`
con título, fecha, categorías y URL absoluta. Cuando esté listo el endpoint,
sólo hay que reemplazar el array por un `fetch` a la API REST de WordPress
(ver el comentario al final del archivo).

## Cómo correrlo
Abrir `index.html` en el navegador. React + Babel se cargan desde CDN.
