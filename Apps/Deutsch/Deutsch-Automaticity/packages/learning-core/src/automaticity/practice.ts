import {
  type AttemptEvent,
  type Language,
  type Modality,
  type Stage,
  isRecord,
} from "./contracts";
import {
  type ConstructionUnit,
  type CurriculumPack,
  type PracticeTask,
  GRAMMAR_FAMILIES,
  validateCurriculum,
  activePracticeTasks,
} from "./curriculum";
import {
  appendAutomaticityEvent,
  readAutomaticityEvents,
  sessionKey,
} from "./storage";
import { preserveLegacyStateDurable } from "./migration";
import { mountReviewPanel } from "./review-panel";
import { initializeStaffWorkspace } from "./staff-interface";
import {
  appendLearnerFeedbackPanel,
  pausedTaskIds,
} from "./learner-feedback-panel";
import { reduceAutomaticityEvents } from "./evidence";
import { assessControlledTask } from "./assessment";
import { learningCycleTask } from "./learning-cycle";
import { markedAnswer } from "./answer-alignment";
import { PERSIAN_PRACTICE_GUIDE } from "./app-usage-guide";
import {
  collectAssessmentFeedback,
  guardAssessmentWithFeedback,
  persistFeedbackAssessment,
} from "./assessment-feedback";
import { createTransformerClient } from "./transformer-client";
import { RecordingCapture } from "./recording-capture";
import { requestMicrophone } from "./microphone-request";
import { responseExposure } from "./response-exposure";
import {
  captureCompleteBackup,
  recoverBeforeMount,
  restoreCompleteBackup,
  sha256,
  validateCompleteBackup,
} from "./backup";
import {
  readRecording,
  ResponseTimer,
  storeRecording,
  type StoredRecording,
} from "./media";
import {
  isCheckedTask,
  selectDailyFocus,
  selectDailyTask,
  shouldResumeSavedPractice,
  repairTaskForAttempt,
} from "./selector";
import {
  hasUnfinishedPractice,
  parseSavedPracticeSession,
  preparePracticeSession,
  type PracticeSession as Session,
} from "./practice-session";
import {
  loadDailyPlan,
  saveDailyPlan,
  dailyResponseCount,
  RESPONSE_GOALS,
  type DailyPracticePlan,
} from "./daily-plan";
import { syncLegacyPractice } from "./legacy";
import {
  prepareLearnerRepair,
  practiceFeedbackCategory,
} from "./repair-session";
import {
  resolveLearningPath,
  saveLearningPathChoice,
  type LearningPathRequest,
} from "./learning-path";
import { promptTextParts } from "./prompt-text";
import { disablePracticeControls } from "./practice-controls";
import { LEARNING_TARGET, learningTarget } from "./learning-target";
import {
  mountSupportLanguageGuide,
  readSupportLanguage,
} from "./support-language.js";
import {
  persianCycleGoals,
  persianStageAction,
  persianStageLabel,
  persianTaskSteps,
} from "./persian-task-guide.js";
import {
  grammarFeedbackAssessment,
  parseGrammarFeedback,
} from "./grammar-feedback";
import {
  loadSchedulerPilot,
  mountSchedulerPilotPanel,
} from "./scheduler-pilot-panel";
import {
  outsidePilotPack,
  schedulerPilotCards,
  readPilotEnrollment,
} from "./scheduler-pilot";
import {
  isNotebookTask,
  notebookCopy,
  notebookProgress,
  RECENT_GERMAN_NOTEBOOK_VERSION,
} from "./notebook-practice";

const stages: Stage[] = [
  "notice",
  "retrieve",
  "vary",
  "produce",
  "repair",
  "transfer",
  "retain",
];
const now = () => new Date().toISOString();
const id = () => crypto.randomUUID();
const qualifiedTransformer = createTransformerClient();
/** Progress counters, provenance and counting rules belong to the staff report. */
export function notebookCardLines(
  language: Language,
  level: string,
  atLevel: { passed: number; total: number },
  all: { passed: number; total: number },
  staff = false,
): readonly string[] {
  const copy = notebookCopy(language);
  return staff
    ? [copy.progress(level, atLevel, all), copy.source, copy.progressBasis]
    : [];
}
function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text?: string,
  className?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function appendPromptParts(
  prompt: HTMLElement,
  text: string,
  language: Language,
) {
  prompt.lang = language;
  prompt.dir = "ltr";
  for (const part of promptTextParts(text, language)) {
    if (part.breakBefore) prompt.append(document.createElement("br"));
    const segment = element("span", part.text, "prompt-segment");
    segment.lang = part.lang;
    segment.dir = part.dir;
    prompt.append(segment);
  }
}
/** The check's sentence and, when it names differences, the learner's own
 * answer with those words marked; several differences are listed on request.
 * A closed answer that did not pass also gets the unit's rule; every attempt
 * already records an example exposure, so showing it adds no help. */
function showAssessmentFeedback(
  target: HTMLElement,
  feedback: string,
  response: string,
  spans: readonly { start: number; end: number; explanation: string }[],
  language: "en" | "de",
  rule?: string,
): void {
  target.replaceChildren(element("p", feedback));
  if (rule) {
    const line = element("p", undefined, "answer-rule");
    line.lang = language;
    line.dir = "ltr";
    line.append(
      element("strong", language === "en" ? "Rule: " : "Regel: "),
      rule,
    );
    target.append(line);
  }
  if (!spans.length || !response) return;
  const answer = element("p", undefined, "answer-diff");
  answer.lang = language;
  answer.dir = "ltr";
  answer.append(
    element(
      "span",
      language === "en" ? "Your answer: " : "Deine Antwort: ",
      "answer-diff-label",
    ),
  );
  for (const part of markedAnswer(response, spans)) {
    if (part.note === undefined) {
      answer.append(part.text);
      continue;
    }
    const mark = element(
      "mark",
      part.text || "‸",
      part.text ? undefined : "answer-gap",
    );
    mark.title = part.note;
    answer.append(mark);
  }
  target.append(answer);
  if (spans.length < 2) return;
  const notes = element("details", undefined, "answer-diff-notes");
  notes.append(
    element("summary", language === "en" ? "What differs" : "Was abweicht"),
    ...spans.slice(0, 8).map((span) => element("p", span.explanation)),
  );
  target.append(notes);
}
function button(
  label: string,
  action: () => void | Promise<void>,
  className = "",
): HTMLButtonElement {
  const node = element("button", label, className);
  node.type = "button";
  node.addEventListener("click", () => {
    void Promise.resolve()
      .then(action)
      .catch((error) =>
        window.dispatchEvent(
          new CustomEvent("practice-error", { detail: error }),
        ),
      );
  });
  return node;
}
function download(name: string, data: unknown): void {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  const anchor = element("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** One shared learner route; language content and stored evidence remain separate. */
export async function mountPractice(
  root: HTMLElement,
  language: Language,
): Promise<void> {
  const en = language === "en",
    t = (english: string, german: string) => (en ? english : german);
  const f = (persian: string, english: string, german: string) =>
    readSupportLanguage(language) === "fa" ? persian : t(english, german);
  const staffRole = await initializeStaffWorkspace();
  const persistence = { storage: localStorage, indexedDB };
  await recoverBeforeMount(persistence, language);
  await preserveLegacyStateDurable(persistence, language, now());
  const response = await fetch(`/learning-core/curriculum-${language}.json`);
  if (!response.ok)
    throw new Error(
      t(
        "The grammar catalog could not be loaded.",
        "Der Grammatikkatalog konnte nicht geladen werden.",
      ),
    );
  const pack = (await response.json()) as CurriculumPack;
  if (
    pack.language !== language ||
    !Array.isArray(pack.units) ||
    validateCurriculum(pack).length
  )
    throw new Error("Invalid curriculum");
  const unitById = new Map(pack.units.map((unit) => [unit.id, unit]));
  const pilot = await loadSchedulerPilot(pack, localStorage);
  const recommendationPack = () =>
    pilot
      ? outsidePilotPack(
          pack,
          schedulerPilotCards(
            pilot.plan,
            readPilotEnrollment(localStorage, pilot.plan, pilot.sha256),
            readAutomaticityEvents(localStorage, language).events,
            now(),
          ),
        )
      : pack;
  let refreshPilot = () => {};
  await syncLegacyPractice(localStorage, language, pack, now());
  const taskById = new Map(
    pack.units.flatMap((unit) =>
      unit.tasks.map((task) => [task.id, task] as const),
    ),
  );
  const settingKey = `automaticity:v2:${language}:level`;
  const requested = new URLSearchParams(location.search);
  const learningPathLaunch = requested.get("from") === "learning-path";
  const pathRequest: LearningPathRequest = {};
  for (const key of ["level", "topic"] as const) {
    const value = requested.get(key);
    if (value) pathRequest[key] = value;
  }
  const requestedId = requested.get("task");
  if (requestedId) pathRequest.taskId = requestedId;
  const initialChoice = resolveLearningPath(
    pack,
    localStorage,
    now(),
    pathRequest,
    recommendationPack(),
  );
  let level = initialChoice?.level ?? pathRequest.level ?? "A1";
  if (!pack.units.some((row) => row.level === level)) level = "A1";
  const timingKey = `automaticity:v2:${language}:timing`;
  let timingEnabled = localStorage.getItem(timingKey) !== "off";
  const repairRequestId = requested.get("repairOf");
  const requestedUnit = pack.units.find(
    (row) =>
      row.title === requested.get("topic") &&
      (!requested.get("level") || row.level === requested.get("level")),
  );
  const initialState = reduceAutomaticityEvents(
    readAutomaticityEvents(localStorage, language).events,
    language,
    now(),
  );
  let unit: ConstructionUnit =
    initialChoice?.unit ?? requestedUnit ?? pack.units[0]!;
  let task: PracticeTask =
    initialChoice?.task ??
    selectDailyTask(unit, initialState, now()).task ??
    activePracticeTasks(unit).find(
      (row) =>
        row.stage === "retrieve" &&
        row.modality === "writing" &&
        row.partition === "practice",
    ) ??
    activePracticeTasks(unit).find((row) => row.partition === "practice")!;
  const requestedTask = taskById.get(requested.get("task") ?? "");
  const recentNotebook =
    language === "de" &&
    requested.get("notebook") === RECENT_GERMAN_NOTEBOOK_VERSION;
  // ?notebook=1 opens the next item from the learner's error notebook, of the
  // requested grammar level (&level=B1) while that level has one left.
  const notebookStart =
    requested.has("notebook") && !requestedTask
      ? (notebookProgress(pack, initialState.attempts, {
          ...(recentNotebook
            ? { sourceVersion: RECENT_GERMAN_NOTEBOOK_VERSION }
            : { level: requested.get("level") ?? undefined }),
        }).next ??
        (recentNotebook
          ? null
          : notebookProgress(pack, initialState.attempts).next))
      : null;
  if (requestedTask) {
    task = requestedTask;
    unit = unitById.get(task.constructionId)!;
  } else if (notebookStart) {
    task = notebookStart.task;
    unit = notebookStart.unit;
    level = unit.level;
  }
  // The main path offers only checked writing; it never falls back to
  // unassessed practice. Explicit task links still open optional work.
  let checkedUnavailable =
    !requestedTask && !requestedUnit && !notebookStart && !initialChoice?.task;
  let session: Session;
  let timer: ResponseTimer | null = null;
  let recording: StoredRecording | null = null;
  let recorder: MediaRecorder | null = null,
    stream: MediaStream | null = null,
    audioUrl: string | null = null;
  let stopRecording: (() => void) | null = null;
  let microphoneRequest: AbortController | null = null;
  let busy = false,
    recordingPending = false;
  let lockRelease: (() => void) | null = null;
  let editing = true;
  const feedback = element("div", "", "feedback");
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  const errorBox = element("p", "", "error");
  errorBox.id = "practice-error";
  errorBox.setAttribute("role", "alert");
  const taskPanel = element("section", undefined, "card task-panel");
  const languageGuideHost = element(
    "div",
    undefined,
    "practice-language-guide",
  );
  const languageGuide = mountSupportLanguageGuide(languageGuideHost, language, {
    stage: task.stage,
    constructionId: unit.id,
    familyId: unit.familyIds[0],
  });
  const progressPanel = element("section", undefined, "card");
  const focusPanel = element("div", undefined, "focus-list");
  const notebookPanel = element("section", undefined, "card practice-notebook");
  const dailyPanel = element("div", undefined, "daily-plan");
  const historyPanel = element("section", undefined, "card");
  const controls = element("div", undefined, "toolbar");
  const writeError = (error: unknown) => {
    errorBox.textContent =
      error instanceof Error && error.name === "QuotaExceededError"
        ? t(
            "Storage is full. Keep this tab open and copy any unsaved response. Export a backup below before freeing space, then try again. Your earlier saved work is kept.",
            "Der Speicher ist voll. Lass diesen Tab geöffnet und kopiere eine noch nicht gespeicherte Antwort. Exportiere unten eine Sicherung, bevor du Speicherplatz freigibst, und versuche es erneut. Deine bisher gespeicherte Arbeit bleibt erhalten.",
          )
        : error instanceof Error
          ? error.message
          : t(
              "The action failed. Your saved records were kept.",
              "Die Aktion ist fehlgeschlagen. Gespeicherte Daten bleiben erhalten.",
            );
  };
  window.addEventListener("practice-error", (event) =>
    writeError((event as CustomEvent<unknown>).detail),
  );
  const ledger = () => {
    const read = readAutomaticityEvents(localStorage, language);
    if (read.unreadable.length)
      errorBox.textContent = t(
        "Some saved records could not be read. Export a backup before attempting repairs.",
        "Einige gespeicherte Einträge sind nicht lesbar. Exportiere vor einer Reparatur eine Sicherung.",
      );
    return reduceAutomaticityEvents(read.events, language, now());
  };
  const assertEditable = () => {
    if (!editing)
      throw new Error(
        t(
          "Practice is already open in another tab. Close it and reload here.",
          "Die Übung ist bereits in einem anderen Tab geöffnet. Schließe ihn und lade diese Seite neu.",
        ),
      );
  };
  // Cooperative ownership prevents competing drafts in two new practice tabs.
  if (navigator.locks) {
    await new Promise<void>((resolve) => {
      void navigator.locks
        .request(
          `automaticity-practice-${language}`,
          { ifAvailable: true },
          async (lock) => {
            editing = !!lock;
            resolve();
            if (lock)
              await new Promise<void>((release) => {
                lockRelease = release;
              });
          },
        )
        .catch((error) => {
          writeError(error);
          editing = false;
          resolve();
        });
    });
  }
  const saveSession = () => {
    assertEditable();
    const value = JSON.stringify(session);
    localStorage.setItem(sessionKey(language), value);
    localStorage.setItem(
      `${sessionKey(language)}:task:${encodeURIComponent(session.taskId)}`,
      value,
    );
    if (localStorage.getItem(sessionKey(language)) !== value)
      throw new Error("Draft was not saved");
  };
  const clearAudio = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    audioUrl = null;
    recording = null;
  };
  const readSavedSession = (raw: string | null): Session | null => {
    try {
      return parseSavedPracticeSession(raw);
    } catch (error) {
      throw new Error(
        error instanceof Error && error.message === "unreadable_session"
          ? t(
              "The saved session is unreadable. Its original data has been kept.",
              "Die gespeicherte Sitzung ist nicht lesbar. Die Originaldaten bleiben erhalten.",
            )
          : t(
              "The saved session needs recovery. Its original data has been kept.",
              "Die gespeicherte Sitzung muss wiederhergestellt werden. Die Originaldaten bleiben erhalten.",
            ),
      );
    }
  };
  const preserveSessionBytes = (
    bytes: string,
    saved: Session | null = null,
  ) => {
    const archiveKey = `automaticity:v2:${language}:archived-session:${id()}`;
    localStorage.setItem(archiveKey, bytes);
    if (localStorage.getItem(archiveKey) !== bytes)
      throw new Error("The original draft could not be preserved");
    if (saved) {
      const key = `${sessionKey(language)}:task:${encodeURIComponent(saved.taskId)}`;
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, bytes);
        if (localStorage.getItem(key) !== bytes)
          throw new Error("The original task draft could not be preserved");
      }
    }
  };
  const archiveSession = (saved: Session) =>
    preserveSessionBytes(JSON.stringify(saved), saved);
  const fresh = async (
    next: PracticeTask,
    prior: string | null = null,
  ): Promise<void> => {
    if (busy || recordingPending)
      throw new Error(
        t(
          "Wait until your answer or recording is saved.",
          "Warte, bis deine Antwort oder Aufnahme gespeichert ist.",
        ),
      );
    assertEditable();
    if (recorder?.state === "recording")
      throw new Error(
        t(
          "Stop your recording before changing the task.",
          "Beende die Aufnahme, bevor du die Aufgabe wechselst.",
        ),
      );
    const prepared = preparePracticeSession(
      next,
      readSavedSession(
        localStorage.getItem(
          `${sessionKey(language)}:task:${encodeURIComponent(next.id)}`,
        ),
      ),
      now(),
      prior,
    );
    busy = true;
    try {
      const restoredRecording = prepared.session.audioId
        ? await readRecording(indexedDB, language, prepared.session.audioId)
        : null;
      if (prepared.session.audioId && !restoredRecording)
        throw new Error(
          t(
            "The saved recording is unavailable. Your original draft is kept.",
            "Die gespeicherte Aufnahme ist nicht verfügbar. Dein ursprünglicher Entwurf bleibt erhalten.",
          ),
        );
      if (loadDailyPlan(localStorage, language, now()).plan.paused)
        saveDailyPlan(localStorage, language, {
          ...loadDailyPlan(localStorage, language, now()).plan,
          paused: false,
        });
      if (
        session &&
        hasUnfinishedPractice(session) &&
        (session.taskId !== next.id || !prepared.resumed)
      )
        archiveSession(session);
      if (
        prepared.archive &&
        (!session ||
          JSON.stringify(prepared.archive) !== JSON.stringify(session))
      )
        archiveSession(prepared.archive);
      task = next;
      unit = unitById.get(task.constructionId)!;
      level = unit.level;
      levelSelect.value = level;
      clearAudio();
      recording = restoredRecording;
      session = prepared.session;
      timer = timingEnabled && !prepared.resumed ? new ResponseTimer() : null;
      timer?.visibility(!document.hidden);
      saveSession();
      const url = new URL(location.href);
      url.searchParams.set("task", task.id);
      url.searchParams.set("topic", unit.title);
      url.searchParams.set("level", unit.level);
      if (session.previousAttemptId)
        url.searchParams.set("repairOf", session.previousAttemptId);
      else url.searchParams.delete("repairOf");
      url.searchParams.delete("review");
      url.searchParams.delete("attempt");
      if (url.href !== location.href) {
        history.pushState({ taskId: task.id }, "", url);
      }
      feedback.textContent = "";
      errorBox.textContent = "";
      renderTask();
      renderProgress();
      renderFocus();
      if (prepared.resumed)
        feedback.textContent = t(
          "Your saved answer and help history were restored. Timing is unavailable for this interrupted attempt.",
          "Deine gespeicherte Antwort und bisherige Hilfen wurden wiederhergestellt. Für diesen unterbrochenen Versuch ist keine Zeitmessung verfügbar.",
        );
    } finally {
      busy = false;
    }
  };
  const contextTask =
    requestedTask ??
    (requestedUnit || initialChoice?.source === "saved_choice" ? task : null);
  const generalRaw = localStorage.getItem(sessionKey(language));
  let raw = contextTask
    ? localStorage.getItem(
        `${sessionKey(language)}:task:${encodeURIComponent(contextTask.id)}`,
      )
    : generalRaw;
  // Entering another explicit topic must preserve a global-only draft as well
  // as drafts already saved under their individual task keys.
  if (contextTask && generalRaw && raw !== generalRaw) {
    let general: Session | null = null;
    try {
      general = parseSavedPracticeSession(generalRaw);
    } catch {
      /* Archive original bytes below. */
    }
    if (
      !raw &&
      general?.taskId === contextTask.id &&
      general.taskVersion === contextTask.version
    )
      raw = generalRaw;
    else preserveSessionBytes(generalRaw, general);
  }
  let resume: Session | null = null;
  let advancedFromCompleted = false;
  if (raw) {
    const savedSession = readSavedSession(raw)!;
    const savedTask = taskById.get(savedSession.taskId);
    if (savedTask && savedTask.version === savedSession.taskVersion) {
      // A general entry keeps an optional draft in its task storage and
      // archive, and continues with checked practice instead.
      const optionalDraft =
        !requestedTask &&
        !requestedUnit &&
        !requested.has("review") &&
        !isCheckedTask(savedTask);
      if (optionalDraft && hasUnfinishedPractice(savedSession))
        localStorage.setItem(
          `automaticity:v2:${language}:archived-session:${id()}`,
          raw,
        );
      if (
        !optionalDraft &&
        (!initialChoice ||
          initialChoice.task.id === savedTask.id ||
          !!contextTask) &&
        shouldResumeSavedPractice(
          savedSession,
          requestedTask && !learningPathLaunch
            ? "explicit_task"
            : requested.has("review")
              ? "review"
              : "general",
          loadDailyPlan(localStorage, language, now()).plan.paused,
        )
      ) {
        session = savedSession;
        task = savedTask;
        unit = unitById.get(task.constructionId)!;
        resume = savedSession;
        if (session.audioId)
          recording = await readRecording(indexedDB, language, session.audioId);
      } else {
        if (!optionalDraft && hasUnfinishedPractice(savedSession)) {
          preserveSessionBytes(raw, savedSession);
        }
        advancedFromCompleted = !!savedSession.submittedId;
      }
    } else {
      localStorage.setItem(
        `automaticity:v2:${language}:archived-session:${id()}`,
        raw,
      );
    }
  }
  if (!requestedTask) {
    const url = new URL(location.href);
    url.searchParams.set("task", task.id);
    url.searchParams.set("topic", unit.title);
    url.searchParams.set("level", unit.level);
    history.replaceState({ taskId: task.id }, "", url);
  }
  level = unit.level;
  const header = element("header", undefined, "practice-header");
  const nav = element("nav");
  nav.setAttribute("aria-label", t("App navigation", "App-Navigation"));
  if (staffRole) {
    const staffLink = element(
      "a",
      t("Teacher & developer workspace", "Bereich für Lehrkraft & Entwicklung"),
    );
    staffLink.href = "/staff";
    nav.append(staffLink);
  }
  for (const [label, href] of [
    [t("Home", "Start"), "/"],
    [t("Today", "Heute"), en ? "/daily" : "/heute"],
    [
      t("Grammar library", "Grammatikbibliothek"),
      en ? "/grammar" : "/grammatik",
    ],
    [
      t("Settings", "Einstellungen"),
      staffRole ? "/staff/settings" : en ? "/settings" : "/einstellungen",
    ],
  ]) {
    const link = element("a", label);
    link.href = href!;
    nav.append(link);
  }
  header.append(
    nav,
    element("p", t("English Automaticity", "DeutschFlow"), "eyebrow"),
    element(
      "h1",
      t("Use grammar in your own words", "Grammatik aktiv anwenden"),
    ),
    element(
      "p",
      t(
        "Recall it. Change it. Use it in your life. Return to it later.",
        "Abrufen. Verändern. Im Alltag verwenden. Später wiederholen.",
      ),
    ),
  );
  const levelSelect = element("select");
  levelSelect.setAttribute("aria-label", t("Practice level", "Übungsniveau"));
  for (const value of [...new Set(pack.units.map((row) => row.level))]) {
    const option = element("option", value);
    option.value = value;
    levelSelect.append(option);
  }
  levelSelect.value = level;
  levelSelect.onchange = () => {
    level = levelSelect.value;
    try {
      saveLearningPathChoice(localStorage, language, { level }, now());
      localStorage.setItem(settingKey, level);
      const next = resolveLearningPath(
        pack,
        localStorage,
        now(),
        { level },
        recommendationPack(),
      );
      window.dispatchEvent(new Event("automaticity-choice-updated"));
      if (next) void fresh(next.task, next.previousAttemptId).catch(writeError);
      else renderFocus();
    } catch (error) {
      writeError(error);
    }
  };
  const topicSelect = element("select");
  topicSelect.setAttribute("aria-label", t("Grammar topic", "Grammatikthema"));
  for (const row of pack.units) {
    const option = element("option", `${row.level} · ${row.title}`);
    option.value = row.id;
    topicSelect.append(option);
  }
  topicSelect.value = unit.id;
  topicSelect.onchange = () => {
    const selected = unitById.get(topicSelect.value)!;
    try {
      saveLearningPathChoice(
        localStorage,
        language,
        { level: selected.level, constructionId: selected.id },
        now(),
      );
      window.dispatchEvent(new Event("automaticity-choice-updated"));
    } catch (error) {
      writeError(error);
      return;
    }
    void fresh(
      activePracticeTasks(selected).find(
        (row) => row.stage === "retrieve" && row.modality === "writing",
      ) ?? activePracticeTasks(selected)[0]!,
    ).catch(writeError);
  };
  controls.append(levelSelect, topicSelect);
  const timingLabel = element("label");
  const timingControl = element("input");
  timingControl.type = "checkbox";
  timingControl.checked = timingEnabled;
  timingControl.onchange = () => {
    timingEnabled = timingControl.checked;
    localStorage.setItem(timingKey, timingEnabled ? "on" : "off");
    timer = null;
  };
  timingLabel.append(
    timingControl,
    document.createTextNode(
      t(
        "Record response timing from the next task",
        "Antwortzeit ab der nächsten Aufgabe erfassen",
      ),
    ),
  );
  if (staffRole) controls.append(timingLabel);
  const persianHelp = element("details");
  persianHelp.append(element("summary", "راهنمای فارسی"));
  persianHelp.dir = "rtl";
  persianHelp.lang = "fa";
  const practiceSteps = element("ol");
  for (const step of PERSIAN_PRACTICE_GUIDE.steps) {
    practiceSteps.append(element("li", step));
  }
  const criteria = element("details");
  criteria.append(element("summary", "پیشرفت چگونه بررسی می‌شود؟"));
  const criteriaList = element("ul");
  for (const point of PERSIAN_PRACTICE_GUIDE.criteria) {
    criteriaList.append(element("li", point));
  }
  criteria.append(
    criteriaList,
    element("p", PERSIAN_PRACTICE_GUIDE.limitation),
  );
  persianHelp.append(practiceSteps);
  if (staffRole) persianHelp.append(criteria);
  controls.append(persianHelp);
  const recordChoice = (reason: string) => {
    const selection = selectDailyFocus(
      recommendationPack(),
      ledger().progress,
      now(),
      level,
    );
    const key = `automaticity:v2:${language}:selection:${id()}`;
    localStorage.setItem(
      key,
      JSON.stringify({
        version: 1,
        at: now(),
        language,
        policy: "baseline-3",
        reason,
        level,
        selectedTaskId: task.id,
        recommendedConstructionIds: selection.focus.map((unit) => unit.id),
      }),
    );
  };
  topicSelect.addEventListener("change", () =>
    recordChoice("learner_topic_override"),
  );
  levelSelect.addEventListener("change", () =>
    recordChoice("learner_level_preference"),
  );
  if (editing) recordChoice(resume ? "resume" : "daily_selection");
  const focusSection = element("details", undefined, "card practice-options");
  focusSection.open = loadDailyPlan(localStorage, language, now()).plan.paused;
  focusSection.append(
    element(
      "summary",
      t("My plan & practice options", "Mein Plan & Übungseinstellungen"),
    ),
    dailyPanel,
    controls,
    focusPanel,
  );
  const aside = element("div", undefined, "side-column");
  const evidenceDisclosure = element(
    "details",
    undefined,
    "card practice-disclosure",
  );
  evidenceDisclosure.append(
    element(
      "summary",
      t("Progress for this topic", "Fortschritt zu diesem Thema"),
    ),
    progressPanel,
  );
  const historyDisclosure = element(
    "details",
    undefined,
    "card practice-disclosure",
  );
  historyDisclosure.id = "practice-history";
  historyDisclosure.open = requested.has("review") || requested.has("attempt");
  historyDisclosure.append(
    element("summary", t("My recent responses", "Meine letzten Antworten")),
    historyPanel,
  );
  aside.append(
    element(
      "p",
      t(
        "One response at a time. Your work is saved on this device.",
        "Eine Antwort nach der anderen. Deine Arbeit bleibt auf diesem Gerät.",
      ),
      "practice-side-note",
    ),
    evidenceDisclosure,
    historyDisclosure,
  );
  const grid = element("div", undefined, "practice-grid");
  grid.append(taskPanel, aside);
  const tools = element(
    "details",
    undefined,
    "card backup-tools practice-disclosure",
  );
  tools.id = "backup-tools";
  tools.append(
    element(
      "summary",
      t("Backup & transfer my work", "Meine Arbeit sichern & übertragen"),
    ),
    element(
      "p",
      t(
        "Backups include drafts, attempts, reviews, and recordings stored by this language app on this device.",
        "Sicherungen enthalten Entwürfe, Versuche, Bewertungen und Aufnahmen dieser Sprach-App auf diesem Gerät.",
      ),
    ),
  );
  const transferGuide = element("details");
  transferGuide.append(
    element(
      "summary",
      t(
        "Continue on a phone or tablet",
        "Auf dem Handy oder Tablet weiterlernen",
      ),
    ),
  );
  transferGuide.append(
    element(
      "p",
      t(
        "Your work stays in this browser. The same link on another device does not automatically transfer your progress.",
        "Deine Arbeit bleibt in diesem Browser. Derselbe Link auf einem anderen Gerät überträgt deinen Fortschritt nicht automatisch.",
      ),
    ),
  );
  const transferSteps = element("ol");
  for (const [english, german] of [
    [
      "Download a complete backup here and keep the file somewhere you can access on the other device.",
      "Lade hier eine vollständige Sicherung herunter und bewahre die Datei so auf, dass du sie auf dem anderen Gerät öffnen kannst.",
    ],
    [
      "Open this same language app on the other device. Download a backup there too if it already has work you want to keep.",
      "Öffne dieselbe Sprach-App auf dem anderen Gerät. Sichere dort zuerst vorhandene Arbeit, die du behalten möchtest.",
    ],
    [
      "Under Keep your work, choose Restore backup and select the transferred file. Restoration replaces the learning data on the receiving device; it does not merge two histories.",
      "Wähle unter Deine Arbeit sichern die Funktion Sicherung wiederherstellen und die übertragene Datei. Die Wiederherstellung ersetzt die Lerndaten auf dem Zielgerät; zwei Verläufe werden nicht zusammengeführt.",
    ],
    [
      "Check that your responses and recordings are present before continuing.",
      "Prüfe vor dem Weiterlernen, ob deine Antworten und Aufnahmen vorhanden sind.",
    ],
  ] as const)
    transferSteps.append(element("li", t(english, german)));
  transferGuide.append(transferSteps);
  tools.append(transferGuide);
  const exportButton = button(
    t("Download complete backup", "Vollständige Sicherung herunterladen"),
    async () => {
      assertEditable();
      download(
        `automaticity-${language}-${now().slice(0, 10)}.json`,
        await captureCompleteBackup(persistence, language),
      );
      feedback.textContent = t(
        "Complete backup downloaded.",
        "Vollständige Sicherung heruntergeladen.",
      );
    },
  );
  const importInput = element("input");
  importInput.type = "file";
  importInput.accept = "application/json,.json";
  importInput.hidden = true;
  importInput.onchange = () => {
    void (async () => {
      assertEditable();
      const file = importInput.files?.[0];
      if (!file) return;
      const backup = await validateCompleteBackup(
        JSON.parse(await file.text()),
        language,
      );
      if (
        !confirm(
          t(
            "Close other app tabs. Replace this device's learning data with the selected backup?",
            "Schließe andere App-Tabs. Lerndaten auf diesem Gerät durch die gewählte Sicherung ersetzen?",
          ),
        )
      )
        return;
      await restoreCompleteBackup(persistence, backup, language);
      location.reload();
    })()
      .catch(writeError)
      .finally(() => {
        importInput.value = "";
      });
  };
  tools.append(
    exportButton,
    button(t("Restore backup", "Sicherung wiederherstellen"), () =>
      importInput.click(),
    ),
    importInput,
  );
  if (staffRole)
    tools.append(
      button(
        t("Export responses for review", "Antworten zur Prüfung exportieren"),
        () => {
          const rows = ledger().attempts.filter(
            (row) => !row.eligibleForMastery,
          );
          download(`automaticity-${language}-review-queue.json`, {
            version: 2,
            language,
            exportedAt: now(),
            notice:
              "Contains your original writing and transcripts. Share only with a reviewer you choose. Recordings remain in the complete backup.",
            attempts: rows.map((row) => ({
              attempt: row.attempt,
              assessment: row.assessment,
              task: taskById.get(row.attempt.task.id),
            })),
          });
        },
      ),
    );
  root.replaceChildren(
    header,
    errorBox,
    notebookPanel,
    focusSection,
    grid,
    tools,
  );
  if (staffRole)
    refreshPilot = mountSchedulerPilotPanel(
      tools,
      pack,
      localStorage,
      pilot,
      () => renderFocus(),
      (task) => {
        void fresh(task).catch(writeError);
      },
      () => editing,
    );
  if (!editing) {
    errorBox.textContent = t(
      "Another practice tab is open. You can view progress here; close the other tab and reload to continue.",
      "Ein weiterer Übungstab ist geöffnet. Du kannst hier den Fortschritt ansehen. Schließe den anderen Tab und lade neu, um weiterzuüben.",
    );
  }
  async function continueRecommended(): Promise<void> {
    const next = resolveLearningPath(
      pack,
      localStorage,
      now(),
      {},
      recommendationPack(),
    );
    if (!next?.task)
      throw new Error(
        t(
          "No suitable practice is available yet. Your saved work is kept.",
          "Noch keine passende Übung verfügbar. Deine gespeicherten Antworten bleiben erhalten.",
        ),
      );
    if (next.task.id === task.id && session && hasUnfinishedPractice(session)) {
      taskPanel.scrollIntoView({ block: "start" });
      taskPanel.querySelector<HTMLTextAreaElement>("textarea")?.focus();
      return;
    }
    await fresh(next.task, next.previousAttemptId);
  }
  /** The items written from a learner's error notebook: how many have
   * passed at the selected grammar level and overall, and the next one to
   * try, of that level while it has one left. */
  function renderNotebook(): void {
    const attempts = ledger().attempts;
    const all = notebookProgress(
      pack,
      attempts,
      recentNotebook ? { sourceVersion: RECENT_GERMAN_NOTEBOOK_VERSION } : {},
    );
    notebookPanel.hidden = !all.total;
    if (!all.total) return;
    const atLevel = notebookProgress(pack, attempts, { level });
    const next = recentNotebook ? all.next : (atLevel.next ?? all.next);
    const copy = notebookCopy(language);
    notebookPanel.replaceChildren(
      element(
        "h2",
        recentNotebook
          ? f(
              "تمرین‌های تازهٔ ۶ نوامبر",
              "New exercises from 6 November",
              "Neue Übungen vom 6. November",
            )
          : `${copy.title} · ${level}`,
      ),
      ...(recentNotebook
        ? staffRole
          ? [
              f(
                `${all.passed} تمرین از ${all.total} درست بوده است.`,
                `${all.passed} of ${all.total} passed.`,
                `${all.passed} von ${all.total} bestanden.`,
              ),
              copy.source,
              copy.progressBasis,
            ]
          : []
        : notebookCardLines(language, level, atLevel, all, !!staffRole)
      ).map((line) => element("p", line, "muted")),
    );
    if (!next)
      notebookPanel.append(
        element(
          "p",
          t(
            "All passed. They return later with the learning path's reviews.",
            "Alle bestanden. Sie kommen mit den Wiederholungen des Lernwegs später wieder.",
          ),
        ),
      );
    else if (next.task.id === task.id && !session?.submittedId && staffRole)
      notebookPanel.append(element("p", copy.thisTask));
    else if (next.task.id !== task.id || session?.submittedId)
      notebookPanel.append(
        button(
          (next.previousAttemptId
            ? t(
                "Repair an error-notebook exercise",
                "Eine Fehlerheft-Übung korrigieren",
              )
            : t("Next error-notebook exercise", "Nächste Fehlerheft-Übung")) +
            (atLevel.next ? "" : ` (${next.unit.level})`),
          () => fresh(next.task, next.previousAttemptId),
          isNotebookTask(task) && session?.submittedId ? "primary" : "",
        ),
      );
  }
  function renderFocus(): void {
    renderNotebook();
    renderDailyPlan();
    refreshPilot();
    const selection = selectDailyFocus(
      recommendationPack(),
      ledger().progress,
      now(),
      level,
    );
    const next = resolveLearningPath(
      pack,
      localStorage,
      now(),
      {},
      recommendationPack(),
    );
    const resumeDraft =
      !!session &&
      shouldResumeSavedPractice(session, "general") &&
      next?.reason !== "repair" &&
      next?.reason !== "due_review";
    focusPanel.replaceChildren(
      element(
        "p",
        next?.reason === "due_review"
          ? t(
              "A previous pattern is due for a fresh attempt.",
              "Ein früheres Muster ist bereit für einen neuen Versuch.",
            )
          : next?.reason === "repair"
            ? t(
                "Return to a pattern that needs repair.",
                "Kehre zu einem Muster zurück, das noch Korrektur braucht.",
              )
            : t(
                staffRole
                  ? "Continue your current pattern. Unchecked responses do not establish mastery."
                  : "Continue practising your current pattern.",
                staffRole
                  ? "Übe dein aktuelles Muster weiter. Ungeprüfte Antworten belegen noch keine Beherrschung."
                  : "Übe dein aktuelles Muster weiter.",
              ),
      ),
    );
    if (next?.task)
      focusPanel.append(
        button(
          resumeDraft
            ? t("Continue your saved answer", "Gespeicherte Antwort fortsetzen")
            : `${t("Next recommended step", "Empfohlener nächster Schritt")}: ${next.unit.title}`,
          () => {
            if (resumeDraft) {
              taskPanel.scrollIntoView({ block: "start" });
              taskPanel.querySelector<HTMLTextAreaElement>("textarea")?.focus();
            } else return continueRecommended();
          },
          "primary",
        ),
      );
    const alternatives = element("details");
    alternatives.append(
      element(
        "summary",
        t("Other suggested topics", "Weitere Themenvorschläge"),
      ),
    );
    focusPanel.append(alternatives);
    for (const selected of selection.focus) {
      const recommendation = selectDailyTask(
        selected,
        ledger(),
        now(),
        "checked",
      );
      alternatives.append(
        button(`${selected.title}`, () => {
          if (!recommendation.task)
            throw new Error(
              t(
                "No practice task is available for this mode yet. Choose another topic.",
                "Für diese Übungsart ist noch keine Aufgabe verfügbar. Wähle ein anderes Thema.",
              ),
            );
          const currentRecommendation = selectDailyTask(
            selected,
            ledger(),
            now(),
            "checked",
          );
          if (currentRecommendation.task)
            return fresh(
              currentRecommendation.task,
              currentRecommendation.previousAttemptId,
            );
        }),
      );
      if (recommendation.task)
        alternatives.append(
          element(
            "p",
            `${recommendation.task.modality === "speaking" ? t("Speaking", "Sprechen") : t("Writing", "Schreiben")} · ${recommendation.reason === "repair" ? t("Repair your earlier response", "Deine frühere Antwort korrigieren") : recommendation.reason === "due_review" ? t("Return to this pattern", "Dieses Muster wiederholen") : t("Try a fresh response", "Eine neue Antwort versuchen")}`,
            "muted",
          ),
        );
      const preparation = selected.prerequisites
        .map((id) => unitById.get(id)?.title)
        .filter(Boolean);
      if (preparation.length)
        alternatives.append(
          element(
            "p",
            `${t("Suggested preparation", "Empfohlene Vorbereitung")}: ${preparation.join(", ")}. ${t("You can still choose any topic.", "Du kannst trotzdem jedes Thema wählen.")}`,
            "muted",
          ),
        );
    }
  }
  function renderDailyPlan(): void {
    const focusedControl = document.activeElement?.id;
    const { plan, unreadable } = loadDailyPlan(localStorage, language, now());
    if (plan.paused) focusSection.open = true;
    const count = dailyResponseCount(
      ledger().attempts.map((row) => row.attempt),
      language,
      now(),
    );
    const goal = element("select");
    goal.id = "daily-response-goal";
    const label = element(
      "label",
      t("Today's response goal", "Dein Antwortziel heute"),
    );
    label.htmlFor = goal.id;
    for (const value of RESPONSE_GOALS) {
      const option = element("option", String(value));
      option.value = String(value);
      goal.append(option);
    }
    goal.value = String(plan.responseGoal);
    goal.disabled = !editing;
    goal.onchange = () => {
      try {
        assertEditable();
        saveDailyPlan(localStorage, language, {
          ...loadDailyPlan(localStorage, language, now()).plan,
          responseGoal: Number(goal.value) as DailyPracticePlan["responseGoal"],
        });
        renderDailyPlan();
      } catch (error) {
        goal.value = String(plan.responseGoal);
        writeError(error);
      }
    };
    const status = element(
      "p",
      `${count} / ${plan.responseGoal} ${t("responses saved today", "Antworten heute gespeichert")}`,
    );
    status.setAttribute("role", "status");
    status.dataset.dailyResponses = String(count);
    const pause = button(
      plan.paused
        ? t("Resume practice", "Weiterüben")
        : t("Finish for now", "Für heute pausieren"),
      () => {
        assertEditable();
        if (busy || recordingPending || recorder?.state === "recording")
          throw new Error(
            t(
              "Stop your recording and wait for it to save before pausing.",
              "Beende die Aufnahme und warte, bis sie gespeichert ist, bevor du pausierst.",
            ),
          );
        saveSession();
        const current = loadDailyPlan(localStorage, language, now()).plan;
        saveDailyPlan(localStorage, language, {
          ...current,
          paused: !current.paused,
        });
        // An interrupted response has no trustworthy continuous latency.
        timer = null;
        renderTask();
        renderDailyPlan();
      },
    );
    pause.disabled = !editing;
    pause.id = "daily-practice-toggle";
    dailyPanel.replaceChildren(
      label,
      goal,
      status,
      ...(staffRole
        ? [
            element(
              "p",
              t(
                "This counts practice effort, including help and repairs. It does not measure mastery.",
                "Hier zählt dein Übungsaufwand, auch mit Hilfe und Korrekturen. Das ist kein Nachweis für sichere Beherrschung.",
              ),
            ),
          ]
        : []),
      pause,
    );
    if (count >= plan.responseGoal && !plan.paused)
      dailyPanel.append(
        element(
          "p",
          t(
            "Today's goal is reached. Finish here or keep practising when you feel ready.",
            "Dein Tagesziel ist erreicht. Du kannst hier aufhören oder weiterüben, wenn du möchtest.",
          ),
        ),
      );
    if (unreadable)
      dailyPanel.append(
        element(
          "p",
          t(
            "Your saved daily goal could not be read. Its original data is kept; a goal of 3 is shown for now.",
            "Dein gespeichertes Tagesziel ist nicht lesbar. Die Originaldaten bleiben erhalten; vorläufig wird ein Ziel von 3 angezeigt.",
          ),
        ),
      );
    if (focusedControl === goal.id) goal.focus();
    else if (focusedControl === pause.id) pause.focus();
  }
  function expose(kind: "example" | "hint" | "solution"): void {
    assertEditable();
    appendAutomaticityEvent(localStorage, {
      version: 2,
      type: "exposure",
      id: id(),
      language,
      at: now(),
      constructionId: unit.id,
      taskId: task.id,
      itemFamily: task.itemFamily,
      kind,
    });
    if (kind === "example") session.exampleSeen = true;
    else if (kind === "hint") session.hintCount++;
    else session.solutionRevealed = true;
    saveSession();
  }
  function observeResponse(attempt: AttemptEvent): void {
    // Append-only evidence also records reading in a second, non-editing tab.
    appendAutomaticityEvent(
      localStorage,
      responseExposure(attempt, now(), id()),
    );
  }
  function renderProgress(): void {
    const reduced = ledger(),
      rows = reduced.progress.filter((row) => row.constructionId === unit.id);
    if (!staffRole) {
      progressPanel.replaceChildren(
        element("h2", t("Your practice", "Deine Übungen")),
      );
      for (const modality of ["writing", "speaking"] as const) {
        const attempts = reduced.attempts.filter(
          (row) =>
            row.attempt.task.constructionId === unit.id &&
            row.attempt.task.modality === modality,
        );
        progressPanel.append(
          element(
            "p",
            `${modality === "writing" ? t("Writing", "Schreiben") : t("Speaking", "Sprechen")}: ${attempts.length} ${t("saved responses", "gespeicherte Antworten")}`,
          ),
        );
      }
    } else {
      progressPanel.replaceChildren(
        element(
          "h2",
          t("Evidence for this pattern", "Nachweise für dieses Muster"),
        ),
        element(
          "p",
          t(
            "Goal: at least 90% independent accuracy for this pattern, in writing and speaking separately.",
            "Ziel: mindestens 90 % selbstständige Genauigkeit bei diesem Muster, getrennt für Schreiben und Sprechen.",
          ),
        ),
      );
      for (const modality of ["writing", "speaking"] as const) {
        const row = rows.find((value) => value.modality === modality);
        const group = element("div", undefined, "metric");
        const modeTasks = activePracticeTasks(unit).filter(
          (candidate) => candidate.modality === modality,
        );
        const hasReviewedTasks = modeTasks.some(
          (candidate) => candidate.contentReview === "human_reviewed",
        );
        group.append(
          element(
            "h3",
            modality === "writing"
              ? t("Writing", "Schreiben")
              : t("Speaking", "Sprechen"),
          ),
          element(
            "p",
            `${row?.attempts ?? 0} ${row?.attempts === 1 ? t("attempt", "Versuch") : t("attempts", "Versuche")} · ${row?.assessed ?? 0} ${row?.assessed === 1 ? t("practice check", "Übungsprüfung") : t("practice checks", "Übungsprüfungen")}`,
          ),
          element(
            "p",
            row?.accuracy !== null && row?.accuracy !== undefined
              ? `${Math.round(row.accuracy * 100)}% ${t("independent accuracy", "unabhängige Genauigkeit")}`
              : t(
                  "Independent accuracy: not yet established",
                  "Unabhängige Genauigkeit: noch nicht belegt",
                ),
          ),
          element(
            "p",
            `${row?.delayedSuccesses ?? 0} ${row?.delayedSuccesses === 1 ? t("delayed check", "verzögerte Prüfung") : t("delayed checks", "verzögerte Prüfungen")} · ${row?.novelSuccesses ?? 0} ${row?.novelSuccesses === 1 ? t("new-context check", "Prüfung in neuem Kontext") : t("new-context checks", "Prüfungen in neuem Kontext")}`,
          ),
        );
        const target = learningTarget(reduced, unit.id, modality);
        if (!modeTasks.length) {
          group.append(
            element(
              "p",
              t(
                "This topic has no exercises in this response mode.",
                "Dieses Thema enthält keine Aufgaben in dieser Antwortform.",
              ),
            ),
          );
          progressPanel.append(group);
          continue;
        }
        if (!hasReviewedTasks)
          group.append(
            element(
              "p",
              t(
                "The current exercises for this topic still need content review before they can provide verified evidence for the 90% target. Keep practising and review saved responses; a practice score does not verify this target.",
                "Die aktuellen Aufgaben zu diesem Thema benötigen noch eine Inhaltsprüfung, bevor sie geprüfte Nachweise für das 90-%-Ziel liefern können. Übe weiter und prüfe gespeicherte Antworten; ein Übungsergebnis bestätigt dieses Ziel noch nicht.",
              ),
            ),
          );
        const criteria = element("details");
        criteria.append(
          element(
            "summary",
            target.met
              ? t(
                  "90% accuracy and retention target met",
                  "90-%-Ziel für Genauigkeit und Behalten erreicht",
                )
              : t(
                  "Progress towards the 90% target",
                  "Fortschritt zum 90-%-Ziel",
                ),
          ),
          element(
            "p",
            `${target.checked}/${LEARNING_TARGET.checks} ${t("reviewed independent responses", "geprüfte selbstständige Antworten")} · ${target.successes} ${t("correct", "richtig")}`,
          ),
          element(
            "p",
            `${Math.min(target.delayedDays, LEARNING_TARGET.delayedDays)}/${LEARNING_TARGET.delayedDays} ${t("separate days with successful delayed recall", "getrennte Tage mit erfolgreichem späterem Abruf")}`,
          ),
          element(
            "p",
            `${Math.min(target.newContexts, LEARNING_TARGET.newContexts)}/${LEARNING_TARGET.newContexts} ${t("new contexts used successfully without naming the rule", "neue Kontexte erfolgreich ohne Nennung der Regel")}`,
          ),
          element(
            "p",
            t(
              "Requires at least 18 correct answers among the latest 20 reviewed independent responses, two delayed-recall days, two new contexts and no unresolved errors. Helped answers and self-checks do not count. These are training criteria; fluency needs separate assessment.",
              "Erfordert mindestens 18 richtige unter den letzten 20 geprüften selbstständigen Antworten, zwei Tage mit späterem Abruf, zwei neue Kontexte und keine offenen Fehler. Antworten mit Hilfe und Selbstprüfungen zählen nicht. Dies sind Übungskriterien; Flüssigkeit muss separat beurteilt werden.",
            ),
            "muted",
          ),
        );
        if (target.repairs)
          criteria.append(
            element(
              "p",
              `${target.repairs} ${t("responses still need repair", "Antworten müssen noch korrigiert werden")}`,
            ),
          );
        group.append(criteria);
        progressPanel.append(group);
      }
      progressPanel.append(
        element(
          "p",
          t(
            "Practice results stay separate from reviewed evidence. A fast answer alone does not establish automaticity.",
            "Übungsergebnisse bleiben von geprüften Nachweisen getrennt. Eine schnelle Antwort allein belegt noch keine Automatisierung.",
          ),
          "muted",
        ),
      );
      const coverageLink = element(
        "a",
        t(
          "See assessment coverage for every topic",
          "Prüfungsabdeckung aller Themen ansehen",
        ),
      );
      coverageLink.href = "/assessment-readiness.html";
      progressPanel.append(coverageLink);
      const benchmarkLink = element(
        "a",
        t(
          "Text and audio evaluator test results",
          "Testergebnisse der Text- und Audioauswertung",
        ),
      );
      benchmarkLink.href = "/assessment-benchmarks.html";
      const microphoneLink = element(
        "a",
        t("Check microphone and playback", "Mikrofon und Wiedergabe prüfen"),
      );
      microphoneLink.href = "/microphone-check.html";
      progressPanel.append(
        element("p"),
        ...(staffRole === "developer" ? [benchmarkLink] : []),
        element("p"),
        microphoneLink,
      );
    }
    if (!staffRole) {
      const microphoneLink = element(
        "a",
        t("Check microphone and playback", "Mikrofon und Wiedergabe prüfen"),
      );
      microphoneLink.href = "/microphone-check.html";
      progressPanel.append(microphoneLink);
    }
    const rowsForUnit = reduced.attempts
      .filter((row) => row.attempt.task.constructionId === unit.id)
      .slice(-5)
      .reverse();
    historyPanel.replaceChildren(
      element("h2", t("Recent attempts", "Letzte Versuche")),
    );
    const drafts = element("details");
    drafts.append(
      element(
        "summary",
        t("Earlier unfinished drafts", "Frühere unvollständige Entwürfe"),
      ),
    );
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(`automaticity:v2:${language}:archived-session:`))
        continue;
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
        if (
          isRecord(saved) &&
          typeof saved.draft === "string" &&
          typeof saved.taskId === "string"
        ) {
          const entry = element("details");
          entry.append(
            element(
              "summary",
              unitById.get(taskById.get(saved.taskId)?.constructionId ?? "")
                ?.title ?? saved.taskId,
            ),
            element("p", saved.draft, "response-copy"),
          );
          if (typeof saved.audioId === "string")
            entry.append(
              element(
                "p",
                t(
                  "Recording included in your complete backup.",
                  "Die Aufnahme ist in deiner vollständigen Sicherung enthalten.",
                ),
              ),
            );
          drafts.append(entry);
        }
      } catch {
        /* Preserve unreadable drafts for complete export. */
      }
    }
    historyPanel.append(drafts);
    if (!rowsForUnit.length)
      historyPanel.append(
        element(
          "p",
          t(
            "Your own responses will appear here.",
            "Deine eigenen Antworten erscheinen hier.",
          ),
        ),
      );
    for (const row of rowsForUnit) {
      const entry = element("details");
      entry.addEventListener("toggle", () => {
        if (!entry.open) return;
        try {
          observeResponse(row.attempt);
        } catch (error) {
          writeError(error);
        }
      });
      const verdictLabel =
        row.assessment?.verdict === "pass"
          ? t("Practice checked", "Übung geprüft")
          : row.assessment?.verdict === "needs_repair"
            ? t("Needs a repair", "Korrektur nötig")
            : row.assessment?.verdict === "target_not_observed"
              ? t("Target not observed", "Zielstruktur nicht beobachtet")
              : t("Awaiting review", "Prüfung ausstehend");
      entry.append(
        element(
          "summary",
          `${new Date(row.attempt.at).toLocaleString(language)} · ${row.attempt.task.modality === "writing" ? t("Writing", "Schreiben") : t("Speaking", "Sprechen")} · ${verdictLabel}`,
        ),
        element("p", row.attempt.response.text, "response-copy"),
        element(
          "p",
          row.assessment?.feedback ??
            t("Awaiting review", "Prüfung ausstehend"),
        ),
      );
      if (row.attempt.audio)
        entry.append(
          button(
            t("Play saved recording", "Gespeicherte Aufnahme abspielen"),
            async () => {
              const saved = await readRecording(
                indexedDB,
                language,
                row.attempt.audio!.id,
              );
              if (
                !saved ||
                (await sha256(await saved.blob.arrayBuffer())) !==
                  row.attempt.audio!.sha256
              )
                throw new Error(
                  t(
                    "The original recording is unavailable.",
                    "Die Originalaufnahme ist nicht verfügbar.",
                  ),
                );
              const player = element("audio");
              player.controls = true;
              const url = URL.createObjectURL(saved.blob);
              player.src = url;
              player.onended = () => URL.revokeObjectURL(url);
              entry.append(player);
              await player.play();
            },
          ),
        );
      historyPanel.append(entry);
    }
  }
  /** Unchecked writing and speech stay one link away, saved without a score. */
  function optionalPractice(activeTasks: PracticeTask[]): HTMLElement {
    const section = element("section", undefined, "practice-optional");
    const more = element("details");
    more.append(
      element(
        "summary",
        f(
          "تمرین‌های بیشتر: نوشتن و گفتن",
          "Optional writing and speaking",
          "Optional schreiben und sprechen",
        ),
      ),
      element(
        "p",
        f(
          "این تمرین‌ها برای یادگیری بیشترند. پاسخ را می‌بینی و بازخورد می‌گیری، اما انجام آن‌ها به‌تنهایی نمره یا نشان تسلط نیست.",
          "These responses do not count as checked evidence. Some show practice feedback, never a verified score.",
          "Diese Antworten zählen nicht als geprüfter Nachweis. Manche zeigen Übungsfeedback, nie eine bestätigte Bewertung.",
        ),
        "muted",
      ),
    );
    const stageLabel = (stage: Stage) =>
      readSupportLanguage(language) === "fa"
        ? persianStageLabel(stage)
        : (en
            ? [
                "Notice",
                "Recall",
                "Vary",
                "Produce",
                "Repair",
                "Transfer",
                "Return later",
              ]
            : [
                "Erkennen",
                "Abrufen",
                "Variieren",
                "Produzieren",
                "Korrigieren",
                "Übertragen",
                "Später abrufen",
              ])[stages.indexOf(stage)];
    const list = element("ul");
    // Saved optional drafts stay visible; other optional tasks are collapsed.
    const resumeList = element("ul");
    const optionalTasks = activeTasks
      .filter((candidate) => !isCheckedTask(candidate))
      .sort(
        (a, b) =>
          stages.indexOf(a.stage) - stages.indexOf(b.stage) ||
          Number(a.modality === "speaking") - Number(b.modality === "speaking"),
      );
    const totals = new Map<string, number>();
    const seen = new Map<string, number>();
    for (const row of optionalTasks) {
      const key = `${row.stage}:${row.modality}`;
      totals.set(key, (totals.get(key) ?? 0) + 1);
    }
    for (const row of optionalTasks) {
      let draft = false;
      try {
        const saved = parseSavedPracticeSession(
          localStorage.getItem(
            `${sessionKey(language)}:task:${encodeURIComponent(row.id)}`,
          ),
        );
        draft =
          !!saved &&
          saved.taskVersion === row.version &&
          hasUnfinishedPractice(saved);
      } catch {
        draft = false;
      }
      const url = new URL(location.href);
      for (const key of ["repairOf", "review", "attempt"])
        url.searchParams.delete(key);
      url.searchParams.set("task", row.id);
      url.searchParams.set("topic", unit.title);
      url.searchParams.set("level", unit.level);
      const mode =
        row.modality === "speaking"
          ? f("گفتن", "Speak", "Sprechen")
          : f("نوشتن", "Write", "Schreiben");
      const key = `${row.stage}:${row.modality}`;
      const number = (seen.get(key) ?? 0) + 1;
      seen.set(key, number);
      const label = `${stageLabel(row.stage)} · ${mode}${(totals.get(key) ?? 0) > 1 ? ` · ${f("تمرین", "task", "Aufgabe")} ${number}` : ""}`;
      const link = element(
        "a",
        draft
          ? `${f("ادامهٔ پاسخ ذخیره‌شده", "Resume saved response", "Gespeicherte Antwort fortsetzen")} · ${label}`
          : label,
      );
      link.href = url.href;
      const item = element("li");
      item.append(link);
      (draft ? resumeList : list).append(item);
    }
    if (list.childElementCount) more.append(list);
    section.append(more);
    if (resumeList.childElementCount) section.append(resumeList);
    return section;
  }
  function renderTask(): void {
    const activeTasks = activePracticeTasks(unit).filter(
      (row) => row.partition === "practice",
    );
    const retirement = unit.retiredTasks?.find((row) => row.taskId === task.id);
    topicSelect.value = unit.id;
    taskPanel.replaceChildren(
      element(
        "p",
        `${unit.level} · ${unit.familyIds.map((family) => GRAMMAR_FAMILIES.find((row) => row[0] === family)?.[en ? 1 : 2] ?? family).join(" · ")}`,
        "eyebrow",
      ),
      element("h2", unit.title, "worksheet-lesson-title"),
    );
    if (
      !retirement &&
      loadDailyPlan(localStorage, language, now()).plan.paused
    ) {
      taskPanel.append(
        element(
          "p",
          t(
            "Paused for now. Your draft is saved. Choose Resume practice above to continue.",
            "Du machst gerade Pause. Dein Entwurf ist gespeichert. Wähle oben Weiterüben, um fortzufahren.",
          ),
        ),
      );
      return;
    }
    if (checkedUnavailable && !isCheckedTask(task)) {
      taskPanel.append(
        element(
          "p",
          t(
            "No checked practice is available for this topic.",
            "Für dieses Thema ist noch keine prüfbare Übung verfügbar.",
          ),
        ),
        optionalPractice(activeTasks),
      );
      return;
    }
    const stageNames =
      readSupportLanguage(language) === "fa"
        ? stages.map(persianStageLabel)
        : en
          ? [
              "Notice",
              "Recall",
              "Vary",
              "Produce",
              "Repair",
              "New situation",
              "Return later",
            ]
          : [
              "Erkennen",
              "Abrufen",
              "Variieren",
              "Produzieren",
              "Korrigieren",
              "Neue Situation",
              "Später abrufen",
            ];
    // Worksheet chrome: a teal corner tab names the step; a circular badge marks the task.
    const stepTab = element(
      "span",
      `${stageNames[stages.indexOf(task.stage)]} · ${task.modality === "writing" ? t("Write", "Schreiben") : t("Speak", "Sprechen")}`,
      "ws-tab",
    );
    stepTab.setAttribute("aria-hidden", "true");
    const taskBadge = element(
      "span",
      undefined,
      `ws-icon ${task.modality === "speaking" ? "ws-icon--mic" : "ws-icon--search"}`,
    );
    taskBadge.setAttribute("aria-hidden", "true");
    taskPanel.prepend(stepTab, taskBadge);
    // These phases describe the current task; they are not mastery evidence.
    const currentPhase =
      task.stage === "notice"
        ? 1
        : task.stage === "retrieve" || task.stage === "vary"
          ? 2
          : 3;
    const phaseNames =
      readSupportLanguage(language) === "fa"
        ? ["الگو را بشناس", "با راهنما تمرین کن", "خودت به کار ببر و مرور کن"]
        : en
          ? [
              "Discover the pattern",
              "Decide and build",
              "Use, repair and review",
            ]
          : [
              "Muster entdecken",
              "Entscheiden und bilden",
              "Anwenden, korrigieren und wiederholen",
            ];
    const phaseHeader = element("section", undefined, "worksheet-phase-header");
    if (readSupportLanguage(language) === "fa") phaseHeader.dir = "rtl";
    phaseHeader.setAttribute(
      "aria-label",
      f("مرحلهٔ فعلی یادگیری", "Current learning phase", "Aktuelle Lernphase"),
    );
    const phaseTrack = element("ol", undefined, "worksheet-phase-track");
    phaseNames.forEach((name, index) => {
      const phase = element("li", undefined, "worksheet-phase");
      if (index + 1 === currentPhase)
        phase.setAttribute("aria-current", "step");
      const number = element(
        "span",
        String(index + 1),
        "worksheet-phase-number",
      );
      number.setAttribute("aria-hidden", "true");
      phase.append(number, element("span", `${index + 1} · ${name}`));
      phaseTrack.append(phase);
    });
    phaseHeader.append(
      element(
        "p",
        `${f("بخش", "Phase", "Phase")} ${currentPhase} / 3 · ${phaseNames[currentPhase - 1]}`,
        "worksheet-phase-label",
      ),
      phaseTrack,
      element(
        "p",
        `${f("گام فعلی", "Current step", "Aktueller Schritt")}: ${stageNames[stages.indexOf(task.stage)]}`,
        "worksheet-current-stage",
      ),
    );
    taskPanel.append(phaseHeader, languageGuideHost);
    if (unit.learningCycle && task.modality === "writing") {
      const goals = element("details", undefined, "learning-cycle-goals");
      goals.open = readSupportLanguage(language) === "fa";
      if (goals.open) goals.dir = "rtl";
      goals.append(
        element(
          "summary",
          f(
            "در این مبحث چه یاد می‌گیرم؟",
            "What you are practising",
            "Was du übst",
          ),
        ),
      );
      const labels = {
        form: f("شکل جمله", "Form", "Form"),
        meaning: f("معنی", "Meaning", "Bedeutung"),
        use: f("کاربرد", "Use", "Gebrauch"),
      };
      const persianGoals =
        readSupportLanguage(language) === "fa"
          ? persianCycleGoals(unit.id)
          : null;
      for (const key of ["form", "meaning", "use"] as const)
        goals.append(
          element(
            "p",
            `${labels[key]}: ${persianGoals?.[key] ?? unit.learningCycle.goals[key]}`,
          ),
        );
      const step = unit.learningCycle.steps.find(
        (row) => row.taskId === task.id,
      );
      if (step)
        taskPanel.append(
          element(
            "p",
            readSupportLanguage(language) === "fa"
              ? persianStageAction(task.stage)
              : staffRole
                ? step.purpose
                : step.purpose.replace(/;.*$/u, "."),
            "learning-cycle-purpose",
          ),
        );
      taskPanel.append(goals);
    }
    languageGuide.update({
      stage: task.stage,
      constructionId: unit.id,
      familyId: unit.familyIds[0],
    });
    const currentRepairId =
      session.previousAttemptId ??
      new URLSearchParams(location.search).get("repairOf");
    const requestedRepair = currentRepairId
      ? ledger().attempts.find(
          (row) =>
            row.attempt.id === currentRepairId &&
            row.attempt.task.constructionId === unit.id &&
            row.attempt.task.modality === task.modality,
        )
      : undefined;
    if (requestedRepair) {
      const context = element("details", undefined, "reference");
      context.open = true;
      context.append(
        element(
          "summary",
          t(
            "Your earlier response and feedback",
            "Deine frühere Antwort und Rückmeldung",
          ),
        ),
        element("p", requestedRepair.attempt.response.text, "response-copy"),
        element(
          "p",
          requestedRepair.assessment?.feedback ??
            t(
              "This response still needs review.",
              "Diese Antwort muss noch geprüft werden.",
            ),
        ),
        element(
          "p",
          t(
            staffRole
              ? "Revise the response below. A correction is practice; it does not count as a new independent success."
              : "Revise your response below, using the feedback above.",
            staffRole
              ? "Überarbeite die Antwort unten. Eine Korrektur ist Übung; sie zählt nicht als neuer selbstständiger Erfolg."
              : "Überarbeite deine Antwort unten mit der Rückmeldung oben.",
          ),
          "muted",
        ),
      );
      taskPanel.append(context);
    }
    if (
      requestedRepair &&
      session.previousAttemptId !== requestedRepair.attempt.id
    ) {
      const sourceTask = repairTaskForAttempt(unit, requestedRepair.attempt);
      if (sourceTask)
        taskPanel.append(
          button(
            t(
              "Start a repair of this response",
              "Korrektur dieser Antwort beginnen",
            ),
            () => fresh(sourceTask, requestedRepair.attempt.id),
          ),
        );
    }
    const stageNav = element("div", undefined, "stage-nav");
    stageNav.setAttribute(
      "aria-label",
      f("مسیر تمرین", "Learning cycle", "Lernzyklus"),
    );
    stages.forEach((stage, index) => {
      const available = learningCycleTask(unit, stage, task.modality, true);
      if (!available) return;
      const btn = button(
        stageNames[index]!,
        () => fresh(available),
        task.id === available.id ? "selected" : "",
      );
      btn.setAttribute("aria-pressed", String(task.id === available.id));
      btn.dataset.cycleStage = stage;
      stageNav.append(btn);
    });
    const stageOptions = element(
      "details",
      undefined,
      "practice-stage-options",
    );
    stageOptions.open = readSupportLanguage(language) === "fa";
    if (stageOptions.open) stageOptions.dir = "rtl";
    stageOptions.append(
      element(
        "summary",
        `${f("گام فعلی", "Current step", "Aktueller Schritt")}: ${stageNames[stages.indexOf(task.stage)]} · ${f("تغییر گام", "change", "ändern")}`,
      ),
      stageNav,
    );
    if (readSupportLanguage(language) === "fa") {
      const path = element("ol", undefined, "practice-persian-path");
      for (const step of [
        "اول نمونه را ببین و ساختار را بشناس.",
        "بعد بدون نگاه به پاسخ، یک تمرین کوتاه انجام بده.",
        "بخشی از جمله را تغییر بده و سپس جملهٔ خودت را بساز.",
        "همان ساختار را در یک موقعیت تازه به کار ببر.",
        "چند روز بعد دوباره تمرین کن تا ببینی چه چیزی یادت مانده است.",
      ])
        path.append(element("li", step));
      stageOptions.append(
        path,
        element(
          "p",
          staffRole
            ? "اگر پاسخی نیاز به اصلاح دارد، اول همان را بررسی کن. انجام یک تمرین به‌تنهایی به معنی تسلط نیست."
            : "اگر پاسخی نیاز به اصلاح دارد، اول همان را بررسی کن.",
          "muted",
        ),
      );
    } else
      stageOptions.append(
        element(
          "p",
          t(
            staffRole
              ? "Your path: recall → vary → produce → use in a new situation → return later. Repairs and due reviews come first. Completing a step is practice; independent accuracy, transfer and delayed recall need checked evidence."
              : "Your path: recall → vary → produce → use in a new situation → return later. Start with corrections and due reviews.",
            staffRole
              ? "Dein Lernweg: abrufen → variieren → selbst formulieren → in neuer Situation anwenden → später wiederholen. Korrekturen und fällige Wiederholungen haben Vorrang. Ein erledigter Schritt ist Übung; selbstständige Genauigkeit, Transfer und späterer Abruf brauchen geprüfte Nachweise."
              : "Dein Lernweg: abrufen → variieren → selbst formulieren → in neuer Situation anwenden → später wiederholen. Beginne mit Korrekturen und fälligen Wiederholungen.",
          ),
          "muted",
        ),
      );
    taskPanel.append(stageOptions);
    if (unit.learningCycle && task.modality === "writing") {
      const position = unit.learningCycle.steps.findIndex(
        (row) => row.taskId === task.id,
      );
      const nextStep =
        position >= 0 ? unit.learningCycle.steps[position + 1] : undefined;
      const nextCycleTask = nextStep
        ? learningCycleTask(unit, nextStep.stage, "writing")
        : undefined;
      if (nextCycleTask)
        taskPanel.append(
          button(
            f(
              "گام بعدی همین مبحث",
              "Next step in this topic",
              "Nächster Schritt in diesem Thema",
            ),
            () => fresh(nextCycleTask),
          ),
        );
    }
    const modalityNav = element("div", undefined, "toolbar");
    for (const mode of ["writing", "speaking"] as Modality[]) {
      const other = learningCycleTask(unit, task.stage, mode);
      // From checked practice, unchecked modes are offered only as optional links.
      if (other && (!isCheckedTask(task) || isCheckedTask(other)))
        modalityNav.append(
          button(
            mode === "writing"
              ? f("نوشتن", "Write", "Schreiben")
              : f("گفتن", "Speak", "Sprechen"),
            () => fresh(other),
            mode === task.modality ? "selected" : "",
          ),
        );
    }
    taskPanel.append(modalityNav);
    if (isCheckedTask(task)) taskPanel.append(optionalPractice(activeTasks));
    if (readSupportLanguage(language) === "fa") {
      const guideTask = retirement
        ? taskById.get(retirement.replacementTaskId)!
        : task;
      const guide = element("section", undefined, "practice-task-steps");
      guide.id = "practice-task-instructions";
      guide.lang = "fa";
      guide.dir = "rtl";
      const list = element("ol");
      for (const step of persianTaskSteps(
        language,
        guideTask.stage,
        guideTask.modality,
        guideTask.prompt,
      ))
        list.append(element("li", step));
      guide.append(element("h3", "از من چه پاسخی خواسته شده؟"), list);
      taskPanel.append(guide);
    }
    const prompt = element("p", undefined, "task-prompt");
    appendPromptParts(prompt, task.prompt, language);
    prompt.id = "practice-prompt";
    const promptIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    promptIcon.setAttribute("viewBox", "0 0 48 48");
    promptIcon.setAttribute("class", "worksheet-prompt-icon");
    promptIcon.setAttribute("aria-hidden", "true");
    promptIcon.setAttribute("focusable", "false");
    const lens = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    lens.setAttribute("cx", "20");
    lens.setAttribute("cy", "20");
    lens.setAttribute("r", "12");
    const handle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    handle.setAttribute("d", "M29 29 40 40");
    promptIcon.append(lens, handle);
    prompt.prepend(promptIcon);
    if (retirement) {
      const message = element(
        "p",
        t(
          "This exercise has been replaced because its prompt did not reliably test the intended grammar. Your earlier work is kept below.",
          "Diese Übung wurde ersetzt, weil ihre Aufgabenstellung die vorgesehene Grammatik nicht zuverlässig geprüft hat. Deine bisherige Arbeit bleibt unten erhalten.",
        ),
      );
      message.setAttribute("role", "status");
      const saved = element("textarea");
      saved.value = session.draft;
      saved.rows = 5;
      saved.readOnly = true;
      saved.setAttribute(
        "aria-label",
        t("Archived response", "Archivierte Antwort"),
      );
      const replacement = taskById.get(retirement.replacementTaskId)!;
      const updatedPrompt = element("p", undefined, "task-prompt");
      appendPromptParts(updatedPrompt, replacement.prompt, language);
      taskPanel.append(
        message,
        updatedPrompt,
        button(
          t(
            "Continue with the updated exercise",
            "Mit der neuen Übung fortfahren",
          ),
          () => fresh(replacement, requestedRepair?.attempt.id ?? null),
          "primary",
        ),
      );
      const archive = element("details");
      archive.append(
        element(
          "summary",
          t(
            "View earlier task and saved response",
            "Frühere Aufgabe und gespeicherte Antwort ansehen",
          ),
        ),
        prompt,
        saved,
      );
      if (recording) {
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        audioUrl = URL.createObjectURL(recording.blob);
        const audio = element("audio");
        audio.controls = true;
        audio.src = audioUrl;
        archive.append(audio);
      }
      taskPanel.append(archive);
      return;
    }
    const promptHeading = element(
      "h3",
      f("صورت سؤال", "Question", "Aufgabe"),
      "practice-prompt-heading",
    );
    promptHeading.lang =
      readSupportLanguage(language) === "fa" ? "fa" : language;
    promptHeading.dir = readSupportLanguage(language) === "fa" ? "rtl" : "ltr";
    taskPanel.append(promptHeading, prompt);
    const shownTask = task.id;
    void pausedTaskIds(language).then((paused) => {
      if (paused.has(shownTask) && prompt.isConnected && task.id === shownTask)
        prompt.after(
          element(
            "p",
            t(
              "Paused for review: several learners reported this exercise as wrong. Your answer is saved without a score until it is checked.",
              "Zur Prüfung pausiert: Mehrere Lernende haben diese Aufgabe als fehlerhaft gemeldet. Deine Antwort wird bis zur Prüfung ohne Bewertung gespeichert.",
            ),
            "muted",
          ),
        );
    });
    if (staffRole && task.stage === "retain")
      taskPanel.append(
        element(
          "p",
          t(
            "Opening this stage does not prove delayed recall. The app checks the time since your last practice or exposure.",
            "Das Öffnen dieser Stufe belegt keinen verzögerten Abruf. Die App prüft den Abstand zur letzten Übung oder Hilfestellung.",
          ),
          "muted",
        ),
      );
    const reference = element("div", undefined, "reference");
    reference.lang = language;
    reference.dir = "ltr";
    const referenceLabel = () =>
      element(
        "p",
        t("Source explanation · English", "Erklärung im Original · Deutsch"),
        "reference-language-label",
      );
    const showExamples = () => {
      reference.replaceChildren(referenceLabel(), element("p", unit.rule));
      for (const example of unit.examples)
        reference.append(element("p", example));
    };
    const showHint = () => {
      reference.replaceChildren(
        referenceLabel(),
        element(
          "p",
          task.hints[
            Math.min(Math.max(session.hintCount - 1, 0), task.hints.length - 1)
          ] ?? unit.rule,
        ),
      );
    };
    const help = element("div", undefined, "toolbar");
    help.append(
      button(
        t("Read explanation and examples", "Erklärung und Beispiele lesen"),
        () => {
          expose("example");
          showExamples();
        },
      ),
      button(t("Show a hint", "Hinweis anzeigen"), () => {
        expose("hint");
        showHint();
      }),
    );
    if (task.solution)
      help.append(
        button(t("Reveal a model", "Musterlösung zeigen"), () => {
          expose("solution");
          reference.replaceChildren(element("p", task.solution!));
        }),
      );
    taskPanel.append(help, reference);
    if (session.solutionRevealed && task.solution)
      reference.append(element("p", task.solution));
    else if (session.exampleSeen) showExamples();
    else if (session.hintCount) showHint();
    const form = element("form");
    const label = element(
      "label",
      task.modality === "writing"
        ? f(
            `پاسخ تو به ${language === "de" ? "آلمانی" : "انگلیسی"}`,
            "Your response in English",
            "Deine Antwort auf Deutsch",
          )
        : f(
            "متنِ همان چیزی که ضبط کردی",
            "Transcript of your recording",
            "Transkript deiner Aufnahme",
          ),
    );
    label.htmlFor = "practice-response";
    label.lang = readSupportLanguage(language) === "fa" ? "fa" : language;
    label.dir = readSupportLanguage(language) === "fa" ? "rtl" : "ltr";
    const answer = element("textarea");
    answer.id = "practice-response";
    answer.lang = language;
    answer.dir = "ltr";
    answer.value = session.draft;
    answer.rows = 5;
    answer.maxLength = 100000;
    answer.spellcheck = false;
    answer.autocomplete = "off";
    answer.setAttribute(
      "aria-describedby",
      `${readSupportLanguage(language) === "fa" ? "practice-task-instructions " : ""}practice-prompt practice-error`,
    );
    answer.disabled = !!session.submittedId || !editing;
    answer.addEventListener("input", () => {
      try {
        if (answer.getAttribute("aria-invalid") === "true") {
          answer.removeAttribute("aria-invalid");
          errorBox.textContent = "";
        }
        timer?.input();
        session.draft = answer.value;
        saveSession();
      } catch (error) {
        writeError(error);
      }
    });
    if (task.modality === "speaking") {
      const media = element("div", undefined, "recording");
      const audio = element("audio");
      audio.controls = true;
      const drawAudio = () => {
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        if (recording) {
          audioUrl = URL.createObjectURL(recording.blob);
          audio.src = audioUrl;
          media.append(audio);
        }
      };
      const recordButton = button(
        t("Start recording", "Aufnahme starten"),
        async () => {
          assertEditable();
          if (session.submittedId || busy || recordingPending) return;
          if (recorder?.state === "recording") {
            recordingPending = true;
            recordButton.disabled = true;
            stopRecording?.();
            return;
          }
          if (
            !navigator.mediaDevices?.getUserMedia ||
            typeof MediaRecorder === "undefined"
          )
            throw new Error(
              t(
                "Recording is unavailable in this browser. Writing practice is still available.",
                "Aufnahmen sind in diesem Browser nicht verfügbar. Du kannst weiterhin schriftlich üben.",
              ),
            );
          recordingPending = true;
          recordButton.disabled = true;
          cancelRequest.hidden = false;
          const request = new AbortController();
          microphoneRequest = request;
          try {
            try {
              stream = await requestMicrophone(
                () => navigator.mediaDevices.getUserMedia({ audio: true }),
                { signal: request.signal },
              );
              microphoneRequest = null;
              cancelRequest.hidden = true;
            } catch (error) {
              if (error instanceof DOMException && error.name === "AbortError")
                throw new Error(
                  t(
                    "Microphone request cancelled. Your draft and previous recording were kept.",
                    "Mikrofonanfrage abgebrochen. Dein Entwurf und deine vorherige Aufnahme bleiben erhalten.",
                  ),
                );
              if (
                error instanceof DOMException &&
                error.name === "TimeoutError"
              )
                throw new Error(
                  t(
                    "No microphone permission response was received. Check this site's permission and try again, or continue with writing. Your draft was kept.",
                    "Keine Antwort auf die Mikrofonanfrage erhalten. Prüfe die Berechtigung dieser Website und versuche es erneut oder übe schriftlich weiter. Dein Entwurf bleibt erhalten.",
                  ),
                );
              throw new Error(
                t(
                  "The microphone is unavailable or permission was denied. Your draft is kept. Allow microphone access or continue with writing.",
                  "Das Mikrofon ist nicht verfügbar oder der Zugriff wurde abgelehnt. Dein Entwurf bleibt erhalten. Erlaube den Mikrofonzugriff oder übe schriftlich weiter.",
                ),
              );
            }
            const sourceStream = stream;
            const sourceRecorder = new MediaRecorder(sourceStream);
            const sourceSession = session;
            const sourceTaskId = task.id;
            const capture = new RecordingCapture();
            recorder = sourceRecorder;
            stopRecording = () => {
              capture.stop();
              sourceRecorder.stop();
            };
            sourceRecorder.ondataavailable = (event) => capture.add(event.data);
            sourceRecorder.onerror = () => {
              capture.fail();
              recordingPending = true;
              recordButton.disabled = true;
              sourceStream.getTracks().forEach((track) => track.stop());
            };
            sourceRecorder.onstop = () => {
              capture.stop();
              recordingPending = true;
              sourceStream.getTracks().forEach((track) => track.stop());
              stream = null;
              recordButton.textContent = t("Record again", "Erneut aufnehmen");
              recordButton.disabled = true;
              void (async () => {
                const captured = capture.finish(sourceRecorder.mimeType);
                if (!captured)
                  throw new Error(
                    t(
                      "Recording failed or contained no audio. Your previous recording and draft were kept. Please record again.",
                      "Die Aufnahme ist fehlgeschlagen oder enthält kein Audio. Deine vorherige Aufnahme und dein Entwurf bleiben erhalten. Bitte erneut aufnehmen.",
                    ),
                  );
                const savedRecording = await storeRecording(indexedDB, {
                  id: id(),
                  language,
                  taskId: sourceTaskId,
                  createdAt: now(),
                  ...captured,
                });
                if (session !== sourceSession || session.submittedId)
                  throw new Error(
                    t(
                      "The task changed. The new recording was saved separately.",
                      "Die Aufgabe wurde geändert. Die neue Aufnahme wurde separat gespeichert.",
                    ),
                  );
                const previousAudioId = session.audioId;
                session.audioId = savedRecording.id;
                try {
                  saveSession();
                } catch (error) {
                  session.audioId = previousAudioId;
                  throw error;
                }
                recording = savedRecording;
                drawAudio();
                feedback.textContent = t(
                  "Recording saved. Listen and make sure the transcript matches this recording, including any mistakes. Speech quality needs a separate review.",
                  "Aufnahme gespeichert. Höre sie an und gleiche das Transkript mit dieser Aufnahme ab, einschließlich aller Fehler. Die Sprachqualität benötigt eine eigene Prüfung.",
                );
              })()
                .catch(writeError)
                .finally(() => {
                  recordingPending = false;
                  recordButton.disabled = false;
                  stopRecording = null;
                  recorder = null;
                });
            };
            sourceRecorder.start();
            recordButton.textContent = t("Stop recording", "Aufnahme beenden");
          } catch (error) {
            stream?.getTracks().forEach((track) => track.stop());
            stream = null;
            recorder = null;
            stopRecording = null;
            throw error;
          } finally {
            microphoneRequest = null;
            cancelRequest.hidden = true;
            recordingPending = false;
            recordButton.disabled = false;
          }
        },
      );
      const cancelRequest = button(
        t("Cancel microphone request", "Mikrofonanfrage abbrechen"),
        () => microphoneRequest?.abort(),
      );
      cancelRequest.hidden = true;
      recordButton.disabled = !!session.submittedId || !editing;
      media.append(recordButton, cancelRequest);
      drawAudio();
      form.append(
        media,
        element(
          "p",
          t(
            "Your voice stays on this device. A typed transcript does not verify pronunciation or fluent speech.",
            "Deine Stimme bleibt auf diesem Gerät. Ein getipptes Transkript bestätigt weder Aussprache noch flüssiges Sprechen.",
          ),
          "muted",
        ),
      );
    }
    form.append(label, answer);
    const assistance = element("label", undefined, "check-label"),
      checkbox = element("input");
    checkbox.type = "checkbox";
    checkbox.checked = session.selfReportedAssistance;
    checkbox.disabled = !!session.submittedId || !editing;
    checkbox.onchange = () => {
      session.selfReportedAssistance = checkbox.checked;
      try {
        saveSession();
      } catch (error) {
        writeError(error);
      }
    };
    assistance.append(
      checkbox,
      document.createTextNode(
        t(
          "I used another source, translator, or suggested wording",
          "Ich habe eine andere Quelle, Übersetzung oder Formulierungshilfe verwendet",
        ),
      ),
    );
    form.append(assistance);
    const submit = element(
      "button",
      isCheckedTask(task)
        ? t("Save and check", "Speichern und prüfen")
        : t("Save response", "Antwort speichern"),
      "primary",
    );
    submit.type = "submit";
    submit.disabled = !!session.submittedId || !editing;
    form.append(submit);
    form.onsubmit = (event) => {
      event.preventDefault();
      if (busy || session.submittedId) return;
      let restoreControls: (() => void) | undefined;
      void (async () => {
        assertEditable();
        if (busy || session.submittedId) return;
        if (!answer.value.trim()) {
          answer.setAttribute("aria-invalid", "true");
          answer.focus();
          throw new Error(
            t(
              "Write your own response first.",
              "Schreibe zuerst deine eigene Antwort.",
            ),
          );
        }
        if (recorder?.state === "recording" || recordingPending)
          throw new Error(
            t(
              "Stop your recording and wait for it to save.",
              "Beende die Aufnahme und warte, bis sie gespeichert ist.",
            ),
          );
        busy = true;
        restoreControls = disablePracticeControls(
          root.querySelectorAll<
            | HTMLButtonElement
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
          >("button, input, select, textarea"),
        );
        taskPanel.setAttribute("aria-busy", "true");
        errorBox.textContent = "";
        feedback.textContent = t(
          "Saving and checking your response…",
          "Deine Antwort wird gespeichert und geprüft…",
        );
        const value = answer.value;
        const closedRule = task.answerPolicy === "closed" ? unit.rule : "";
        const hash = await sha256(value);
        const capturedAt = now();
        const attempt: AttemptEvent = {
          version: 2,
          type: "attempt",
          id: id(),
          language,
          at: capturedAt,
          task: {
            definitionSha256: await sha256(JSON.stringify(task)),
            id: task.id,
            version: task.version,
            constructionId: task.constructionId,
            familyId: task.familyId,
            itemFamily: task.itemFamily,
            contextId: task.contextId,
            rubricVersion: task.rubricVersion,
            stage: task.stage,
            modality: task.modality,
            partition: task.partition,
            transferCondition: task.transferCondition,
            contentReview: task.contentReview,
          },
          response: {
            text: value,
            sha256: hash,
            originalTranscriptSha256: null,
            transcriptEdited: false,
          },
          timing: {
            startedAt: session.startedAt,
            ...(timer
              ? { ...timer.read(), source: "monotonic_visible" as const }
              : {
                  activeMs: null,
                  firstInputMs: null,
                  source: "unavailable" as const,
                }),
          },
          assistance: {
            hintCount: session.hintCount,
            solutionRevealed: session.solutionRevealed,
            exampleSeen: session.exampleSeen,
            selfReportedAssistance: session.selfReportedAssistance,
          },
          audio: recording
            ? {
                id: recording.id,
                sha256: recording.sha256,
                bytes: recording.blob.size,
                durationMs: recording.durationMs,
                mime: recording.blob.type,
                persisted: true,
              }
            : null,
          previousAttemptId: session.previousAttemptId,
        };
        appendAutomaticityEvent(localStorage, attempt);
        session.submittedId = attempt.id;
        saveSession();
        const paused = (await pausedTaskIds(language)).has(task.id);
        const assessment = assessControlledTask(attempt, task, now(), id(), {
          paused,
        });
        const ruleFor = (shown: typeof assessment) =>
          closedRule && shown.verdict !== "pass" ? closedRule : undefined;
        const applyFeedback = async (proposal: typeof assessment) => {
          const history = await collectAssessmentFeedback(
            readAutomaticityEvents(localStorage, language).events,
            pack,
            now(),
          );
          const guarded = await guardAssessmentWithFeedback(
            attempt,
            task,
            proposal,
            history,
            now(),
            id(),
          );
          persistFeedbackAssessment(localStorage, proposal, guarded);
          return guarded;
        };
        const guarded = await applyFeedback(assessment);
        const shown = guarded ?? assessment;
        showAssessmentFeedback(
          feedback,
          shown.feedback,
          attempt.response.text,
          shown.spans,
          language,
          ruleFor(shown),
        );
        if (
          !guarded &&
          (typeof navigator === "undefined" || navigator.onLine !== false)
        ) {
          const modelAssessment = await qualifiedTransformer(
            attempt,
            assessment,
          );
          if (modelAssessment) {
            const modelGuard = await applyFeedback(modelAssessment);
            const shown = modelGuard ?? modelAssessment;
            showAssessmentFeedback(
              feedback,
              shown.feedback,
              attempt.response.text,
              shown.spans,
              language,
              ruleFor(shown),
            );
          }
        }
      })()
        .catch((error) => {
          if (restoreControls) feedback.textContent = "";
          writeError(error);
        })
        .finally(() => {
          busy = false;
          restoreControls?.();
          taskPanel.removeAttribute("aria-busy");
          try {
            if (restoreControls) {
              renderTask();
              renderProgress();
              renderFocus();
            }
            refreshReviews();
          } catch (error) {
            writeError(error);
          }
        });
    };
    taskPanel.append(form, feedback);
    if (session.submittedId) {
      const saved = ledger().attempts.find(
        (row) => row.attempt.id === session.submittedId,
      );
      if (saved) observeResponse(saved.attempt);
      showAssessmentFeedback(
        feedback,
        saved?.assessment?.feedback ??
          t(
            "Saved. The check was interrupted; this response has no assessment yet.",
            "Gespeichert. Die Prüfung wurde unterbrochen; diese Antwort hat noch keine Bewertung.",
          ),
        saved?.attempt.response.text ?? "",
        saved?.assessment?.spans ?? [],
        language,
        saved?.assessment &&
          saved.assessment.verdict !== "pass" &&
          task.answerPolicy === "closed"
          ? unit.rule
          : undefined,
      );
      if (
        saved &&
        saved.assessment?.verdict !== "pass" &&
        task.modality === "writing" &&
        task.answerPolicy !== "reflection"
      ) {
        const category = practiceFeedbackCategory(saved.assessment);
        const box = element("section", undefined, "repair-guidance");
        box.dataset.feedbackCategory = category;
        const heading = {
          unscored: t("Not scored yet", "Noch ohne Bewertung"),
          grammar: t("Revise the grammar", "Grammatik überarbeiten"),
          target: t(
            "Try the requested pattern",
            "Die gefragte Struktur versuchen",
          ),
          context: t(
            "Check the meaning and situation",
            "Bedeutung und Situation prüfen",
          ),
          accepted: t("Accepted practice form", "Zulässige Übungsform"),
        }[category];
        box.append(
          element("h3", heading),
          element(
            "p",
            category === "unscored"
              ? t(
                  "This wording has no score. It may be correct. You can revise it or request a review; the model is available only when you choose to open it.",
                  "Diese Formulierung hat keine Bewertung. Sie kann richtig sein. Du kannst sie überarbeiten oder prüfen lassen; die Musterlösung wird nur auf deinen Wunsch geöffnet.",
                )
              : t(
                  "Use the feedback to revise your own answer first. Open a hint if needed, then try the pattern in a new situation.",
                  "Überarbeite zuerst deine eigene Antwort mit dem Feedback. Öffne bei Bedarf einen Hinweis und verwende die Struktur danach in einer neuen Situation.",
                ),
          ),
        );
        const repair = button(
          t("Try again as a repair", "Als Korrektur erneut versuchen"),
          async () => {
            const original = saved.attempt;
            await fresh(task, original.id);
            const prepared = prepareLearnerRepair(session, original);
            if (prepared !== session) {
              session = prepared;
              saveSession();
              renderTask();
            }
            const input =
              taskPanel.querySelector<HTMLTextAreaElement>(
                "#practice-response",
              );
            input?.focus();
          },
          "primary",
        );
        repair.dataset.repairAction = "";
        box.append(repair);
        taskPanel.append(box);
      }
      if (saved?.assessment?.correction) {
        taskPanel.append(
          element(
            "p",
            t(
              "Suggested edit — check it before using it",
              "Korrekturvorschlag – vor der Verwendung prüfen",
            ),
          ),
          element("blockquote", saved.assessment.correction, "response-copy"),
        );
      }
      if (
        saved &&
        task.modality === "writing" &&
        task.stage !== "notice" &&
        (!saved.assessment ||
          (saved.assessment.verdict === "not_assessed" &&
            saved.assessment.evaluator.kind !== "human"))
      ) {
        taskPanel.append(
          button(
            t("Retry automatic check", "Automatische Prüfung erneut versuchen"),
            async () => {
              if (busy || !editing) return;
              assertEditable();
              busy = true;
              const restore = disablePracticeControls(
                root.querySelectorAll<
                  | HTMLButtonElement
                  | HTMLInputElement
                  | HTMLSelectElement
                  | HTMLTextAreaElement
                >("button,input,select,textarea"),
              );
              taskPanel.setAttribute("aria-busy", "true");
              errorBox.textContent = "";
              let unavailable = false;
              try {
                const baseline =
                  saved.assessment ??
                  assessControlledTask(saved.attempt, task, now(), id());
                const proposal =
                  baseline.verdict === "not_assessed"
                    ? await qualifiedTransformer(saved.attempt, baseline, {
                        refreshCapabilities: true,
                      })
                    : baseline;
                const unchanged = () => {
                  const current = ledger().attempts.find(
                    (row) => row.attempt.id === saved.attempt.id,
                  );
                  if (
                    !current ||
                    current.assessment?.id !== saved.assessment?.id ||
                    current.reasons.includes("conflicting_assessments")
                  )
                    throw new Error(
                      t(
                        "The review changed while checking. Compare the latest feedback.",
                        "Die Bewertung hat sich während der Prüfung geändert. Vergleiche die neueste Rückmeldung.",
                      ),
                    );
                };
                unchanged();
                if (!proposal) {
                  unavailable = true;
                  return;
                }
                const history = await collectAssessmentFeedback(
                  readAutomaticityEvents(localStorage, language).events,
                  pack,
                  now(),
                );
                const guarded = await guardAssessmentWithFeedback(
                  saved.attempt,
                  task,
                  proposal,
                  history,
                  now(),
                  id(),
                );
                unchanged();
                if (!saved.assessment && proposal !== baseline)
                  appendAutomaticityEvent(localStorage, baseline);
                persistFeedbackAssessment(localStorage, proposal, guarded);
              } finally {
                busy = false;
                restore();
                taskPanel.removeAttribute("aria-busy");
                renderTask();
                renderProgress();
                renderFocus();
                refreshReviews();
                if (unavailable)
                  feedback.textContent = t(
                    "No suitable automatic evaluator is available for this answer now. Your answer and earlier feedback were kept. You can request text suggestions below or arrange a review.",
                    "Für diese Antwort ist derzeit keine geeignete automatische Bewertung verfügbar. Deine Antwort und bisherige Rückmeldung bleiben erhalten. Du kannst unten Textvorschläge anfordern oder eine Prüfung veranlassen.",
                  );
              }
            },
          ),
        );
      }
      if (
        saved &&
        task.answerPolicy !== "reflection" &&
        (!saved.assessment ||
          (saved.assessment.verdict === "not_assessed" &&
            saved.assessment.evaluator.kind === "rule"))
      ) {
        const privacy = element(
          "p",
          t(
            task.modality === "speaking"
              ? "Optional: send only this typed transcript to LanguageTool for text suggestions. Your audio stays on this device. This does not assess the recording, pronunciation or fluency. Your original transcript stays unchanged. "
              : "Optional: send this saved text to LanguageTool for proofreading suggestions. This checks text, not target use or speech. Your original answer stays unchanged. ",
            task.modality === "speaking"
              ? "Optional: Nur dieses getippte Transkript für Textvorschläge an LanguageTool senden. Dein Audio bleibt auf diesem Gerät. Aufnahme, Aussprache und Flüssigkeit werden nicht bewertet. Dein Originaltranskript bleibt erhalten. "
              : "Optional: Diesen gespeicherten Text für Korrekturvorschläge an LanguageTool senden. Geprüft wird der Text, nicht die Zielstruktur oder das Sprechen. Deine Originalantwort bleibt erhalten. ",
          ),
          "muted",
        );
        const providerLink = element("a", "LanguageTool");
        providerLink.href = "https://languagetool.org";
        const privacyLink = element("a", t("Privacy", "Datenschutz"));
        privacyLink.href = "https://languagetool.org/legal/privacy";
        privacy.append(providerLink, " · ", privacyLink);
        taskPanel.append(
          privacy,
          button(
            t(
              task.modality === "speaking"
                ? "Send transcript for text suggestions"
                : "Send text for online proofreading",
              task.modality === "speaking"
                ? "Transkript für Textvorschläge senden"
                : "Text zur Online-Prüfung senden",
            ),
            async () => {
              if (busy || !editing) return;
              busy = true;
              const restore = disablePracticeControls(
                root.querySelectorAll<
                  | HTMLButtonElement
                  | HTMLInputElement
                  | HTMLSelectElement
                  | HTMLTextAreaElement
                >("button,input,select,textarea"),
              );
              taskPanel.setAttribute("aria-busy", "true");
              errorBox.textContent = "";
              feedback.textContent = t(
                "Requesting proofreading suggestions…",
                "Korrekturvorschläge werden angefordert…",
              );
              try {
                const response = await fetch("/api/conversation/evaluate", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  // Sent only from this explicit "send for proofreading" action.
                  body: JSON.stringify({
                    text: saved.attempt.response.text,
                    language,
                    consent: true,
                  }),
                  signal: AbortSignal.timeout(15000),
                  cache: "no-store",
                });
                if (!response.ok)
                  throw new Error(
                    t(
                      "Online proofreading is unavailable. Your saved answer has no new grade; try again later.",
                      "Die Online-Prüfung ist nicht verfügbar. Deine gespeicherte Antwort erhält keine neue Bewertung; versuche es später erneut.",
                    ),
                  );
                const result = parseGrammarFeedback(
                  await response.json(),
                  saved.attempt.response.text,
                );
                const current = ledger().attempts.find(
                  (row) => row.attempt.id === saved.attempt.id,
                );
                if (
                  !current ||
                  current.assessment?.id !== saved.assessment?.id ||
                  current.reasons.includes("conflicting_assessments")
                )
                  throw new Error(
                    t(
                      "The review changed while checking. Compare the latest feedback.",
                      "Die Bewertung hat sich während der Prüfung geändert. Vergleiche die neueste Rückmeldung.",
                    ),
                  );
                const at = new Date(
                  Math.max(
                    Date.now(),
                    Date.parse(saved.assessment?.at ?? saved.attempt.at) + 1,
                  ),
                ).toISOString();
                const proposal = grammarFeedbackAssessment(
                  saved.attempt,
                  result,
                  at,
                  id(),
                  saved.assessment?.id ?? null,
                );
                const history = await collectAssessmentFeedback(
                  readAutomaticityEvents(localStorage, language).events,
                  pack,
                  now(),
                );
                const guarded = await guardAssessmentWithFeedback(
                  saved.attempt,
                  task,
                  proposal,
                  history,
                  now(),
                  id(),
                );
                const latest = ledger().attempts.find(
                  (row) => row.attempt.id === saved.attempt.id,
                );
                if (
                  !latest ||
                  latest.assessment?.id !== saved.assessment?.id ||
                  latest.reasons.includes("conflicting_assessments")
                )
                  throw new Error(
                    t(
                      "The review changed while checking. Compare the latest feedback.",
                      "Die Bewertung hat sich während der Prüfung geändert. Vergleiche die neueste Rückmeldung.",
                    ),
                  );
                persistFeedbackAssessment(localStorage, proposal, guarded);
              } finally {
                busy = false;
                restore();
                taskPanel.removeAttribute("aria-busy");
                renderTask();
                renderProgress();
                renderFocus();
                refreshReviews();
              }
            },
          ),
        );
      }
      if (
        saved &&
        task.modality === "writing" &&
        task.answerPolicy === "closed"
      )
        appendLearnerFeedbackPanel(taskPanel, {
          language,
          contentVersion: pack.version,
          task,
          attempt: saved.attempt,
          assessment: saved.assessment ?? null,
        });
      if (
        !saved ||
        saved.assessment?.verdict === "pass" ||
        task.modality !== "writing" ||
        task.answerPolicy === "reflection"
      )
        taskPanel.append(
          button(
            t("Try again as a repair", "Als Korrektur erneut versuchen"),
            () => fresh(task, session.submittedId),
          ),
        );
    }
    const recommendation = resolveLearningPath(
      pack,
      localStorage,
      now(),
      {},
      recommendationPack(),
    );
    if (session.submittedId && recommendation?.task) {
      taskPanel.append(
        button(
          recommendation.reason === "repair"
            ? t("Repair before continuing", "Vor dem Weitergehen korrigieren")
            : t("Continue learning path", "Lernweg fortsetzen"),
          continueRecommended,
          "primary",
        ),
      );
      taskPanel.append(
        element(
          "p",
          `${t("Next", "Als Nächstes")}: ${recommendation.unit.title} · ${stageNames[stages.indexOf(recommendation.task.stage)]} · ${recommendation.task.modality === "speaking" ? t("Speaking", "Sprechen") : t("Writing", "Schreiben")}`,
          "muted",
        ),
      );
    }
    const cyclePosition =
      task.modality === "writing"
        ? unit.learningCycle?.steps.findIndex((row) => row.taskId === task.id)
        : undefined;
    const nextCycleStep =
      cyclePosition !== undefined && cyclePosition >= 0
        ? unit.learningCycle!.steps[cyclePosition + 1]
        : undefined;
    const current = activeTasks.findIndex((row) => row.id === task.id),
      next =
        cyclePosition !== undefined && cyclePosition >= 0
          ? nextCycleStep
            ? learningCycleTask(unit, nextCycleStep.stage, "writing")
            : undefined
          : (activeTasks
              .slice(current + 1)
              .find((row) => row.modality === task.modality) ??
            activeTasks.find((row) => row.modality === task.modality)!);
    if (!session.submittedId && next)
      taskPanel.append(
        button(t("Next task", "Nächste Aufgabe"), () => fresh(next)),
      );
  }
  document.addEventListener("visibilitychange", () => {
    timer?.visibility(!document.hidden);
    if (document.hidden) microphoneRequest?.abort();
  });
  window.addEventListener("storage", (event) => {
    if (busy) return;
    if (
      event.key?.startsWith(`automaticity:v2:${language}:event:`) ||
      event.key?.startsWith(`automaticity:v2:${language}:scheduler-pilot:`)
    ) {
      renderProgress();
      renderFocus();
    }
  });
  window.addEventListener("automaticity:support-language", (event) => {
    const chosen = (event as CustomEvent<{ target?: Language }>).detail;
    if (
      chosen?.target !== language ||
      busy ||
      recordingPending ||
      recorder?.state === "recording"
    )
      return;
    renderTask();
  });
  window.addEventListener("pagehide", () => {
    microphoneRequest?.abort();
    stream?.getTracks().forEach((track) => track.stop());
    lockRelease?.();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  });
  window.addEventListener("popstate", () => {
    if (editing) saveSession();
    location.reload();
  });
  window.addEventListener("beforeunload", (event) => {
    if (recorder?.state === "recording" || recordingPending || busy) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
  const resumedRetirement = unit.retiredTasks?.find(
    (row) => row.taskId === task.id,
  );
  if (
    resume &&
    editing &&
    resumedRetirement &&
    !requestedTask &&
    !requested.has("review")
  ) {
    await fresh(
      taskById.get(resumedRetirement.replacementTaskId)!,
      resume.previousAttemptId,
    );
    feedback.textContent = t(
      "The updated exercise is ready. Your earlier response remains in saved history.",
      "Die neue Übung ist bereit. Deine frühere Antwort bleibt im gespeicherten Verlauf erhalten.",
    );
  } else if (resume) {
    // An explicitly resumed draft becomes the current session again; its
    // task storage stays byte-for-byte unchanged.
    if (editing)
      localStorage.setItem(sessionKey(language), JSON.stringify(resume));
    renderTask();
    renderProgress();
    if (!resume.submittedId)
      feedback.textContent = t(
        "Your draft was restored. Timing is unavailable for this interrupted attempt.",
        "Dein Entwurf wurde wiederhergestellt. Für diesen unterbrochenen Versuch ist keine Zeitmessung verfügbar.",
      );
  } else if (editing) {
    const recommendation = selectDailyTask(unit, ledger(), now());
    const linkedRepair = repairRequestId
      ? ledger().attempts.find(
          (row) =>
            row.attempt.id === repairRequestId &&
            repairTaskForAttempt(unit, row.attempt)?.id === task.id,
        )
      : undefined;
    await fresh(
      task,
      linkedRepair
        ? linkedRepair.attempt.id
        : recommendation.task?.id === task.id
          ? recommendation.previousAttemptId
          : null,
    );
    if (advancedFromCompleted)
      feedback.textContent = t(
        "Your previous response is saved. The next recommended step is ready.",
        "Deine vorherige Antwort ist gespeichert. Der nächste empfohlene Schritt ist bereit.",
      );
  } else {
    session = {
      version: 2,
      taskId: task.id,
      taskVersion: task.version,
      draft: "",
      startedAt: now(),
      hintCount: 0,
      solutionRevealed: false,
      exampleSeen: false,
      selfReportedAssistance: false,
      previousAttemptId: null,
      submittedId: null,
      audioId: null,
    };
    renderTask();
    renderProgress();
  }
  renderFocus();
  const reviews = element("section", undefined, "card");
  const reviewsDisclosure = element(
    "details",
    undefined,
    "card practice-disclosure",
  );
  reviewsDisclosure.open = requested.has("review") || requested.has("attempt");
  reviewsDisclosure.append(
    element(
      "summary",
      t(
        "Saved responses & independent review",
        "Gespeicherte Antworten & unabhängige Prüfung",
      ),
    ),
    reviews,
  );
  if (staffRole) root.append(reviewsDisclosure);
  const refreshReviews = staffRole
    ? mountReviewPanel(
        reviews,
        language,
        pack,
        () => {
          renderTask();
          renderProgress();
          renderFocus();
        },
        editing,
      )
    : () => {};
  if (location.hash === "#backup-tools") {
    tools.open = true;
    transferGuide.open = true;
    tools.scrollIntoView({ block: "start" });
  }
  if ("serviceWorker" in navigator)
    void navigator.serviceWorker.register("/sw.js").catch(() => {
      /* Practice remains usable; offline readiness is checked separately. */
    });
}
