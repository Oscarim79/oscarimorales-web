#!/bin/bash
# SessionStart hook — inyecta los recordatorios pendientes del blog como contexto,
# para que Claude se los recuerde a Oscar al iniciar cualquier sesión nueva.
set -euo pipefail

PENDIENTES="${CLAUDE_PROJECT_DIR:-.}/.claude/PENDIENTES.md"
[ -f "$PENDIENTES" ] || exit 0

CTX="$(cat "$PENDIENTES")"

# SessionStart: el contenido de additionalContext se añade al contexto de la sesión.
jq -n --arg ctx "$CTX" \
  '{hookSpecificOutput: {hookEventName: "SessionStart", additionalContext: $ctx}}'
