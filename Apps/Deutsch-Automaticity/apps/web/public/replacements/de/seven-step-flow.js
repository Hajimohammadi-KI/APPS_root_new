(() => {
  // ../../../../shared/seven-step-flow/model.ts
  var repeat = (items, count) => Array.from({ length: count }, (_, index) => {
    const source = items[index % items.length];
    const round = Math.floor(index / items.length) + 1;
    return { ...source, id: `${source.id}-round-${round}`, round };
  });
  function makeLesson(worksheet) {
    const convert = (items, kind) => items.map((item) => ({ ...item, sourceId: item.id, kind, round: 1 }));
    const controlled = [
      ...convert(worksheet.learn, "controlled"),
      ...convert(worksheet.guided, "controlled"),
      ...convert(worksheet.transform, "transform"),
      ...convert([worksheet.recall], "recall")
    ];
    if (!controlled.length || !worksheet.correction.length || !worksheet.oral.length)
      throw new Error(`Incomplete worksheet: ${worksheet.id}`);
    return {
      worksheet,
      version: "seven-step-v1",
      learn: repeat(controlled, Math.max(10, controlled.length)),
      repair: repeat(convert(worksheet.correction, "repair"), Math.max(4, worksheet.correction.length)),
      oral: repeat(convert(worksheet.oral, "oral"), Math.max(9, worksheet.oral.length)),
      script: worksheet.models.slice(0, 3).map((model) => model.sentence)
    };
  }
  function createSession(language, lesson, id, now = new Date().toISOString()) {
    return {
      version: 1,
      revision: 0,
      id,
      language,
      lessonId: lesson.worksheet.id,
      contentVersion: lesson.version,
      step: 1,
      position: 0,
      shadowStage: 0,
      createdAt: now,
      updatedAt: now,
      fields: {},
      submissions: [],
      visited: [1],
      completed: [],
      exposed: [],
      recordingIds: [],
      reviews: [],
      reviewDay: null,
      persian: false,
      rate: 1,
      seconds: 4
    };
  }
  function parseSession(raw, language, lessonId) {
    const value = JSON.parse(raw);
    if (value.version !== 1 || !Number.isSafeInteger(value.revision) || value.revision < 0 || value.language !== language || value.lessonId !== lessonId || typeof value.id !== "string" || ![1, 2, 3, 4, 5, 6, 7].includes(value.step) || !value.fields || typeof value.fields !== "object" || Array.isArray(value.fields) || !Array.isArray(value.submissions) || !Array.isArray(value.reviews) || !Array.isArray(value.recordingIds) || !Array.isArray(value.exposed) || !Array.isArray(value.visited) || !Array.isArray(value.completed) || !Number.isInteger(value.position) || value.position < 0 || !Number.isInteger(value.shadowStage) || value.shadowStage < 0 || value.shadowStage > 4 || !value.completed.every((n) => [1, 2, 3, 4, 5, 6, 7].includes(n)) || !value.reviews.every((r) => r && [1, 3, 7, 14, 30].includes(r.day) && Number.isFinite(Date.parse(r.dueAt))) || !value.submissions.every((a) => a && typeof a.id === "string" && typeof a.itemId === "string" && typeof a.text === "string" && typeof a.why === "string" && [1, 2, 3, 4, 5, 6, 7].includes(a.step)) || !Number.isFinite(Date.parse(value.createdAt)) || !Number.isFinite(Date.parse(value.updatedAt)) || ![0.5, 0.75, 1, 1.25, 1.5, 2].includes(value.rate) || ![0, 3, 4, 5, 6].includes(value.seconds))
      throw new Error("Saved lesson is unreadable. Original data was preserved.");
    return value;
  }
  function normalizeAnswer(value) {
    return value.normalize("NFC").trim().replace(/[’‘]/g, "'").replace(/[.!?]+$/u, "").replace(/\s+/g, " ").toLocaleLowerCase();
  }
  function matchesModel(text, expected) {
    return normalizeAnswer(text) === normalizeAnswer(expected);
  }
  function scheduleReviews(now, timeZone) {
    return [1, 3, 7, 14, 30].map((day) => {
      const due = new Date(now);
      due.setDate(due.getDate() + day);
      return { day, dueAt: due.toISOString(), timeZone };
    });
  }
  function reviewIsDue(review, now = Date.now()) {
    return !review.completedAt && Number.isFinite(Date.parse(review.dueAt)) && now >= Date.parse(review.dueAt);
  }
  function itemsFor(lesson, step) {
    return step === 1 ? lesson.learn : step === 2 ? lesson.repair : step === 3 ? lesson.oral : [];
  }
  function completionReady(session, lesson) {
    const ids = new Set(session.submissions.filter((s) => s.step === session.step).map((s) => s.itemId));
    if ([1, 2, 3].includes(session.step))
      return itemsFor(lesson, session.step).every((item) => ids.has(item.id));
    if (session.step === 6)
      return [0, 1, 2, 3, 4].every((n) => ids.has(`shadow-${n}`));
    if (session.step === 7)
      return ids.has("exit");
    return ids.has(session.step === 4 ? "speak-personal" : "write-personal");
  }

  // ../../../../shared/seven-step-flow/copy.ts
  var stepNames = {
    en: [
      "Learn one pattern",
      "Fix one error",
      "Retrieve aloud",
      "Use it in a real situation",
      "Write it yourself",
      "Listen, shadow, retell",
      "Review and save"
    ],
    de: [
      "Ein Muster lernen",
      "Einen Fehler korrigieren",
      "Schnell abrufen",
      "Im Alltag anwenden",
      "Selbst schreiben",
      "Hören, mitsprechen, neu erzählen",
      "Prüfen und sichern"
    ]
  };
  var faSteps = [
    "یک الگو یاد بگیر",
    "یک خطا را اصلاح کن",
    "سریع و بلند پاسخ بده",
    "در موقعیت واقعی استفاده کن",
    "خودت بنویس",
    "گوش بده، همراهی کن و بازگو کن",
    "مرور و ذخیره کن"
  ];
  var text = (language, de, en) => language === "de" ? de : en;
  var escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (s) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[s]);

  // ../../../../shared/seven-step-flow/view.ts
  function field(s, id, label, rows = 2) {
    return `<div class="flow-field" data-ink-field="${escapeHtml(id)}"><label for="field-${escapeHtml(id)}">${escapeHtml(label)}</label><textarea id="field-${escapeHtml(id)}" data-field="${escapeHtml(id)}" aria-label="${escapeHtml(label)}" rows="${rows}">${escapeHtml(typeof s.fields[id] === "string" ? s.fields[id] : "")}</textarea><button type="button" data-ink-open>${text(s.language, "Mit Stift schreiben", "Write with a pen")}</button><canvas class="ws-ink-preview" width="1000" height="400" hidden></canvas></div>`;
  }
  function fieldKey(s) {
    return s.reviewDay !== null ? `review-${s.reviewDay}` : `${s.step}:${s.position}:${s.shadowStage}`;
  }
  function currentItem(v) {
    return itemsFor(v.lesson, v.session.step)[v.session.position];
  }
  function oralPrompt(prompt) {
    return prompt.replace(/^Write about\b/, "Speak about").replace(/^Write\b/, "Say").replace(/^Schreibe über\b/, "Sprich über").replace(/^Schreibe\b/, "Sage");
  }
  function answerKey(v, item) {
    const t = (de, en) => text(v.session.language, de, en);
    if (!item) {
      const w = v.lesson.worksheet;
      return `<p>${t("Beispiel zur Orientierung. Deine eigene Antwort darf anders sein.", "An illustrative example. Your own answer may differ.")}</p>` + answerKey(v, {
        id: "personal",
        sourceId: "personal",
        kind: "controlled",
        round: 1,
        prompt: w.personal[0],
        answer: w.models[0].sentence,
        cause: w.focus,
        trigger: w.models[0].cue,
        category: w.category || w.reference[0][1],
        contrast: w.models[1].sentence
      });
    }
    return `<div class="key" data-answer-key><h3>${t("Lösung und Ursache", "Answer and cause")}</h3><dl><dt>${t("Richtige Antwort", "Correct answer")}</dt><dd>${escapeHtml(item.answer)}</dd><dt>${t("Ursache", "Root cause")}</dt><dd>${escapeHtml(item.cause)}</dd><dt>${t("Auslöser", "Trigger")}</dt><dd>${escapeHtml(item.trigger)}</dd><dt>${t("Kategorie", "Category")}</dt><dd>${escapeHtml(item.category)}</dd><dt>${t("Kontrast", "Contrast")}</dt><dd>${escapeHtml(item.contrast)}</dd></dl></div>`;
  }
  function rates(v) {
    return `<label class="rate">${text(v.session.language, "Wiedergabetempo", "Playback speed")} <select data-setting="rate">${[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => `<option value="${rate}" ${rate === v.session.rate ? "selected" : ""}>${rate}×</option>`).join("")}</select></label>`;
  }
  function feedback(v) {
    const s = v.session, t = (de, en) => text(s.language, de, en), key = fieldKey(s), recording = v.recording;
    const transcriptId = recording ? `transcript:${recording.id}` : `${key}:answer`;
    return `<section class="card"><h2>${t("Deine Aufnahme", "Your recording")}</h2>${recording ? `<audio controls data-recorded-audio aria-label="${t("Originalaufnahme", "Original recording")}"></audio>${rates(v)}<details><summary>${t("Ursprüngliche Spracherkennung (kann Fehler enthalten)", "Original speech recognition (may contain errors)")}</summary><p>${escapeHtml(recording.rawTranscript || t("Nicht verfügbar", "Unavailable"))}</p></details>` : `<p>${t("Keine Aufnahme gespeichert. Du kannst deine Antwort tippen oder mit Stift schreiben.", "No recording saved. You can type your answer or write with a pen.")}</p>`}${field(s, transcriptId, t("Dein überprüfter Text", "Your reviewed text"), 3)}${recording ? `<button data-action="confirm">${t("Text bestätigen", "Confirm text")}</button> <button data-action="evaluate" ${recording.confirmedAt ? "" : "disabled"}>${t("Text prüfen", "Check text")}</button><p class="quiet">${t("Textfeedback prüft diese Fassung. Die ursprüngliche Aufnahme bleibt erhalten.", "Text feedback checks this version. The original recording is preserved.")}</p>` : ""}</section>${recording?.evaluation ? `<section class="card" data-provider-feedback><h2>${t("Ein Korrekturhinweis", "One correction to consider")}</h2>${recording.evaluation.issues.length ? `<p>${escapeHtml(recording.evaluation.issues[0].message)}</p><p>${escapeHtml(recording.evaluation.issues[0].replacements.slice(0, 1).join(""))}</p><p class="quiet">${escapeHtml(recording.evaluation.issues[0].category)} · LanguageTool</p><details><summary>${t("Weitere Hinweise", "Later improvements")}</summary>${recording.evaluation.issues.slice(1).map((i) => `<p>${escapeHtml(i.message)}</p>`).join("")}</details>` : `<p>${t("Keine Hinweise gefunden. Die Zielstruktur ist damit noch nicht beurteilt.", "No suggestions found. This does not establish target accuracy.")}</p>`}</section>` : ""}<section class="card">${field(s, `${key}:why`, t("Warum? Nenne den Auslöser.", "Why? Name the trigger."))}<p class="quiet">${t("Sprechbeginn und Aussprache: nicht beurteilt.", "Speech-onset latency and pronunciation: not assessed.")}</p><div class="actions"><button class="primary" data-action="submit">${t("Antwort und Grund speichern", "Save answer and reason")}</button><button data-action="retry">${t("Noch einmal sprechen", "Speak again")}</button></div></section>`;
  }
  function speaking(v, cue, timed = false) {
    const s = v.session, t = (de, en) => text(s.language, de, en);
    if (v.mode === "feedback")
      return feedback(v) + (v.session.submissions.some((a) => a.step === v.session.step && a.itemId === currentItem(v)?.id) ? answerKey(v, currentItem(v)) : "");
    if (v.mode === "speak")
      return `<section class="record-space" data-production><p class="record-cue">${escapeHtml(cue)}</p><button class="mic" data-action="${v.capturing ? "stop" : "record"}" aria-label="${t(v.capturing ? "Aufnahme beenden" : "Aufnahme starten", v.capturing ? "Stop recording" : "Start recording")}"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="12" y="3" width="8" height="17" rx="4"/><path d="M8 15v3a8 8 0 0 0 16 0v-3M16 26v4m-5 0h10"/></svg></button><output id="record-time" aria-label="${t("Aufnahmezeit", "Recording time")}">0:00</output><div class="wave" aria-hidden="true"><span id="input-level"></span></div>${timed ? `<p class="quiet">${s.seconds ? `${s.seconds} ${t("Sekunden als Startziel; keine gemessene Sprechlatenz.", "seconds as a start goal; speech latency is not measured.")}` : t("Ohne Zeitdruck", "Without time pressure")}</p>` : ""}<div class="actions"><button data-action="pause" ${v.capturing ? "" : "disabled"}>${t(v.paused ? "Fortsetzen" : "Pause", v.paused ? "Resume" : "Pause")}</button><button data-action="stop" ${v.capturing ? "" : "disabled"}>${t("Fertig", "Finish")}</button></div></section>`;
    return `<section class="card"><span class="eyebrow">${t("Vorbereiten", "Prepare")}</span><h2>${t("Deine Aufgabe", "Your task")}</h2><p class="prompt">${escapeHtml(cue)}</p>${timed ? `<label>${t("Startziel", "Response-onset goal")} <select data-setting="seconds">${[0, 3, 4, 5, 6].map((n) => `<option value="${n}" ${n === s.seconds ? "selected" : ""}>${n ? `${n} s` : t("Ohne Zeitdruck", "Untimed")}</option>`).join("")}</select></label>` : `<details data-exposure="hints:${fieldKey(s)}"><summary>${t("Zwei optionale Hinweise", "Two optional hints")}</summary>${v.lesson.worksheet.models.slice(0, 2).map((m) => `<p>${escapeHtml(m.cue)}</p>`).join("")}</details>`}<div class="actions"><button class="primary" data-action="prepare-speak">${t("Weiter zum Sprechen", "Continue to speaking")}</button><button data-action="manual">${t("Text oder Handschrift verwenden", "Use text or handwriting")}</button></div><p class="quiet">${t("Die Mikrofonfreigabe erfolgt erst beim Start der Aufnahme.", "Microphone permission is requested only when recording starts.")}</p></section>`;
  }
  function renderBody(v) {
    const s = v.session, w = v.lesson.worksheet, t = (de, en) => text(s.language, de, en), key = fieldKey(s), item = currentItem(v);
    if (s.reviewDay !== null) {
      const review = s.reviews.find((r) => r.day === s.reviewDay);
      if (!review || !reviewIsDue(review))
        return `<section class="card"><p>${t("Diese Wiederholung ist noch nicht fällig oder bereits gespeichert.", "This review is not due yet, or its response is already saved.")}</p><button data-action="leave-review">${t("Zur Übersicht", "Back to overview")}</button></section>`;
      return `<section class="card"><span class="eyebrow">${t("Tag", "Day")} ${review.day} · ${t("Wiederholung ohne Modell", "Review without a model")}</span><h2>${t("Eine neue Antwort", "A new response")}</h2><p>${escapeHtml(w.personal[0])}</p><p>${t("Wähle eine neue Situation aus deinem Alltag. Schreibe drei neue Sätze. Alte Antworten bleiben bis zur Abgabe verborgen.", "Choose a new situation from your life. Write three new sentences. Earlier answers stay hidden until submission.")}</p>${field(s, `${key}:answer`, t("Deine neuen Sätze", "Your new sentences"), 5)}${field(s, `${key}:why`, t("Warum?", "Why?"))}<button class="primary" data-action="submit-review">${t("Wiederholung speichern", "Save review response")}</button><p class="quiet">${t("Die Zielstruktur ist genannt. Das Ergebnis wartet auf Beurteilung.", "The target is named. This response will await review.")}</p></section>`;
    }
    if (s.step === 1 || s.step === 2) {
      if (!item)
        return "";
      const submitted = s.submissions.some((a) => a.itemId === item.id && a.step === s.step);
      const hidden = Boolean(s.fields[`${key}:hidden`]);
      return `${s.step === 1 && !hidden ? `<section class="sand" data-rule><span class="eyebrow">${t("Eine Entscheidung", "One decision")}</span><h2>${escapeHtml(w.title)}</h2><p class="chain">${w.decision.map(escapeHtml).join(" → ")}</p><div class="models">${w.models.slice(0, 2).map((m) => `<p>${escapeHtml(m.sentence)}</p>`).join("")}</div><button data-action="hide-model">${t("Regel und Beispiele verbergen", "Hide rule and examples")}</button></section>` : ""}<section class="card ws-exercise"><span class="eyebrow">${s.position + 1} / ${itemsFor(v.lesson, s.step).length} · ${t("Übungsrunde", "Practice round")} ${item.round}</span><h2>${s.step === 2 ? t("Markierte Korrekturübung", "Labelled error-correction exercise") : item.kind === "recall" ? t("Aus dem Gedächtnis", "Reconstruct from memory") : item.kind === "transform" ? t("Eine Vorgabe verändern", "Transform one cue") : t("Ergänzen und begründen", "Complete and explain")}</h2>${s.step === 2 ? `<p class="quiet">${escapeHtml(w.correctionInstruction)}</p>` : ""}<p class="prompt ws-prompt">${escapeHtml(item.kind === "recall" && hidden ? t("Schreibe den abgedeckten Satz aus dem Gedächtnis.", "Write the hidden sentence from memory.") : item.prompt)}</p>${item.kind === "recall" && !hidden ? `<button class="primary" data-action="hide-model">${t("Satz abdecken und schreiben", "Hide the sentence and write")}</button>` : `${field(s, `${key}:answer`, t("Dein vollständiger Satz", "Your complete sentence"))}${field(s, `${key}:why`, t("Warum? Nenne den Auslöser.", "Why? Name the trigger."))}<button class="primary" data-action="submit">${t("Antwort vergleichen", "Compare answer")}</button>`}${submitted ? answerKey(v, item) : ""}</section>${pager(v)}`;
    }
    if (s.step === 3)
      return speaking(v, item?.prompt ?? "", true) + (v.mode === "feedback" ? pager(v) : "");
    if (s.step === 4)
      return speaking(v, `${oralPrompt(w.personal[0])} ${t("Formuliere drei kurze Sätze mit derselben Zielstruktur.", "Produce three short sentences using the same target.")}`);
    if (s.step === 5)
      return `<section class="card"><h2>${t("Deine Nachricht", "Your message")}</h2><p class="prompt">${escapeHtml(w.personal[0])}</p><p>${t("Schreibe drei bis fünf eigene Sätze. Begründe deine Zielentscheidung.", "Write three to five sentences of your own. Explain your target decision.")}</p>${field(s, `${key}:answer`, t("Dein Text", "Your text"), 6)}${field(s, `${key}:why`, t("Warum?", "Why?"), 3)}<button class="primary" data-action="submit">${t("Text und Grund speichern", "Save text and reason")}</button>${s.submissions.some((a) => a.step === 5) ? answerKey(v) : ""}</section>`;
    if (s.step === 6) {
      const names = s.language === "de" ? [
        "Hören",
        "Hören und lesen",
        "Nachsprechen",
        "Mitsprechen",
        "Neu erzählen"
      ] : ["Listen", "Read and listen", "Echo", "Shadow", "Retell and change"];
      const n = s.shadowStage;
      if (n >= 2 && v.mode !== "prepare")
        return speaking(v, n === 4 ? t("Sage einen neuen Satz aus deinem Leben mit derselben Zielstruktur.", "Say a new sentence from your life using the same target.") : t("Sprich die Beispiele nach. Das ist Üben mit Modell.", "Repeat the examples. This is practice with a model.")) + (v.mode === "feedback" ? `<button data-action="shadow-next">${t("Nächster Hörschritt", "Next listening step")}</button>` : "");
      return `<section class="card"><span class="eyebrow">${n + 1} / 5</span><h2>${names[n]}</h2><p>${n === 0 ? t("Hör die kurzen Beispiele. Beschreibe danach, was du verstanden hast.", "Listen to the short examples. Then describe what you understood.") : n === 1 ? t("Hör und lies die Beispiele.", "Listen and read the examples.") : n === 2 ? t("Hör einen Satz. Sprich ihn nach der Pause nach.", "Listen to one sentence. Repeat it after the pause.") : n === 3 ? t("Sprich mit dem Modell mit. Die Aufnahme ist unterstützte Imitation.", "Speak along with the model. The recording is supported imitation.") : t("Verändere Details. Verwende die Zielstruktur in deinem Alltag.", "Change details. Use the target in your own life.")}</p>${n !== 4 ? `<button data-action="listen" class="primary">${t("Beispiele hören", "Listen to examples")}</button> <button data-action="stop-listening">${t("Wiedergabe stoppen", "Stop playback")}</button>${rates(v)}<p class="quiet">${t("Browser-Sprachausgabe", "Browser speech synthesis")}</p>` : ""}${n === 1 || n === 2 || n === 3 ? `<div data-transcript>${v.lesson.script.map((sentence, index) => `<p>${escapeHtml(sentence)} ${n === 2 ? `<button data-action="listen-one" data-index="${index}">${t("Satz hören", "Play sentence")}</button>` : ""}</p>`).join("")}</div>` : ""}${n < 2 ? `${field(s, `${key}:answer`, n === 0 ? t("Was hast du verstanden?", "What did you understand?") : t("Welche Zielstruktur hast du bemerkt?", "Which target did you notice?"))}${field(s, `${key}:why`, t("Warum?", "Why?"))}<button data-action="submit">${t("Antwort speichern", "Save response")}</button>` : `<div class="actions"><button class="primary" data-action="prepare-speak">${t("Sprechversuch aufnehmen", "Record speaking attempt")}</button><button data-action="manual">${t("Text oder Handschrift", "Text or handwriting")}</button></div>`}</section><button data-action="shadow-next">${t("Nächster Hörschritt", "Next listening step")}</button>`;
    }
    const exitDone = s.submissions.some((a) => a.step === 7 && a.itemId === "exit");
    return `<section class="card"><span class="eyebrow">${t("Sofortiger Abschlusscheck", "Immediate exit check")}</span><h2>${t("Ohne Modell abrufen", "Recall without a model")}</h2><p>${escapeHtml(w.personal[0])}</p><p>${t("Schreibe drei neue Sätze. Das ist noch kein Test mit zeitlichem Abstand.", "Write three new sentences. This is not yet a delayed test.")}</p>${field(s, `${key}:answer`, t("Deine Sätze", "Your sentences"), 4)}${field(s, `${key}:why`, t("Dein Grund", "Your reason"))}<button class="primary" data-action="submit">${t("Check speichern", "Save check")}</button></section>${exitDone ? `<section class="card"><h2>${t("Dein Fehlerprotokoll", "Your error log")}</h2>${field(s, "error:original", t("Mein tatsächlicher Fehler", "My actual error"))}${field(s, "error:correction", t("Meine Korrektur", "My correction"))}${field(s, "error:why", t("Ursache und Auslöser", "Cause and trigger"))}${field(s, "error:category", t("Fehlerkategorie", "Error category"))}${field(s, "error:contrast", t("Mein Kontrastbeispiel", "My contrast example"))}${field(s, "personal:rule", t("Mein Merksatz", "My decision cue"))}<button class="primary" data-action="close-session">${t("Sichern und Wiederholungen planen", "Save and schedule reviews")}</button></section><section class="card"><h2>${t("Gespeicherte Übung", "Saved practice")}</h2><p>${s.submissions.length} ${t("Antworten", "responses")} · ${s.recordingIds.length} ${t("Aufnahmen", "recordings")}</p><p>${t("Freie Antworten, Handschrift und Sprechen warten auf Beurteilung. Modellvergleiche bestätigen keine Beherrschung.", "Free answers, handwriting and speech await review. Model comparisons do not certify mastery.")}</p></section>` : ""}${reviews(v)}`;
  }
  function pager(v) {
    const s = v.session, t = (de, en) => text(s.language, de, en);
    return `<div class="actions"><button data-action="previous-item" ${s.position === 0 ? "disabled" : ""}>${t("Vorige Aufgabe", "Previous item")}</button><button data-action="next-item">${t("Nächste Aufgabe", "Next item")}</button></div>`;
  }
  function reviews(v) {
    const s = v.session, t = (de, en) => text(s.language, de, en);
    return `<section class="card review-strip"><h2>${t("Mit Abstand wiederholen", "Spaced review")}</h2>${s.reviews.length ? s.reviews.map((r) => `<div><span>${t("Tag", "Day")} ${r.day} · ${escapeHtml(new Date(r.dueAt).toLocaleDateString(s.language))}</span><button data-action="review" data-day="${r.day}" ${reviewIsDue(r) ? "" : "disabled"}>${r.completedAt ? t("Antwort gespeichert", "Response saved") : reviewIsDue(r) ? t("Jetzt wiederholen", "Review now") : t("Geplant", "Scheduled")}</button></div>`).join("") : `<p>${t("Tag 1, 3, 7, 14 und 30 nach dem Abschluss. Noch nicht geplant.", "Days 1, 3, 7, 14 and 30 after closing the session. Not scheduled yet.")}</p>`}</section>`;
  }
  function render(v) {
    const s = v.session, t = (de, en) => text(s.language, de, en), w = v.lesson.worksheet;
    return `<header class="flow-top"><a href="/?screen=home" class="brand">${s.language === "de" ? "DeutschFlow" : "English Automaticity"}</a><nav aria-label="${t("Navigation", "Navigation")}"><a href="/${s.language === "de" ? "grammatik" : "grammar"}">${t("Arbeitsblätter", "Worksheets")}</a><a href="/studio">${t("Gespräch", "Conversation")}</a><a href="/practice">${t("Fortschritt", "Progress")}</a></nav></header><main id="flow-main" data-flow-language="${s.language}" data-step="${s.step}" data-mode="${v.mode}"><div class="flow-toolbar"><button data-action="overview" ${v.capturing ? "disabled" : ""}>${t("Übersicht", "Overview")}</button><span class="quiet">${v.overview ? t("Deine tägliche Übung", "Your daily practice") : `${t("Schritt", "Step")} ${s.step} / 7`}</span><label><input type="checkbox" data-setting="persian" ${s.persian ? "checked" : ""}> فارسی</label><button data-action="save-exit" ${v.capturing ? "disabled" : ""}>${t("Speichern und beenden", "Save and exit")}</button></div>${v.overview ? `<section class="hero"><span class="eyebrow">${w.level} · ${t("Eine Entscheidung. Sieben Schritte.", "One decision. Seven steps.")}</span><h1>${t("Vom Muster zum eigenen Satz", "From a pattern to your own sentence")}</h1><p>${t("Lernen, abrufen und anwenden. Setze dort fort, wo du aufgehört hast.", "Learn, retrieve and use it. Continue where you left off.")}</p></section><section class="card lesson-picker"><label>${t("Niveau", "Level")}<select data-setting="level">${[...new Set(v.lessons.map((l) => l.worksheet.level))].map((level) => `<option ${w.level === level ? "selected" : ""}>${escapeHtml(level)}</option>`).join("")}</select></label><label>${t("Thema", "Topic")}<select data-setting="lesson">${v.lessons.filter((l) => l.worksheet.level === w.level).map((l) => `<option value="${escapeHtml(l.worksheet.id)}" ${w.id === l.worksheet.id ? "selected" : ""}>${escapeHtml(l.worksheet.topic)}</option>`).join("")}</select></label><p>${escapeHtml(w.title)}</p><button class="primary" data-action="resume">${t("Weiter bei Schritt", "Continue at step")} ${s.step}</button></section><div class="step-grid">${stepNames[s.language].map((name, index) => `<button class="step-card" data-action="step" data-step="${index + 1}"><span class="step-number">${index + 1}</span><span><strong>${escapeHtml(name)}</strong><small>${s.completed.includes(index + 1) ? t("Übung abgeschlossen", "Practice completed") : s.visited.includes(index + 1) ? t("Begonnen", "Started") : t("Noch offen", "Not started")}</small></span></button>`).join("")}</div>${reviews(v)}<section class="card"><h2>${t("Deine Daten", "Your data")}</h2><p>${t("Entwürfe bleiben auf diesem Gerät. Sichere Text, Stiftspuren und Aufnahmen zusammen.", "Drafts stay on this device. Back up text, pen strokes and recordings together.")}</p><button data-action="backup">${t("Vollständige Sicherung exportieren", "Export complete backup")}</button><a href="/practice">${t("Sicherung wiederherstellen", "Restore a backup")}</a><a href="/replacements/${s.language}/${s.language === "de" ? "heute" : "daily"}-legacy.html">${t("Weitere tägliche Werkzeuge", "More daily tools")}</a></section>` : `<header class="lesson-heading"><span>${w.level} · ${escapeHtml(w.topic)}</span><h1>${escapeHtml(stepNames[s.language][s.step - 1])}</h1>${s.persian ? `<p lang="fa" dir="rtl">${faSteps[s.step - 1]}</p>` : ""}</header>${s.persian && !v.capturing && s.step !== 7 ? `<p lang="fa" dir="rtl" class="fa-guide">${escapeHtml(w.focusFa)}</p>` : ""}${renderBody(v)}${!v.capturing && s.reviewDay === null ? `<footer class="step-footer"><button data-action="previous-step" ${s.step === 1 ? "disabled" : ""}>${t("Voriger Schritt", "Previous step")}</button><button data-action="next-step">${t("Schritt abschließen und weiter", "Complete step and continue")}</button><button data-action="skip-step">${t("Später fortsetzen", "Continue later")}</button></footer>` : ""}`}</main><div id="flow-status" role="status" aria-live="polite"></div>`;
  }

  // ../../../../shared/learning-core/src/client-id.ts
  function createClientId(source = globalThis.crypto) {
    if (typeof source.randomUUID === "function")
      return source.randomUUID();
    const bytes = source.getRandomValues(new Uint8Array(16));
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // ../../../../shared/learning-core/src/automaticity/contracts.ts
  function isRecord(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  function assert(value, message) {
    if (!value)
      throw new Error(message);
  }
  function text2(value) {
    return typeof value === "string";
  }
  function nonempty(value) {
    return text2(value) && value.trim().length > 0 && value.length <= 500;
  }
  function choice(value, values) {
    return text2(value) && values.includes(value);
  }
  function count(value) {
    return Number.isSafeInteger(value) && value >= 0;
  }
  function nullableCount(value) {
    return value === null || count(value);
  }
  function validDate(value) {
    return text2(value) && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
  }
  function validHash(value) {
    return text2(value) && /^[a-f0-9]{64}$/.test(value);
  }
  function parseAutomaticityEvent(value, language) {
    assert(isRecord(value), "Event must be an object");
    assert(value.version === 2 && nonempty(value.id) && validDate(value.at), "Invalid event identity or date");
    assert(choice(value.language, ["en", "de"]) && (!language || language === value.language), "Wrong event language");
    if (value.type === "attempt") {
      const task = value.task;
      assert(isRecord(task), "Missing task identity");
      assert(task.definitionSha256 === undefined || validHash(task.definitionSha256), "Invalid task definition hash");
      for (const key of [
        "id",
        "version",
        "constructionId",
        "familyId",
        "itemFamily",
        "contextId",
        "rubricVersion"
      ])
        assert(nonempty(task[key]), `Invalid task ${key}`);
      assert(choice(task.stage, [
        "notice",
        "retrieve",
        "vary",
        "produce",
        "repair",
        "transfer",
        "retain"
      ]), "Invalid stage");
      assert(choice(task.modality, ["writing", "speaking"]), "Invalid modality");
      assert(choice(task.partition, [
        "teaching",
        "practice",
        "calibration",
        "evaluation"
      ]), "Invalid task partition");
      assert(choice(task.transferCondition, [
        "none",
        "target_named",
        "elicited",
        "free"
      ]), "Invalid transfer condition");
      assert(choice(task.contentReview, [
        "authored",
        "machine_checked",
        "human_reviewed"
      ]), "Invalid content review");
      const response = value.response;
      assert(isRecord(response) && text2(response.text) && response.text.length <= 1e5 && validHash(response.sha256), "Invalid response");
      assert((response.originalTranscriptSha256 === null || validHash(response.originalTranscriptSha256)) && typeof response.transcriptEdited === "boolean", "Invalid transcript identity");
      const timing = value.timing;
      assert(isRecord(timing) && validDate(timing.startedAt) && Date.parse(timing.startedAt) <= Date.parse(value.at), "Invalid start time");
      assert(nullableCount(timing.activeMs) && nullableCount(timing.firstInputMs) && choice(timing.source, ["monotonic_visible", "unavailable"]), "Invalid timing");
      if (timing.source === "unavailable")
        assert(timing.activeMs === null && timing.firstInputMs === null, "Unavailable timing cannot contain measurements");
      if (timing.activeMs !== null) {
        assert(timing.activeMs <= Date.parse(value.at) - Date.parse(timing.startedAt) + 1000, "Active time exceeds wall time");
        assert(timing.firstInputMs === null || timing.firstInputMs <= timing.activeMs, "First-input time exceeds active time");
      }
      const assistance = value.assistance;
      assert(isRecord(assistance) && count(assistance.hintCount) && ["solutionRevealed", "exampleSeen", "selfReportedAssistance"].every((key) => typeof assistance[key] === "boolean"), "Invalid assistance");
      assert(value.previousAttemptId === null || nonempty(value.previousAttemptId), "Invalid prior attempt");
      if (value.audio !== null) {
        const audio = value.audio;
        assert(isRecord(audio) && nonempty(audio.id) && validHash(audio.sha256) && count(audio.bytes) && count(audio.durationMs) && text2(audio.mime) && typeof audio.persisted === "boolean", "Invalid audio");
      }
    } else if (value.type === "assessment") {
      assert(nonempty(value.attemptId) && validHash(value.responseSha256) && nonempty(value.taskVersion) && nonempty(value.rubricVersion), "Invalid assessment identity");
      assert(choice(value.verdict, [
        "pass",
        "needs_repair",
        "target_not_observed",
        "not_assessed"
      ]), "Invalid verdict");
      const d = value.dimensions;
      assert(isRecord(d) && choice(d.grammar, ["pass", "fail", "unknown"]) && choice(d.target, ["observed", "not_observed", "unknown"]) && choice(d.relevance, ["pass", "fail", "unknown"]) && nullableCount(d.opportunities), "Invalid assessment dimensions");
      const evaluator = value.evaluator;
      assert(isRecord(evaluator) && nonempty(evaluator.id) && nonempty(evaluator.version) && choice(evaluator.kind, ["rule", "transformer", "human", "self"]) && typeof evaluator.scopeApproved === "boolean" && (evaluator.reviewId === null || nonempty(evaluator.reviewId)), "Invalid evaluator");
      assert(typeof value.uncertainty === "boolean" && (value.confidence === null || typeof value.confidence === "number" && Number.isFinite(value.confidence) && value.confidence >= 0 && value.confidence <= 1), "Invalid confidence");
      assert(text2(value.feedback) && (value.correction === null || text2(value.correction)), "Invalid feedback");
      assert(Array.isArray(value.spans) && value.spans.every((span) => isRecord(span) && count(span.start) && count(span.end) && span.end >= span.start && text2(span.explanation)), "Invalid evidence spans");
      assert(value.supersedes === null || nonempty(value.supersedes) && value.supersedes !== value.id, "Invalid supersession");
      if (value.verdict === "pass")
        assert(d.grammar === "pass" && d.target === "observed" && d.relevance === "pass" && d.opportunities > 0 && !value.uncertainty, "Pass contradicts assessment dimensions");
      if (value.verdict === "target_not_observed")
        assert(d.target === "not_observed", "Target verdict contradicts dimensions");
      if (value.verdict === "not_assessed")
        assert(d.grammar === "unknown", "Unassessed cannot claim grammar accuracy");
    } else if (value.type === "exposure") {
      assert(["constructionId", "taskId", "itemFamily"].every((key) => nonempty(value[key])) && choice(value.kind, ["example", "hint", "solution"]), "Invalid exposure");
    } else if (value.type === "invalidation") {
      assert(nonempty(value.assessmentId) && choice(value.reason, [
        "review_overturned",
        "transcript_changed",
        "recording_replaced",
        "invalid_provider_response"
      ]), "Invalid invalidation");
    } else
      throw new Error("Unknown automaticity event type");
    return value;
  }

  // ../../../../shared/learning-core/src/automaticity/storage.ts
  var eventPrefix = (language) => `automaticity:v2:${language}:event:`;
  function appendAutomaticityEvent(storage, event) {
    parseAutomaticityEvent(event, event.language);
    const key = eventPrefix(event.language) + encodeURIComponent(event.id);
    const value = JSON.stringify(event);
    const previous = storage.getItem(key);
    if (previous !== null && previous !== value)
      throw new Error("Event IDs are immutable; append a new assessment to revise a verdict.");
    storage.setItem(key, value);
    if (storage.getItem(key) !== value)
      throw new Error("The browser did not persist this event.");
  }
  function ownsStorageKey(key, language) {
    if (/(?:token|api[-_]?key|secret|credential|oauth|password)/i.test(key))
      return false;
    const common = [
      "automaticity:learning-evidence:v1",
      "study-suite:learner-profile:v1"
    ];
    if (common.includes(key))
      return true;
    if (key.startsWith("automaticity:learning-evidence:v1:"))
      return true;
    if (key.startsWith(`automaticity:v2:${language}:`))
      return true;
    const exact = language === "en" ? ["grammar-automaticity:v27", "GrammarAutomaticityV11_en"] : [
      "GrammarAutomaticityV11_de",
      "german-automaticity:v20",
      "grammar-automaticity:de"
    ];
    const prefixes = language === "en" ? ["english-", "english:", "grammar-lab-en"] : ["deutsch-", "deutsch:", "german-", "grammar-lab-de"];
    return exact.includes(key) || prefixes.some((prefix) => key.startsWith(prefix));
  }

  // ../../../../shared/learning-core/src/automaticity/backup.ts
  var databaseNames = (language) => language === "en" ? [
    "GrammarAutomaticityV27",
    "english-automaticity-teacher-content",
    "automaticity-v2-en",
    "automaticity-migration-v2-en",
    "conversation-studio"
  ] : [
    "GrammarAutomaticityV11_de",
    "deutsch-automaticity-teacher-content",
    "automaticity-v2-de",
    "automaticity-migration-v2-de",
    "conversation-studio"
  ];
  var bytesToBase64 = (bytes) => {
    let binary = "";
    for (let i = 0;i < bytes.length; i += 8192)
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(binary);
  };
  var sha256Constants = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function sha256Fallback(bytes) {
    const padded = new Uint8Array(bytes.length + 9 + 63 >> 6 << 6);
    padded.set(bytes);
    padded[bytes.length] = 128;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 4, bytes.length * 8);
    let hash = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ];
    for (let offset = 0;offset < padded.length; offset += 64) {
      const words = new Uint32Array(64);
      for (let index = 0;index < 16; index++)
        words[index] = view.getUint32(offset + index * 4);
      for (let index = 16;index < 64; index++) {
        const value = words[index - 15], previous = words[index - 2];
        const sigma0 = (value >>> 7 | value << 25) ^ (value >>> 18 | value << 14) ^ value >>> 3;
        const sigma1 = (previous >>> 17 | previous << 15) ^ (previous >>> 19 | previous << 13) ^ previous >>> 10;
        words[index] = words[index - 16] + sigma0 + words[index - 7] + sigma1 >>> 0;
      }
      let [a, b, c, d, e, f, g, h] = hash;
      for (let index = 0;index < 64; index++) {
        const sum1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
        const choice2 = e & f ^ ~e & g;
        const temporary1 = h + sum1 + choice2 + sha256Constants[index] + words[index] >>> 0;
        const sum0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
        const majority = a & b ^ a & c ^ b & c;
        const temporary2 = sum0 + majority >>> 0;
        [h, g, f, e, d, c, b, a] = [
          g,
          f,
          e,
          d + temporary1 >>> 0,
          c,
          b,
          a,
          temporary1 + temporary2 >>> 0
        ];
      }
      hash = hash.map((value, index) => value + [a, b, c, d, e, f, g, h][index] >>> 0);
    }
    return hash.map((value) => value.toString(16).padStart(8, "0")).join("");
  }
  async function sha256(value) {
    const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
    const subtle = globalThis.crypto?.subtle;
    if (subtle)
      return [...new Uint8Array(await subtle.digest("SHA-256", bytes))].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    return sha256Fallback(new Uint8Array(bytes));
  }
  async function encode(value) {
    if (value === null || typeof value === "string" || typeof value === "boolean")
      return value;
    if (typeof value === "number" && Number.isFinite(value))
      return value;
    if (value instanceof Blob) {
      const buffer = await value.arrayBuffer();
      return {
        kind: "blob",
        mime: value.type,
        base64: bytesToBase64(new Uint8Array(buffer)),
        sha256: await sha256(buffer),
        bytes: buffer.byteLength
      };
    }
    if (Array.isArray(value))
      return { kind: "array", values: await Promise.all(value.map(encode)) };
    if (isRecord(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null))
      return {
        kind: "object",
        entries: await Promise.all(Object.entries(value).filter(([, v]) => v !== undefined).map(async ([key, v]) => [key, await encode(v)]))
      };
    throw new Error("A stored record has an unsupported data type; export stopped without dropping it.");
  }
  function request(value) {
    return new Promise((resolve, reject) => {
      value.onsuccess = () => resolve(value.result);
      value.onerror = () => reject(value.error);
    });
  }
  function completed(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error ?? new Error("Transaction aborted"));
    });
  }
  function existingDatabase(factory, name) {
    return new Promise((resolve, reject) => {
      const opening = factory.open(name);
      let absent = false;
      opening.onupgradeneeded = () => {
        absent = true;
        opening.transaction?.abort();
      };
      opening.onsuccess = () => resolve(opening.result);
      opening.onerror = () => absent ? resolve(null) : reject(opening.error);
      opening.onblocked = () => reject(new Error("Close other app tabs before backing up this database."));
    });
  }
  async function snapshotDatabase(factory, name) {
    const db = await existingDatabase(factory, name);
    if (!db)
      return null;
    try {
      const names = [...db.objectStoreNames];
      const transaction = db.transaction(names, "readonly");
      const done = completed(transaction);
      const pending = names.map(async (storeName) => {
        const store = transaction.objectStore(storeName);
        if (Array.isArray(store.keyPath) || store.autoIncrement)
          throw new Error("Unsupported database schema; export stopped.");
        const keysRequest = request(store.getAllKeys());
        const valuesRequest = request(store.getAll());
        const [keys, values] = await Promise.all([keysRequest, valuesRequest]);
        const records = await Promise.all(keys.map(async (key, index) => {
          if (typeof key !== "string" && typeof key !== "number")
            throw new Error("Unsupported database key.");
          return { key, value: await encode(values[index]) };
        }));
        return {
          name: storeName,
          keyPath: store.keyPath,
          records
        };
      });
      const stores = await Promise.all(pending);
      await done;
      return { name, version: db.version, stores };
    } finally {
      db.close();
    }
  }
  async function captureCompleteBackup(persistence, language, now = new Date().toISOString(), overrides = []) {
    const entries = [];
    for (let i = 0;i < persistence.storage.length; i++) {
      const key = persistence.storage.key(i);
      if (key && ownsStorageKey(key, language)) {
        const value = persistence.storage.getItem(key);
        if (value !== null)
          entries.push([key, value]);
      }
    }
    for (const [key, value] of overrides) {
      if (!ownsStorageKey(key, language))
        throw new Error("Snapshot override does not belong to this language.");
      const index = entries.findIndex(([existing]) => existing === key);
      if (index >= 0)
        entries[index] = [key, value];
      else
        entries.push([key, value]);
    }
    entries.sort(([a], [b]) => a.localeCompare(b));
    const dbs = await Promise.all(databaseNames(language).map((name) => snapshotDatabase(persistence.indexedDB, name)));
    const payload = {
      kind: "automaticity.complete-backup",
      version: 2,
      language,
      createdAt: now,
      localStorage: entries,
      databases: dbs.filter((row) => row !== null)
    };
    return { ...payload, sha256: await sha256(JSON.stringify(payload)) };
  }
  var recoveryPromises = new WeakMap;

  // ../../../../shared/seven-step-flow/persistence.ts
  var prefix = (language) => `automaticity:v2:${language}:seven-step:`;
  var sessionKey = (language, id) => prefix(language) + id;
  function loadSession(language, lesson) {
    const value = localStorage.getItem(sessionKey(language, lesson.worksheet.id));
    return value ? parseSession(value, language, lesson.worksheet.id) : createSession(language, lesson, createClientId());
  }
  function saveSession(session) {
    const key = sessionKey(session.language, session.lessonId);
    const previous = localStorage.getItem(key);
    if (previous) {
      const saved = parseSession(previous, session.language, session.lessonId);
      if (saved.revision !== session.revision)
        throw new Error("This lesson changed in another tab. Export this draft before reloading.");
    }
    const updated = {
      ...session,
      updatedAt: new Date().toISOString(),
      revision: session.revision + 1
    };
    const raw = JSON.stringify(updated);
    localStorage.setItem(key, raw);
    if (localStorage.getItem(key) !== raw)
      throw new Error("Draft could not be saved.");
    Object.assign(session, updated);
    localStorage.setItem(prefix(session.language) + "last", session.lessonId);
  }
  async function submitPractice(session, lesson, itemId, text3, why, modelMatch, audio, rawTranscript) {
    const id = createClientId(), at = new Date().toISOString();
    const previous = session.submissions.filter((s) => s.step === session.step && s.itemId === itemId).at(-1);
    const event = {
      version: 2,
      type: "attempt",
      id,
      language: session.language,
      at,
      task: {
        id: `${lesson.worksheet.id}:${session.step}:${itemId}`,
        version: lesson.version,
        definitionSha256: await sha256(JSON.stringify(lesson.worksheet)),
        constructionId: `seven-step:${lesson.worksheet.id}`,
        familyId: lesson.worksheet.id,
        itemFamily: `${lesson.worksheet.id}:${itemId.replace(/-round-\d+$/, "")}`,
        contextId: `${lesson.worksheet.id}:${session.reviewDay === null ? "lesson" : `review-${session.reviewDay}`}`,
        rubricVersion: "authored-comparison-v1",
        stage: session.reviewDay ? "retain" : session.step === 2 ? "repair" : "produce",
        modality: audio ? "speaking" : "writing",
        partition: "practice",
        transferCondition: "target_named",
        contentReview: "authored"
      },
      response: {
        text: text3,
        sha256: await sha256(text3),
        originalTranscriptSha256: rawTranscript?.trim() ? await sha256(rawTranscript) : null,
        transcriptEdited: rawTranscript !== undefined && text3 !== rawTranscript
      },
      timing: {
        startedAt: at,
        activeMs: null,
        firstInputMs: null,
        source: "unavailable"
      },
      assistance: {
        hintCount: session.exposed.length,
        solutionRevealed: session.exposed.some((s) => s.startsWith("answer:")),
        exampleSeen: session.exposed.length > 0,
        selfReportedAssistance: false
      },
      audio: audio ?? null,
      previousAttemptId: previous?.eventId ?? null
    };
    appendAutomaticityEvent(localStorage, event);
    const submission = {
      id,
      eventId: id,
      itemId,
      step: session.step,
      text: text3,
      why,
      at,
      modelMatch,
      assisted: session.exposed.length > 0
    };
    session.submissions.push(submission);
    saveSession(session);
    return submission;
  }

  // ../../../../shared/conversation-flow/recorder.ts
  class StudioRecorder {
    language;
    events;
    stream = null;
    recorder = null;
    recognition = null;
    context = null;
    analyser = null;
    timer = null;
    chunks = [];
    raw = "";
    recognitionGeneration = 0;
    source = "unavailable";
    elapsed = 0;
    started = 0;
    disposed = false;
    state = "stopped";
    constructor(language, events) {
      this.language = language;
      this.events = events;
    }
    milliseconds() {
      return this.elapsed + (this.state === "recording" ? performance.now() - this.started : 0);
    }
    snapshot() {
      return {
        audio: new Blob(this.chunks, {
          type: this.recorder?.mimeType || "audio/webm"
        }),
        durationMs: Math.round(this.milliseconds()),
        rawTranscript: this.raw,
        transcriptSource: this.source,
        captureState: this.state
      };
    }
    async start() {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder)
        throw new Error("unsupported");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      if (this.disposed) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      try {
        const recorder = new MediaRecorder(stream);
        this.recorder = recorder;
        recorder.ondataavailable = ({ data }) => {
          if (data.size)
            this.chunks.push(data);
          if (this.chunks.length && this.state !== "stopped" && this.state !== "interrupted")
            this.events.checkpoint(this.snapshot());
        };
        recorder.onstop = () => {
          this.stopRecognition();
          setTimeout(() => {
            this.events.stopped(this.snapshot());
            this.cleanup();
          }, 180);
        };
        recorder.onerror = () => this.interrupt();
        stream.getAudioTracks().forEach((track) => track.addEventListener("ended", () => this.interrupt()));
        try {
          this.context = new AudioContext;
          this.analyser = this.context.createAnalyser();
          this.analyser.fftSize = 256;
          this.context.createMediaStreamSource(stream).connect(this.analyser);
          await this.context.resume();
        } catch {
          this.analyser = null;
        }
        this.state = "recording";
        this.started = performance.now();
        recorder.start(1000);
        this.startRecognition();
        const samples = new Uint8Array(256);
        this.timer = setInterval(() => {
          let level = 0;
          if (this.analyser && this.state === "recording") {
            this.analyser.getByteTimeDomainData(samples);
            level = Math.sqrt(samples.reduce((sum, sample) => sum + ((sample - 128) / 128) ** 2, 0) / samples.length);
          }
          this.events.tick(this.milliseconds(), level);
        }, 100);
        document.addEventListener("visibilitychange", this.onVisibility);
        window.addEventListener("pagehide", this.onPageHide);
      } catch (error) {
        this.cleanup();
        throw error;
      }
    }
    startRecognition() {
      const browser = window;
      const Constructor = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
      if (!Constructor) {
        this.events.recognitionUnavailable();
        return;
      }
      const recognition = new Constructor;
      this.recognition = recognition;
      const prefix2 = this.raw;
      const generation = ++this.recognitionGeneration;
      recognition.lang = this.language === "de" ? "de-DE" : "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        if (this.disposed || generation !== this.recognitionGeneration)
          return;
        const final = [];
        for (let i = 0;i < event.results.length; i++) {
          const result = event.results[i];
          if (result?.isFinal)
            final.push(result[0].transcript);
        }
        this.raw = [prefix2, ...final].filter(Boolean).join(" ").trim();
        this.source = "browser-asr";
      };
      recognition.onerror = ({ error }) => {
        if (error !== "no-speech" && error !== "aborted")
          this.events.recognitionUnavailable();
      };
      recognition.onend = () => {
        if (this.recognition === recognition)
          this.recognition = null;
      };
      try {
        recognition.start();
      } catch {
        this.events.recognitionUnavailable();
      }
    }
    stopRecognition() {
      try {
        this.recognition?.stop();
      } catch {}
      this.recognition = null;
    }
    pause() {
      if (this.state !== "recording" || this.recorder?.state !== "recording")
        return;
      this.elapsed = this.milliseconds();
      this.state = "paused";
      this.recorder.requestData();
      this.recorder.pause();
      this.stopRecognition();
    }
    resume() {
      if (this.state !== "paused" || this.recorder?.state !== "paused")
        return;
      this.state = "recording";
      this.started = performance.now();
      this.recorder.resume();
      this.startRecognition();
    }
    stop() {
      if (this.state !== "recording" && this.state !== "paused")
        return;
      this.elapsed = this.milliseconds();
      this.state = "stopped";
      this.stopRecognition();
      if (this.recorder?.state !== "inactive")
        this.recorder?.stop();
    }
    interrupt() {
      if (this.state === "stopped" || this.state === "interrupted")
        return;
      this.stop();
      this.state = "interrupted";
      this.events.interrupted();
    }
    onVisibility = () => {
      if (document.hidden && this.state === "recording") {
        this.pause();
        this.events.interrupted();
      }
    };
    onPageHide = () => this.interrupt();
    dispose() {
      this.disposed = true;
      this.interrupt();
      this.cleanup();
    }
    cleanup() {
      if (this.timer)
        clearInterval(this.timer);
      this.timer = null;
      this.stream?.getTracks().forEach((track) => track.stop());
      this.stream = null;
      this.stopRecognition();
      this.context?.close().catch(() => {
        return;
      });
      this.context = null;
      document.removeEventListener("visibilitychange", this.onVisibility);
      window.removeEventListener("pagehide", this.onPageHide);
    }
  }

  // ../../../../shared/conversation-flow/storage.ts
  var DATABASE = "conversation-studio";
  function openStudioDatabase() {
    return new Promise((resolve, reject) => {
      const request2 = indexedDB.open(DATABASE, 2);
      request2.onupgradeneeded = () => {
        for (const name of ["attempts-v2", "reviews-v2"]) {
          if (!request2.result.objectStoreNames.contains(name))
            request2.result.createObjectStore(name, { keyPath: "id" });
        }
      };
      request2.onsuccess = () => {
        request2.result.onversionchange = () => request2.result.close();
        resolve(request2.result);
      };
      request2.onerror = () => reject(request2.error ?? new Error("Storage unavailable"));
      request2.onblocked = () => reject(new Error("Close older Conversation Studio tabs and retry saving."));
    });
  }
  async function put(store, value) {
    const db = await openStudioDatabase();
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readwrite");
        tx.objectStore(store).put(value);
        tx.oncomplete = () => resolve();
        tx.onerror = tx.onabort = () => reject(tx.error ?? new Error("Draft could not be saved"));
      });
    } finally {
      db.close();
    }
  }
  var writes = Promise.resolve();
  function enqueue(store, value) {
    const operation = writes.catch(() => {
      return;
    }).then(() => put(store, value));
    writes = operation;
    return operation;
  }
  var saveAttempt = (attempt) => enqueue("attempts-v2", attempt);
  async function readStudio(language) {
    const db = await openStudioDatabase();
    try {
      const read = (store) => new Promise((resolve, reject) => {
        const request2 = db.transaction(store, "readonly").objectStore(store).getAll();
        request2.onsuccess = () => resolve(request2.result.filter((item) => item.language === language));
        request2.onerror = () => reject(request2.error);
      });
      const [attempts, reviews2] = await Promise.all([
        read("attempts-v2"),
        read("reviews-v2")
      ]);
      return {
        attempts: attempts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
        reviews: reviews2.sort((a, b) => a.dueAt.localeCompare(b.dueAt))
      };
    } finally {
      db.close();
    }
  }

  // ../../../../shared/conversation-flow/model.ts
  function editTranscript(attempt, text3) {
    return {
      ...attempt,
      editedTranscript: text3,
      confirmedAt: undefined,
      evaluation: undefined,
      updatedAt: new Date().toISOString()
    };
  }
  function confirmTranscript(attempt, now = new Date().toISOString()) {
    if (!attempt.editedTranscript.trim())
      throw new Error("A transcript is required.");
    return { ...attempt, confirmedAt: now, updatedAt: now };
  }
  function attachEvaluation(attempt, value) {
    if (!attempt.confirmedAt || !isEvaluation(value, attempt.editedTranscript.trim()))
      throw new Error("Evaluation does not match the confirmed transcript.");
    return { ...attempt, evaluation: value, updatedAt: new Date().toISOString() };
  }
  function isEvaluation(value, text3) {
    if (!value || typeof value !== "object")
      return false;
    const v = value;
    return v.original === text3 && typeof v.corrected === "string" && v.provider === "LanguageTool" && typeof v.checkedAt === "string" && Number.isFinite(Date.parse(v.checkedAt)) && Array.isArray(v.issues) && v.issues.every((issue) => {
      if (!issue || typeof issue !== "object")
        return false;
      const i = issue;
      return typeof i.message === "string" && typeof i.ruleId === "string" && typeof i.category === "string" && typeof i.offset === "number" && Number.isInteger(i.offset) && i.offset >= 0 && typeof i.length === "number" && Number.isInteger(i.length) && i.length >= 0 && i.offset + i.length <= text3.length && Array.isArray(i.replacements) && i.replacements.every((r) => typeof r === "string");
    });
  }

  // ../../../../shared/seven-step-flow/app.ts
  var host = document.getElementById("seven-step-root");
  var language = document.documentElement.lang === "de" ? "de" : "en";
  var t = (de, en) => text(language, de, en);
  var lessons = window.GrammarWorksheets.worksheets.map(makeLesson);
  var query = new URLSearchParams(location.search);
  var last = null;
  try {
    last = localStorage.getItem(prefix(language) + "last");
  } catch {}
  var lesson = lessons.find((l) => l.worksheet.id === (query.get("lesson") || last)) || lessons[0];
  var disposeInk;
  var audioUrl;
  var recorder = null;
  var operation = false;
  var sequence = 0;
  var recordings = [];
  var storageWarning = "";
  var pendingWrites = Promise.resolve();
  var view;
  function notify(message, failed = false) {
    const node = document.getElementById("flow-status");
    if (node) {
      node.textContent = message;
      node.classList.toggle("failure", failed);
    }
  }
  function persist() {
    saveSession(view.session);
  }
  function fieldText(id) {
    const value = view.session.fields[id];
    return typeof value === "string" ? value : "";
  }
  function fieldHasAnswer(id) {
    return Boolean(fieldText(id).trim() || Array.isArray(view.session.fields[id + ":ink"]) && view.session.fields[id + ":ink"].length);
  }
  function modeKey() {
    return `${fieldKey(view.session)}:mode`;
  }
  function refreshRecording() {
    const id = fieldText(`${fieldKey(view.session)}:recording`);
    view.recording = recordings.find((a) => a.id === id);
    const mode = fieldText(modeKey());
    view.mode = mode === "feedback" || mode === "speak" ? mode : "prepare";
    if (view.mode === "speak" && !view.capturing)
      view.mode = view.recording ? "feedback" : "prepare";
  }
  function expose(id) {
    if (!view.session.exposed.includes(id)) {
      view.session.exposed.push(id);
      persist();
    }
  }
  function draw() {
    disposeInk?.();
    disposeInk = undefined;
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      audioUrl = undefined;
    }
    host.innerHTML = render(view);
    const address = new URL(location.href);
    address.searchParams.set("lesson", view.session.lessonId);
    if (view.overview)
      address.searchParams.delete("step");
    else
      address.searchParams.set("step", String(view.session.step));
    history.replaceState(null, "", address);
    disposeInk = window.GrammarWorksheetInk.mount(host, {
      language,
      get: (id) => view.session.fields[id],
      set: (id, value) => {
        view.session.fields[id] = value;
        try {
          persist();
          notify(t("Stiftspuren gespeichert.", "Pen strokes saved."));
        } catch (error) {
          notify(String(error), true);
        }
      }
    });
    const audio = host.querySelector("[data-recorded-audio]");
    if (audio && view.recording) {
      audioUrl = URL.createObjectURL(view.recording.audio);
      audio.src = audioUrl;
      audio.playbackRate = view.session.rate;
    }
    host.querySelectorAll("details[data-exposure]").forEach((el) => el.addEventListener("toggle", () => {
      if (el.open)
        try {
          expose(el.dataset.exposure);
        } catch (error) {
          notify(String(error), true);
        }
    }));
    if (!view.overview && view.session.step === 1 && !view.session.fields[`${fieldKey(view.session)}:hidden`]) {
      try {
        expose(`model:${fieldKey(view.session)}`);
      } catch (error) {
        notify(String(error), true);
      }
    }
    if (storageWarning)
      notify(storageWarning, true);
    if (!view.overview && view.session.persian && !view.capturing && view.session.step !== 7) {
      try {
        expose(`persian-guide:${fieldKey(view.session)}`);
      } catch (error) {
        notify(String(error), true);
      }
    }
  }
  function setMode(mode) {
    view.mode = mode;
    view.session.fields[modeKey()] = mode;
    persist();
    draw();
  }
  function moveStep(step) {
    window.speechSynthesis?.cancel();
    view.session.step = step;
    view.session.position = 0;
    view.session.shadowStage = 0;
    view.session.reviewDay = null;
    if (!view.session.visited.includes(step))
      view.session.visited.push(step);
    view.overview = false;
    persist();
    refreshRecording();
    draw();
    window.scrollTo({ top: 0 });
  }
  function audioTask() {
    const item = currentItem(view);
    return item?.prompt ?? (view.session.step === 6 ? `Listening stage ${view.session.shadowStage + 1}: ${view.lesson.worksheet.personal[0]}` : oralPrompt(view.lesson.worksheet.personal[0]));
  }
  async function startRecording() {
    if (recorder || view.capturing)
      return;
    window.speechSynthesis?.cancel();
    const session = view.session, key = fieldKey(session), id = createClientId(), at = new Date().toISOString(), generation = ++sequence;
    const parentId = fieldText(`${key}:previous-recording`);
    let attempt = {
      id,
      sessionId: session.id,
      topicId: `daily:${session.lessonId}`,
      language,
      createdAt: at,
      updatedAt: at,
      kind: parentId ? "immediate-retry" : "initial",
      ...parentId ? { parentId } : {},
      task: audioTask(),
      contentVersion: lesson.version,
      hintsUsed: [
        ...session.exposed,
        ...session.step === 6 && session.shadowStage === 3 ? ["model-playback-during-capture"] : []
      ],
      audio: new Blob,
      captureState: "recording",
      durationMs: 0,
      rawTranscript: "",
      transcriptSource: "unavailable",
      editedTranscript: "",
      errorNote: "",
      contrastNote: ""
    };
    const store = async (snapshot, finished) => {
      attempt = {
        ...attempt,
        audio: snapshot.audio,
        durationMs: snapshot.durationMs,
        rawTranscript: snapshot.rawTranscript,
        editedTranscript: snapshot.rawTranscript,
        transcriptSource: snapshot.transcriptSource,
        captureState: snapshot.captureState,
        updatedAt: new Date().toISOString()
      };
      const frozen = attempt;
      pendingWrites = pendingWrites.catch(() => {
        return;
      }).then(async () => {
        await saveAttempt(frozen);
        if (!session.recordingIds.includes(id))
          session.recordingIds.push(id);
        session.fields[`${key}:recording`] = id;
        session.fields[`transcript:${id}`] = frozen.editedTranscript;
        if (finished)
          session.fields[`${key}:mode`] = "feedback";
        saveSession(session);
        recordings = recordings.filter((a) => a.id !== id).concat(frozen);
      });
      try {
        await pendingWrites;
      } catch (error) {
        storageWarning = t("Aufnahme konnte nicht gespeichert werden: ", "Recording could not be saved: ") + String(error);
      }
      if (finished && generation === sequence) {
        recorder = null;
        view.capturing = false;
        view.paused = false;
        view.recording = frozen;
        view.mode = "feedback";
        draw();
      }
    };
    recorder = new StudioRecorder(language, {
      tick: (milliseconds, level) => {
        const clock = document.getElementById("record-time"), wave = document.getElementById("input-level");
        if (clock)
          clock.textContent = `${Math.floor(milliseconds / 60000)}:${String(Math.floor(milliseconds / 1000) % 60).padStart(2, "0")}`;
        if (wave)
          wave.style.transform = `scaleX(${Math.min(1, Math.max(0, level * 6))})`;
      },
      checkpoint: (snapshot) => {
        store(snapshot, false);
      },
      stopped: (snapshot) => {
        store(snapshot, true);
      },
      recognitionUnavailable: () => notify(t("Spracherkennung nicht verfügbar. Die Aufnahme läuft weiter.", "Speech recognition unavailable. Audio recording continues.")),
      interrupted: () => {
        view.paused = true;
        notify(t("Aufnahme unterbrochen. Gespeicherte Teile bleiben erhalten.", "Recording interrupted. Saved segments are retained."), true);
      }
    });
    view.capturing = true;
    view.paused = false;
    draw();
    try {
      await recorder.start();
      if (session.step === 6 && session.shadowStage === 3)
        speakModel(view.lesson.script);
    } catch (error) {
      recorder?.dispose();
      recorder = null;
      view.capturing = false;
      view.mode = "prepare";
      draw();
      const cause = String(error);
      notify(cause.includes("unsupported") ? t("Für das Mikrofon ist vertrauenswürdiges HTTPS nötig. Text und Stift funktionieren hier weiterhin.", "Microphone recording needs trusted HTTPS. Text and pen input still work here.") : t("Mikrofon nicht verfügbar. Prüfe Berechtigung und Gerät. ", "Microphone unavailable. Check permission and device. ") + cause, true);
    }
  }
  function speakModel(sentences) {
    if (!("speechSynthesis" in window)) {
      notify(t("Sprachausgabe nicht verfügbar.", "Speech synthesis unavailable."), true);
      return;
    }
    if (view.capturing && !(view.session.step === 6 && view.session.shadowStage === 3))
      return;
    expose(`audio-model:${fieldKey(view.session)}`);
    window.speechSynthesis.cancel();
    for (const sentence of sentences) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = language === "de" ? "de-DE" : "en-US";
      utterance.rate = view.session.rate;
      utterance.onerror = () => notify(t("Sprachausgabe nicht verfügbar. Prüfe die installierte Stimme.", "Speech synthesis unavailable. Check the installed voice."), true);
      speechSynthesis.speak(utterance);
    }
  }
  async function submit(review = false) {
    const s = view.session, key = fieldKey(s), item = currentItem(view), recording = view.recording;
    const isSpeech = [3, 4].includes(s.step) || s.step === 6 && s.shadowStage >= 2;
    const answerId = isSpeech && recording ? `transcript:${recording.id}` : `${key}:answer`;
    if (!fieldHasAnswer(answerId) && !(isSpeech && recording?.audio.size)) {
      notify(t("Schreibe oder sprich zuerst deine Antwort.", "Write or record your answer first."), true);
      return;
    }
    if (!fieldHasAnswer(`${key}:why`)) {
      notify(t("Ergänze deinen Grund. Du kannst auch mit Stift schreiben.", "Add your reason. You can also write it with a pen."), true);
      return;
    }
    const itemId = review ? `review-${s.reviewDay}` : item?.id ?? (s.step === 4 ? "speak-personal" : s.step === 5 ? "write-personal" : s.step === 6 ? `shadow-${s.shadowStage}` : "exit");
    const answer = fieldText(answerId), why = fieldText(`${key}:why`);
    const audio = isSpeech && recording ? {
      id: recording.id,
      sha256: await sha256(await recording.audio.arrayBuffer()),
      bytes: recording.audio.size,
      durationMs: recording.durationMs,
      mime: recording.audio.type,
      persisted: !storageWarning
    } : null;
    const result = await submitPractice(s, view.lesson, itemId, answer, why, item && !isSpeech && answer.trim() ? matchesModel(answer, item.answer) : null, audio, isSpeech ? recording?.rawTranscript : undefined);
    if (item)
      expose(`answer:${item.id}`);
    if (review) {
      const due = s.reviews.find((r) => r.day === s.reviewDay);
      if (!due || !reviewIsDue(due, Date.parse(result.at)))
        throw new Error("Review is not due.");
      due.responseId = result.id;
      due.completedAt = result.at;
      s.reviewDay = null;
      view.overview = true;
    }
    persist();
    draw();
    notify(result.modelMatch === true ? t("Passt zum Modell. Übung gespeichert.", "Matches the model. Practice saved.") : t("Antwort gespeichert. Vergleiche die Zielentscheidung; andere passende Antworten sind möglich.", "Response saved. Compare the target decision; other valid answers are possible."));
  }
  async function handle(action, button) {
    const s = view.session;
    if (view.capturing && !["pause", "stop"].includes(action))
      return;
    if (action === "overview" || action === "save-exit" || action === "leave-review") {
      window.speechSynthesis?.cancel();
      s.reviewDay = null;
      persist();
      view.overview = true;
      draw();
      return;
    }
    if (action === "resume") {
      view.overview = false;
      refreshRecording();
      draw();
      return;
    }
    if (action === "step") {
      moveStep(Number(button.dataset.step));
      return;
    }
    if (action === "previous-step") {
      moveStep(Math.max(1, s.step - 1));
      return;
    }
    if (action === "next-step") {
      if (!completionReady(s, view.lesson)) {
        notify(t("Es fehlen noch Antworten. Speichere sie oder wähle „Später fortsetzen“.", "Some responses are still missing. Save them or choose ‘Continue later’."), true);
        return;
      }
      if (!s.completed.includes(s.step))
        s.completed.push(s.step);
      if (s.step === 7) {
        view.overview = true;
        persist();
        draw();
      } else
        moveStep(s.step + 1);
      return;
    }
    if (action === "skip-step") {
      persist();
      if (s.step === 7) {
        view.overview = true;
        draw();
      } else
        moveStep(s.step + 1);
      return;
    }
    if (action === "hide-model") {
      s.fields[`${fieldKey(s)}:hidden`] = "yes";
      persist();
      draw();
      return;
    }
    if (action === "submit") {
      await submit();
      return;
    }
    if (action === "submit-review") {
      await submit(true);
      return;
    }
    if (action === "next-item" || action === "previous-item") {
      const length = itemsFor(view.lesson, s.step).length;
      s.position = Math.max(0, Math.min(length - 1, s.position + (action === "next-item" ? 1 : -1)));
      persist();
      refreshRecording();
      draw();
      return;
    }
    if (action === "prepare-speak" || action === "retry") {
      if (view.recording)
        s.fields[`${fieldKey(s)}:previous-recording`] = view.recording.id;
      view.recording = undefined;
      s.fields[`${fieldKey(s)}:recording`] = "";
      setMode("speak");
      return;
    }
    if (action === "manual") {
      setMode("feedback");
      return;
    }
    if (action === "record") {
      await startRecording();
      return;
    }
    if (action === "pause") {
      if (view.paused) {
        recorder?.resume();
        view.paused = false;
      } else {
        recorder?.pause();
        view.paused = true;
      }
      draw();
      return;
    }
    if (action === "stop") {
      window.speechSynthesis?.cancel();
      recorder?.stop();
      notify(t("Aufnahme wird gespeichert…", "Saving recording…"));
      return;
    }
    if (action === "listen") {
      speakModel(view.lesson.script);
      return;
    }
    if (action === "listen-one") {
      speakModel([view.lesson.script[Number(button.dataset.index)]]);
      return;
    }
    if (action === "stop-listening") {
      window.speechSynthesis?.cancel();
      return;
    }
    if (action === "shadow-next") {
      if (!s.submissions.some((a) => a.step === 6 && a.itemId === `shadow-${s.shadowStage}`)) {
        notify(t("Speichere zuerst deine Antwort mit Grund.", "Save your answer and reason first."), true);
        return;
      }
      window.speechSynthesis?.cancel();
      s.shadowStage = Math.min(4, s.shadowStage + 1);
      persist();
      refreshRecording();
      draw();
      return;
    }
    if (action === "close-session") {
      if (!s.submissions.some((a) => a.step === 7 && a.itemId === "exit")) {
        notify(t("Speichere zuerst den Abschlusscheck.", "Save the exit check first."), true);
        return;
      }
      if (!s.completed.includes(7))
        s.completed.push(7);
      s.closedAt = new Date().toISOString();
      if (!s.reviews.length)
        s.reviews = scheduleReviews(new Date(s.closedAt), Intl.DateTimeFormat().resolvedOptions().timeZone);
      persist();
      view.overview = true;
      draw();
      notify(t("Gespeichert. Wiederholungen geplant; Beurteilung noch offen.", "Saved. Reviews scheduled; assessment remains pending."));
      return;
    }
    if (action === "review") {
      const day = Number(button.dataset.day), review = s.reviews.find((r) => r.day === day);
      if (!review || !reviewIsDue(review))
        return;
      s.step = 7;
      s.reviewDay = day;
      view.overview = false;
      persist();
      draw();
      return;
    }
    if (action === "confirm" && view.recording) {
      const attempt = confirmTranscript(editTranscript(view.recording, fieldText(`transcript:${view.recording.id}`)));
      await saveAttempt(attempt);
      recordings = recordings.filter((a) => a.id !== attempt.id).concat(attempt);
      view.recording = attempt;
      draw();
      return;
    }
    if (action === "evaluate" && view.recording?.confirmedAt) {
      const original = view.recording;
      notify(t("Text wird geprüft…", "Checking text…"));
      const response = await fetch("/api/conversation/evaluate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: original.editedTranscript, language }),
        signal: AbortSignal.timeout(20000)
      });
      if (!response.ok)
        throw new Error(t("Textprüfung nicht verfügbar. Deine Antwort bleibt gespeichert.", "Text checking unavailable. Your response is still saved."));
      const attempt = attachEvaluation(original, await response.json());
      if (view.recording?.id !== original.id || fieldText(`transcript:${original.id}`) !== original.editedTranscript)
        return;
      await saveAttempt(attempt);
      recordings = recordings.filter((a) => a.id !== attempt.id).concat(attempt);
      view.recording = attempt;
      draw();
      return;
    }
    if (action === "backup") {
      await pendingWrites;
      const backup = await captureCompleteBackup({ storage: localStorage, indexedDB }, language, undefined, [[`${prefix(language)}${s.lessonId}`, JSON.stringify(s)]]);
      const url = URL.createObjectURL(new Blob([JSON.stringify(backup)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `automaticity-${language}-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(t("Sicherung exportiert.", "Backup exported."));
    }
  }
  host.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || operation)
      return;
    operation = true;
    handle(button.dataset.action, button).catch((error) => notify(String(error), true)).finally(() => {
      operation = false;
    });
  });
  host.addEventListener("input", (event) => {
    const field2 = event.target.closest("textarea[data-field]");
    if (!field2)
      return;
    view.session.fields[field2.dataset.field] = field2.value;
    if (field2.dataset.field?.startsWith("transcript:") && view.recording) {
      view.recording = editTranscript(view.recording, field2.value);
      host.querySelector("[data-provider-feedback]")?.remove();
      const frozen = view.recording;
      recordings = recordings.filter((a) => a.id !== frozen.id).concat(frozen);
      pendingWrites = pendingWrites.catch(() => {
        return;
      }).then(() => saveAttempt(frozen));
      pendingWrites.catch((error) => notify(String(error), true));
      host.querySelector('[data-action="evaluate"]')?.setAttribute("disabled", "");
    }
    try {
      persist();
      notify(t("Entwurf gespeichert.", "Draft saved."));
    } catch (error) {
      notify(String(error), true);
    }
  });
  host.addEventListener("change", (event) => {
    const element = event.target, setting = element.dataset.setting;
    if (!setting || view.capturing)
      return;
    try {
      if (setting === "lesson" || setting === "level") {
        persist();
        const selected = lessons.find((l) => setting === "lesson" ? l.worksheet.id === element.value : l.worksheet.level === element.value);
        if (!selected)
          return;
        const session = loadSession(language, selected);
        lesson = selected;
        view.lesson = selected;
        view.session = session;
        view.overview = true;
        refreshRecording();
        persist();
        draw();
        return;
      }
      if (setting === "persian")
        view.session.persian = element.checked;
      if (setting === "rate")
        view.session.rate = Number(element.value);
      if (setting === "seconds")
        view.session.seconds = Number(element.value);
      persist();
      if (setting === "rate") {
        const audio = host.querySelector("[data-recorded-audio]");
        if (audio)
          audio.playbackRate = view.session.rate;
        window.speechSynthesis?.cancel();
      } else
        draw();
    } catch (error) {
      notify(String(error), true);
    }
  });
  async function boot() {
    const session = loadSession(language, lesson);
    const requested = Number(query.get("step"));
    if (requested >= 1 && requested <= 7 && Number.isInteger(requested) && requested !== session.step) {
      session.step = requested;
      session.position = 0;
      session.shadowStage = 0;
    }
    view = {
      session,
      lesson,
      lessons,
      overview: !requested,
      mode: "prepare",
      recording: undefined,
      capturing: false,
      paused: false
    };
    try {
      recordings = (await readStudio(language)).attempts;
    } catch {
      storageWarning = t("Aufnahmespeicher nicht verfügbar. Text und Stift bleiben nutzbar.", "Recording storage unavailable. Text and pen input remain available.");
    }
    refreshRecording();
    persist();
    draw();
  }
  boot().catch((error) => {
    host.replaceChildren();
    const p = document.createElement("p");
    p.textContent = String(error);
    host.append(p);
    const a = document.createElement("a");
    a.href = "/practice";
    a.textContent = t("Daten sichern und wiederherstellen", "Back up and restore data");
    host.append(a);
  });
})();
