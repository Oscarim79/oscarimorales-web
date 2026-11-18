# Videos cortos del blog (Reels y YouTube Shorts)

Video vertical de 1080×1920 sacado de un post: voz de IA, escenas por capas y subtítulos. Lo arma Claude; Oscar lo escucha, lo aprueba y lo sube.

## Qué posts llevan video

Oscar decide post por post. Los criterios están en la skill `blog-oims`, sección «Video corto». Anotar aquí cada decisión:

| Post | ¿Video? | Estado |
|---|---|---|
| #62 El 31 de octubre sin miedo | Sí | Final: `reel-062-sin-miedo-esencial-con-musica.mp4` |
| #63 Romanos 13 no es un cheque en blanco | Sí (opción B: «El púlpito no es para la papeleta») | Carpeta `063-pulpito-no-papeleta`; aprobado por Oscar el 5-nov-2026; final: `reel-063-pulpito-no-papeleta-con-musica.mp4` |
| #66 Dar gracias no tiene pasaporte | Sí (Oscar lo pidió el 18-nov-2026) | Carpeta `066-dar-gracias-no-tiene-pasaporte`; guion aprobado y video armado el 18-nov; final: `reel-066-dar-gracias-no-tiene-pasaporte-con-musica.mp4` (1:26, -14 LUFS). **Aprobado por Oscar el 18-nov** (segunda versión: voz con seseo y escenas sin huecos). Lo sube él el martes 24-nov |

## Pasos

0. **Propósito, siempre primero:** antes del guion, definir con Oscar qué debe entender o sentir quien lo vea y para quién es. Va en `proposito`, `para_quien` y `que_debe_quedar` del `guion.json`. Lo esencial del post manda; el trasfondo solo entra si sirve al propósito.
1. **Guion:** `recursos/video/<NNN-slug>/guion.json`. Hasta 1:30, una sola idea, que se entienda sin leer el post. Sin «yo» ni anécdotas de la familia: la voz no es la de Oscar. En el texto, `{609|seiscientos nueve}` muestra «609» y la voz lee «seiscientos nueve»; sirve también para palabras que pronuncia mal (`{Samhain|Sáuin}`).
2. **Voz:** `node scripts/reel-voz.mjs recursos/video/<NNN-slug> --velocidad 1.1` (a 1.12 a Oscar le suena «corriendo»; la duración varía entre tomas) → `voz.mp3` y `tiempos.json`.
3. **Escenas:** `recursos/video/<NNN-slug>/escenas.html`. Todo depende de `seek(t)`, y las escenas se sincronizan con las palabras mediante `W('escena', 'palabra')`.
4. **Revisar cuadros sueltos:** `node scripts/reel-render.mjs recursos/video/<NNN-slug> --cuadros 2,9.5,20 --salida <carpeta>`.
5. **Video final:** `node scripts/reel-render.mjs recursos/video/<NNN-slug> --salida vista-previa/reel-<NNN-slug>.mp4` (unos 10 minutos).

## Lo que hay que saber

- **Clave:** va en `.env.local`, que no se sube. `node scripts/revisar-elevenlabs.mjs` la comprueba sin mostrarla. El repositorio es público: nunca poner la clave en otro archivo.
- **Plan de ElevenLabs:** Oscar tiene Starter desde el 30-oct-2026. Lo generado con el plan gratis no se publica.
- **Voz:** George (`JBFqnCBsd6RMkjVDRZzb`), verificada en español. Con `eleven_multilingual_v2`. Lee la «J» a la inglesa: «Jalouín» suena «Yaloguin». Las palabras en inglés van como se escriben (`Halloween`). Si una palabra suena mal, generar un audio corto con varias opciones para que Oscar elija, porque Claude no puede oírlo.
- **Imágenes:** Hugging Face se queda sin cuota diaria y Canva solo deja bajar miniaturas, así que las ilustraciones se dibujan en SVG dentro de `escenas.html`. La portada del post sirve de escena.
- **Mapa:** `recursos/video/_comun/` ya lo tiene horneado. `scripts/reel-mapa.mjs` solo se corre para agregar lugares o zonas (necesita `d3-geo`, `topojson-client` y `world-atlas`, en la carpeta de `REEL_DEPS`). No usa fronteras modernas a propósito: las zonas son manchas, porque las historias son de otras épocas.
- **Acento:** George pronuncia la «c» (ce, ci) y la «z» a la española. A Oscar le sonó «a española» en el video del post 66 (18-nov-2026), que tenía muchas de esas palabras. Se arregla escribiéndolas con «s» para la voz: `{celebra|selebra}`, `{zarpó|sarpó}`, `{102|siento dos}`. Hacerlo SIEMPRE, en todas las palabras con ce, ci o z, antes de generar la voz. Se puede comprobar midiendo el audio (energía aguda de esas palabras frente a las que llevan «s»; debe ser parecida).
- **Llenar el cuadro:** a Oscar no le gusta el espacio vacío entre el texto de arriba y los subtítulos (18-nov-2026). El texto solo va grande y al centro (entre 550 y 1.050 px), o con un dibujo arriba; nada de dos renglones pegados arriba.
- **Zonas seguras:** Instagram tapa los 220 px de arriba y los 340 de abajo. Los subtítulos van en `top: 1395px`.
- **Música:** va integrada en el video. La biblioteca de Instagram solo cubrió unos segundos en la prueba del 30-oct-2026. Se pone la descripción en el campo `musica` del `guion.json` (sin nombrar artistas ni canciones) y se corre `node scripts/reel-musica.mjs recursos/video/<NNN-slug> --video <sin-musica.mp4> --salida <con-musica.mp4>`, que no vuelve a generar las imágenes. Con Starter está permitida y no exige crédito, pero no se sube sola a plataformas de música. La pieza usa créditos: reutilizar `musica.mp3` al ajustar el volumen con `--nivel`.
- **Datos:** fechas y lugares salen del post, que ya tiene sus fuentes. No agregar datos que el post no trae.
