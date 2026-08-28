#!/bin/bash
set -euo pipefail

WIN_ROOT="${1:?windows checkout root in WSL notation is required}"
APP_KEY="$(printf '%s' "$WIN_ROOT" | sha256sum | cut -c1-12)"
WSL_APP_DIR="$HOME/apps/cross-repository-code-intelligence-$APP_KEY"
INTERNAL_PORT=15412
PUBLIC_PORT=4312
LOG_DIR="$WSL_APP_DIR/.wsl-logs"
mkdir -p "$LOG_DIR"

fuser -k "${INTERNAL_PORT}/tcp" 2>/dev/null || true
fuser -k "${PUBLIC_PORT}/tcp" 2>/dev/null || true
sleep 1

export PATH="$HOME/.bun/bin:$PATH"
cd "$WSL_APP_DIR"
if [ ! -x node_modules/.bin/wrangler ]; then
  echo "[run-web] WSL dependencies are missing." >> "$LOG_DIR/web.log"
  exit 1
fi

./node_modules/.bin/wrangler dev dist/server/index.js --config dist/server/wrangler.json \
  --persist-to .wrangler/state --port "$INTERNAL_PORT" --ip 127.0.0.1 --log-level warn \
  >> "$LOG_DIR/web.log" 2>&1 &
BACKEND_PID=$!

for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:${INTERNAL_PORT}/"; then break; fi
  sleep 0.5
done

node scripts/wsl/tcp-relay.mjs "$PUBLIC_PORT" "$INTERNAL_PORT" >> "$LOG_DIR/relay.log" 2>&1 &
RELAY_PID=$!
wait -n "$BACKEND_PID" "$RELAY_PID"
