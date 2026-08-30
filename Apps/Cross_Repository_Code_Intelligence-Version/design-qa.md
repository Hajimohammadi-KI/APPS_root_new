# Design QA — usable daily closing note

## Source visual truth

- Source: `C:\Users\Elahe\AppData\Local\Temp\codex-clipboard-2871b8fb-57a5-456e-a16f-54d1b99cc27a.png`.
- Source pixels: 884 × 231 at 1× density.
- Source state: desktop daily-plan detail with `Tagesabschlussnotiz`; seven controls were compressed into one row, textareas were roughly 68 px high, placeholder text wrapped into narrow vertical fragments, and writing was not practical.

## Rendered implementation evidence

- Desktop screenshot: `outputs/design-qa/daily-note-expanded-0.6.2.png` — 1265 × 712 pixels; browser CSS viewport 1280 × 720 at 1× density.
- Lower-field screenshot: `outputs/design-qa/daily-note-expanded-fields-0.6.2.png` — 1265 × 712 pixels; same desktop viewport and state.
- Responsive screenshot: `outputs/design-qa/daily-note-responsive-700px-0.6.2.png` — 685 × 881 pixels; browser CSS viewport 700 × 900 at 1× density.
- Literal comparison: `outputs/design-qa/comparison-daily-note-source-left-implementation-right-0.6.2-final.png` — source on the left and post-fix implementation on the right.
- Local production route: `http://127.0.0.1:4412/?qa=note-062#plan`.

## Findings and comparison history

### Iteration 1 — P1 fixed

- Location: `.note-box > div` and `.structured-note-grid` in `app/styles/pages/tracker.css`.
- Evidence: the source capture shows every note control forced into a single narrow flex row even though the component declares a two-column grid.
- Impact: the writing task is effectively blocked by tiny controls and severe placeholder wrapping.
- Fix: limited the generic direct-child flex rule to `.structured-note-actions`, restored the real grid, made `Konzept` and `Genaue Aktion für morgen` full-width, set other desktop fields to two columns, and switched to one column below 760 px.
- Post-fix evidence: the main field measures 797.8 × 150 px at the desktop viewport; paired fields measure about 389.9 px each with an 18 px gap. At the 700 px viewport, the grid reports one 495 px column and the main field remains 150 px high.

## Required fidelity surfaces

- Fonts and typography: retained the existing application font and hierarchy; labels are now 13 px/800 and writing text is 14 px with a 1.6 line height. No clipping or vertical letter stacking remains inside the note editor.
- Spacing and layout rhythm: the card uses 20 px desktop padding, an 18 px grid gap, and 132–150 px minimum writing heights. The save row is separated from the writing grid and stacks on narrow screens.
- Colors and tokens: existing paper, border, muted-text, focus-ring, and purple button tokens are unchanged; contrast remains consistent with the surrounding tracker.
- Image quality and assets: no raster or decorative asset is part of this form. The existing note icon is preserved; no placeholder, CSS drawing, or replacement asset was introduced.
- Copy and content: added one concise explanation of the form's purpose and improved awkward slash-heavy placeholders without changing the stored note schema.

## Functional and accessibility verification

- Typed realistic text into `Konzept`, `Problem`, and `Genaue Aktion für morgen`.
- Selected `Gut` for `Recall-Ergebnis`, saved the note, reloaded the production route, reopened the day, and confirmed all entered values persisted exactly.
- Native labels, textareas, select, resize handles, focus styling, character count, and save button remain keyboard-accessible.
- Browser console errors after the interaction: none.
- No actionable P0, P1, or P2 issue remains in the changed daily-note flow. The focused comparison was required because the source's core defect is readable only at component scale.

## 0.6.3 — explicit reading scope and weekly output

- Production QA route: `http://127.0.0.1:4413/?qa=reading-063#projekt-fahrplan`.
- Weekly-output evidence: `outputs/design-qa/weekly-output-0.6.3.png` — W1 exposes one required deliverable, its open/completed state, and a working `Zugehörigen Tag öffnen` control.
- Reading-scope evidence: `outputs/design-qa/reading-scope-full-0.6.3.png` — the daily source card distinguishes `Vollständig lesen` from `Nur diese Abschnitte lesen` and keeps the day's content focus visible.
- Responsive evidence: `outputs/design-qa/reading-scope-responsive-560px-0.6.3.png` — the reading assignment is usable at a 560 × 900 CSS viewport without page-level horizontal overflow.
- Course contract: exactly 2 of 18 NLP articles are assigned as complete reads; the remaining 16 have named section lists. Every one of the 25 plan weeks has at least one required weekly output tied to a real day.
- Interaction verification: the W1 weekly-output control opened `Anforderungs-Review-Gate`; Exposé sections § 7, § 16, and § 20 and the full Hevner reading were visible in that day's source list.
- Browser console errors after desktop and responsive checks: none.

## 0.6.4 — prerequisite learning links and four-hour budget

- Installed production QA route: `http://127.0.0.1:4312/?qa=preqa-learning-064#plan`.
- Desktop evidence: `outputs/design-qa/prerequisite-personas-desktop-0.6.4.png` — the `Stakeholder und Personas` day shows two authoritative learning cards side by side, the exact sections to read, the immediate application step, preparation time, and direct links.
- Responsive evidence: `outputs/design-qa/prerequisite-personas-responsive-560px-0.6.4.png` — the same cards stack into one readable column at a 560 × 900 CSS viewport; both links remain visible and page-level horizontal overflow is zero.
- Coverage contract: all 146 plan days resolve to one or two learning resources; all 32 unique HTTPS resources returned a successful HTTP response during release QA.
- Persona contract: NN/g `Personas: Study Guide` and the GOV.UK user-needs guide appear on the same day as `stakeholders-and-personas.md`, with `Genau lesen` and `Danach anwenden` instructions.
- Time contract: the visible preparation estimate is explicitly part of `Finden und verstehen`; regular medically cleared days use 210 task minutes plus two 15-minute breaks, not an additional learning block beyond four hours.
- Installed runtime checks: web `/`, web `/api/state`, and API `/v1/health` returned HTTP 200; package version was `0.6.4-version2`.
- Browser console warnings and errors after desktop and responsive checks: none.

final result: passed
