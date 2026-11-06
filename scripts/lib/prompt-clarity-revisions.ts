import {
  activePracticeTasks,
  type CurriculumPack,
  type PracticeTask,
} from "../../shared/learning-core/src/automaticity/curriculum";

const version = "2026-11-06.4";
const suffix = ".clarity-202611064";

/** Append clarified definitions; historical prompts and learner responses survive. */
export function revisePromptClarity(source: CurriculumPack): CurriculumPack {
  const pack = structuredClone(source);
  for (const unit of pack.units) {
    for (const task of activePracticeTasks(unit)) {
      if (task.id.endsWith(suffix)) continue;
      const transfer = /\.transfer\.[01]\.(writing|speaking)$/u.test(task.id);
      const bareModel =
        /\.repair\.99\.writing$/u.test(task.id) &&
        !/^(?:Korrigiere|Correct)\b/u.test(task.prompt);
      const badModel =
        pack.language === "de" &&
        [
          "de.c.153.retrieve.supplement.distinct-202611022.speaking",
          "de.c.155.retrieve.supplement.distinct-202611022.speaking",
        ].includes(task.id);
      const instruction = task.prompt.replace(
        /^(?:Say your answer aloud and record it\.|Sprich deine Antwort laut und nimm sie auf\.|Record your spoken response\.|Nimm deine gesprochene Antwort auf\.)\s*/u,
        "",
      );
      const missingExample =
        task.stage === "notice" &&
        /^(?:Read the example, then explain the distinction:|Lies das Beispiel und erkläre den Unterschied:)/u.test(
          instruction,
        ) &&
        !unit.examples.some((example) => task.prompt.includes(example));
      const missingDraft =
        task.id === "en.c.124.transfer.supplement.writing" ||
        task.id === "en.c.124.transfer.supplement.speaking";
      const missingReferent =
        /^de\.c\.(146|152)\.retain\.supplement\.(writing|speaking)$/u.test(
          task.id,
        );
      const missingGermanDraft =
        task.id === "de.c.156.transfer.supplement.writing";
      if (
        !transfer &&
        !bareModel &&
        !badModel &&
        !missingExample &&
        !missingDraft &&
        !missingReferent &&
        !missingGermanDraft
      )
        continue;
      if (
        task.answerPolicy === "closed" ||
        task.contentReview === "human_reviewed"
      )
        throw new Error(`Unexpected clarity revision scope: ${task.id}`);
      if (bareModel) {
        const target = activePracticeTasks(unit).find(
          (row) =>
            row.stage === "repair" &&
            row.modality === "writing" &&
            row.answerPolicy === "closed",
        );
        if (!target)
          throw new Error(`No genuine correction task for ${task.id}`);
        unit.retiredTasks ??= [];
        for (const row of unit.retiredTasks)
          if (row.replacementTaskId === task.id)
            row.replacementTaskId = target.id;
        unit.retiredTasks.push({
          taskId: task.id,
          replacementTaskId: target.id,
          reason:
            "A bare model did not identify an error. Use the existing explicit correction exercise; all earlier work is preserved.",
          retiredOn: "2026-11-06",
        });
        continue;
      }
      const replacement: PracticeTask = {
        ...task,
        id: task.id + suffix,
        version,
        itemFamily: task.itemFamily + suffix,
        contextId: task.contextId + suffix,
        contentReview: "authored",
        sourceId: `authored-prompt-clarity-${version}:${task.id}`,
      };
      const say = task.modality === "speaking";
      if (transfer) {
        replacement.prompt =
          pack.language === "en"
            ? `You are sending a short message to a new classmate. Choose an event or plan from your daily life. ${say ? "Say and record" : "Write"} two connected sentences using “${unit.title}”. Give enough context for your classmate to understand. Give the message itself, not a claim about your grammar ability.`
            : `Du schickst einem neuen Kursmitglied eine kurze Nachricht. Wähle ein Ereignis oder einen Plan aus deinem Alltag. ${say ? "Sprich zwei zusammenhängende Sätze und nimm sie auf" : "Schreibe zwei zusammenhängende Sätze"}. Verwende dabei „${unit.title}“. Gib genug Kontext, damit die andere Person dich versteht. Formuliere die Nachricht selbst, keine Aussage über dein Grammatikkönnen.`;
        replacement.answerPolicy = "open";
        replacement.responseKind = "free_output";
        replacement.acceptedAnswers = [];
        replacement.solution = null;
        replacement.hints = [];
      } else if (badModel) {
        replacement.solution =
          task.constructionId === "de.c.153"
            ? "der Kindergarten"
            : "Nichts ist passiert.";
      } else if (missingExample) {
        const example = unit.examples[0];
        if (!example) throw new Error(`Missing notice example: ${unit.id}`);
        replacement.prompt =
          pack.language === "en"
            ? `Read this example: ${example}\nExplain in your own words what it means and how it illustrates this point: ${unit.commonError}`
            : `Lies dieses Beispiel: ${example}\nErkläre mit eigenen Worten seine Bedeutung und diesen Hinweis dazu: ${unit.commonError}`;
      } else if (missingDraft) {
        replacement.prompt = `First ${say ? "say and record" : "write"} a short note about a hobby, using your own details. Include a consonant-plus-y verb, a final-e verb and a doubled-consonant form. Then edit your note for spelling and punctuation. ${say ? "Write down your recording so you can check its spelling." : "Submit the edited note."}`;
      } else if (missingReferent) {
        replacement.prompt =
          task.constructionId === "de.c.146"
            ? "Wähle eine konkrete Verpflichtung aus deinem Alltag. Formuliere sie zuerst im Hauptsatzperfekt und dann als Begründung mit weil. Person und Zeitbezug müssen gleich bleiben."
            : "Wähle eine Bewertung einer Tätigkeit, zum Beispiel ob du sie leicht oder schwer findest. Formuliere dieselbe Bewertung einmal mit Korrelat-es und einmal mit vorangestellter Infinitivgruppe.";
        if (say)
          replacement.prompt =
            "Sprich deine Antwort laut und nimm sie auf. " + replacement.prompt;
      } else if (missingGermanDraft) {
        replacement.prompt =
          "Schreibe zuerst eine kurze Nachricht über eine Freizeitaktivität deiner Wahl. Überarbeite danach deinen eigenen Text auf Getrennt- und Zusammenschreibung. Prüfe unbekannte lexikalische Fälle im Wörterbuch und gib den überarbeiteten Text ab.";
      }
      unit.tasks.push(replacement);
      unit.retiredTasks ??= [];
      for (const retired of unit.retiredTasks)
        if (retired.replacementTaskId === task.id)
          retired.replacementTaskId = replacement.id;
      unit.retiredTasks.push({
        taskId: task.id,
        replacementTaskId: replacement.id,
        reason:
          "Clarify what response is requested; preserve the earlier definition and all saved work.",
        retiredOn: "2026-11-06",
      });
    }
  }
  if (pack.version < version) pack.version = version;
  return pack;
}
