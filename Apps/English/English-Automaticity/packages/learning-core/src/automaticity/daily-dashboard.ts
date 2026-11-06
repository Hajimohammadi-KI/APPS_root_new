import { dailyResponseCount, loadDailyPlan, practiceDay } from "./daily-plan";
import { readAutomaticityEvents, type LocalStore } from "./storage";
import type { Language } from "./contracts";
import { reduceAutomaticityEvents, unresolvedRepairs } from "./evidence";
import { readLearningEvidenceLedger } from "../index";

export function dailyDashboard(
  store: LocalStore,
  language: Language,
  at: string,
) {
  const { plan, unreadable } = loadDailyPlan(store, language, at);
  const records = readAutomaticityEvents(store, language);
  const evidence = reduceAutomaticityEvents(records.events, language, at);
  const attempts = evidence.attempts.map((row) => row.attempt);
  const responses = dailyResponseCount(attempts, language, at);
  const dayCounts = new Map<string, Set<string>>();
  for (const attempt of attempts) {
    if (Date.parse(attempt.at) > Date.parse(at)) continue;
    const day = practiceDay(attempt.at);
    const ids = dayCounts.get(day) ?? new Set<string>();
    ids.add(attempt.id);
    dayCounts.set(day, ids);
  }
  const ledger = readLearningEvidenceLedger(store);
  const languages = new Map(
    ledger.contentUnits.map((unit) => [unit.id, unit.language]),
  );
  for (const response of ledger.responses) {
    if (
      languages.get(response.contentUnitId) !== language ||
      !response.inputText.trim() ||
      !Number.isFinite(Date.parse(response.submittedAt)) ||
      Date.parse(response.submittedAt) > Date.parse(at)
    )
      continue;
    const day = practiceDay(response.submittedAt);
    const ids = dayCounts.get(day) ?? new Set<string>();
    ids.add(response.id.replace(/:response$/, ""));
    dayCounts.set(day, ids);
  }
  const date = new Date(at);
  date.setHours(12, 0, 0, 0);
  const week = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(date);
    day.setDate(day.getDate() - 6 + index);
    const key = practiceDay(day.toISOString());
    return {
      date: key,
      weekday: day.getDay(),
      count: dayCounts.get(key)?.size ?? 0,
    };
  });
  let streak = 0;
  if (!dayCounts.has(practiceDay(date.toISOString())))
    date.setDate(date.getDate() - 1);
  while (dayCounts.has(practiceDay(date.toISOString()))) {
    streak++;
    date.setDate(date.getDate() - 1);
  }
  return {
    responses,
    goal: plan.responseGoal,
    paused: plan.paused,
    week,
    streak,
    dueReviews: evidence.progress.filter(
      (row) =>
        row.nextReviewAt && Date.parse(row.nextReviewAt) <= Date.parse(at),
    ).length,
    repairs: unresolvedRepairs(evidence.attempts).length,
    percentage:
      unreadable || records.unreadable.length || evidence.rejected.length
        ? null
        : Math.min(100, Math.round((responses / plan.responseGoal) * 100)),
  };
}

export type DailyDashboard = ReturnType<typeof dailyDashboard>;

/** Subscribe without writing or migrating learner data. */
export function watchDailyDashboard(
  language: Language,
  update: (value: DailyDashboard | null) => void,
) {
  const refresh = () => {
    try {
      update(dailyDashboard(localStorage, language, new Date().toISOString()));
    } catch {
      update(null);
    }
  };
  refresh();
  const events = ["storage", "automaticity-history-updated", "focus"];
  for (const event of events) window.addEventListener(event, refresh);
  const timer = setInterval(refresh, 60_000);
  return () => {
    clearInterval(timer);
    for (const event of events) window.removeEventListener(event, refresh);
  };
}
