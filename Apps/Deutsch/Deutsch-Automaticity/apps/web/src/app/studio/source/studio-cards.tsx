import { useEffect, useState, type RefObject } from "react";
import { AvaCoachAvatar } from "@/components/ava-coach-avatar";
import type { ConversationTopic, copy } from "./conversation-data";
import { formatTime, type RecordingState } from "./studio-helpers";
import {
  persianTaskSteps,
  readSupportLanguage,
  type SupportLanguage,
} from "@automaticity/learning-core/automaticity";

type StudioCopy = (typeof copy)["de"];

function useStudioSupportLanguage() {
  const [selected, setSelected] = useState<SupportLanguage | null>(null);
  useEffect(() => {
    const refresh = () => setSelected(readSupportLanguage("de"));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("automaticity:support-language", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("automaticity:support-language", refresh);
    };
  }, []);
  return selected;
}

export function Icon({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="icon" aria-hidden="true">
      {children}
    </span>
  );
}

export function DailyContextBar({
  activity,
  onPrevious,
  onReturn,
}: Readonly<{
  activity: number;
  onPrevious: () => void;
  onReturn: () => void;
}>) {
  return (
    <section
      className="daily-context-bar"
      aria-label="Navigation des heutigen Trainings"
    >
      <button onClick={onPrevious}>← Zurück</button>
      <strong>Heutige Sprechübung · Aktivität {activity}</strong>
      <button onClick={onReturn}>Zum heutigen Training</button>
    </section>
  );
}

export function StepPicker({
  stepLabels,
  active,
  onSelect,
  supportLanguage,
}: Readonly<{
  stepLabels: readonly string[];
  active: number;
  onSelect: (index: number) => void;
  supportLanguage?: SupportLanguage;
}>) {
  const selectedLanguage = useStudioSupportLanguage();
  const persian = (supportLanguage ?? selectedLanguage) === "fa";
  const labels = persian
    ? [
        "بشنو",
        "پاسخ بده",
        "دوباره گوش کن",
        "بررسی کن",
        "اصلاح کن",
        "بهتر کن",
        "ذخیره کن",
      ]
    : stepLabels;
  return (
    <details
      className="studio-step-picker"
      lang={persian ? "fa" : "de"}
      dir={persian ? "rtl" : "ltr"}
    >
      <summary>
        {persian ? "گام" : "Schritt"} {active + 1} / {stepLabels.length} ·{" "}
        {labels[active]}
      </summary>
      <div
        className="steps"
        aria-label={persian ? "گام‌های تمرین" : "Practice steps"}
      >
        {labels.map((step, index) => (
          <button
            key={step}
            onClick={() => onSelect(index)}
            className={active === index ? "active" : ""}
          >
            <b>{index + 1}</b>
            <Icon>{["♧", "♩", "▷", "▧", "✓", "↗", "▯"][index]}</Icon>
            <span>{step}</span>
          </button>
        ))}
      </div>
    </details>
  );
}

export function CoachCard({
  selected,
  onSpeak,
  supportLanguage,
}: Readonly<{
  selected: ConversationTopic;
  onSpeak: (text: string) => void;
  supportLanguage?: SupportLanguage;
}>) {
  const selectedLanguage = useStudioSupportLanguage();
  const persian = (supportLanguage ?? selectedLanguage) === "fa";
  return (
    <div className="coach-card">
      <div className="coach-topic">
        <h2>{selected.topic}</h2>
        <span>
          {selected.level} · {selected.category}
        </span>
      </div>
      <div className="coach-stage">
        <div className="coach-glow">
          <AvaCoachAvatar className="coach-avatar" />
        </div>
        <div className="coach-dialogue">
          <strong>Ava · Deine Sprechtrainerin</strong>
          <p>{selected.task}</p>
          <button
            className="prompt-audio"
            onClick={() => onSpeak(selected.task)}
          >
            ▶ {persian ? "متن سؤال را به آلمانی بشنو" : "Aufgabe anhören"}
          </button>
        </div>
      </div>
      {persian ? (
        <section className="studio-persian-task-guide" lang="fa" dir="rtl">
          <h3>این گفت‌وگو را چگونه انجام دهم؟</h3>
          <ol>
            {persianTaskSteps("de", "produce", "speaking", selected.task).map(
              (step) => (
                <li key={step}>{step}</li>
              ),
            )}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

export function RecordCard({
  text,
  recordingState,
  audioUrl,
  seconds,
  maxSeconds,
  message,
  voiceRecoveryAvailable,
  transcript,
  interimTranscript,
  evaluating,
  audioRef,
  transcriptRef,
  onContinueTyping,
  onReplay,
  onRecord,
  onPauseOrResume,
  onStop,
  onEvaluate,
  consentNeeded,
  onAllowOnline,
  onTranscriptChange,
}: Readonly<{
  text: StudioCopy;
  recordingState: RecordingState;
  audioUrl: string | null;
  seconds: number;
  maxSeconds: number;
  message: string | null;
  voiceRecoveryAvailable: boolean;
  transcript: string;
  interimTranscript: string;
  evaluating: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  transcriptRef: RefObject<HTMLTextAreaElement | null>;
  onContinueTyping: () => void;
  onReplay: () => void;
  onRecord: () => void;
  onPauseOrResume: () => void;
  onStop: () => void;
  onEvaluate: () => void;
  consentNeeded: boolean;
  onAllowOnline: () => void;
  onTranscriptChange: (value: string) => void;
}>) {
  return (
    <div className="record-card">
      <div
        className={`mic ${recordingState === "recording" ? "recording" : ""}`}
        aria-hidden="true"
      >
        ♩
      </div>
      <div className="record-main">
        <h3>
          {recordingState === "recording"
            ? text.recording
            : audioUrl
              ? text.recorded
              : text.record}
        </h3>
        <strong>
          {formatTime(seconds)} / {formatTime(maxSeconds)}
        </strong>
        <span className="ready">
          {recordingState === "paused"
            ? "Paused"
            : recordingState === "recording"
              ? "Listening"
              : text.ready}
        </span>
        <div
          className={`wave ${recordingState === "recording" ? "live" : ""}`}
          aria-hidden="true"
        >
          {Array.from({ length: 58 }, (_, index) => (
            <i key={index} style={{ height: `${8 + ((index * 17) % 30)}px` }} />
          ))}
        </div>
        {message && (
          <p className="mic-error" role="status">
            {message}
          </p>
        )}
        {voiceRecoveryAvailable && (
          <button
            className="prompt-audio"
            onClick={onContinueTyping}
            type="button"
          >
            Durch Tippen fortfahren
          </button>
        )}
        {audioUrl && (
          <audio
            ref={audioRef}
            className="audio-player"
            src={audioUrl}
            controls
            aria-label="Recorded answer"
          />
        )}
        <div className="record-controls">
          <button onClick={onReplay} disabled={!audioUrl}>
            ♧ Replay
          </button>
          <button onClick={onRecord} disabled={recordingState !== "idle"}>
            <em /> Record
          </button>
          <button
            onClick={onPauseOrResume}
            disabled={recordingState === "idle"}
          >
            Ⅱ {recordingState === "paused" ? "Resume" : "Pause"}
          </button>
          <button onClick={onStop} disabled={recordingState === "idle"}>
            ■ Stop
          </button>
          <button
            className="primary"
            disabled={
              evaluating || (!transcript.trim() && !interimTranscript.trim())
            }
            onClick={onEvaluate}
          >
            ✣ {evaluating ? text.evaluating : text.evaluate}
          </button>
        </div>
        {consentNeeded && (
          <button
            className="primary online-consent"
            onClick={onAllowOnline}
            type="button"
          >
            {text.allowOnline}
          </button>
        )}
      </div>
      <div className="levels" aria-hidden="true">
        ▂▄▆█
      </div>
      <label className="transcript">
        <b>{text.transcript}</b>
        <textarea
          ref={transcriptRef}
          value={`${transcript}${interimTranscript ? ` ${interimTranscript}` : ""}`}
          placeholder={text.transcriptPlaceholder}
          onChange={(event) => onTranscriptChange(event.target.value)}
        />
      </label>
    </div>
  );
}

export function DailyCompleteDialog({
  onReturn,
  onPractiseAgain,
  onReviewMistakes,
}: Readonly<{
  onReturn: () => void;
  onPractiseAgain: () => void;
  onReviewMistakes: () => void;
}>) {
  return (
    <div
      className="daily-complete-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-complete-title"
    >
      <section className="daily-complete-card">
        <h2 id="daily-complete-title">
          Die heutige Sprechübung ist abgeschlossen.
        </h2>
        <p>
          Aufnahme, Transkript, Korrekturen und Ergebnis wurden gespeichert.
        </p>
        <button className="primary" onClick={onReturn}>
          OK · Zum heutigen Training
        </button>
        <button onClick={onPractiseAgain}>Noch einmal üben</button>
        <button onClick={onReviewMistakes}>Meine Fehler ansehen</button>
      </section>
    </div>
  );
}
