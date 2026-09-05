# Open the language roadmap

Open [LANGUAGE-AUTOMATICITY-ROADMAP.html](LANGUAGE-AUTOMATICITY-ROADMAP.html) for the self-contained HTML file. Double-click `Open-Language-Roadmap.cmd` in the workspace for the live viewer at `http://127.0.0.1:3317`.

The live viewer checks the backlog every 1.5 seconds and the browser refreshes its data every 3 seconds. It also regenerates the HTML file. It runs locally, serves only the roadmap and its snapshot, and has no write endpoint. It does not start automatically with Windows. Closing the browser leaves the local viewer running so later backlog changes still update the HTML.

Green task cards mean the ticket's acceptance is verified. A green engineering badge marks verified work within an otherwise open ticket. A reopened task changes colour again, while its earlier progress stays in the dated journal. The first snapshot does not invent earlier completion dates.

The viewer preserves filters and expanded task cards during updates. Invalid backlog data leaves the last good roadmap visible and shows an update error.

```powershell
# Regenerate the standalone file and append actual backlog changes to its journal.
bun scripts/language-roadmap.ts

# Fail if the generated HTML or journal is stale.
bun scripts/language-roadmap.ts --check

# Run the live viewer in this terminal; Ctrl+C stops it.
bun scripts/language-roadmap.ts --serve

# Verify behaviour with an isolated synthetic backlog and Edge profile.
node scripts/verify-language-roadmap.mjs
```

Update `language-automaticity-implementation-backlog.json` after each change. Add the dated result, its evidence paths and its actual status. Mark a whole task `verified` only after its acceptance checks pass. For a partial implementation with passing checks, keep the task open and set `engineeringVerification` to `verified_for_recorded_scope`, explaining the remaining work in `progressNote`. The generator requires an evidence reference for either green state; the implementation owner must still check that evidence supports the stated scope.

`language-automaticity-roadmap-history.json` is the journal. Preserve it when updating the backlog. These files track this workspace's English/German language strategy; the thesis is a separate project.
