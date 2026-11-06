/* Presentation only. The navigation comes from navigation-config.js (generated
   from shared/navigation-config.json); existing page controls are only moved so
   their handlers and stored state survive. */
document.addEventListener("DOMContentLoaded", () => {
  const en = document.documentElement.lang !== "de";
  const config = window.languageNavigation?.[en ? "en" : "de"];
  if (!config) return;
  const current = location.pathname.replace(/\/$/, "") || "/";
  const link = (item, className) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.className = className;
    a.textContent = item.label;
    if (current === item.href) {
      a.setAttribute("aria-current", "page");
      a.classList.add("active");
    }
    return a;
  };
  const buildNativeLanguagePicker = () => {
    const target = en ? "en" : "de";
    const key = en
      ? "english-explanation-language"
      : "deutsch-automaticity:explanation-language";
    const names = { fa: "فارسی", en: "English", de: "Deutsch" };
    const read = () => {
      try {
        const saved = localStorage.getItem(key);
        return (
          Object.keys(names).find(
            (code) => saved === code || (!en && saved === names[code]),
          ) ?? "fa"
        );
      } catch {
        return "fa";
      }
    };
    const label = document.createElement("label");
    label.className = "native-language-menu";
    const heading = document.createElement("span");
    heading.textContent = en
      ? "Native language for explanations · زبان مادری"
      : "زبان مادری برای راهنما · Muttersprache";
    const select = document.createElement("select");
    select.dataset.nativeLanguageSelect = "";
    for (const code of ["fa", "en", "de"]) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = names[code];
      option.lang = code;
      select.append(option);
    }
    select.value = read();
    const status = document.createElement("span");
    status.setAttribute("role", "status");
    select.addEventListener("change", () => {
      const language = select.value;
      if (!Object.hasOwn(names, language)) return;
      try {
        localStorage.setItem(key, en ? language : names[language]);
        status.textContent = "";
      } catch {
        status.textContent = en
          ? "The explanation language could not be saved."
          : "زبان راهنما در این مرورگر ذخیره نشد.";
        select.value = read();
        return;
      }
      window.dispatchEvent(
        new CustomEvent("automaticity:support-language", {
          detail: { target, language },
        }),
      );
    });
    const refresh = () => {
      select.value = read();
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("automaticity:support-language", refresh);
    label.append(heading, select, status);
    return label;
  };
  const buildPrimaryNav = () => {
    const nav = document.createElement("nav");
    nav.className = "calm-primary-nav";
    nav.setAttribute(
      "aria-label",
      en ? "Learning navigation" : "Lernnavigation",
    );
    for (const item of config.main) {
      const anchor = link(item, "");
      const icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = item.icon;
      anchor.prepend(icon);
      nav.append(anchor);
    }
    return nav;
  };
  // Daily pages keep the ".nav-section/.nav-item" classes, Grammar pages the
  // ".nav-group/.nav-title/.nav-link" classes, so each page's own stylesheet
  // still applies.
  const buildMore = (groupClass, itemClass) => {
    const more = document.createElement("details");
    more.className = "calm-nav-more";
    if (
      config.more.some((item) => item.href === current) ||
      config.settings === current
    )
      more.open = true;
    const summary = document.createElement("summary");
    summary.textContent = en ? "All learning tools" : "Alle Lernwerkzeuge";
    const group = document.createElement("section");
    group.className = groupClass;
    for (const item of config.more) group.append(link(item, itemClass));
    more.append(summary, group);
    return more;
  };
  const buildSettingsLink = () =>
    link(
      {
        href: config.settings,
        label: en ? "Settings" : "Einstellungen",
      },
      "calm-settings-link",
    );

  const practice = document.querySelector("#practice-root");
  if (practice) {
    document.body.classList.add("language-workspace", "practice-workspace");
    const sidebar = document.createElement("aside");
    sidebar.className = "calm-practice-sidebar";
    sidebar.setAttribute(
      "aria-label",
      en ? "Learning navigation" : "Lernnavigation",
    );
    const brand = document.createElement("a");
    brand.className = "calm-practice-brand";
    brand.href = "/";
    brand.textContent = en ? "English Automaticity" : "DeutschFlow";
    sidebar.append(
      brand,
      buildPrimaryNav(),
      buildMore("nav-section", "nav-item"),
      buildSettingsLink(),
    );
    document.body.prepend(sidebar);
    const topbar = document.createElement("header");
    topbar.className = "topbar calm-practice-topbar";
    const menu = document.createElement("details");
    menu.className = "calm-practice-nav";
    const menuButton = document.createElement("summary");
    menuButton.className = "mobile-menu";
    menuButton.setAttribute(
      "aria-label",
      en ? "Open navigation" : "Navigation öffnen",
    );
    menuButton.textContent = "☰";
    const menuPanel = document.createElement("nav");
    menuPanel.className = "calm-practice-nav-panel";
    menuPanel.setAttribute(
      "aria-label",
      en ? "Learning navigation" : "Lernnavigation",
    );
    menuPanel.append(
      buildPrimaryNav(),
      buildMore("nav-section", "nav-item"),
      buildSettingsLink(),
    );
    menu.append(menuButton, menuPanel);
    const title = document.createElement("strong");
    title.className = "calm-topbar-title";
    title.textContent = en ? "My practice" : "Meine Übungen";
    const tools = document.createElement("details");
    tools.className = "calm-header-tools";
    const toolsSummary = document.createElement("summary");
    toolsSummary.textContent = en ? "Tools & help" : "Hilfe & Werkzeuge";
    const actions = document.createElement("div");
    actions.className = "header-actions";
    actions.append(
      buildNativeLanguagePicker(),
      link(
        { href: "/support", label: en ? "Help" : "Hilfe" },
        "calm-tools-action",
      ),
      link(
        {
          href: config.settings,
          label: en ? "Settings" : "Einstellungen",
        },
        "calm-tools-action",
      ),
    );
    tools.append(toolsSummary, actions);
    topbar.append(menu, title, tools);
    document.body.prepend(topbar);
    return;
  }

  // Grammar lab pages: a fixed ".sidebar" with its own <nav>.
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    document.body.classList.add("language-workspace");
    const navigation = sidebar.querySelector("nav");
    if (navigation) {
      navigation.replaceChildren(
        buildPrimaryNav(),
        buildMore("nav-group", "nav-link"),
        buildSettingsLink(),
      );
    }
    const actions = document.querySelector(".header-actions");
    if (actions) {
      const tools = document.createElement("details");
      tools.className = "calm-header-tools";
      const summary = document.createElement("summary");
      summary.textContent = en ? "Tools & help" : "Hilfe & Werkzeuge";
      actions.before(tools);
      tools.append(summary, actions);
      actions.prepend(buildNativeLanguagePicker());
    }
    const pageTitle = document.querySelector(".topbar .page-id h2");
    if (pageTitle) pageTitle.textContent = config.main[2].label;
    return;
  }

  // Today pages: a ".side" drawer and a topbar of glyph buttons. Keep every
  // topbar button (handlers and drawer state live on them); only regroup them.
  const side = document.querySelector("nav.side");
  if (!side) return;
  document.body.classList.add("language-workspace", "daily-workspace");
  const body = side.querySelector(".side-body");
  if (body)
    body.replaceChildren(
      buildPrimaryNav(),
      buildMore("nav-section", "nav-item"),
      buildSettingsLink(),
    );
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const title = document.createElement("strong");
    title.className = "calm-topbar-title";
    title.textContent = config.more[0].label;
    topbar.querySelector(".mobile-menu")?.after(title);
    const keep = new Set([topbar.querySelector(".mobile-menu")]);
    const moved = [...topbar.children].filter(
      (el) =>
        !keep.has(el) &&
        el !== title &&
        !(el.classList.contains("pill") && el.querySelector(".dot")),
    );
    if (moved.length) {
      const tools = document.createElement("details");
      tools.className = "calm-header-tools";
      const summary = document.createElement("summary");
      summary.textContent = en ? "Tools & help" : "Hilfe & Werkzeuge";
      const panel = document.createElement("div");
      panel.className = "calm-tools-panel";
      panel.append(buildNativeLanguagePicker(), ...moved);
      tools.append(summary, panel);
      topbar.append(tools);
    }
  }
});
