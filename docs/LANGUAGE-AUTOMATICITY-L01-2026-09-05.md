# L01 representative grammar assessment

Delivered locally on 5 September 2026 in English **27.3.37** and DeutschFlow **20.8.41**. The representative implementation and engineering checks are complete. L01 remains open for recorded independent language review and approval of the scoped assessment paths.

The apps now contain **12 construction scopes and 168 new tasks** across inflection, valency, temporal meaning, clause order, modal passive and contrast. Each language has six scopes; each scope covers seven stages in writing and speaking. All **5,262 previous task definitions** and 506 retired-task records are preserved. There are now 4,924 active tasks in the full catalog.

48 bounded writing tasks use construction-specific parsing. The checker consumes the complete sentence, checks grammatical form, extracts participants and other meaning features, and compares them with the task situation. Valid supported variants pass without being stored in acceptedAnswers. Reversed roles or changed time/action fail relevance without being mislabelled ungrammatical. Contrast tasks distinguish causal from concessive linking. Capitalization remains part of writing. Unsupported wording is saved without a correctness score.

The other 120 tasks use explicit review paths: noticing, original production, transfer and all speaking tasks. Spoken work requires listening to the original recording; typed transcripts do not establish spoken accuracy. The bounded rule evaluator remains unapproved for mastery. No human review, model qualification or learner outcome was fabricated.

389 focused assessment/evidence tests passed, including 334 representative cases. Both required app checks passed. Installed browser tests exercised all 12 scopes through Grammar topic selection, alternative answers, errors and linked repair, role mismatches, abstention, transfer review and speaking fallback. Installer tests verified fresh install, exact previous-version upgrade, startup, update, repair, uninstall and data preservation. Normal-profile updates preserved English: 588 files / 52402628 bytes; German: 816 files / 49401094 bytes.

The rules use authored examples informed by [British Council grammar references](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-prepositions) and [IDS grammar references](https://grammis.ids-mannheim.de/progr%40mm/6851). Sources are recorded for each scope; checking sources is not independent approval of these tasks.

The review gate covers only this representative subset. Full-family coverage and seven-day learner results are separate work. It currently reports **0 of 168 cells reviewed and approved**. Review packets contain the tasks, source links, regression results, manual assessment procedure and blank evidence forms. They are at [the review guide](../artifacts/l01-assessment/review-2026-09-05T18-04-35-789Z/README.md). Record genuine completed evidence in docs/automaticity-representative-reviews.json and run bun scripts/check-representative-review.ts --release. These records cannot approve the rest of the curriculum or activate a runtime evaluator.

The browser suite initially attempted to edit an already submitted, locked response; it was corrected to use the app's explicit repair action. Historical verification helpers were updated for the new, preserved task subset. A root-level test run lacked app dependencies; the same tests passed in the synchronized app workspace. All failed logs remain available.

Evidence: [delivery receipt](../artifacts/l01-assessment/delivery-verification.json), [assessment and preservation](../artifacts/l01-assessment/assessment-verification.json), [review gate](../artifacts/l01-assessment/review-gate.json). Public web deployments were not updated.
