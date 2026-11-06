import type { Language } from "./contracts";
import type { ConstructionUnit } from "./curriculum";
import type { TaskRecommendation } from "./selector";
import type { SupportLanguage } from "./support-language";

type DailyPathInput = {
  readonly reason: TaskRecommendation["reason"];
  readonly href: string;
  readonly level: string;
  readonly task?: TaskRecommendation["task"];
  readonly unit: Pick<ConstructionUnit, "tasks" | "retiredTasks">;
};

export interface DailyPathStep {
  readonly id: "priority" | "transfer" | "later";
  readonly label: string;
  readonly detail: string;
  readonly href: string | null;
}

const priorityLabels = {
  en: {
    repair: "Repair an earlier error",
    due_review: "Do the due review",
    diagnostic: "Start with the recommended question",
    continued_practice: "Continue the recommended question",
  },
  de: {
    repair: "Einen früheren Fehler korrigieren",
    due_review: "Fällige Wiederholung machen",
    diagnostic: "Mit der empfohlenen Frage beginnen",
    continued_practice: "Die empfohlene Frage fortsetzen",
  },
  fa: {
    repair: "اول اشتباه قبلی را اصلاح کن",
    due_review: "اول مرورِ موعدرسیده را انجام بده",
    diagnostic: "از سؤال پیشنهادی شروع کن",
    continued_practice: "سؤال پیشنهادی را ادامه بده",
  },
} as const;

/** A short order of real work; optional production never becomes checked evidence. */
export function buildDailyPathSteps(
  input: DailyPathInput,
  language: Language,
  displayLanguage: SupportLanguage = language,
): readonly DailyPathStep[] {
  const retired = new Set(input.unit.retiredTasks?.map((row) => row.taskId));
  const transfer = input.unit.tasks.find(
    (task) =>
      task.stage === "transfer" &&
      task.modality === "writing" &&
      task.partition === "practice" &&
      task.id !== input.task?.id &&
      !retired.has(task.id),
  );
  const transferQuery = transfer
    ? new URLSearchParams({
        task: transfer.id,
        level: input.level,
        from: "daily-transfer",
      })
    : null;
  return displayLanguage === "fa"
    ? [
        {
          id: "priority",
          label: priorityLabels.fa[input.reason],
          detail:
            "اول خودت پاسخ بده؛ بعد در صورت نیاز راهنما یا نمونه را ببین.",
          href: input.href,
        },
        {
          id: "transfer",
          label: transfer
            ? "گرامر را در یک موقعیت تازه به کار ببر"
            : "یک جمله دربارهٔ زندگی خودت بساز",
          detail: transfer
            ? "این تمرین بافت دیگری دارد. پاسخ آزاد ممکن است بدون نمره ذخیره شود."
            : "تمرین اختیاری و بدون نمره: پس از سؤال اصلی، جمله را بنویس یا بگو.",
          href: transferQuery ? `/practice?${transferQuery}` : null,
        },
        {
          id: "later",
          label: "بعد از فاصلهٔ زمانی برگرد",
          detail:
            "وقتی مرور موعدرسید، به سؤال تازه بدون نگاه به نمونه پاسخ بده. انجام تمرین امروز به معنی تسلط نیست.",
          href: null,
        },
      ]
    : displayLanguage === "en"
      ? [
          {
            id: "priority",
            label: priorityLabels.en[input.reason],
            detail: "Try your answer before opening a hint or model.",
            href: input.href,
          },
          {
            id: "transfer",
            label: transfer
              ? "Use the grammar in a new situation"
              : "Make one sentence about your own situation",
            detail: transfer
              ? "A different context helps you practise using the form. Open answers may be unscored."
              : "Optional, unscored practice: write or say the sentence after the main question.",
            href: transferQuery ? `/practice?${transferQuery}` : null,
          },
          {
            id: "later",
            label: "Return after a gap",
            detail:
              "When a review is due, answer a fresh question without the model. Today's completion is practice, not mastery.",
            href: null,
          },
        ]
      : [
          {
            id: "priority",
            label: priorityLabels.de[input.reason],
            detail:
              "Antworte zuerst, bevor du einen Hinweis oder ein Muster öffnest.",
            href: input.href,
          },
          {
            id: "transfer",
            label: transfer
              ? "Grammatik in einer neuen Situation anwenden"
              : "Einen Satz über deine eigene Situation bilden",
            detail: transfer
              ? "Ein anderer Kontext hilft beim Anwenden. Freie Antworten können ohne Bewertung bleiben."
              : "Zusätzliche Übung ohne Bewertung: Schreibe oder sage den Satz nach der Hauptfrage.",
            href: transferQuery ? `/practice?${transferQuery}` : null,
          },
          {
            id: "later",
            label: "Nach einer Pause wiederkommen",
            detail:
              "Wenn eine Wiederholung fällig ist, beantworte eine neue Frage ohne Muster. Heute üben heißt noch nicht beherrschen.",
            href: null,
          },
        ];
}
