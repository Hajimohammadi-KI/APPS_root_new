# English and German: seven-step learning flow

Status: proposed implementation handoff, 8 September 2026. This document is a
screen-by-screen specification and coding prompt. It is not a claim that the new
seven-step workflow has already been implemented or educationally validated.

Use the following prompt together with `A1-DU-IMPERATIVE-EXAMPLE.md`. Preserve the
original supplied Markdown and PDF. Their numeric thresholds and algorithm
sketches are design proposals, not established scientific mastery standards.

## Copy-ready implementation prompt

You are an instructional designer, English/German curriculum specialist and
frontend engineer. Extend the existing English Automaticity and DeutschFlow apps
with a seven-step, resumable daily micro-lesson. Build real activity states and
saved learner outputs. Seven navigation cards pointing to generic exercises are
not sufficient.

The target is accurate, increasingly independent use in new contexts over time.
Do not promise permanent error-free language or certify CEFR proficiency from a
single grammar exercise. Completion, practice accuracy, response latency,
independence and delayed performance must remain separate.

### 1. Preserve the existing product

Use these canonical roots:

- English: `Apps/English/English-Automaticity`.
- German: `Apps/Deutsch-Automaticity`.
- Shared worksheet source: `shared/grammar-worksheets`.
- Shared conversation source: `shared/conversation-flow`.
- Shared evidence, backup and scheduling source: `shared/learning-core`.
- Device gateway: `shared/device-access`; launcher:
  `scripts/start-language-devices.ps1`.

The daily entry pages currently live at
`apps/web/public/replacements/en/daily.html` and
`apps/web/public/replacements/de/heute.html`. Their numbered activities currently
link to shared grammar, studio and notebook pages. Replace that routing behavior
with an explicit lesson ID, micro-skill ID, step ID and saved session. Preserve
working navigation, existing catalogs, local drafts, backup compatibility,
recordings, installer support and source synchronization.

Keep the existing three-screen conversation interface inside speaking activities:
Prepare → Speak → Feedback. A retry returns to Speak and creates another attempt.
Do not add a second recorder to Feedback. A seven-step lesson is a curriculum
sequence; it does not replace those three interaction states.

Do not copy German morphology into English. Share layout, controls and evidence
contracts; author language-specific tasks, accepted answers and feedback.

### 2. Non-negotiable learning contract

1. One lesson targets one observable grammatical decision. Keep vocabulary,
   context and prerequisite grammar predictable. A broad catalog topic may have
   several separately identified micro-lessons.
2. Express the rule as a decision chain. Example:
   `eine vertraute Person → du → Stamm mach → Mach!`.
3. Show two correct models. Incorrect full sentences appear only in clearly
   labelled correction tasks or authentic learner-response displays.
4. Distinguish an ungrammatical sentence from a grammatical sentence that fails
   the stated context. `Macht weiter!` is valid for several familiar listeners;
   it is the wrong person choice when the task explicitly addresses one friend.
5. Every answer has a WHY field. During timed speaking, collect WHY afterwards,
   without a timer. A missing written explanation must not be disguised as a
   grammar error in the spoken answer.
6. The primary feedback identifies one target error, gives a local correction,
   explains its cause and offers one new repair item. Other suggestions remain
   collapsed and outside the target score. A misunderstanding that prevents
   interpretation is labelled separately, not silently counted as grammar failure.
7. Record hint/model exposure as assistance. Do not subtract arbitrary points
   for asking for help. Assisted practice counts as practice; use a fresh,
   unassisted attempt when checking independence.
8. Include transformation, reconstruction after hiding the model, timed oral
   retrieval, personal production and delayed review.
9. Save unfinished work. Save/exit must never require a pass, two recordings or
   an available online evaluator.
10. No provider, unreadable audio or ambiguous answer means `not assessed`,
    not zero, full marks or an invented accuracy percentage.

### 3. Visual and device contract

Use warm paper `#FAF8F4`, navy-charcoal text, indigo `#3D5A9E`, sand `#EFE7DA`,
and sparse correction coral `#D96B5A`. No green. Preserve the existing geometric
sans-serif typography, thin borders, rounded cards and quiet shadows. Use the
existing line-icon library; no people, clip art, emoji or decorative illustrations.

At 390 px: one column, 16 px outer padding, body text at least 16 px, touch controls
at least 44 × 44 px. At tablet and desktop widths: a centered reading/work column
with a maximum width around 960 px. The lesson overview may become a side rail,
but the rule, examples, score and error journal must not remain visible during
unassisted production or testing. Keyboard focus must remain visible and never
be hidden behind a reading ruler or fixed action bar.

Header: indigo band with lesson title and a short subtitle. A compact row shows
`Step n of 7` and the one target. Put category, CEFR context, detailed criteria and
full progress history behind an optional overview. One main task and one primary
action should dominate the current view.

German/English prompts and answer fields use LTR direction. Optional Persian
guidance uses its own RTL block and suitable font. Do not mirror German word
order, timers or audio controls when Persian is enabled.

Every answer, personal rule and WHY field supports typed text plus an expandable
pen pad. Preserve text and ink separately. Reuse pressure-aware Pointer Events,
undo, stroke eraser and clear. Restrict `touch-action: none` to the writing pad;
the page outside it must scroll. Ignore additional pointers during an active
stroke. Do not claim hardware palm rejection or OCR. Ink remains an artifact
awaiting review, never an automatically graded transcript.

Audio playback retains 0.5×, 0.75×, 1×, 1.25×, 1.5× and 2×. The reference's
1.15× option may be added, but must not remove the existing range. Playback speed
must not change capture duration, original audio, response timing or mastery.
Distinguish an authored recording from labelled browser speech synthesis.

Mic capture requires trusted HTTPS or localhost and user permission. Retain
distinct permission, missing-device, device-error, silence, paused, stopped and
interrupted states. Display a waveform only from real input. Save drafts on
navigation/backgrounding where possible and warn honestly about unsaved data.
Do not request microphone access when merely opening a lesson.

### 4. Screen designs and behavior

The sequence is Learn → Repair → Retrieve aloud → Guided use → Write →
Listen/shadow/retell → Review/save. The overview can expose all seven steps,
while opening a step never marks it complete. A first session is planned for
15–20 minutes; this is an estimate, not a forced deadline. Longer writing,
accessibility settings and retries can continue in a later saved session.

#### Screen 1: Learn one pattern

Title: `1. Ein Muster lernen` / `1. Learn one pattern`.

Reading order:

1. Sand decision-chain card, then two short correct examples.
2. One controlled item at a time with an answer and WHY field.
3. On submission: local correction/WHY, then `Next item`.
4. Bottom: item position, `Save and exit`, primary `Continue`.

Prepare 8–10 items, including one transformation and one reconstruction. For the
reconstruction, show the model first, then deliberately hide it before entry.
Do not display correct answers in input placeholders. A `Practice / Check without
help` switch must visibly distinguish supported learning from the fresh scored
check. In the latter, hide rule, examples, previous answers and solutions.

Completion: each prescribed item has an attempt or an explicit saved skip.
Readiness: show the check's exact numerator/denominator. The provisional training
target is 8/10. Below it, suggest retrying missed patterns with new items. Never
replace the initial score with the retry score.

#### Screen 2: Fix one error

Title: `2. Einen Fehler korrigieren` / `2. Fix one error`.

Reading order:

1. One saved target error, labelled with its source. If none exists, show an
   explicitly labelled authored common-error example. Never present it as the
   learner's own mistake.
2. Context → learner/example sentence → one editable target span.
3. After submission: correct model → short WHY → contrast → one immediate retry.
4. Optional `Say the correction`, then `Continue`.

Provide 4–6 repair items. Every item needs enough context for the answer to be
unambiguous and exactly one scored error cause. In the example lesson, six items
and a provisional 5/6 target are suitable. Learners with no errors can complete a
brief diagnostic contrast; do not fabricate a personal error history.

`Retry` creates a linked attempt. `Resolved in practice` does not mean the error
has disappeared from future independent use. A failed delayed review can return
here without resetting the entire course.

#### Screen 3: Retrieve aloud

Title: `3. Schnell abrufen` / `3. Retrieve aloud`.

Preparation state: one model, timing choice (3–6 seconds, default 4), and Start.
Capture state: one cue, timer and recorder state. No rule card, live transcript,
word count, WPM, error list or running correctness score. After the cue block,
show recorded responses and one priority correction. WHY comes after timing.

Use 8–10 authored cues with a single substitution or transformation each. Cue
timing starts after the visual cue is rendered, or after an audio cue finishes,
not at the start of an asynchronous request. Record cue visibility time, speech
onset when reliably available, response end and interruptions separately.
Button-click time and ASR callback time are not speech-onset latency. RMS noise
detection alone is not verified target-language speech. Store latency as null
when a reliable onset is unavailable.

The provisional target is 9/10 target-correct responses with a response-onset goal
of four seconds on this short-cue task. Show timing coverage and distribution,
not only an average. If using two rounds, use distinct item IDs and variants;
report them separately. Correctness and timing are independently missing or known.

Self-rating supports reflection but cannot qualify verified oral accuracy. Keep
the audio and mark external review pending. Permit the learner to continue with
practice even when assessment is unavailable.

#### Screen 4: Use it in a real situation

Title: `4. Im Alltag anwenden` / `4. Use it in a real situation`.

Reuse Prepare → Speak → Feedback. Prepare shows one short scenario and at most
two optional hints. Speak presents one question/cue at a time and an optional
`Show task` control. Feedback requires transcript confirmation before language
feedback, and shows one primary target correction.

For A1, elicit three meaningful short target uses. A 30–60 second recording is a
suggested capacity, not a minimum that rewards padding. Keep the target separate
from intelligibility and task relevance. An absent target means `not elicited /
not observed`, not a falsely perfect score.

Because this step names the target and can provide hints, label it `guided use`.
It is not by itself proof of independent transfer. A different unassisted prompt
is required later. A retry of the same scenario measures immediate improvement
and preserves the first audio, raw ASR and timing.

#### Screen 5: Write it yourself

Title: `5. Selbst schreiben` / `5. Write it yourself`.

Reading order: one personal task → three expandable writing/pen areas → target
checklist → `Check my target`. Allow 3–5 short sentences and collect at least
three genuine target opportunities. The task must fit the grammar; do not force
the same generic journal question onto all topics.

The checklist asks whether the target is present, whether the chosen form matches
the trigger and whether the message is understandable. It does not introduce
three newly scored grammar problems. A word bank is optional and its exposure is
recorded as support. Do not automatically rewrite the learner's whole text.

Report correct target opportunities / assessed target opportunities and the
number not assessed. At three scored opportunities, an 80% provisional target
requires 3/3: 2/3 is about 67%, not 80%. Use five opportunities if a 4/5 result is
intended. For free language, accepted variants and meaning need a qualified
reviewer/evaluator; substring matching is insufficient.

Store the original text, later revision, ink, assessment source and error tags
separately. A learner's typed description of their handwriting is a new text
artifact; it must not be treated as OCR evidence of what the ink contains.

#### Screen 6: Listen, shadow, retell

Title: `6. Hören, mitsprechen, neu erzählen` /
`6. Listen, shadow, retell`.

Use one short, level-appropriate authored script. Aim for roughly 10–25 seconds
at normal playback, and report actual duration only when real audio exists.
Show one substage at a time:

| Substage          | Visible task                               | Evidence                                     |
| ----------------- | ------------------------------------------ | -------------------------------------------- |
| Listen            | Audio + one gist choice                    | Listening response; transcript hidden        |
| Read and listen   | Audio + transcript with target highlights  | Exposure only                                |
| Echo              | One sentence; play then pause for response | Separate recording; model-assisted imitation |
| Shadow            | Audio plus optional transcript             | Supported imitation attempt                  |
| Retell and change | New details; original transcript hidden    | New response, assistance recorded            |

Playback speed remains adjustable. Never play model audio through the speaker
while interpreting that same signal as the learner's independent speech. If the
microphone can pick up the model, flag contamination; headphones alone are not
proof of a clean recording. Echo/Shadow cannot qualify independent production.

Retelling with changed details is recombination practice. Broader transfer still
requires a genuinely new task/context. Clicking all five substage buttons is
navigation, not five completed performances.

#### Screen 7: Review and save evidence

Title: `7. Prüfen und sichern` / `7. Review and save evidence`.

First show a short rule-hidden exit check, then its feedback and an evidence
summary. This immediate exit check is not a delayed test. Three items can provide
a quick diagnostic, but are too coarse to display a 9/10 decision. If the product
requires a 90% controlled threshold, use ten scored opportunities in a separate
check or disclose the exact smaller denominator.

Summary: target accuracy by mode, independent/assisted status, one main error,
personal decision cue, saved text/ink/audio and assessment gaps. Never display
the reference's example values as real learner data.

The required session-closing action is to review the summary and choose a next
action. `Save and exit` remains possible at any earlier step. Keep these states
independent:

- Draft saved.
- Session closed/completed.
- Assessment complete or awaiting review.
- Review scheduled.
- Delayed evidence sufficient or still missing.

Schedule Day/Tag 1, 3, 7 and 14 using the learner's local calendar and a stored
time zone. Day 14 preserves the existing worksheet/conversation requirement.
Future review cards cannot be passed by checking a box early. Each completed
review links to a new response produced at/after its due time.

During a delayed check, hide old recordings, corrections, rules and model
sentences until the response is submitted. Use an authored alternate item family
and a new context. If hints are requested, allow practice, record assistance and
offer a later fresh independent check. Do not certify retention from aided work.

### 5. Learning state and scheduling policy

Do not use a single `mastered: true` switch derived from three review checkboxes.
Use separate flags/derived values for activity completion, due review, assessment
availability and demonstrated performance. Suggested UI labels are New,
Practising, Developing fluency, Due for review, and Stable on checked tasks.
If the existing product retains `Mastered`, label its scope as the specific
micro-skill and expose the evidence and criteria version. It is not CEFR mastery
or proof of zero future errors.

Recommended default: prioritize due/failed reviews before recommending another
micro-skill, without imposing a seven-day lock on the whole curriculum. Preserve
the requested distinction in configuration:

- `review-first` (recommended): show the reason a due item comes first, permit
  browsing and saved continuation, and retain the prerequisite evidence gate for
  a dependent new lesson.
- `strict-dependent-lesson-lock` (optional): block only explicitly dependent new
  lessons until their named prerequisites pass. Explain the missing evidence and
  offer practice that is still available. Do not impose this policy globally.

These are product choices. The supplied research does not validate a universal
seven-day content lock, 80/90% cutoffs or a four-second mastery threshold.

A micro-skill can be labelled stable on checked tasks only when current,
qualified assessments support ALL required modes, an unassisted new-context
task, and the configured delayed checks. Apply at least the existing evidence
gates; do not weaken them merely because the new interface has seven steps.
Unknown evidence leaves the decision pending. A later failed check reopens the
skill and recommends the relevant repair; it does not delete past evidence.

### 6. Data and assessment contract

Adapt existing versioned event/backup contracts rather than inventing a separate,
incompatible progress database. Keep immutable content apart from learner scores.
Map new fields into existing schema versions where possible; migrate additive
fields without rewriting original attempts.

```ts
type TargetLanguage = "de" | "en";
type LessonStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type EvidenceKind =
  | "controlled"
  | "repair"
  | "oral_retrieval"
  | "guided_use"
  | "independent_writing"
  | "echo"
  | "shadow"
  | "retell"
  | "immediate_check"
  | "delayed_new_context";

interface MicroLessonDefinition {
  // Version authored content independently of the learner's attempts and scores.
  id: string;
  contentVersion: string;
  language: TargetLanguage;
  catalogTopicId: string;
  microSkillId: string;
  oneDecision: string;
  fixedPrerequisites: readonly string[];
  canDo: { target: string; fa: string };
  decisionChain: readonly string[];
  examples: readonly [string, string];
  primaryErrorTag: string;
  authoredItemIds: readonly string[];
  evaluationItemIds: readonly string[];
  criteriaVersion: string;
}

interface TargetAssessment {
  attemptId: string;
  // A revision needs a new assessment; never reuse a verdict for different output.
  assessedResponseHash: string;
  contentVersion: string;
  criteriaVersion: string;
  source: "authored_key" | "qualified_provider" | "human" | "self";
  verdict: "pass" | "needs_repair" | "not_observed" | "not_assessed";
  // Null means missing evidence; zero means an actual assessed count of zero.
  correctOpportunities: number | null;
  assessedOpportunities: number | null;
  unassessedOpportunities: number | null;
  primaryIssue: {
    originalSpan: string;
    correction: string;
    trigger: string;
    rootCause: string;
    category: string;
    whyTargetLanguage: string;
    whyPersian: string;
    contrastExample: string;
    nextRepairItemId: string;
  } | null;
  reviewerId: string | null;
  originalAudioReviewed: boolean;
}
```

Store response identity/hash, prompt/item/context IDs, first attempt versus
retry, raw ASR, edited transcript, confirmation, assistance exposure, original
audio reference/hash, ink, response timing provenance, interrupted state and
review due/attempt times. Retrying or editing must invalidate only assessments
that no longer match the response, not overwrite the original response.

Controlled tasks use explicit authored accepted answers, including grammatical
variants. Free production needs a target-specific rubric and a qualified
assessment path. A generic grammar checker finding no issues is not proof that
the requested target was used correctly. Do not promote a provider's success
response or a self-rating into qualified learner evidence.

Raw ASR is fallible. Confirmed text can support text feedback; it cannot establish
what was originally said. Verified oral correctness requires checking the original
recording through an appropriate qualified process. Preserve the current
provider-unavailable/manual-review route and never fabricate pronunciation scores.

### 7. Dashboard, outside active production

Use the existing progress area with filters for language, level, micro-skill,
review due state and date. Show three explained recommendations, based on actual
due/failed reviews and unresolved target errors. Missing assessment is not low
accuracy. If a numeric priority formula is used, version it as a product heuristic
and define the observation window and tie-breaker. Do not imply scientific
validation of arbitrary weights.

Prefer an accessible table before a heatmap. Use indigo intensity with text and
exact counts; no green and no color-only meaning. Micro-skill coverage is not a
CEFR-level proficiency percentage. A recording count is not an accuracy score.

### 8. Content coverage and initial authored lessons

Keep every existing catalog topic accessible. Supply a coverage manifest linking
each topic to its micro-skill definitions and whether its seven-step content is
authored, checked or still pending. Do not use a generic imperative lesson for an
unrelated topic or label the entire curriculum finished from ten demonstrations.

The supplied ten German A1 entries are the first authoring batch. Refine their
scope as follows; split broader entries into child lessons where required:

| Source ID | First observable decision                            | Keep fixed / split next                                  |
| --------- | ---------------------------------------------------- | -------------------------------------------------------- |
| A1-V1     | Subject → regular present-tense ending               | Known regular verbs; separate stem changes               |
| A1-V2     | Subject → present form of sein                       | Fixed complements; separate tense changes                |
| A1-V3     | Subject → present form of haben                      | Fixed objects; no case assessment                        |
| A1-V4     | Initial time phrase → finite verb in second position | One finite verb; no subordinate clause                   |
| A1-V5     | One familiar listener → du imperative                | Known stems without vowel change; separate lies/nimm/sei |
| A1-V6     | Several familiar listeners → ihr imperative          | Same known stems; du not scored simultaneously           |
| A1-V7     | Formal address → verb + Sie                          | Known stems; separate seien Sie                          |
| A1-V8     | Separable verb → final particle in a main clause     | Given subject/finite form; no new ending decision        |
| A1-P1     | Named feminine singular referent → sie               | Split the remaining referent classes into children       |
| A1-A1     | Known noun → its nominative definite article         | Lexical gender retrieval; no case/ending decisions       |

For English, author parallel A1 functions using its own grammar. A suitable first
batch covers present be, subject pronouns, regular third-person present -s,
have/has, do/does in questions, don't/doesn't, positive imperatives, negative
imperatives, a/an by initial sound, and this/these by number. These are separate
English lessons, not translations of German case or imperative-person lessons.

Every ready lesson needs 8–12 controlled items, 4–6 single-cause repair items,
8–10 oral cues, one bounded speaking scenario, one personal writing task, one
short listening script with five substages, immediate-check items and reserved
alternate delayed-check items. Every answer key contains:
`correct answer | root cause | trigger | category | contrast example`.

The companion A1 example is an authored implementation fixture, not the complete
curriculum. Do not claim all ten lessons or all topics are complete until their
full content and alternate forms exist and have been checked.

### 9. Printable worksheets

Preserve the existing three learner pages per micro-skill: Learn, Practice,
Assess, with separate answer keys. The seven digital steps may reference that
set; they must not force all seven workspaces onto a single sheet. A4 portrait,
at least 9 mm writing-line height, ample WHY space, ink included in answer exports,
and no clipped text. Long learner answers may take extra export pages.

### 10. Build, verify and hand off

Use Bun and the repository instructions. Add code comments where the distinction
between practice, assistance, assessment and mastery could otherwise be lost.
Sync canonical sources into both apps. Do not edit archived apps or thesis work.

Required acceptance checks:

- Every ready lesson has exactly one target and its complete seven-step content.
- Switching topics/steps/languages, resizing and reloading preserves typed and
  ink drafts without mixing lesson IDs.
- Invalid or unavailable assessments cannot award accuracy or mastery.
- Rule/model visibility is tracked and hidden during independent checks.
- Original audio/ASR survive text editing and retry; backup/restore preserves
  bytes and hashes.
- Timing uses a documented source, excludes interruptions and is unchanged by
  playback speed; unavailable timing remains null.
- Required reflection is distinguishable from successful performance; save/exit
  works before a pass and without an evaluator.
- Future reviews cannot pass early; a delayed attempt uses a fresh context and
  old answers stay hidden until submission.
- New-context guided use, independent transfer, immediate retry and retention
  remain distinct in data and visible wording.
- Phone/tablet/desktop interaction checks include 390, 768 and 1117 px, keyboard
  focus, touch scrolling, portrait/landscape, pen undo/erase, and readable RTL/LTR.
- Real hardware testing is reported separately from browser emulation.
- German `bun run verify` and English `bun run check` pass. Rebuild the Windows
  payloads after app changes and verify install, update, repair and data retention.
- Report exact coverage, remaining content/reviewer gaps, test evidence, release
  versions and commit. Commit only authorized changes; do not push or publish.

### Research interpretation

The cited ICALL chapter supports individualized practice and discusses how to
operationalize learning constructs and their limitations. It does not establish
the draft's numeric cutoffs or guarantee automaticity after this interface.
The Council of Europe defines CEFR levels using can-do descriptors. The policies
and measurements above are design interpretations that need learner validation.

- Ruiz, Rebuschat and Meurers, _Individualization of practice through Intelligent CALL_:
  https://sifnos.iwm-tuebingen.de/dm/papers/Ruiz.Rebuschat.Meurers-23.pdf
- Council of Europe, _The CEFR Levels_:
  https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions
- Browser microphone requirements:
  https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
