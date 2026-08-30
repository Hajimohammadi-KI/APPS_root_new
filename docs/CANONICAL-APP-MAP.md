# Canonical app map and archive plan

Status: published from `scripts/release-targets.json` on 30 August 2026.

## Active products

| Job | Canonical product | Source | Runtime | Accountable owner |
| --- | --- | --- | --- | --- |
| English learning | English Automaticity | `Apps/English/English-07082026` | local 3202; Vercel project `english-grammar-automaticity-pwa` | Elahe Hajimohammadi (solo maintainer; GitHub `Hajimohammadi-KI`) |
| German learning | Deutsch Automaticity | `Apps/Deutsch-V10.08.2026` | local 3210; Vercel project `deutschflow-grammar` | Elahe Hajimohammadi (solo maintainer; GitHub `Hajimohammadi-KI`) |
| Study planning | Cross Repository Tracker | `Apps/Cross_Repository_Code_Intelligence-Version` | local 4312; Vercel project `study-tracker-plan`; production `https://study-tracker-plan-five.vercel.app/` | Elahe Hajimohammadi (solo maintainer; GitHub `Hajimohammadi-KI`) |
| Shared preferences | Settings | `Apps/Apps-For-Integeration/Einstellungen-APP` | local 4323; local-only | Elahe Hajimohammadi (solo maintainer; GitHub `Hajimohammadi-KI`) |
| Research reading | Research PDF Studio | `Apps/Apps-For-Integeration/Reader-PDF-App` | local 4332; Vercel project `research-pdf-studio` | Elahe Hajimohammadi (solo maintainer; GitHub `Hajimohammadi-KI`) |

These five entries are the only active release targets. Conversation Studio, Daily Practice, Integrated Skills, and Teacher Studio are product surfaces inside the English/German canonical apps, not separate active products.

## Duplicate prototypes

Five directories are confirmed duplicate prototypes and must not receive independent release fixes. A sixth, listed here previously, was found on 2026-08-30 to be miscategorized — see the note below the table.

| Directory | Real content (after clearing gitignored caches) | Inventory verdict |
| --- | --- | --- |
| `Apps/Apps-For-Integeration/App_english-daily-practice-complete-source` | 25 KB, one static `index.html` preview | Superseded by the canonical Daily Practice surface; nothing unique |
| `Apps/Apps-For-Integeration/App_grammar-lab-responsive` | 44 KB, one static `index.html` preview | Superseded by the canonical app; nothing unique |
| `Apps/Apps-For-Integeration/App_english-automaticity-dashboard-complete` | 385 KB Next.js dashboard preview with `reference/` screenshots | Early UI iteration, superseded by the canonical dashboard |
| `Apps/Apps-For-Integeration/App_english-automaticity-routed-HOME` | 369 KB Next.js routing preview (`app/[workspace]`) | Early UI/routing iteration, superseded by the canonical app |
| `Apps/Apps-For-Integeration/App_english-conversation-studio-source` | 2.7 MB; mostly a generic Cloudflare "vinext-starter" scaffold plus `conversation-data.ts`/`conversation-storage.ts` | Canonical English already has `test-results/parity-migrated-conversation.png`, evidence this was already migrated |

**Not a duplicate — removed from this list:** `Apps/Apps-For-Integeration/App_Rememberry - Translate and Memorize with Flashcards` is **LingoBridge**, an original browser extension that integrates with the German app, English app, and project tracker (see its own `README.md`). It was archived under this list by mistake; see the note left in its `ARCHIVED.md`. Whether it stays a live sixth product or is deliberately retired is a product-owner decision, not a cleanup task, and is still open.

Before this inventory, `du` over these directories reported roughly 1.9 GB, which read as source bloat. It was not: 1.75 GB of that was gitignored `node_modules`/`.next`/`.sites-runtime`/`.wrangler` build caches, already excluded from git and safe to delete outright since any package manager regenerates them from the lockfile. That cache was cleared on 2026-08-30 (one accidental deletion of tracked `.vinext/fonts/*` files was caught via `git status` and restored immediately). The five confirmed duplicates now total under 4 MB of real, git-tracked content combined.

## Archive plan

1. ✅ Label every duplicate `prototype-review`; do not delete it yet. Done 2026-08-30 via `ARCHIVED.md` in each directory.
2. ✅ Inventory unique learner content, assets, routes, and tests against the canonical English app. Done 2026-08-30 — see the table above. None of the five confirmed duplicates contain content not already superseded by the canonical app.
3. N/A — the inventory found nothing unique to migrate from the five confirmed duplicates.
4. ✅ Add an `ARCHIVED.md` redirecting maintainers to the canonical product and freeze feature work in the duplicate. Done 2026-08-30 (corrected for LingoBridge, which got its own notice instead).
5. ⬜ Run clean-clone builds and route checks before moving the prototype to an archive repository or recoverable archive folder. Not started — low priority now that the real content is under 4 MB total; a build/route check mainly matters if something here is ever revived, not to justify deletion.
6. ⬜ Delete nothing until the product owner approves the inventory and migration evidence above. Nothing has been deleted or moved except regenerable dependency caches; the six directories remain in place pending explicit approval, and LingoBridge's status is unresolved.

## Evidence-based next investment

Choose **teacher workflow validation and repair-loop completion** for the next evidence sprint. The technical queue and assignment flow now exist, but the roadmap still has no real teacher observation. That is a larger decision risk than adding another feature. Speech quality remains second because provider availability and real audio analysis are not yet consistently verified; PDF annotation and multi-device sync follow after the teacher sessions identify whether they block the core review task.

This is a product decision for the next evidence sprint, not proof that the teacher flow already succeeds with humans.
