import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function emitSevenStepFlow(
  root: string,
  language: "en" | "de",
): Promise<void> {
  const out = resolve(root, "apps/web/public/replacements", language);
  const page = language === "de" ? "heute" : "daily";
  const previous = await readFile(resolve(out, `${page}.html`), "utf8");
  // Preserve the existing advanced daily tools and their local-storage contracts.
  if (!previous.includes('id="seven-step-root"'))
    await copyFile(
      resolve(out, `${page}.html`),
      resolve(out, `${page}-legacy.html`),
    );
  const result = await Bun.build({
    entrypoints: [resolve(import.meta.dir, "app.ts")],
    target: "browser",
    format: "iife",
    minify: false,
  });
  if (!result.success) throw new Error(result.logs.map(String).join("\n"));
  await writeFile(
    resolve(out, "seven-step-flow.js"),
    await result.outputs[0]!.text(),
  );
  await copyFile(
    resolve(import.meta.dir, "styles.css"),
    resolve(out, "seven-step-flow.css"),
  );
  const brand = language === "de" ? "DeutschFlow" : "English Automaticity";
  await writeFile(
    resolve(out, `${page}.html`),
    `<!doctype html>
<!-- Generated from shared/seven-step-flow. Drafts, comparisons and mastery are distinct. -->
<html lang="${language}" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${brand} · ${language === "de" ? "Deine tägliche Übung" : "Your daily practice"}</title>
<link rel="stylesheet" href="/replacements/${language}/grammar-worksheets.css">
<link rel="stylesheet" href="/replacements/${language}/seven-step-flow.css">
<script defer src="/replacements/${language}/grammar-worksheets.js"></script>
<script defer src="/replacements/${language}/grammar-worksheet-ink.js"></script>
<script defer src="/replacements/${language}/seven-step-flow.js"></script>
</head><body><div id="seven-step-root"><p>${language === "de" ? "Übung wird geladen…" : "Loading your practice…"}</p></div><noscript>${language === "de" ? "Bitte aktiviere JavaScript, um Entwürfe zu speichern." : "Enable JavaScript to save your practice drafts."}</noscript></body></html>\n`,
  );
}
