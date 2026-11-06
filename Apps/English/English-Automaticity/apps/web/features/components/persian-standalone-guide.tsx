"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  persianRouteGuide,
  readSupportLanguage,
  type SupportLanguage,
} from "@automaticity/learning-core/automaticity";
import { isAppShellPath } from "@/features/navigation/screen-routes";

export function PersianStandaloneGuide() {
  const pathname = usePathname();
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [supportLanguage, setSupportLanguage] =
    useState<SupportLanguage | null>(null);

  useEffect(() => {
    const refresh = () => setSupportLanguage(readSupportLanguage("en"));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("automaticity:support-language", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("automaticity:support-language", refresh);
    };
  }, []);

  useEffect(() => {
    if (isAppShellPath(pathname)) return;
    const main = document.querySelector<HTMLElement>(
      "main#main-content, main.studio-main, main",
    );
    if (!main) return;
    const slot = document.createElement("div");
    slot.className = "persian-route-guide-slot";
    main.prepend(slot);
    setHost(slot);
    return () => {
      setHost(null);
      slot.remove();
    };
  }, [pathname]);

  const guide =
    supportLanguage === "fa" && !isAppShellPath(pathname)
      ? persianRouteGuide(pathname ?? "", "en")
      : null;
  if (!guide || !host) return null;
  return createPortal(
    <section
      className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-right leading-7"
      lang="fa"
      dir="rtl"
      aria-label="راهنمای فارسی این صفحه"
    >
      <h2 className="mb-2 font-bold">{guide.title}</h2>
      <ol className="list-decimal space-y-1 ps-6">
        {guide.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <a
        className="mt-3 inline-block font-semibold underline"
        href={guide.next.href}
      >
        {guide.next.label} ←
      </a>
    </section>,
    host,
  );
}
