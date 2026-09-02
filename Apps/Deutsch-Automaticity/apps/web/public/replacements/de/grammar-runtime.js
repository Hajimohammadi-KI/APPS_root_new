window.GERMAN_GRAMMAR_RUNTIME = true;

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const units = Array.isArray(window.GERMAN_GRAMMAR_UNITS)
    ? window.GERMAN_GRAMMAR_UNITS
    : [];
  const params = new URLSearchParams(window.location.search);
  const progressKey = "deutsch-automaticity:grammar-progress:v3";
  const productionKey = "deutsch-automaticity:grammar-open-responses:v1";
  const learnerStateKey = "GrammarAutomaticityV11_de";
  const dailySessionKey = "deutsch-automaticity:daily-session:v1";
  const dailyContext =
    params.get("from") === "daily"
      ? {
          activity: Number(params.get("activity") || 1),
          topic: params.get("topic") || "",
          level: params.get("level") || "A1",
          returnTo: params.get("return") || "/heute",
        }
      : null;

  let selectedIndex = 0;
  let exerciseIndex = 0;
  let explanationLanguage = "Deutsch";
  let checkingOpenProduction = false;
  let toastTimer;
  let deferredInstallPrompt = null;

  const escapeHtml = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );

  const normalize = (value) =>
    String(value ?? "")
      .trim()
      .toLocaleLowerCase("de-DE")
      .replace(/[.!?,;:]+$/g, "")
      .replace(/\s+/g, " ");

  const readJson = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "") || fallback;
    } catch {
      return fallback;
    }
  };

  const uiCopy = {
    Deutsch: {
      closedEyebrow: "Geschlossene Übung · eindeutig prüfbar",
      openEyebrow: "Freie Produktion · mehrere Antworten möglich",
      closedPlaceholder: "Vollständige Antwort auf Deutsch",
      openPlaceholder: "Schreibe deinen eigenen Text auf Deutsch",
      check: "Antwort prüfen",
      evaluate: "Eigenen Text auswerten",
      checking: "Eigener Text wird geprüft …",
      correct: "Richtig — diese geschlossene Aufgabe ist eindeutig gelöst.",
      expected: "Noch nicht richtig. Eine passende Antwort ist:",
      empty: "Schreibe zuerst deine eigene deutsche Antwort.",
      incomplete: (minimum) =>
        `Schreibe mindestens ${minimum} vollständige${minimum === 1 ? "n Satz" : " Sätze"} auf Deutsch.`,
      aiCorrect: "Sehr gut — deine eigene Formulierung wurde ausgewertet.",
      aiRevision: "Fast richtig — überarbeite gezielt deine eigene Formulierung.",
      selfCheck:
        "Selbstcheck: Dein eigener Text wurde lokal gespeichert und nicht mit dem Modellsatz verglichen. Ohne freigegebene, verbundene KI kann die App nicht jede freie Formulierung zuverlässig korrigieren.",
      inspiration: "Beispiel nur zur Inspiration, nicht als einzige Lösung:",
      dimensions: "Geprüfte Bereiche",
      aiUnavailable:
        "Online-KI ist nicht freigegeben oder nicht verbunden. Deshalb wird keine vollständige Korrektur vorgetäuscht.",
    },
    English: {
      closedEyebrow: "Closed task · objectively checkable",
      openEyebrow: "Open production · many answers are possible",
      closedPlaceholder: "Write the complete answer in German",
      openPlaceholder: "Write your own text in German",
      check: "Check answer",
      evaluate: "Evaluate my own text",
      checking: "Evaluating your own text …",
      correct: "Correct — this closed task has one controlled answer.",
      expected: "Not correct yet. One suitable answer is:",
      empty: "Write your own German answer first.",
      incomplete: (minimum) =>
        `Write at least ${minimum} complete German ${minimum === 1 ? "sentence" : "sentences"}.`,
      aiCorrect: "Very good — your own wording was evaluated.",
      aiRevision: "Almost right — revise your own wording using this feedback.",
      selfCheck:
        "Self-check: Your own text was saved locally and was not compared with the model sentence. Without approved, connected AI, the app cannot reliably correct every open response.",
      inspiration: "Example for inspiration only, not the only answer:",
      dimensions: "Checked dimensions",
      aiUnavailable:
        "Online AI is not approved or connected, so the app does not pretend to provide a complete correction.",
    },
    فارسی: {
      closedEyebrow: "تمرین بسته · دارای پاسخ عینی",
      openEyebrow: "تولید آزاد · پاسخ‌های درست متعدد",
      closedPlaceholder: "پاسخ کامل را به آلمانی بنویس",
      openPlaceholder: "متن خودت را به آلمانی بنویس",
      check: "بررسی پاسخ",
      evaluate: "ارزیابی متن خودم",
      checking: "متن خودت در حال بررسی است…",
      correct: "درست است — این تمرین بسته یک پاسخ کنترل‌شده دارد.",
      expected: "هنوز درست نیست. یک پاسخ مناسب:",
      empty: "ابتدا پاسخ آلمانی خودت را بنویس.",
      incomplete: (minimum) =>
        `حداقل ${minimum} جملهٔ کامل به آلمانی بنویس.`,
      aiCorrect: "بسیار خوب — جمله‌بندی خودت ارزیابی شد.",
      aiRevision: "تقریباً درست است — جمله‌بندی خودت را با این بازخورد اصلاح کن.",
      selfCheck:
        "خودارزیابی: متن خودت به‌صورت محلی ذخیره شد و با جملهٔ نمونه مقایسه نشد. بدون هوش مصنوعیِ متصل و مجاز، اپ نمی‌تواند هر پاسخ آزادی را قابل‌اعتماد تصحیح کند.",
      inspiration: "مثال فقط برای الهام است، نه تنها پاسخ درست:",
      dimensions: "موارد بررسی‌شده",
      aiUnavailable:
        "هوش مصنوعی آنلاین مجاز یا متصل نیست؛ بنابراین اپ وانمود نمی‌کند که تصحیح کامل انجام شده است.",
    },
  };

  const dimensionLabels = {
    Deutsch: {
      meaning: "Bedeutung",
      form: "Form",
      word_order: "Wortstellung",
      use: "Verwendung",
      coherence: "Kohärenz",
      linkage: "Verknüpfung",
      text_function: "Textfunktion",
      register: "Register",
      effect: "Wirkung",
      naturalness: "Natürlichkeit",
    },
    English: {
      meaning: "meaning",
      form: "form",
      word_order: "word order",
      use: "use",
      coherence: "coherence",
      linkage: "linkage",
      text_function: "text function",
      register: "register",
      effect: "effect",
      naturalness: "naturalness",
    },
    فارسی: {
      meaning: "معنا",
      form: "ساختار",
      word_order: "ترتیب واژه‌ها",
      use: "کاربرد",
      coherence: "انسجام",
      linkage: "پیوند متن",
      text_function: "کارکرد متن",
      register: "سبک زبانی",
      effect: "اثر",
      naturalness: "طبیعی‌بودن",
    },
  };

  const activeCopy = () => uiCopy[explanationLanguage] || uiCopy.Deutsch;
  const exerciseMetadata = (exercise) =>
    exercise?.[2] && typeof exercise[2] === "object" ? exercise[2] : null;
  const isOpenProduction = (exercise) =>
    exerciseMetadata(exercise)?.mode === "open_production";
  const localizedExerciseText = (exercise, field, fallback = "") => {
    const localized = exerciseMetadata(exercise)?.[field];
    return localized?.[explanationLanguage] || localized?.Deutsch || fallback;
  };
  const countSentences = (value) =>
    String(value ?? "")
      .split(/(?:[.!?]+|\n+)/u)
      .map((part) => part.trim())
      .filter(Boolean).length;
  const countWords = (value) =>
    String(value ?? "").match(/[\p{Letter}\p{Number}'’-]+/gu)?.length || 0;
  const localizedDimensions = (metadata) => {
    const labels = dimensionLabels[explanationLanguage] || dimensionLabels.Deutsch;
    return (metadata?.feedbackDimensions || [])
      .map((dimension) => labels[dimension] || dimension)
      .join(", ");
  };
  const learnerAllowsOnlineAI = () =>
    readJson(learnerStateKey, {})?.learner?.allowOnlineAI === true;

  const saveOpenResponse = (unit, exercise, response, outcome) => {
    const existing = readJson(productionKey, []);
    const rows = Array.isArray(existing) ? existing : [];
    const metadata = exerciseMetadata(exercise);
    rows.push({
      version: 1,
      level: unit.level,
      topic: unit.title,
      contentType: metadata?.contentType || unit.contentType || "sentence",
      response,
      outcome,
      occurredAt: new Date().toISOString(),
    });
    localStorage.setItem(productionKey, JSON.stringify(rows.slice(-100)));
  };

  const parseAiEvaluation = (text) => {
    const match = String(text ?? "").match(/\{[\s\S]*\}/u);
    if (!match) return null;
    try {
      const value = JSON.parse(match[0]);
      if (
        !value ||
        !["correct", "needs_revision"].includes(value.verdict) ||
        typeof value.targetUsed !== "boolean" ||
        typeof value.complete !== "boolean" ||
        typeof value.correctedGerman !== "string" ||
        typeof value.feedback !== "string" ||
        !Array.isArray(value.issueTypes)
      ) {
        return null;
      }
      return {
        verdict: value.verdict,
        targetUsed: value.targetUsed,
        complete: value.complete,
        correctedGerman: value.correctedGerman.trim(),
        feedback: value.feedback.trim(),
        issueTypes: value.issueTypes.map(String).slice(0, 8),
      };
    } catch {
      return null;
    }
  };

  const requestOpenProductionEvaluation = async (unit, exercise, answer) => {
    if (!learnerAllowsOnlineAI()) return null;
    const metadata = exerciseMetadata(exercise);
    const request = {
      topic: unit.title,
      content: JSON.stringify({
        target: unit.title,
        rule: unit.rule,
        contentType: metadata?.contentType || unit.contentType || "sentence",
        feedbackDimensions: metadata?.feedbackDimensions || [],
        task: localizedExerciseText(exercise, "prompt", exercise[0]),
        inspirationOnly: exercise[1],
      }),
      learnerInput: answer,
      language: explanationLanguage,
      purpose: "grammar-evaluation",
    };

    try {
      if (window.studyAI?.status && window.studyAI?.explain) {
        const status = await window.studyAI.status();
        if (!status?.connected) return null;
        const result = await window.studyAI.explain(request);
        const evaluation = parseAiEvaluation(result?.text);
        return evaluation
          ? {
              evaluation,
              source: `${result.providerLabel || "AI"} · ${result.model || "connected"}`,
            }
          : null;
      }

      const statusResponse = await fetch("/api/ai", { cache: "no-store" });
      if (!statusResponse.ok) return null;
      const status = await statusResponse.json();
      if (!status?.connected) return null;
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) return null;
      const result = await response.json();
      const evaluation = parseAiEvaluation(result?.text);
      return evaluation
        ? {
            evaluation,
            source: `${result.providerLabel || "AI"} · ${result.model || "connected"}`,
          }
        : null;
    } catch {
      return null;
    }
  };

  const localEsGibtFeedback = (answer) => {
    const normalizedAnswer = normalize(answer);
    if (/\bin meiner stadt viele parks\b/u.test(normalizedAnswer)) {
      return {
        corrected: "In meiner Stadt gibt es viele Parks.",
        message: {
          Deutsch:
            "Deine Idee ist klar, aber das Verb fehlt. Verwende „es gibt“.",
          English:
            "Your idea is clear, but the verb is missing. Use “es gibt”.",
          فارسی:
            "منظورت روشن است، اما فعل در جمله نیست. از «es gibt» استفاده کن.",
        },
      };
    }
    if (/\bes gibt ein supermarkt\b/u.test(normalizedAnswer)) {
      return {
        corrected: "In meiner Straße gibt es einen Supermarkt.",
        message: {
          Deutsch:
            "Fast richtig. „Supermarkt“ ist maskulin. Nach „es gibt“ steht Akkusativ: ein Supermarkt → einen Supermarkt.",
          English:
            "Almost right. “Supermarkt” is masculine. After “es gibt”, use the accusative: ein Supermarkt → einen Supermarkt.",
          فارسی:
            "تقریباً درست است. «Supermarkt» مذکر است و بعد از «es gibt» حالت Akkusativ می‌آید: ein Supermarkt → einen Supermarkt.",
        },
      };
    }
    if (!/\b(?:es gibt|gibt es)\b/u.test(normalizedAnswer)) {
      return {
        corrected: "",
        message: {
          Deutsch: "Verwende die Zielstruktur „es gibt“ in deinem Satz.",
          English: "Use the target structure “es gibt” in your sentence.",
          فارسی: "ساختار هدف «es gibt» را در جمله‌ات به‌کار ببر.",
        },
      };
    }
    return null;
  };

  const progress = readJson(progressKey, {});
  const unitKey = (unit) => `${unit.level}:${unit.title}`;
  const completedFor = (unit) => progress[unitKey(unit)] || [];
  const saveProgress = () => localStorage.setItem(progressKey, JSON.stringify(progress));

  const notify = (message) => {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const setDrawer = (open) => {
    const sidebar = $("#sidebar");
    const scrim = $("#scrim");
    const menuButton = $("#menuBtn");
    if (!sidebar || !scrim || !menuButton) return;
    sidebar.classList.toggle("open", open);
    scrim.classList.toggle("show", open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  const deriveGoal = (unit) =>
    `Ich kann ${unit.title} in verständlichen, eigenen Sätzen passend verwenden.`;

  const renderCardBody = (items, fallback) => {
    if (Array.isArray(items) && items.length) {
      return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    }
    return `<p>${escapeHtml(fallback || "")}</p>`;
  };

  const renderRule = (unit) => {
    const explanation = unit.explanation || {};
    const cards = [
      ["Bedeutung", renderCardBody(null, explanation.overview || unit.rule)],
      ["Form bilden", renderCardBody(explanation.formation, unit.rule)],
      ["Verwendung", renderCardBody(explanation.usage, unit.rule)],
      ["Satzstellung", renderCardBody(explanation.wordOrder, unit.rule)],
      ["Transfer", renderCardBody(null, explanation.memoryTip || unit.transferTest)],
    ];
    $("#ruleBody").innerHTML = `
      <p class="rule-intro">${escapeHtml(unit.rule)}</p>
      <div class="pattern-grid">
        ${cards
          .map(
            ([title, body], index) => `
              <article class="pattern-card">
                <div class="pattern-title"><span class="mini-icon">${index + 1}</span>${escapeHtml(title)}</div>
                ${body}
              </article>`,
          )
          .join("")}
      </div>`;
  };

  const currentUnit = () => units[selectedIndex];

  const isRecitationExercise = (unit, exercise) =>
    !exerciseMetadata(exercise) &&
    Boolean(unit?.recallTest) &&
    exercise?.[1] === unit.recallTest;

  const renderExercise = () => {
    const unit = currentUnit();
    if (!unit) return;
    const exercises = Array.isArray(unit.exercises) && unit.exercises.length
      ? unit.exercises
      : [[unit.recallTest || `Bilde einen Satz mit ${unit.title}.`, unit.testAnswer || unit.examples?.[0] || ""]];
    exerciseIndex = Math.max(0, Math.min(exerciseIndex, exercises.length - 1));
    const exercise = exercises[exerciseIndex];
    const open = isOpenProduction(exercise);
    const copy = activeCopy();
    $("#exercisePrompt").textContent = localizedExerciseText(
      exercise,
      "prompt",
      exercise[0],
    );
    $("#exerciseEyebrow").textContent = open
      ? copy.openEyebrow
      : isRecitationExercise(unit, exercise)
        ? "Freie Erklärung – vergleiche danach mit der Regel"
        : copy.closedEyebrow;
    const answerInput = $("#answerInput");
    answerInput.value = "";
    answerInput.placeholder = open
      ? copy.openPlaceholder
      : copy.closedPlaceholder;
    const checkButton = $("#checkBtn");
    checkButton.textContent = open ? copy.evaluate : copy.check;
    checkButton.disabled = checkingOpenProduction;
    checkButton.setAttribute("aria-busy", String(checkingOpenProduction));
    const feedback = $("#feedback");
    feedback.textContent = "";
    feedback.className = "feedback";
    $("#previousBtn").disabled = checkingOpenProduction || exerciseIndex === 0;
    $("#nextBtn").disabled =
      checkingOpenProduction || exerciseIndex === exercises.length - 1;
  };

  const renderLesson = () => {
    const unit = currentUnit();
    if (!unit) return;
    const completed = completedFor(unit).length;
    const total = Math.max(1, unit.exercises?.length || 1);
    $("#lessonTitle").textContent = unit.title;
    $(".crumbs .badge").textContent = unit.level;
    $(".crumbs .foundations").textContent = `${completed}/${total} Übungen`;
    $("#canDoGoal").textContent = deriveGoal(unit);
    $("#examplesContent").innerHTML = `
      <p><strong>Vergleiche die Modelle:</strong></p>
      <ul>${(unit.examples || []).map((example) => `<li>${escapeHtml(example)}</li>`).join("")}</ul>
      <p><strong>Abruf:</strong> ${escapeHtml(unit.recallTest || "Erkläre die Regel ohne nachzusehen.")}</p>`;
    $("#mistakeContent").innerHTML = `
      <p>${escapeHtml(unit.commonError || "Prüfe Form, Bedeutung und Satzstellung.")}</p>
      <p><strong>Reparatur:</strong> ${escapeHtml(unit.repairTest || "Korrigiere den Fehler und erkläre die Änderung.")}</p>`;
    $("#pathContent").innerHTML = `
      <ol>
        <li>Rufe die Regel ab: <strong>${escapeHtml(unit.rule)}</strong></li>
        <li>Korrigiere diesen Fehler: „${escapeHtml(unit.commonError || unit.repairTest || "")}“</li>
        <li>Sprich den korrigierten Satz laut.</li>
        <li>Verwende ${escapeHtml(unit.title)} danach in einem eigenen, wahren Satz.</li>
      </ol>`;
    const extraModel = (unit.examples || [])[1] || (unit.examples || [])[0] || unit.rule;
    $("#resourcesContent").innerHTML = `
      <p><strong>Zusätzliche freie Übung; das Beispiel dient nur als Inspiration:</strong></p>
      <ol>
        <li>Schreibe einen anderen, eigenen Satz zum Ziel: „${escapeHtml(extraModel)}“</li>
        <li>Verwandle deinen Satz in eine Verneinung.</li>
        <li>Verwandle deinen Satz in eine Frage.</li>
      </ol>
      <p>Oben im Abrufbereich stehen dir außerdem ${(unit.exercises || []).length || 1} geführte Aufgaben zu ${escapeHtml(unit.title)} zur Verfügung.</p>`;
    renderRule(unit);
    exerciseIndex = 0;
    renderExercise();
    renderCatalog();
    history.replaceState(
      null,
      "",
      `${location.pathname}?topic=${encodeURIComponent(unit.title)}${dailyContext ? `&from=daily&activity=${dailyContext.activity}&level=${encodeURIComponent(dailyContext.level)}&return=${encodeURIComponent(dailyContext.returnTo)}` : ""}`,
    );
  };

  const renderCatalog = (query = $("#topicSearch")?.value || "") => {
    const list = $("#levelList");
    if (!list) return;
    const needle = normalize(query);
    list.innerHTML = levels
      .map((level) => {
        const levelUnits = units
          .map((unit, index) => ({ unit, index }))
          .filter(({ unit }) => unit.level === level)
          .filter(({ unit }) => !needle || normalize(`${unit.title} ${unit.rule}`).includes(needle));
        if (!levelUnits.length) return "";
        const done = levelUnits.reduce((sum, { unit }) => sum + completedFor(unit).length, 0);
        const total = levelUnits.reduce((sum, { unit }) => sum + Math.max(1, unit.exercises?.length || 1), 0);
        const selectedInLevel = levelUnits.some(({ index }) => index === selectedIndex);
        return `
          <details class="level" ${selectedInLevel || needle ? "open" : ""}>
            <summary>
              <span class="level-tag ${level.toLowerCase()}">${level} · GER</span>
              <span>${levelUnits.length} Themen <small class="catalog-progress">${done}/${total} Übungen erledigt</small></span>
            </summary>
            <div class="topic-list">
              ${levelUnits
                .map(({ unit, index }) => {
                  const unitDone = completedFor(unit).length;
                  const unitTotal = Math.max(1, unit.exercises?.length || 1);
                  return `
                    <button class="topic ${index === selectedIndex ? "active" : ""}" type="button" data-index="${index}">
                      <span class="topic-dot"></span>
                      <span>${escapeHtml(unit.title)}</span>
                      <span class="topic-count">${unitDone}/${unitTotal}</span>
                    </button>`;
                })
                .join("")}
            </div>
          </details>`;
      })
      .join("");
    $$(".topic", list).forEach((button) => {
      button.addEventListener("click", () => {
        selectedIndex = Number(button.dataset.index);
        renderLesson();
        if (window.innerWidth <= 620) $(".content")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const markDailyComplete = () => {
    if (!dailyContext) return;
    const session = readJson(dailySessionKey, {});
    const completedActivities = [
      ...new Set([...(session.completedActivities || []), dailyContext.activity]),
    ];
    localStorage.setItem(
      dailySessionKey,
      JSON.stringify({
        ...session,
        currentActivity: dailyContext.activity,
        completedActivities,
        updatedAt: new Date().toISOString(),
      }),
    );
    $("#dailyCompleteDialog")?.showModal();
  };

  const markExerciseComplete = (unit) => {
    const key = unitKey(unit);
    progress[key] = [...new Set([...(progress[key] || []), exerciseIndex])];
    saveProgress();
    renderCatalog();
    if (progress[key].length === unit.exercises.length) markDailyComplete();
    return progress[key].length;
  };

  const checkAnswer = async () => {
    if (checkingOpenProduction) return;
    const unit = currentUnit();
    if (!unit) return;
    const exercise = unit.exercises?.[exerciseIndex] || [unit.recallTest, unit.testAnswer];
    const answer = $("#answerInput").value.trim();
    const expected = exercise[1] || unit.testAnswer || unit.examples?.[0] || "";
    const metadata = exerciseMetadata(exercise);
    const feedback = $("#feedback");
    const copy = activeCopy();

    if (isOpenProduction(exercise)) {
      const minimumSentences = Math.max(1, metadata?.minimumSentences || 1);
      if (!answer) {
        feedback.className = "feedback show bad";
        feedback.textContent = copy.empty;
        return;
      }
      if (countSentences(answer) < minimumSentences || countWords(answer) < 4) {
        feedback.className = "feedback show bad";
        feedback.textContent = copy.incomplete(minimumSentences);
        return;
      }

      if (unit.title === "es gibt mit Akkusativ") {
        const localIssue = localEsGibtFeedback(answer);
        if (localIssue) {
          const message =
            localIssue.message[explanationLanguage] || localIssue.message.Deutsch;
          feedback.className = "feedback show bad";
          feedback.innerHTML = `<strong>${escapeHtml(message)}</strong>${
            localIssue.corrected
              ? `<br><span>${escapeHtml(localIssue.corrected)}</span>`
              : ""
          }`;
          saveOpenResponse(unit, exercise, answer, "local-revision");
          return;
        }
      }

      const evaluationContext = {
        unit: unitKey(unit),
        exerciseIndex,
        language: explanationLanguage,
      };
      checkingOpenProduction = true;
      const checkButton = $("#checkBtn");
      checkButton.disabled = true;
      checkButton.setAttribute("aria-busy", "true");
      checkButton.textContent = copy.checking;
      $("#previousBtn").disabled = true;
      $("#nextBtn").disabled = true;
      const result = await requestOpenProductionEvaluation(unit, exercise, answer);
      checkingOpenProduction = false;
      if (
        unitKey(currentUnit()) !== evaluationContext.unit ||
        exerciseIndex !== evaluationContext.exerciseIndex ||
        explanationLanguage !== evaluationContext.language
      ) {
        renderExercise();
        return;
      }
      checkButton.disabled = false;
      checkButton.setAttribute("aria-busy", "false");
      checkButton.textContent = copy.evaluate;
      $("#previousBtn").disabled = exerciseIndex === 0;
      $("#nextBtn").disabled = exerciseIndex === unit.exercises.length - 1;

      if (!result) {
        const completed = markExerciseComplete(unit);
        feedback.className = "feedback show";
        feedback.innerHTML = `<strong>${escapeHtml(copy.selfCheck)}</strong><br><span>${escapeHtml(copy.aiUnavailable)}</span><br><span>${escapeHtml(copy.inspiration)} ${escapeHtml(expected)}</span><br><span>${escapeHtml(copy.dimensions)}: ${escapeHtml(localizedDimensions(metadata))}</span>`;
        saveOpenResponse(unit, exercise, answer, "self-check");
        notify(`${completed}/${unit.exercises.length}`);
        return;
      }

      const { evaluation, source } = result;
      const accepted =
        evaluation.verdict === "correct" &&
        evaluation.targetUsed &&
        evaluation.complete;
      feedback.className = `feedback show ${accepted ? "good" : "bad"}`;
      feedback.innerHTML = `<strong>${escapeHtml(accepted ? copy.aiCorrect : copy.aiRevision)}</strong><br><span>${escapeHtml(evaluation.feedback)}</span>${
        evaluation.correctedGerman &&
        normalize(evaluation.correctedGerman) !== normalize(answer)
          ? `<br><span>${escapeHtml(evaluation.correctedGerman)}</span>`
          : ""
      }<br><small>${escapeHtml(source)} · ${escapeHtml(copy.dimensions)}: ${escapeHtml(localizedDimensions(metadata))}</small>`;
      saveOpenResponse(
        unit,
        exercise,
        answer,
        accepted ? "ai-accepted" : "ai-revision",
      );
      if (accepted) markExerciseComplete(unit);
      return;
    }

    const recitation = isRecitationExercise(unit, exercise);
    const correct = recitation ? answer.trim().length > 0 : normalize(answer) === normalize(expected);
    feedback.className = `feedback show ${correct ? "good" : "bad"}`;
    if (recitation) {
      if (!correct) {
        feedback.innerHTML = `Schreibe zuerst deine eigene Erklärung, bevor du vergleichst.`;
        return;
      }
      feedback.innerHTML = `<strong>Die Regel zum Vergleich:</strong> ${escapeHtml(expected)}<br><span>Es gibt hier keine einzig richtige Formulierung – vergleiche nur Bedeutung und Vollständigkeit.</span>`;
    } else if (!correct) {
      feedback.innerHTML = `${escapeHtml(copy.expected)} <strong>${escapeHtml(expected)}</strong><br><span>${escapeHtml(copy.dimensions)}: ${escapeHtml(localizedDimensions(metadata))}</span>`;
      return;
    }
    const completed = markExerciseComplete(unit);
    if (!recitation) {
      feedback.textContent = `${copy.correct} ${completed}/${unit.exercises.length}`;
    }
  };

  const speak = (text, language = explanationLanguage) => {
    if (!("speechSynthesis" in window)) {
      notify("Vorlesen wird in diesem Browser nicht unterstützt.");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      language === "English" ? "en-US" : language === "فارسی" ? "fa-IR" : "de-DE";
    speechSynthesis.speak(utterance);
  };

  const languageGuides = {
    Deutsch: {
      dir: "ltr",
      html: "<strong>So arbeitest du:</strong> Geschlossene Aufgaben haben eine eindeutig prüfbare Antwort. In freien Aufgaben formulierst du selbst auf Deutsch; das Beispiel ist nur Inspiration. Ohne freigegebene, verbundene KI zeigt die App einen ehrlichen Selbstcheck statt einer vorgetäuschten Korrektur.",
    },
    English: {
      dir: "ltr",
      html: "<strong>How to work:</strong> Closed tasks have an objectively checkable answer. In open tasks, create your own German response; the example is inspiration only. Without approved, connected AI, the app provides an honest self-check instead of pretending to correct every response.",
    },
    "فارسی": {
      dir: "rtl",
      html: "<strong>روش انجام تمرین:</strong> تمرین بسته پاسخ عینی و قابل‌بررسی دارد. در تمرین باز، پاسخ متفاوت و واقعی خودت را به آلمانی می‌سازی و مثال فقط برای الهام است. بدون هوش مصنوعیِ متصل و مجاز، اپ به‌جای تصحیح ساختگی یک خودارزیابی صادقانه نشان می‌دهد.",
    },
  };

  const setupLearningControls = () => {
    const selectedTime = localStorage.getItem("deutsch-automaticity:study-time") || "15";
    const selectedLanguage = localStorage.getItem("deutsch-automaticity:explanation-language") || "Deutsch";
    const renderTime = (value) => {
      $("#timeSummary").textContent = `${value} Minuten`;
      $("#timeChoices").innerHTML = [10, 15, 20, 25, 30, 40, 50, 60]
        .map((time) => `<button type="button" class="learning-choice ${String(time) === String(value) ? "active" : ""}" data-time="${time}">${time} Min.</button>`)
        .join("");
      $$("[data-time]").forEach((button) => button.addEventListener("click", () => {
        localStorage.setItem("deutsch-automaticity:study-time", button.dataset.time);
        renderTime(button.dataset.time);
      }));
    };
    const renderLanguage = (value) => {
      explanationLanguage = languageGuides[value] ? value : "Deutsch";
      const guide = languageGuides[explanationLanguage];
      $("#languageSummary").textContent = explanationLanguage;
      $("#honovrGuide").dir = guide.dir;
      $("#honovrGuide").innerHTML = guide.html;
      $("#languageChoices").innerHTML = Object.keys(languageGuides)
        .map((language) => `<button type="button" class="learning-choice ${language === explanationLanguage ? "active" : ""}" data-language="${language}">${language}</button>`)
        .join("");
      $$("[data-language]").forEach((button) => button.addEventListener("click", () => {
        localStorage.setItem("deutsch-automaticity:explanation-language", button.dataset.language);
        renderLanguage(button.dataset.language);
        renderExercise();
      }));
    };
    renderTime(selectedTime);
    renderLanguage(selectedLanguage);
  };

  const setup = () => {
    if (!units.length) {
      $("#levelList").innerHTML = '<p role="alert">Der vollständige Grammatikkatalog konnte nicht geladen werden.</p>';
      $("#unitCount").textContent = "0";
      return;
    }

    $("#unitCount").textContent = String(units.length);
    const requestedTopic = dailyContext?.topic || params.get("topic") || "";
    const requestedIndex = units.findIndex((unit) => normalize(unit.title) === normalize(requestedTopic));
    const requestedLevelIndex = units.findIndex((unit) => unit.level === (dailyContext?.level || params.get("level")));
    selectedIndex = requestedIndex >= 0 ? requestedIndex : requestedLevelIndex >= 0 ? requestedLevelIndex : 0;

    $("#menuBtn")?.addEventListener("click", () => setDrawer(!$("#sidebar").classList.contains("open")));
    $("#scrim")?.addEventListener("click", () => setDrawer(false));
    document.addEventListener("keydown", (event) => event.key === "Escape" && setDrawer(false));
    $("#topicSearch")?.addEventListener("input", (event) => renderCatalog(event.target.value));
    $("#checkBtn")?.addEventListener("click", checkAnswer);
    $("#answerInput")?.addEventListener("keydown", (event) => event.key === "Enter" && checkAnswer());
    $("#previousBtn")?.addEventListener("click", () => { exerciseIndex -= 1; renderExercise(); });
    $("#nextBtn")?.addEventListener("click", () => { exerciseIndex += 1; renderExercise(); });
    $("#hintBtn")?.addEventListener("click", () => {
      const unit = currentUnit();
      const exercise = unit?.exercises?.[exerciseIndex];
      const hint = localizedExerciseText(
        exercise,
        "hint",
        unit?.explanation?.memoryTip || unit?.rule || "Prüfe das Lernziel.",
      );
      const feedback = $("#feedback");
      feedback.className = "feedback show";
      feedback.textContent = hint;
      notify(hint);
    });
    $("#audioBtn")?.addEventListener("click", () => speak($("#exercisePrompt").textContent));
    $("[data-action='use-today']")?.addEventListener("click", () => {
      const unit = currentUnit();
      localStorage.setItem("deutsch-automaticity:today-grammar", JSON.stringify({ level: unit.level, topic: unit.title, updatedAt: new Date().toISOString() }));
      location.href = `/heute?from=grammar&level=${encodeURIComponent(unit.level)}&topic=${encodeURIComponent(unit.title)}`;
    });
    $("[data-action='help']")?.addEventListener("click", () => notify("Wähle links ein Niveau und ein Thema. Bearbeite danach die Aufgaben der Reihe nach."));
    $("[data-action='install']")?.addEventListener("click", async () => {
      if (!deferredInstallPrompt) {
        notify("Nutze im Browser-Menü „App installieren“, wenn die Schaltfläche angeboten wird.");
        return;
      }
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
    });
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
    });

    const rulerButton = $("#rulerBtn");
    const ruler = $("#readingRuler");
    rulerButton?.addEventListener("click", () => {
      const active = !document.body.classList.contains("ruler-active");
      document.body.classList.toggle("ruler-active", active);
      rulerButton.setAttribute("aria-pressed", String(active));
      ruler?.setAttribute("aria-hidden", String(!active));
    });
    document.addEventListener("pointermove", (event) => {
      if (document.body.classList.contains("ruler-active") && ruler) ruler.style.top = `${event.clientY - 18}px`;
    });

    $("#dailyReturnBtn")?.addEventListener("click", () => { location.href = dailyContext?.returnTo || "/heute"; });
    $("#dailyRepeatBtn")?.addEventListener("click", () => { $("#dailyCompleteDialog")?.close(); exerciseIndex = 0; renderExercise(); });
    $("#dailyMistakesBtn")?.addEventListener("click", () => { location.href = "/fehler"; });

    setupLearningControls();
    renderLesson();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
  else setup();
})();
