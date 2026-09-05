import { validDate, type Language, type Modality } from "./contracts";
import { reduceAutomaticityEvents } from "./evidence";
export interface ProspectiveConsent {
  id: string;
  at: string;
  language: Language;
  purpose: "fsrs_shadow";
}
export interface ExplicitRecallRating {
  id: string;
  attemptId: string;
  assessmentId: string;
  consentId: string;
  rating: 1 | 2 | 3 | 4;
  recordedAt: string;
}
export interface QualifiedRecall {
  eventId: string;
  attemptId: string;
  assessmentId: string;
  responseSha256: string;
  cardId: string;
  language: Language;
  modality: Modality;
  reviewedAt: string;
  rating: 1 | 2 | 3 | 4;
}
/** Explicit ratings plus currently valid independent outcomes; never aggregate history. */
export function qualifyProspectiveReviews(
  events: readonly unknown[],
  language: Language,
  now: string,
  consent: ProspectiveConsent | null,
  ratings: readonly ExplicitRecallRating[],
): { eligible: QualifiedRecall[]; excluded: { id: string; reason: string }[] } {
  const excluded: { id: string; reason: string }[] = [];
  if (
    !consent ||
    consent.language !== language ||
    consent.purpose !== "fsrs_shadow" ||
    !consent.id.trim() ||
    !validDate(consent.at) ||
    !validDate(now) ||
    Date.parse(consent.at) > Date.parse(now)
  )
    return {
      eligible: [],
      excluded: ratings.map((row) => ({
        id: row.id,
        reason: "No valid prospective consent",
      })),
    };
  const rows = reduceAutomaticityEvents(events, language, now).attempts;
  const unique = new Map<string, ExplicitRecallRating>(),
    conflicts = new Set<string>();
  for (const rating of ratings) {
    const old = unique.get(rating.attemptId);
    if (old && JSON.stringify(old) !== JSON.stringify(rating))
      conflicts.add(rating.attemptId);
    else unique.set(rating.attemptId, rating);
  }
  const eligible: QualifiedRecall[] = [];
  for (const rating of unique.values()) {
    const row = rows.find((row) => row.attempt.id === rating.attemptId);
    let reason: string | null = null;
    if (conflicts.has(rating.attemptId))
      reason = "Conflicting ratings require review";
    else if (
      !rating.id?.trim() ||
      rating.consentId !== consent.id ||
      ![1, 2, 3, 4].includes(rating.rating) ||
      !validDate(rating.recordedAt) ||
      Date.parse(rating.recordedAt) > Date.parse(now)
    )
      reason = "Invalid explicit rating";
    else if (
      !row?.eligibleForMastery ||
      !row.delayed ||
      !row.assessment ||
      row.assessment.id !== rating.assessmentId
    )
      reason = "No current qualified delayed outcome";
    else if (
      Date.parse(row.attempt.at) < Date.parse(consent.at) ||
      Date.parse(rating.recordedAt) < Date.parse(row.assessment.at)
    )
      reason = "Rating is not prospective";
    else if ((rating.rating === 1) === row.success)
      reason = "Recall rating conflicts with the reviewed outcome";
    if (reason || !row?.assessment) {
      excluded.push({ id: rating.id, reason: reason ?? "Missing assessment" });
      continue;
    }
    eligible.push({
      eventId: rating.id,
      attemptId: row.attempt.id,
      assessmentId: row.assessment.id,
      responseSha256: row.attempt.response.sha256,
      cardId: `${language}:${row.attempt.task.constructionId}:${row.attempt.task.modality}`,
      language,
      modality: row.attempt.task.modality,
      reviewedAt: row.attempt.at,
      rating: rating.rating,
    });
  }
  return {
    eligible: eligible.sort(
      (a, b) =>
        Date.parse(a.reviewedAt) - Date.parse(b.reviewedAt) ||
        a.eventId.localeCompare(b.eventId),
    ),
    excluded,
  };
}
