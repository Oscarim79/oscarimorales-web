# Oscar I. Morales — Sistema de Diseño

> Pastor · Autor · Consejero Bíblico
>
> Una marca personal con voz pastoral, cálida y narrativa.
> **Síntesis interna:** *C.S. Lewis meets Pixar en el mundo de Paul Tripp*,
> desde un marco teológico **Bautista Reformado**.

Este sistema existe para que cualquier diseño nuevo — una predicación, una
contraportada, un post, una clase — suene, lea y se vea como Oscar antes de
que alguien diga su nombre.

---

## Quién es la marca

Oscar I. Morales es un pastor, autor y consejero bíblico que comunica en español.
La marca personal cubre:

- **Predicación** — sermones, conferencias, retiros (slides 16:9).
- **Escritura** — libros, ensayos, prólogos, blog.
- **Consejería bíblica** — recursos para parejas, padres, líderes.
- **Plataforma digital** — sitio personal `oscarimorales.com`, redes, podcast.

**Arquetipos de marca** (orden de dominancia):

1. **El Sabio** — busca la verdad y la transmite con claridad y paciencia.
2. **El Cuidador** — protege, acompaña, hace que el otro respire.
3. **El Mago** — re-encanta lo cotidiano; cuenta la historia detrás de la historia.

Bajo estos, dos arquetipos **internos** del oficio pastoral:

- **El Profeta** (habla por Dios al hombre)
- **El Sacerdote** (habla por el hombre a Dios)

El tono final es **pausado, reflexivo, lleno de gracia** — no frenético, no
académico-frío.

---

## Fuentes y materiales recibidos

Estos son los originales que el usuario aportó. Han sido normalizados dentro de
este proyecto, pero se listan aquí para trazabilidad.

| Archivo original | Destino en el proyecto | Notas |
|---|---|---|
| `uploads/OIMS-ICONO.png` | `assets/logo-icon.png` | Isotipo OM monograma — 2048×2048, transparente |
| `uploads/OSCARIMORALES - LOGO.png` | `assets/logo-full-noche.png` | Logo completo sobre Azul Noche |
| `uploads/OSCARIMORALES - LOGO1.png` | `assets/logo-full-crema.png` | Logo completo sobre Crema |
| `uploads/OSCARIMORALES - LOGO.jpg` | `assets/logo-full-niebla.jpg` | Logo completo sobre fondo neutro claro |
| `uploads/Proxima Nova Extrabold.ttf` | `fonts/ProximaNova-Extrabold.ttf` | **Único peso entregado.** Ver "Sustituciones tipográficas" abajo. |

> ⚠ **No se entregaron**: codebase, Figma, ni decks de muestra. Si existen, el
> sistema mejorará al integrarlos. Pídelo en la siguiente iteración.

---

## Index — qué hay en este proyecto

```
oscar-i-morales-design-system/
├── README.md                     ← estás aquí
├── SKILL.md                      ← entrada cuando se carga como Agent Skill
├── colors_and_type.css           ← tokens + estilos base (importar primero)
├── assets/                       ← logos, isotipos, imágenes de marca
├── fonts/                        ← TTFs propios (Proxima Nova Extrabold)
├── preview/                      ← tarjetas del Design System tab
├── ui_kits/
│   └── sitio_personal/           ← UI kit del sitio oscarimorales.com
│       ├── README.md
│       ├── index.html            ← homepage interactiva
│       ├── Nav.jsx, Hero.jsx, ...
└── slides/
    ├── index.html                ← deck de muestra (8 plantillas)
    ├── TitleSlide.jsx, QuoteSlide.jsx, ScriptureSlide.jsx, ...
```

---

## Sustituciones tipográficas (¡acción requerida!)

- **Montserrat** (titulares + cuerpo) — Google Fonts. Sustituye a *Proxima Nova*
  como familia sans principal. Cubre titulares (700), subtítulos (600), cuerpo
  (400–500) y descriptores en mayúsculas (800).
- **Playfair Display** (itálico editorial) — Google Fonts. **Ya no es la
  familia primaria de titulares.** Se reserva a *momentos editoriales*: leads
  itálicos, pullquotes, *dropcap* y referencias bíblicas — ese gesto serif
  introduce calidez sin dominar la voz visual.
- **Proxima Nova Extrabold** (TTF propio) — disponible si quieres anclar el
  logotipo y descriptores con la fuente real de marca. Cargado vía `@font-face`.

> ✋ **Por favor confirma**: con el cambio a Montserrat para titulares, el
> sistema queda *sans-first* con momentos editoriales en Playfair. Si
> prefieres remover Playfair por completo, avísame.

---

## Cómo usar este sistema (resumen rápido)

```html
<link rel="stylesheet" href="colors_and_type.css" />

<p class="eyebrow eyebrow--gilt">PASTOR · AUTOR · CONSEJERO BÍBLICO</p>
<h1>Vivir despacio en un mundo que corre.</h1>
<p class="lead">Una invitación a la pausa, desde el evangelio.</p>
```

Reglas inviolables:
1. **El cuerpo es Mulish/Proxima Nova; nunca Playfair en párrafos largos.**
2. **Los descriptores (PASTOR · AUTOR · …) van en mayúsculas con
   `letter-spacing` generoso.**
3. **Cada superficie elige UNA familia de fondo** — Crema (default) o Azul
   Noche. No mezclar dos backgrounds en la misma vista.
4. **No emoji.** Nunca. Ver Iconografía.

---

# CONTENT FUNDAMENTALS

La voz de Oscar es **pastoral**. Eso es más que un adjetivo: es una postura.
El pastor sabe que su lector llega cansado, lastimado o distraído; por eso
escribe **despacio**, con frases cortas que dejan respirar.

## Pulso y ritmo

- **Frases breves** alternadas con una larga. La frase larga es para asentar,
  no para impresionar.
- **Párrafos de 2–4 líneas** en pantalla. Nada de muros de texto.
- **Listas con cariño**: una idea por bullet, sin sub-bullets si se puede
  evitar.
- Comodísimo con el **punto seguido**. Incómodo con el punto y coma.

## Persona y trato

- **Tú**, no usted. Es un pastor que se sienta a tu lado, no un orador en
  tarima.
- **Yo** aparece poco, y siempre en confesión o testimonio, nunca como
  alarde. Cuando aparece, suaviza ("Yo también he…", "A mí me costó…").
- **Nosotros** es la voz preferida para enseñanza — incluye al lector en la
  caminata.
- **Hermano / hermana** se usa con moderación, sólo cuando es genuinamente
  fraterno, no como muletilla.

## Casing y puntuación

- **Sentence case** en titulares largos. *Title Case* sólo en descriptores
  cortos en mayúsculas: `PASTOR · AUTOR · CONSEJERO BÍBLICO`.
- **Tildes correctas**, siempre. *Cómo*, *está*, *qué* — esto importa.
- **Comillas tipográficas** «españolas» o "inglesas curvas", nunca rectas.
- **Em-dash español** — con espacios alrededor.
- Las **referencias bíblicas** van completas en primera mención
  (*Filipenses 4:6–7*) y abreviadas en sucesivas (*Fil 4:6–7*).
- **Dios** con mayúscula. **Evangelio** con mayúscula cuando se refiere al
  mensaje de Cristo. **Iglesia** con mayúscula cuando es universal,
  minúscula cuando es local.

## Vocabulario base

| Sí | No |
|---|---|
| evangelio, gracia, descanso, pacto | "viaje espiritual", "energía", "vibras" |
| acompañar, pastorear, cuidar | "coachear", "empoderar" |
| sufrimiento, herida, quebranto | "trauma" (sólo en contexto técnico) |
| asombro, deleite, sobriedad | "wow", "impacto", "épico" |
| consejería bíblica | "terapia cristiana" |

## Ejemplos canónicos

> **Eyebrow**: `LECTURA DEL DOMINGO`
> **Título**: *Lo pequeño que sostiene lo grande.*
> **Lead**: *Un ensayo sobre los hábitos que nadie ve.*

> **Eyebrow**: `EPISODIO 14`
> **Título**: *Cuando orar se vuelve difícil.*
> **CTA**: *Escuchar el episodio →*

> **Email de bienvenida**:
> *Bienvenido. Lo que recibirás aquí cada miércoles no es contenido — es una
> conversación pausada sobre vivir el evangelio en lo cotidiano. Si en algún
> momento ya no te ayuda, te entiendo: hay un enlace para salir al final de
> cada correo.*

## Lo que **nunca** hace la voz

- No grita: cero signos de exclamación dobles, cero **CAPS** para énfasis.
- No "vende": evita superlativos, urgencia falsa, scarcity timers.
- No usa anglicismos cuando hay palabra en español ("workshop" → *taller*).
- No habla de sí mismo en tercera persona en copy interno (sí en bio
  oficial, bajo `Sobre`).
- No usa emoji ni en titulares ni en cuerpo. Cero. (Ver Iconografía.)

---

# VISUAL FOUNDATIONS

El sistema visual es **artesanal, sobrio y cálido**. Más papel que pantalla.
Más libro que app. Crema y noche; tipografía con respiración; un acento
terracota que aterriza la vista; un dorado raro y por eso valioso.

## Paleta — significado, no decoración

| Token | Hex | Rol | Cuándo usar |
|---|---|---|---|
| `--color-azul-noche` | `#0D1B2A` | Profundidad, contemplación | Backgrounds importantes; tipografía sobre crema |
| `--color-terracota` | `#C47E5A` | Acento humano, cuerpo, tierra | Acentos, CTAs primarios, links |
| `--color-crema` | `#F5F0E8` | Reposo, papel, luz tamizada | Background por defecto |
| `--color-dorado` | `#B89A6A` | Gloria, sello, lo bíblico | Reglas finas, números, eyebrows especiales, citas |
| `--color-niebla` | `#8A9AAA` | Velo, distancia, descanso | Texto secundario, ruleas, estados inactivos |

**Regla 60/30/10**: 60% Crema (o Noche) · 30% Niebla/Noche · 10% Terracota
o Dorado en acentos contados.

**Nunca**: tres acentos saturados en la misma vista. Si hay terracota,
el dorado se retira.

## Tipografía — tres voces

- **Montserrat** (sans) — voz de **autor** y de **lector**: titulares (700)
  con tracking negativo; subtítulos (600); cuerpo (400–500); descriptores
  todo-mayúsculas (800).
- **Playfair Display** (serif itálico) — voz **editorial**: leads itálicos
  cortos, pullquotes, citas bíblicas y *dropcap*. Llega como acento cálido,
  nunca como bloque largo.
- **Proxima Nova Extrabold UPPERCASE + tracking 0.16em** — voz de **identidad**
  cuando se requiere la fuente oficial: el descriptor `PASTOR · AUTOR ·
  CONSEJERO BÍBLICO` impreso en assets de marca.

Tamaños canónicos en pantalla web (`--text-base` = 17px):
12 · 13 · 15 · 17 · 19 · 22 · 28 · 36 · 46 · 60 · 78 · 102.

## Spacing — la respiración importa

Escala 4-base, no continua: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 144`.
**El whitespace es el material principal del sistema.** Las secciones de página
respiran a 96–144px entre bloques. No comprimas para meter más.

## Fondos

- **Por defecto**: color plano. **Crema** o **Azul Noche**. Sin gradientes.
- **Texturas sutiles**: opcionalmente, un grano de papel (`feTurbulence` SVG o
  `noise.png`) al 4–6% de opacidad sobre crema, para evitar la sensación
  digital. Ver `preview/14-textures.html`.
- **Imágenes de fotografía**: cálidas, con poca saturación, sombras profundas
  pero suaves. Mood "tarde de invierno", "biblioteca", "lectura junto a
  ventana". Nada de stock corporativo.
- **No usar**: gradientes púrpura-azul, vidrio esmerilado violeta, fondos
  fluorescentes.

## Bordes, esquinas y cards

- **Border-radius escaso**: `2 · 4 · 8 · 14 · 999`. La marca prefiere
  rectángulos. La curvatura está reservada al isotipo circular del logo.
- **Cards**: fondo `--bg-elevated` (`#FBF8F3`), hairline 1px en
  `rgba(13,27,42,0.12)`, sombra `--shadow-md` cálida. Sin border-left de
  color (anti-trope explícito).
- **Hairlines**: `1px solid var(--rule)` para separar secciones discretamente.
  El dorado se reserva para reglas **decorativas** (1px continuo bajo un
  título, 40px de largo).

## Sombras

Sombras cálidas, **siempre con un poco de Azul Noche**, nunca grises puros.
Tres niveles: `--shadow-sm` (chips, inputs), `--shadow-md` (cards reposadas),
`--shadow-lg` (overlays, modales). Nada de "neumorphism", nada de glow.

## Animación

- **Curva canónica**: `cubic-bezier(.2, .6, .2, 1)` — un acomodo, no un
  rebote. La marca **no rebota**. No hay `spring`.
- **Duración**: 140ms (microinteracciones), 220ms (transiciones de estado),
  420ms (transiciones de página o entrada de contenido grande).
- **Fades** sobre slides; **slide-up de 8–12px** para contenido que entra al
  hacer scroll; **opacity en hover**. Nunca rotaciones decorativas, nunca
  partículas.

## Estados

- **Hover**: en links, aparece el `border-bottom` (1px currentColor). En
  botones primarios, el fill pasa de `terracota-500` a `terracota-600`. Nada
  de `transform: scale()` en hover.
- **Press / active**: color un escalón más oscuro (`terracota-700`), sin
  transformación.
- **Focus visible**: anillo de 3px en `--focus-ring` (terracota al 35%),
  offset 2px.
- **Disabled**: opacidad 0.45, sin cambio de color de fondo.

## Transparencia y blur

- **Sí**, sobrios: header sticky con `backdrop-filter: blur(14px)` y
  `background: rgba(245,240,232,0.78)` en modo crema; análogo con
  `rgba(13,27,42,0.78)` en modo noche.
- **No**: paneles de "glassmorphism" coloreados, blur sobre imágenes para
  hacer fondos.

## Layout

- **Container central**: 1200px max-width, padding lateral 24px (mobile) /
  48px (desktop).
- **Columnas**: 12-col grid con gap 24px. Pero la verdad es que la mayoría
  de páginas vive en una columna central de **640–720px** para lectura.
- **Eyebrow alineado a la izquierda** del título que introduce. Si el bloque
  está centrado, el eyebrow también.
- **Reglas decorativas dorado**: 1px × 40px bajo eyebrows opcionales, o como
  separador entre obra y obra.

## Imagery — la fotografía habla

Cuando hay foto, debe sentirse **observada con cariño**:
- Cálida (WB 5500K+), grano sutil aceptable.
- Sombras profundas pero no aplastadas.
- Sujetos en reposo (manos, libros, ventanas, mesa, café, silla vacía),
  pocas personas mirando cámara.
- Si es retrato de Oscar, contacto visual amable, sin sonrisa forzada.
- **Tratamiento**: dos opciones canónicas — full color cálido, o duotono
  Noche/Crema para hero secundarios.

---

# ICONOGRAPHY

> **El ícono de la marca es el silencio.** Si dudas, no hay ícono.

La marca tiende al **minimalismo iconográfico**. Un texto bien escrito casi
siempre comunica mejor que un ícono junto.

## Reglas

1. **No emoji**, nunca, ni siquiera "discreto". Ni en cuerpo, ni en
   titulares, ni en social. Reemplaza por palabra o por símbolo tipográfico
   (`·`, `—`, `→`, `§`).
2. **No iconos genéricos de UI** decorando títulos (engranaje, cohete,
   bombilla). Esto es una marca pastoral, no SaaS.
3. **Sí** un set discreto de iconos **lineales** para interfaz funcional
   (búsqueda, menú, audio, descargar) — ver "Set funcional".
4. **Sí** símbolos tipográficos como acento: `·` (medio), `—` (em-dash),
   `§` (sección), `↦`, `✝` sólo cuando es teológicamente apropiado.

## Set funcional — Lucide (lineal, 1.5px stroke)

Adoptado: **[Lucide](https://lucide.dev)** vía CDN.
Razón: stroke-weight uniforme, sin floritura, estética que envejece bien.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>

<i data-lucide="search"></i>
<i data-lucide="book-open"></i>
<i data-lucide="headphones"></i>
<i data-lucide="mail"></i>
<i data-lucide="menu"></i>
```

Iconos canónicos en uso:
`book-open`, `headphones`, `mic`, `mail`, `search`, `menu`, `x`,
`arrow-right`, `arrow-up-right`, `play`, `pause`, `download`,
`calendar`, `clock`, `bookmark`.

**Color**: `currentColor`, hereda del texto. **Tamaño**: 16, 20 o 24px.
Nunca rellenos a color de marca.

> Lucide es una sustitución pragmática — no se entregó icon-set propietario.
> Si en el futuro la marca contrata un set custom, reemplazar el CDN y
> mantener los nombres de uso aquí listados.

## Logos disponibles en `assets/`

- `logo-icon.png` — isotipo OM monograma (negro sobre transparente)
- `logo-full-noche.png` — logotipo completo, terracota sobre azul noche
- `logo-full-crema.png` — logotipo completo, azul noche sobre crema
- `logo-full-niebla.jpg` — variante neutra clara

**Uso del isotipo**: tamaño mínimo 32px. Padding mínimo igual al diámetro
interno de la "O". Nunca cortarlo, nunca rotarlo, nunca rellenar de un
color que no sea de la paleta.

**Uso del logotipo completo**: dos variantes — sobre noche (terracota) y
sobre crema (azul noche). No usar la versión crema sobre fondos blancos
puros: pierde contraste; usar sobre crema o más oscuro.

---

## Próximos pasos sugeridos

1. Enviar los pesos faltantes de Proxima Nova (Regular / Medium / Semibold).
2. Enviar 5–10 fotografías oficiales para la galería del sitio.
3. Validar la sustitución de iconos (Lucide) o pedir set propietario.
4. Compartir códigos de los libros publicados (portadas + capítulos de
   muestra) para sumar plantillas editoriales.
5. Si existe podcast o canal de YouTube, compartir el thumbnail master
   para ajustar la plantilla de social.
