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

The following directories are retained as reference prototypes and must not receive independent release fixes:

- `Apps/Apps-For-Integeration/App_english-automaticity-dashboard-complete`
- `Apps/Apps-For-Integeration/App_english-automaticity-routed-HOME`
- `Apps/Apps-For-Integeration/App_english-conversation-studio-source`
- `Apps/Apps-For-Integeration/App_english-daily-practice-complete-source`
- `Apps/Apps-For-Integeration/App_grammar-lab-responsive`
- `Apps/Apps-For-Integeration/App_Rememberry - Translate and Memorize with Flashcards`

## Archive plan

1. ✅ Label every duplicate `prototype-review`; do not delete it yet. Done 2026-08-30 via `ARCHIVED.md` in each directory.
2. ⬜ Inventory unique learner content, assets, routes, and tests against the canonical English app. Not started.
3. ⬜ Migrate only unique, licensed, verified material through a focused commit. Not started.
4. ✅ Add an `ARCHIVED.md` redirecting maintainers to the canonical product and freeze feature work in the duplicate. Done 2026-08-30.
5. ⬜ Run clean-clone builds and route checks before moving the prototype to an archive repository or recoverable archive folder. Not started.
6. ⬜ Delete nothing until the product owner approves the inventory and migration evidence. Nothing has been deleted or moved; the six directories remain in place pending steps 2, 3, and 5.

## Evidence-based next investment

Choose **teacher workflow validation and repair-loop completion** for the next evidence sprint. The technical queue and assignment flow now exist, but the roadmap still has no real teacher observation. That is a larger decision risk than adding another feature. Speech quality remains second because provider availability and real audio analysis are not yet consistently verified; PDF annotation and multi-device sync follow after the teacher sessions identify whether they block the core review task.

This is a product decision for the next evidence sprint, not proof that the teacher flow already succeeds with humans.
