# Suscripciones y correos (Buttondown)

El sitio es estático, así que el correo lo maneja **Buttondown** (gratis hasta
100 suscriptores; $9/mes hasta 1,000). Usuario: **`oscarim`** (configurado en
`project/ui_kits/landing_blog/site-config.js`).

## Cómo funciona el flujo (YA CONFIGURADO, jun-2026)

```
Visitante escribe su correo en el sitio
        │  (envío en segundo plano, sin popups; mensaje de éxito en la página)
        ▼
Buttondown manda el correo de CONFIRMACIÓN  (doble opt-in)
        │  (puede tardar unos minutos; cuentas gratis pasan por cola anti-spam)
        ▼
La persona confirma → Buttondown la redirige a
https://oscarimorales.com/bienvenida.html
        │
        ▼
La página de bienvenida entrega el PDF de regalo:
recursos/la-soberania-de-dios-aw-pink.pdf  (A. W. Pink, dominio público)
```

Piezas del lado del sitio:
- `project/ui_kits/landing_blog/subscribe.js` — conecta los formularios
  (portada y posts) con el endpoint `embed-subscribe` de Buttondown.
- `bienvenida.html` — página de destino tras confirmar (noindex, on-brand).
- `recursos/` — archivos descargables (ver su README para temas de derechos).

Configuración en el panel de Buttondown (**Settings → Subscribing**):
- **After confirming** → URL de `bienvenida.html` (entrega la lectura).
- **Welcome email** → APAGADO (personalizarlo requiere plan de pago y el
  genérico sale en inglés; la página de bienvenida hace ese trabajo).
- Doble opt-in activo (comportamiento estándar de Buttondown).

## Limitaciones del plan gratis (y cómo las resolvemos)

| Función | ¿Gratis? | Solución |
|---|---|---|
| Correo de bienvenida personalizado | ❌ (Standard) | Página `bienvenida.html` vía redirect "After confirming" |
| RSS-to-email (enviar cada post solo) | ❌ (Standard) | **Flujo asistido**: al publicar un post, se le deja a Oscar el correo redactado; él lo pega en Buttondown y envía (1 minuto) |
| Enviar boletines a mano (hasta 100 sus.) | ✅ | Emails → New email |

> Cuando la lista crezca, el plan de $9/mes activa el RSS-to-email con el feed
> `https://oscarimorales.com/feed.xml` y todo queda 100%
> automático sin tocar el sitio.

## Mejoras de marca en los correos (gratis)

- **Settings → General**: la *descripción* del newsletter aparece en el correo
  de confirmación. Mantenerla en la voz del sitio, p. ej.:
  *"Ensayos y meditaciones para pensar el evangelio despacio. «Secundum
  Fidem» — el blog del Ps. Oscar I. Morales."*
- **Settings → Design**: logo y colores de los correos (terracota ≈ `#C47E5A`).

## Si cambias de dominio

Actualiza la constante `SITE` en `scripts/build-posts.mjs` (regenera el feed)
y la URL de `bienvenida.html` en el campo "After confirming" de Buttondown.
