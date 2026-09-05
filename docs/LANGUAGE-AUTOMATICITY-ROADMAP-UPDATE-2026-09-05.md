# HTML roadmap and curriculum release-gate fix

Completed 5 September 2026 in `D:\APPS_root_new`.

The [HTML roadmap](LANGUAGE-AUTOMATICITY-ROADMAP.html) now shows all 46 work packages, with search, phase/status filters, completion criteria, dependencies and evidence paths. Verified tasks turn green. Partially completed tasks retain their status and show a separate green badge for recorded engineering checks. Changes receive a date and remain in the journal when a task is reopened.

`Open-Language-Roadmap.cmd` opens the local viewer. It regenerates the HTML when the backlog changes and updates an open browser automatically. The standalone HTML also works directly from disk. Invalid input preserves the last good view. [Usage and update instructions](LANGUAGE-ROADMAP-VIEWER.md).

The next implementation fix closes a gap in the curriculum gate. A synthetic coverage cell with an invented evaluator previously passed structural validation: [before-fix receipt](../artifacts/coverage-review-gate/before.json). The checker now rejects that mapping and requires recorded content review for reviewed claims. Release-eligible cells must have an approved evaluator for every task, with exact content hashes, versions, rubric coverage and evidence-file hashes. Automated evaluator approval recomputes its benchmark rather than accepting a saved pass flag. Nothing in this tooling activates a model.

The [review-packet generator](../scripts/prepare-automaticity-content-review.ts) supplies complete construction/task content and empty review fields for a real reviewer. It refuses to overwrite an existing packet. The [review protocol](AUTOMATICITY-REVIEW-AND-EVALUATION-PROTOCOL.md) documents the record format and release checks.

| Verification | Result and evidence |
| --- | --- |
| Roadmap browser behaviour and actual live view | 15 checks passed, including automatic green updates, reopening, preserved filters, offline file opening, keyboard access, mobile reflow and comparison with the actual backlog. [Report](../artifacts/language-roadmap/2026-09-05T05-49-12-465Z/report.json) |
| Content reviews, evaluator approvals and packets | 29 checks passed, including stale prompts/answers/prerequisites, missing review, tampered evidence, missing task/rubric approval, model version/modality mismatch and preservation of existing English/German review packets. [Report](../artifacts/coverage-review-gate/2026-09-05T05-49-06-958Z/report.json) |
| Structural coverage and negative gates | Four cases passed; authored curriculum remains outside full release. [Report](../artifacts/automaticity-coverage-gates/2026-09-05T05-45-20-701Z/report.json) |
| TypeScript and generated assets | Strict TypeScript check passed using `scripts/tsconfig.language-tools.json`. Roadmap freshness, curriculum generation and shared mirror checks passed. |
| Visual inspection | Actual [desktop](../artifacts/language-roadmap/2026-09-05T05-49-12-465Z/live-desktop.png) and [mobile](../artifacts/language-roadmap/2026-09-05T05-49-12-465Z/live-mobile.png) screenshots inspected. |

The first isolated browser attempt stalled with Bun's Edge debugging pipe. That [attempt](../artifacts/language-roadmap/2026-09-05T05-40-42-884Z/report.json) is retained. The verifier uses the working Node Playwright driver, while TypeScript tooling and the local viewer use Bun. The subsequent checks passed.

This update changes workspace tooling and documents. It does not change the installed app runtime or installer payloads; the preceding English 27.3.26 / DeutschFlow 20.8.32 release record remains in the [implementation report](LANGUAGE-AUTOMATICITY-CONTINUATION-2026-09-05.md).

Human review remains at **0 of 3,584 cells**, and real learning outcomes remain unmeasured. All reviewer identities, benchmark labels, responses and state changes in the automated checks are synthetic fixtures. U05 is verified; C04 records its stronger engineering checks while its review dependencies remain open. No curriculum approval, Transformer qualification, FSRS rollout or reinforcement-learning result is claimed.
