import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { parseBacklog, hashDecisionText } from "./language-roadmap";
const raw = readFileSync(
  new URL(
    "../docs/language-automaticity-implementation-backlog.json",
    import.meta.url,
  ),
  "utf8",
);
test("decision evidence survives Git line-ending conversion but rejects changed content", () => {
  const text = '{"approved":false}\n';
  expect(hashDecisionText(text.replaceAll("\n", "\r\n"))).toBe(
    hashDecisionText(text),
  );
  expect(hashDecisionText(new TextEncoder().encode(text))).toBe(
    hashDecisionText(text),
  );
  expect(hashDecisionText(text.replace("false", "true"))).not.toBe(
    hashDecisionText(text),
  );
});
function fixture() {
  const backlog = JSON.parse(raw),
    task = backlog.tasks.find((row: { id: string }) => row.id === "M04");
  task.conditionalDecision = {
    taskId: "M04",
    record: "docs/roadmap-decisions/synthetic.json",
    sha256: "a".repeat(64),
    recordedAt: "2026-09-06T00:00:00.000Z",
    outcome: "defer",
    activationVerified: false,
    summary: "Synthetic deferral",
    reasons: ["No qualified scope"],
    reopenWhen: ["A qualified scope is independently approved"],
  };
  return { backlog, task };
}
test("a checked deferral never becomes verified activation or a completed required task", () => {
  const f = fixture();
  const result = parseBacklog(JSON.stringify(f.backlog));
  expect(result.tasks.find((row) => row.id === "M04")!.status).toBe(
    "implemented",
  );
  for (const change of [
    (task: typeof f.task) => (task.status = "verified"),
    (task: typeof f.task) => (task.required = true),
    (task: typeof f.task) =>
      (task.conditionalDecision.activationVerified = true),
  ]) {
    const g = fixture();
    change(g.task);
    expect(() => parseBacklog(JSON.stringify(g.backlog))).toThrow(
      "Invalid conditional decision",
    );
  }
});
test("missing reasons, mismatched task identity and unsafe evidence references cannot receive the decision badge", () => {
  for (const patch of [
    { reasons: [] },
    { taskId: "X01" },
    { record: "../private.json" },
    { sha256: "approved" },
    { outcome: "activate" },
  ]) {
    const f = fixture();
    Object.assign(f.task.conditionalDecision, patch);
    expect(() => parseBacklog(JSON.stringify(f.backlog))).toThrow(
      "Invalid conditional decision",
    );
  }
});
