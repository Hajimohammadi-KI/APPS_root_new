# Seven-step learning flow: implementation and verification

Delivered 8 September 2026. English Automaticity and DeutschFlow now open the seven-step daily flow at their LAN homepages. The roadmap records task U06 and the new package versions.

## Delivered behavior

- Topic-specific Learn → Repair → Retrieve aloud → Guided use → Write → Listen/shadow/retell → Review/save states for the existing 112 English and 144 German worksheet topics.
- Cream, indigo and beige presentation, including the roadmap; responsive phone/tablet/desktop layouts.
- Typed and pen answers with separate WHY fields, per-topic drafts and exact item resume. Stale tabs cannot silently replace newer saved work.
- Shared recorder with distinct prepare, capture and feedback states. Original audio and raw ASR survive transcript editing and retry.
- Playback at 0.5×–2×. Recording duration is retained; unavailable speech-onset latency remains null.
- Immediate checks are distinct from reviews on days 1, 3, 7, 14 and 30. Future reviews cannot be completed early.
- Complete backup includes the new session records and original audio hashes. Existing worksheets, app screens and advanced daily tools remain accessible.

## Verification

| Check                                                                   | Result                       |
| ----------------------------------------------------------------------- | ---------------------------- |
| German `bun run verify`                                                 | PASS                         |
| English `bun run check` and package production build                    | PASS                         |
| Shared strict TypeScript check                                          | PASS                         |
| Eight focused tests across all 256 worksheet topics                     | PASS                         |
| Isolated Chrome at 390, 768 and 1117 px                                 | PASS                         |
| Synthetic pressure pen: save, reload and topic isolation                | PASS                         |
| Real MediaRecorder with synthetic tone: pause, edit, retry              | PASS                         |
| Exported backup: original audio hashes retained                         | PASS                         |
| Packaged new UI assets and root/daily rewrites                          | PASS: 7 assets per language  |
| Existing worksheet payload parity                                       | PASS: 16 assets per language |
| Roadmap conditional-evidence regression tests                           | PASS                         |
| Final LAN pages, packaged/live asset hashes and roadmap at three widths | PASS                         |

The recording test exposed and fixed an invalid timing-field assignment. Capture duration now stays in audio metadata, with unavailable response timing left null. The package publisher also caught a stale release-config version; the configuration was synchronized before the final update archive was produced.

## Windows releases

### English 27.3.45

- Package: `releases/EnglishGrammarAutomaticityDesktop-27.3.45-Windows.zip`.
- Package SHA-256: `3a72ed13900fee064fa4960160294f73765db992dbc3e272c186cc4ca14b5eeb`.
- Setup: `D:\APPS_root_new\Apps\English\English-Automaticity\artifacts\windows-installer\EnglishGrammar-Setup-v27.3.45.exe`.
- Setup SHA-256: `f6d4051783e4ce1a6a3152629cf87b352f86bc668ee88d7b91b50914dcf1fc14`.
- Upgrade from 27.3.44; install, startup, update, repair and uninstall passed.
- The isolated synthetic learner-data marker survived. Primary desktop profiles were not changed.
- Signature: `NotSigned`; the exact artifact executed on this machine.
- Evidence: `artifacts/installer-cycle/English-20260908-154022-cb1a926a/report.json`.

### German 20.8.50

- Package: `releases/DeutschFlowDesktop-20.8.50-Windows.zip`.
- Package SHA-256: `5da926ca571b330f2060f8c32d5c01506c85e4c8878d782a2de2a618a896b598`.
- Setup: `D:\APPS_root_new\Apps\Deutsch-Automaticity\artifacts\windows-installer\DeutschFlow-Setup-v20.8.50.exe`.
- Setup SHA-256: `6f10cb5b0c5d8b54311015cdaa066f2f71094e65c86c75abd57a9e752cbfcbf6`.
- Upgrade from 20.8.49; install, startup, update, repair and uninstall passed.
- The isolated synthetic learner-data marker survived. Primary desktop profiles were not changed.
- Signature: `NotSigned`; the exact artifact executed on this machine.
- Evidence: `artifacts/installer-cycle/German-20260908-153724-bc4d5b3c/report.json`.

## Evidence and limits

- `artifacts/seven-step-flow/browser/verification.json`.
- `artifacts/seven-step-flow/package-verification.json`.
- `artifacts/seven-step-flow/live-verification.json`.
- `artifacts/seven-step-flow/german-verify.log` and `english-check.log`.

The counts describe worksheet-derived practice coverage. Repeated cues are explicitly labelled rehearsal; they are not held-out independent assessment items. Model matches do not award grammatical mastery. Free writing, speech and ink need qualified review. The broader curriculum, CEFR proficiency and learner effectiveness remain subject to the existing validation gates.

No physical pen, phone or tablet was tested. Browser microphone capture needs trusted HTTPS; LAN HTTP supports typed and pen answers. The installer data-preservation check uses a synthetic filesystem marker. The browser test verifies backup contents and hashes; it does not claim a new browser restore-cycle test.

Live entry points: [English](http://192.168.178.24:3203/), [German](http://192.168.178.24:3211/), [roadmap](http://192.168.178.24:3317/LANGUAGE-AUTOMATICITY-ROADMAP.html).
