"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  persianRouteGuide,
  readSupportLanguage,
  saveSupportLanguage,
  type SupportLanguage,
} from "@automaticity/learning-core/automaticity";
import { LearningNavigation } from "@/components/learning-navigation";
import { navigationConfig } from "@/components/navigation-config";
import { ApiConnectionStatus } from "@/components/api-connection-status";
import { Brand } from "@/components/brand";
import { Disclosure } from "@/components/ui/disclosure";
import { MobileNavigation } from "@/components/mobile-navigation";
import { InstallAppButton } from "@/features/pwa/install-app-button";
import { primaryNavigation, secondaryNavigation } from "@/lib/navigation";
import { UserGuideButton } from "@/components/user-guide";
import { NeuroReader } from "@/components/neuro-reader";
import { useLearnerState } from "@/features/learner-state/learner-state-provider";
import { AutomaticityEvidenceSummary } from "@/features/progress/automaticity-evidence-summary";

export function AppShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, updateSettings } = useLearnerState();
  const [supportLanguage, setSupportLanguage] =
    useState<SupportLanguage | null>(null);
  const [languageSaveFailed, setLanguageSaveFailed] = useState(false);
  const [homeMenuPinned, setHomeMenuPinned] = useState(false);
  useEffect(() => {
    try {
      setHomeMenuPinned(
        localStorage.getItem("deutschflow:home-menu-pinned") === "true",
      );
    } catch {
      // The menu remains usable for this visit.
    }
  }, []);
  const updateHomeMenuPin = (pinned: boolean) => {
    setHomeMenuPinned(pinned);
    try {
      localStorage.setItem("deutschflow:home-menu-pinned", String(pinned));
    } catch {
      // Keep the chosen layout for this visit.
    }
  };
  useEffect(() => {
    const refresh = () => setSupportLanguage(readSupportLanguage("de"));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("automaticity:support-language", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("automaticity:support-language", refresh);
    };
  }, []);
  const persianGuide =
    supportLanguage === "fa" ? persianRouteGuide(pathname, "de") : null;
  const current =
    [...primaryNavigation, ...secondaryNavigation].find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? primaryNavigation[0];
  const extraTitle: Record<string, string> = {
    "/automatik": "Automatik",
    "/themen": "Themen",
    "/klassik": "Klassische Übungen",
    "/deutsch-mit-marija": "Deutsch mit Marija",
    "/offline": "Offline",
  };
  const currentLabel =
    [...navigationConfig.de.main, ...navigationConfig.de.more].find(
      (item) => item.href === pathname,
    )?.label ??
    extraTitle[pathname] ??
    (pathname.startsWith("/deutsch-mit-marija/uebung/")
      ? "Übung mit Marija"
      : pathname === navigationConfig.de.settings
        ? "Einstellungen"
        : current.label);
  return (
    <div className="min-h-screen">
      <a className="skip-link" href="#main-content">
        Zum Hauptinhalt springen
      </a>
      <aside className="german-app-sidebar fixed inset-y-0 left-0 z-30 hidden border-r min-[900px]:flex min-[900px]:flex-col">
        <Brand />
        <div className="german-sidebar-groups mt-7 flex-1">
          <LearningNavigation language="de" current={pathname} />
        </div>
      </aside>
      <div className="german-shell-body">
        <header className="german-app-topbar sticky top-0 z-20 border-b">
          <div className="german-topbar-row flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="german-mobile-navigation min-[900px]:hidden">
                <MobileNavigation
                  homePinned={homeMenuPinned}
                  onPinHomeMenu={() => updateHomeMenuPin(true)}
                />
              </div>
              <strong className="topbar-title text-sm">{currentLabel}</strong>
            </div>
            <details className="app-tools">
              <summary>Hilfe & Werkzeuge</summary>
              <div className="app-tools-panel">
                <p>Lesen, Installation und Verbindung</p>
                <label className="flex w-full flex-col gap-2 rounded-xl border border-slate-200 p-3">
                  <span className="font-semibold">
                    زبان مادری برای راهنما · Muttersprache
                  </span>
                  <select
                    className="min-h-11 rounded-lg border border-slate-300 bg-white px-3"
                    data-native-language-select=""
                    value={supportLanguage ?? "fa"}
                    onChange={(event) => {
                      const selected = event.currentTarget.value;
                      if (
                        selected !== "fa" &&
                        selected !== "en" &&
                        selected !== "de"
                      )
                        return;
                      if (!saveSupportLanguage("de", selected)) {
                        setLanguageSaveFailed(true);
                        return;
                      }
                      setLanguageSaveFailed(false);
                      setSupportLanguage(selected);
                      window.dispatchEvent(
                        new CustomEvent("automaticity:support-language", {
                          detail: { target: "de", language: selected },
                        }),
                      );
                    }}
                  >
                    <option value="fa">فارسی</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                  </select>
                </label>
                {languageSaveFailed ? (
                  <p role="status">زبان راهنما در این مرورگر ذخیره نشد.</p>
                ) : null}
                <ApiConnectionStatus />
                <NeuroReader
                  onOpenSettings={() => router.push("/einstellungen")}
                  onToggleReadingRuler={(readingRuler) =>
                    updateSettings({ readingRuler })
                  }
                  settings={state.settings}
                />
                <UserGuideButton />
                <InstallAppButton surface="header" />
              </div>
            </details>
          </div>
        </header>
        <main
          className="german-app-main mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
          id="main-content"
          tabIndex={-1}
        >
          {pathname === "/" && homeMenuPinned ? (
            <section
              className="pinned-home-navigation"
              data-pinned-home-navigation=""
              aria-label="Angeheftete Lernnavigation"
            >
              <LearningNavigation
                language="de"
                current="/"
                onPinToggle={() => updateHomeMenuPin(false)}
                pinned
              />
            </section>
          ) : null}
          {persianGuide ? (
            <section
              className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-right leading-7"
              lang="fa"
              dir="rtl"
              aria-label="راهنمای فارسی این صفحه"
            >
              <h2 className="mb-2 font-bold">{persianGuide.title}</h2>
              <ol className="list-decimal space-y-1 ps-6">
                {persianGuide.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <a
                className="mt-3 inline-block font-semibold underline"
                href={persianGuide.next.href}
              >
                {persianGuide.next.label} ←
              </a>
            </section>
          ) : null}
          {children}
          {["/studio", "/fehler", "/wiederholungen", "/lehrkraft"].includes(
            pathname,
          ) ? (
            <Disclosure summary="Antworten & Lernnachweise">
              <AutomaticityEvidenceSummary />
            </Disclosure>
          ) : null}
        </main>
      </div>
    </div>
  );
}
