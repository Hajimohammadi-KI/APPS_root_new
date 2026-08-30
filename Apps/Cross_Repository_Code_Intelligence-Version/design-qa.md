# Design QA — medically protected clickable project plan

## Source visual truth

- User reference for the incorrect schedule: `C:\Users\Elahe\AppData\Local\Temp\codex-clipboard-4deb4200-01b5-4d6d-b5cb-980c2c1b123f.png` (1273 × 1283 px).
- The reference showed W1 beginning on 19 October 2026.
- The established application shell, hierarchy, typography, purple palette, integrated roadmap, and clickable progress interaction were preserved.

## Implementation evidence

- Updated paper-mode day: `outputs/design-qa/medical-paper-mode-0.6.1.jpg`.
- Literal source/implementation comparison: `outputs/design-qa/comparison-medical-schedule-source-left-implementation-right-0.6.1.png` (source left, implementation right).
- Browser verification ran on the isolated production build at `http://127.0.0.1:4412/#projekt-fahrplan`.

## Functional interaction proof

- Confirmed the plan is active from 30 August 2026 through 6 March 2027 and still contains 25 weeks, 146 days, and 438 outputs.
- Confirmed W1 runs 30 August–4 September.
- Confirmed no plan days exist during the two full-rest windows: 10–16 September and 29 September–5 October.
- Confirmed paper-only days appear during 17–24 September and 6–13 October; each is labelled `Papiermodus · ohne Bildschirm`, explains the 14-day screen restriction, and disables digital focus.
- Confirmed W2 roadmap deliverables are labelled `Papiermodus`.
- Clicked the W1 `Problemstellung und Projektwert` roadmap checkbox: shared progress changed from `0 / 438` to `3 / 438`, W1 to 17%, Design to 3%, and overall to 1%.
- Reloaded the route and confirmed the checkbox and `3 / 438` persisted.

## Visual and accessibility comparison

- The source's 19 October W1 date has been replaced by the correct 30 August start.
- The paper-only card uses the existing design system with a restrained amber status chip and note; no new visual language or fake asset was introduced.
- Paper-mode Focus buttons are semantic disabled buttons. Roadmap controls remain labelled native checkboxes, week disclosures retain `aria-expanded`, and the plan/status hierarchy remains keyboard-readable.
- Side-by-side inspection found no clipped date, overlapping status, broken card border, or unreadable changed text. The changed content remains usable at the browser's desktop viewport.

## Findings

1. The prior schedule incorrectly deferred all work until 19 October.
2. The corrected schedule protects both seven-day full-rest windows and restricts the second recovery week to paper-only engineering work.
3. Clickable progress remains shared and persistent without weakening the medical screen restriction.
4. No actionable P0, P1, or P2 visual, behavioral, or accessibility finding remains in the changed flow.

final result: passed
