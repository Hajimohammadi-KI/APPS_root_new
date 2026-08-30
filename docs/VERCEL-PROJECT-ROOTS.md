# Vercel project roots

The public applications are separate Vercel projects inside this repository. Vercel must start each build in the exact app directory below; the repository root is not an application and has no root `package.json`.

| Application | Vercel project | Dashboard Root Directory | Output Directory |
| --- | --- | --- | --- |
| English Automaticity | `english-grammar-automaticity-pwa` | `Apps/English/English-07082026` | Framework default |
| Deutsch Automaticity | `deutschflow-grammar` | `Apps/Deutsch-V10.08.2026` | Framework default; `apps/web/next.config.ts` writes the Vercel build to the project-root `.next` |
| Cross Repository Tracker | `study-tracker-plan` | `Apps/Cross_Repository_Code_Intelligence-Version` | Framework default |
| Research PDF Studio | `research-pdf-studio` | `Apps/Apps-For-Integeration/Reader-PDF-App` | Framework default |
| Settings | Local-only through Starter | N/A | N/A |

## Verification

On 29 August 2026, authenticated Vercel CLI `58.7.1` inspection confirmed the four Dashboard Root Directory values above and the Next.js default output directory. The tracked contract is checked without credentials by:

```powershell
node --test scripts/vercel-project-roots.test.mjs
```

The test intentionally rejects a checked-in `outputDirectory` override. Next.js and Vercel own that path, so an old `.next` setting cannot disagree with framework detection. Project IDs, organisation IDs, and tokens are local deployment metadata and must not be committed.

The English and German build commands execute Next.js from `apps/web`. Their Next configuration therefore sets `distDir: "../../.next"` only on Vercel, which preserves the framework-default output contract at each dashboard project root without a separate Output Directory override. Tracker uses the repository's pinned Bun lockfile so its checked-in install/build commands match the authenticated dashboard settings.
