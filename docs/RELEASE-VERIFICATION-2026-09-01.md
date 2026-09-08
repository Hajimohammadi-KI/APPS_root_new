# Language installer verification — 1 September 2026

Status: **current-machine lifecycle VERIFIED; portable trust NOT VERIFIED**.

## Root cause and verifier fix

The first diagnostic launch captured Electron exit code 134 and this assertion
in `artifacts/installer-cycle/English-20260901-004037-cb6e291a/startup.stderr.log`:

```text
node::CreateEnvironment ... Assertion failed: (isolate_data->snapshot_data()) != nullptr
```

The verification process inherited `ELECTRON_RUN_AS_NODE=1`. Setting that
variable to an empty value was insufficient because Electron enables this mode
by variable presence. `scripts/verify-language-installer-cycle.ps1` now removes
the environment entry around `Start-Process` and restores the caller's exact
prior state afterward. It also records per-contract attempts, status/errors,
elapsed time, stdout/stderr, and early process exit.

## Exact successful artifacts

| Product | Version | Setup SHA-256 | Payload SHA-256 | Startup contracts | Lifecycle |
| --- | --- | --- | --- | --- | --- |
| English Automaticity | 27.3.20 | `AE767235728A67D7F54AFD91AB5DCEEAE262B45E7CF778906569AE926E98CAAD` | `EAA5D820A2483FB7CBB1CEC81D29A46BEF7C1DEBCCA6F57335D369321DD48D08` | web 200 and API 200 in 1,768 ms; process remained alive | install, update, repair, uninstall, and learner-data preservation verified |
| DeutschFlow | 20.8.28 | `F68B30821BF7EADA5ADDCA0C2D778479C7AA9E74C1A5D08D05C591ACA0561DF3` | `D6D2A031D5A96A697E412A5D4C0BDFE6A013C862AFFB6C2F9DF9A47DDBC26F29` | web 200 and API 200 in 7,400 ms; process remained alive | install, update, repair, uninstall, and learner-data preservation verified |

Machine-readable reports:

- `artifacts/installer-cycle/English-20260901-004236-9b7bb441/report.json`
- `artifacts/installer-cycle/German-20260901-004330-8257faf4/report.json`

## Remaining trust boundary

Both exact setup files report `NotSigned` from `Get-AuthenticodeSignature`.
This machine executed the lifecycle successfully, but that does not prove the
artifacts will pass Smart App Control or enterprise Application Control on a
different device. A trusted signing certificate or an explicit administrator
allowlist is still required before claiming portable Windows acceptance.
