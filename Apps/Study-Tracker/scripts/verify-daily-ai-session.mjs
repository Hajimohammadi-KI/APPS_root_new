import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const baseUrl = (process.argv[2] ?? "http://127.0.0.1:4312").replace(/\/$/, "");
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDirectory = fileURLToPath(new URL("../outputs/runtime-verification/", import.meta.url));
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: baseUrl });
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  const response = await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForLoadState("load", { timeout: 20_000 });
  await page.getByRole("link", { name: "Lernplan", exact: true }).click();

  for (const selector of ["details.phase-card", "details.week-card", "details.day-card", "details.daily-study-guide", "details.daily-ai-session"]) {
    const detail = page.locator(selector).first();
    await detail.waitFor({ state: "attached", timeout: 20_000 });
    if (!(await detail.evaluate((element) => element.open))) {
      await detail.locator(":scope > summary").click();
    }
  }

  const aiSession = page.locator("details.daily-ai-session").first();
  await aiSession.getByRole("button", { name: "I am stuck", exact: true }).click();
  const promptEditor = aiSession.locator("textarea");
  const prompt = await promptEditor.inputValue();
  const editorStyle = await promptEditor.evaluate((element) => {
    const style = getComputedStyle(element);
    return { fontSize: Number.parseFloat(style.fontSize), lineHeight: Number.parseFloat(style.lineHeight) };
  });

  await aiSession.getByRole("button", { name: "Prompt kopieren", exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.includes("Prompt kopiert ✓"));
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");
  const masterPromptResponse = await page.request.get(`${baseUrl}/prompts/complete-daily-thesis-work-prompt.md`);
  const masterPrompt = await masterPromptResponse.text();
  const screenshotPath = join(outputDirectory, "daily-ai-session-installed.png");
  await aiSession.screenshot({ path: screenshotPath });

  const result = {
    url: baseUrl,
    status: response?.status() ?? 0,
    panelOpen: await aiSession.evaluate((element) => element.open),
    builderModeSelected: prompt.includes("Builder Mode for this unit only"),
    hasDayContext: prompt.includes("TODAY'S TRACKER CONTEXT") && prompt.includes("Project artefact:"),
    permissionBoundaryVisible: prompt.includes("NOT authorized"),
    clipboardMatches: normalizeLineEndings(clipboardText) === normalizeLineEndings(prompt),
    clipboardLength: clipboardText.length,
    promptLength: prompt.length,
    masterPromptStatus: masterPromptResponse.status(),
    masterPromptComplete: masterPrompt.includes("# Master Prompt: Daily Bachelor Thesis Research and Software Work")
      && masterPrompt.includes("## 17. Priority order"),
    editorFontSize: editorStyle.fontSize,
    editorLineHeight: editorStyle.lineHeight,
    consoleErrors,
    pageErrors,
    screenshotPath,
  };

  const passed = result.status === 200
    && result.panelOpen
    && result.builderModeSelected
    && result.hasDayContext
    && result.permissionBoundaryVisible
    && result.clipboardMatches
    && result.masterPromptStatus === 200
    && result.masterPromptComplete
    && result.editorFontSize >= 12
    && result.consoleErrors.length === 0
    && result.pageErrors.length === 0;
  console.log(JSON.stringify({ ...result, passed }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await context.close();
  await browser.close();
}
