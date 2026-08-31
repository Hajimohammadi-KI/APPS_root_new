import type { PlannedDay } from "../app/plan-data";

export type DailySessionCommand = "start" | "continue" | "stuck" | "close" | "paper";

export const DAILY_SESSION_COMMANDS: ReadonlyArray<{
  id: DailySessionCommand;
  label: string;
  shortInstruction: string;
}> = [
  {
    id: "start",
    label: "Start today",
    shortInstruction: "Inspect the real state first and give me only the first Mode A unit.",
  },
  {
    id: "continue",
    label: "Continue",
    shortInstruction: "Recover the verified article, block, unit, and pipeline step; give only the next step.",
  },
  {
    id: "stuck",
    label: "I am stuck",
    shortInstruction: "Use Builder Mode for this unit only; do not assume edit, commit, push, or deploy permission.",
  },
  {
    id: "close",
    label: "Close the day",
    shortInstruction: "Verify artefact, test, evidence, thesis decision, Git state, and tomorrow's one next unit.",
  },
  {
    id: "paper",
    label: "Paper-only day",
    shortInstruction: "Give one medically appropriate screen-free task for the current week.",
  },
];

type DailySessionPromptInput = {
  command: DailySessionCommand;
  day: PlannedDay;
  effectiveDate: string;
  sourceLabel: string;
};

function commandText(command: DailySessionCommand): string {
  switch (command) {
    case "continue":
      return "Continue from the verified article, block, unit, and pipeline step. Give me only the next step.";
    case "stuck":
      return "I am stuck. Enter Builder Mode for this unit only. Explain it in simple Persian, connect it to the thesis, and finish one authorized software output with real files, an exact test, and actual evidence.";
    case "close":
      return "Close the day. Confirm the artefact, test, evidence, thesis decision, Git state, the maximum-three-line Tracker note, and tomorrow's single next unit. Do not create catch-up work.";
    case "paper":
      return "Today is paper-only. Give me one medically appropriate screen-free software-engineering or thesis-design task for the current week. Do not require code execution or digital reading.";
    default:
      return "Start my daily thesis session. Inspect the real state first, then give me only today's first study unit in Mode A.";
  }
}

export function buildDailySessionPrompt({
  command,
  day,
  effectiveDate,
  sourceLabel,
}: DailySessionPromptInput): string {
  const permissionRule = command === "stuck"
    ? "Editing, committing, pushing, and deployment are NOT authorized by this message. Ask for each missing permission only when it becomes necessary."
    : "Work read-only first. Editing, committing, pushing, and deployment remain independently unauthorized unless I explicitly allow them.";

  return `${commandText(command)}

Use the master project instructions in AGENTS.md. Recover real state from the thesis repository, Git, the Study Tracker, the authoritative reading order, and the latest daily note. Do not ask me to fill in a daily form.

TODAY'S TRACKER CONTEXT
- Date: ${effectiveDate}
- Week: ${day.week}
- Day: ${day.title}
- Article or learning source: ${sourceLabel}
- Research block: ${day.researchTrack.block}/5
- Read only: ${day.researchTrack.readOnly}
- Do not read today: ${day.researchTrack.doNotRead}
- Guiding question: ${day.researchTrack.question}
- Research evidence: ${day.researchTrack.expectedOutput}
- Project module: ${day.module}
- Project artefact: ${day.deliverable}
- Screen mode: ${day.workMode === "paper" ? "paper-only; medical limits override the plan" : "screen work allowed only within current medical guidance"}

SESSION CONTRACT
1. Verify the real repository, source file, reading-order position, current implementation module, Git state, and last test before claiming progress.
2. Give exactly one smallest meaningful source unit. Let me try before you summarize, translate, or define vocabulary.
3. Ask at most three questions. If I struggle, give one hint at a time for at most two rounds.
4. Use at most two essential vocabulary terms. After understanding, ask for a short Persian teach-back; add a short English explanation only after it is correct. German is optional.
5. Connect the source claim to one thesis decision and then to one small visible software output.
6. A completed output needs Artefact + Test + Evidence. Save only a maximum-three-line conclusion in the Tracker; keep source-bound notes and citations in Zotero.
7. Never compress missed work, double a week, or turn the eight-hour capacity ceiling into a deadline.
8. ${permissionRule}

Stop after the single next interaction required by the selected command.`;
}
