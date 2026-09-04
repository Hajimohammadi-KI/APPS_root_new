import {
  articleReadings,
  articleReadingPolicy,
  extractionSections,
  isNlpCatchUpSession,
  nlpCourseMeta,
  nlpCourseSessions,
  nlpLabDefinition,
  sources,
  trackerRestartPlan,
} from "../plan-data";

const readingFolder =
  "D:\\Bachelor-Thesis\\02_Literature\\09_NLP_Course_2026_Reading_Order";
const readingsById = new Map<string, (typeof articleReadings)[number]>(
  articleReadings.map((reading) => [reading.id, reading]),
);

function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

type ReadingTier = "required" | "reuse" | "optional" | "standard";

function ReadingGroup({
  title,
  tier,
  readingIds,
}: {
  title: string;
  tier: ReadingTier;
  readingIds: readonly string[];
}) {
  if (readingIds.length === 0) return null;
  return (
    <section className={`nlp-reading-group ${tier}`}>
      <header>
        <h4>{title}</h4>
        <span>{readingIds.length} Quelle{readingIds.length === 1 ? "" : "n"}</span>
      </header>
      <div className="nlp-reading-list">
        {readingIds.map((readingId) => {
          const reading = readingsById.get(readingId);
          if (!reading) return null;
          const source = sources[reading.sourceId];
          const policy = articleReadingPolicy(reading);
          return (
            <article key={reading.id}>
              <header>
                <strong>
                  Reihenfolge C{String(reading.courseOrder).padStart(2, "0")} · Original O{String(reading.order).padStart(2, "0")}
                </strong>
                <span className={`reading-mode ${reading.mode.toLowerCase()}`}>{reading.mode}</span>
                {tier === "reuse" && <span className="reading-reuse">Nicht erneut lesen</span>}
                {reading.status === "in_progress" && <span className="reading-status">In Arbeit</span>}
              </header>
              <h4>{source?.label ?? reading.sourceId}</h4>
              <code>{reading.fileName}</code>
              <section className={`article-reading-assignment ${policy.scope}`}>
                <strong>{tier === "reuse" ? "Nicht erneut lesen" : policy.label}</strong>
                {tier === "reuse" ? (
                  <p>Vorhandene Notiz wiederverwenden; nur bei einer belegten Lücke in der aktuellen Wochenarbeit öffnen.</p>
                ) : policy.scope === "full" ? (
                  <p>{policy.requiredSections[0]}</p>
                ) : (
                  <ul>
                    {policy.requiredSections.map((section) => <li key={section}>{section}</li>)}
                  </ul>
                )}
                <small>Inhaltlicher Fokus: {reading.readingFocus.join(" · ")}</small>
              </section>
              <p>{reading.projectConnection}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function NlpLabPage() {
  return (
    <main className="nlp-lab-shell">
      <header className="nlp-lab-hero">
        <div>
          <p className="nlp-lab-eyebrow">Advanced Deep Learning · Lese- und Extraktionsplan</p>
          <h1>NLP Literature Lab</h1>
          <p className="nlp-lab-lead">
            Die Sitzungen 8 bis 10 bleiben reine Live-Beobachtung ohne
            Vorbereitung. Sitzungen 1 bis 7 sind archiviert und werden nur
            nach dem Wochenartefakt, höchstens einmal pro Woche und bei einem
            direkten Blocker optional geöffnet.
          </p>
        </div>
        <aside className="nlp-lab-time" aria-label="Kurszeit">
          <strong>17. Aug. – 7. Sept. 2026</strong>
          <span>Sa · Mo · Mi</span>
          <span>Berlin {nlpCourseMeta.berlinTime}</span>
          <span>Iran {nlpCourseMeta.iranTime}</span>
          <span>{nlpCourseMeta.instructor} · {nlpCourseMeta.platform}</span>
          <code>{readingFolder}</code>
        </aside>
      </header>

      <section className="nlp-lab-alert" aria-labelledby="course-scope-title">
        <strong id="course-scope-title">Loslassen statt automatisch nachholen</strong>
          <p>
          Vor der geschützten Pause zählen nur Anwesenheit bei den Live-Sitzungen
          8 bis 10 und danach maximal drei Notizzeilen. Vom {formatDate(trackerRestartPlan.protectedBreakStart)} bis
          {" "}{formatDate(trackerRestartPlan.protectedBreakEnd)} gibt es keine
          Pflichtarbeit. Ein verpasster Live-Termin wird vor dem Neustart nicht nachgeholt.
        </p>
      </section>

      <section className="nlp-lab-grid" aria-label="Problem und Projektgrenze">
        <article>
          <span>Ziel</span>
          <h2>Was du aus dem Kurs mitnimmst</h2>
          <p>{nlpLabDefinition.problem}</p>
          <p>{nlpLabDefinition.projectFit}</p>
        </article>
        <article>
          <span>Vertrag</span>
          <h2>Wie die Notizen in die Thesis passen</h2>
          <dl>
            <div><dt>Eingabe</dt><dd>{nlpLabDefinition.integrationContract.input}</dd></div>
            <div><dt>Ausgabe</dt><dd>{nlpLabDefinition.integrationContract.output}</dd></div>
            <div><dt>Grenze</dt><dd>{nlpLabDefinition.integrationContract.boundary}</dd></div>
          </dl>
        </article>
      </section>

      <section className="nlp-lab-boundaries">
        <article>
          <h2>Bis zum Neustart verbindlich</h2>
          <ul>{nlpLabDefinition.core.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h2>Optional / später</h2>
          <ul>{nlpLabDefinition.deferred.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className="nlp-lab-use-cases" aria-labelledby="extraction-title">
        <p className="nlp-lab-eyebrow">Ein einheitlicher Bogen pro Artikel</p>
        <h2 id="extraction-title">Sechs Extraktionsfelder</h2>
        <ol>{extractionSections.map((section) => <li key={section}>{section}</li>)}</ol>
      </section>

      <section className="nlp-lab-sessions" aria-labelledby="session-title">
        <p className="nlp-lab-eyebrow">Live beobachten · Material bleibt Referenz</p>
        <h2 id="session-title">Zehn Sitzungen ohne automatische Nachholpflicht</h2>
        <div className="nlp-session-list">
          {nlpCourseSessions.map((session) => {
            const catchUpSession = isNlpCatchUpSession(session.number);
            return (
            <article className={`nlp-session-card ${catchUpSession ? "catchup" : "live"}`} key={session.number}>
              <header>
                <span className="nlp-session-number">{session.number}</span>
                <div>
                  <time dateTime={session.date}>{formatDate(session.date)}</time>
                  <h3>{session.title}</h3>
                  <p>{session.berlinTime} Berlin · {session.iranTime} Iran</p>
                </div>
              </header>
              <div className="nlp-session-body">
                <div>
                  <h4>Projektfrage</h4><p>{session.projectQuestion}</p>
                  <h4>Anwendung</h4><p>{session.useCase}</p>
                  <h4>Projektbezug</h4><p>{session.projectConnection}</p>
                </div>
                <div>
                  <h4>Fokus beim Lesen</h4>
                  <ul>{session.readingFocus.map((item) => <li key={item}>{item}</li>)}</ul>
                  <h4>Extraktionsziel</h4><p>{session.extractionGoal}</p>
                </div>
              </div>
              <section className="nlp-session-guidance" lang="fa" dir="rtl">
                <div>
                  <h4>{catchUpSession ? "قانون مراجعه به این جلسه" : "حالت شرکت در جلسه"}</h4>
                  <p>{catchUpSession
                    ? "فعلاً رها شود. فقط پس از خروجی اصلی هفته و اگر مستقیماً Artefact، Test یا Evidence را مسدود کرده است، باز شود."
                    : "بدون پیش‌مطالعه فقط در جلسه حاضر می‌شوم. اگر جلسه را از دست دادم، پیش از شروع پلن آن را جبران نمی‌کنم."}</p>
                </div>
                <div>
                  <h4>{catchUpSession ? "حد مجاز" : "پس از حضور"}</h4>
                  <p>{catchUpSession
                    ? "حداکثر یک جلسه جبرانی در هر هفته؛ اگر مانع مستقیم نیست، برای همیشه کنار گذاشته شود."
                    : "حداکثر سه خط: چه فهمیدم؟ چه ارتباطی با پایان‌نامه دارد؟ چه سؤال بازی مانده است؟"}</p>
                </div>
              </section>
              <ReadingGroup
                title={catchUpSession ? "Archiviertes Referenzmaterial · keine Pflicht" : "Referenzmaterial · nicht vorab lesen"}
                tier="standard"
                readingIds={session.readingIds}
              />
              <footer>
                <strong>{catchUpSession ? "Keine aktuelle Aufgabe" : "Nur nach tatsächlicher Teilnahme"}</strong>
                <p>{catchUpSession
                  ? `Frühestens ab ${formatDate(trackerRestartPlan.mainPlanStart)} und nur nach Relevanzprüfung.`
                  : "Maximal drei Zeilen: verstanden · Thesis-Bezug · offene Frage."}</p>
              </footer>
            </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
