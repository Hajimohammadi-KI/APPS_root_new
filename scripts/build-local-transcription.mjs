// Verify the vendored, same-origin Whisper assets before bundling the worker.
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { LOCAL_TRANSCRIPTION_ASSETS } from "../Apps/English/English-Automaticity/apps/web/app/studio/source/local-transcription-assets.ts";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(
  root,
  "Apps/English/English-Automaticity/apps/web/public/local-transcription",
);
for (const asset of LOCAL_TRANSCRIPTION_ASSETS) {
  const path = resolve(publicRoot, asset.path);
  if (statSync(path).size !== asset.bytes)
    throw new Error(`Invalid local transcription asset size: ${asset.path}`);
  const actual = createHash("sha256").update(readFileSync(path)).digest("hex");
  if (actual !== asset.sha256)
    throw new Error(
      `Invalid local transcription asset checksum: ${asset.path}`,
    );
}

const output = await Bun.build({
  entrypoints: [
    resolve(
      root,
      "Apps/English/English-Automaticity/apps/web/app/studio/source/local-transcription-worker.ts",
    ),
  ],
  outdir: publicRoot,
  naming: "worker.js",
  target: "browser",
  format: "esm",
  minify: true,
});
if (!output.success)
  throw new AggregateError(
    output.logs,
    "Local transcription worker build failed",
  );
console.log("Built local transcription worker with verified pinned assets.");
