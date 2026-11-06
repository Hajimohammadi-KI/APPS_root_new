"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  readSupportLanguage,
  saveSupportLanguage,
  type SupportLanguage,
} from "@automaticity/learning-core/automaticity";
import { LearningNavigation } from "@/components/learning-navigation";
import { navigationConfig } from "@/components/navigation-config";
import { ApiConnectionStatus } from "@/features/components/api-connection-status";
import { InstallAppControl } from "@/features/components/install-app-control";
import { NeuroReader } from "@/features/components/neuro-reader";
import {
  canonicalScreenId,
  isAppShellPath,
  screenPaths,
} from "@/features/navigation/screen-routes";
import { useAppStore } from "@/features/store/app-store";
import { UserGuideButton } from "@/features/user-guide";

export function StandaloneLearningHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, mutate } = useAppStore();
  const navigationRef = React.useRef<HTMLDetailsElement>(null);
  const [supportLanguage, setSupportLanguage] =
    React.useState<SupportLanguage | null>(null);
  const [languageSaveFailed, setLanguageSaveFailed] = React.useState(false);
  React.useEffect(() => {
    const refresh = () => setSupportLanguage(readSupportLanguage("en"));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("automaticity:support-language", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("automaticity:support-language", refresh);
    };
  }, []);
  React.useEffect(() => {
    if (navigationRef.current) navigationRef.current.open = false;
  }, [pathname]);

  if (isAppShellPath(pathname)) return null;
  const currentPath = pathname === "/pdf-reader" ? "/notebook" : pathname;
  const current = [
    ...navigationConfig.en.main,
    ...navigationConfig.en.more,
  ].find((item) => item.href === currentPath);
  const title =
    current?.label ??
    (pathname === "/offline" ? "Offline" : "English Automaticity");

  return (
    <>
      <aside
        className="standalone-learning-sidebar"
        aria-label="English learning navigation"
      >
        <a className="standalone-learning-brand" href="/">
          <span aria-hidden="true">E</span>
          <strong>English Automaticity</strong>
        </a>
        <LearningNavigation language="en" current={currentPath} />
      </aside>
      <header className="standalone-learning-header" data-learning-header="">
        <div className="standalone-learning-header-start">
          <details className="standalone-navigation" ref={navigationRef}>
            <summary className="mobile-menu" aria-label="Open navigation">
              <Menu aria-hidden="true" />
            </summary>
            <div className="standalone-navigation-panel">
              <LearningNavigation
                language="en"
                current={currentPath}
                onNavigate={() => {
                  if (navigationRef.current) navigationRef.current.open = false;
                }}
              />
            </div>
          </details>
          <strong className="topbar-title">{title}</strong>
        </div>
        <details className="app-tools">
          <summary>Tools &amp; help</summary>
          <div className="app-tools-panel">
            <label className="flex w-full flex-col gap-2 rounded-xl border border-slate-200 p-3">
              <span className="font-semibold">
                Native language for explanations · زبان مادری
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
                  if (!saveSupportLanguage("en", selected)) {
                    setLanguageSaveFailed(true);
                    return;
                  }
                  setLanguageSaveFailed(false);
                  setSupportLanguage(selected);
                  window.dispatchEvent(
                    new CustomEvent("automaticity:support-language", {
                      detail: { target: "en", language: selected },
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
              <p role="status">The explanation language could not be saved.</p>
            ) : null}
            <ApiConnectionStatus baseUrl={state.settings.apiBaseUrl} />
            <NeuroReader
              onOpenSettings={() => router.push("/settings")}
              onToggleReadingRuler={(enabled) =>
                mutate((draft) => {
                  draft.settings.readingRuler = enabled;
                })
              }
              settings={state.settings}
            />
            <UserGuideButton
              navigate={(screen) => {
                const target = canonicalScreenId(screen);
                if (target) router.push(screenPaths[target]);
              }}
            />
            <InstallAppControl />
          </div>
        </details>
      </header>
    </>
  );
}
