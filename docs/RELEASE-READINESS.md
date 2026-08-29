# Release readiness gate

This checklist covers the five canonical products opened by Starter. It keeps
build success, live local HTTP readiness, and public accessibility as separate
claims. Settings is deliberately local-only, so its public check is reported as
`N/A` instead of a false success or failure.

| Product | Build | Local contract | Public contract |
| --- | --- | --- | --- |
| English Automaticity | `bun run build` | Web `3202`; API `4201/api/health` | Canonical Vercel home |
| Deutsch Automaticity | `bun run build` | Web `3210`; API `4210/api/v1/health` | Canonical Vercel home |
| Cross Repository Tracker | `bun run build` | Web `4312`; API `4313/v1/health` | Canonical Vercel home |
| Settings | `bun run build` | `/settings` on `4323` | `N/A` — local-only |
| Research PDF Studio | `bun run build` | Web `4332`; contract health endpoint | Canonical Vercel home |

On Windows, run the gate in two stages because a running Next.js standalone
server locks its own `.next/standalone` payload. First stop the five app
services and verify every production build:

```powershell
node scripts/release-readiness.mjs --build-only
```

Restart the apps through Starter, then verify real local and public HTTP
contracts:

```powershell
node scripts/release-readiness.mjs --runtime-only
```

Useful bounded checks:

```powershell
node scripts/release-readiness.mjs --skip-build --skip-public
node scripts/release-readiness.mjs --only=english --skip-build
node scripts/release-readiness.mjs --only=english --build-only
node scripts/release-readiness.mjs --json
node --test scripts/release-readiness.test.mjs
```

Each stage exits non-zero when its applicable contract fails. Both stages must
pass for release readiness; do not mark the overall phase green from listener
status alone.
