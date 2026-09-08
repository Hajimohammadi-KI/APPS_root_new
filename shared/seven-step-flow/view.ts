import { escapeHtml as e, faSteps, stepNames, text } from "./copy";
import {
  itemsFor,
  reviewIsDue,
  type FlowSession,
  type Lesson,
  type FlowItem,
} from "./model";
import type { Attempt } from "../conversation-flow/model";
export interface ViewState {
  session: FlowSession;
  lesson: Lesson;
  lessons: Lesson[];
  overview: boolean;
  mode: "prepare" | "speak" | "feedback";
  recording: Attempt | undefined;
  capturing: boolean;
  paused: boolean;
}
export function field(
  s: FlowSession,
  id: string,
  label: string,
  rows = 2,
): string {
  return `<div class="flow-field" data-ink-field="${e(id)}"><label for="field-${e(id)}">${e(label)}</label><textarea id="field-${e(id)}" data-field="${e(id)}" aria-label="${e(label)}" rows="${rows}">${e(typeof s.fields[id] === "string" ? s.fields[id] : "")}</textarea><button type="button" data-ink-open>${text(s.language, "Mit Stift schreiben", "Write with a pen")}</button><canvas class="ws-ink-preview" width="1000" height="400" hidden></canvas></div>`;
}
export function fieldKey(s: FlowSession): string {
  return s.reviewDay !== null
    ? `review-${s.reviewDay}`
    : `${s.step}:${s.position}:${s.shadowStage}`;
}
export function currentItem(v: ViewState): FlowItem | undefined {
  return itemsFor(v.lesson, v.session.step)[v.session.position];
}
export function oralPrompt(prompt: string): string {
  return prompt
    .replace(/^Write about\b/, "Speak about")
    .replace(/^Write\b/, "Say")
    .replace(/^Schreibe über\b/, "Sprich über")
    .replace(/^Schreibe\b/, "Sage");
}
export function answerKey(v: ViewState, item?: FlowItem): string {
  const t = (de: string, en: string) => text(v.session.language, de, en);
  if (!item) {
    const w = v.lesson.worksheet;
    return (
      `<p>${t("Beispiel zur Orientierung. Deine eigene Antwort darf anders sein.", "An illustrative example. Your own answer may differ.")}</p>` +
      answerKey(v, {
        id: "personal",
        sourceId: "personal",
        kind: "controlled",
        round: 1,
        prompt: w.personal[0]!,
        answer: w.models[0]!.sentence,
        cause: w.focus,
        trigger: w.models[0]!.cue,
        category: w.category || w.reference[0]![1],
        contrast: w.models[1]!.sentence,
      })
    );
  }
  return `<div class="key" data-answer-key><h3>${t("Lösung und Ursache", "Answer and cause")}</h3><dl><dt>${t("Richtige Antwort", "Correct answer")}</dt><dd>${e(item.answer)}</dd><dt>${t("Ursache", "Root cause")}</dt><dd>${e(item.cause)}</dd><dt>${t("Auslöser", "Trigger")}</dt><dd>${e(item.trigger)}</dd><dt>${t("Kategorie", "Category")}</dt><dd>${e(item.category)}</dd><dt>${t("Kontrast", "Contrast")}</dt><dd>${e(item.contrast)}</dd></dl></div>`;
}
function rates(v: ViewState): string {
  return `<label class="rate">${text(v.session.language, "Wiedergabetempo", "Playback speed")} <select data-setting="rate">${[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => `<option value="${rate}" ${rate === v.session.rate ? "selected" : ""}>${rate}×</option>`).join("")}</select></label>`;
}
function feedback(v: ViewState): string {
  const s = v.session,
    t = (de: string, en: string) => text(s.language, de, en),
    key = fieldKey(s),
    recording = v.recording;
  const transcriptId = recording
    ? `transcript:${recording.id}`
    : `${key}:answer`;
  return `<section class="card"><h2>${t("Deine Aufnahme", "Your recording")}</h2>${recording ? `<audio controls data-recorded-audio aria-label="${t("Originalaufnahme", "Original recording")}"></audio>${rates(v)}<details><summary>${t("Ursprüngliche Spracherkennung (kann Fehler enthalten)", "Original speech recognition (may contain errors)")}</summary><p>${e(recording.rawTranscript || t("Nicht verfügbar", "Unavailable"))}</p></details>` : `<p>${t("Keine Aufnahme gespeichert. Du kannst deine Antwort tippen oder mit Stift schreiben.", "No recording saved. You can type your answer or write with a pen.")}</p>`}${field(s, transcriptId, t("Dein überprüfter Text", "Your reviewed text"), 3)}${recording ? `<button data-action="confirm">${t("Text bestätigen", "Confirm text")}</button> <button data-action="evaluate" ${recording.confirmedAt ? "" : "disabled"}>${t("Text prüfen", "Check text")}</button><p class="quiet">${t("Textfeedback prüft diese Fassung. Die ursprüngliche Aufnahme bleibt erhalten.", "Text feedback checks this version. The original recording is preserved.")}</p>` : ""}</section>${
    recording?.evaluation
      ? `<section class="card" data-provider-feedback><h2>${t("Ein Korrekturhinweis", "One correction to consider")}</h2>${
          recording.evaluation.issues.length
            ? `<p>${e(recording.evaluation.issues[0]!.message)}</p><p>${e(recording.evaluation.issues[0]!.replacements.slice(0, 1).join(""))}</p><p class="quiet">${e(recording.evaluation.issues[0]!.category)} · LanguageTool</p><details><summary>${t("Weitere Hinweise", "Later improvements")}</summary>${recording.evaluation.issues
                .slice(1)
                .map((i) => `<p>${e(i.message)}</p>`)
                .join("")}</details>`
            : `<p>${t("Keine Hinweise gefunden. Die Zielstruktur ist damit noch nicht beurteilt.", "No suggestions found. This does not establish target accuracy.")}</p>`
        }</section>`
      : ""
  }<section class="card">${field(s, `${key}:why`, t("Warum? Nenne den Auslöser.", "Why? Name the trigger."))}<p class="quiet">${t("Sprechbeginn und Aussprache: nicht beurteilt.", "Speech-onset latency and pronunciation: not assessed.")}</p><div class="actions"><button class="primary" data-action="submit">${t("Antwort und Grund speichern", "Save answer and reason")}</button><button data-action="retry">${t("Noch einmal sprechen", "Speak again")}</button></div></section>`;
}
function speaking(v: ViewState, cue: string, timed = false): string {
  const s = v.session,
    t = (de: string, en: string) => text(s.language, de, en);
  if (v.mode === "feedback")
    return (
      feedback(v) +
      (v.session.submissions.some(
        (a) => a.step === v.session.step && a.itemId === currentItem(v)?.id,
      )
        ? answerKey(v, currentItem(v))
        : "")
    );
  if (v.mode === "speak")
    return `<section class="record-space" data-production><p class="record-cue">${e(cue)}</p><button class="mic" data-action="${v.capturing ? "stop" : "record"}" aria-label="${t(v.capturing ? "Aufnahme beenden" : "Aufnahme starten", v.capturing ? "Stop recording" : "Start recording")}"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="12" y="3" width="8" height="17" rx="4"/><path d="M8 15v3a8 8 0 0 0 16 0v-3M16 26v4m-5 0h10"/></svg></button><output id="record-time" aria-label="${t("Aufnahmezeit", "Recording time")}">0:00</output><div class="wave" aria-hidden="true"><span id="input-level"></span></div>${timed ? `<p class="quiet">${s.seconds ? `${s.seconds} ${t("Sekunden als Startziel; keine gemessene Sprechlatenz.", "seconds as a start goal; speech latency is not measured.")}` : t("Ohne Zeitdruck", "Without time pressure")}</p>` : ""}<div class="actions"><button data-action="pause" ${v.capturing ? "" : "disabled"}>${t(v.paused ? "Fortsetzen" : "Pause", v.paused ? "Resume" : "Pause")}</button><button data-action="stop" ${v.capturing ? "" : "disabled"}>${t("Fertig", "Finish")}</button></div></section>`;
  return `<section class="card"><span class="eyebrow">${t("Vorbereiten", "Prepare")}</span><h2>${t("Deine Aufgabe", "Your task")}</h2><p class="prompt">${e(cue)}</p>${
    timed
      ? `<label>${t("Startziel", "Response-onset goal")} <select data-setting="seconds">${[0, 3, 4, 5, 6].map((n) => `<option value="${n}" ${n === s.seconds ? "selected" : ""}>${n ? `${n} s` : t("Ohne Zeitdruck", "Untimed")}</option>`).join("")}</select></label>`
      : `<details data-exposure="hints:${fieldKey(s)}"><summary>${t("Zwei optionale Hinweise", "Two optional hints")}</summary>${v.lesson.worksheet.models
          .slice(0, 2)
          .map((m) => `<p>${e(m.cue)}</p>`)
          .join("")}</details>`
  }<div class="actions"><button class="primary" data-action="prepare-speak">${t("Weiter zum Sprechen", "Continue to speaking")}</button><button data-action="manual">${t("Text oder Handschrift verwenden", "Use text or handwriting")}</button></div><p class="quiet">${t("Die Mikrofonfreigabe erfolgt erst beim Start der Aufnahme.", "Microphone permission is requested only when recording starts.")}</p></section>`;
}
export function renderBody(v: ViewState): string {
  const s = v.session,
    w = v.lesson.worksheet,
    t = (de: string, en: string) => text(s.language, de, en),
    key = fieldKey(s),
    item = currentItem(v);
  if (s.reviewDay !== null) {
    const review = s.reviews.find((r) => r.day === s.reviewDay);
    if (!review || !reviewIsDue(review))
      return `<section class="card"><p>${t("Diese Wiederholung ist noch nicht fällig oder bereits gespeichert.", "This review is not due yet, or its response is already saved.")}</p><button data-action="leave-review">${t("Zur Übersicht", "Back to overview")}</button></section>`;
    return `<section class="card"><span class="eyebrow">${t("Tag", "Day")} ${review.day} · ${t("Wiederholung ohne Modell", "Review without a model")}</span><h2>${t("Eine neue Antwort", "A new response")}</h2><p>${e(w.personal[0])}</p><p>${t("Wähle eine neue Situation aus deinem Alltag. Schreibe drei neue Sätze. Alte Antworten bleiben bis zur Abgabe verborgen.", "Choose a new situation from your life. Write three new sentences. Earlier answers stay hidden until submission.")}</p>${field(s, `${key}:answer`, t("Deine neuen Sätze", "Your new sentences"), 5)}${field(s, `${key}:why`, t("Warum?", "Why?"))}<button class="primary" data-action="submit-review">${t("Wiederholung speichern", "Save review response")}</button><p class="quiet">${t("Die Zielstruktur ist genannt. Das Ergebnis wartet auf Beurteilung.", "The target is named. This response will await review.")}</p></section>`;
  }
  if (s.step === 1 || s.step === 2) {
    if (!item) return "";
    const submitted = s.submissions.some(
      (a) => a.itemId === item.id && a.step === s.step,
    );
    const hidden = Boolean(s.fields[`${key}:hidden`]);
    return `${
      s.step === 1 && !hidden
        ? `<section class="sand" data-rule><span class="eyebrow">${t("Eine Entscheidung", "One decision")}</span><h2>${e(w.title)}</h2><p class="chain">${w.decision.map(e).join(" → ")}</p><div class="models">${w.models
            .slice(0, 2)
            .map((m) => `<p>${e(m.sentence)}</p>`)
            .join(
              "",
            )}</div><button data-action="hide-model">${t("Regel und Beispiele verbergen", "Hide rule and examples")}</button></section>`
        : ""
    }<section class="card ws-exercise"><span class="eyebrow">${s.position + 1} / ${itemsFor(v.lesson, s.step).length} · ${t("Übungsrunde", "Practice round")} ${item.round}</span><h2>${s.step === 2 ? t("Markierte Korrekturübung", "Labelled error-correction exercise") : item.kind === "recall" ? t("Aus dem Gedächtnis", "Reconstruct from memory") : item.kind === "transform" ? t("Eine Vorgabe verändern", "Transform one cue") : t("Ergänzen und begründen", "Complete and explain")}</h2>${s.step === 2 ? `<p class="quiet">${e(w.correctionInstruction)}</p>` : ""}<p class="prompt ws-prompt">${e(item.kind === "recall" && hidden ? t("Schreibe den abgedeckten Satz aus dem Gedächtnis.", "Write the hidden sentence from memory.") : item.prompt)}</p>${item.kind === "recall" && !hidden ? `<button class="primary" data-action="hide-model">${t("Satz abdecken und schreiben", "Hide the sentence and write")}</button>` : `${field(s, `${key}:answer`, t("Dein vollständiger Satz", "Your complete sentence"))}${field(s, `${key}:why`, t("Warum? Nenne den Auslöser.", "Why? Name the trigger."))}<button class="primary" data-action="submit">${t("Antwort vergleichen", "Compare answer")}</button>`}${submitted ? answerKey(v, item) : ""}</section>${pager(v)}`;
  }
  if (s.step === 3)
    return (
      speaking(v, item?.prompt ?? "", true) +
      (v.mode === "feedback" ? pager(v) : "")
    );
  if (s.step === 4)
    return speaking(
      v,
      `${oralPrompt(w.personal[0]!)} ${t("Formuliere drei kurze Sätze mit derselben Zielstruktur.", "Produce three short sentences using the same target.")}`,
    );
  if (s.step === 5)
    return `<section class="card"><h2>${t("Deine Nachricht", "Your message")}</h2><p class="prompt">${e(w.personal[0])}</p><p>${t("Schreibe drei bis fünf eigene Sätze. Begründe deine Zielentscheidung.", "Write three to five sentences of your own. Explain your target decision.")}</p>${field(s, `${key}:answer`, t("Dein Text", "Your text"), 6)}${field(s, `${key}:why`, t("Warum?", "Why?"), 3)}<button class="primary" data-action="submit">${t("Text und Grund speichern", "Save text and reason")}</button>${s.submissions.some((a) => a.step === 5) ? answerKey(v) : ""}</section>`;
  if (s.step === 6) {
    const names =
      s.language === "de"
        ? [
            "Hören",
            "Hören und lesen",
            "Nachsprechen",
            "Mitsprechen",
            "Neu erzählen",
          ]
        : ["Listen", "Read and listen", "Echo", "Shadow", "Retell and change"];
    const n = s.shadowStage;
    if (n >= 2 && v.mode !== "prepare")
      return (
        speaking(
          v,
          n === 4
            ? t(
                "Sage einen neuen Satz aus deinem Leben mit derselben Zielstruktur.",
                "Say a new sentence from your life using the same target.",
              )
            : t(
                "Sprich die Beispiele nach. Das ist Üben mit Modell.",
                "Repeat the examples. This is practice with a model.",
              ),
        ) +
        (v.mode === "feedback"
          ? `<button data-action="shadow-next">${t("Nächster Hörschritt", "Next listening step")}</button>`
          : "")
      );
    return `<section class="card"><span class="eyebrow">${n + 1} / 5</span><h2>${names[n]}</h2><p>${n === 0 ? t("Hör die kurzen Beispiele. Beschreibe danach, was du verstanden hast.", "Listen to the short examples. Then describe what you understood.") : n === 1 ? t("Hör und lies die Beispiele.", "Listen and read the examples.") : n === 2 ? t("Hör einen Satz. Sprich ihn nach der Pause nach.", "Listen to one sentence. Repeat it after the pause.") : n === 3 ? t("Sprich mit dem Modell mit. Die Aufnahme ist unterstützte Imitation.", "Speak along with the model. The recording is supported imitation.") : t("Verändere Details. Verwende die Zielstruktur in deinem Alltag.", "Change details. Use the target in your own life.")}</p>${n !== 4 ? `<button data-action="listen" class="primary">${t("Beispiele hören", "Listen to examples")}</button> <button data-action="stop-listening">${t("Wiedergabe stoppen", "Stop playback")}</button>${rates(v)}<p class="quiet">${t("Browser-Sprachausgabe", "Browser speech synthesis")}</p>` : ""}${n === 1 || n === 2 || n === 3 ? `<div data-transcript>${v.lesson.script.map((sentence, index) => `<p>${e(sentence)} ${n === 2 ? `<button data-action="listen-one" data-index="${index}">${t("Satz hören", "Play sentence")}</button>` : ""}</p>`).join("")}</div>` : ""}${n < 2 ? `${field(s, `${key}:answer`, n === 0 ? t("Was hast du verstanden?", "What did you understand?") : t("Welche Zielstruktur hast du bemerkt?", "Which target did you notice?"))}${field(s, `${key}:why`, t("Warum?", "Why?"))}<button data-action="submit">${t("Antwort speichern", "Save response")}</button>` : `<div class="actions"><button class="primary" data-action="prepare-speak">${t("Sprechversuch aufnehmen", "Record speaking attempt")}</button><button data-action="manual">${t("Text oder Handschrift", "Text or handwriting")}</button></div>`}</section><button data-action="shadow-next">${t("Nächster Hörschritt", "Next listening step")}</button>`;
  }
  const exitDone = s.submissions.some(
    (a) => a.step === 7 && a.itemId === "exit",
  );
  return `<section class="card"><span class="eyebrow">${t("Sofortiger Abschlusscheck", "Immediate exit check")}</span><h2>${t("Ohne Modell abrufen", "Recall without a model")}</h2><p>${e(w.personal[0])}</p><p>${t("Schreibe drei neue Sätze. Das ist noch kein Test mit zeitlichem Abstand.", "Write three new sentences. This is not yet a delayed test.")}</p>${field(s, `${key}:answer`, t("Deine Sätze", "Your sentences"), 4)}${field(s, `${key}:why`, t("Dein Grund", "Your reason"))}<button class="primary" data-action="submit">${t("Check speichern", "Save check")}</button></section>${exitDone ? `<section class="card"><h2>${t("Dein Fehlerprotokoll", "Your error log")}</h2>${field(s, "error:original", t("Mein tatsächlicher Fehler", "My actual error"))}${field(s, "error:correction", t("Meine Korrektur", "My correction"))}${field(s, "error:why", t("Ursache und Auslöser", "Cause and trigger"))}${field(s, "error:category", t("Fehlerkategorie", "Error category"))}${field(s, "error:contrast", t("Mein Kontrastbeispiel", "My contrast example"))}${field(s, "personal:rule", t("Mein Merksatz", "My decision cue"))}<button class="primary" data-action="close-session">${t("Sichern und Wiederholungen planen", "Save and schedule reviews")}</button></section><section class="card"><h2>${t("Gespeicherte Übung", "Saved practice")}</h2><p>${s.submissions.length} ${t("Antworten", "responses")} · ${s.recordingIds.length} ${t("Aufnahmen", "recordings")}</p><p>${t("Freie Antworten, Handschrift und Sprechen warten auf Beurteilung. Modellvergleiche bestätigen keine Beherrschung.", "Free answers, handwriting and speech await review. Model comparisons do not certify mastery.")}</p></section>` : ""}${reviews(v)}`;
}
function pager(v: ViewState): string {
  const s = v.session,
    t = (de: string, en: string) => text(s.language, de, en);
  return `<div class="actions"><button data-action="previous-item" ${s.position === 0 ? "disabled" : ""}>${t("Vorige Aufgabe", "Previous item")}</button><button data-action="next-item">${t("Nächste Aufgabe", "Next item")}</button></div>`;
}
function reviews(v: ViewState): string {
  const s = v.session,
    t = (de: string, en: string) => text(s.language, de, en);
  return `<section class="card review-strip"><h2>${t("Mit Abstand wiederholen", "Spaced review")}</h2>${s.reviews.length ? s.reviews.map((r) => `<div><span>${t("Tag", "Day")} ${r.day} · ${e(new Date(r.dueAt).toLocaleDateString(s.language))}</span><button data-action="review" data-day="${r.day}" ${reviewIsDue(r) ? "" : "disabled"}>${r.completedAt ? t("Antwort gespeichert", "Response saved") : reviewIsDue(r) ? t("Jetzt wiederholen", "Review now") : t("Geplant", "Scheduled")}</button></div>`).join("") : `<p>${t("Tag 1, 3, 7, 14 und 30 nach dem Abschluss. Noch nicht geplant.", "Days 1, 3, 7, 14 and 30 after closing the session. Not scheduled yet.")}</p>`}</section>`;
}
export function render(v: ViewState): string {
  const s = v.session,
    t = (de: string, en: string) => text(s.language, de, en),
    w = v.lesson.worksheet;
  return `<header class="flow-top"><a href="/?screen=home" class="brand">${s.language === "de" ? "DeutschFlow" : "English Automaticity"}</a><nav aria-label="${t("Navigation", "Navigation")}"><a href="/${s.language === "de" ? "grammatik" : "grammar"}">${t("Arbeitsblätter", "Worksheets")}</a><a href="/studio">${t("Gespräch", "Conversation")}</a><a href="/practice">${t("Fortschritt", "Progress")}</a></nav></header><main id="flow-main" data-flow-language="${s.language}" data-step="${s.step}" data-mode="${v.mode}"><div class="flow-toolbar"><button data-action="overview" ${v.capturing ? "disabled" : ""}>${t("Übersicht", "Overview")}</button><span class="quiet">${v.overview ? t("Deine tägliche Übung", "Your daily practice") : `${t("Schritt", "Step")} ${s.step} / 7`}</span><label><input type="checkbox" data-setting="persian" ${s.persian ? "checked" : ""}> فارسی</label><button data-action="save-exit" ${v.capturing ? "disabled" : ""}>${t("Speichern und beenden", "Save and exit")}</button></div>${
    v.overview
      ? `<section class="hero"><span class="eyebrow">${w.level} · ${t("Eine Entscheidung. Sieben Schritte.", "One decision. Seven steps.")}</span><h1>${t("Vom Muster zum eigenen Satz", "From a pattern to your own sentence")}</h1><p>${t("Lernen, abrufen und anwenden. Setze dort fort, wo du aufgehört hast.", "Learn, retrieve and use it. Continue where you left off.")}</p></section><section class="card lesson-picker"><label>${t("Niveau", "Level")}<select data-setting="level">${[...new Set(v.lessons.map((l) => l.worksheet.level))].map((level) => `<option ${w.level === level ? "selected" : ""}>${e(level)}</option>`).join("")}</select></label><label>${t("Thema", "Topic")}<select data-setting="lesson">${v.lessons
          .filter((l) => l.worksheet.level === w.level)
          .map(
            (l) =>
              `<option value="${e(l.worksheet.id)}" ${w.id === l.worksheet.id ? "selected" : ""}>${e(l.worksheet.topic)}</option>`,
          )
          .join(
            "",
          )}</select></label><p>${e(w.title)}</p><button class="primary" data-action="resume">${t("Weiter bei Schritt", "Continue at step")} ${s.step}</button></section><div class="step-grid">${stepNames[s.language].map((name, index) => `<button class="step-card" data-action="step" data-step="${index + 1}"><span class="step-number">${index + 1}</span><span><strong>${e(name)}</strong><small>${s.completed.includes((index + 1) as FlowSession["step"]) ? t("Übung abgeschlossen", "Practice completed") : s.visited.includes((index + 1) as FlowSession["step"]) ? t("Begonnen", "Started") : t("Noch offen", "Not started")}</small></span></button>`).join("")}</div>${reviews(v)}<section class="card"><h2>${t("Deine Daten", "Your data")}</h2><p>${t("Entwürfe bleiben auf diesem Gerät. Sichere Text, Stiftspuren und Aufnahmen zusammen.", "Drafts stay on this device. Back up text, pen strokes and recordings together.")}</p><button data-action="backup">${t("Vollständige Sicherung exportieren", "Export complete backup")}</button><a href="/practice">${t("Sicherung wiederherstellen", "Restore a backup")}</a><a href="/replacements/${s.language}/${s.language === "de" ? "heute" : "daily"}-legacy.html">${t("Weitere tägliche Werkzeuge", "More daily tools")}</a></section>`
      : `<header class="lesson-heading"><span>${w.level} · ${e(w.topic)}</span><h1>${e(stepNames[s.language][s.step - 1])}</h1>${s.persian ? `<p lang="fa" dir="rtl">${faSteps[s.step - 1]}</p>` : ""}</header>${s.persian && !v.capturing && s.step !== 7 ? `<p lang="fa" dir="rtl" class="fa-guide">${e(w.focusFa)}</p>` : ""}${renderBody(v)}${!v.capturing && s.reviewDay === null ? `<footer class="step-footer"><button data-action="previous-step" ${s.step === 1 ? "disabled" : ""}>${t("Voriger Schritt", "Previous step")}</button><button data-action="next-step">${t("Schritt abschließen und weiter", "Complete step and continue")}</button><button data-action="skip-step">${t("Später fortsetzen", "Continue later")}</button></footer>` : ""}`
  }</main><div id="flow-status" role="status" aria-live="polite"></div>`;
}
