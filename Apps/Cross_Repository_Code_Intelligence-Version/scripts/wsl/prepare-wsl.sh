#!/bin/bash
set -euo pipefail

WIN_ROOT="${1:?windows checkout root in WSL notation is required}"
APP_KEY="$(printf '%s' "$WIN_ROOT" | sha256sum | cut -c1-12)"
WSL_APP_DIR="$HOME/apps/cross-repository-code-intelligence-$APP_KEY"
mkdir -p "$WSL_APP_DIR"

rsync -a --delete \
  --exclude node_modules --exclude .git --exclude .next --exclude .wrangler \
  --exclude .npm-cache --exclude '.wsl-logs' --exclude 'runtime-*.log' --exclude .runtime \
  "$WIN_ROOT"/ "$WSL_APP_DIR"/

export PATH="$HOME/.bun/bin:$PATH"
cd "$WSL_APP_DIR"
LOCK_HASH="$(sha256sum bun.lock | cut -d' ' -f1)"
LOCK_MARKER="node_modules/.apps-root-bun-lock.sha256"
INSTALLED_HASH="$(cat "$LOCK_MARKER" 2>/dev/null || true)"
if [ ! -x node_modules/.bin/wrangler ] || [ "$INSTALLED_HASH" != "$LOCK_HASH" ]; then
  bun install --frozen-lockfile
  printf '%s\n' "$LOCK_HASH" > "$LOCK_MARKER"
fi

echo "OK: WSL Tracker copy prepared at $WSL_APP_DIR"
