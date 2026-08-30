# Product measurement plan

Status: contract defined; collection is not enabled by default.

## Decision

Use five small outcome signals only: task start, task finish, repair completion, return after error, and teacher review turnaround. The versioned source of truth is `docs/product-quality-event-catalog.json`. Raw learner language, audio, PDFs, names, email addresses, IP addresses, API keys, and device fingerprints are never analytics fields.

## Event contract

| Event | Trigger | Allowed outcome data | Never collect |
| --- | --- | --- | --- |
| `learning_task_started` | A learner deliberately opens a practice task | app, route, task type, opaque task ID, rotating anonymous session ID, timestamp | prompt text, learner answer, transcript |
| `learning_task_finished` | The task reaches its explicit completion state | completion state | answer, score explanation, recording |
| `repair_completed` | A learner finishes the assigned correction step | repair type | original error or corrected sentence |
| `returned_after_error` | A learner returns through a displayed recovery action | coarse error category and recovery action | stack trace, document name, selected text |
| `teacher_review_completed` | A teacher completes a queued review | ready timestamp and coarse outcome | learner evidence, teacher note, learner identity |

`event_id` is a random UUID used only for idempotency. `anonymous_session_id` rotates and must not become a cross-device identity. Local storage is the default; any aggregate upload requires separate opt-in consent and a documented endpoint.

## KPI definitions

The primary KPI is **task finish rate**: distinct finished tasks divided by distinct started tasks in the same app and observation window. It answers whether learners can complete the core job.

Supporting diagnostics are:

- **Repair completion rate:** completed repair tasks divided by started repair tasks.
- **Return-after-error rate:** completed recoveries divided by all recorded recovery attempts.
- **Teacher review turnaround:** median elapsed time from review-ready to review-completed, accompanied by P75 and sample size.
- **Task starts:** a volume context, never treated as learning success by itself.

Guardrails are local-first consent rate, error rate, and missing-event rate. No numerical target is declared before the seven observation sessions establish a baseline. A threshold without a measured baseline would be invented evidence.

## Quality and governance

- Deduplicate by `event_id`.
- Reject unknown event names, unknown fields, negative durations, finish timestamps before start timestamps, and review completion before `review_ready_at`.
- Report `N/A` when a denominator is zero or consented data is unavailable.
- Retain event-level records for at most 90 days; retain only aggregate counts after that.
- Review the contract before adding any field. Free-text analytics fields are prohibited.

## Current evidence boundary

The contract and validation test exist. Production event emission, consent UI, seven observation sessions, and a baseline dashboard remain open. These metrics must not be shown as live product evidence until those steps are verified.
