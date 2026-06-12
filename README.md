# Oscar I. Morales · *Secundum Fidem Meam*

Sitio personal y blog de Oscar I. Morales — ensayos y meditaciones sobre la fe,
la familia y la cultura, escritos desde Guatemala desde 2014.

Este repositorio contiene el **diseño exportado desde Claude Design** y una
**implementación de producción** de la página, lista para desplegar sin paso de
compilación (HTML + CSS + JavaScript *vanilla*).

> El bundle original del handoff de diseño y sus instrucciones están en
> [`HANDOFF.md`](HANDOFF.md).

---

## 🚀 Páginas del sitio

| Archivo | Descripción |
|---|---|
| [`index.html`](index.html) | Landing del blog: hero con captura de correo, "Empieza aquí", carrusel de destacados, populares, archivo filtrable por tema, newsletter y footer. |
| [`post.html`](post.html) | Página de artículo. Lee el parámetro `?n=` de la URL (p. ej. `post.html?n=51`) y arma la portada, el cuerpo, compartir, relacionados y la navegación entre escritos. |

Ambas páginas son **autocontenidas y sin build**: se pueden abrir directamente
en el navegador o servir como archivos estáticos.

---

## 📁 Estructura

```
.
├── index.html                  ← Landing (producción, vanilla JS)
├── post.html                   ← Página de artículo (producción, vanilla JS)
├── .nojekyll                   ← Sirve el sitio tal cual en GitHub Pages
├── HANDOFF.md                  ← Instrucciones originales del export de Claude Design
└── project/                    ← Handoff de Claude Design (sistema + prototipos)
    ├── colors_and_type.css     ← Tokens de marca: paleta, tipografía, espaciado
    ├── assets/                 ← Logos, foto del autor, imágenes del hero
    ├── fonts/                  ← Proxima Nova Extrabold (local)
    ├── preview/                ← Hojas de muestra del sistema de diseño
    └── ui_kits/landing_blog/   ← Prototipos React + datos compartidos
        ├── landing.css         ← Estilos de la landing
        ├── post.css            ← Estilos de la página de artículo
        ├── posts-data.js       ← window.POSTS (51 entradas) + descripciones de categorías
        ├── covers.js           ← window.makeCover(post): portadas editoriales en canvas
        ├── post-content.js     ← window.POST_BODIES: cuerpo estructurado de los artículos
        ├── app.jsx / post.jsx  ← Prototipos React originales (referencia de diseño)
        └── index.html          ← Prototipo React original (referencia)
```

Las páginas de producción **reutilizan** los CSS y los datos dentro de
`project/` — no hay duplicación. Para editar el contenido del blog basta con
tocar los archivos de datos:

- **Entradas / metadatos** → `project/ui_kits/landing_blog/posts-data.js`
- **Cuerpo de un artículo** → `project/ui_kits/landing_blog/post-content.js`
- **Colores y tipografía** → `project/colors_and_type.css`

---

## 🎨 Marca

| Token | Color |
|---|---|
| Azul Noche | `#0D1B2A` |
| Terracota | `#C47E5A` |
| Crema | `#F5F0E8` |
| Dorado | `#B89A6A` |
| Niebla | `#8A9AAA` |

**Tipografía:** Playfair Display (display serif), Spectral (cuerpo), Montserrat /
Proxima Nova (descriptores). Lema: *Secundum Fidem Meam* — «según mi fe».

---

## 🖥️ Ver el sitio localmente

Como todo es estático, basta con un servidor local (recomendado para que el
navegador cargue los archivos `.js` y la portada en canvas sin restricciones):

```bash
# Python 3
python3 -m http.server 8000
# luego abre http://localhost:8000/
```

---

## 🌐 GitHub Pages

El repositorio ya está **listo para Pages** (`index.html` en la raíz +
`.nojekyll` + rutas relativas que funcionan bajo el subpath del proyecto).

Para publicarlo:

1. En GitHub → **Settings → Pages**.
2. En **Source**, elige **Deploy from a branch**.
3. Branch: **`main`**, carpeta: **`/ (root)`** → **Save**.
4. A los pocos minutos estará en:
   **https://oscarimorales.com/**

> **Nota:** GitHub Pages en repositorios **privados** requiere un plan de pago
> (GitHub Pro / Team). Si el repo es privado y estás en el plan gratuito,
> haz el repositorio **público** para habilitar Pages sin costo.

---

## 🧩 Notas técnicas

- **Sin framework / sin build:** los prototipos originales usan React + Babel en
  el navegador; la versión de producción se reescribió en JavaScript *vanilla*
  (IIFE) para desplegar en cualquier lado sin compilar.
- **Portadas generadas:** los posts sin imagen reciben una portada editorial
  generada en canvas (`covers.js`), con respaldo automático si una imagen falla.
- **Seguridad:** todo el contenido dinámico se inserta con `textContent` o
  escapado, evitando inyección de HTML.

---

*Diseño creado con [Claude Design](https://claude.ai/design).*
