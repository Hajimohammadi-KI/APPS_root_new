import type { CurriculumPack, ConstructionUnit } from "./curriculum";
import type { ConstructionProgress } from "./evidence";
export interface DailySelection { focus: ConstructionUnit[]; repairs: ConstructionProgress[]; reason: "due_review" | "repair" | "diagnostic" | "continued_practice" }
const seed = (value:string) => [...value].reduce((n,c)=>(Math.imul(n,31)+c.charCodeAt(0))>>>0,2166136261);
/** Small, explainable baseline policy. No reward model chooses learning evidence. */
export function selectDailyFocus(pack:CurriculumPack,progress:readonly ConstructionProgress[],now:string,level:string,limit=2):DailySelection{
  const repairs=progress.filter(row=>row.practiceFailures>0||(row.accuracy!==null&&row.accuracy<0.8)).sort((a,b)=>b.practiceFailures-a.practiceFailures||(a.accuracy??1)-(b.accuracy??1)).slice(0,5);
  const byId=new Map<string,ConstructionProgress[]>();for(const row of progress)byId.set(row.constructionId,[...(byId.get(row.constructionId)??[]),row]);
  const familyCounts=new Map<string,number>();for(const unit of pack.units)for(const family of unit.familyIds)familyCounts.set(family,(familyCounts.get(family)??0)+(byId.get(unit.id)??[]).reduce((n,row)=>n+row.attempts,0));
  const eligible=pack.units.filter(unit=>unit.level===level||byId.get(unit.id)?.some(row=>row.nextReviewAt&&Date.parse(row.nextReviewAt)<=Date.parse(now)));
  const ranked=(eligible.length?eligible:pack.units).map(unit=>{
    const rows=byId.get(unit.id)??[];
    const due=rows.some(row=>row.nextReviewAt&&Date.parse(row.nextReviewAt)<=Date.parse(now));
    const repair=repairs.some(row=>row.constructionId===unit.id);
    const tried=rows.reduce((n,row)=>n+row.attempts,0);
    return {unit,due,repair,tried,score:(due?-10000:repair?-5000:0)+tried*50+Math.min(...unit.familyIds.map(id=>familyCounts.get(id)??0))*3+seed(`${now.slice(0,10)}:${unit.id}`)%17};
  }).sort((a,b)=>a.score-b.score||a.unit.id.localeCompare(b.unit.id));
  const selected=ranked.slice(0,Math.max(1,Math.min(2,limit)));
  return {focus:selected.map(row=>row.unit),repairs,reason:selected.some(row=>row.due)?"due_review":selected.some(row=>row.repair)?"repair":selected.some(row=>!row.tried)?"diagnostic":"continued_practice"};
}
