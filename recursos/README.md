# recursos/ — Archivos descargables (PDF de regalo, etc.)

Lo que pongas aquí se publica en GitHub Pages, p. ej.:

```
recursos/sola-por-gracia.pdf
→ https://oscarimorales.com/recursos/sola-por-gracia.pdf
```

Esa URL es la que enlazas en el **correo de bienvenida** de Buttondown
(ver `SUBSCRIPTIONS.md`).

## ⚠️ Solo material que puedas distribuir legalmente

Como el libro **no es tuyo**, solo puedes ofrecerlo si es **dominio público** o
tiene **licencia/permiso de distribución gratuita**.

### Clásicos de dominio público en español (seguros y on-brand)

- **C. H. Spurgeon** — *Sólo por gracia* (*All of Grace*, 1886).
- **John Bunyan** — *El Progreso del Peregrino* (usa una traducción antigua/libre).
- **A. W. Pink** — *La Soberanía de Dios* (verifica la edición/traducción).
- **J. C. Ryle** — *Santidad* / *Aspectos de la santidad*.
- **Confesión de Fe de Westminster** y **Catecismo Menor** (texto libre, muy difundido).
- **Catecismo de Heidelberg**.

> Consejo: confirma que la **traducción** específica también sea libre (algunas
> traducciones modernas tienen derechos aunque el original sea antiguo). Las
> ediciones del s. XIX o las publicadas por ministerios "para libre distribución"
> son las más seguras.

## Cómo agregarlo

1. Copia el `.pdf` en esta carpeta.
2. `git add recursos/ && git commit -m "Agregar PDF de regalo" && git push`.
3. Enlaza su URL en el correo de bienvenida de Buttondown.

---

## Calendario de Adviento para llevar en familia

Cinco sesiones de 10 minutos (cuatro domingos de adviento y Nochebuena) más una guía para
papás. **Descarga libre**, sin pedir correo. Se enlazan desde el post
`calendario-de-adviento-para-llevar-en-familia`.

```
recursos/adviento/adviento-00-guia-para-papas.pdf
recursos/adviento/adviento-01-esperanza.pdf   (dom 29-nov)
recursos/adviento/adviento-02-paz.pdf         (dom 6-dic)
recursos/adviento/adviento-03-gozo.pdf        (dom 13-dic)
recursos/adviento/adviento-04-amor.pdf        (dom 20-dic)
recursos/adviento/adviento-05-cristo.pdf      (jue 24-dic)
```

**No cambies estos nombres**: son los enlaces que se comparten y los que van en los correos.

Las fuentes están en `recursos/adviento/src/`: un HTML por PDF, más `adviento.css` (estilos
compartidos) y `adviento.js` (dibuja la corona con las velas de la semana encendidas). Para
regenerar los PDF después de editar un HTML:

```
node scripts/adviento-pdf.mjs                        # todos
node scripts/adviento-pdf.mjs adviento-03-gozo       # solo uno
```

El script avisa con ❌ si algo no cumple: 4 páginas por sesión (2 la guía), menos de 1 MB, y
que el texto que se lee en voz alta (marcado con `data-leer`) no pase de 950 palabras, ni la
historia de 420. Así cada sesión cabe en 10 minutos. `_prueba.html` es la página de prueba del
script; no se publica como PDF.
