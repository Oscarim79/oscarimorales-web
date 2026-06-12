#!/usr/bin/env bash
# ============================================================================
# descargar-imagenes.sh — Rescata las imágenes del WordPress viejo
# ----------------------------------------------------------------------------
# Los 51 posts importados cargan sus imágenes desde
# https://oscarimorales.com/wp-content/uploads/… (el WordPress original).
# Cuando el DNS de oscarimorales.com apunte a GitHub Pages, ese WordPress
# dejará de responder, así que este script descarga cada imagen y la guarda
# en el repositorio EN LA MISMA RUTA (wp-content/uploads/…). Así las URLs
# existentes siguen funcionando sin tocar ningún post.
#
# DEBE ejecutarse ANTES de cambiar el DNS (mientras el WordPress siga vivo).
# Se corre desde el Action "Rescatar imágenes de WordPress" o a mano:
#   bash scripts/descargar-imagenes.sh
# Es seguro repetirlo: salta las imágenes ya descargadas.
# ============================================================================
set -uo pipefail
cd "$(dirname "$0")/.."

LISTA="scripts/imagenes-wordpress.txt"
ok=0; saltadas=0; fallidas=0
errores=()

while IFS= read -r url; do
  [ -z "$url" ] && continue
  ruta="${url#https://oscarimorales.com/}"
  if [ -s "$ruta" ]; then
    saltadas=$((saltadas + 1))
    continue
  fi
  mkdir -p "$(dirname "$ruta")"
  if curl -fsSL --retry 3 --retry-delay 2 --max-time 60 -o "$ruta" "$url" \
     && [ -s "$ruta" ]; then
    ok=$((ok + 1))
  else
    rm -f "$ruta"
    fallidas=$((fallidas + 1))
    errores+=("$url")
  fi
done < "$LISTA"

echo "Descargadas: $ok · Ya existían: $saltadas · Fallidas: $fallidas"
if [ "$fallidas" -gt 0 ]; then
  printf 'FALLÓ: %s\n' "${errores[@]}"
  exit 1
fi
