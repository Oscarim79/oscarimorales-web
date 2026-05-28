# UI Kit — Sitio personal `oscarimorales.com`

Recreación de alta fidelidad del sitio personal. La marca aún no entregó
codebase ni Figma; este kit es una **propuesta visual** construida sobre los
tokens de `colors_and_type.css` y los assets de la marca.

## Estructura

```
sitio_personal/
├── README.md         ← estás aquí
├── index.html        ← homepage interactiva (Inicio → Ensayo → Newsletter)
├── components.jsx    ← shared: Nav, Footer, SectionHeader, etc.
├── HomeScreen.jsx    ← hero, últimos ensayos, podcast, libros
├── EssayScreen.jsx   ← lectura larga, dropcap, cita destacada
└── SubscribeScreen.jsx ← confirmación de suscripción al boletín
```

## Flujo
1. **Inicio** — hero con descriptor, últimos 3 ensayos, podcast, libros, CTA newsletter.
2. **Ensayo** — vista de lectura, una columna, capital, cita, autor al final.
3. **Suscripción** — confirmación cálida, expectativa clara.

## Cómo correrlo
Abrir `index.html` directamente. Carga React + Babel desde CDN; los `.jsx` se
importan como `type="text/babel"`.
