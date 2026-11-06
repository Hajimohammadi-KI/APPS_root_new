import type { ConversationTopic } from "./conversation-data";
import { type EvaluationResponse, formatTime } from "./studio-helpers";
import { StaffOnly } from "@/components/staff-access";

export function SessionEvidence({
  seconds,
  wordsPerMinute,
  wordCount,
  transcript,
  evaluation,
  pronunciation,
  attempts,
  selected,
  showCorrections,
  onToggleCorrections,
}: Readonly<{
  seconds: number;
  wordsPerMinute: number;
  wordCount: number;
  transcript: string;
  evaluation: EvaluationResponse | null;
  pronunciation: string;
  attempts: number;
  selected: ConversationTopic;
  showCorrections: boolean;
  onToggleCorrections: (checked: boolean) => void;
}>) {
  return (
    <details className="studio-results">
      <summary>Sitzungsdetails & Rückmeldung</summary>
      <aside className="evidence">
        <section className="panel feedback">
          <h3>Deine Aufnahme</h3>
          <div className="feedback-row f0">
            <span>◫</span>
            <div>
              <b>Sprechtempo</b>
              <small>
                {seconds
                  ? `${wordsPerMinute} Wörter pro Minute · Aufnahme: ${formatTime(seconds)}`
                  : "Noch keine Aufnahme"}
              </small>
            </div>
            <strong>{seconds ? `${wordsPerMinute}` : "—"}</strong>
          </div>
          <div className="feedback-row f1">
            <span>◉</span>
            <div>
              <b>Aussprache</b>
              <small>{pronunciation}</small>
            </div>
            <strong>—</strong>
          </div>
          <div className="feedback-row f2">
            <span>G</span>
            <div>
              <b>Grammatik</b>
              <small>
                {evaluation
                  ? `${evaluation.issues.length} Hinweise zur Überarbeitung`
                  : "Noch nicht geprüft"}
              </small>
            </div>
            <strong>{evaluation ? evaluation.issues.length : "—"}</strong>
          </div>
          <div className="feedback-row f3">
            <span>Aa</span>
            <div>
              <b>Transkript</b>
              <small>
                {transcript
                  ? "Dein Text zur Aufnahme"
                  : "Noch kein gesprochener Text"}
              </small>
            </div>
            <strong>{wordCount || "—"}</strong>
          </div>
          <StaffOnly>
            <div className="coach-tip">
              <b>☼ Evidence rule</b>
              <p>
                Keine Bewertung wird angezeigt, wenn der echte Anbieter nicht
                geantwortet hat.
              </p>
            </div>
          </StaffOnly>
        </section>
        <section className="panel">
          <h3>Deine Sitzung</h3>
          <div className="metrics">
            <div>
              <b>{attempts}</b>
              <span>Antworten</span>
            </div>
            <div>
              <b>{formatTime(seconds)}</b>
              <span>Sprechzeit</span>
            </div>
            <div>
              <b>{wordCount}</b>
              <span>Wörter</span>
            </div>
            <div>
              <b>{wordsPerMinute}</b>
              <span>Wörter/Min.</span>
            </div>
          </div>
          <p className="encourage">♙ {selected.goal}</p>
        </section>
        <section className="panel correction">
          <div className="panel-title">
            <h3>Grammatik-Rückmeldung</h3>
            <label>
              Anzeigen{" "}
              <input
                type="checkbox"
                checked={showCorrections}
                onChange={(event) => onToggleCorrections(event.target.checked)}
              />
            </label>
          </div>
          {showCorrections && (
            <>
              <div className="original">
                <b>Original</b>
                <p>{evaluation?.original ?? "—"}</p>
              </div>
              <div className="corrected">
                <b>
                  {evaluation?.issues.length ? "Überarbeitet" : "Rückmeldung"}
                </b>
                <p>{evaluation?.corrected ?? "—"}</p>
              </div>
            </>
          )}
        </section>
        <section className="panel goal">
          <span>{selected.level}</span>
          <h3>Heutiges Ziel</h3>
          <b>{selected.topic}</b>
          <p>{selected.goal}</p>
        </section>
      </aside>
    </details>
  );
}

export function StudioFooter({
  attempts,
  evaluation,
  audioUrl,
  savedId,
  goal,
  active,
  onSave,
  onContinue,
}: Readonly<{
  attempts: number;
  evaluation: EvaluationResponse | null;
  audioUrl: string | null;
  savedId: string | null;
  goal: string;
  active: number;
  onSave: () => void;
  onContinue: () => void;
}>) {
  return (
    <footer>
      <div className="turns">
        <b>
          {attempts} {attempts === 1 ? "attempt" : "attempts"}
        </b>
        <span>
          {evaluation ? "●" : "○"} {audioUrl ? "●" : "○"} {savedId ? "●" : "○"}
        </span>
      </div>
      <div className="footer-coach">
        <span>👩🏻</span>
        <p>
          <b>Ava</b>
          <br />
          {goal}
        </p>
      </div>
      <button className="save-lite" onClick={onSave}>
        ▯ Übung speichern
      </button>
      <button className="continue" onClick={onContinue}>
        {active === 6
          ? savedId
            ? "Session saved ✓"
            : "Save session"
          : "Weiter →"}
      </button>
    </footer>
  );
}
