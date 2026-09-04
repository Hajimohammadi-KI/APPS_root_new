#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SOURCE_EXTENSIONS = new Set([".bat", ".css", ".html", ".js", ".json", ".mjs", ".ps1", ".sh", ".ts", ".tsx"]);
const IGNORED_DIRECTORIES = new Set([".next", ".wrangler", "dist", "node_modules", "outputs"]);
const ENTRY_PATHS = [
  "package.json",
  "app",
  "apps",
  "components",
  "ipad-preview",
  "lib",
  "packages",
  "public",
  "scripts",
  "tests",
];
const FORBIDDEN = [
  { value: "../" + "../shared/check-duplicated-files.mjs", reason: "parent APPS_root shared tooling" },
  { value: "Hajimohammadi-KI/" + "APPS_root", reason: "language-app repository link" },
  { value: "D:" + "\\APPS_root", reason: "language-app filesystem path" },
];

function filesUnder(path) {
  if (!existsSync(path)) return [];
  const entries = readdirSync(path, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const child = join(path, entry.name);
    if (entry.isDirectory()) return IGNORED_DIRECTORIES.has(entry.name) ? [] : filesUnder(child);
    return SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase()) ? [child] : [];
  });
}

const files = ENTRY_PATHS.flatMap((entry) => {
  const path = join(APP_ROOT, entry);
  if (!existsSync(path)) return [];
  return extname(path) ? [path] : filesUnder(path);
}).filter((path) => path !== fileURLToPath(import.meta.url));

const failures = [];
for (const path of files) {
  const content = readFileSync(path, "utf8");
  for (const forbidden of FORBIDDEN) {
    if (content.includes(forbidden.value)) {
      failures.push(`${relative(APP_ROOT, path)}: ${forbidden.reason}`);
    }
  }
}

if (failures.length > 0) {
  console.error("[project-boundaries] Tracker is not independent:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`[project-boundaries] OK - ${files.length} active source files are independent from APPS_root language apps.`);
