import type { AssessmentEvent, Language, Verdict } from "./contracts";
import type { CurriculumPack } from "./curriculum";
import { readAutomaticityEvents, appendAutomaticityEvent } from "./storage";
import { reduceAutomaticityEvents } from "./evidence";
import { readRecording } from "./media";
import { sha256 } from "./backup";
const node = <K extends keyof HTMLElementTagNameMap>(tag: K, text?: string) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  return element;
};
/** Locally recorded review is useful feedback, never automatic scope approval. */
export function mountReviewPanel(
  root: HTMLElement,
  language: Language,
  pack: CurriculumPack,
  onSaved: () => void,
): void {
  const en = language === "en",
    t = (a: string, b: string) => (en ? a : b);
  const details = node("details");
  details.id = "response-review";
  details.open = new URLSearchParams(location.search).get("review") === "1";
  details.append(
    node(
      "summary",
      t("Review saved responses", "Gespeicherte Antworten prüfen"),
    ),
    node(
      "p",
      t(
        "Keep the original answer and add a separate review. Self-checks and locally recorded feedback do not certify mastery.",
        "Behalte die Originalantwort und ergänze eine separate Bewertung. Selbstprüfungen und lokal erfasste Rückmeldungen bestätigen keine Beherrschung.",
      ),
    ),
  );
  const form = node("form");
  form.className = "review-form";
  const select = node("select");
  select.id = "review-attempt";
  const addLabel = (label: string, id: string, control: HTMLElement) => {
    const element = node("label", label);
    element.htmlFor = id;
    form.append(element, control);
  };
  addLabel(t("Saved response", "Gespeicherte Antwort"), select.id, select);
  const original = node("blockquote"),
    prompt = node("p"),
    media = node("div");
  original.className = "response-copy";
  form.append(prompt, original, media);
  const reviewer = node("select");
  reviewer.id = "review-kind";
  for (const [value, label] of [
    ["self", t("My self-check", "Meine Selbstprüfung")],
    [
      "human",
      t(
        "Feedback from another reviewer",
        "Rückmeldung einer anderen prüfenden Person",
      ),
    ],
  ]) {
    const option = node("option", label);
    option.value = value!;
    reviewer.append(option);
  }
  addLabel(t("Review source", "Quelle der Rückmeldung"), reviewer.id, reviewer);
  const reviewerName = node("input");
  reviewerName.id = "reviewer-name";
  reviewerName.maxLength = 150;
  addLabel(
    t(
      "Reviewer's name or reference",
      "Name oder Referenz der prüfenden Person",
    ),
    reviewerName.id,
    reviewerName,
  );
  const verdict = node("select");
  verdict.id = "review-verdict";
  for (const [value, label] of [
    ["not_assessed", t("Not assessed", "Nicht beurteilt")],
    [
      "pass",
      t(
        "Grammar, target use and meaning are correct",
        "Grammatik, Zielstruktur und Bedeutung sind korrekt",
      ),
    ],
    [
      "needs_repair",
      t(
        "A grammatical repair is needed",
        "Eine grammatische Korrektur ist nötig",
      ),
    ],
    [
      "target_not_observed",
      t(
        "The target construction was not observed",
        "Die Zielstruktur wurde nicht beobachtet",
      ),
    ],
  ]) {
    const option = node("option", label);
    option.value = value!;
    verdict.append(option);
  }
  addLabel(t("Review result", "Prüfergebnis"), verdict.id, verdict);
  const opportunities = node("input");
  opportunities.id = "review-opportunities";
  opportunities.type = "number";
  opportunities.min = "1";
  opportunities.max = "1000";
  opportunities.value = "1";
  addLabel(
    t(
      "Target opportunities actually checked",
      "Tatsächlich geprüfte Stellen für die Zielstruktur",
    ),
    opportunities.id,
    opportunities,
  );
  const feedback = node("textarea");
  feedback.id = "review-feedback";
  feedback.required = true;
  feedback.maxLength = 10000;
  addLabel(
    t("Feedback and reason", "Rückmeldung und Begründung"),
    feedback.id,
    feedback,
  );
  const correction = node("textarea");
  correction.id = "review-correction";
  correction.maxLength = 100000;
  addLabel(
    t("Suggested correction, if needed", "Korrekturvorschlag, falls nötig"),
    correction.id,
    correction,
  );
  const save = node(
    "button",
    t("Save separate review", "Separate Bewertung speichern"),
  );
  save.type = "submit";
  form.append(save);
  const status = node("p");
  status.setAttribute("role", "status");
  form.append(status);
  details.append(form);
  root.append(details);
  let selectedId = "",
    audioUrl: string | null = null;
  const rows = () =>
    reduceAutomaticityEvents(
      readAutomaticityEvents(localStorage, language).events,
      language,
      new Date().toISOString(),
    ).attempts;
  const display = () => {
    selectedId = select.value;
    const row = rows().find((row) => row.attempt.id === selectedId);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    audioUrl = null;
    media.replaceChildren();
    feedback.value = "";
    correction.value = "";
    verdict.value = "not_assessed";
    if (!row) {
      original.textContent = t(
        "No saved responses yet.",
        "Noch keine gespeicherten Antworten.",
      );
      prompt.textContent = "";
      save.disabled = true;
      return;
    }
    save.disabled = false;
    original.textContent = row.attempt.response.text;
    prompt.textContent =
      pack.units
        .flatMap((unit) => unit.tasks)
        .find((task) => task.id === row.attempt.task.id)?.prompt ?? "";
    if (row.attempt.audio) {
      const play = node(
        "button",
        t("Load original recording", "Originalaufnahme laden"),
      );
      play.type = "button";
      play.onclick = () => {
        void (async () => {
          const audio = await readRecording(
            indexedDB,
            language,
            row.attempt.audio!.id,
          );
          if (
            !audio ||
            (await sha256(await audio.blob.arrayBuffer())) !==
              row.attempt.audio!.sha256
          )
            throw new Error(
              t(
                "The original recording is unavailable.",
                "Die Originalaufnahme ist nicht verfügbar.",
              ),
            );
          if (audioUrl) URL.revokeObjectURL(audioUrl);
          audioUrl = URL.createObjectURL(audio.blob);
          const player = node("audio");
          player.controls = true;
          player.src = audioUrl;
          media.replaceChildren(player);
        })().catch((error) => {
          status.textContent = String(error);
        });
      };
      media.append(play);
    }
  };
  const refresh = () => {
    const available = rows().reverse();
    select.replaceChildren();
    for (const row of available) {
      const unit = pack.units.find(
        (unit) => unit.id === row.attempt.task.constructionId,
      );
      const option = node(
        "option",
        `${new Date(row.attempt.at).toLocaleString(language)} · ${unit?.title ?? t("Practice response", "Übungsantwort")}`,
      );
      option.value = row.attempt.id;
      select.append(option);
    }
    if (available.some((row) => row.attempt.id === selectedId))
      select.value = selectedId;
    display();
  };
  select.onchange = display;
  details.addEventListener("toggle", () => {
    if (details.open) refresh();
  });
  form.onsubmit = (event) => {
    event.preventDefault();
    void (async () => {
      const row = rows().find((row) => row.attempt.id === selectedId);
      if (!row)
        throw new Error(
          t("Select a saved response.", "Wähle eine gespeicherte Antwort."),
        );
      if (!feedback.value.trim())
        throw new Error(
          t(
            "Add the reason for this review.",
            "Ergänze eine Begründung für die Bewertung.",
          ),
        );
      if (reviewer.value === "human" && !reviewerName.value.trim())
        throw new Error(
          t(
            "Identify the person whose feedback you are recording.",
            "Gib an, von wem die Rückmeldung stammt.",
          ),
        );
      const result = verdict.value as Verdict;
      const count = Number(opportunities.value);
      if (
        result !== "not_assessed" &&
        (!Number.isSafeInteger(count) || count < 1 || count > 1000)
      )
        throw new Error(
          t(
            "Enter the number of target opportunities checked.",
            "Gib die Anzahl der geprüften Stellen an.",
          ),
        );
      const at = new Date(
        Math.max(
          Date.now(),
          Date.parse(row.assessment?.at ?? row.attempt.at) + 1,
        ),
      ).toISOString();
      const assessment: AssessmentEvent = {
        version: 2,
        type: "assessment",
        id: crypto.randomUUID(),
        language,
        at,
        attemptId: row.attempt.id,
        responseSha256: row.attempt.response.sha256,
        taskVersion: row.attempt.task.version,
        rubricVersion: row.attempt.task.rubricVersion,
        verdict: result,
        dimensions: {
          grammar:
            result === "pass"
              ? "pass"
              : result === "needs_repair"
                ? "fail"
                : "unknown",
          target:
            result === "target_not_observed"
              ? "not_observed"
              : result === "not_assessed"
                ? "unknown"
                : "observed",
          relevance: result === "pass" ? "pass" : "unknown",
          opportunities: result === "not_assessed" ? null : count,
        },
        evaluator: {
          id:
            reviewer.value === "human"
              ? `local-review:${reviewerName.value.trim()}`
              : "learner-self-check",
          version: "1",
          kind: reviewer.value === "human" ? "human" : "self",
          scopeApproved: false,
          reviewId: crypto.randomUUID(),
        },
        uncertainty: result === "not_assessed",
        confidence: null,
        feedback: feedback.value.trim(),
        correction: correction.value.trim() || null,
        spans: [],
        supersedes:
          reviewer.value === "human" ? (row.assessment?.id ?? null) : null,
      };
      appendAutomaticityEvent(localStorage, assessment);
      onSaved();
      refresh();
      status.textContent = t(
        "Review saved separately. The original answer was kept. This feedback does not approve a mastery or model-assessment scope.",
        "Bewertung separat gespeichert. Die Originalantwort bleibt erhalten. Diese Rückmeldung bestätigt keine Beherrschung und gibt keine automatische Bewertungsfunktion frei.",
      );
    })().catch((error) => {
      status.textContent =
        error instanceof Error ? error.message : String(error);
    });
  };
  refresh();
  window.addEventListener("pagehide", () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  });
}
