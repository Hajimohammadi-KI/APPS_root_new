# A1 example: a seven-step German micro-lesson

Status: authored design fixture, 8 September 2026. Use with
[the implementation prompt](SEVEN-STEP-IMPLEMENTATION-PROMPT.md). This is content
for implementing and reviewing the screens, not a report of learner performance.
No audio recording, assessment result or learner history is supplied here.

## Lesson identity and scope

| Field               | Value                                                        |
| ------------------- | ------------------------------------------------------------ |
| Lesson              | `de-A1-V5-du-imperative-known-stems-v1`                      |
| Learner title       | Eine Person, eine Bitte                                      |
| Subtitle            | Imperativ mit du · Bekannte Verben                           |
| Can-do              | Ich kann einer vertrauten Person drei einfache Bitten sagen. |
| Target              | One familiar listener → singular imperative of a known verb  |
| Target error        | Choosing an ihr form when addressing one familiar person     |
| Fixed prerequisites | Meaning of the verbs and supplied noun phrases               |
| Language            | German; optional Persian guidance in separate RTL blocks     |
| Excluded targets    | New cases, separable verbs, vowel changes, formal address    |

Use these known verbs: machen, lernen, spielen, hören, suchen, kaufen, fragen,
üben, zeigen, sagen. For this lesson, both the short imperative and its grammatical
variant ending in -e are accepted: Mach/Mache, Lern/Lerne, Spiel/Spiele, Hör/Höre,
Such/Suche, Kauf/Kaufe, Frag/Frage, Üb/Übe, Zeig/Zeige, Sag/Sage.

This limited verb set avoids teaching a false universal “delete -st” rule.
Singular imperative forms can use the stem with or without -e; other verb families
need separate treatment. [IDS grammis: Imperativ](https://grammis.ids-mannheim.de/terminologie/104)

## Shared screen shell

Use the cream, indigo and beige contract in the implementation prompt. Show
one activity at a time, a compact `Schritt n von 7`, and `Speichern und beenden`.
The overview lists the seven titles below. It does not expose models during tests.

Each answer and WHY field has `Tippen / Mit Stift schreiben`. The underscores in
this document represent expandable input areas, not their final physical width.
Provide at least 9 mm line height in print, and room for a full sentence plus
a separate explanation. Tables below are authoring inventories; on a phone,
render each row as one task card. Never shrink these entire tables onto a phone.

Optional Persian instructions must be hideable. German examples and responses
remain left to right. The five-column answer keys belong in a separate teacher
view/export and appear to learners only after submission.

## 1. Ein Muster lernen

Subtitle: Eine vertraute Person ansprechen.

Sand rule card:

`eine vertraute Person → du → bekannter Stamm mach → Mach eine Pause!`

Two correct models:

- Mach eine Pause!
- Lern Deutsch!

Contrast with explicit context: `eine Freundin → Mach eine Pause!`;
`zwei Freunde → Macht eine Pause!`. Both sentences are grammatical in their
own contexts. Only the singular response is practised in this lesson.

Instruction: **Sprich mit einer vertrauten Person. Formuliere eine Bitte.
Übernimm die Wörter nach dem Verb. Begründe dann deine Verbform.**

Persian: **با یک نفر که او را «تو» خطاب می‌کنی صحبت کن. درخواست را بنویس.
واژه‌های بعد از فعل را تغییر نده. سپس دلیل انتخاب شکل فعل را بنویس.**

| ID  | Aufgabe                                                                                  | Antwort                        | Warum?               |
| --- | ---------------------------------------------------------------------------------------- | ------------------------------ | -------------------- |
| L01 | machen · eine Pause                                                                      | ______________________________ | ____________________ |
| L02 | lernen · Deutsch                                                                         | ______________________________ | ____________________ |
| L03 | spielen · Tennis                                                                         | ______________________________ | ____________________ |
| L04 | hören · Musik                                                                            | ______________________________ | ____________________ |
| L05 | suchen · den Schlüssel                                                                   | ______________________________ | ____________________ |
| L06 | kaufen · Brot                                                                            | ______________________________ | ____________________ |
| L07 | fragen · Anna                                                                            | ______________________________ | ____________________ |
| L08 | üben · jeden Tag                                                                         | ______________________________ | ____________________ |
| L09 | Verändere die Aussage in eine Bitte: Du zeigst das Foto.                                 | ______________________________ | ____________________ |
| L10 | Lies: „Sag bitte deinen Namen!“ Wähle „Verbergen“. Schreibe den Satz aus dem Gedächtnis. | ______________________________ | ____________________ |

L09 is the transformation. L10 is reconstruction. For L10, hide the full model,
including from the accessibility tree, before enabling the answer field. Allow
`Noch einmal ansehen`, but record that exposure. This remains memory practice,
not evidence of independent new-context use.

Primary action: `Antwort prüfen`, then `Nächste Aufgabe`. End action:
`Weiter: Einen Fehler korrigieren`. All ten items can be practised with support.
Show the exact score with an assistance label. An 8/10 practice result must not
be relabelled as an independent check. A later check needs unused items.

## 2. Einen Fehler korrigieren

Subtitle: Eine falsche Personenwahl erkennen.

Label above every card: **Korrekturübung: Die Verbform passt nicht zur Situation.**

Instruction: **Du sprichst jeweils mit genau einer vertrauten Person.
Korrigiere nur die Verbform. Schreibe dann den vollständigen Satz und den Grund.**

Persian: **در هر مورد فقط با یک نفر صمیمی صحبت می‌کنی. فقط شکل فعل را اصلاح کن؛
سپس جملهٔ کامل و دلیل را بنویس.**

These are authored correction examples, not recorded learner mistakes. The
plural forms below are valid when addressing several people; the stated singular
context makes them unsuitable here. Do not diagnose them as globally ungrammatical.

| ID  | Situation             | Zu korrigierender Beispielsatz | Korrektur                  | Warum?               |
| --- | --------------------- | ------------------------------ | -------------------------- | -------------------- |
| R01 | Du sprichst mit Anna. | Macht eine Pause!              | __________________________ | ____________________ |
| R02 | Du sprichst mit Ali.  | Lernt Deutsch!                 | __________________________ | ____________________ |
| R03 | Du sprichst mit Lara. | Hört Musik!                    | __________________________ | ____________________ |
| R04 | Du sprichst mit Tom.  | Sucht den Schlüssel!           | __________________________ | ____________________ |
| R05 | Du sprichst mit Mia.  | Kauft Brot!                    | __________________________ | ____________________ |
| R06 | Du sprichst mit Ben.  | Übt jeden Tag!                 | __________________________ | ____________________ |

After an R01 response, show only the relevant local feedback:

- Correct model: **Mach eine Pause!**
- Decision chain: **eine vertraute Person → du → mach → Mach!**
- Persian chain: **یک مخاطب صمیمی ← du ← شکل مفرد: Mach!**

Keep unrelated suggestions collapsed. `Korrektur laut sagen` is optional.
`Weiter: Schnell abrufen` does not require an online assessment provider.
The proposed practice target is 5/6; preserve the first result when retrying.

## 3. Schnell abrufen

Subtitle: Eine kurze Bitte laut sagen.

Preparation: **Du sprichst mit einer vertrauten Person. Sage zu jedem Hinweis
eine Bitte. Beginne möglichst innerhalb von vier Sekunden. Begründe erst danach.**

Persian: **برای هر نشانه یک درخواست خطاب به یک نفر بگو. هدف تمرینی این است که
در چهار ثانیه شروع کنی. دلیل را بعد از پایان زمان بنویس.**

Controls: response goal `3 / 4 / 5 / 6 Sekunden`; `Ohne Zeitdruck` is available.
The four-second default is a configurable exercise target, not a scientific
definition of fluent German. Without reliable speech-onset measurement, show
`Antwortbeginn nicht gemessen` and retain the recording for review.

| ID  | Hinweis                    | Gesprochene Antwort / Aufnahme | Warum? Nach dem Sprechen |
| --- | -------------------------- | ------------------------------ | ------------------------ |
| O01 | machen · Tee               | ______________________________ | ____________________     |
| O02 | lernen · fünf Wörter       | ______________________________ | ____________________     |
| O03 | spielen · leise            | ______________________________ | ____________________     |
| O04 | hören · den Dialog         | ______________________________ | ____________________     |
| O05 | suchen · die Tasche        | ______________________________ | ____________________     |
| O06 | kaufen · Milch             | ______________________________ | ____________________     |
| O07 | fragen · Tom               | ______________________________ | ____________________     |
| O08 | üben · zehn Minuten        | ______________________________ | ____________________     |
| O09 | zeigen · das Bild          | ______________________________ | ____________________     |
| O10 | sagen · bitte deinen Namen | ______________________________ | ____________________     |

During capture: one cue, time and recorder state. Show WHY and feedback after
capture, without timing the explanation. Keep unknown scores blank and labelled
`Noch nicht beurteilt`. Self-rating does not verify the recording's grammar.
Nine correct responses out of ten is a proposed accuracy goal; it is separate
from timing and cannot be established from an edited ASR transcript alone.

## 4. Im Alltag anwenden

Subtitle: Einer Person beim Lernen helfen.

Prepare task: **Eine Freundin möchte mit dir Deutsch üben. Du planst eine kurze
Übung. Gib ihr drei passende Tipps als Bitten. Wähle die Details selbst.**

Persian: **دوستی می‌خواهد با تو آلمانی تمرین کند. برای یک تمرین کوتاه، سه درخواست
مناسب از او داشته باش. جزئیات را خودت انتخاب کن.**

Only two optional hints: `lernen · Wörter` and `hören · Dialog`.
Record whether they were exposed. Then enter the existing Speak screen.
Give the following cues one at a time; do not repeat the full scenario.

| ID  | Gesprächsimpuls                        | Deine Antwort / Aufnahme       | Warum? Danach        |
| --- | -------------------------------------- | ------------------------------ | -------------------- |
| S01 | Was soll deine Freundin zuerst lernen? | ______________________________ | ____________________ |
| S02 | Was soll sie danach hören?             | ______________________________ | ____________________ |
| S03 | Was soll sie am Ende machen?           | ______________________________ | ____________________ |

Speak: recorder, time and real input waveform; `Pause`, `Fertig`, optional
`Aufgabe anzeigen`. A short recording is acceptable if it contains the three
meaningful responses. Do not pad it to reach thirty seconds.

Feedback: original audio, raw/confirmed transcript distinction, one target
correction, and the learner's WHY fields. This is guided use in a personal
scenario. It is not an independent transfer test.

## 5. Selbst schreiben

Subtitle: Eine Nachricht aus deinem Alltag.

Task: **Du planst einen entspannten Nachmittag mit einer vertrauten Person.
Schreibe ihr drei bis fünf kurze Sätze. Formuliere mindestens drei Bitten.
Wähle Aktivitäten, die zu deinem Leben passen.**

Persian: **برای یک بعدازظهر آرام با فردی صمیمی برنامه‌ریزی کن. در سه تا پنج جمله
حداقل سه درخواست از او داشته باش. فعالیت‌ها را از زندگی خودت انتخاب کن.**

| ID            | Schreibraum                                                  | Warum passt deine Verbform? |
| ------------- | ------------------------------------------------------------ | --------------------------- |
| W01           | ____________________________________________________________ | __________________________  |
| W02           | ____________________________________________________________ | __________________________  |
| W03           | ____________________________________________________________ | __________________________  |
| W04, optional | ____________________________________________________________ | __________________________  |
| W05, optional | ____________________________________________________________ | __________________________  |

Checklist: `Ich spreche mit einer vertrauten Person.`;
`Meine drei Bitten haben eine passende Verbform.`;
`Meine Nachricht ist verständlich.`

Keep the model in the answer key hidden until submission. Save typed and ink
responses separately. If ink cannot be reviewed, retain it as `Noch nicht
beurteilt`. A transcription typed later is a separate artifact. Preserve the
first text and any revision. With three assessed target uses, 2/3 is approximately
67%; an 80% training threshold requires 3/3. Do not count unassessed uses as correct.

## 6. Hören, mitsprechen, neu erzählen

Subtitle: Einen Lernplan hören und verändern.

Authoring script, visible to learners only at the appropriate substage:

> Lern heute fünf neue Wörter. Hör danach den kurzen Dialog. Üb die Wörter
> zehn Minuten. Mach dann eine kleine Pause. Sag am Ende einen Satz.

The script is 25 words; its real duration depends on the recording. Produce a
clear, natural recording and check its duration before release. Do not display
a fabricated duration or pronunciation score. Browser speech synthesis may be
offered with an explicit label. Retain playback speeds from 0.5× to 2×.

| ID  | Substage and learner instruction                                                                                                  | Antwort / Aufnahme         | Warum? Danach        |
| --- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------- |
| H01 | **Hören:** Hör ohne Text. Worum geht es? A: Ein kurzer Lernplan. B: Ein Einkaufsplan.                                             | __________________________ | ____________________ |
| H02 | **Hören und lesen:** Hör noch einmal. Markiere die fünf Bitten im Text.                                                           | __________________________ | ____________________ |
| H03 | **Nachsprechen:** Hör jeweils einen Satz. Sprich ihn in der Pause nach.                                                           | __________________________ | ____________________ |
| H04 | **Mitsprechen:** Sprich möglichst gleichzeitig mit. Wähle ein passendes Tempo.                                                    | __________________________ | ____________________ |
| H05 | **Verändern:** Verbirg den Text. Gib einer Freundin einen neuen Lernplan: morgen; drei Wörter; fünf Minuten; Musik; ein Beispiel. | __________________________ | ____________________ |

Persian guidance: **ابتدا فقط گوش بده؛ سپس با متن گوش بده؛ بعد از هر جمله تکرار کن؛
با صدا همراه شو؛ در پایان متن را پنهان کن و با جزئیات تازه برنامه را بگو.**

H03 and H04 are imitation practice. A recording may contain the model audio;
flag contamination instead of treating that sound as learner speech. H05 is
supported recombination, since it follows the model. It is not broad transfer.
WHY is untimed. For H01, accept a gist explanation rather than forcing a grammar
cause onto a listening-comprehension response.

## 7. Prüfen und sichern

Subtitle: Kurz abrufen und den nächsten Versuch planen.

First hide rules, all models and prior answers. This is an **immediate exit
check**, not delayed retention. Do not introduce a fresh model on this screen.

Instruction: **Du sprichst mit einer vertrauten Person. Formuliere zu jedem
Hinweis eine Bitte. Schreibe den Grund erst nach deiner Antwort.**

| ID  | Hinweis           | Antwort                        | Warum? Danach        |
| --- | ----------------- | ------------------------------ | -------------------- |
| E01 | machen · Kaffee   | ______________________________ | ____________________ |
| E02 | suchen · das Buch | ______________________________ | ____________________ |
| E03 | zeigen · den Plan | ______________________________ | ____________________ |

Report `x/3`, with timing and assistance separate. Do not label this a 90%
ten-item test. A correct immediate result does not award delayed mastery.

After submission show an initially empty personal error log:

| Mein tatsächlicher Satz | Meine Korrektur    | Warum?             | Auslöser   | Kategorie  | Mein Kontrast      |
| ----------------------- | ------------------ | ------------------ | ---------- | ---------- | ------------------ |
| __________________      | __________________ | __________________ | __________ | __________ | __________________ |

Personal decision cue: **Mein Merksatz: ______________________________**

Review strip: `☐ Tag 1   ☐ Tag 3   ☐ Tag 7   ☐ Tag 14`.
In the app these are linked review states, not boxes that award success by
clicking. Schedule the dates using the learner's local date and stored time zone.
Review completion needs a real attempt at or after the due time. A paper tick
is a learner's record of practice and does not prove assessed performance.

End action: `Zusammenfassung ansehen und speichern`. Offer the next action
`Fehler üben`, `Auf Beurteilung warten`, or `Geplante Wiederholung öffnen` as
appropriate to the actual evidence. No reference numbers are prefilled as scores.

## Reserved delayed checks

Do not reveal these prompts, answer keys or old answers before the scheduled
attempt. These short checks report exact counts out of three. They do not supply
the separate ten-item bank needed by a policy demanding a 9/10 threshold.

Each day uses a distinct communicative setting. Explicit verb cues still make
these controlled retrieval tasks. The additional personal prompt creates an
opportunity to observe less-cued use; the immediately preceding retrieval check
is still exposure and must be recorded. This fixture alone therefore cannot
certify unassisted transfer across the entire curriculum.

| ID    | Kontext und Hinweis                                                    | Antwort                    | Warum? Danach        |
| ----- | ---------------------------------------------------------------------- | -------------------------- | -------------------- |
| D1-1  | Du planst das Frühstück mit einem Freund: kaufen · Eier.               | __________________________ | ____________________ |
| D1-2  | Du planst das Frühstück mit einem Freund: machen · das Frühstück.      | __________________________ | ____________________ |
| D1-3  | Du planst das Frühstück mit einem Freund: suchen · die Tassen.         | __________________________ | ____________________ |
| D3-1  | Du planst einen Spieleabend mit einer Freundin: zeigen · die Karten.   | __________________________ | ____________________ |
| D3-2  | Du planst einen Spieleabend mit einer Freundin: fragen · Paul.         | __________________________ | ____________________ |
| D3-3  | Du planst einen Spieleabend mit einer Freundin: spielen · mit mir.     | __________________________ | ____________________ |
| D7-1  | Du hilfst einem Freund vor dem Deutschkurs: lernen · drei Sätze.       | __________________________ | ____________________ |
| D7-2  | Du hilfst einem Freund vor dem Deutschkurs: üben · die Frage.          | __________________________ | ____________________ |
| D7-3  | Du hilfst einem Freund vor dem Deutschkurs: sagen · den Satz.          | __________________________ | ____________________ |
| D14-1 | Du planst einen ruhigen Abend mit einer Freundin: hören · das Lied.    | __________________________ | ____________________ |
| D14-2 | Du planst einen ruhigen Abend mit einer Freundin: machen · eine Suppe. | __________________________ | ____________________ |
| D14-3 | Du planst einen ruhigen Abend mit einer Freundin: zeigen · die Fotos.  | __________________________ | ____________________ |

Less-cued personal prompts, displayed separately with answer and WHY space:

| ID  | Aufgabe                                                                                                      | Eigene Antwort                           | Warum? Danach        |
| --- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | -------------------- |
| T1  | Morgen kommt ein Freund zum Frühstück. Bitte ihn in einer Nachricht um Hilfe bei zwei Vorbereitungen.        | ________________________________________ | ____________________ |
| T3  | Du planst einen Spieleabend mit einer Freundin. Bitte sie in einer Sprachnachricht um Hilfe bei zwei Dingen. | ________________________________________ | ____________________ |
| T7  | Ein Freund beginnt einen Deutschkurs. Gib ihm in einer Nachricht zwei praktische Tipps.                      | ________________________________________ | ____________________ |
| T14 | Du planst einen ruhigen Abend mit einer Freundin. Bitte sie in einer Sprachnachricht um zwei passende Dinge. | ________________________________________ | ____________________ |

Grammar forms other than the target can communicate a valid request. If the
target is not used, report `Zielstruktur nicht beobachtet`; do not call a
grammatically correct alternative a grammar error. Actual recorded speech needs
qualified review independently of any confirmed transcript.

## Separate answer key

These are authored answers and rubric examples. They are not learner results.
In the tables, **C1** means `Personenwahl: Imperativ Singular statt Plural`.
The “root cause” describes the error to watch for, not an accusation that every
learner made that error. Accept the -e variants listed above, suitable punctuation
and grammatical variants of personal answers. Report spelling separately from
the target morphology rather than silently altering the target score.

### Controlled practice and repair

| ID: correct answer           | Root cause                              | Trigger word / context               | Error category                  | Correct contrast example             |
| ---------------------------- | --------------------------------------- | ------------------------------------ | ------------------------------- | ------------------------------------ |
| L01: Mach eine Pause!        | Plural form selected for one person     | eine vertraute Person; machen        | C1                              | zwei Freunde: Macht eine Pause!      |
| L02: Lern Deutsch!           | Plural form selected for one person     | eine vertraute Person; lernen        | C1                              | zwei Freunde: Lernt Deutsch!         |
| L03: Spiel Tennis!           | Plural form selected for one person     | eine vertraute Person; spielen       | C1                              | zwei Freunde: Spielt Tennis!         |
| L04: Hör Musik!              | Plural form selected for one person     | eine vertraute Person; hören         | C1                              | zwei Freunde: Hört Musik!            |
| L05: Such den Schlüssel!     | Plural form selected for one person     | eine vertraute Person; suchen        | C1                              | zwei Freunde: Sucht den Schlüssel!   |
| L06: Kauf Brot!              | Plural form selected for one person     | eine vertraute Person; kaufen        | C1                              | zwei Freunde: Kauft Brot!            |
| L07: Frag Anna!              | Plural form selected for one person     | eine vertraute Person; fragen        | C1                              | zwei Freunde: Fragt Anna!            |
| L08: Üb jeden Tag!           | Plural form selected for one person     | eine vertraute Person; üben          | C1                              | zwei Freunde: Übt jeden Tag!         |
| L09: Zeig das Foto!          | Statement retained instead of a request | Du zeigst → Bitte an dieselbe Person | speech act; C1 if plural chosen | Aussage: Du zeigst das Foto.         |
| L10: Sag bitte deinen Namen! | Wrong imperative recalled               | eine vertraute Person; hidden model  | C1                              | zwei Freunde: Sagt bitte eure Namen! |
| R01: Mach eine Pause!        | Plural imperative used for Anna alone   | Anna; exactly one listener           | C1                              | zwei Freunde: Macht eine Pause!      |
| R02: Lern Deutsch!           | Plural imperative used for Ali alone    | Ali; exactly one listener            | C1                              | zwei Freunde: Lernt Deutsch!         |
| R03: Hör Musik!              | Plural imperative used for Lara alone   | Lara; exactly one listener           | C1                              | zwei Freunde: Hört Musik!            |
| R04: Such den Schlüssel!     | Plural imperative used for Tom alone    | Tom; exactly one listener            | C1                              | zwei Freunde: Sucht den Schlüssel!   |
| R05: Kauf Brot!              | Plural imperative used for Mia alone    | Mia; exactly one listener            | C1                              | zwei Freunde: Kauft Brot!            |
| R06: Üb jeden Tag!           | Plural imperative used for Ben alone    | Ben; exactly one listener            | C1                              | zwei Freunde: Übt jeden Tag!         |

### Oral retrieval and personal production

| ID: correct answer or example                 | Root cause                          | Trigger word / context                 | Error category    | Correct contrast example                  |
| --------------------------------------------- | ----------------------------------- | -------------------------------------- | ----------------- | ----------------------------------------- |
| O01: Mach Tee!                                | Plural form selected for one person | one familiar listener; machen          | C1                | mehrere Freunde: Macht Tee!               |
| O02: Lern fünf Wörter!                        | Plural form selected for one person | one familiar listener; lernen          | C1                | mehrere Freunde: Lernt fünf Wörter!       |
| O03: Spiel leise!                             | Plural form selected for one person | one familiar listener; spielen         | C1                | mehrere Freunde: Spielt leise!            |
| O04: Hör den Dialog!                          | Plural form selected for one person | one familiar listener; hören           | C1                | mehrere Freunde: Hört den Dialog!         |
| O05: Such die Tasche!                         | Plural form selected for one person | one familiar listener; suchen          | C1                | mehrere Freunde: Sucht die Tasche!        |
| O06: Kauf Milch!                              | Plural form selected for one person | one familiar listener; kaufen          | C1                | mehrere Freunde: Kauft Milch!             |
| O07: Frag Tom!                                | Plural form selected for one person | one familiar listener; fragen          | C1                | mehrere Freunde: Fragt Tom!               |
| O08: Üb zehn Minuten!                         | Plural form selected for one person | one familiar listener; üben            | C1                | mehrere Freunde: Übt zehn Minuten!        |
| O09: Zeig das Bild!                           | Plural form selected for one person | one familiar listener; zeigen          | C1                | mehrere Freunde: Zeigt das Bild!          |
| O10: Sag bitte deinen Namen!                  | Plural form selected for one person | one familiar listener; sagen           | C1                | mehrere Freunde: Sagt bitte eure Namen!   |
| S01 example: Lern fünf Wörter!                | Plural form selected for one friend | eine Freundin; zuerst lernen           | C1                | zwei Freundinnen: Lernt fünf Wörter!      |
| S02 example: Hör den Dialog!                  | Plural form selected for one friend | eine Freundin; danach hören            | C1                | zwei Freundinnen: Hört den Dialog!        |
| S03 example: Mach eine Pause!                 | Plural form selected for one friend | eine Freundin; am Ende                 | C1                | zwei Freundinnen: Macht eine Pause!       |
| W01 example: Mach bitte Tee!                  | Plural form selected for one person | private message to one familiar person | C1                | mehrere Freunde: Macht bitte Tee!         |
| W02 example: Hör Musik!                       | Plural form selected for one person | same recipient                         | C1                | mehrere Freunde: Hört Musik!              |
| W03 example: Zeig die Fotos!                  | Plural form selected for one person | same recipient                         | C1                | mehrere Freunde: Zeigt die Fotos!         |
| W04 optional example: Spiel mit mir!          | Plural form selected for one person | same recipient                         | C1 if target used | mehrere Freunde: Spielt mit mir!          |
| W05 optional example: Mach später eine Pause! | Plural form selected for one person | same recipient                         | C1 if target used | mehrere Freunde: Macht später eine Pause! |

For S/W items, accept other meaningful singular requests. A response can be
understandable and grammatically correct while missing the requested target;
record that distinction. Do not require exact matching against these models.

### Listening, imitation, retelling and immediate check

| ID: correct answer or reference                                                                                                                 | Root cause                                               | Trigger word / context                      | Error category                          | Correct contrast example                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| H01: A. Ein kurzer Lernplan.                                                                                                                    | Main idea confused with shopping                         | Wörter, Dialog, üben                        | listening gist; outside grammar score   | Ein Einkaufsplan nennt hier keine Lernaufgaben. |
| H02: Lern; Hör; Üb; Mach; Sag                                                                                                                   | Requests not identified in context                       | five script clauses addressed to one person | target recognition                      | one person: Lern!; several: Lernt!              |
| H03: Repeat the five script sentences in order                                                                                                  | Compare actual audio with the model; no assumed cause    | each sentence after playback stops          | assisted imitation; C1 only if observed | script: Üb die Wörter zehn Minuten.             |
| H04: Follow the same five sentences at a chosen speed                                                                                           | Compare actual audio; no score from playback alone       | simultaneous model audio                    | supported shadowing                     | model imperative: Mach dann eine kleine Pause.  |
| H05 example: Lern morgen drei neue Wörter. Hör danach Musik. Üb die Wörter fünf Minuten. Mach dann eine kleine Pause. Sag am Ende ein Beispiel. | Target person confused during recombination, if observed | changed details; one friend                 | assisted recombination; C1 if observed  | several friends: Lernt morgen drei neue Wörter. |
| E01: Mach Kaffee!                                                                                                                               | Plural form selected for one person                      | one familiar listener; machen               | C1                                      | mehrere Freunde: Macht Kaffee!                  |
| E02: Such das Buch!                                                                                                                             | Plural form selected for one person                      | one familiar listener; suchen               | C1                                      | mehrere Freunde: Sucht das Buch!                |
| E03: Zeig den Plan!                                                                                                                             | Plural form selected for one person                      | one familiar listener; zeigen               | C1                                      | mehrere Freunde: Zeigt den Plan!                |

### Delayed checks and less-cued personal tasks

| ID: correct answer or example                           | Root cause                          | Trigger word / context         | Error category                              | Correct contrast example                      |
| ------------------------------------------------------- | ----------------------------------- | ------------------------------ | ------------------------------------------- | --------------------------------------------- |
| D1-1: Kauf Eier!                                        | Plural form selected for one person | one friend; breakfast          | C1                                          | mehrere Freunde: Kauft Eier!                  |
| D1-2: Mach das Frühstück!                               | Plural form selected for one person | one friend; breakfast          | C1                                          | mehrere Freunde: Macht das Frühstück!         |
| D1-3: Such die Tassen!                                  | Plural form selected for one person | one friend; breakfast          | C1                                          | mehrere Freunde: Sucht die Tassen!            |
| D3-1: Zeig die Karten!                                  | Plural form selected for one person | one friend; games evening      | C1                                          | mehrere Freunde: Zeigt die Karten!            |
| D3-2: Frag Paul!                                        | Plural form selected for one person | one friend; games evening      | C1                                          | mehrere Freunde: Fragt Paul!                  |
| D3-3: Spiel mit mir!                                    | Plural form selected for one person | one friend; games evening      | C1                                          | mehrere Freunde: Spielt mit mir!              |
| D7-1: Lern drei Sätze!                                  | Plural form selected for one person | one friend; course preparation | C1                                          | mehrere Freunde: Lernt drei Sätze!            |
| D7-2: Üb die Frage!                                     | Plural form selected for one person | one friend; course preparation | C1                                          | mehrere Freunde: Übt die Frage!               |
| D7-3: Sag den Satz!                                     | Plural form selected for one person | one friend; course preparation | C1                                          | mehrere Freunde: Sagt den Satz!               |
| D14-1: Hör das Lied!                                    | Plural form selected for one person | one friend; quiet evening      | C1                                          | mehrere Freunde: Hört das Lied!               |
| D14-2: Mach eine Suppe!                                 | Plural form selected for one person | one friend; quiet evening      | C1                                          | mehrere Freunde: Macht eine Suppe!            |
| D14-3: Zeig die Fotos!                                  | Plural form selected for one person | one friend; quiet evening      | C1                                          | mehrere Freunde: Zeigt die Fotos!             |
| T1 example: Kauf bitte Brot. Mach bitte Kaffee.         | Person mismatch only if observed    | a message to one friend        | C1; otherwise target not observed if absent | mehrere Freunde: Kauft bitte Brot.            |
| T3 example: Such bitte die Karten. Frag bitte Anna.     | Person mismatch only if observed    | a voice message to one friend  | C1; otherwise target not observed if absent | mehrere Freunde: Sucht bitte die Karten.      |
| T7 example: Lern jeden Tag fünf Wörter. Üb jeden Abend. | Person mismatch only if observed    | advice to one friend           | C1; otherwise target not observed if absent | mehrere Freunde: Lernt jeden Tag fünf Wörter. |
| T14 example: Mach bitte Tee. Zeig bitte die Fotos.      | Person mismatch only if observed    | a voice message to one friend  | C1; otherwise target not observed if absent | mehrere Freunde: Macht bitte Tee.             |

## Release boundary

This fixture supplies the seven screens' example content and short alternate
reviews. It does not supply recorded media, a validated speech evaluator, a
complete ten-item bank for every independent check, or a separate uncontaminated
transfer assessment. Those remain explicit release/evidence tasks in the main
prompt. Do not expose a “Mastered” result from this fixture alone. The rest of
the German catalog and all English lesson content require their own authored
micro-skill definitions; this example must never be used as generic filler.
