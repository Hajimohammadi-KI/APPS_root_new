# Seven-step daily practice

Canonical source for the English and German daily entry pages. The worksheet
build in each app emits the browser bundle, stylesheet and HTML. Root requests
without an explicit `screen` query open this flow. Existing app screens,
worksheets, Conversation Studio and the advanced daily tools remain accessible.

The seven activity states are Learn, Repair, Retrieve aloud, Guided use, Write,
Listen/shadow/retell, and Review/save. Every catalog worksheet supplies its own
target, authored models, exercise answers, causes, triggers and contrasts.
The current worksheet coverage is 112 English and 144 German topics.

## Evidence boundaries

- Ten controlled responses and at least nine oral cues include labelled repeated
  rounds. Repetition does not create a new evaluation item or a new context.
- The authored answer comparison reports a model match. A different grammatical
  answer is not automatically wrong. These comparisons never create a qualified
  assessment or award mastery.
- Practice submissions append to the existing versioned automaticity ledger.
  Text, WHY, ink and per-item position also remain in the saved lesson draft.
- A new topic has a separate draft key. Revision checks reject stale-tab writes.
- Recordings use the shared StudioRecorder and the existing conversation-studio
  database. Raw ASR, edited text, confirmation and original audio remain separate.
  Editing invalidates text feedback; a retry keeps the original recording.
- Audio capture duration is metadata. Response-onset timing is unavailable in
  this implementation and remains null. No pronunciation score is invented.
- The exit check is immediate practice. Reviews on days 1/3/7/14/30 require a new
  response at or after the due time. Saving a review does not establish retention
  or independent transfer without qualified assessment.
- The listening material uses authored examples and labelled browser synthesis.
  Shadowing records model exposure and possible model-audio contamination.

## Devices and data

The shared pen pad supports pressure, undo and stroke erasing; text and ink are
stored independently. Pen behavior is tested with synthetic pointer events, not
certified on physical hardware. Microphone access needs trusted HTTPS or localhost.
LAN HTTP retains text/ink functionality and explains unavailable capture.

Complete backup uses the existing backup format, storage-key ownership and
database codecs. It waits for queued media edits, includes the current draft,
and retains original audio hashes. Restore remains available through `/practice`.
No separate incompatible progress database is introduced.

## Verification

From the workspace root:

```powershell
bun test shared/seven-step-flow/model.test.ts
bun Apps/Deutsch-Automaticity/node_modules/typescript/bin/tsc --project shared/seven-step-flow/tsconfig.json
$env:DEVICE_TEST_HOST = '192.168.178.24'
node shared/seven-step-flow/verify-browser.mjs
python shared/seven-step-flow/verify-packages.py
node shared/seven-step-flow/verify-live.mjs
```

The browser harness creates isolated Chrome contexts. Its HTTPS microphone input
is a synthetic tone through real MediaRecorder; it does not use a learner's mic
or browser profile. Package verification compares the exact delivered assets and
root/daily rewrites. Installer lifecycle testing remains a separate check.

The implementation does not establish full independent item-bank coverage,
qualified oral/ink assessment, CEFR mastery or learner effectiveness. Those are
separate curriculum and evaluation work, described in
`docs/learning-flow/SEVEN-STEP-IMPLEMENTATION-PROMPT.md`.
