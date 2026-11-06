import { notebookCopy } from "@automaticity/learning-core/automaticity";

/**
 * ورودی زبان اپ است؛ خروجی توضیح روش و منشأ تمرین‌ها برای محیط حرفه‌ای با همان زبان است.
 * متن اصلی دفتر خطا از هستهٔ مشترک می‌آید؛ این مؤلفه نمره، تاریخچه یا انتخاب یادگیرنده را تغییر نمی‌دهد.
 */
export function StaffMethodNotes({ language }: { language: "en" | "de" }) {
  const notes = notebookCopy(language);
  const t = (en: string, de: string) => (language === "en" ? en : de);
  return (
    <section
      lang={language}
      dir="ltr"
      style={{
        marginBlock: 24,
        padding: 24,
        border: "1px solid #cfe2e3",
        borderRadius: 16,
        lineHeight: 1.7,
      }}
    >
      <h2>
        {t(
          "Assessment method and exercise sources",
          "Bewertungsmethode und Herkunft der Übungen",
        )}
      </h2>
      <h3>{t("Error notebook", "Fehlerheft")}</h3>
      <p>{notes.source}</p>
      <p>{notes.progressBasis}</p>
      <p>
        {t(
          "Progress counts use the latest response to each active exercise version. A new response requiring correction replaces an earlier pass in the current count. The original history is preserved.",
          "Der Fortschrittsstand beruht auf der letzten Antwort zur aktiven Version jeder Übung. Eine neue Antwort mit Korrekturbedarf ersetzt ein früheres Bestehen in der aktuellen Zählung. Der ursprüngliche Verlauf bleibt erhalten.",
        )}
      </p>
      <h3>{t("Limits of the reports", "Grenzen der Berichte")}</h3>
      <p>
        {t(
          "Practice completion, independent assessment, transfer to a new situation and delayed retrieval are recorded separately. Free responses and automatic transcripts alone do not establish spoken accuracy or a CEFR level.",
          "Übungsabschluss, unabhängige Bewertung, Übertragung auf neue Situationen und zeitversetzter Abruf werden getrennt erfasst. Freie Antworten und automatische Transkripte allein belegen weder korrekte Sprache noch ein GER-Niveau.",
        )}
      </p>
      <p>
        {t(
          "Data sources, calculation methods, quality criteria, review status and model details belong to this staff workspace. Learners see practical results and guidance for their next step.",
          "Datenquellen, Berechnungsmethoden, Qualitätskriterien, Prüfstatus und Modelldetails gehören in diesen geschützten Bereich. Lernende sehen praktische Ergebnisse und Hinweise zum nächsten Schritt.",
        )}
      </p>
    </section>
  );
}
