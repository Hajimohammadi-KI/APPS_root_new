import type {
  GrammarWorksheet,
  WorksheetItem,
} from "../../../../../shared/grammar-worksheets/model";
export type {
  GrammarWorksheet,
  WorksheetItem,
} from "../../../../../shared/grammar-worksheets/model";

const possessiveItem = (
  id: string,
  prompt: string,
  answer: string,
  trigger: string,
  stem: "sein" | "ihr",
): WorksheetItem => ({
  id,
  prompt,
  answer,
  cause: `Besitzerbezug: ${trigger} → ${stem === "sein" ? "er → sein-" : "sie → ihr-"}. Der Besitzer bestimmt den Stamm.`,
  trigger,
  category: "Besitzerbezug / Stammwahl",
  contrast:
    stem === "sein"
      ? "Das Auto gehört Maria. Das ist ihr Auto."
      : "Das Auto gehört Thomas. Das ist sein Auto.",
});

// All nouns are neuter singular in nominative contexts. Only the owner's reference changes.
// Case, endings, personal-object pronouns and the verb sein are deliberately prerequisites.
export const worksheets: readonly GrammarWorksheet[] = [
  {
    id: "a1-possessive-sein-ihr",
    topic: "Possessivartikel",
    level: "A1",
    title: "sein- oder ihr-?",
    focus: "Den Stamm nach dem Besitzer wählen: er → sein-, sie → ihr-.",
    focusFa: "فقط مالک را تشخیص بده و ریشهٔ sein- یا ihr- را انتخاب کن.",
    prerequisite:
      "Nomen nach der Lücke → Neutrum, Singular, Nominativ → keine Endung.",
    decision: [
      "Wem gehört es?",
      "er → sein- · sie (Singular/Plural) → ihr-",
      "das Auto → sein Auto / ihr Auto",
    ],
    models: [
      {
        label: "Ein Besitzer",
        cue: "Thomas → er → sein-",
        sentence: "Das Auto gehört Thomas. Das ist sein Auto.",
      },
      {
        label: "Eine Besitzerin",
        cue: "Maria → sie → ihr-",
        sentence: "Das Auto gehört Maria. Das ist ihr Auto.",
      },
      {
        label: "Mehrere Besitzer",
        cue: "die Eltern → sie → ihr-",
        sentence: "Das Auto gehört den Eltern. Das ist ihr Auto.",
      },
    ],
    reference: [
      ["Thomas", "er", "sein Auto"],
      ["Maria", "sie (Singular)", "ihr Auto"],
      ["die Eltern", "sie (Plural)", "ihr Auto"],
    ],
    notice:
      "Die Besitzer wechseln. Das Nomen Auto bleibt gleich. Höfliches Sie / Ihr- gehört zu einer anderen Übung.",
    learn: [
      possessiveItem(
        "L1",
        "Das Buch gehört Thomas. Das ist ___ Buch.",
        "Das ist sein Buch.",
        "Thomas",
        "sein",
      ),
      possessiveItem(
        "L2",
        "Das Buch gehört Maria. Das ist ___ Buch.",
        "Das ist ihr Buch.",
        "Maria",
        "ihr",
      ),
    ],
    guided: [
      possessiveItem(
        "P1",
        "Das Handy gehört Thomas. Das ist ___ Handy.",
        "Das ist sein Handy.",
        "Thomas",
        "sein",
      ),
      possessiveItem(
        "P2",
        "Das Fahrrad gehört Maria. Das ist ___ Fahrrad.",
        "Das ist ihr Fahrrad.",
        "Maria",
        "ihr",
      ),
    ],
    transform: [
      possessiveItem(
        "T1",
        "Das Auto gehört Thomas. Das ist sein Auto. Neuer Bezug: Maria. Schreibe nur den zweiten Satz neu.",
        "Das ist ihr Auto.",
        "Maria",
        "ihr",
      ),
    ],
    recall: possessiveItem(
      "R1",
      "Das Fahrrad gehört den Eltern. Das ist ihr Fahrrad.",
      "Das ist ihr Fahrrad.",
      "die Eltern",
      "ihr",
    ),
    oral: [
      possessiveItem(
        "S1",
        "Thomas · das Auto",
        "Das ist sein Auto.",
        "Thomas",
        "sein",
      ),
      possessiveItem(
        "S2",
        "Maria · das Handy",
        "Das ist ihr Handy.",
        "Maria",
        "ihr",
      ),
      possessiveItem(
        "S3",
        "die Eltern · das Haus",
        "Das ist ihr Haus.",
        "die Eltern",
        "ihr",
      ),
    ],
    correction: [
      possessiveItem(
        "K1",
        "Das Handy gehört Maria. Das ist sein Handy.",
        "Das ist ihr Handy.",
        "Maria",
        "ihr",
      ),
      possessiveItem(
        "K2",
        "Das Haus gehört Thomas. Das ist ihr Haus.",
        "Das ist sein Haus.",
        "Thomas",
        "sein",
      ),
    ],
    personal: [
      "Wähle einen Mann oder eine Frau, den oder die du kennst. Was gehört dieser Person? Nenne den Besitzer und schreibe dann einen Satz mit sein oder ihr und Auto, Handy, Buch oder Fahrrad.",
    ],
  },
];
