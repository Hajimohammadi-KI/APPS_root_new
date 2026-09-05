# Review draft recovery

Updated 5 September 2026. Installer verification is in progress.

The English and German review panels previously cleared unfinished feedback when closed and reopened. The same form also had no draft to restore after changing responses or reloading. This was reproduced in both languages before editing: [receipt](../artifacts/review-drafts/2026-09-05T08-19-13-602Z/report.json).

The shared panel now saves a separate review draft for each original response, restores all fields and the selected response, and includes these drafts in complete backups. A storage failure keeps the current text in the tab and offers a draft download; corrupt or externally changed saved bytes are retained. A second practice tab cannot edit reviews while the first owns the session.

If another review appears during editing, saving pauses until the latest feedback is compared. The original learner response remains immutable. Late audio loads are discarded when the selected response changes, while the original recording remains playable. Locally entered feedback still does not approve a mastery or automatic-assessment scope.

The source browser check passed 12 cases per language: [report](../artifacts/review-drafts/2026-09-05T08-22-56-652Z/report.json). Six draft-storage tests passed. Full English `bun run check` and German `bun run verify` passed after fixing the shared-source sync list. A new inventory check now rejects unlisted canonical TypeScript files before copying app mirrors: [receipt](../artifacts/learning-core-sync/2026-09-05T08-24-20-438Z/report.json).

English 27.3.27 and DeutschFlow 20.8.33 are being packaged with updated service-worker caches. Installed-release status will be recorded here after install/update/repair/startup checks and profile preservation succeed. The previous installed-release receipt remains authoritative until then.

All browser responses, reviewers, recordings and quota failures used in verification are synthetic. Human curriculum review, qualified assessment, historical recording linkage and real learner outcomes remain open roadmap work.
