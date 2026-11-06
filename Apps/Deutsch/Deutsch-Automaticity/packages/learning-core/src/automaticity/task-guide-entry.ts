import { persianTaskSteps } from "./persian-task-guide";
import { readSupportLanguage } from "./support-language";
import type { Language } from "./contracts";
import { promptTextParts } from "./prompt-text";

// The two existing grammar libraries own their question and draft lifecycle.
// Observe only question text; this panel never writes inputs, storage or scores.
const script = document.currentScript;
const language = script?.getAttribute("data-language");
const prompt = document.getElementById("exercisePrompt");
if ((language === "en" || language === "de") && prompt) {
  const guide = document.createElement("section");
  guide.id = "library-task-instructions";
  guide.lang = "fa";
  guide.dir = "rtl";
  guide.style.cssText =
    "margin:16px 0;padding:16px;border:1px solid #cfe2e3;border-radius:12px;background:#fff5d7;color:#08364a;text-align:right;font:14px/1.9 Tahoma,Arial,sans-serif;overflow-wrap:anywhere";
  const anchor = prompt.closest(".exercise-title") ?? prompt;
  anchor.after(guide);
  let previous = "";
  const render = () => {
    const text = prompt.textContent?.trim() ?? "";
    const source = prompt.dataset.sourcePrompt ?? text;
    const stage =
      prompt.dataset.taskStage === "produce" ? "produce" : "retrieve";
    const support = readSupportLanguage(language as Language);
    const signature = JSON.stringify([text, source, stage, support]);
    if (signature === previous) return;
    previous = signature;
    const fragments = promptTextParts(text, language as Language).map(
      (part) => {
        const span = document.createElement("span");
        span.lang = part.lang;
        span.dir = part.dir;
        span.style.cssText = `display:block;unicode-bidi:isolate;white-space:pre-line;${part.breakBefore ? "margin-top:8px" : ""}`;
        span.textContent = part.text;
        return span;
      },
    );
    prompt.replaceChildren(...fragments);
    guide.hidden = support !== "fa" || !text;
    guide.replaceChildren();
    if (guide.hidden) return;
    const heading = document.createElement("h4");
    heading.textContent = "از من چه پاسخی خواسته شده؟";
    heading.style.margin = "0 0 8px";
    const list = document.createElement("ol");
    list.style.cssText = "margin:0;padding-inline-start:24px";
    for (const step of persianTaskSteps(
      language as Language,
      stage,
      "writing",
      source,
    )) {
      const item = document.createElement("li");
      item.textContent = step;
      list.append(item);
    }
    guide.append(heading, list);
  };
  new MutationObserver(render).observe(prompt, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  window.addEventListener("storage", render);
  window.addEventListener("automaticity:support-language", render);
  document.addEventListener("change", render);
  render();
}
