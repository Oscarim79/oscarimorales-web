# Pack social — tarjetas para Instagram

Tarjetas con la marca de *Secundum Fidem* para anunciar cada post. Diseño aprobado por
Oscar el 29-sep-2026 con el post #57.

| Archivo | Medida | Para qué |
|---|---|---|
| `post.jpg` | 1080×1080 | **Publicación** del feed (Instagram y Facebook) |
| `historia.jpg` | 1080×1920 | **Historia** de Instagram (con espacio libre para el sticker de enlace) |
| `caption.txt` | — | Texto de la publicación, listo para copiar y pegar |
| `boletin.md` | — | Correo del boletín (asunto + cuerpo) para pegar en Buttondown → Emails → New email |
| `x.txt` | — | Post para X (Twitter): texto + enlace, dentro de los 280 caracteres |
| `frase.txt` | — | La frase grande de la tarjeta (para poder regenerar idéntico) |

Cada post tiene su carpeta: `recursos/social/<NNN>-<slug>/`. La plantilla del diseño es
`plantilla.html` y el logo en crema está en `assets/icono-crema.png`.

## Cómo generarlas

```bash
node scripts/social-cards.mjs 57 --frase "No le temo a que crezca.|Le temo a que crezca|*en silencio.*"
```

- **`|`** parte el renglón; **`*palabras*`** salen en terracota (úsalo para las palabras clave del final).
- Elige la línea más contundente del post (el gancho o la frase-ancla), **de ~12 palabras o menos**, en 2–3 renglones.
- Sin `--frase` reutiliza `frase.txt` de la carpeta; si no existe, usa el `quote` del post.
- `--solo post` o `--solo historia` genera un solo formato; `--tam 72` fuerza el tamaño de letra.
- Necesita el post con **portada de imagen** (`cover` distinto de `auto`), porque la portada es el fondo.
- Requisitos: Node 18+ y Playwright con Chromium. Las tipografías de marca (Playfair Display y
  Montserrat) se instalan solas desde npm si faltan: en sesiones remotas de Claude Code Google
  Fonts está bloqueado.
- **Siempre mira las imágenes antes de enviarlas** (el script avisa si un renglón se parte solo o
  si la frase sube y tapa al sujeto de la foto, pero no ve el resultado por ti).

## Instagram y los enlaces

Instagram **no vuelve clicable** un enlace dentro del texto de una publicación. Se resuelve así:

1. **Link en la bio:** Editar perfil → Enlaces → Añadir enlace externo. Pega la dirección del post
   y ponle de título el nombre del post. El texto ya termina con «link en mi bio».
2. **Historia con sticker de enlace:** sube `historia.jpg`, añade el sticker «Enlace» con la
   dirección del post y colócalo en el espacio vacío bajo «Nuevo en el blog». Arriba y abajo de
   la imagen quedan libres a propósito: Instagram los cubre con sus botones.
3. No pegues la URL en el texto de la publicación (se ve, pero no se puede tocar).

Orden sugerido: publicar el post y después subir la Historia. Antes de publicar en redes, abrir el
enlace del post y comprobar que ya carga (si Facebook o Instagram lo ven antes, pueden guardar un error).

## El texto (caption)

- **Primera línea = gancho** (Instagram corta a los ~125 caracteres con «más»).
- 3–4 párrafos cortos, en la voz de Oscar; citas bíblicas exactas (RVR1960 o NTV), sin inventar frases de nadie.
- Cierre: «Léelo completo: link en mi bio.» + una invitación a guardar y compartir.
- 4–5 hashtags; siempre **#SecundumFidem**.
- Si la portada fue generada con IA, activar la etiqueta de IA si Instagram la ofrece al publicar.

## Facebook y X

No necesitan tarjeta propia: al pegar el enlace del post, ambas generan la vista previa con la
portada (`og:image` / `twitter:card`). En Facebook sirve el mismo texto **con la URL completa**
(allí sí es clicable). En X, máximo 280 caracteres con el enlace y `#SecundumFidem`; sale bien el
`excerpt` del post como base.

## Cambiar el diseño

Edita solo `plantilla.html` (colores, tamaños, degradados) y vuelve a correr el script. Los dos
formatos viven en el mismo archivo (`body.post` y `body.historia`). Pendiente si algún día se quiere:
versión vertical 4:5 (1080×1350), carrusel de varias tarjetas o una tarjeta para X (1200×675).
