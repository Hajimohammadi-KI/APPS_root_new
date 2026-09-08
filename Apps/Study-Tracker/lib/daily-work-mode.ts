export type DailyWorkMode = "rescue" | "light" | "full";

export const DAILY_WORK_MODES = {
  rescue: {
    label: "12-Minuten-Rettung",
    shortLabel: "Rettung",
    totalMinutes: 12,
    taskMinutes: [0, 0, 12] as const,
    requiredTaskIndexes: [2] as const,
    description: "Ein kleines Tagesergebnis sichern. Die zwei übrigen Ergebnisse sind heute ausdrücklich optional und erzeugen keinen Rückstand.",
  },
  light: {
    label: "70 Minuten leicht",
    shortLabel: "Leicht",
    totalMinutes: 70,
    taskMinutes: [25, 0, 45] as const,
    requiredTaskIndexes: [0, 2] as const,
    description: "Ein Verständnis- und ein Tagesergebnis. Die formale Vertiefung bleibt optional und wird nicht als Rückstand gewertet.",
  },
  full: {
    label: "8 Stunden Vollzeit",
    shortLabel: "8 Stunden",
    totalMinutes: 480,
    taskMinutes: [80, 100, 60] as const,
    requiredTaskIndexes: [0, 1, 2] as const,
    description: "Vier Stunden Forschung oder Projektlernen und vier Stunden Umsetzung, Test und Dokumentation. Pausen teilen den Tag in kleine Einheiten; sie sind keine Lese-Deadline.",
  },
} as const;

export function normalizeDailyWorkMode(value: unknown): DailyWorkMode {
  return value === "rescue" || value === "light" || value === "full" ? value : "full";
}

export function workModeTaskMinutes(mode: DailyWorkMode, taskIndex: number): number {
  return DAILY_WORK_MODES[mode].taskMinutes[taskIndex] ?? DAILY_WORK_MODES[mode].taskMinutes.at(-1)!;
}

export function workModeRequiredTaskIndexes(mode: DailyWorkMode): readonly number[] {
  return DAILY_WORK_MODES[mode].requiredTaskIndexes;
}

export function isTaskRequiredForMode(mode: DailyWorkMode, taskIndex: number): boolean {
  return workModeRequiredTaskIndexes(mode).includes(taskIndex as never);
}

export function effectivePlanHours(mode: DailyWorkMode, plannedDays: number): number {
  return Math.round((Math.max(0, plannedDays) * DAILY_WORK_MODES[mode].totalMinutes / 60) * 10) / 10;
}
