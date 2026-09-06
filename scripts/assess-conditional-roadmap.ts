import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";
import { createHash } from "node:crypto";
import { hashDecisionText } from "./language-roadmap";
const root = resolve(import.meta.dir, ".."),
  at = new Date().toISOString();
const digest = (data: string | Uint8Array) =>
  createHash("sha256").update(data).digest("hex");
const backlogPath = "docs/language-automaticity-implementation-backlog.json";
const recordPath = `docs/roadmap-decisions/${at.replace(/[:.]/g, "-").toLowerCase()}-conditional-eligibility.json`;
const json = async (path: string) =>
  JSON.parse(
    (await readFile(resolve(root, path), "utf8")).replace(/^\uFEFF/, ""),
  );
if (!Bun.argv.includes("--write"))
  throw Error(
    "Use --write to execute and record the current conditional eligibility check.",
  );
const folder = `artifacts/conditional-roadmap/${at.replace(/[:.]/g, "-")}`;
await mkdir(resolve(root, folder), { recursive: true });
const commands = [
  [
    "reward-and-probe-boundaries",
    [
      "bun",
      "test",
      "./scripts/practice-bandit.test.ts",
      "./scripts/reviewed-curriculum.test.ts",
      "./scripts/learning-study.test.ts",
      "./scripts/conditional-roadmap.test.ts",
    ],
  ],
  [
    "scheduler-rollback",
    [
      "bun",
      "test",
      "./shared/learning-core/src/automaticity/scheduler-pilot.test.ts",
      "./scripts/scheduler-pilot-evaluation.test.ts",
    ],
  ],
  ["transformer-release", ["bun", "scripts/verify-transformer-release.ts"]],
  [
    "bandit-no-submitted-data",
    ["bun", "scripts/replay-practice-bandit.ts", "--empty"],
  ],
  [
    "review-integrity",
    ["bun", "scripts/verify-automaticity-release-reviews.ts"],
  ],
  [
    "tool-types",
    [
      "node",
      "Apps/Deutsch-Automaticity/node_modules/typescript/bin/tsc",
      "-p",
      "scripts/tsconfig.language-tools.json",
    ],
  ],
] as const;
const checks = await Promise.all(
  commands.map(async ([id, command]) => {
    const child = Bun.spawn([...command], {
      cwd: root,
      stdout: "pipe",
      stderr: "pipe",
    });
    const [stdout, stderr, exit] = await Promise.all([
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
      child.exited,
    ]);
    const log = stdout + "\nSTDERR\n" + stderr,
      path = `${folder}/${id}.log`;
    await writeFile(resolve(root, path), log, { flag: "wx" });
    return {
      id,
      command: [...command],
      exit,
      status: exit === 0 ? "passed" : "failed",
      log: path,
      logSha256: digest(log),
    };
  }),
);
await writeFile(
  resolve(root, folder, "checks.json"),
  JSON.stringify({ at, checks }, null, 2) + "\n",
  { flag: "wx" },
);
assert(
  checks.every((row) => row.exit === 0),
  "A conditional eligibility engineering check failed; no decision or roadmap change written.",
);
const backlog = await json(backlogPath),
  ledger = await json("docs/automaticity-release-reviews.json"),
  matrix = await json("docs/model-evaluation/support-matrix.json");
const enPlan = await json(
    "Apps/English/English-Automaticity/apps/web/public/learning-core/scheduler-pilot-en.json",
  ),
  dePlan = await json(
    "Apps/Deutsch-Automaticity/apps/web/public/learning-core/scheduler-pilot-de.json",
  );
// This record is a conservative decision on today's missing prerequisites.
// A changed qualification requires a new explicit assessment, never automatic activation.
assert.equal(
  ledger.reviews.length,
  0,
  "Real reviews arrived; reassess their qualified scopes rather than reusing this no-evidence decision.",
);
assert.equal(enPlan.plan, null);
assert.equal(dePlan.plan, null);
const scopes = matrix.cells ?? matrix.requiredCells ?? matrix.coverage;
assert(Array.isArray(scopes), "Unknown support matrix shape");
assert(
  scopes.every(
    (row: { automaticScopeApproved: boolean }) =>
      row.automaticScopeApproved === false,
  ),
);
for (const id of ["M03", "P03", "S02", "R03"])
  assert.notEqual(
    backlog.tasks.find((row: { id: string }) => row.id === id)?.status,
    "verified",
    `Reassess newly completed prerequisite ${id}`,
  );
const decisions = [
  {
    taskId: "M04",
    summary: "Integration checked; qualified model activation is deferred.",
    reasons: [
      "No independently approved automatic evaluator scope is available.",
      "The installed adapter's recorded checks cover disabled routes and synthetic transport, not a qualified enabled release.",
    ],
    reopenWhen: [
      "Complete M01–M03 with independently reviewed calibration/final evidence.",
      "Review the exact selected model and output corrections; compile and verify its enabled versioned release.",
    ],
  },
  {
    taskId: "S03",
    summary:
      "Activation eligibility checked; the baseline scheduler remains active.",
    reasons: [
      "S02 has no submitted qualified learner comparison showing benefit or non-inferiority.",
      "Both shipped pilot declarations are empty. Bounded-pilot rollback tests do not establish broad scheduler qualification.",
    ],
    reopenWhen: [
      "Complete the consented S02 comparison and independent analysis against predeclared benefit criteria.",
      "Complete R03, then implement and verify the selected broader rollout with due-review preservation and rollback.",
    ],
  },
  {
    taskId: "X01",
    summary:
      "Readiness assessed: a live bandit experiment is not justified by the submitted evidence.",
    reasons: [
      "No consented development export was submitted to this assessment; empty replay yields no qualified delayed rewards.",
      "M03, P03 and S02 do not yet supply the reviewed outcome, uncertainty and scheduling evidence required for an experiment.",
    ],
    reopenWhen: [
      "Submit qualified delayed outcome logs with eligible actions, recorded probabilities and independent human procedures.",
      "Review a prospective comparison and a justified sample/uncertainty plan; one learner is not assumed sufficient.",
    ],
  },
  {
    taskId: "X02",
    summary:
      "Offline prototype checked; the conditional learner experiment remains deferred.",
    reasons: [
      "X01 readiness has not opened a justified experiment; there is no actual frozen prospective comparison to execute.",
      "Synthetic replay and IPS arithmetic do not establish learner benefit. Final evaluation material is excluded from development imports.",
    ],
    reopenWhen: [
      "Satisfy X01 and R03 and obtain actual participant opt-in.",
      "Implement the approved live protocol and frozen final evaluation, verify its delivery, and collect independent delayed outcomes.",
    ],
  },
  {
    taskId: "X03",
    summary:
      "Current decision: defer sequential RL; its added value is unmeasured.",
    reasons: [
      "No completed X02 comparison exposes a justified sequential decision problem.",
      "Simulation, test counts and immediate model agreement cannot demonstrate additional learning benefit.",
    ],
    reopenWhen: [
      "Complete X02 with qualified longitudinal evidence.",
      "Document a sequential decision problem and measurable benefit beyond the rule policy and bandit before proposing training.",
    ],
  },
].map((row) => ({
  ...row,
  outcome: "defer" as const,
  activationVerified: false,
}));
const paths = [
  "docs/automaticity-release-reviews.json",
  "docs/model-evaluation/support-matrix.json",
  "scripts/lib/practice-bandit.ts",
  "scripts/lib/study-probe-catalog.ts",
  "scripts/replay-practice-bandit.ts",
  "scripts/assess-conditional-roadmap.ts",
  "scripts/language-roadmap.ts",
  "scripts/conditional-roadmap.test.ts",
  "scripts/practice-bandit.test.ts",
  "scripts/reviewed-curriculum.test.ts",
  "Apps/English/English-Automaticity/apps/web/public/learning-core/scheduler-pilot-en.json",
  "Apps/Deutsch-Automaticity/apps/web/public/learning-core/scheduler-pilot-de.json",
];
const inputs = await Promise.all(
  paths.map(async (path) => ({
    path,
    sha256: hashDecisionText(await readFile(resolve(root, path))),
  })),
);
const record = {
  schemaVersion: 1,
  hashEncoding: "utf8-lf",
  recordedAt: at,
  recordedBy: "automated_engineering_check",
  scope:
    "Verification of present conditional eligibility and deferral reasons; not human approval, experiment completion or proof of benefit.",
  facts: {
    reviewedCurriculumCells: 0,
    approvedAutomaticScopes: 0,
    submittedDevelopmentExport: false,
    shippedPilots: 0,
    learnerBenefit: "unmeasured",
  },
  inputs,
  checks,
  decisions,
};
const bytes = JSON.stringify(record, null, 2) + "\n";
await mkdir(dirname(resolve(root, recordPath)), { recursive: true });
await writeFile(resolve(root, recordPath), bytes, { flag: "wx" });
for (const decision of decisions) {
  const task = backlog.tasks.find(
    (row: { id: string }) => row.id === decision.taskId,
  );
  assert(task && !task.required && task.status !== "verified");
  task.conditionalDecision = {
    record: recordPath,
    sha256: hashDecisionText(bytes),
    recordedAt: at,
    ...decision,
  };
  task.progressNote = decision.summary + " " + decision.reasons.join(" ");
  task.updatedOn = "2026-09-06";
  task.evidence = [
    ...new Set([
      ...task.evidence,
      recordPath,
      "docs/CONDITIONAL-ROADMAP-DECISIONS-2026-09-06.md",
    ]),
  ];
}
backlog.updatedOn = "2026-09-06";
await writeFile(
  resolve(root, backlogPath),
  JSON.stringify(backlog, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    status: "verified",
    scope: "deferral_decisions_only",
    record: recordPath,
    folder,
    tasks: decisions.map((row) => row.taskId),
    checks: checks.length,
    activated: 0,
  }),
);
