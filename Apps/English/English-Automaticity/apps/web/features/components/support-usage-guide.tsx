"use client";

import Link from "next/link";
import * as React from "react";
import {
  getAppUsageGuide,
  readSupportLanguage,
  supportLanguageKey,
  type SupportLanguage,
} from "@automaticity/learning-core/automaticity";

export function SupportUsageGuide() {
  const [language, setLanguage] = React.useState<SupportLanguage>("en");
  React.useEffect(() => {
    const refresh = () => setLanguage(readSupportLanguage("en"));
    const onStorage = (event: StorageEvent) => {
      if (event.key === supportLanguageKey("en")) refresh();
    };
    refresh();
    window.addEventListener("automaticity:support-language", refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("automaticity:support-language", refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const guide = getAppUsageGuide("en", language);
  return (
    <section
      className="mb-6 rounded-2xl border border-[#cfe0e4] bg-white p-5 shadow-sm sm:p-7"
      data-app-usage-guide
      dir={language === "fa" ? "rtl" : "ltr"}
      id="daily-plan"
      lang={language}
    >
      <h2 className="text-2xl font-bold text-[#08364a]">{guide.title}</h2>
      <p className="mt-2 text-[#315467]">{guide.intro}</p>
      <ol className="mt-5 grid gap-4 p-0 sm:grid-cols-2">
        {guide.steps.map((step) => (
          <li
            className="list-none rounded-xl border border-[#d8e6e8] bg-[#f1f8f9] p-4"
            key={step.title}
          >
            <h3 className="font-bold text-[#08364a]">{step.title}</h3>
            <p className="mt-2 leading-7">{step.description}</p>
            <Link
              className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#007f83] underline underline-offset-4"
              href={step.href}
            >
              {step.linkLabel}
            </Link>
          </li>
        ))}
      </ol>
      <div
        className="mt-5 rounded-xl border border-[#cfe0e4] bg-[#eaf5f6] p-4"
        id="reminder-help"
      >
        <h3 className="font-bold text-[#08364a]">{guide.reminder.title}</h3>
        <p className="mt-2 leading-7">{guide.reminder.description}</p>
        <Link
          className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#007f83] underline underline-offset-4"
          href={guide.reminder.href}
        >
          {guide.reminder.linkLabel}
        </Link>
      </div>
      <h3 className="mt-5 font-bold text-[#08364a]">{guide.otherTitle}</h3>
      <nav aria-label={guide.otherTitle} className="mt-2 flex flex-wrap gap-3">
        {(["grammar", "studio", "progress", "settings"] as const).map(
          (section) => (
            <Link
              className="inline-flex min-h-11 items-center rounded-lg border border-[#cfe0e4] px-3 text-[#007f83]"
              href={guide.links[section]}
              key={section}
            >
              {guide.otherLabels[section]}
            </Link>
          ),
        )}
      </nav>
      <p className="mt-5 leading-7">{guide.limits}</p>
      <p className="mt-2 leading-7">{guide.backup}</p>
    </section>
  );
}
