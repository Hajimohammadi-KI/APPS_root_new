import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const planData = readFileSync(new URL("../app/plan-data.ts", import.meta.url), "utf8");
const setup = readFileSync(new URL("../scripts/setup-windows.ps1", import.meta.url), "utf8");
const updater = readFileSync(new URL("../scripts/check-for-updates.ps1", import.meta.url), "utf8");
const masterPrompt = readFileSync(new URL("../public/prompts/complete-daily-thesis-work-prompt.md", import.meta.url), "utf8");

test("Tracker build tooling is standalone", () => {
  assert.equal(packageJson.scripts["check:boundaries"], "node scripts/check-project-boundaries.mjs");
  assert.match(packageJson.scripts.lint, /scripts\/check-project-boundaries\.mjs/);
  assert.doesNotMatch(packageJson.scripts.lint, /\.\.\/\.\.\/shared/);
});

test("active project and update links point to the thesis repository", () => {
  const repository = "https://github.com/Hajimohammadi-KI/Cross-Repository-Code-Intelligence";
  assert.match(planData, new RegExp(repository.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(setup, /Cross-Repository-Code-Intelligence\/main\/Study-Tracker\/releases/);
  assert.match(updater, /Cross-Repository-Code-Intelligence\/main\/Study-Tracker\/releases/);
  assert.doesNotMatch(`${planData}\n${setup}\n${updater}`, /APPS_root/);
});

test("the complete master prompt ships as a Tracker web asset", () => {
  assert.match(masterPrompt, /# Master Prompt: Daily Bachelor Thesis Research and Software Work/);
  assert.match(masterPrompt, /Study-Tracker/);
  assert.match(masterPrompt, /Persistent daily-start rule/);
  assert.match(masterPrompt, /Artefact.*Test.*Evidence/s);
});
