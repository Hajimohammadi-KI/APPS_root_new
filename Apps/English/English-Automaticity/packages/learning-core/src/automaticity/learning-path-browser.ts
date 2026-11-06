import type { Language } from "./contracts";
import type { CurriculumPack } from "./curriculum";
import {
  resolveLearningPath,
  type LearningPathRequest,
  type LearningPathSelection,
} from "./learning-path";
import { loadCurriculumPack } from "./overview";
import { loadSchedulerPilot, type LoadedPilot } from "./scheduler-pilot-panel";
import {
  outsidePilotPack,
  readPilotEnrollment,
  schedulerPilotCards,
} from "./scheduler-pilot";
import { readAutomaticityEvents } from "./storage";
import { buildDailyPathSteps } from "./daily-path-plan";
import { mountDailyReminder } from "./daily-reminder-browser";
import { readSupportLanguage } from "./support-language";

function launchRequest(): LearningPathRequest {
  const params = new URLSearchParams(location.search);
  const request: LearningPathRequest = {};
  for (const key of ["level", "topic", "constructionId"] as const) {
    const value = params.get(key);
    if (value) request[key] = value;
  }
  const task = params.get("task");
  if (task) request.taskId = task;
  return request;
}

/** Subscribe without writing preferences or importing legacy learning records. */
export function watchLearningPath(
  language: Language,
  update: (value: LearningPathSelection | null) => void,
  request?: () => LearningPathRequest,
): () => void {
  let active = true;
  let pack: CurriculumPack | null = null;
  let loading = false;
  let pilot: LoadedPilot | null = null;
  let ignoreLaunch = false;
  const refresh = async () => {
    if (loading || !active) return;
    let result: LearningPathSelection | null = null;
    try {
      if (!pack) {
        loading = true;
        pack = await loadCurriculumPack(language);
        pilot = await loadSchedulerPilot(pack, localStorage);
      }
      const at = new Date().toISOString();
      const policyPack = pilot
        ? outsidePilotPack(
            pack,
            schedulerPilotCards(
              pilot.plan,
              readPilotEnrollment(localStorage, pilot.plan, pilot.sha256),
              readAutomaticityEvents(localStorage, language).events,
              at,
            ),
          )
        : pack;
      result = resolveLearningPath(
        pack,
        localStorage,
        at,
        request ? request() : ignoreLaunch ? {} : launchRequest(),
        policyPack,
      );
    } catch {
      // No default topic is substituted for unavailable saved data/catalog.
    } finally {
      loading = false;
    }
    if (active) update(result);
  };
  const changed = () => {
    void refresh();
  };
  const choiceChanged = () => {
    ignoreLaunch = true;
    changed();
  };
  const events = [
    "storage",
    "focus",
    "pageshow",
    "automaticity-history-updated",
    "language-topic-changed",
  ];
  for (const event of events) window.addEventListener(event, changed);
  window.addEventListener("automaticity-choice-updated", choiceChanged);
  void refresh();
  return () => {
    active = false;
    for (const event of events) window.removeEventListener(event, changed);
    window.removeEventListener("automaticity-choice-updated", choiceChanged);
  };
}

/** The primary recommendation sits above the separately labelled extra activities. */
export function mountDailyLearningPath(
  root: HTMLElement,
  language: Language,
): () => void {
  const t = (en: string, de: string) => (language === "en" ? en : de);
  root.setAttribute("aria-label", t("Main learning path", "Hauptlernweg"));
  root.style.cssText =
    "display:grid;gap:8px;margin:16px 0;padding:18px 20px;border:1px solid #cfe0e4;border-radius:18px;background:#fff;color:#08364a;line-height:1.55;overflow-wrap:anywhere";
  const heading = document.createElement("h2");
  heading.textContent = t("Your next step", "Dein nächster Schritt");
  heading.style.margin = "0";
  const focus = document.createElement("p");
  focus.dataset.learningPathFocus = "";
  const explanation = document.createElement("p");
  explanation.textContent = t(
    "This is your recommended exercise. The seven activities below are extra practice.",
    "Das ist deine empfohlene Übung. Die sieben Aktivitäten unten sind zusätzliche Übungen.",
  );
  const link = document.createElement("a");
  link.textContent = t(
    "Continue main learning path",
    "Hauptlernweg fortsetzen",
  );
  link.dataset.learningPathPrimary = "";
  link.style.cssText =
    "justify-self:start;display:inline-flex;min-height:44px;align-items:center;padding:8px 16px;border-radius:12px;background:#007f83;color:#fff;font-weight:700;text-decoration:none";
  link.href = "/practice";
  const route = document.createElement("section");
  route.dataset.dailyPathPlan = "";
  route.style.cssText =
    "display:grid;gap:8px;margin-top:8px;padding-top:14px;border-top:1px solid #cfe0e4";
  const routeHeading = document.createElement("h3");
  routeHeading.textContent = t("Today's learning route", "Dein Lernweg heute");
  routeHeading.style.margin = "0";
  const routeSteps = document.createElement("ol");
  routeSteps.style.cssText =
    "display:grid;gap:8px;margin:0;padding-inline-start:24px";
  route.append(routeHeading, routeSteps);
  const reminder = mountDailyReminder(language);
  root.replaceChildren(
    heading,
    focus,
    explanation,
    link,
    route,
    reminder.element,
  );
  let currentSelection: LearningPathSelection | null = null;
  const renderRoute = () => {
    const displayLanguage = readSupportLanguage(language);
    routeHeading.textContent =
      displayLanguage === "fa"
        ? "برنامهٔ کوتاه امروز"
        : displayLanguage === "en"
          ? "Today's learning route"
          : "Dein Lernweg heute";
    route.dir = displayLanguage === "fa" ? "rtl" : "ltr";
    route.lang = displayLanguage;
    routeSteps.dir = displayLanguage === "fa" ? "rtl" : "ltr";
    routeSteps.lang = displayLanguage;
    routeSteps.replaceChildren(
      ...(currentSelection
        ? buildDailyPathSteps(currentSelection, language, displayLanguage).map(
            (step) => {
              const item = document.createElement("li");
              const title =
                step.href && step.id !== "priority"
                  ? document.createElement("a")
                  : document.createElement("strong");
              title.textContent = step.label;
              if (title instanceof HTMLAnchorElement) title.href = step.href!;
              const detail = document.createElement("p");
              detail.textContent = step.detail;
              detail.style.margin = "0";
              item.append(title, detail);
              return item;
            },
          )
        : []),
    );
  };
  const stop = watchLearningPath(language, (selection) => {
    currentSelection = selection;
    focus.textContent = selection
      ? `${selection.unit.title} · ${selection.level}`
      : t(
          "The next step is temporarily unavailable. Open practice to check your saved work.",
          "Der nächste Schritt ist vorübergehend nicht verfügbar. Öffne die Übung, um deine gespeicherten Antworten zu prüfen.",
        );
    for (const anchor of document.querySelectorAll<HTMLAnchorElement>(
      "[data-learning-path-primary]",
    ))
      anchor.href = selection?.href ?? "/practice";
    for (const node of document.querySelectorAll<HTMLElement>(
      "[data-learning-path-topic]",
    ))
      node.textContent = focus.textContent;
    renderRoute();
    if (selection) {
      const notebook = document.querySelector<HTMLElement>(
        "[data-notebook-daily]",
      );
      if (notebook) notebook.dataset.level = selection.level;
    }
  });
  window.addEventListener("automaticity:support-language", renderRoute);
  return () => {
    stop();
    window.removeEventListener("automaticity:support-language", renderRoute);
    reminder.stop();
    root.replaceChildren();
  };
}
