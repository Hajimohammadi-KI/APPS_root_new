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
} from "@/features/components/human-audio-player";
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
  draft: "Draft",
  review: "Ready for review",
  published: "Published",
};

export default function TeacherPage() {
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
      setMessage("Enter a title before saving.");
      return;
    }
    const next: TeacherContentItem = {
      ...draft,
      title: draft.title.trim(),
      body: draft.body.trim(),
      // Existing content keeps its link; new lessons receive a stable internal
      // key so teachers never need to create or remember technical IDs.
      contextKey: ensureTeacherContextKey(draft),
      ...(audio ? { audioName: "human-recording", audioType: audio.type } : {}),
      updatedAt: new Date().toISOString(),
    };
    await saveTeacherContent(next, audio);
    setDraft(empty());
    setAudio(null);
    setMessage(`${publicationLabels[next.status ?? "draft"]} saved.`);
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
    link.download = "english-automaticity-teacher-content.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage(
      "Text content and publication states exported. Audio stays private on this device.",
    );
  }

  async function importContent(file: File) {
    try {
      const imported = parseTeacherContentPackage(
        JSON.parse(await file.text()),
      );
      // Importing keeps the curriculum links and publication state, while human
      // audio is deliberately re-attached on the receiving device.
      await Promise.all(imported.map((item) => saveTeacherContent(item)));
      setMessage(
        `${imported.length} text item${imported.length === 1 ? "" : "s"} imported. Re-attach human audio where needed.`,
      );
      await refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not import that file.",
      );
    } finally {
      if (importInputRef.current) importInputRef.current.value = "";
    }
  }

  return (
    <main className="teacher-page">
      <header className="teacher-hero">
        <a href="/" className="teacher-back">
          <ArrowLeft aria-hidden /> Back to app
        </a>
        <div>
          <span className="teacher-kicker">TEACHER AUTHORING</span>
          <h1>Manage lessons and human audio</h1>
          <p>
            Add or edit verbs, examples, exercises, and conversations. Uploaded
            or recorded human voices are used as the lesson audio; synthetic
            voices are not substituted.
          </p>
        </div>
      </header>
      <div className="teacher-layout">
        <section className="teacher-editor" aria-label="Content editor">
          <h2>
            {items.some((item) => item.id === draft.id)
              ? "Edit content"
              : "Add content"}
          </h2>
          <div className="teacher-grid">
            <label>
              Content type
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
                <option value="example">Example</option>
                <option value="exercise">Exercise</option>
                <option value="conversation">Conversation</option>
              </select>
            </label>
            <label>
              CEFR level
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
              Publication status
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
            Title
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="e.g. Present perfect – life experience"
            />
          </label>
          <p className="teacher-helper" role="note">
            The app creates the internal audio and content link automatically.
            No technical content key is required.
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
            <legend>Human-recorded audio</legend>
            <label className="teacher-upload">
              <Upload aria-hidden /> Choose audio file
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
            <Save aria-hidden /> Save content
          </button>
        </section>
        <section className="teacher-library">
          <div className="teacher-library-heading">
            <div>
              <span className="teacher-kicker">LIBRARY</span>
              <h2>Managed content</h2>
            </div>
            <div className="teacher-library-actions">
              <button
                className="teacher-secondary-button"
                disabled={!items.length}
                onClick={exportContent}
                type="button"
              >
                <Download aria-hidden /> Export text
              </button>
              <label className="teacher-secondary-button teacher-import-button">
                <Upload aria-hidden /> Import text
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
                <Plus aria-hidden /> New
              </button>
            </div>
          </div>
          <p className="teacher-helper" role="note">
            Export and import are a free text backup and sharing method. Human
            audio is kept on the teacher&apos;s device and must be attached
            again after importing.
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
                      Linked automatically
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
                      <Pencil aria-hidden /> Edit
                    </button>
                    <button
                      className="danger"
                      onClick={async () => {
                        await deleteTeacherContent(item.id);
                        if (draft.id === item.id) setDraft(empty());
                        await refresh();
                      }}
                      type="button"
                    >
                      <Trash2 aria-hidden /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="teacher-empty">
              <FileAudio aria-hidden />
              <h3>No teacher content yet</h3>
              <p>Add the first item and attach a real human recording.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
