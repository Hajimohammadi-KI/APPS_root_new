"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LearningNavigation } from "@/components/learning-navigation";
import { Button } from "@/components/ui/button";

export function MobileNavigation({
  homePinned = false,
  onPinHomeMenu,
}: {
  homePinned?: boolean;
  onPinHomeMenu?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = [
        ...(panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], summary, button:not([disabled])",
        ) ?? []),
      ].filter((node) => node.getClientRects().length > 0);
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (homePinned && pathname === "/")
    return (
      <Button
        aria-label="Zum angehefteten Menü"
        className="size-11"
        onClick={() =>
          document
            .querySelector("[data-pinned-home-navigation]")
            ?.scrollIntoView({ block: "start" })
        }
        size="icon"
        variant="ghost"
      >
        <Menu aria-hidden="true" />
      </Button>
    );

  return (
    <>
      <Button
        aria-controls="german-mobile-menu-panel"
        aria-expanded={open}
        aria-label={open ? "Navigation schließen" : "Navigation öffnen"}
        className="size-11"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        size="icon"
        variant="outline"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>
      {open ? (
        <>
          <button
            aria-label="Navigation schließen"
            className="german-mobile-menu-scrim"
            onClick={() => setOpen(false)}
            type="button"
          />
          <aside
            aria-label="Lernnavigation"
            aria-modal="true"
            className="german-mobile-menu-panel"
            id="german-mobile-menu-panel"
            ref={panelRef}
            role="dialog"
          >
            <LearningNavigation
              language="de"
              current={pathname}
              onNavigate={() => setOpen(false)}
              onPinToggle={
                pathname === "/" && onPinHomeMenu
                  ? () => {
                      onPinHomeMenu();
                      setOpen(false);
                    }
                  : undefined
              }
            />
          </aside>
        </>
      ) : null}
    </>
  );
}
