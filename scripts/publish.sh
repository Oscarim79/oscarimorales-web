#!/usr/bin/env bash
# ============================================================================
# publish.sh — Publicar en un solo comando (cuando trabajas desde una terminal).
#   ./scripts/publish.sh "Mensaje del commit"
# Compila el blog, commitea TODO y hace push. Si tu entorno tiene push activo,
# esto publica de inmediato. (El GitHub Action también compila por su cuenta.)
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Compilando…"
node scripts/build-posts.mjs

if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "Sin cambios. Nada que publicar."
  exit 0
fi

git add -A
git commit -m "${1:-Publicar cambios del blog}"

echo "→ Subiendo a GitHub…"
branch="$(git rev-parse --abbrev-ref HEAD)"
git push -u origin "$branch"
echo "✅ Publicado en la rama '$branch'."
