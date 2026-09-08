import {
  makeLesson,
  itemsFor,
  completionReady,
  matchesModel,
  reviewIsDue,
  scheduleReviews,
  type Step,
  type Language,
} from "./model";
import type { GrammarWorksheet } from "../grammar-worksheets/model";
import {
  render,
  fieldKey,
  currentItem,
  oralPrompt,
  type ViewState,
} from "./view";
import { text } from "./copy";
import {
  loadSession,
  saveSession,
  submitPractice,
  createClientId,
  sha256,
  prefix,
} from "./persistence";
import { captureCompleteBackup } from "../learning-core/src/automaticity/backup";
import {
  StudioRecorder,
  type RecordingSnapshot,
} from "../conversation-flow/recorder";
import { saveAttempt, readStudio } from "../conversation-flow/storage";
import {
  editTranscript,
  confirmTranscript,
  attachEvaluation,
  type Attempt,
} from "../conversation-flow/model";

declare global {
  interface Window {
    GrammarWorksheets: { worksheets: GrammarWorksheet[] };
    GrammarWorksheetInk: {
      mount(
        root: HTMLElement,
        options: {
          language: Language;
          get(id: string): unknown;
          set(id: string, value: unknown[]): void;
        },
      ): () => void;
    };
  }
}
const host = document.getElementById("seven-step-root")!;
const language: Language = document.documentElement.lang === "de" ? "de" : "en";
const t = (de: string, en: string) => text(language, de, en);
const lessons = window.GrammarWorksheets.worksheets.map(makeLesson);
const query = new URLSearchParams(location.search);
let last: string | null = null;
try {
  last = localStorage.getItem(prefix(language) + "last");
} catch {
  /* Show the storage error when mounting the saved lesson. */
}
let lesson =
  lessons.find((l) => l.worksheet.id === (query.get("lesson") || last)) ||
  lessons[0]!;
let disposeInk: (() => void) | undefined;
let audioUrl: string | undefined;
let recorder: StudioRecorder | null = null;
let operation = false;
let sequence = 0;
let recordings: Attempt[] = [];
let storageWarning = "";
let pendingWrites: Promise<void> = Promise.resolve();
let view: ViewState;

function notify(message: string, failed = false): void {
  const node = document.getElementById("flow-status");
  if (node) {
    node.textContent = message;
    node.classList.toggle("failure", failed);
  }
}
function persist(): void {
  saveSession(view.session);
}
function fieldText(id: string): string {
  const value = view.session.fields[id];
  return typeof value === "string" ? value : "";
}
function fieldHasAnswer(id: string): boolean {
  return Boolean(
    fieldText(id).trim() ||
    (Array.isArray(view.session.fields[id + ":ink"]) &&
      view.session.fields[id + ":ink"]!.length),
  );
}
function modeKey(): string {
  return `${fieldKey(view.session)}:mode`;
}
function refreshRecording(): void {
  const id = fieldText(`${fieldKey(view.session)}:recording`);
  view.recording = recordings.find((a) => a.id === id);
  const mode = fieldText(modeKey());
  view.mode = mode === "feedback" || mode === "speak" ? mode : "prepare";
  // A reloaded tab cannot resume a lost microphone stream. Preserve the checkpoint.
  if (view.mode === "speak" && !view.capturing)
    view.mode = view.recording ? "feedback" : "prepare";
}
function expose(id: string): void {
  if (!view.session.exposed.includes(id)) {
    view.session.exposed.push(id);
    persist();
  }
}
function draw(): void {
  disposeInk?.();
  disposeInk = undefined;
  if (audioUrl) {
    URL.revokeObjectURL(audioUrl);
    audioUrl = undefined;
  }
  host.innerHTML = render(view);
  const address = new URL(location.href);
  address.searchParams.set("lesson", view.session.lessonId);
  if (view.overview) address.searchParams.delete("step");
  else address.searchParams.set("step", String(view.session.step));
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
    },
  });
  const audio = host.querySelector<HTMLAudioElement>("[data-recorded-audio]");
  if (audio && view.recording) {
    audioUrl = URL.createObjectURL(view.recording.audio);
    audio.src = audioUrl;
    audio.playbackRate = view.session.rate;
  }
  host
    .querySelectorAll<HTMLDetailsElement>("details[data-exposure]")
    .forEach((el) =>
      el.addEventListener("toggle", () => {
        if (el.open)
          try {
            expose(el.dataset.exposure!);
          } catch (error) {
            notify(String(error), true);
          }
      }),
    );
  if (
    !view.overview &&
    view.session.step === 1 &&
    !view.session.fields[`${fieldKey(view.session)}:hidden`]
  ) {
    try {
      expose(`model:${fieldKey(view.session)}`);
    } catch (error) {
      notify(String(error), true);
    }
  }
  if (storageWarning) notify(storageWarning, true);
  if (
    !view.overview &&
    view.session.persian &&
    !view.capturing &&
    view.session.step !== 7
  ) {
    try {
      expose(`persian-guide:${fieldKey(view.session)}`);
    } catch (error) {
      notify(String(error), true);
    }
  }
}
function setMode(mode: ViewState["mode"]): void {
  view.mode = mode;
  view.session.fields[modeKey()] = mode;
  persist();
  draw();
}
function moveStep(step: Step): void {
  window.speechSynthesis?.cancel();
  view.session.step = step;
  view.session.position = 0;
  view.session.shadowStage = 0;
  view.session.reviewDay = null;
  if (!view.session.visited.includes(step)) view.session.visited.push(step);
  view.overview = false;
  persist();
  refreshRecording();
  draw();
  window.scrollTo({ top: 0 });
}
function audioTask(): string {
  const item = currentItem(view);
  return (
    item?.prompt ??
    (view.session.step === 6
      ? `Listening stage ${view.session.shadowStage + 1}: ${view.lesson.worksheet.personal[0]}`
      : oralPrompt(view.lesson.worksheet.personal[0]!))
  );
}
async function startRecording(): Promise<void> {
  if (recorder || view.capturing) return;
  window.speechSynthesis?.cancel();
  const session = view.session,
    key = fieldKey(session),
    id = createClientId(),
    at = new Date().toISOString(),
    generation = ++sequence;
  const parentId = fieldText(`${key}:previous-recording`);
  let attempt: Attempt = {
    id,
    sessionId: session.id,
    topicId: `daily:${session.lessonId}`,
    language,
    createdAt: at,
    updatedAt: at,
    kind: parentId ? "immediate-retry" : "initial",
    ...(parentId ? { parentId } : {}),
    task: audioTask(),
    contentVersion: lesson.version,
    hintsUsed: [
      ...session.exposed,
      ...(session.step === 6 && session.shadowStage === 3
        ? ["model-playback-during-capture"]
        : []),
    ],
    audio: new Blob(),
    captureState: "recording",
    durationMs: 0,
    rawTranscript: "",
    transcriptSource: "unavailable",
    editedTranscript: "",
    errorNote: "",
    contrastNote: "",
  };
  const store = async (snapshot: RecordingSnapshot, finished: boolean) => {
    attempt = {
      ...attempt,
      audio: snapshot.audio,
      durationMs: snapshot.durationMs,
      rawTranscript: snapshot.rawTranscript,
      editedTranscript: snapshot.rawTranscript,
      transcriptSource: snapshot.transcriptSource,
      captureState: snapshot.captureState,
      updatedAt: new Date().toISOString(),
    };
    const frozen = attempt;
    pendingWrites = pendingWrites
      .catch(() => undefined)
      .then(async () => {
        await saveAttempt(frozen);
        if (!session.recordingIds.includes(id)) session.recordingIds.push(id);
        session.fields[`${key}:recording`] = id;
        session.fields[`transcript:${id}`] = frozen.editedTranscript;
        if (finished) session.fields[`${key}:mode`] = "feedback";
        saveSession(session);
        recordings = recordings.filter((a) => a.id !== id).concat(frozen);
      });
    try {
      await pendingWrites;
    } catch (error) {
      storageWarning =
        t(
          "Aufnahme konnte nicht gespeichert werden: ",
          "Recording could not be saved: ",
        ) + String(error);
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
      const clock = document.getElementById("record-time"),
        wave = document.getElementById("input-level");
      if (clock)
        clock.textContent = `${Math.floor(milliseconds / 60000)}:${String(Math.floor(milliseconds / 1000) % 60).padStart(2, "0")}`;
      if (wave)
        wave.style.transform = `scaleX(${Math.min(1, Math.max(0, level * 6))})`;
    },
    checkpoint: (snapshot) => {
      void store(snapshot, false);
    },
    stopped: (snapshot) => {
      void store(snapshot, true);
    },
    recognitionUnavailable: () =>
      notify(
        t(
          "Spracherkennung nicht verfügbar. Die Aufnahme läuft weiter.",
          "Speech recognition unavailable. Audio recording continues.",
        ),
      ),
    interrupted: () => {
      view.paused = true;
      notify(
        t(
          "Aufnahme unterbrochen. Gespeicherte Teile bleiben erhalten.",
          "Recording interrupted. Saved segments are retained.",
        ),
        true,
      );
    },
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
    notify(
      cause.includes("unsupported")
        ? t(
            "Für das Mikrofon ist vertrauenswürdiges HTTPS nötig. Text und Stift funktionieren hier weiterhin.",
            "Microphone recording needs trusted HTTPS. Text and pen input still work here.",
          )
        : t(
            "Mikrofon nicht verfügbar. Prüfe Berechtigung und Gerät. ",
            "Microphone unavailable. Check permission and device. ",
          ) + cause,
      true,
    );
  }
}
function speakModel(sentences: string[]): void {
  if (!("speechSynthesis" in window)) {
    notify(
      t("Sprachausgabe nicht verfügbar.", "Speech synthesis unavailable."),
      true,
    );
    return;
  }
  if (
    view.capturing &&
    !(view.session.step === 6 && view.session.shadowStage === 3)
  )
    return;
  expose(`audio-model:${fieldKey(view.session)}`);
  window.speechSynthesis.cancel();
  for (const sentence of sentences) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = language === "de" ? "de-DE" : "en-US";
    utterance.rate = view.session.rate;
    utterance.onerror = () =>
      notify(
        t(
          "Sprachausgabe nicht verfügbar. Prüfe die installierte Stimme.",
          "Speech synthesis unavailable. Check the installed voice.",
        ),
        true,
      );
    speechSynthesis.speak(utterance);
  }
}
async function submit(review = false): Promise<void> {
  const s = view.session,
    key = fieldKey(s),
    item = currentItem(view),
    recording = view.recording;
  const isSpeech =
    [3, 4].includes(s.step) || (s.step === 6 && s.shadowStage >= 2);
  const answerId =
    isSpeech && recording ? `transcript:${recording.id}` : `${key}:answer`;
  if (!fieldHasAnswer(answerId) && !(isSpeech && recording?.audio.size)) {
    notify(
      t(
        "Schreibe oder sprich zuerst deine Antwort.",
        "Write or record your answer first.",
      ),
      true,
    );
    return;
  }
  if (!fieldHasAnswer(`${key}:why`)) {
    notify(
      t(
        "Ergänze deinen Grund. Du kannst auch mit Stift schreiben.",
        "Add your reason. You can also write it with a pen.",
      ),
      true,
    );
    return;
  }
  const itemId = review
    ? `review-${s.reviewDay}`
    : (item?.id ??
      (s.step === 4
        ? "speak-personal"
        : s.step === 5
          ? "write-personal"
          : s.step === 6
            ? `shadow-${s.shadowStage}`
            : "exit"));
  const answer = fieldText(answerId),
    why = fieldText(`${key}:why`);
  const audio =
    isSpeech && recording
      ? {
          id: recording.id,
          sha256: await sha256(await recording.audio.arrayBuffer()),
          bytes: recording.audio.size,
          durationMs: recording.durationMs,
          mime: recording.audio.type,
          persisted: !storageWarning,
        }
      : null;
  const result = await submitPractice(
    s,
    view.lesson,
    itemId,
    answer,
    why,
    item && !isSpeech && answer.trim()
      ? matchesModel(answer, item.answer)
      : null,
    audio,
    isSpeech ? recording?.rawTranscript : undefined,
  );
  if (item) expose(`answer:${item.id}`);
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
  notify(
    result.modelMatch === true
      ? t(
          "Passt zum Modell. Übung gespeichert.",
          "Matches the model. Practice saved.",
        )
      : t(
          "Antwort gespeichert. Vergleiche die Zielentscheidung; andere passende Antworten sind möglich.",
          "Response saved. Compare the target decision; other valid answers are possible.",
        ),
  );
}
async function handle(action: string, button: HTMLElement): Promise<void> {
  const s = view.session;
  if (view.capturing && !["pause", "stop"].includes(action)) return;
  if (
    action === "overview" ||
    action === "save-exit" ||
    action === "leave-review"
  ) {
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
    moveStep(Number(button.dataset.step) as Step);
    return;
  }
  if (action === "previous-step") {
    moveStep(Math.max(1, s.step - 1) as Step);
    return;
  }
  if (action === "next-step") {
    if (!completionReady(s, view.lesson)) {
      notify(
        t(
          "Es fehlen noch Antworten. Speichere sie oder wähle „Später fortsetzen“.",
          "Some responses are still missing. Save them or choose ‘Continue later’.",
        ),
        true,
      );
      return;
    }
    if (!s.completed.includes(s.step)) s.completed.push(s.step);
    if (s.step === 7) {
      view.overview = true;
      persist();
      draw();
    } else moveStep((s.step + 1) as Step);
    return;
  }
  if (action === "skip-step") {
    persist();
    if (s.step === 7) {
      view.overview = true;
      draw();
    } else moveStep((s.step + 1) as Step);
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
    s.position = Math.max(
      0,
      Math.min(length - 1, s.position + (action === "next-item" ? 1 : -1)),
    );
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
    speakModel([view.lesson.script[Number(button.dataset.index)]!]);
    return;
  }
  if (action === "stop-listening") {
    window.speechSynthesis?.cancel();
    return;
  }
  if (action === "shadow-next") {
    if (
      !s.submissions.some(
        (a) => a.step === 6 && a.itemId === `shadow-${s.shadowStage}`,
      )
    ) {
      notify(
        t(
          "Speichere zuerst deine Antwort mit Grund.",
          "Save your answer and reason first.",
        ),
        true,
      );
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
      notify(
        t("Speichere zuerst den Abschlusscheck.", "Save the exit check first."),
        true,
      );
      return;
    }
    if (!s.completed.includes(7)) s.completed.push(7);
    s.closedAt = new Date().toISOString();
    if (!s.reviews.length)
      s.reviews = scheduleReviews(
        new Date(s.closedAt),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      );
    persist();
    view.overview = true;
    draw();
    notify(
      t(
        "Gespeichert. Wiederholungen geplant; Beurteilung noch offen.",
        "Saved. Reviews scheduled; assessment remains pending.",
      ),
    );
    return;
  }
  if (action === "review") {
    const day = Number(button.dataset.day),
      review = s.reviews.find((r) => r.day === day);
    if (!review || !reviewIsDue(review)) return;
    s.step = 7;
    s.reviewDay = day;
    view.overview = false;
    persist();
    draw();
    return;
  }
  if (action === "confirm" && view.recording) {
    const attempt = confirmTranscript(
      editTranscript(
        view.recording,
        fieldText(`transcript:${view.recording.id}`),
      ),
    );
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
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok)
      throw new Error(
        t(
          "Textprüfung nicht verfügbar. Deine Antwort bleibt gespeichert.",
          "Text checking unavailable. Your response is still saved.",
        ),
      );
    const attempt = attachEvaluation(original, await response.json());
    // Discard stale provider results after a transcript edit or topic switch.
    if (
      view.recording?.id !== original.id ||
      fieldText(`transcript:${original.id}`) !== original.editedTranscript
    )
      return;
    await saveAttempt(attempt);
    recordings = recordings.filter((a) => a.id !== attempt.id).concat(attempt);
    view.recording = attempt;
    draw();
    return;
  }
  if (action === "backup") {
    // Finish queued transcript/audio writes before claiming a complete snapshot.
    await pendingWrites;
    const backup = await captureCompleteBackup(
      { storage: localStorage, indexedDB },
      language,
      undefined,
      [[`${prefix(language)}${s.lessonId}`, JSON.stringify(s)]],
    );
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(backup)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `automaticity-${language}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify(t("Sicherung exportiert.", "Backup exported."));
  }
}
host.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLElement>(
    "[data-action]",
  );
  if (!button || operation) return;
  operation = true;
  void handle(button.dataset.action!, button)
    .catch((error) => notify(String(error), true))
    .finally(() => {
      operation = false;
    });
});
host.addEventListener("input", (event) => {
  const field = (event.target as Element).closest<HTMLTextAreaElement>(
    "textarea[data-field]",
  );
  if (!field) return;
  view.session.fields[field.dataset.field!] = field.value;
  if (field.dataset.field?.startsWith("transcript:") && view.recording) {
    view.recording = editTranscript(view.recording, field.value);
    host.querySelector("[data-provider-feedback]")?.remove();
    const frozen = view.recording;
    recordings = recordings.filter((a) => a.id !== frozen.id).concat(frozen);
    pendingWrites = pendingWrites
      .catch(() => undefined)
      .then(() => saveAttempt(frozen));
    void pendingWrites.catch((error) => notify(String(error), true));
    host
      .querySelector<HTMLButtonElement>('[data-action="evaluate"]')
      ?.setAttribute("disabled", "");
  }
  try {
    persist();
    notify(t("Entwurf gespeichert.", "Draft saved."));
  } catch (error) {
    notify(String(error), true);
  }
});
host.addEventListener("change", (event) => {
  const element = event.target as HTMLInputElement | HTMLSelectElement,
    setting = element.dataset.setting;
  if (!setting || view.capturing) return;
  try {
    if (setting === "lesson" || setting === "level") {
      persist();
      const selected = lessons.find((l) =>
        setting === "lesson"
          ? l.worksheet.id === element.value
          : l.worksheet.level === element.value,
      );
      if (!selected) return;
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
      view.session.persian = (element as HTMLInputElement).checked;
    if (setting === "rate") view.session.rate = Number(element.value);
    if (setting === "seconds") view.session.seconds = Number(element.value);
    persist();
    if (setting === "rate") {
      const audio = host.querySelector<HTMLAudioElement>(
        "[data-recorded-audio]",
      );
      if (audio) audio.playbackRate = view.session.rate;
      window.speechSynthesis?.cancel();
    } else draw();
  } catch (error) {
    notify(String(error), true);
  }
});
async function boot(): Promise<void> {
  const session = loadSession(language, lesson);
  const requested = Number(query.get("step"));
  if (
    requested >= 1 &&
    requested <= 7 &&
    Number.isInteger(requested) &&
    requested !== session.step
  ) {
    session.step = requested as Step;
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
    paused: false,
  };
  try {
    recordings = (await readStudio(language)).attempts;
  } catch {
    storageWarning = t(
      "Aufnahmespeicher nicht verfügbar. Text und Stift bleiben nutzbar.",
      "Recording storage unavailable. Text and pen input remain available.",
    );
  }
  refreshRecording();
  persist();
  draw();
}
void boot().catch((error) => {
  host.replaceChildren();
  const p = document.createElement("p");
  p.textContent = String(error);
  host.append(p);
  const a = document.createElement("a");
  a.href = "/practice";
  a.textContent = t(
    "Daten sichern und wiederherstellen",
    "Back up and restore data",
  );
  host.append(a);
});
