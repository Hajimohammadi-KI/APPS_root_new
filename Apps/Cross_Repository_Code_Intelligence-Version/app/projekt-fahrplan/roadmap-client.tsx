"use client";

import { useEffect, useRef, useState } from "react";
import { allDays, planMeta, planWeeks, type PlannedDay, type PlanWeek } from "../plan-data";
import {
  countCompletedItems,
  countCompletedOutputs,
  outputTotal,
  percentComplete,
} from "../../lib/study-progress";

const ROADMAP_STAGES: Array<{
  id: string;
  title: string;
  blurb: string;
  start: number;
  end: number;
}> = [
  {
    id: "design",
    title: "Design",
    blurb: "Problem, Architektur und Evaluation mit einem ausführbaren Vertical Slice bereits in Woche 3.",
    start: 1,
    end: 6,
  },
  {
    id: "extraktion",
    title: "Extraktion",
    blurb: "NLP-Lab-Integration, Roslyn-Syntax/Semantik und EF Core READ/WRITE bis zur Table-Ebene.",
    start: 7,
    end: 12,
  },
  {
    id: "graph-retrieval",
    title: "Graph & Retrieval",
    blurb: "Evidence Model, Neo4j-Graph, Flat- vs. Graph-Retrieval und Query Contracts.",
    start: 13,
    end: 16,
  },
  {
    id: "evaluation",
    title: "Evaluation",
    blurb: "Goldstandard, RQ1/RQ2-Messung, rollenbasierte Antworten und Threats to Validity.",
    start: 17,
    end: 20,
  },
  {
    id: "abgabe",
    title: "Abgabe",
    blurb: "Thesis-Kapitel, Replikationspaket, Demo und die beiden Puffer bis zur finalen Übergabe.",
    start: 21,
    end: 25,
  },
];

type ProjectRoadmapProps = {
  completed: ReadonlySet<string>;
  loading: boolean;
  planStatus: "not_started" | "running" | "paused";
  onOpenDay: (day: PlannedDay) => void;
  onToggleDay: (day: PlannedDay, completed: boolean) => Promise<boolean>;
};

function weekOutputTotal(week: PlanWeek) {
  return week.days.reduce((sum, day) => sum + outputTotal(day), 0);
}

function weekCompletedOutputs(week: PlanWeek, completed: ReadonlySet<string>) {
  return week.days.reduce(
    (sum, day) => sum + countCompletedOutputs(day, completed),
    0,
  );
}

function isDayDone(day: PlannedDay, completed: ReadonlySet<string>) {
  return countCompletedOutputs(day, completed) === outputTotal(day);
}

export default function ProjectRoadmap({
  completed,
  loading,
  planStatus,
  onOpenDay,
  onToggleDay,
}: ProjectRoadmapProps) {
  const [pendingDayId, setPendingDayId] = useState<string | null>(null);
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set());
  const initializedOpenWeek = useRef(false);

  useEffect(() => {
    if (loading || initializedOpenWeek.current) return;
    initializedOpenWeek.current = true;
    const firstOpenWeek = planWeeks.find((week) =>
      week.days.some((day) => !isDayDone(day, completed)),
    );
    if (firstOpenWeek) setOpenWeeks(new Set([firstOpenWeek.number]));
  }, [completed, loading]);

  const totalOutputs = allDays.reduce((sum, day) => sum + outputTotal(day), 0);
  const totalCompleted = allDays.reduce(
    (sum, day) => sum + countCompletedOutputs(day, completed),
    0,
  );
  const overallPercent = percentComplete(totalCompleted, totalOutputs);
  const canRecordProgress = planStatus === "running";

  function toggleWeek(weekNumber: number) {
    setOpenWeeks((current) => {
      const next = new Set(current);
      if (next.has(weekNumber)) next.delete(weekNumber);
      else next.add(weekNumber);
      return next;
    });
  }

  async function toggleDay(day: PlannedDay) {
    if (pendingDayId || !canRecordProgress) return;
    setPendingDayId(day.id);
    try {
      await onToggleDay(day, !isDayDone(day, completed));
    } finally {
      setPendingDayId(null);
    }
  }

  return (
    <section className="project-roadmap" aria-labelledby="project-roadmap-title">
      <header className="roadmap-hero roadmap-hero--embedded">
        <div>
          <p className="roadmap-eyebrow">Im Projekt-Lernplan integriert</p>
          <h3 id="project-roadmap-title">Projekt-Fahrplan</h3>
          <p className="roadmap-lead">
            Alle 25 Wochen als scannbare Roadmap in fünf Etappen. Fortschritt,
            Tagesdetails und Status gehören jetzt zu demselben Lernplan.
          </p>
        </div>
        <aside className="roadmap-progress" aria-label="Gesamtfortschritt im Projekt-Fahrplan">
          <div
            className="roadmap-ring"
            style={{ "--progress": `${overallPercent * 3.6}deg` } as React.CSSProperties}
            role="img"
            aria-label={`Gesamtfortschritt: ${overallPercent} Prozent`}
          >
            <span>
              <strong>{overallPercent}%</strong>
              <small>{planMeta.totalDays} Tage</small>
            </span>
          </div>
          <p className={`roadmap-plan-state ${planStatus}`}>
            {planStatus === "running"
              ? "Lernplan aktiv"
              : planStatus === "paused"
                ? "Pausiert · nur Vorschau"
                : "Noch nicht gestartet · nur Vorschau"}
          </p>
        </aside>
      </header>

      {loading ? <p className="roadmap-loading">Fortschritt wird geladen…</p> : null}
      {!canRecordProgress ? (
        <p className="roadmap-guidance" role="note">
          Die Roadmap bleibt vollständig sichtbar. Häkchen werden erst nach dem
          echten Start des Lernplans gespeichert; vorher entsteht kein Rückstand.
        </p>
      ) : null}

      <ol className="roadmap-stages">
        {ROADMAP_STAGES.map((stage, stageIndex) => {
          const stageWeeks = planWeeks.filter(
            (week) => week.number >= stage.start && week.number <= stage.end,
          );
          const stageTotal = stageWeeks.reduce(
            (sum, week) => sum + weekOutputTotal(week),
            0,
          );
          const stageDone = stageWeeks.reduce(
            (sum, week) => sum + weekCompletedOutputs(week, completed),
            0,
          );
          const stagePercent = percentComplete(stageDone, stageTotal);
          const stageComplete = stageTotal > 0 && stageDone === stageTotal;

          return (
            <li key={stage.id} className={`roadmap-stage ${stageComplete ? "is-done" : ""}`}>
              <div className="roadmap-stage-header">
                <span className="roadmap-stage-number" aria-hidden="true">
                  {stageIndex + 1}
                </span>
                <div className="roadmap-stage-titles">
                  <h4>
                    {stage.title}
                    <small>Woche {stage.start}–{stage.end}</small>
                  </h4>
                  <p>{stage.blurb}</p>
                </div>
                <div className="roadmap-stage-bar" aria-hidden="true">
                  <div style={{ width: `${stagePercent}%` }} />
                </div>
                <span className="roadmap-stage-percent">{stagePercent}%</span>
              </div>

              <ol className="roadmap-weeks">
                {stageWeeks.map((week) => {
                  const weekTotal = weekOutputTotal(week);
                  const weekDone = weekCompletedOutputs(week, completed);
                  const weekPercent = percentComplete(weekDone, weekTotal);
                  const weekComplete = weekTotal > 0 && weekDone === weekTotal;
                  const open = openWeeks.has(week.number);

                  return (
                    <li key={week.phaseId} className={`roadmap-week ${weekComplete ? "is-done" : ""}`}>
                      <button
                        type="button"
                        className="roadmap-week-header"
                        aria-expanded={open}
                        aria-controls={`roadmap-week-${week.number}`}
                        onClick={() => toggleWeek(week.number)}
                      >
                        <span className="roadmap-week-number">W{week.number}</span>
                        <span className="roadmap-week-titles">
                          <strong>{week.title}</strong>
                          <small>{week.phase}</small>
                        </span>
                        <span className="roadmap-week-percent">{weekPercent}%</span>
                        <span className="roadmap-week-caret" aria-hidden="true">
                          {open ? "Schließen" : "Öffnen"}
                        </span>
                      </button>

                      {open ? (
                        <div className="roadmap-week-body" id={`roadmap-week-${week.number}`}>
                          <p className="roadmap-week-goal">{week.goal}</p>
                          <ul className="roadmap-day-list">
                            {week.days.map((day) => {
                              const done = isDayDone(day, completed);
                              const started = !done && countCompletedItems(day, completed) > 0;
                              const checkboxId = `roadmap-day-${day.id}`;
                              return (
                                <li
                                  key={day.id}
                                  className={`roadmap-day ${done ? "is-done" : ""} ${started ? "is-started" : ""}`}
                                >
                                  <input
                                    id={checkboxId}
                                    type="checkbox"
                                    checked={done}
                                    disabled={!canRecordProgress || pendingDayId === day.id}
                                    onChange={() => void toggleDay(day)}
                                  />
                                  <div className="roadmap-day-copy">
                                    <label htmlFor={checkboxId}>
                                      <strong>{day.title}</strong>
                                      <small>{day.deliverable}</small>
                                    </label>
                                    <button type="button" onClick={() => onOpenDay(day)}>
                                      Tagesdetails öffnen
                                    </button>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
