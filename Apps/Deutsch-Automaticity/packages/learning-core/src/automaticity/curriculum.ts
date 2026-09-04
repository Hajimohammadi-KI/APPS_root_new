import type { Language, ReviewStatus, TaskIdentity } from "./contracts";
export const GRAMMAR_FAMILIES = [
  ["G01", "Basic clause structure", "Satzgrundstruktur"],
  ["G02", "Nouns and reference", "Nomen und Referenz"],
  ["G03", "Determiners", "Artikel und Determinierer"],
  ["G04", "Pronouns", "Pronomen"],
  ["G05", "Adjectives and adverbs", "Adjektive und Adverbien"],
  ["G06", "Present and past", "Gegenwart und Vergangenheit"],
  ["G07", "Future and temporal relations", "Zukunft und Zeitbezüge"],
  ["G08", "Verb patterns and valency", "Verbvalenz und Rektion"],
  ["G09", "Nonfinite constructions", "Infinitive und Partizipien"],
  ["G10", "Modality", "Modalität"],
  ["G11", "Voice and causation", "Passiv und Kausation"],
  ["G12", "Negation and questions", "Negation und Fragen"],
  ["G13", "Prepositions", "Präpositionen"],
  ["G14", "Clause linking", "Satzverknüpfung"],
  ["G15", "Relative clauses", "Relativsätze"],
  [
    "G16",
    "Conditionals and hypothetical meaning",
    "Konditionalsätze und Irreales",
  ],
  ["G17", "Reported language", "Indirekte Rede"],
  ["G18", "Information structure", "Informationsstruktur"],
  ["G19", "Cohesion and register", "Kohäsion und Register"],
  ["G20", "Advanced integration", "Komplexe Anwendung"],
  ["G21", "Orthography supporting grammar", "Grammatik und Rechtschreibung"],
] as const;
export type FamilyId = (typeof GRAMMAR_FAMILIES)[number][0];
export interface ConstructionMapping {
  id: string;
  language: Language;
  lessonAlias: string;
  familyIds: FamilyId[];
  prerequisites: string[];
  review: ReviewStatus;
}
export interface PracticeTask extends TaskIdentity {
  prompt: string;
  answerPolicy: "closed" | "open" | "reflection";
  responseKind:
    | "cloze"
    | "correction"
    | "transformation"
    | "choice"
    | "free_output"
    | "reflection";
  acceptedAnswers: string[];
  hints: string[];
  solution: string | null;
  normalisation: {
    nfc: true;
    whitespace: true;
    terminalFullStop: boolean;
    preserveCase: true;
  };
  sourceId: string;
}
export interface ConstructionUnit {
  id: string;
  language: Language;
  title: string;
  level: string;
  familyIds: FamilyId[];
  prerequisites: string[];
  lessonAlias: string;
  rule: string;
  examples: string[];
  commonError: string;
  review: ReviewStatus;
  sources: { title: string; url: string }[];
  tasks: PracticeTask[];
}
export interface CurriculumPack {
  version: string;
  language: Language;
  units: ConstructionUnit[];
  mappingVersion: string;
}

export function validateCurriculum(pack: CurriculumPack): string[] {
  const issues: string[] = [];
  const ids = new Set<string>(),
    aliases = new Set<string>(),
    taskIds = new Set<string>();
  const families = new Set<string>(GRAMMAR_FAMILIES.map(([id]) => id));
  for (const unit of pack.units) {
    if (ids.has(unit.id)) issues.push(`Duplicate construction ${unit.id}`);
    ids.add(unit.id);
    if (aliases.has(unit.lessonAlias))
      issues.push(`Duplicate lesson alias ${unit.lessonAlias}`);
    aliases.add(unit.lessonAlias);
    if (unit.language !== pack.language)
      issues.push(`Wrong language ${unit.id}`);
    if (
      !unit.familyIds.length ||
      unit.familyIds.some((id) => !families.has(id))
    )
      issues.push(`Missing/invalid family ${unit.id}`);
    for (const task of unit.tasks) {
      if (taskIds.has(task.id)) issues.push(`Duplicate task ${task.id}`);
      taskIds.add(task.id);
      if (task.constructionId !== unit.id)
        issues.push(`Task mapping mismatch ${task.id}`);
      if (task.answerPolicy === "closed" && !task.acceptedAnswers.length)
        issues.push(`Closed task has no accepted form ${task.id}`);
      if (task.answerPolicy !== "closed" && task.acceptedAnswers.length)
        issues.push(`Open task must not use exact-string grading ${task.id}`);
      if (
        task.partition === "evaluation" &&
        task.contentReview !== "human_reviewed"
      )
        issues.push(`Unreviewed evaluation task ${task.id}`);
    }
  }
  const visiting = new Set<string>(),
    visited = new Set<string>();
  const visit = (id: string) => {
    if (visiting.has(id)) {
      issues.push(`Prerequisite cycle ${id}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    const unit = pack.units.find((row) => row.id === id);
    for (const prerequisite of unit?.prerequisites ?? []) {
      if (!ids.has(prerequisite))
        issues.push(`Missing prerequisite ${prerequisite}`);
      else visit(prerequisite);
    }
    visiting.delete(id);
    visited.add(id);
  };
  for (const id of ids) visit(id);
  return issues;
}
