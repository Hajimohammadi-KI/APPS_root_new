import {createHash} from "node:crypto";
import {mkdir,readFile,writeFile} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {grammarUnits as en} from "../Apps/English/English-Automaticity/packages/content/src/index";
import {grammarUnits as de} from "../Apps/Deutsch-Automaticity/packages/content/src/index";
import {GRAMMAR_FAMILIES,validateCurriculum,type ConstructionMapping,type CurriculumPack,type PracticeTask,type FamilyId} from "../shared/learning-core/src/automaticity/curriculum";
import type {Language,Stage} from "../shared/learning-core/src/automaticity/contracts";
const root=resolve(import.meta.dir,"..");
const registryPath=resolve(root,"shared/learning-core/content/construction-map.json");
const hash=(value:string)=>createHash("sha256").update(value).digest("hex").slice(0,16);
const assignments={
  en:"1,4,3,2,3,8,6,12,12,1,10,12,13,2,6,6,6,6,12,7,7,5,5,3,3,5,4,10,6,6,13,6,6,16,16,15,9,10,11,17,12,5,6,6,6,7,7,16,16,10,10,11,11,9,16,18,18,16,2,19,19,19,15,17,18,18,2,19,6,20,18,14,10,16,19,20,20,8,20,19,21,20,19,20,2,13,13,5,9,3,21,14,8,5,10,6,8,6,4,8,14,8,5,19,5,17,7,9,11,10,16,8",
  de:"4,8,6,6,12,12,3,2,2,3,12,10,8,13,6,6,6,2,13,10,5,14,14,14,8,5,18,4,6,6,15,15,16,16,11,11,9,9,14,2,5,12,16,11,11,2,2,5,14,14,15,8,17,8,18,14,17,10,11,2,9,2,18,18,14,19,19,19,20,20,10,18,14,19,20,20,8,19,20,19,19,20,20,20,12,1,7,13,5,1,4,14,3,4,5,15,12,14,14,8,8,7,4,9,5,4,7,11,14,9,8,10,14,13,17,19,14,14,14,5,2,13,8,18,19,6,8,9,17,16,19,18,21,19,4,4,12,19,20,19,10,19,20,20",
};
const prerequisites:Record<string,string[]>={G02:["G01"],G03:["G02"],G04:["G01"],G05:["G02","G03"],G06:["G01"],G07:["G06"],G08:["G01","G02"],G09:["G08"],G10:["G01"],G11:["G06"],G12:["G01"],G13:["G02"],G14:["G01"],G15:["G04","G14"],G16:["G06","G14"],G17:["G06","G14"],G18:["G01"],G19:["G14"],G20:["G14","G19"],G21:["G01"]};
if(Bun.argv.includes("--init")){
  if(await Bun.file(registryPath).exists())throw new Error("Construction map already exists; edit mappings explicitly instead of regenerating IDs.");
  const mappings:ConstructionMapping[]=[];
  for(const [language,units] of [["en",en],["de",de]] as const){
    const families=assignments[language].split(",");if(families.length!==units.length)throw new Error(`${language}: ${families.length} mappings for ${units.length} units`);
    units.forEach((unit,index)=>mappings.push({id:`${language}.c.${String(index+1).padStart(3,"0")}`,language,lessonAlias:`${unit.level}::${unit.title}`,familyIds:[`G${families[index]!.padStart(2,"0")}` as FamilyId],prerequisites:[],review:"authored"}));
  }
  for(const mapping of mappings) mapping.prerequisites=(prerequisites[mapping.familyIds[0]!]??[]).map(family=>mappings.find(row=>row.language===mapping.language&&row.familyIds.includes(family as FamilyId))?.id).filter((id):id is string=>!!id&&id!==mapping.id);
  await mkdir(dirname(registryPath),{recursive:true});await writeFile(registryPath,JSON.stringify({version:"2026-09-05.1",scopeStatus:"proposed-construction-crosswalk-human-review-pending",mappings},null,2)+"\n");
}
const registry=JSON.parse(await readFile(registryPath,"utf8")) as {version:string;mappings:ConstructionMapping[]};
const checkOnly=Bun.argv.includes("--check");
async function output(path:string,contents:string){const target=resolve(root,path);if(checkOnly){if(await readFile(target,"utf8")!==contents)throw new Error(`Stale generated curriculum: ${path}`);}else{await mkdir(dirname(target),{recursive:true});await writeFile(target,contents);}}
const coverage:unknown[]=[];
for(const [language,units,project] of [["en",en,"Apps/English/English-Automaticity"],["de",de,"Apps/Deutsch-Automaticity"]] as const){
  const pack:CurriculumPack={version:"2026-09-05.1",mappingVersion:registry.version,language,units:[]};
  for(const unit of units){
    const alias=`${unit.level}::${unit.title}`;
    const matches=registry.mappings.filter(row=>row.language===language&&row.lessonAlias===alias);
    if(matches.length!==1)throw new Error(`Exactly one stable mapping required: ${language} ${alias}`);
    const mapping=matches[0]!;
    const task=(stage:Stage,index:number,prompt:string,answer:string|null,policy:PracticeTask["answerPolicy"],kind:PracticeTask["responseKind"],modality:"writing"|"speaking"="writing"):PracticeTask=>({id:`${mapping.id}.${stage}.${index}.${modality}`,version:pack.version,constructionId:mapping.id,familyId:mapping.familyIds[0]!,itemFamily:answer?`${language}.item.${hash(answer.normalize("NFC").trim())}`:`${mapping.id}.${stage}.${index}`,contextId:`${mapping.id}.legacy-context.${stage}`,rubricVersion:policy==="closed"?"closed-nfc-case-v1":"open-review-v1",stage,modality,partition:stage==="notice"?"teaching":"practice",transferCondition:stage==="transfer"?"target_named":"none",contentReview:mapping.review,prompt,answerPolicy:policy,responseKind:kind,acceptedAnswers:policy==="closed"&&answer?[answer]:[],hints:[unit.rule],solution:answer,normalisation:{nfc:true,whitespace:true,terminalFullStop:true,preserveCase:true},sourceId:`${language}:authored:${alias}`});
    const tasks:PracticeTask[]=[task("notice",0,language==="en"?"Explain in your own words when this pattern is useful.":"Erkläre mit eigenen Worten, wann dieses Muster sinnvoll ist.",null,"reflection","reflection")];
    unit.exercises.forEach((exercise,index)=>{
      const [prompt,answer]=exercise;
      const metadata=exercise.length>2?exercise[2]:undefined;
      const declaredOpen=metadata&&"answerRole" in metadata&&metadata.answerRole==="inspiration";
      const kind:PracticeTask["responseKind"]= /_{2,}|…|\.\.\./u.test(prompt)?"cloze":/^(correct|korrigiere|verbessere)\b/iu.test(prompt)?"correction":/^(choose|wähle|ergänze|complete)\b/iu.test(prompt)?"choice":/^(change|transform|wandle|setze)\b/iu.test(prompt)?"transformation":"free_output";
      const policy=declaredOpen||kind==="free_output"?"open":"closed";
      const entry=task(kind==="correction"?"repair":kind==="transformation"?"vary":"retrieve",index,prompt,answer,policy,kind);
      if(policy==="closed"&&metadata&&"acceptedAnswers" in metadata)entry.acceptedAnswers.push(...(metadata.acceptedAnswers??[]));
      tasks.push(entry);
    });
    const own=language==="en"?`Use ${unit.title} to explain something from your own life. Keep the meaning clear. Different correct answers are possible.`:`Verwende ${unit.title}, um etwas aus deinem eigenen Alltag zu erklären. Achte auf eine klare Bedeutung. Verschiedene richtige Antworten sind möglich.`;
    tasks.push(task("produce",0,own,null,"open","free_output"),task("produce",1,own,null,"open","free_output","speaking"));
    tasks.push(task("vary",99,unit.recallTest||own,null,"open","free_output"));
    tasks.push(task("repair",99,unit.repairTest||unit.commonError,null,"open","free_output"));
    tasks.push(task("transfer",0,unit.transferTest||own,null,"open","free_output"),task("transfer",1,unit.transferTest||own,null,"open","free_output","speaking"));
    tasks.push(task("retain",0,language==="en"?`Without reopening the explanation, give a new example of ${unit.title} and explain its meaning.`:`Gib ohne erneute Erklärung ein neues Beispiel für ${unit.title} und erkläre seine Bedeutung.`,null,"open","free_output"));
    // Author every stage for both modalities. Spoken prompts require an audio
    // review; a transcript must never inherit the written exact-answer checker.
    if(!tasks.some(entry=>entry.stage==="retrieve"))tasks.push(task("retrieve",99,unit.recallTest||own,null,"open","free_output"));
    for(const stage of ["notice","retrieve","vary","produce","repair","transfer","retain"] as const){
      if(!tasks.some(entry=>entry.stage===stage&&entry.modality==="speaking")){
        const written=tasks.find(entry=>entry.stage===stage&&entry.modality==="writing")!;
        const spoken=task(stage,98,(language==="en"?"Say your answer aloud and record it. ":"Sprich deine Antwort laut und nimm sie auf. ")+written.prompt,written.solution,"open","free_output","speaking");
        spoken.itemFamily=written.itemFamily;tasks.push(spoken);
      }
    }
    const result={id:mapping.id,language,title:unit.title,level:unit.level,familyIds:mapping.familyIds,prerequisites:mapping.prerequisites,lessonAlias:alias,rule:unit.rule,examples:[...unit.examples],commonError:unit.commonError,review:mapping.review,sources:unit.links.filter(link=>/^https?:\/\//.test(link[1])).map(link=>({title:link[0],url:link[1]})),tasks};
    pack.units.push(result);
    for(const stage of ["notice","retrieve","vary","produce","repair","transfer","retain"] as const)for(const modality of ["writing","speaking"] as const){
      const matching=tasks.filter(task=>task.stage===stage&&task.modality===modality);
      coverage.push({language,constructionId:mapping.id,families:mapping.familyIds,stage,modality,status:matching.length?"authored":"missing",taskIds:matching.map(task=>task.id),humanReview:"pending",evaluator:matching.some(task=>task.answerPolicy==="closed")?"closed-nfc-case-v1":"human-review-required",releaseEligible:false});
    }
  }
  const issues=validateCurriculum(pack);if(issues.length)throw new Error(issues.join("\n"));
  if(registry.mappings.filter(row=>row.language===language).length!==pack.units.length)throw new Error(`Orphan ${language} mapping`);
  await output(`${project}/apps/web/public/learning-core/curriculum-${language}.json`,JSON.stringify(pack)+"\n");
  console.log(`${language}: ${pack.units.length} stable construction mappings, ${pack.units.reduce((n,unit)=>n+unit.tasks.length,0)} typed practice tasks`);
}
const gaps=coverage.filter(row=>(row as {status:string}).status==="missing");
await output("docs/automaticity-coverage.json",JSON.stringify({version:"2026-09-05.1",scope:"Current catalog crosswalk. Reference review may add constructions. Authored tasks are not curriculum completion.",families:GRAMMAR_FAMILIES,cells:coverage,summary:{cells:coverage.length,missing:gaps.length,reviewed:0,releaseEligible:0}},null,2)+"\n");
await output("docs/automaticity-coverage-backlog.json",JSON.stringify(coverage.map((row,index)=>({id:`COVER-${String(index+1).padStart(4,"0")}`,...row as object,work:"Review construction, task semantics and assessment support; implement or author missing stage; verify on learner route."})),null,2)+"\n");
