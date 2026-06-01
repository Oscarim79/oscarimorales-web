# Suscripciones y correos (Buttondown)

El sitio es estático, así que el correo lo maneja **Buttondown** (gratis hasta
100 suscriptores; $9/mes hasta 1,000). El formulario del sitio ya está conectado;
solo falta crear la cuenta y configurar dos automatizaciones.

Buttondown cubre **las dos cosas**, de forma automática:

1. **PDF de regalo al suscribirse** (imán para crecer la lista).
2. **Envío del artículo nuevo** cada vez que publicas (vía el feed RSS).

---

## Paso 1 · Crear la cuenta y activar el formulario

1. Crea tu cuenta gratis en **https://buttondown.com**.
2. Tu **usuario** es el de tu página (si es `buttondown.com/oscarimorales`, el
   usuario es `oscarimorales`).
3. Abre `project/ui_kits/landing_blog/site-config.js` y reemplaza
   `"TU_USUARIO_BUTTONDOWN"` por tu usuario real:
   ```js
   buttondownUser: "oscarimorales",
   ```
4. Guarda, `git commit` y `git push`. ¡Listo! Los formularios del sitio (inicio y
   cada artículo) ya envían a Buttondown.

> Mientras diga `TU_USUARIO_BUTTONDOWN`, los formularios quedan en "modo seguro"
> (no envían a ningún lado y muestran un aviso solo para ti).

## Paso 2 · Confirmación (doble opt-in)

En Buttondown → **Settings → Subscribing**, activa la **confirmación por correo**
(double opt-in). Así cada persona confirma su correo — mejor entregabilidad y cero
direcciones falsas.

## Paso 3 · El PDF de regalo (correo de bienvenida)

1. Coloca el PDF en la carpeta **`recursos/`** del repo (ver `recursos/README.md`),
   `git push`. Quedará disponible en:
   `https://oscarim79.github.io/oscarimorales-web/recursos/TU-ARCHIVO.pdf`
2. En Buttondown → **Automations** (o el correo de bienvenida), crea un correo que
   se envíe **al confirmar la suscripción**, con un botón/enlace al PDF.
3. ⚠️ El PDF debe ser de **dominio público** o con **permiso de distribución**
   (ver `recursos/README.md`).

## Paso 4 · Envío automático del artículo (RSS-to-email)

En Buttondown → **Settings → RSS** (o **Automations → RSS**):

1. Pega la URL de tu feed:
   `https://oscarim79.github.io/oscarimorales-web/feed.xml`
2. Elige el modo:
   - **Inmediato**: en cuanto publicas (haces push y el feed se actualiza),
     Buttondown envía ese artículo automáticamente.
   - **Resumen** (semanal/mensual): junta los nuevos y los manda juntos.

A partir de ahí: **escribes el post → `node scripts/build-posts.mjs` → push**, y
Buttondown se encarga del correo. No tocas nada más.

---

## Si cambias de dominio

Cuando muevas el sitio a tu dominio propio, actualiza la constante `SITE` en
`scripts/build-posts.mjs` (regenera el feed) y revisa que la URL del feed en
Buttondown apunte al nuevo dominio.
