import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
for (const destination of [
  "Apps/English/English-Automaticity/apps/web/components",
  "Apps/Deutsch/Deutsch-Automaticity/apps/web/src/components",
]) {
  for (const name of [
    "staff-access.tsx",
    "staff-method-notes.tsx",
    "staff-owner-setup.tsx",
    "staff-accounts.tsx",
  ]) {
    const source = await readFile(resolve(root, "shared/language-home", name));
    const target = resolve(root, destination, name);
    if (process.argv.includes("--check")) {
      if (!source.equals(await readFile(target)))
        throw new Error(`Staff workspace mirror differs: ${target}`);
    } else await writeFile(target, source);
  }
}
console.log("Staff workspace components synchronized.");
