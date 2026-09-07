# Grammar worksheet implementation review

Reviewed on 2026-09-08. Scope: the existing German and English grammar pages, shared worksheet content and renderer, printable output, device ink input, and Windows delivery packages.

## Design and curriculum

The supplied Learn, Practice and Assess images informed the page sequence, header bands, numbered cards, decision boxes, compact tables and review strip. Reference images and rendered pages were inspected together. The implementation uses cream `#FAF8F4`, indigo `#3D5A9E`, sand `#EFE7DA` and sparse coral `#D96B5A`, with exported Lucide line icons. It contains no green worksheet accents, people or clip art. Typography and writing areas remain legible in the inspected A4 renders.

The shared renderer covers all 144 German and 112 English catalog topics, A1–C2. Each topic has one focused decision across three learner pages, with controlled contrasts, a decision chain, a WHY field for each exercise, reconstruction, transformation, a timed oral drill, personal production, error logging and review on days 1, 3, 7 and 14. Answer keys are separate and include answer, cause, trigger, category and contrast. Optional Persian instructions keep target-language sentences left to right.

This provides a worksheet for every catalog topic; it does not imply that one set exhausts every sub-skill in that topic or demonstrate improved learning outcomes. Grammatically possible alternatives that miss the requested meaning or register are explicitly distinguished from grammatical errors.

The reusable source prompt is [shared/grammar-worksheets/MASTER-PROMPT.md](shared/grammar-worksheets/MASTER-PROMPT.md). Source ownership and regeneration commands are in the [README](shared/grammar-worksheets/README.md).

## Verification

| Check | Result and scope |
| --- | --- |
| Content contracts | PASS: 8 tests, 29,694 assertions; full catalog mapping, unique IDs, target spans and answer-key completeness. |
| Browser interaction | PASS for both languages: stage navigation, instruction language, reconstruction cover, oral timer, typed answers, ink persistence, pressure events, erasing, undo and clear. No mastery-state mutation. |
| Responsive layout | PASS: all three stages at 390, 768 and 1500 px; no horizontal overflow. |
| A4 layout coverage | PASS: 1,536 layouts across 256 topics, three stages and both instruction-language modes. |
| Print output | PASS: the six sample handout/key PDFs contain three A4 pages each. Blank exports remain three pages after long writing and manual field resizing, and omit saved text and ink. Filled exports preserve long text and ink, allowing additional pages. |
| Storage failure | PASS: a simulated quota failure is reported without claiming the draft was saved. |
| English project check | PASS: `bun run check`, including curriculum parity, tests, installer checks and lint. |
| German individual checks | PASS: lint, typecheck, application tests, worksheet tests, installer tests and schema checks. Production build passed. |
| German aggregate verify | BLOCKED at the existing formatting gate in untouched `apps/web/src/features/errors/error-engine.tsx` and `packages/learning-core/src/automaticity/backup.ts`. The required checks were also run individually. |
| Packaged source parity | PASS: each final payload contains the expected embedded web checksum and 16 worksheet-related assets matching current public sources. |

Browser and print evidence is under `artifacts/grammar-worksheets/de` and `artifacts/grammar-worksheets/en`; package parity is recorded in `artifacts/grammar-worksheets/package-verification.json`. Detailed command logs are under `.codex-tmp/grammar-worksheet`.

Pen checks use real browser-dispatched Pointer Events in a disposable Chrome profile. Physical Apple Pencil, Android stylus and Windows pen hardware were not available for certification. Handwriting remains locally saved ink; it is not OCR, automatic grading or cross-device synchronization.

## Windows release verification

Both final packages passed previous-version installation, upgrade, startup, update, repair and uninstall in isolated test directories. A synthetic learner-data marker survived; browser/IndexedDB backup restoration was not part of this lifecycle check. Both setup executables are unsigned and executed successfully on this machine.

| Product | Final version | Previous version | Lifecycle evidence |
| --- | --- | --- | --- |
| DeutschFlow | 20.8.47 | 20.8.45 | `artifacts/installer-cycle/German-20260908-014522-d982d0c4/report.json` |
| English Grammar Automaticity | 27.3.42 | 27.3.41 | `artifacts/installer-cycle/English-20260908-014803-0ea57156/report.json` |

Release archives include the setup and its required payload:

- `releases/DeutschFlowDesktop-20.8.47-Windows.zip` — SHA-256 `7c9604a2b2e5ca4a26a7066bdfffffc804be74bac6e429497c642c7df43bea32`.
- `releases/EnglishGrammarAutomaticityDesktop-27.3.42-Windows.zip` — SHA-256 `f28754417e03600b1e7dbbb0220d45272247a1860714361010f37f277bf6b4bd`.

Verified setup SHA-256 values:

- DeutschFlow: `e4a472a9542c82cb27a0661856b57c360bd4dfa3f841b8128f57d591ad2f0b0f`.
- English Grammar Automaticity: `fe8fb22dcc823b4feb98d17b5b7b6b595fb45f85e6d79d6893b76e71c0f4067c`.

Printable samples are committed under each app's `output/pdf` directory. Runtime evidence and large installer archives stay outside Git.
