import {
  ChartNoAxesCombined,
  ChevronDown,
  House,
  Library,
  Pin,
  Play,
  Settings,
} from "lucide-react";

import { navigationConfig } from "./navigation-config";

/** Shared route presentation only; existing exercise and storage logic stays in its app. */
export function LearningNavigation({
  language,
  current,
  onNavigate,
  onPinToggle,
  pinned = false,
}: {
  language: "en" | "de";
  current: string;
  onNavigate?: () => void;
  onPinToggle?: () => void;
  pinned?: boolean;
}) {
  const config = navigationConfig[language];
  const main = config.main;
  const more = config.more;
  const en = language === "en";
  return (
    <nav
      className="learning-navigation"
      aria-label={en ? "Learning navigation" : "Lernnavigation"}
      data-no-context-help=""
    >
      <div className="ln-heading">
        <p className="ln-label">{en ? "Your learning" : "Dein Lernen"}</p>
        {onPinToggle ? (
          <button
            aria-label={pinned ? "Unpin menu from Home" : "Pin menu to Home"}
            aria-pressed={pinned}
            className="ln-pin"
            data-no-context-help=""
            data-pin-home-menu={pinned ? undefined : ""}
            data-unpin-home-menu={pinned ? "" : undefined}
            onClick={onPinToggle}
            type="button"
          >
            <Pin aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <ul>
        {main.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={current === item.href ? "page" : undefined}
              onClick={onNavigate}
            >
              {item.icon === "⌂" && <House aria-hidden="true" />}
              {item.icon === "▶" && <Play aria-hidden="true" />}
              {item.icon === "▣" && <span aria-hidden="true">▣</span>}
              {item.icon === "▢" && <span aria-hidden="true">▢</span>}
              {item.icon === "◷" && <ChartNoAxesCombined aria-hidden="true" />}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <details
        className="ln-more"
        open={more.some((item) => current === item.href) || undefined}
      >
        <summary>
          <Library aria-hidden="true" />
          <span>{en ? "All learning tools" : "Alle Lernwerkzeuge"}</span>
          <ChevronDown aria-hidden="true" />
        </summary>
        <ul>
          {more.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={current === item.href ? "page" : undefined}
                onClick={onNavigate}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </details>
      <a
        className="ln-settings"
        href={config.settings}
        aria-current={current === config.settings ? "page" : undefined}
        onClick={onNavigate}
      >
        <Settings aria-hidden="true" />
        <span>{en ? "Settings" : "Einstellungen"}</span>
      </a>
    </nav>
  );
}
