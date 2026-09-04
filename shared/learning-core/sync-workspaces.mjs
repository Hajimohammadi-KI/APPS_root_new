import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const repositoryRoot = resolve(sourceRoot, "../..");
const appsRoot = resolve(repositoryRoot, "Apps");
const targets = [
  resolve(
    repositoryRoot,
    "Apps/English/English-Automaticity/packages/learning-core",
  ),
  resolve(repositoryRoot, "Apps/Deutsch-Automaticity/packages/learning-core"),
];
const files = [
  "package.json",
  "tsconfig.json",
  "src/index.ts",
  "src/index.test.ts",
  "src/automaticity/contracts.ts",
  "src/automaticity/evidence.ts",
  "src/automaticity/storage.ts",
  "src/automaticity/backup.ts",
  "src/automaticity/curriculum.ts",
  "src/automaticity/selector.ts",
  "src/automaticity/assessment.ts",
  "src/automaticity/media.ts",
  "src/automaticity/practice.ts",
  "src/automaticity/practice-entry.ts",
  "src/automaticity/index.ts",
  "src/automaticity/browser-entry.ts",
  "src/automaticity/automaticity.test.ts",
  "src/automaticity/selection.test.ts",
  "src/automaticity/qualification.ts",
  "src/automaticity/qualification.test.ts",
  "src/content-quality.ts",
  "src/content-quality.test.ts",
  "src/measurement.ts",
  "src/measurement.test.ts",
  "src/adherence/feature-flags.ts",
  "src/adherence/adherence.test.ts",
  "src/adherence/index.ts",
  "src/adherence/intention-copy.ts",
  "src/adherence/intentions.ts",
  "src/adherence/nudge-copy.ts",
  "src/adherence/nudges.ts",
  "src/adherence/plan-adjustment.ts",
  "src/adherence/readiness.ts",
  "src/adherence/shadow-runner.ts",
  "src/adherence/browser-entry.ts",
  "src/adherence/storage.ts",
  "src/adherence/streak.ts",
  "src/adherence/types.ts",
  "src/booster/booster.ts",
  "src/booster/booster.test.ts",
  "src/booster/browser-entry.ts",
  "src/booster/copy.ts",
  "src/booster/index.ts",
  "src/booster/types.ts",
  "src/fsrs-shadow/fsrs-shadow.test.ts",
  "src/fsrs-shadow/index.ts",
  "src/fsrs-shadow/scheduler.ts",
  "src/fsrs-shadow/storage.ts",
  "src/fsrs-shadow/types.ts",
  "schemas/learning-vertical-slice.schema.json",
  "schemas/measurement-contract.schema.json",
  "schemas/mediation-content-pilot.schema.json",
  "browser/adherence-shadow.js",
  "browser/forced-output-booster.js",
  "browser/automaticity-v2.js",
  "browser/practice.js",
  "browser/practice.css",
  "browser/practice-en.html",
  "browser/practice-de.html",
];
const browserBundles = [
  "adherence-shadow.js",
  "forced-output-booster.js",
  "automaticity-v2.js",
  "practice.js",
  "practice.css",
  "practice-en.html",
  "practice-de.html",
];
const checkOnly = process.argv.includes("--check");

function digest(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

for (const bundle of browserBundles) {
  const browserSource = join(sourceRoot, "browser", bundle);
  const browserTargets = [
    resolve(
      repositoryRoot,
      `Apps/English/English-Automaticity/apps/web/public/learning-core/${bundle}`,
    ),
    resolve(
      repositoryRoot,
      `Apps/Deutsch-Automaticity/apps/web/public/learning-core/${bundle}`,
    ),
  ];
  for (const target of browserTargets) {
    const relativeTarget = relative(appsRoot, target);
    if (
      relativeTarget === "" ||
      relativeTarget.startsWith("..") ||
      isAbsolute(relativeTarget)
    ) {
      throw new Error(`Refusing to sync outside app workspaces: ${target}`);
    }
    if (checkOnly) {
      if (!existsSync(target) || digest(browserSource) !== digest(target)) {
        throw new Error(`Browser learning-core bundle is stale: ${target}`);
      }
      continue;
    }
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(browserSource, target);
  }
}

for (const targetRoot of targets) {
  const relativeTarget = relative(appsRoot, targetRoot);
  if (
    relativeTarget === "" ||
    relativeTarget.startsWith("..") ||
    isAbsolute(relativeTarget)
  ) {
    throw new Error(`Refusing to sync outside app workspaces: ${targetRoot}`);
  }
  for (const relativePath of files) {
    const source = join(sourceRoot, relativePath);
    const target = join(targetRoot, relativePath);
    if (checkOnly) {
      if (!existsSync(target) || digest(source) !== digest(target)) {
        throw new Error(`Learning-core mirror is stale: ${target}`);
      }
      continue;
    }
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
}

console.log(
  checkOnly
    ? "Learning-core workspace mirrors match the canonical source."
    : "Learning-core workspace mirrors synchronized.",
);
