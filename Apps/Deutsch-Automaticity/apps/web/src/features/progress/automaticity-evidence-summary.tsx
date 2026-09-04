"use client";
import { useEffect, useState } from "react";
import {
  readAutomaticityEvents,
  reduceAutomaticityEvents,
  type ConstructionProgress,
} from "@automaticity/learning-core/automaticity";
export function AutomaticityEvidenceSummary() {
  const [rows, setRows] = useState<ConstructionProgress[] | null>(null);
  const [problem, setProblem] = useState("");
  useEffect(() => {
    const refresh = () => {
      try {
        const read = readAutomaticityEvents(localStorage, "de");
        const reduced = reduceAutomaticityEvents(
          read.events,
          "de",
          new Date().toISOString(),
        );
        setRows(reduced.progress);
        if (read.unreadable.length || reduced.rejected.length)
          setProblem(
            "Einige Einträge konnten nicht geprüft werden. Sie bleiben in deiner vollständigen Sicherung erhalten.",
          );
      } catch {
        setProblem("Gespeicherte Nachweise sind nicht verfügbar.");
      }
    };
    refresh();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);
  return (
    <section
      className="rounded-2xl border border-blue-200 bg-white p-5"
      aria-label="Unabhängige Lernnachweise"
    >
      <h2 className="text-xl font-bold">
        Nachweise aus deinen eigenen Antworten
      </h2>
      <p className="my-3 text-sm">
        Hinweise, Musterlösungen und wiederholte Korrekturen bleiben Übungen.
        Unbekannte Fähigkeiten benötigen eine passende Prüfung, bevor sie einen
        Genauigkeitswert erhalten.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {(["writing", "speaking"] as const).map((mode) => {
          const samples = (rows ?? []).filter((row) => row.modality === mode);
          const checked = samples.reduce(
              (n, row) => n + row.independentAssessed,
              0,
            ),
            wins = samples.reduce((n, row) => n + row.independentSuccesses, 0);
          return (
            <div key={mode} className="rounded-xl border p-4">
              <h3 className="font-semibold">
                {mode === "writing" ? "Schreiben" : "Sprechen"}
              </h3>
              <p>
                {rows === null
                  ? "…"
                  : checked
                    ? `${Math.round((wins / checked) * 100)}% · ${checked} unabhängige Prüfungen`
                    : "Genauigkeit noch nicht belegt"}
              </p>
              <p>
                {samples.reduce((n, row) => n + row.attempts, 0)} gespeicherte
                Versuche
              </p>
              <p>
                {samples.reduce((n, row) => n + row.delayedSuccesses, 0)}{" "}
                erfolgreiche verzögerte Abrufe
              </p>
            </div>
          );
        })}
      </div>
      {problem ? <p role="status">{problem}</p> : null}
      <p className="mt-4 text-sm">
        Diese Einträge bestätigen kein GER-Niveau. Behalten und Transfer
        benötigen neue, geprüfte Antworten an späteren Tagen.
      </p>
      <a
        className="mt-4 inline-block rounded-lg bg-blue-700 px-4 py-2 text-white"
        href="/practice"
      >
        Eigenständig weiterüben
      </a>
    </section>
  );
}
