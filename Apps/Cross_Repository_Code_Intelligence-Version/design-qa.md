# Design QA — Projekt-Fahrplan integrated into Projekt-Lernplan

## Source visual truth

- Desktop detail-plan reference: `C:\Users\Elahe\AppData\Local\Temp\codex-clipboard-211b24d0-40fd-4fd8-a478-9b712ff7a17d.png` (3184 × 1242 px).
- Standalone roadmap reference: `C:\Users\Elahe\AppData\Local\Temp\codex-clipboard-586ff30e-c7cb-44b6-a998-e01bd039e0fb.png` (955 × 1267 px).

The requested change is an integration, so the standalone roadmap's separate page chrome is not copied. Its hierarchy, progress ring, stage/week structure, day rows and purple visual language are carried into the existing application shell.

## Implementation evidence

- Tablet integrated roadmap: `outputs/design-qa/project-learn-plan-tablet.png` (940 × 1253 px browser content).
- Desktop integrated roadmap: `outputs/design-qa/project-learn-plan-roadmap-desktop.png` (1447 × 1236 px browser content).
- Desktop shared detail view: `outputs/design-qa/project-learn-plan-details-desktop.png` (1447 × 1236 px browser content).
- Literal full comparison: `outputs/design-qa/comparison-tablet-source-left-implementation-right.png`.
- Literal desktop comparison: `outputs/design-qa/comparison-desktop-source-left-implementation-right.png`.
- Focused roadmap comparison: `outputs/design-qa/comparison-focused-roadmap-source-left-implementation-right.png`.

## State and normalization

- Route: `/#projekt-fahrplan`; legacy `/projekt-fahrplan` redirects to that integrated view.
- State: `not_started`, 0%, 0 / 438, 146 days, 25 weeks, W1 expanded.
- The supplied roadmap is a standalone 955 px page. The implementation evidence uses the existing app shell at a requested 955 × 1273 viewport; the captured content area is 940 × 1253 px.
- The desktop browser surface caps the requested 3184 px viewport at a 1447 px content width. Desktop comparison therefore evaluates structure and continuity rather than pixel-for-pixel width.

## Full-view comparison

- The integrated view preserves the reference's progress ring, five-stage hierarchy, stage progress bars, W1–W25 grouping, expandable weeks and scannable deliverable rows.
- Existing application navigation, typography, spacing, card radii and purple tokens remain intact, matching the supplied detail-plan screen instead of introducing a second shell.
- `Projekt-Lernplan` now contains two adjacent, accessible views: `Detailplan` and `Projekt-Fahrplan`.
- The tablet capture shows no clipped labels or horizontal page overflow; the long day titles and `Tagesdetails öffnen` actions remain readable.

## Focused-region comparison

- The focused source/implementation comparison aligns the roadmap hero, 0%/146-day ring, Design stage, W1 description and first deliverable rows.
- Differences in outer frame and title scale are intentional consequences of embedding the roadmap beneath the existing `Projekt-Lernplan` heading.
- Disabled checkboxes correctly communicate preview-only state before the real plan starts; this preserves the user's no-backlog rule.

## Functional interactions verified

- Selected `Projekt-Fahrplan` through the tab interface.
- Expanded W2 and confirmed `aria-expanded="true"`.
- Opened `Problemstellung und Projektwert` from the roadmap and confirmed the view switches to `Detailplan`, the URL becomes `#plan`, and the matching day heading is present.
- Opened `/projekt-fahrplan` directly and confirmed redirect to `/#projekt-fahrplan` with the roadmap visible.
- Confirmed the integrated roadmap exposes the same 15 visible W1/W2 checkboxes in the tested expanded state and keeps them disabled while the plan is `not_started`.
- Confirmed a clean browser tab produced no warning or error log entries through the tested flow.

## Fidelity surfaces

- Typography: existing app family, weights and hierarchy preserved.
- Layout: standalone roadmap hierarchy retained inside the current shell; no duplicate sidebar link remains.
- Color and borders: existing purple/mint design tokens reused; no competing palette introduced.
- Assets: no source image, logo or icon was substituted or redrawn.
- Copy: explicitly states that roadmap and daily details share one plan and one progress state.
- Accessibility: tablist/tabpanel relationships, expanded-state controls and disabled progress controls are exposed semantically.

## Findings and comparison history

1. Initial capture showed the app's optional reading ruler; it was disabled and the clean evidence was recaptured.
2. A first test run in the LFS-skipped fresh clone found the app icon pointer instead of its binary. The exact locally verified LFS object (SHA-256 `79C914E6FF90BDE3CF45AD47B3EAC813586F3CD8A1CFD82638A0C23C4B6FA292`, 131958 bytes) was restored; the repository remained clean and the full suite passed.
3. No actionable P0, P1 or P2 visual or interaction finding remains.

final result: passed
