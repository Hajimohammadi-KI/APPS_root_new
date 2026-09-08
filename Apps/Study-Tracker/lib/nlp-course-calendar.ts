import { trackerRestartPlan, type NlpCourseSession } from "../app/plan-data";

export function buildCourseReadingPlanDescription(
  session: NlpCourseSession,
  formatReading: (readingId: string) => string,
) {
  return [
    "Teilnahmemodus: Live beobachten; keine Vorablektüre und kein Pflichtartefakt.",
    `Nach Teilnahme: maximal ${trackerRestartPlan.liveSessionPolicy.noteLineLimit} Zeilen — verstanden; Thesis-Bezug; offene Frage.`,
    `Wenn verpasst: nicht vor ${trackerRestartPlan.catchUpPolicy.earliestDate} nachholen.`,
    `Referenzmaterial erst nach dem Neustart und nur bei direktem Wochenblocker: ${session.readingIds.map(formatReading).join("; ")}`,
  ].join("\n");
}
