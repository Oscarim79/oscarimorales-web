# Cómo trabajo mi blog (guía de una página)

Una referencia simple para no revolverme entre las distintas herramientas. Si alguna vez
me confundo, vuelvo aquí.

---

## Las tres "Claudes" — qué es cada una

Publicar el blog es como **hacer y editar un libro**. Cada herramienta es una sala distinta:

| Herramienta | Es… | Para qué la uso | ¿La necesito seguido? |
|---|---|---|---|
| **Claude Design** (claude.ai/design) | El **taller de diseño** (cómo *se ve* el sitio) | Maquetar la apariencia (ya lo hice y lo exporté como bundle) | **Casi nunca.** Solo si quiero rediseñar el look. Ya terminó su trabajo. |
| **Claude Projects** (en claude.ai) | El **cuaderno de notas** (un chat con memoria) | Pensar ideas. Aquí armé originalmente el skill | **Opcional.** No está conectado al sitio real. |
| **Claude Code** (donde publico) | La **imprenta** conectada a mi sitio real | Escribir, compilar y **publicar** de verdad | **Esta es mi casa.** Aquí pasa todo lo real. |

> **Regla de oro:** para escribir y publicar, uso **Claude Code** en el repo
> `oscarimorales-web`. El skill y todo lo del blog ya viven ahí. No necesito Design ni
> Projects para el día a día.

---

## Mi flujo para publicar un post (un solo camino)

1. Abro **Claude Code** en el repo (web, app de escritorio o móvil — es lo mismo).
2. Digo una de estas:
   - *"Dame ideas para un post"* → me propone títulos del banco de ideas.
   - *"Escribe un post sobre \_\_\_"* → desde cero.
   - *"Reacciona a este video/noticia: \_\_\_"* → perspectiva pastoral de algo externo.
3. El skill **redacta en mi voz** y me lo muestra como **propuesta**.
4. Lo **afinamos** juntos (entrada, pivote del evangelio, cierre…).
5. Cuando digo **"publícalo"**, se sube solo al sitio. Listo.

Tras publicar: **GitHub Pages** muestra el sitio y **Buttondown** envía el artículo por
correo (cuando termine de configurarse — ver abajo).

---

## El skill que hace todo esto

Vive en el repo, en `.claude/skills/blog-oims/`:

- `SKILL.md` — el cerebro: mi voz, mi estructura, y cómo publicar.
- `references/voz-y-marco.md` — marco teológico (1689) y voz de marca.
- `references/ejemplos-de-posts.md` — mis posts reales, anotados.
- `references/banco-de-ideas.md` — ~70 títulos por categoría.

Como está en el repo, **funciona desde cualquier dispositivo** y se puede editar cuando
quiera. No depende de mi PC ni de Projects.

---

## Dónde veo las estadísticas del sitio

En **dash.cloudflare.com** (mi cuenta de Cloudflare) → **Web Analytics**: visitantes,
qué posts leen, de dónde vienen (Google, WhatsApp, Facebook…), países y dispositivos.
Cuentan desde el 22-jul-2026 (no hay historial anterior). Sin cookies — el sitio no
necesita banner de aviso.

## Cómo se publica (lo técnico, por si acaso)

El sitio es **estático** (sin WordPress). Un post es un archivo en `content/posts/`:

```
content/posts/052-mi-post.md   →  node scripts/build-posts.mjs  →  git push  →  publicado
```

Más detalle para humanos: `PUBLISHING.md`. El skill hace estos pasos por mí.

**Guía de Estudio descargable (desde jul-2026):** si un post nace de un sermón,
puede llevar su Guía de Estudio en PDF. La plantilla está en `recursos/guias/src/`
(se llena con el contenido del sermón y se imprime a PDF); el PDF se guarda en
`recursos/guias/` y el post lleva `guia: "recursos/guias/guia-<nombre>.pdf"` en su
encabezado. Con eso, la página muestra sola la tarjeta de descarga (pide el correo
y desbloquea el PDF) y la tarjeta del inicio y el archivo lucen la insignia
"Guía de Estudio". Estreno: post #52.

---

## Pendiente: correo (Buttondown)

Para que los formularios de suscripción y el envío automático funcionen, falta:

1. Terminar de crear/autenticar la cuenta en **buttondown.com**.
2. Poner mi usuario en `project/ui_kits/landing_blog/site-config.js`
   (reemplazar `"TU_USUARIO_BUTTONDOWN"`).
3. Activar doble opt-in, el PDF de bienvenida y el RSS-to-email.

Guía completa: `SUBSCRIPTIONS.md`.
