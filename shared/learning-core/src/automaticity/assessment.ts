import { parseAutomaticityEvent, type AssessmentEvent, type AttemptEvent } from "./contracts";
import type { PracticeTask } from "./curriculum";
export function normaliseAnswer(text:string,task:PracticeTask):string {
  let value=text.normalize("NFC").trim().replace(/\s+/gu," ");
  if(task.normalisation.terminalFullStop)value=value.replace(/(?<!\.)\.$/u,"");
  return value;
}
/** Practice feedback is independent of approved mastery/evaluator scope. */
export function assessControlledTask(attempt:AttemptEvent,task:PracticeTask,at:string,id:string):AssessmentEvent {
  const english=attempt.language==="en";
  const base:AssessmentEvent={version:2,type:"assessment",id,language:attempt.language,at,attemptId:attempt.id,responseSha256:attempt.response.sha256,taskVersion:task.version,rubricVersion:task.rubricVersion,verdict:"not_assessed",dimensions:{grammar:"unknown",target:"unknown",relevance:"unknown",opportunities:null},evaluator:{id:"controlled-answer",version:"1.0.0",kind:"rule",scopeApproved:false,reviewId:null},uncertainty:true,confidence:null,feedback:english?"Saved for practice. This open response needs a suitable grammar review before it can count as checked evidence.":"Als Übung gespeichert. Diese offene Antwort benötigt eine passende Grammatikprüfung, bevor sie als geprüfter Nachweis zählt.",correction:null,spans:[],supersedes:null};
  if(!attempt.response.text.trim()){base.feedback=english?"Add your own response before checking.":"Ergänze zuerst deine eigene Antwort.";return base;}
  if(task.answerPolicy!=="closed")return base;
  const value=normaliseAnswer(attempt.response.text,task);
  const accepted=task.acceptedAnswers.some(answer=>normaliseAnswer(answer,task)===value);
  if(accepted){
    base.verdict="pass";base.uncertainty=false;base.dimensions={grammar:"pass",target:"observed",relevance:"pass",opportunities:1};base.feedback=english?"This matches an accepted form for this controlled task. Now use the pattern in your own words.":"Diese Antwort entspricht einer zulässigen Form der kontrollierten Aufgabe. Verwende das Muster nun mit eigenen Worten.";
  }else{
    const caseOnly=task.acceptedAnswers.some(answer=>normaliseAnswer(answer,task).toLocaleLowerCase(attempt.language)===value.toLocaleLowerCase(attempt.language));
    if(caseOnly&&task.modality==="writing"){
      base.verdict="needs_repair";base.uncertainty=false;base.dimensions={grammar:"fail",target:"observed",relevance:"pass",opportunities:1};base.feedback=english?"Check the capitalization, including sentence starts and names.":"Prüfe die Groß- und Kleinschreibung, besonders am Satzanfang und bei Nomen.";
    }else base.feedback=english?"Your answer differs from the stored forms. It has been saved without a correctness score. Compare the meaning or request a review; a different correct answer should not be marked wrong.":"Deine Antwort unterscheidet sich von den gespeicherten Formen. Sie wurde ohne Richtigkeitswert gespeichert. Vergleiche die Bedeutung oder lasse sie prüfen; eine andere richtige Antwort soll nicht als falsch gelten.";
  }
  return parseAutomaticityEvent(base,attempt.language) as AssessmentEvent;
}
export interface ModelScopeApproval { evaluatorId:string; evaluatorVersion:string; language:"en"|"de"; constructionIds:string[]; rubricVersions:string[]; modalities:("writing"|"speaking")[]; benchmarkSha256:string; approved:boolean }
/** Only pinned, separately benchmarked scopes may enter the evidence reducer. */
export function validateModelAssessment(proposal:unknown,attempt:AttemptEvent,approval:ModelScopeApproval):AssessmentEvent {
  const parsed=parseAutomaticityEvent(proposal,attempt.language);
  if(parsed.type!=="assessment"||parsed.evaluator.kind!=="transformer"||parsed.attemptId!==attempt.id||parsed.responseSha256!==attempt.response.sha256||parsed.taskVersion!==attempt.task.version||parsed.rubricVersion!==attempt.task.rubricVersion||parsed.spans.some(span=>span.end>attempt.response.text.length))throw new Error("Model response does not match the original attempt.");
  if(!approval.approved||approval.language!==attempt.language||approval.evaluatorId!==parsed.evaluator.id||approval.evaluatorVersion!==parsed.evaluator.version||!approval.constructionIds.includes(attempt.task.constructionId)||!approval.rubricVersions.includes(attempt.task.rubricVersion)||!approval.modalities.includes(attempt.task.modality)||!/^[a-f0-9]{64}$/.test(approval.benchmarkSha256))throw new Error("This model scope has not passed its benchmark gate.");
  return {...parsed,evaluator:{...parsed.evaluator,scopeApproved:true,reviewId:approval.benchmarkSha256}};
}
