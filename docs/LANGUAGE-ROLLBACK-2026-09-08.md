# Requested release restoration

The user requested DeutschFlow 20.8.48 and English Automaticity 27.3.43, then confirmed that the same three LAN links must remain active.

- English: http://192.168.178.24:3203/
- German: http://192.168.178.24:3211/
- Roadmap: http://192.168.178.24:3317/LANGUAGE-AUTOMATICITY-ROADMAP.html

The gateway now runs the web and API files extracted from those exact release archives. A local `AutomaticityDeviceAccess/release-runtimes.json` pin prevents gateway restarts from selecting a newer development build. Windows sign-in startup is enabled. The seven-step redesign was reverted; app source was restored to release commit `941f85cf`.

The Windows installations were updated to the requested versions using each archive's bundled payload manager. The existing profiles were backed up before installation. All 882 German and 594 English profile files retained their SHA-256 hashes immediately after installation. Browser profiles were not edited or cleared.

Release archives used at restoration time:

- `D:\APPS_root_new\releases\DeutschFlowDesktop-20.8.48-Windows.zip`
- `D:\APPS_root_new\releases\EnglishGrammarAutomaticityDesktop-27.3.43-Windows.zip`

Evidence is in `artifacts/rollback-2026-09-08/`: package hashes, browser observations, profile backup manifests and final live verification. Original release artifacts were used; no replacement version was built.

The restored dashboards load at the LAN links. These older versions intentionally show the local-service status as unavailable outside localhost. Their local API connections work at `http://127.0.0.1:3202/` and `http://127.0.0.1:3210/`. Restoration does not add later-version LAN API compatibility to the archived applications.

During final verification, workspace directories including the release archive folder disappeared. The running services use the extracted runtimes under `artifacts/release-runtime`; the installed payload copies still match the recorded release hashes. Only the roadmap page, its data and required verification inputs were recovered. Unrelated working-tree deletions are excluded from the rollback commit.
