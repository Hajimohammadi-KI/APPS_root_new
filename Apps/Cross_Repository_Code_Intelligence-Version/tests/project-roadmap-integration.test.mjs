import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const tracker = readFileSync(new URL("../app/study-tracker.tsx", import.meta.url), "utf8");
const roadmap = readFileSync(
  new URL("../app/projekt-fahrplan/roadmap-client.tsx", import.meta.url),
  "utf8",
);
const legacyRoute = readFileSync(
  new URL("../app/projekt-fahrplan/page.tsx", import.meta.url),
  "utf8",
);
const globalCss = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const roadmapCss = readFileSync(
  new URL("../app/projekt-fahrplan/projekt-fahrplan.css", import.meta.url),
  "utf8",
);

test("Projekt-Fahrplan is a view inside the shared Projekt-Lernplan", () => {
  assert.match(tracker, /import ProjectRoadmap from "\.\/projekt-fahrplan\/roadmap-client"/);
  assert.match(tracker, /type PlanMode = "details" \| "roadmap"/);
  assert.match(tracker, /role="tablist" aria-label="Ansicht des Projekt-Lernplans"/);
  assert.match(tracker, /id="plan-details-panel" role="tabpanel"/);
  assert.match(tracker, /id="plan-roadmap-panel" role="tabpanel"/);
  assert.match(tracker, /<ProjectRoadmap[\s\S]*?completed=\{completed\}[\s\S]*?planStatus=\{settings\.planStatus\}/);
  assert.doesNotMatch(tracker, /href="\/projekt-fahrplan"/);
});

test("roadmap and detail view share clickable progress before the scheduled start", () => {
  assert.match(roadmap, /completed: ReadonlySet<string>/);
  assert.match(roadmap, /onToggleDay: \(day: PlannedDay, completed: boolean\) => Promise<boolean>/);
  assert.doesNotMatch(roadmap, /loadCompletedIds|toggleTaskCompletion|localStorage/);
  assert.doesNotMatch(roadmap, /canRecordProgress/);
  assert.match(roadmap, /disabled=\{pendingDayId === day\.id\}/);
  assert.match(roadmap, /Du kannst Häkchen jederzeit setzen oder entfernen/);
  assert.match(roadmap, /Startdatum und Kalender bleiben unverändert/);
  assert.match(tracker, /async function toggleRoadmapDay[\s\S]*?const previous = new Set\(completed\)/);
  assert.doesNotMatch(tracker, /Projekt-Fahrplan ist bis zum echten Start nur eine Vorschau/);
  assert.match(tracker, /action: "import"[\s\S]*?completedIds: \[\.\.\.next\][\s\S]*?notes,[\s\S]*?settings/);
});

test("legacy route redirects into the integrated roadmap view", () => {
  assert.match(legacyRoute, /redirect\("\/#projekt-fahrplan"\)/);
  assert.match(tracker, /window\.location\.hash === "#projekt-fahrplan"/);
  assert.match(tracker, /setPlanMode\(window\.location\.hash === "#projekt-fahrplan" \? "roadmap" : "details"\)/);
});

test("integrated roadmap uses the app design system responsively", () => {
  assert.match(globalCss, /@import "\.\/projekt-fahrplan\/projekt-fahrplan\.css"/);
  assert.match(roadmapCss, /\.plan-view-tabs/);
  assert.match(roadmapCss, /\.project-roadmap/);
  assert.match(roadmapCss, /var\(--teal-800\)/);
  assert.match(roadmapCss, /@media \(max-width: 760px\)/);
  assert.match(roadmapCss, /@media \(max-width: 480px\)/);
});
