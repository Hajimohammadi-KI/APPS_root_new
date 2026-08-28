"use client";

import * as React from "react";
import {
  ArrowLeft,
  Download,
  FileAudio,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import {
  HumanAudioPlayer,
  HumanAudioRecorder,
} from "@/components/human-audio-player";
import {
  createTeacherContentPackage,
  deleteTeacherContent,
  ensureTeacherContextKey,
  listTeacherContent,
  parseTeacherContentPackage,
  saveTeacherContent,
  type TeacherContentItem,
  type TeacherContentKind,
  type TeacherContentStatus,
} from "@/lib/teacher-content";

const empty = (): TeacherContentItem => ({
  id: crypto.randomUUID(),
  kind: "example",
  level: "A1",
  title: "",
  body: "",
  contextKey: "",
  status: "draft",
  updatedAt: new Date().toISOString(),
});

const publicationLabels: Record<TeacherContentStatus, string> = {
  draft: "Entwurf",
  review: "Zur Prüfung",
  published: "Veröffentlicht",
};

export default function LehrkraftPage() {
  const [items, setItems] = React.useState<TeacherContentItem[]>([]);
  const [draft, setDraft] = React.useState<TeacherContentItem>(empty);
  const [audio, setAudio] = React.useState<Blob | null>(null);
  const [message, setMessage] = React.useState("");
  const importInputRef = React.useRef<HTMLInputElement>(null);
  const refresh = React.useCallback(
    async () => setItems(await listTeacherContent()),
    [],
  );
  React.useEffect(() => {
    void refresh();
  }, [refresh]);
  async function save() {
    if (!draft.title.trim()) {
      setMessage("Bitte gib einen Titel ein.");
      return;
    }
    const next: TeacherContentItem = {
      ...draft,
      title: draft.title.trim(),
      body: draft.body.trim(),
      // Keep existing links when editing, but create a safe internal key for
      // new content so teachers never have to invent a technical identifier.
      contextKey: ensureTeacherContextKey(draft),
      ...(audio
        ? { audioName: "menschliche-aufnahme", audioType: audio.type }
        : {}),
      updatedAt: new Date().toISOString(),
    };
    await saveTeacherContent(next, audio);
    setDraft(empty());
    setAudio(null);
    setMessage(`${publicationLabels[next.status ?? "draft"]} gespeichert.`);
    await refresh();
  }

  function exportContent() {
    const file = new Blob(
      [JSON.stringify(createTeacherContentPackage(items), null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deutsch-automaticity-lehrkraft-inhalte.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage(
      "Text-Inhalte und Arbeitsstände exportiert. Audio bleibt privat auf diesem Gerät.",
    );
  }

  async function importContent(file: File) {
    try {
      const imported = parseTeacherContentPackage(
        JSON.parse(await file.text()),
      );
      // Beim Import bleiben Lern-Verknüpfung und Arbeitsstand erhalten. Echte
      // Audioaufnahmen werden bewusst erst auf dem Zielgerät ergänzt.
      await Promise.all(imported.map((item) => saveTeacherContent(item)));
      setMessage(
        `${imported.length} Text-Inhalt${imported.length === 1 ? "" : "e"} importiert. Bitte menschliche Aufnahmen bei Bedarf erneut anhängen.`,
      );
      await refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Diese Datei konnte nicht importiert werden.",
      );
    } finally {
      if (importInputRef.current) importInputRef.current.value = "";
    }
  }
  return (
    <main className="teacher-page">
      <header className="teacher-hero">
        <a href="/" className="teacher-back">
          <ArrowLeft /> Zurück zur App
        </a>
        <span className="teacher-kicker">LEHRKRAFT-AUTORING</span>
        <h1>Inhalte und menschliche Aufnahmen verwalten</h1>
        <p>
          Verben, Beispiele, Übungen und Gespräche hinzufügen oder bearbeiten.
          Als Lektionsaudio wird ausschließlich eine menschliche Aufnahme
          verwendet.
        </p>
      </header>
      <div className="teacher-layout">
        <section className="teacher-editor">
          <h2>
            {items.some((item) => item.id === draft.id)
              ? "Inhalt bearbeiten"
              : "Inhalt hinzufügen"}
          </h2>
          <div className="teacher-grid">
            <label>
              Inhaltstyp
              <select
                value={draft.kind}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    kind: e.target.value as TeacherContentKind,
                  })
                }
              >
                <option value="verb">Verb</option>
                <option value="example">Beispiel</option>
                <option value="exercise">Übung</option>
                <option value="conversation">Gespräch</option>
              </select>
            </label>
            <label>
              GER-Niveau
              <select
                value={draft.level}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    level: e.target.value as TeacherContentItem["level"],
                  })
                }
              >
                {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
            <label>
              Arbeitsstand
              <select
                value={draft.status ?? "published"}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    status: e.target.value as TeacherContentStatus,
                  })
                }
              >
                {(Object.keys(publicationLabels) as TeacherContentStatus[]).map(
                  (status) => (
                    <option key={status} value={status}>
                      {publicationLabels[status]}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>
          <label>
            Titel
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </label>
          <p className="teacher-helper" role="note">
            Die App erstellt die interne Verknüpfung für Inhalt und Aufnahme
            automatisch. Du brauchst keinen technischen Schlüssel einzugeben.
          </p>
          <label>
            Text
            <textarea
              rows={6}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            />
          </label>
          <fieldset>
            <legend>Menschlich aufgenommenes Audio</legend>
            <label className="teacher-upload">
              <Upload /> Audiodatei auswählen
              <input
                accept="audio/*"
                onChange={(e) => setAudio(e.target.files?.[0] ?? null)}
                type="file"
              />
            </label>
            <HumanAudioRecorder onRecorded={setAudio} />
            {draft.audioName && !audio ? (
              <HumanAudioPlayer contentId={draft.id} />
            ) : null}
          </fieldset>
          {message ? (
            <p className="teacher-message" role="status">
              {message}
            </p>
          ) : null}
          <button
            className="teacher-primary-button"
            onClick={() => void save()}
            type="button"
          >
            <Save /> Inhalt speichern
          </button>
        </section>
        <section className="teacher-library">
          <div className="teacher-library-heading">
            <div>
              <span className="teacher-kicker">BIBLIOTHEK</span>
              <h2>Verwaltete Inhalte</h2>
            </div>
            <div className="teacher-library-actions">
              <button
                className="teacher-secondary-button"
                disabled={!items.length}
                onClick={exportContent}
                type="button"
              >
                <Download /> Text exportieren
              </button>
              <label className="teacher-secondary-button teacher-import-button">
                <Upload /> Text importieren
                <input
                  accept="application/json,.json"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void importContent(file);
                  }}
                  ref={importInputRef}
                  type="file"
                />
              </label>
              <button
                className="teacher-secondary-button"
                onClick={() => {
                  setDraft(empty());
                  setAudio(null);
                }}
                type="button"
              >
                <Plus /> Neu
              </button>
            </div>
          </div>
          <p className="teacher-helper" role="note">
            Export und Import sind ein kostenloses Text-Backup zum Teilen.
            Menschliche Audioaufnahmen bleiben auf dem Gerät der Lehrkraft und
            werden nach dem Import erneut angehängt.
          </p>
          {items.length ? (
            <div className="teacher-items">
              {items.map((item) => (
                <article key={item.id}>
                  <div className="teacher-item-meta">
                    <span>{item.level}</span>
                    <span>{item.kind}</span>
                    <span
                      className={`teacher-status teacher-status-${item.status ?? "published"}`}
                    >
                      {publicationLabels[item.status ?? "published"]}
                    </span>
                    <span className="teacher-auto-link">
                      Automatisch verknüpft
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <HumanAudioPlayer compact contentId={item.id} />
                  <div className="teacher-item-actions">
                    <button
                      onClick={() => {
                        setDraft(item);
                        setAudio(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      type="button"
                    >
                      <Pencil /> Bearbeiten
                    </button>
                    <button
                      className="danger"
                      onClick={async () => {
                        await deleteTeacherContent(item.id);
                        await refresh();
                      }}
                      type="button"
                    >
                      <Trash2 /> Löschen
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="teacher-empty">
              <FileAudio />
              <h3>Noch keine Lehrkraft-Inhalte</h3>
              <p>Füge den ersten Inhalt mit einer echten Aufnahme hinzu.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
