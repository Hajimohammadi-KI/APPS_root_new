# Language installer release verification — 30 August 2026

## Web production deployment

Vercel built the four public projects from runtime commit `d19c1f5e030e6e8a527dffdc11a2a3e1b544178a`. Authenticated deployment inspection reported `READY` and assigned each canonical production alias to that deployment:

| Product | Vercel project | Canonical production alias | Result |
| --- | --- | --- | --- |
| English Automaticity | `english-grammar-automaticity-pwa` | `https://english-grammar-automaticity-pwa.vercel.app/` | READY; public contract passed |
| Deutsch Automaticity | `deutschflow-grammar` | `https://deutschflow-grammar.vercel.app/` | READY; the nested `.next` output-path failure is fixed |
| Cross Repository Tracker | `study-tracker-plan` | `https://study-tracker-plan-five.vercel.app/` | READY; responsive route and persistence browser suite passed |
| Research PDF Studio | `research-pdf-studio` | `https://research-pdf-studio.vercel.app/` | READY; public contract passed |

The final release-contract commit is `35d579785e075b78b9a8728989ac5bfd4f74aac3`. It changes documentation and verification code only, so Vercel correctly retains `d19c1f5` as the deployed runtime source. The local-only Settings product returned HTTP 200 and is reported as `N/A` for public deployment by design.

## Verified

| Product | Version | Setup SHA-256 | Payload SHA-256 | Install | Update | Repair | Uninstall | Synthetic learner data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| English Automaticity | 27.3.18 | `39B63F766D8620E260ECB05D1FE338B60CA92DF40AE78FD4ACBA6DC6A3E9B744` | `19A62DD0964E7E157D4D684C40CEAA7E98814DA54EE232A1FE96425AC837FA9E` | Verified | Verified | Verified | Verified | Preserved |
| DeutschFlow | 20.8.25 | `1559CEC12612045759F2ED52F008A69E4AFC9C8A3111A04C06DEE5839AEDA621` | `5123FAF323AF6C7AE1F230F1F7127B24A03E22FF59B99B50AC123E1E8829A15D` | Verified | Verified | Verified | Verified | Preserved |

The isolated lifecycle verifier uses unique install and data roots, disables shortcuts and automatic launch during mutation checks, corrupts the version marker before repair, and verifies the synthetic learner-data hash after uninstall. Payload inspection confirms that both packages contain their shared calendar, learner-profile, and AI-provider bridges; English also contains the current local PDF Studio runtime.

## Blocked startup gate

Both final setup executables are `NotSigned`. English startup is blocked by Windows Application Control; Code Integrity events 3033 and 3077 record that the executable did not meet enterprise signing requirements. DeutschFlow did not satisfy its web and API HTTP readiness contracts within the isolated startup window. Therefore neither desktop startup gate is marked green.

This blocker cannot be solved truthfully with a free packaging workaround: the executable must be signed by a certificate trusted by the active Windows policy, or explicitly allowlisted by the device administrator, then the exact artifact hash must be rerun through the lifecycle verifier.

## Evidence

- English report: `artifacts/installer-cycle/English-20260830-024022-6e446554/report.json`
- German report: `artifacts/installer-cycle/German-20260830-024118-65773ed8/report.json`
- Verifier: `scripts/verify-language-installer-cycle.ps1`

The evidence folders are local build evidence and are intentionally not committed because they contain machine-specific absolute paths. The verifier and artifact checksum files are versioned.
