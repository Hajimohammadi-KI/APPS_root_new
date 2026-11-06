/** منطق خالص دامنهٔ آلمانی؛ این ماژول مستقیماً شبکه، حافظهٔ مرورگر یا حساب کاربری را تغییر نمی‌دهد. */
import { detectTextLanguage } from "@automaticity/learning-core/text";
import { writingIssues } from "@automaticity/learning-core/writing-rules";
import type { ErrorClass } from "./learner-state";

/** ساختار «EvaluationKind» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type EvaluationKind =
  "conversation" | "free" | "recall" | "review" | "sentences" | "why";

/** ساختار «EvaluationNextAction» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type EvaluationNextAction =
  "repeat" | "repair" | "transfer" | "schedule_review";

/** ساختار «GrammarTarget» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface GrammarTarget {
  readonly title: string;
  readonly rule: string;
  readonly examples: readonly string[];
}

/** ساختار «EvaluationIssue» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface EvaluationIssue {
  readonly type: string;
  readonly message: string;
  readonly context?: string;
  readonly suggestion?: string;
  readonly errorClass: ErrorClass;
  readonly severity: "minor" | "major" | "critical";
  readonly category?: FeedbackCategory;
  readonly userText?: string;
  readonly correctedText?: string;
  readonly explanation?: string;
  readonly hint?: string;
}

/** ساختار «FeedbackStatus» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type FeedbackStatus =
  | "correct"
  | "nearly_correct"
  | "wrong_language"
  | "language_uncertain"
  | "incomplete"
  | "needs_revision";

/** ساختار «FeedbackCategory» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type FeedbackCategory =
  | "wrong_output_language"
  | "missing_word"
  | "wrong_article"
  | "wrong_case"
  | "wrong_noun_ending"
  | "wrong_plural_form"
  | "wrong_verb_conjugation"
  | "wrong_tense"
  | "wrong_word_order"
  | "wrong_preposition"
  | "wrong_adjective_ending"
  | "incomplete_sentence"
  | "spelling_or_typo"
  | "vocabulary_or_meaning"
  | "register_or_style";

/** ساختار «LanguageToolMatch» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface LanguageToolMatch {
  readonly offset: number;
  readonly length: number;
  readonly message?: string;
  readonly context?: {
    readonly text?: string;
  };
  readonly replacements?: readonly {
    readonly value?: string;
  }[];
  readonly rule?: {
    readonly issueType?: string;
  };
}

/** ساختار «LanguageToolResult» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface LanguageToolResult {
  readonly matches: readonly LanguageToolMatch[];
  readonly online: boolean;
  readonly networkError?: string;
}

/** ساختار «EvaluationReport» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface EvaluationReport {
  readonly original: string;
  readonly corrected: string;
  readonly changed: boolean;
  readonly matches: readonly LanguageToolMatch[];
  readonly online: boolean;
  readonly networkError?: string;
  readonly issues: readonly EvaluationIssue[];
  /** Practice may continue, including after deterministic offline checks. */
  readonly practiceReady: boolean;
  /** Only verified reports may change mastery and CEFR evidence. */
  readonly verified: boolean;
  readonly ok: boolean;
  readonly targetHit: boolean;
  readonly relevant: boolean;
  readonly accuracyScore: number | null;
  readonly nextAction: EvaluationNextAction;
  readonly status?: FeedbackStatus;
  readonly answerLanguage?: "de" | "fa" | "en" | "other";
  readonly correctParts?: readonly string[];
  readonly nextActionText?: string;
}

export const detectAnswerLanguage = detectTextLanguage;

/** ساختار «ClosedAnswerAnalysis» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface ClosedAnswerAnalysis {
  readonly status: FeedbackStatus;
  readonly answerLanguage: "de" | "fa" | "en" | "other";
  readonly correct: boolean | null;
  readonly correctParts: readonly string[];
  readonly issues: readonly Pick<
    EvaluationIssue,
    | "type"
    | "message"
    | "severity"
    | "category"
    | "userText"
    | "correctedText"
    | "explanation"
    | "hint"
  >[];
  readonly corrected: string;
}

const closedAnswerNormalization =
  /** متن را فقط برای مقایسه به NFC، فاصلهٔ یکسان و شکل بدون نقطهٔ پایانی تبدیل می‌کند؛ بزرگی حروف و پاسخ ذخیره‌شده تصحیح خودکار نمی‌شوند. ورودی‌ها: value. */
  (value: string): string =>
    value
      .normalize("NFC")
      .trim()
      .replace(/(?<![.!?])\.$/u, "")
      .replace(/\s+/gu, " ");

/** پاسخ بسته را با مرجع و جایگزین‌های مجاز مقایسه می‌کند و وضعیت، بخش مشترک و راهنمای اصلاح می‌دهد؛ زبان نامطمئن و شباهت جزئی قبولی نمی‌سازند. ورودی‌ها: text، expected، acceptedAnswers. */
export function analyzeClosedAnswer(
  text: string,
  expected: string,
  acceptedAnswers: readonly string[] = [],
): ClosedAnswerAnalysis {
  const candidates = [expected, ...acceptedAnswers].filter(
    /** در analyzeClosedAnswer، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: candidate. */
    (candidate) => candidate.trim(),
  );
  const canonicalMatch = candidates.some(
    /** در analyzeClosedAnswer، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: candidate. */
    (candidate) =>
      closedAnswerNormalization(candidate) === closedAnswerNormalization(text),
  );
  // A known answer/alternative also disambiguates isolated German forms.
  const knownOrthography = candidates.some(
    /** در analyzeClosedAnswer، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: candidate. */
    (candidate) =>
      closedAnswerNormalization(candidate).toLocaleLowerCase("de-DE") ===
      closedAnswerNormalization(text).toLocaleLowerCase("de-DE"),
  );
  const answerLanguage =
    canonicalMatch || knownOrthography ? "de" : detectAnswerLanguage(text);
  /* زبان نامطمئن بی‌نمره می‌ماند؛ نبود تشخیص به پاسخ غلط دارای نمرهٔ قطعی تبدیل نمی‌شود. */
  if (answerLanguage === "other") {
    return {
      status: "language_uncertain",
      answerLanguage,
      correct: null,
      correctParts: [],
      corrected: text,
      issues: [
        {
          type: "Sprache unklar",
          severity: "minor",
          message:
            "Die Sprache lässt sich hier nicht sicher erkennen. Die Antwort wurde noch nicht bewertet.",
          userText: text,
          explanation:
            "Kurze oder gemischte Antworten sind für diese lokale Prüfung nicht eindeutig.",
        },
      ],
    };
  }
  /* پاسخ غیرآلمانی وارد مسیر قبولی آلمانی نمی‌شود، حتی اگر واژه یا ساختار مشابه داشته باشد. */
  if (answerLanguage !== "de") {
    return {
      status: "wrong_language",
      answerLanguage,
      correct: false,
      correctParts: [],
      corrected: expected,
      issues: [
        {
          type: "Ausgabesprache",
          category: "wrong_output_language",
          message: "Die Antwort muss auf Deutsch geschrieben werden.",
          userText: text,
          correctedText: "Deutsch schreiben",
          explanation: "Das Eingabefeld erwartet eine deutsche Antwort.",
          hint: expected.split(/\s+/u).slice(0, 4).join(" ") + " ...",
          severity: "critical",
        },
      ],
    };
  }

  /* فقط تطابق معیار با مرجع یا جایگزین مجاز، پاسخ بسته را صحیح می‌کند؛ شباهت واژگان کافی نیست. */
  if (canonicalMatch) {
    return {
      status: "correct",
      answerLanguage,
      correct: true,
      correctParts: text.split(/\s+/u).filter(Boolean),
      corrected: text.trim(),
      issues: [],
    };
  }

  const expectedWords = expected.replace(/[.!?]+$/gu, "").split(/\s+/u);
  const answerWords = text.replace(/[.!?]+$/gu, "").split(/\s+/u);
  const sharedWords = expectedWords.filter(
    /** در analyzeClosedAnswer، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: word. */
    (word) =>
      answerWords.some(
        /** در analyzeClosedAnswer، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: candidate. */
        (candidate) =>
          closedAnswerNormalization(candidate) ===
          closedAnswerNormalization(word),
      ),
  );
  const issues: Array<ClosedAnswerAnalysis["issues"][number]> = [];
  const hasEsGibtCaseError =
    /\bin meine straße\b/iu.test(text) &&
    /\b(gibt es|es gibt)\b/iu.test(text) &&
    /\b(supermarkt|spermarkt)\b/iu.test(text);
  /* این الگوی محدودِ مکان ثابت راهنمای Dativ می‌گیرد؛ قاعده به همهٔ جمله‌های دارای in تعمیم داده نمی‌شود. */
  if (hasEsGibtCaseError) {
    issues.push({
      type: "Kasus",
      category: "wrong_case",
      message: "„meine“ muss hier „meiner“ heißen.",
      userText: "In meine Straße",
      correctedText: "In meiner Straße",
      explanation: "Bei einem festen Ort steht „in“ mit dem Dativ.",
      hint: "die Straße → in meiner Straße",
      severity: "critical",
    });
  }
  /* الگوی خطادار مفعول sehen، راهنمای Akkusativ می‌گیرد؛ فقط همین شکل شناخته‌شده توضیح داده می‌شود. */
  if (/\bich sehe der mann\b/iu.test(text)) {
    issues.push({
      type: "Kasus",
      category: "wrong_case",
      message: "„der Mann“ muss hier „den Mann“ heißen.",
      userText: "der Mann",
      correctedText: "den Mann",
      explanation:
        "„Mann“ ist das direkte Objekt von „sehen“ und steht im Akkusativ.",
      hint: "der → den im Akkusativ",
      severity: "critical",
    });
  }
  /* این الگوی geben نیازمند تفکیک گیرندهٔ Dativ و شیء Akkusativ است؛ دو نقش جدا توضیح داده می‌شوند. */
  if (/\bich gebe der mann dem buch\b/iu.test(text)) {
    issues.push({
      type: "Valenz und Kasus",
      category: "wrong_case",
      message:
        "Bei „geben“ ist die Person der Empfänger im Dativ und die Sache das direkte Objekt im Akkusativ.",
      userText: "der Mann dem Buch",
      correctedText: "dem Mann das Buch",
      explanation:
        "Das Verb „geben“ folgt dem Muster „jemandem etwas geben“: dem Mann = Dativ, das Buch = Akkusativ.",
      hint: "der Mann → dem Mann; dem Buch → das Buch",
      severity: "critical",
    });
  }
  /* الگوی es gibt و اسم هدف، راهنمای حرف تعریف Akkusativ می‌گیرد؛ شناسایی خطا قبولی ایجاد نمی‌کند. */
  if (/\bes gibt (ein|eine) supermarkt\b/iu.test(text)) {
    issues.push({
      type: "Artikel und Kasus",
      category: "wrong_article",
      message:
        "Nach „es gibt“ steht „Supermarkt“ im Akkusativ: „einen Supermarkt“.",
      userText: text.match(/es gibt (ein|eine) supermarkt/iu)?.[0] ?? text,
      correctedText: "einen Supermarkt",
      explanation: "Supermarkt ist maskulin; es gibt verlangt den Akkusativ.",
      hint: "der Supermarkt → einen Supermarkt",
      severity: "critical",
    });
  }
  /* نبود خطای ویژه قبولی نیست؛ ناسازگاری با مرجع همچنان راهنمای اصلاح عمومی می‌گیرد. */
  if (issues.length === 0) {
    issues.push({
      type: "Antwort",
      category: "vocabulary_or_meaning",
      message:
        "Die Antwort stimmt noch nicht vollständig mit der Aufgabe überein.",
      userText: text,
      correctedText: expected,
      explanation: "Vergleiche die Bedeutung und die verlangte Zielstruktur.",
      severity: "major",
    });
  }
  return {
    status: "nearly_correct",
    answerLanguage,
    correct: false,
    correctParts: sharedWords,
    corrected: expected,
    issues: issues.slice(0, 3),
  };
}

/** الگوهای محدودِ عنوان و نشانهٔ دستوری‌اند؛ نداشتن الگوی ویژه فقط مسیر سرنخ عمومی را فعال می‌کند. */
const TARGET_PATTERNS: ReadonlyArray<readonly [RegExp, RegExp]> = [
  [
    /perfekt/,
    /\b(habe|hast|hat|haben|habt|bin|bist|ist|sind|seid)\b[\s\S]*\b(ge\w+|[\wäöüß]+iert)\b/i,
  ],
  [/präteritum/, /\b(war|warst|waren|wart|hatte|ging|kam|sagte|machte)\b/i],
  [/futur/, /\b(werde|wirst|wird|werden|werdet)\b[\s\S]*\b\w+en\b/i],
  [
    /passiv/,
    /\b(werde|wirst|wird|werden|werdet|wurde|wurden|worden)\b[\s\S]*\b(ge\w+|[\wäöüß]+iert)\b/i,
  ],
  [
    /konjunktiv|höflich|irreale|indirekte rede/,
    /\b(würde|wäre|hätte|könnte|müsste|sollte|dürfte|möge|sei|seien)\b/i,
  ],
  [
    /nebensatz|weil|dass|obwohl|konnektor/,
    /\b(weil|dass|obwohl|wenn|während|damit|bevor|nachdem|falls|indem)\b/i,
  ],
  [
    /relativ/,
    /\b(der|die|das|den|dem|deren|dessen|welche|welcher|welches)\b[\s\S]*,/i,
  ],
  [
    /trennbare/,
    /\b(stehe|steht|stehen|fange|fängt|fangen|komme|kommt|kommen|mache|macht|machen)\b[\s\S]*\b(auf|an|mit|ein|aus)\b/i,
  ],
  [
    /modalverb/,
    /\b(kann|kannst|können|muss|musst|müssen|soll|sollen|darf|dürfen|will|wollen|möchte|möchten)\b/i,
  ],
  [/akkusativ/, /\b(den|einen|keinen|meinen|deinen|diesen)\b/i],
  [/dativ/, /\b(dem|einem|keinem|meinem|deinem|diesem|der)\b/i],
  [/genitiv/, /\b(des|eines|meines|deines|dessen|deren)\b/i],
  [/komparativ|vergleich/, /\b(als|wie|besser|mehr|weniger|größer|kleiner)\b/i],
  [/superlativ/, /\b(am \w+sten|der beste|die beste|das beste)\b/i],
  [/negation/, /\b(nicht|kein|keine|keinen|keinem)\b/i],
  [
    /frage/,
    /\?|^(wer|was|wann|wo|wie|warum|welch|ist|sind|hast|hat|kann|können)\b/i,
  ],
  [
    /imperativ/,
    /^(bitte\s+)?(geh|gehen sie|komm|kommen sie|mach|machen sie|sei|seien sie|nimm|nehmen sie)\b/i,
  ],
];

/** فقط چند اصلاح شناخته‌شدهٔ محلی را پیشنهاد می‌کند؛ جای اعتبارسنجی کامل زبان یا سرویس آنلاین را نمی‌گیرد. */
const OFFLINE_CORRECTIONS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bich habe gegangen\b/gi, "Ich bin gegangen"],
  [/\bmit der Mann\b/gi, "mit dem Mann"],
  [/\bich würde gegangen\b/gi, "ich würde gehen"],
  [/\bmehr besser\b/gi, "besser"],
];

/** قطعه‌های متن تشخیصی را به طبقهٔ داخلی خطا نگاشت می‌کند؛ این برچسب برای گزارش اصلاح است و به‌تنهایی صحت پاسخ را تأیید نمی‌کند. ورودی‌ها: fragments. */
export function classifyError(
  ...fragments: readonly (string | undefined)[]
): ErrorClass {
  const text = fragments.filter(Boolean).join(" ").toLocaleLowerCase("de");

  /* نشانهٔ متنی شناخته‌شده دستهٔ auxiliary را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (
    /\b(hilfsverb|auxiliary|haben oder sein|mit „sein“|mit sein)\b/.test(text)
  ) {
    return "auxiliary";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ word_order را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (
    /\b(wortstellung|wortfolge|satzende|verbposition|verb position|nebensatz|verbzweit|v2)\b/.test(
      text,
    )
  ) {
    return "word_order";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ case را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (
    /\b(kasus|akkusativ|dativ|genitiv|nominativ|case|deklination)\b/.test(text)
  ) {
    return "case";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ article را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/\b(artikel|article|genus)\b/.test(text)) {
    return "article";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ ending را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/\b(endung|ending|adjektivdeklination)\b/.test(text)) {
    return "ending";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ tense را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/\b(tempus|zeitform|tense|präteritum|perfekt|futur)\b/.test(text)) {
    return "tense";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ agreement را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/\b(kongruenz|agreement|übereinstimmung)\b/.test(text)) {
    return "agreement";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ spelling را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/\b(rechtschreibung|spelling|misspelling|tippfehler)\b/.test(text)) {
    return "spelling";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ target_grammar را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/\b(zielgrammatik|verlangte struktur)\b/.test(text)) {
    return "target_grammar";
  }
  return "other";
}

/** طبقهٔ خطا را به شدت فعلی سامانه تبدیل می‌کند تا گزارش و کسر امتیاز هماهنگ باشند؛ این تابع شاهد آموزشی تازه تولید نمی‌کند. ورودی‌ها: errorClass. */
function issueSeverity(errorClass: ErrorClass): EvaluationIssue["severity"] {
  /* خطاهای ساختاری و هدف طبق سیاست فعلی بحرانی‌اند و وزنشان در گزارش مصرف می‌شود. */
  if (
    errorClass === "word_order" ||
    errorClass === "case" ||
    errorClass === "auxiliary" ||
    errorClass === "target_grammar"
  ) {
    return "critical";
  }
  /* املا و طبقهٔ عمومی شدت خفیف دارند؛ سایر طبقه‌ها به شدت پیش‌فرض می‌روند. */
  if (errorClass === "spelling" || errorClass === "other") {
    return "minor";
  }
  return "major";
}

/** عنوان، پیام و طبقه را به دستهٔ قابل‌نمایش نگاشت می‌کند؛ نبود نگاشت شناخته‌شده undefined می‌دهد تا دستهٔ ساختگی ساخته نشود. ورودی‌ها: errorClass، type، message. */
function feedbackCategoryFor(
  errorClass: ErrorClass,
  type: string,
  message: string,
): FeedbackCategory | undefined {
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_output_language را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/ausgabesprache|language|sprache/iu.test(type)) {
    return "wrong_output_language";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ missing_word را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/fehlt|missing|nicht vorhanden/iu.test(message)) return "missing_word";
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_article را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/artikel|genus/iu.test(type + " " + message)) return "wrong_article";
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_preposition را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/präposition|preposition/iu.test(type + " " + message)) {
    return "wrong_preposition";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_word_order را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/wortstellung|wortfolge/iu.test(type + " " + message)) {
    return "wrong_word_order";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_plural_form را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/plural|mehrzahl/iu.test(type + " " + message)) {
    return "wrong_plural_form";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_verb_conjugation را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (/konjug|verbform/iu.test(type + " " + message)) {
    return "wrong_verb_conjugation";
  }
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_case را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (errorClass === "case") return "wrong_case";
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_adjective_ending را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (errorClass === "ending") return "wrong_adjective_ending";
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_tense را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (errorClass === "tense") return "wrong_tense";
  /* نشانهٔ متنی شناخته‌شده دستهٔ spelling_or_typo را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (errorClass === "spelling") return "spelling_or_typo";
  /* نشانهٔ متنی شناخته‌شده دستهٔ wrong_word_order را انتخاب می‌کند؛ این نگاشت تشخیصی پاسخ را درست اعلام نمی‌کند. */
  if (errorClass === "word_order") return "wrong_word_order";
  return undefined;
}

/** مشکل پایه را با طبقه و شدت تکمیل می‌کند؛ مقادیر صریح فراخواننده بر استنباط متن مقدم‌اند و شیء تازه برمی‌گردد. ورودی‌ها: issue. */
function createIssue(
  issue: Omit<EvaluationIssue, "errorClass" | "severity"> & {
    readonly errorClass?: ErrorClass;
    readonly severity?: EvaluationIssue["severity"];
  },
): EvaluationIssue {
  const errorClass =
    issue.errorClass ??
    classifyError(issue.type, issue.message, issue.context, issue.suggestion);
  const category =
    issue.category ??
    feedbackCategoryFor(errorClass, issue.type, issue.message);
  return {
    ...issue,
    errorClass,
    ...(category ? { category } : {}),
    severity: issue.severity ?? issueSeverity(errorClass),
  };
}

/** تطبیق‌ها را با جبران اختلاف طول به متن پیشنهادی تبدیل می‌کند؛ نبود جایگزین، حذف متن یا قبولی فرض نمی‌شود. ورودی‌ها: text، matches. */
export function applyLanguageToolMatches(
  text: string,
  matches: readonly LanguageToolMatch[],
): string {
  let corrected = text;
  let offset = 0;

  /* اعضا با ترتیب و سیاست فعلی پردازش می‌شوند؛ بررسی یا تبدیل این حلقه، ذخیرهٔ مستقل وضعیت زبان‌آموز نیست. */
  for (const match of matches) {
    const replacement = match.replacements?.[0]?.value;
    /* نبود جایگزین معتبر نباید متن را حذف یا ویرایش فرضی ایجاد کند؛ متن فعلی حفظ می‌شود. */
    if (!replacement) {
      continue;
    }
    const position = match.offset + offset;
    corrected =
      corrected.slice(0, position) +
      replacement +
      corrected.slice(position + match.length);
    offset += replacement.length - match.length;
  }

  return corrected;
}

/** متن را از چند الگوی محدود اصلاح محلی عبور می‌دهد؛ خروجی پیشنهاد است و تأیید آنلاین یا شاهد مستقل تسلط نیست. ورودی‌ها: text. */
export function offlineCorrect(text: string): string {
  return OFFLINE_CORRECTIONS.reduce(
    /** در offlineCorrect، انباشت از مقدار آغازین مشخص پیش می‌رود؛ سهم هر عضو فقط در نتیجهٔ محاسبه اعمال می‌شود. ورودی‌ها: corrected، [pattern, replacement]. */
    (corrected, [pattern, replacement]) =>
      corrected.replace(pattern, replacement),
    text,
  );
}

/** وجود نشانهٔ ساختار هدف را با الگوی مشخص یا سرنخ قاعده می‌سنجد؛ نتیجهٔ بولی به‌تنهایی صحت معنایی جمله را ثابت نمی‌کند. ورودی‌ها: text، grammar. */
export function targetEvidencePresent(
  text: string,
  grammar: GrammarTarget,
): boolean {
  const title = grammar.title.toLocaleLowerCase("de");
  const specific = TARGET_PATTERNS.find(
    /** در targetEvidencePresent، اولین عضو مطابق شرط برای قاعده یا پیشنهاد مرتبط انتخاب می‌شود؛ نبود تطبیق undefined می‌ماند. ورودی‌ها: [name]. */
    ([name]) => name.test(title),
  );
  /* الگوی ویژهٔ عنوان درس بر سرنخ واژگانی عمومی مقدم است؛ این مسیر فقط وجود نشانه را می‌سنجد. */
  if (specific) {
    return specific[1].test(text);
  }

  const stopWords = new Set([
    "diese",
    "dieser",
    "dieses",
    "einen",
    "einer",
    "werden",
    "verwendet",
    "korrekt",
    "satz",
    "sätze",
    "struktur",
    "grammatik",
    "deutsch",
  ]);
  const clues = [grammar.rule, ...grammar.examples]
    .join(" ")
    .toLocaleLowerCase("de")
    .match(/\b[a-zäöüß]{4,}\b/g)
    ?.filter(
      /** در targetEvidencePresent، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: word. */
      (word) => !stopWords.has(word),
    );
  const lowerText = text.toLocaleLowerCase("de");

  return (
    clues?.some(
      /** در targetEvidencePresent، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: word. */
      (word) => lowerText.includes(word),
    ) ?? false
  );
}

/** متن، هدف، نوع تکلیف و صورت سؤال را به مشکلات مرتبط با خواستهٔ تمرین تبدیل می‌کند؛ خروجی بازخورد است و پاسخ صریح را تغییر نمی‌دهد. ورودی‌ها: text، grammar، kind، taskPrompt. */
export function getTaskIssues(
  text: string,
  grammar: GrammarTarget,
  kind: EvaluationKind,
  taskPrompt?: string,
): readonly EvaluationIssue[] {
  const issues: EvaluationIssue[] = [];
  const sentences = text
    .split(/[.!?]+/)
    .map(
      /** در getTaskIssues، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: sentence. */
      (sentence) => sentence.trim(),
    )
    .filter(Boolean);

  /* اعضا با ترتیب و سیاست فعلی پردازش می‌شوند؛ بررسی یا تبدیل این حلقه، ذخیرهٔ مستقل وضعیت زبان‌آموز نیست. */
  for (const issue of writingIssues(text, "de").filter(
    /** در getTaskIssues، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: issue. */
    (issue) => issue.ruleId === "DE_PERFEKT_AUXILIARY",
  )) {
    issues.push(
      createIssue({
        type: "Zielgrammatik",
        message: issue.message,
        suggestion:
          text.slice(0, issue.start) +
          issue.replacement +
          text.slice(issue.end),
        errorClass: "auxiliary",
      }),
    );
  }

  /* تکرار همان جمله، تنوع خواسته‌شده را برآورده نمی‌کند و بازخورد تکلیف می‌گیرد. */
  if (
    kind === "sentences" &&
    new Set(
      sentences.map(
        /** در getTaskIssues، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: sentence. */
        (sentence) => sentence.toLocaleLowerCase("de"),
      ),
    ).size < sentences.length
  ) {
    issues.push(
      createIssue({
        type: "Aufgabe",
        message:
          "Die Sätze sind identisch. Schreibe drei unterschiedliche Sätze.",
      }),
    );
  }

  /* تولید آزاد/جمله/گفت‌وگو باید نشانهٔ ساختار هدف داشته باشد؛ نبود آن راهنمای اصلاح می‌گیرد. */
  if (
    (kind === "free" || kind === "sentences" || kind === "conversation") &&
    !targetEvidencePresent(text, grammar)
  ) {
    issues.push(
      createIssue({
        type: "Zielgrammatik",
        message: `Die verlangte Struktur „${grammar.title}“ ist nicht eindeutig nachweisbar.`,
        errorClass: "target_grammar",
      }),
    );
  }

  /* در یادآوری قاعده، سرنخ محتواییِ قاعده بررسی می‌شود؛ مسیر با تولید جمله یکسان نیست. */
  if (kind === "recall") {
    const keywords =
      grammar.rule.toLocaleLowerCase("de").match(/\b[a-zäöüß]{5,}\b/g) ?? [];
    const lowerText = text.toLocaleLowerCase("de");
    /* نبود واژهٔ کلیدی قاعده، توضیح یادآوری را ناقص علامت می‌زند؛ متن خودکار پر نمی‌شود. */
    if (
      !keywords.some(
        /** در getTaskIssues، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: keyword. */
        (keyword) => lowerText.includes(keyword),
      )
    ) {
      issues.push(
        createIssue({
          type: "Inhalt",
          message:
            "Deine Erklärung nennt keinen zentralen Begriff aus der Regel.",
        }),
      );
    }
  }

  /* تکلیف چرایی باید نشانه‌ای از دلیل یا تغییر دستوری داشته باشد؛ نبود آن نیازمند توضیح بیشتر است. */
  if (
    kind === "why" &&
    !/\b(weil|deshalb|denn|darum|verb|hilfsverb|partizip|kasus|endung|satzende|korrigiert|geändert)\b/i.test(
      text,
    )
  ) {
    issues.push(
      createIssue({
        type: "Inhalt",
        message:
          "Nenne die geänderte Form und den grammatischen Grund der Korrektur.",
      }),
    );
  }

  /* ارتباط ناکافی پاسخ جدا از صحت صرفی بررسی می‌شود تا جملهٔ نامرتبط قبولی ساده نگیرد. */
  if (!responseIsRelevant(text, taskPrompt, kind, grammar)) {
    issues.push(
      createIssue({
        type: "Aufgabenbezug",
        message:
          "Die Antwort ist zu kurz, zu wiederholend oder nicht klar mit der Aufgabe verbunden.",
      }),
    );
  }

  return issues;
}

/** واژه‌های عمومی از سنجش هم‌پوشانی حذف می‌شوند تا تکرار دستور سؤال ارتباط محتوایی ساختگی نسازد. */
const RELEVANCE_STOP_WORDS = new Set([
  "aber",
  "antwort",
  "aufgabe",
  "aus",
  "bei",
  "das",
  "dass",
  "dem",
  "den",
  "der",
  "des",
  "die",
  "dies",
  "eine",
  "einem",
  "einen",
  "einer",
  "erkläre",
  "für",
  "grammatik",
  "ist",
  "mit",
  "oder",
  "satz",
  "schreibe",
  "struktur",
  "und",
  "verwende",
  "von",
  "warum",
  "was",
  "wie",
  "wird",
  "zum",
  "zur",
]);

/** واژه‌های محتوایی کوچک‌شدهٔ آلمانی را با حذف واژه‌های توقف استخراج می‌کند؛ خروجی فقط برای سنجش محدود ارتباط با تکلیف است. ورودی‌ها: text. */
function contentTokens(text: string): readonly string[] {
  return (
    text
      .toLocaleLowerCase("de")
      .match(/[a-zäöüß][a-zäöüß'-]{2,}/g)
      ?.filter(
        /** در contentTokens، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: token. */
        (token) => !RELEVANCE_STOP_WORDS.has(token),
      ) ?? []
  );
}

/** تنوع محتوایی، نشانهٔ هدف و ارتباط محدود با سؤال را بررسی می‌کند؛ نتیجهٔ بولی جای داوری کامل معنا را نمی‌گیرد. ورودی‌ها: text، taskPrompt، kind، grammar. */
export function responseIsRelevant(
  text: string,
  taskPrompt: string | undefined,
  kind: EvaluationKind,
  grammar: GrammarTarget,
): boolean {
  const responseTokens = contentTokens(text);
  const uniqueResponse = new Set(responseTokens);
  /* کمتر از دو واژهٔ محتوایی مستقل برای این سنجش محدود ارتباط کافی نیست. */
  if (uniqueResponse.size < 2) return false;
  /* پاسخ بلند با تکرار غالب تنوع کافی ندارد؛ طول بیشتر به‌تنهایی شاهد ارتباط نیست. */
  if (
    responseTokens.length >= 6 &&
    uniqueResponse.size / responseTokens.length < 0.4
  ) {
    return false;
  }
  /* در تولید آزاد/گفت‌وگو وجود نشانهٔ ساختار هدف، شرط مستقل ارتباط تمرین است. */
  if (
    (kind === "free" || kind === "sentences" || kind === "conversation") &&
    !targetEvidencePresent(text, grammar)
  ) {
    return false;
  }
  // Kurze gelenkte Antworten müssen nicht dieselben Inhaltswörter wie die
  // Aufgabe wiederholen. Wenn die Zielform vorhanden ist und mindestens zwei
  // sinntragende Wörter vorkommen, darf die Übung fortgesetzt werden.
  /* پاسخ کوتاهِ عبورکرده از شرط‌های قبلی لازم نیست واژه‌های صورت سؤال را عیناً تکرار کند. */
  if (responseTokens.length <= 5) return true;
  const promptTokens = new Set(contentTokens(taskPrompt ?? ""));
  /* صورت سؤال بدون واژهٔ محتوایی نمی‌تواند معیار هم‌پوشانی باشد؛ شرط‌های قبلی همچنان رعایت شده‌اند. */
  if (promptTokens.size === 0) return true;
  return (
    [...uniqueResponse].some(
      /** در responseIsRelevant، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: token. */
      (token) => promptTokens.has(token),
    ) || uniqueResponse.size >= 7
  );
}

/** نتیجهٔ سرویس را با بررسی‌های محلی و تکلیف ترکیب و گزارش می‌سازد؛ ادامهٔ تمرین از تأیید آنلاین جداست و زبان نامطمئن نمرهٔ قطعی نمی‌گیرد. ورودی‌ها: text، grammar، kind، languageTool، taskPrompt. */
export function evaluateAnswer(
  text: string,
  grammar: GrammarTarget,
  kind: EvaluationKind,
  languageTool: LanguageToolResult,
  taskPrompt?: string,
): EvaluationReport {
  const answerLanguage = detectAnswerLanguage(text);
  /* زبان نامطمئن نمرهٔ قطعی نمی‌گیرد و از مسیر تأیید موفقیت خارج می‌ماند. */
  if (answerLanguage === "other") {
    return {
      original: text,
      corrected: text,
      changed: false,
      matches: [],
      online: languageTool.online,
      ...(languageTool.networkError
        ? { networkError: languageTool.networkError }
        : {}),
      issues: [
        {
          type: "Sprache unklar",
          message:
            "Die Sprache lässt sich hier nicht sicher erkennen. Die Antwort wurde noch nicht bewertet.",
          context: text,
          errorClass: "other",
          severity: "minor",
          explanation:
            "Kurze oder gemischte Antworten sind für diese lokale Prüfung nicht eindeutig.",
        },
      ],
      practiceReady: false,
      verified: false,
      ok: false,
      targetHit: false,
      relevant: false,
      accuracyScore: null,
      nextAction: "repeat",
      status: "language_uncertain",
      answerLanguage,
      correctParts: [],
      nextActionText:
        "Bitte ergänze etwas Kontext oder lass die Antwort prüfen.",
    };
  }
  /* پاسخ غیرآلمانی برای این تکلیف معتبر نیست؛ وجود واژهٔ مشترک مجوز قبولی نمی‌شود. */
  if (answerLanguage !== "de") {
    const languageIssue = createIssue({
      type: "Ausgabesprache",
      message: "Die Antwort muss auf Deutsch geschrieben werden.",
      context: text,
      suggestion: "Deutsch schreiben",
      errorClass: "other",
      category: "wrong_output_language",
      explanation: "Das Eingabefeld erwartet eine deutsche Antwort.",
      hint: grammar.examples[0]?.split(/\s+/u).slice(0, 4).join(" ") + " ...",
    });
    return {
      original: text,
      corrected: "",
      changed: false,
      matches: languageTool.matches,
      online: languageTool.online,
      ...(languageTool.networkError
        ? { networkError: languageTool.networkError }
        : {}),
      issues: [languageIssue],
      practiceReady: false,
      verified: false,
      ok: false,
      targetHit: false,
      relevant: false,
      accuracyScore: 0,
      nextAction: "repair",
      status: "wrong_language",
      answerLanguage,
      correctParts: [],
      nextActionText: "پاسخ را به آلمانی بنویسید.",
    };
  }
  const corrected = languageTool.online
    ? applyLanguageToolMatches(text, languageTool.matches)
    : offlineCorrect(text);
  const languageIssues: EvaluationIssue[] = languageTool.matches.map(
    /** در evaluateAnswer، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: match. */
    (match) => {
      const suggestion = match.replacements?.[0]?.value;
      return createIssue({
        type:
          match.rule?.issueType === "misspelling"
            ? "Rechtschreibung"
            : "Grammatik/Stil",
        message: match.message ?? "Diese Stelle sollte korrigiert werden.",
        ...(match.context?.text ? { context: match.context.text } : {}),
        ...(suggestion ? { suggestion } : {}),
        ...(match.rule?.issueType === "misspelling"
          ? { errorClass: "spelling" as const }
          : {}),
      });
    },
  );
  const offlineIssue =
    !languageTool.online && corrected !== text
      ? [
          createIssue({
            type: "Offline-Grammatik",
            message:
              "Die lokale Prüfung hat eine bekannte Form korrigiert. Repariere sie vor dem Fortfahren.",
            suggestion: corrected,
          }),
        ]
      : [];
  const taskIssues = getTaskIssues(text, grammar, kind, taskPrompt);
  const localIssues = writingIssues(text, "de")
    .filter(
      /** در evaluateAnswer، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: issue. */
      (issue) => issue.ruleId !== "DE_PERFEKT_AUXILIARY",
    )
    .map(
      /** در evaluateAnswer، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: issue. */
      (issue) =>
        createIssue({
          type: "Lokale Grammatik",
          message: issue.message,
          userText: issue.original,
          correctedText: issue.replacement,
          explanation: issue.ruleId,
          suggestion:
            text.slice(0, issue.start) +
            issue.replacement +
            text.slice(issue.end),
        }),
    );
  const issues = [
    ...languageIssues,
    ...offlineIssue,
    ...taskIssues,
    ...localIssues,
  ];
  const targetCorrection = taskIssues.find(
    /** در evaluateAnswer، اولین عضو مطابق شرط برای قاعده یا پیشنهاد مرتبط انتخاب می‌شود؛ نبود تطبیق undefined می‌ماند. ورودی‌ها: issue. */
    (issue) => issue.type === "Zielgrammatik" && issue.suggestion,
  )?.suggestion;
  const finalCorrection = targetCorrection ?? corrected;
  const targetHit = !taskIssues.some(
    /** در evaluateAnswer، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: issue. */
    (issue) =>
      issue.errorClass === "target_grammar" || issue.type === "Zielgrammatik",
  );
  const relevant = !taskIssues.some(
    /** در evaluateAnswer، شرط عضویت اعضا فقط تصمیم بولی را می‌سازد و وضعیت اصلی نوشته نمی‌شود. ورودی‌ها: issue. */
    (issue) => issue.type === "Aufgabenbezug",
  );
  /** کسرهای فعلی شدت مشکل روی گزارش اعمال و خروجی از صفر کمتر نمی‌شود؛ وزن‌ها در این تغییر دست‌نخورده‌اند. */
  const accuracyScore = Math.max(
    0,
    100 -
      issues.reduce(
        /** در evaluateAnswer، انباشت از مقدار آغازین مشخص پیش می‌رود؛ سهم هر عضو فقط در نتیجهٔ محاسبه اعمال می‌شود. ورودی‌ها: penalty، issue. */
        (penalty, issue) =>
          penalty +
          (issue.severity === "critical"
            ? 30
            : issue.severity === "major"
              ? 18
              : 8),
        0,
      ),
  );
  /** نبود مشکل اجازهٔ ادامهٔ تمرین می‌دهد؛ نتیجهٔ بعدی ok همچنان شرط تأیید مستقل همین مسیر را بررسی می‌کند. */
  const practiceReady = issues.length === 0;
  /** تأیید این گزارش فقط از ارزیابی آنلاین می‌آید؛ بی‌خطا بودن بررسی محلی جای آن را نمی‌گیرد. */
  const verified = languageTool.online;
  const ok = verified && practiceReady;

  return {
    original: text,
    corrected: finalCorrection,
    changed: finalCorrection !== text,
    matches: languageTool.matches,
    online: languageTool.online,
    ...(languageTool.networkError
      ? { networkError: languageTool.networkError }
      : {}),
    issues,
    practiceReady,
    verified,
    ok,
    targetHit,
    relevant,
    accuracyScore,
    nextAction:
      issues.length > 0
        ? "repair"
        : kind === "review"
          ? "schedule_review"
          : "transfer",
    status: issues.length === 0 ? "correct" : "needs_revision",
    answerLanguage,
    nextActionText:
      issues.length === 0
        ? "حالا این ساختار را در یک جملهٔ جدید به کار ببر."
        : "خطاهای مشخص‌شده را اصلاح و پاسخ را دوباره ارسال کن.",
  };
}
