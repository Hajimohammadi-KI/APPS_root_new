import {
  spokenPracticeEvidence,
  describeRecording,
  type WaveformDescription,
} from "@automaticity/learning-core/speech";
import { useEffect, useRef, useState } from "react";
import {
  appendEvidenceInvalidationToStorage,
  appendLearningEvidenceBundleToStorage,
  buildAttemptVerticalSlice,
} from "@automaticity/learning-core";
import {
  copy,
  type ConversationTopic,
  type StudioLanguage,
} from "./conversation-data";
import { saveConversationSession } from "./conversation-storage";
import {
  mayApplyTranscriptionDraft,
  prepareLocalTranscriptionSamples,
} from "./local-transcription-audio";
import {
  countWords,
  currentSessionMinutes,
  type EvaluationResponse,
  isEvaluationResponse,
  type RecordingState,
  studioAudioToStore,
} from "./studio-helpers";

interface RecorderOptions {
  readonly language: StudioLanguage;
  readonly selected: ConversationTopic;
  readonly maxSeconds: number;
  readonly storeAudio: boolean;
  readonly onlineConsent: boolean;
  readonly variant: string;
  readonly onRecordingStarted: () => void;
  readonly onRecorded: () => void;
  readonly onEvaluated: () => void;
  readonly onSaved: (evaluation: EvaluationResponse) => void;
}

function providerError(payload: unknown): string | null {
  return typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
    ? payload.error
    : null;
}

/** Microphone, live transcript, LanguageTool evaluation and local saving for one studio session. */
export function useStudioRecorder({
  language,
  selected,
  maxSeconds,
  storeAudio,
  onlineConsent,
  variant,
  onRecordingStarted,
  onRecorded,
  onEvaluated,
  onSaved,
}: RecorderOptions) {
  const text = copy[language];
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [draftTranscript, setDraftTranscript] = useState("");
  const [draftPending, setDraftPending] = useState(false);
  const [transcriptReviewRequired, setTranscriptReviewRequired] =
    useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState<
    "idle" | "preparing" | "loading" | "transcribing" | "error"
  >("idle");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingVersion, setRecordingVersion] = useState(0);
  const [starting, setStarting] = useState(false);
  const [hasAudioBlob, setHasAudioBlob] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);
  const [baseline, setBaseline] = useState<EvaluationResponse | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [voiceRecoveryAvailable, setVoiceRecoveryAvailable] = useState(false);
  const [consentNeeded, setConsentNeeded] = useState(false);
  const recognitionEvidence = null;
  const [waveform, setWaveform] = useState<WaveformDescription | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);
  const transcriptRef = useRef<HTMLTextAreaElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const attemptIdRef = useRef<string | null>(null);
  const savedEvidenceIdRef = useRef<string | null>(null);
  const captureGenerationRef = useRef(0);
  const startBusyRef = useRef(false);
  const evaluationRequestRef = useRef(0);
  const manualRevisionRef = useRef(0);
  const confirmedTranscriptRef = useRef("");
  const transcriptionRequestRef = useRef(0);
  const transcriptionWorkerRef = useRef<Worker | null>(null);
  const transcriptionTimerRef = useRef<number | null>(null);

  const wordCount = countWords(transcript);
  const wordsPerMinute =
    seconds > 0 ? Math.round(wordCount / (seconds / 60)) : 0;

  useEffect(() => {
    if (recordingState !== "recording") return;
    const timer = window.setInterval(() => {
      setSeconds((current) => Math.min(current + 1, maxSeconds));
    }, 1_000);
    return () => window.clearInterval(timer);
  }, [maxSeconds, recordingState]);

  useEffect(() => {
    if (recordingState !== "recording" || seconds < maxSeconds) return;
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
  }, [maxSeconds, recordingState, seconds]);

  useEffect(
    () => () => {
      captureGenerationRef.current += 1;
      transcriptionRequestRef.current += 1;
      transcriptionWorkerRef.current?.terminate();
      if (transcriptionTimerRef.current !== null)
        window.clearTimeout(transcriptionTimerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      window.speechSynthesis?.cancel();
    },
    [],
  );

  function cancelLocalTranscription() {
    transcriptionRequestRef.current += 1;
    transcriptionWorkerRef.current?.terminate();
    transcriptionWorkerRef.current = null;
    if (transcriptionTimerRef.current !== null) {
      window.clearTimeout(transcriptionTimerRef.current);
      transcriptionTimerRef.current = null;
    }
    setTranscriptionStatus("idle");
  }

  async function transcribeRecording(blob: Blob, generation: number) {
    if (language !== "en" || !blob.size) return;
    const request = ++transcriptionRequestRef.current;
    const revision = manualRevisionRef.current;
    const current = () =>
      generation === captureGenerationRef.current &&
      request === transcriptionRequestRef.current;
    if (confirmedTranscriptRef.current.trim()) {
      setMessage(
        "Your earlier transcript was kept. Choose “Clear transcript for this recording” to make a new offline suggestion.",
      );
      return;
    }
    setTranscriptionStatus("preparing");
    try {
      const samples = await prepareLocalTranscriptionSamples(blob);
      if (!current()) return;
      if (
        !mayApplyTranscriptionDraft({
          requestRevision: revision,
          currentRevision: manualRevisionRef.current,
          confirmedTranscript: confirmedTranscriptRef.current,
        })
      ) {
        setTranscriptionStatus("idle");
        if (confirmedTranscriptRef.current.trim())
          setMessage(
            "Your own transcript was kept. Choose “Clear transcript for this recording” to make a new offline suggestion.",
          );
        return;
      }
      const worker = new Worker("/local-transcription/worker.js", {
        type: "module",
      });
      transcriptionWorkerRef.current = worker;
      const requestId = crypto.randomUUID();
      const finish = () => {
        worker.terminate();
        if (transcriptionWorkerRef.current === worker)
          transcriptionWorkerRef.current = null;
        if (transcriptionTimerRef.current !== null) {
          window.clearTimeout(transcriptionTimerRef.current);
          transcriptionTimerRef.current = null;
        }
      };
      const fail = (reason: string) => {
        if (!current()) return;
        finish();
        setTranscriptionStatus("error");
        setMessage(
          `${reason} Your recording is still available; you can type the words yourself.`,
        );
      };
      worker.onmessage = (event: MessageEvent<unknown>) => {
        if (!current()) return;
        const data = event.data;
        if (
          typeof data !== "object" ||
          data === null ||
          !("requestId" in data) ||
          data.requestId !== requestId ||
          !("type" in data)
        )
          return;
        if (data.type === "progress") {
          if ("stage" in data && data.stage === "loading")
            setTranscriptionStatus("loading");
          if ("stage" in data && data.stage === "transcribing")
            setTranscriptionStatus("transcribing");
          return;
        }
        if (data.type === "error") {
          fail("Offline transcription could not finish.");
          return;
        }
        if (data.type !== "result") return;
        finish();
        if (
          !("result" in data) ||
          typeof data.result !== "object" ||
          data.result === null ||
          !("text" in data.result) ||
          typeof data.result.text !== "string" ||
          !("source" in data.result) ||
          data.result.source !== "local_whisper" ||
          !("verified" in data.result) ||
          data.result.verified !== false
        ) {
          fail("Offline transcription returned an invalid result.");
          return;
        }
        const suggested = data.result.text.trim();
        if (!suggested) {
          fail("Offline transcription did not hear clear words.");
          return;
        }
        if (
          mayApplyTranscriptionDraft({
            requestRevision: revision,
            currentRevision: manualRevisionRef.current,
            confirmedTranscript: confirmedTranscriptRef.current,
          })
        ) {
          setDraftTranscript(suggested);
          setDraftPending(true);
          setTranscriptionStatus("idle");
          setMessage(null);
        } else {
          setTranscriptionStatus("idle");
        }
      };
      worker.onerror = () =>
        fail("Offline transcription failed in this browser.");
      transcriptionTimerRef.current = window.setTimeout(
        () => fail("Offline transcription took too long."),
        300_000,
      );
      worker.postMessage(
        { type: "transcribe", requestId, samples, sampleRate: 16_000 },
        [samples.buffer],
      );
    } catch (error) {
      if (!current()) return;
      cancelLocalTranscription();
      setTranscriptionStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Offline transcription is unavailable. You can type the words yourself.",
      );
    }
  }

  useEffect(
    () => () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    },
    [audioUrl],
  );

  function resetSession(clearBaseline = true) {
    captureGenerationRef.current += 1;
    cancelLocalTranscription();
    manualRevisionRef.current += 1;
    confirmedTranscriptRef.current = "";
    setDraftTranscript("");
    setDraftPending(false);
    setTranscriptReviewRequired(false);
    evaluationRequestRef.current += 1;
    setEvaluating(false);
    startBusyRef.current = false;
    setStarting(false);
    setRecordingVersion((current) => current + 1);
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setRecordingState("idle");
    setWaveform(null);
    setTranscript("");
    setInterimTranscript("");
    setEvaluation(null);
    setConsentNeeded(false);
    if (clearBaseline) setBaseline(null);
    setSavedId(null);
    setSeconds(0);
    setMessage(null);
    audioBlobRef.current = null;
    setAudioBlob(null);
    attemptIdRef.current = null;
    savedEvidenceIdRef.current = null;
    setHasAudioBlob(false);
    setAudioUrl(null);
    window.speechSynthesis?.cancel();
  }

  function editTranscript(value: string) {
    manualRevisionRef.current += 1;
    if (!draftPending) cancelLocalTranscription();
    evaluationRequestRef.current += 1;
    setEvaluating(false);
    if (draftPending) setDraftTranscript(value);
    else {
      confirmedTranscriptRef.current = value;
      setTranscript(value);
      setTranscriptReviewRequired(false);
    }
    setInterimTranscript("");
    setEvaluation(null);
    setSavedId(null);
    setConsentNeeded(false);
  }

  function confirmTranscript() {
    if (transcriptReviewRequired && !draftPending && transcript.trim()) {
      setTranscriptReviewRequired(false);
      setMessage("Transcript confirmed for this recording.");
      return;
    }
    if (!draftPending || !draftTranscript.trim()) return;
    manualRevisionRef.current += 1;
    confirmedTranscriptRef.current = draftTranscript.trim();
    setTranscript(draftTranscript.trim());
    setDraftTranscript("");
    setDraftPending(false);
    setTranscriptReviewRequired(false);
    setMessage(
      "Transcript confirmed. Grammar feedback uses the text you reviewed, not a pronunciation score.",
    );
  }

  function clearTranscriptForRecording() {
    if (!audioBlobRef.current || !confirmedTranscriptRef.current.trim()) return;
    manualRevisionRef.current += 1;
    cancelLocalTranscription();
    confirmedTranscriptRef.current = "";
    setTranscript("");
    setDraftTranscript("");
    setDraftPending(false);
    setTranscriptReviewRequired(false);
    setInterimTranscript("");
    evaluationRequestRef.current += 1;
    setEvaluating(false);
    setEvaluation(null);
    setSavedId(null);
    setConsentNeeded(false);
    setMessage(null);
    void transcribeRecording(
      audioBlobRef.current,
      captureGenerationRef.current,
    );
  }

  async function startRecording({
    keepBaseline = false,
  }: { keepBaseline?: boolean } = {}) {
    if (startBusyRef.current || recordingState !== "idle") return;
    startBusyRef.current = true;
    setStarting(true);
    const generation = ++captureGenerationRef.current;
    cancelLocalTranscription();
    setDraftTranscript("");
    setDraftPending(false);
    setTranscriptReviewRequired(Boolean(confirmedTranscriptRef.current.trim()));
    evaluationRequestRef.current += 1;
    setEvaluating(false);
    setRecordingVersion((current) => current + 1);
    audioBlobRef.current = null;
    setAudioBlob(null);
    setHasAudioBlob(false);
    setAudioUrl(null);
    setWaveform(null);
    setMessage(null);
    setConsentNeeded(false);
    setVoiceRecoveryAvailable(false);
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setMessage(
        language === "de"
          ? "Audioaufnahme wird von diesem Browser nicht unterstützt."
          : "Audio recording is not supported in this browser.",
      );
      setVoiceRecoveryAvailable(true);
      startBusyRef.current = false;
      setStarting(false);
      return;
    }
    try {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      if (generation !== captureGenerationRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      const nextAttemptId = crypto.randomUUID();
      if (savedEvidenceIdRef.current) {
        appendEvidenceInvalidationToStorage(window.localStorage, {
          evidenceId: savedEvidenceIdRef.current,
          occurredAt: new Date().toISOString(),
          supersedingResponseId: `${nextAttemptId}:response`,
        });
      }
      attemptIdRef.current = nextAttemptId;
      savedEvidenceIdRef.current = null;
      streamRef.current = stream;
      const chunks: Blob[] = [];
      audioBlobRef.current = null;
      setHasAudioBlob(false);
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        if (generation !== captureGenerationRef.current) return;
        const blob = new Blob(chunks, {
          type: recorder.mimeType || "audio/webm",
        });
        audioBlobRef.current = blob;
        setAudioBlob(blob.size > 0 ? blob : null);
        void describeRecording(blob)
          .then((description) => {
            if (audioBlobRef.current === blob) setWaveform(description);
          })
          .catch(() => {
            if (audioBlobRef.current === blob) setWaveform(null);
          });
        setHasAudioBlob(blob.size > 0);
        setAudioUrl(blob.size > 0 ? URL.createObjectURL(blob) : null);
        stream.getTracks().forEach((track) => track.stop());
        setRecordingState("idle");
        onRecorded();
        if (blob.size > 0) void transcribeRecording(blob, generation);
      };

      setInterimTranscript("");
      setEvaluation(null);
      if (!keepBaseline) setBaseline(null);
      setSavedId(null);
      setSeconds(0);
      setAudioUrl(null);

      setMessage(
        "Recording stays on this device. After you stop, the local model will suggest editable text.",
      );
      recorder.start(250);
      setRecordingState("recording");
      onRecordingStarted();
    } catch (error) {
      if (generation !== captureGenerationRef.current) return;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      const blocked =
        error instanceof DOMException &&
        ["NotAllowedError", "SecurityError"].includes(error.name);
      setMessage(
        blocked
          ? language === "de"
            ? "Mikrofonzugriff wurde blockiert. Erlaube ihn im Browser und versuche es erneut."
            : "Microphone access was blocked. Allow it in your browser and try again."
          : language === "de"
            ? "Das Mikrofon konnte nicht gestartet werden."
            : "The microphone could not be started.",
      );
      setVoiceRecoveryAvailable(true);
    } finally {
      if (generation === captureGenerationRef.current) {
        startBusyRef.current = false;
        setStarting(false);
      }
    }
  }

  function pauseOrResume() {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") return;
    if (recorder.state === "recording") {
      recorder.pause();
      const reviewedTranscript = `${transcript} ${interimTranscript}`.trim();
      setTranscript(reviewedTranscript);
      setInterimTranscript("");
      setRecordingState("paused");
      return;
    }
    recorder.resume();
    setRecordingState("recording");
  }

  function finishRecording() {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    setRecordingState("idle");
  }

  /** `consented` is true only when called from the in-place "allow online checks" action. */
  async function evaluateTranscript({ consented = false } = {}) {
    if (draftPending || transcriptReviewRequired) {
      setMessage(
        "Review and confirm the transcript for this recording before checking its grammar.",
      );
      return;
    }
    const reviewedTranscript = `${transcript} ${interimTranscript}`.trim();
    if (!reviewedTranscript) {
      setMessage(
        language === "de"
          ? "Prüfe oder ergänze zuerst dein Transkript."
          : "Review or enter your transcript first.",
      );
      return;
    }
    setTranscript(reviewedTranscript);
    confirmedTranscriptRef.current = reviewedTranscript;
    setInterimTranscript("");
    if (!onlineConsent && !consented) {
      setConsentNeeded(true);
      setMessage(text.consentNotice);
      return;
    }
    setConsentNeeded(false);
    const generation = captureGenerationRef.current;
    const requestId = ++evaluationRequestRef.current;
    const isCurrent = () =>
      generation === captureGenerationRef.current &&
      requestId === evaluationRequestRef.current;
    setEvaluating(true);
    setMessage(null);
    try {
      const response = await fetch("/api/conversation/evaluate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: reviewedTranscript,
          language,
          variant,
          consent: true,
        }),
      });
      const payload: unknown = await response.json();
      if (!isCurrent()) return;
      if (response.status === 429 && providerError(payload)) {
        setEvaluation(null);
        setMessage(providerError(payload));
        return;
      }
      if (!response.ok || !isEvaluationResponse(payload))
        throw new Error("Provider response was unavailable or invalid.");
      setEvaluation(payload);
      setAttempts((current) => current + 1);
      onEvaluated();
    } catch {
      if (!isCurrent()) return;
      setEvaluation(null);
      setMessage(text.providerUnavailable);
    } finally {
      if (isCurrent()) setEvaluating(false);
    }
  }

  async function practiceImprovedVersion() {
    if (!evaluation) return;
    setBaseline(evaluation);
    await startRecording({ keepBaseline: true });
  }

  async function saveSession() {
    if (!evaluation || !audioBlobRef.current) {
      setMessage(
        language === "de"
          ? "Für das Speichern werden Aufnahme und echte Auswertung benötigt."
          : "A recording and a real evaluation are required before saving.",
      );
      return;
    }
    const id = attemptIdRef.current ?? crypto.randomUUID();
    const occurredAt = new Date().toISOString();
    const stored = studioAudioToStore(audioBlobRef.current, storeAudio, id);
    try {
      await saveConversationSession({
        id,
        createdAt: occurredAt,
        language,
        topicId: selected.id,
        transcript: evaluation.original,
        corrected: evaluation.corrected,
        durationSeconds: seconds,
        wordCount,
        wordsPerMinute,
        provider: evaluation.provider,
        checkedAt: evaluation.checkedAt,
        issues: evaluation.issues,
        audio: stored.audio,
      });
      const bundle = buildAttemptVerticalSlice({
        attemptId: id,
        occurredAt,
        language,
        cefrLevel: selected.level,
        contentVersion: selected.contentVersion,
        topic: selected.topic,
        targetForm: selected.targetForm,
        prompt: selected.task,
        mode: "speaking",
        inputText: evaluation.original,
        correctedText: evaluation.corrected,
        ...spokenPracticeEvidence(),
        latencyMs: seconds * 1_000,
        assessedBy: "online",
        sessionMinutes: currentSessionMinutes(),
        audioCaptured: audioBlobRef.current.size > 0,
        ...(stored.audioReferenceId
          ? { audioReferenceId: stored.audioReferenceId }
          : {}),
        sourceId: selected.sourceId,
      });
      appendLearningEvidenceBundleToStorage(window.localStorage, bundle);
      savedEvidenceIdRef.current = bundle.evidence.id;
      setSavedId(id);
      setMessage(stored.audio ? text.saved : text.savedWithoutAudio);
      onSaved(evaluation);
    } catch {
      setMessage(
        language === "de"
          ? "Die Sitzung konnte in diesem Browser nicht gespeichert werden."
          : "The session could not be saved in this browser.",
      );
    }
  }

  return {
    recordingState,
    seconds,
    transcript,
    displayTranscript: draftPending ? draftTranscript : transcript,
    draftPending,
    transcriptReviewRequired,
    transcriptionStatus,
    interimTranscript,
    audioUrl,
    audioBlob,
    recordingVersion,
    starting,
    hasAudioBlob,
    evaluation,
    baseline,
    evaluating,
    savedId,
    message,
    attempts,
    voiceRecoveryAvailable,
    consentNeeded,
    recognitionEvidence,
    waveform,
    wordCount,
    wordsPerMinute,
    transcriptRef,
    audioRef,
    setMessage,
    resetSession,
    editTranscript,
    confirmTranscript,
    clearTranscriptForRecording,
    startRecording,
    pauseOrResume,
    finishRecording,
    evaluateTranscript,
    practiceImprovedVersion,
    saveSession,
  };
}

export type StudioRecorder = ReturnType<typeof useStudioRecorder>;
