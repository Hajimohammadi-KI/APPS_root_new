import {
  activePracticeTasks,
  type ConstructionUnit,
  type CurriculumPack,
  type PracticeTask,
} from "./curriculum";
import type { ReducedAttempt } from "./evidence";

/** Items written from a learner's error notebook carry this source. */
const NOTEBOOK_SOURCE = "learner-notebook-";
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
/** Notebook items the daily plan suggests per day; more stay available. */
export const DAILY_NOTEBOOK_GOAL = 5;
export const RECENT_GERMAN_NOTEBOOK_VERSION = "2026-11-06.1";
const RECENT_GERMAN_NOTEBOOK_ORDER = [
  "NOV06-WEIL",
  "NOV06-MIETE",
  "NOV06-FOLGE",
  "NOV06-UNI",
  "NOV06-HERR",
  "NOV06-AKZEPTIEREN",
  "NOV06-GENITIV",
  "NOV06-WIDERSPRUCH",
];

export const isNotebookTask = (task: Pick<PracticeTask, "sourceId">) =>
  task.sourceId.startsWith(NOTEBOOK_SOURCE);

/** The wording of the notebook card and daily block. Every visitor sees the
 * same items, written from one learner's notebook, so it names the notebook
 * without calling the items the visitor's own errors. */
export function notebookCopy(language: "en" | "de") {
  const en = language === "en";
  type Count = { passed: number; total: number };
  return {
    title: en ? "Error notebook" : "Fehlerheft",
    todayTitle: en
      ? "Today from the error notebook"
      : "Heute aus dem Fehlerheft",
    source: en
      ? "Written from a learner's real writing errors."
      : "Aus anonymisierten Schreibbeispielen und gemeldeten Sätzen einer lernenden Person. Automatische Transkripte können ungenau sein.",
    progressBasis: en
      ? "Counts use the latest response to each exercise. A checked pass is practice progress, not independent mastery."
      : "Die Zählung folgt der jeweils letzten Antwort. Ein geprüftes Bestehen zeigt Übungsfortschritt, keinen Nachweis selbstständiger Beherrschung.",
    thisTask: en
      ? "The task below is from the error notebook."
      : "Die Aufgabe unten stammt aus dem Fehlerheft.",
    noneAt: (level: string) =>
      en
        ? `There are no error-notebook exercises at ${level}.`
        : `Auf ${level} gibt es keine Übungen aus dem Fehlerheft.`,
    progress: (level: string, atLevel: Count, all: Count) =>
      en
        ? `${atLevel.passed} of ${atLevel.total} exercises at ${level} passed · all levels: ${all.passed} of ${all.total}.`
        : `${atLevel.passed} von ${atLevel.total} Übungen auf ${level} bestanden · alle Niveaus: ${all.passed} von ${all.total}.`,
  };
}

export interface NotebookProgress {
  total: number;
  passed: number;
  /** Distinct items tried on the local calendar day of `now`. */
  today: number;
  next: {
    unit: ConstructionUnit;
    task: PracticeTask;
    /** The latest attempt the next item repairs, if it was tried before. */
    previousAttemptId: string | null;
  } | null;
}

/** The active error-notebook items in level order, or those of one grammar
 * level. Only the latest response to the active task version can count as a
 * checked pass; an old pass never hides a newer error or unscored response.
 * Daily effort is separate. The next item is one not yet tried; once all were
 * tried, one still not passed, as a repair of its latest relevant attempt. */
export function notebookProgress(
  pack: CurriculumPack,
  attempts: readonly ReducedAttempt[],
  {
    level,
    now,
    sourceVersion,
  }: { level?: string; now?: string; sourceVersion?: string } = {},
): NotebookProgress {
  const items = pack.units
    .map((unit, order) => ({ unit, order }))
    .filter(({ unit }) => !level || unit.level === level)
    .sort(
      (a, b) =>
        LEVELS.indexOf(a.unit.level) - LEVELS.indexOf(b.unit.level) ||
        a.order - b.order,
    )
    .flatMap(({ unit }) =>
      activePracticeTasks(unit)
        .filter(
          (task) =>
            isNotebookTask(task) &&
            (!sourceVersion ||
              task.sourceId.startsWith(`${NOTEBOOK_SOURCE}${sourceVersion}:`)),
        )
        .map((task) => ({ unit, task })),
    );
  if (sourceVersion === RECENT_GERMAN_NOTEBOOK_VERSION) {
    const order = (task: PracticeTask) => {
      const index = RECENT_GERMAN_NOTEBOOK_ORDER.indexOf(
        task.sourceId.split(":").at(-1) ?? "",
      );
      return index < 0 ? Number.MAX_SAFE_INTEGER : index;
    };
    items.sort((a, b) => order(a.task) - order(b.task));
  }
  const definitions = new Map(items.map(({ task }) => [task.id, task]));
  const cutoff = now === undefined ? Date.now() : Date.parse(now);
  const day = new Date(cutoff).toDateString();
  const latest = new Map<string, ReducedAttempt>();
  const today = new Set<string>();
  for (const row of attempts) {
    const id = row.attempt.task.id;
    const definition = definitions.get(id);
    const at = Date.parse(row.attempt.at);
    if (
      !definition ||
      row.attempt.language !== pack.language ||
      !Number.isFinite(at) ||
      !Number.isFinite(cutoff) ||
      at > cutoff
    )
      continue;
    if (new Date(at).toDateString() === day) today.add(id);
    if (row.attempt.task.version !== definition.version) continue;
    const known = latest.get(id);
    const knownAt = known ? Date.parse(known.attempt.at) : -Infinity;
    if (
      !known ||
      at > knownAt ||
      (at === knownAt && row.attempt.id > known.attempt.id)
    )
      latest.set(id, row);
  }
  const open = items.filter(({ task }) => {
    const row = latest.get(task.id);
    return !row?.checked || row.assessment?.verdict !== "pass";
  });
  const next = open.find(({ task }) => !latest.has(task.id)) ?? open[0] ?? null;
  return {
    total: items.length,
    passed: items.length - open.length,
    today: today.size,
    next: next && {
      ...next,
      previousAttemptId: latest.get(next.task.id)?.attempt.id ?? null,
    },
  };
}
