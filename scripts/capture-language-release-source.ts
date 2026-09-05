import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const outputArgument = Bun.argv
  .find((arg) => arg.startsWith("--output="))
  ?.slice("--output=".length);
const output = resolve(
  root,
  outputArgument ??
    `artifacts/language-release-source/${new Date().toISOString().replace(/[:.]/g, "-")}`,
);
if (
  !output.startsWith(
    resolve(root, "artifacts/language-release-source") + "/",
  ) &&
  !output.startsWith(resolve(root, "artifacts/language-release-source") + "\\")
)
  throw new Error(
    "Source evidence must remain in artifacts/language-release-source.",
  );
const git = (args: string[]) =>
  execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
await mkdir(output, { recursive: true });
const revision = git(["rev-parse", "HEAD"]).trim();
const status = git(["status", "--short"]);
await writeFile(resolve(output, "status.txt"), status);
const patch = Bun.spawn(["git", "-c", "core.safecrlf=false", "diff", "HEAD", "--binary"], {
  cwd: root,
  stdout: Bun.file(resolve(output, "tracked.patch")),
  stderr: Bun.file(resolve(output, "git-diff.stderr.log")),
});
if ((await patch.exited) !== 0) throw new Error("Source patch capture failed; see git-diff.stderr.log.");
const untracked = git(["ls-files", "--others", "--exclude-standard"])
  .split(/\r?\n/)
  .filter(Boolean);
const paths = [
  ...new Set([
    ...git([
      "ls-files",
      "--cached",
      "shared/learning-core",
      "scripts",
      "docs",
    ]).split(/\r?\n/),
    ...git(["diff", "HEAD", "--name-only"]).split(/\r?\n/),
    ...untracked,
  ]),
]
  .filter(
    (path) =>
      path &&
      !path.includes("node_modules") &&
      !path.includes("artifacts/") &&
      /\.(ts|tsx|js|mjs|cjs|json|md|html|css|ps1|sha256)$/.test(path),
  )
  .sort();
const files = [];
for (const path of paths) {
  try {
    if (!(await stat(resolve(root, path))).isFile()) continue;
    const bytes = await readFile(resolve(root, path));
    files.push({
      path,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
    if (untracked.includes(path)) {
      const copy = resolve(output, "untracked", path);
      await mkdir(dirname(copy), { recursive: true });
      await writeFile(copy, bytes);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}
const record = {
  capturedAt: new Date().toISOString(),
  sourceRevision: revision,
  scope:
    "Git revision plus tracked patch, implementation hashes and exact untracked source copies; not a clean-commit claim",
  files,
};
await writeFile(
  resolve(output, "manifest.json"),
  JSON.stringify(record, null, 2) + "\n",
);
console.log(JSON.stringify({ output, revision, files: files.length }));
