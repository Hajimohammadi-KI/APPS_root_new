import { useEffect, useState, type RefObject } from "react";
import { AvaCoachAvatar } from "@/features/components/ava-coach-avatar";
import type {
  ConversationTopic,
  StudioLanguage,
  copy,
} from "./conversation-data";
import {
  formatTime,
  type IntegratedContext,
  type RecordingState,
} from "./studio-helpers";
import {
  persianTaskSteps,
  readSupportLanguage,
  type SupportLanguage,
} from "@automaticity/learning-core/automaticity";

type StudioCopy = (typeof copy)[StudioLanguage];

function useStudioSupportLanguage(language: StudioLanguage) {
  const [selected, setSelected] = useState<SupportLanguage | null>(null);
  useEffect(() => {
    const refresh = () => setSelected(readSupportLanguage(language));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("automaticity:support-language", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("automaticity:support-language", refresh);
    };
  }, [language]);
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
      aria-label="Today's practice navigation"
    >
      <button onClick={onPrevious}>← Previous</button>
      <strong>Today’s speaking practice · activity {activity}</strong>
      <button onClick={onReturn}>Return to Today’s Practice</button>
    </section>
  );
}

export function IntegratedContextBar({
  context,
  onReturn,
}: Readonly<{ context: IntegratedContext; onReturn: () => void }>) {
  return (
    <section
      className="daily-context-bar"
      aria-label="Integrated Skills navigation"
    >
      <button onClick={onReturn}>← Integrated Skills</button>
      <strong>
        {context.level} · Unit {context.number} · {context.title}
      </strong>
      <button onClick={onReturn}>Return to lesson</button>
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
  const selectedLanguage = useStudioSupportLanguage("en");
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
      lang={persian ? "fa" : "en"}
      dir={persian ? "rtl" : "ltr"}
    >
      <summary>
        {persian ? "گام" : "Step"} {active + 1} / {stepLabels.length} ·{" "}
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
  language,
  selected,
  matchedChunkTexts,
  onSpeak,
  supportLanguage,
}: Readonly<{
  language: StudioLanguage;
  selected: ConversationTopic;
  matchedChunkTexts: ReadonlySet<string>;
  onSpeak: (text: string) => void;
  supportLanguage?: SupportLanguage;
}>) {
  const selectedLanguage = useStudioSupportLanguage(language);
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
          <strong>
            Ava ·{" "}
            {language === "de"
              ? "Deine Sprechtrainerin"
              : "Your speaking coach"}
          </strong>
          <p>{selected.task}</p>
          <button
            className="prompt-audio"
            onClick={() => onSpeak(selected.task)}
          >
            ▶{" "}
            {persian
              ? `متن سؤال را به ${language === "de" ? "آلمانی" : "انگلیسی"} بشنو`
              : language === "de"
                ? "Aufgabe anhören"
                : "Hear prompt"}
          </button>
        </div>
      </div>
      {persian ? (
        <section className="studio-persian-task-guide" lang="fa" dir="rtl">
          <h3>این گفت‌وگو را چگونه انجام دهم؟</h3>
          <ol>
            {persianTaskSteps(
              language,
              "produce",
              "speaking",
              selected.task,
            ).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}
      <section
        className="spoken-chunk-bank"
        aria-labelledby="spoken-chunk-title"
      >
        <div className="spoken-chunk-heading">
          <div>
            <small>NATURAL SPOKEN ENGLISH</small>
            <h3 id="spoken-chunk-title">
              {persian
                ? "پاسخت را با عبارت‌های کمکی بساز"
                : "Build your answer with chunks"}
            </h3>
            <p>
              {persian
                ? "دست‌کم دو عبارت را انتخاب کن و پایان آن‌ها را برای موضوع خودت تغییر بده. مثال‌ها فقط نمونه‌اند؛ آن‌ها را حفظ نکن."
                : "Choose at least two and adapt the ending to this topic. The examples are models, not lines to memorize."}
            </p>
          </div>
          <strong aria-live="polite">
            {matchedChunkTexts.size}/{selected.spokenChunks.length} used
          </strong>
        </div>
        <ul className="spoken-chunk-list">
          {selected.spokenChunks.map((chunk) => {
            const used = matchedChunkTexts.has(chunk.text);
            return (
              <li key={chunk.text} data-used={used}>
                <div>
                  <b>{chunk.text}</b>
                  <small>{chunk.purpose}</small>
                  <p>
                    <span>Example:</span> {chunk.example}
                  </p>
                </div>
                <div className="spoken-chunk-actions">
                  <button
                    type="button"
                    onClick={() => onSpeak(chunk.example)}
                    aria-label={`Hear ${chunk.text}`}
                  >
                    ▶ Hear
                  </button>
                  {used && <span>✓ Used</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export function RecordCard({
  text,
  recordingState,
  starting,
  audioUrl,
  seconds,
  maxSeconds,
  message,
  voiceRecoveryAvailable,
  transcript,
  displayTranscript,
  draftPending,
  transcriptReviewRequired,
  transcriptionStatus,
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
  onConfirmTranscript,
  onClearTranscriptForRecording,
}: Readonly<{
  text: StudioCopy;
  recordingState: RecordingState;
  starting: boolean;
  audioUrl: string | null;
  seconds: number;
  maxSeconds: number;
  message: string | null;
  voiceRecoveryAvailable: boolean;
  transcript: string;
  displayTranscript: string;
  draftPending: boolean;
  transcriptReviewRequired: boolean;
  transcriptionStatus:
    "idle" | "preparing" | "loading" | "transcribing" | "error";
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
  onConfirmTranscript: () => void;
  onClearTranscriptForRecording: () => void;
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
        <span role="status" aria-live="polite">
          {draftPending
            ? "Transcript suggestion ready. Review and confirm."
            : transcriptReviewRequired
              ? "Previous transcript retained. Review and confirm it for this recording."
              : transcriptionStatus === "preparing"
                ? "Preparing your recording for offline transcription…"
                : transcriptionStatus === "loading"
                  ? "Loading the local speech model… The first download is about 110 MB. You can type the words yourself if this device cannot load it."
                  : transcriptionStatus === "transcribing"
                    ? "Transcribing on this device…"
                    : ""}
        </span>
        {voiceRecoveryAvailable && (
          <button
            className="prompt-audio"
            onClick={onContinueTyping}
            type="button"
          >
            Continue by typing
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
          <button
            onClick={onRecord}
            disabled={starting || recordingState !== "idle"}
          >
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
              evaluating ||
              draftPending ||
              transcriptReviewRequired ||
              (!transcript.trim() && !interimTranscript.trim())
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
          aria-describedby="studio-transcript-basis"
          value={`${displayTranscript}${interimTranscript ? ` ${interimTranscript}` : ""}`}
          placeholder={text.transcriptPlaceholder}
          onChange={(event) => onTranscriptChange(event.target.value)}
        />
      </label>
      <p id="studio-transcript-basis" style={{ gridColumn: "1 / -1" }}>
        {draftPending
          ? "The local model suggested these words. It can be wrong. Compare them with your recording, edit if needed, then confirm. This is not a pronunciation grade."
          : "After recording, a local model suggests editable words. You can also type them yourself. Grammar feedback uses only the text you confirm or type; the recording stays on this device."}
      </p>
      {draftPending && (
        <button
          className="primary"
          type="button"
          onClick={onConfirmTranscript}
          disabled={!displayTranscript.trim()}
          style={{ gridColumn: "1 / -1" }}
        >
          Confirm transcript
        </button>
      )}
      {transcriptReviewRequired && !draftPending && transcript.trim() && (
        <button
          className="primary"
          type="button"
          onClick={onConfirmTranscript}
          style={{ gridColumn: "1 / -1" }}
        >
          Confirm transcript for this recording
        </button>
      )}
      {audioUrl && transcript.trim() && !draftPending && (
        <button
          type="button"
          onClick={onClearTranscriptForRecording}
          style={{ gridColumn: "1 / -1" }}
        >
          Clear transcript for this recording
        </button>
      )}
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
          Today’s conversation practice is complete.
        </h2>
        <p>Your recording, transcript, corrections, and result were saved.</p>
        <button className="primary" onClick={onReturn}>
          OK · Return to Today’s Practice
        </button>
        <button onClick={onPractiseAgain}>Practise again</button>
        <button onClick={onReviewMistakes}>Review my mistakes</button>
      </section>
    </div>
  );
}
