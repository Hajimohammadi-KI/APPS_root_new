import { readFileSync, writeFileSync } from "node:fs";
const apps = [
  {language:"en", root:"Apps/English/English-Automaticity/apps/web", feature:"features", layout:"app/layout.tsx", key:"grammar-automaticity:v27", provider:"AppStoreProvider"},
  {language:"de", root:"Apps/Deutsch-Automaticity/apps/web", feature:"src/features", layout:"src/app/layout.tsx", key:"GrammarAutomaticityV11_de", provider:"Providers"},
] as const;
for (const app of apps) {
  const en=app.language==="en";
  const path=`${app.root}/${app.feature}/${en?"screens":"settings"}/settings-screen.tsx`;
  let source=readFileSync(path,"utf8");
  source=source.replace(/\s*buildLearningDataExport,/,"").replace(/\s*writeLearningEvidenceLedger,/,"");
  source=source.replace("state, mutate, replaceState","state, mutate").replace("hydrated, importState,","hydrated,");
  source=source.replace('import {\n', 'import { captureCompleteBackup, validateCompleteBackup, restoreCompleteBackup } from "@automaticity/learning-core/automaticity";\nimport {\n');
  const exportStart=source.indexOf(en?"\tasync function exportData()":"  function exportData()");
  const exportEnd=source.indexOf(en?"\n\tasync function selectFolderAndExport":"\n  async function importData",exportStart);
  if(exportStart<0||exportEnd<0)throw new Error(`Export boundary missing ${path}`);
  const exportCode=en?`
  async function exportData() {
    setExporting(true); setExportStatus("");
    let contents: string | null = null;
    try {
      const backup = await captureCompleteBackup({storage: localStorage, indexedDB}, "en", new Date().toISOString(), [["${app.key}", JSON.stringify(state)]]);
      contents = JSON.stringify(backup, null, 2);
      const directory = supportsBackupDirectoryPicker() ? await getBackupDirectory() : null;
      if (directory) { await writeBackupToDirectory(directory, contents); setExportStatus(\x60Complete backup saved to "\x24{directory.name}".\x60); }
      else { downloadBackup(contents); setExportStatus(\x60Complete backup downloaded as "\x24{BACKUP_FILE_NAME}".\x60); }
    } catch (error) {
      if (contents !== null && error instanceof DOMException && ["AbortError", "SecurityError"].includes(error.name)) {
        downloadBackup(contents); setExportStatus("Folder access was unavailable. The complete backup was downloaded instead.");
      } else setExportStatus(error instanceof Error ? error.message : "Backup export failed.");
    } finally { setExporting(false); }
  }
`:`
  async function exportData() {
    setExportStatus("");
    try {
      const backup = await captureCompleteBackup({storage: localStorage, indexedDB}, "de", new Date().toISOString(), [["${app.key}", JSON.stringify(state)]]);
      const url = URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)], {type:"application/json"}));
      const anchor = document.createElement("a"); anchor.href=url;
      anchor.download=\x60DeutschFlow-Lerndaten-\x24{new Date().toISOString().slice(0,10)}.json\x60;
      anchor.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
      setExportStatus("Vollständige Sicherung mit Entwürfen, Nachweisen und Aufnahmen heruntergeladen.");
    } catch(error) {setExportStatus(error instanceof Error ? error.message : "Die Sicherung ist fehlgeschlagen.");}
  }
`;
  source=source.slice(0,exportStart)+exportCode+source.slice(exportEnd);
  const importStart=source.indexOf(en?"\tasync function importData":"  async function importData");
  const importEnd=source.indexOf(en?"\n\treturn (":"\n  return (",importStart);
  if(importStart<0||importEnd<0)throw new Error(`Import boundary missing ${path}`);
  source=source.slice(0,importStart)+`
  async function importData(event: ${en?"React.ChangeEvent":"ChangeEvent"}<HTMLInputElement>) {
    const input=event.currentTarget, file=input.files?.[0]; if(!file)return;
    setImportStatus("");
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const legacy = parseLearningDataExport<typeof state>(parsed, "${app.language}");
      const persistence = {storage: localStorage, indexedDB};
      const backup = legacy
        ? await captureCompleteBackup(persistence, "${app.language}", legacy.exportedAt, [["${app.key}", JSON.stringify(legacy.learnerState)], ["automaticity:learning-evidence:v1", JSON.stringify(legacy.learningEvidence)]])
        : await validateCompleteBackup(parsed, "${app.language}");
      const message = ${JSON.stringify(en?"Close other app tabs before restoring. Replace local learning data with this backup? A recovery copy protects against interruption. The file stays on this device.":"Schließe vor der Wiederherstellung andere App-Tabs. Lokale Lerndaten durch diese Sicherung ersetzen? Eine Wiederherstellungskopie schützt bei Unterbrechungen. Die Datei bleibt auf diesem Gerät.")};
      const legacyNote = legacy ? ${JSON.stringify(en?" This older backup contains no recordings. Existing recordings on this device will be kept.":" Diese ältere Sicherung enthält keine Aufnahmen. Vorhandene Aufnahmen auf diesem Gerät bleiben erhalten.")} : "";
      if(!window.confirm(message + legacyNote)) {setImportStatus(${JSON.stringify(en?"Restore cancelled. Your current data was kept.":"Wiederherstellung abgebrochen. Deine Daten bleiben erhalten.")});return;}
      await restoreCompleteBackup(persistence, backup, "${app.language}");
      window.location.reload();
    } catch(error) {setImportStatus(error instanceof Error ? error.message : ${JSON.stringify(en?"Restore failed. Reopen the app to recover an interrupted restore.":"Wiederherstellung fehlgeschlagen. Öffne die App erneut, um eine unterbrochene Wiederherstellung zurückzusetzen.")});}
    finally {input.value="";}
  }
`+source.slice(importEnd);
  writeFileSync(path,source);
  const boundary=`${app.root}/${app.feature}/${en?"components":"settings"}/learning-recovery-boundary.tsx`;
  writeFileSync(boundary,`"use client";
import {useEffect, useState, type ReactNode} from "react";
import {recoverBeforeMount, preserveLegacyState} from "@automaticity/learning-core/automaticity";
export function LearningRecoveryBoundary({children}:{children:ReactNode}) {
  const [ready,setReady]=useState(false), [error,setError]=useState<string|null>(null);
  useEffect(()=>{let active=true;
    void (async()=>{
      await recoverBeforeMount({storage:localStorage,indexedDB},"${app.language}");
      preserveLegacyState(localStorage,"${app.language}",new Date().toISOString());
      if(active)setReady(true);
    })().catch((reason:unknown)=>{if(active)setError(reason instanceof Error?reason.message:"Storage unavailable");});
    return()=>{active=false;};
  },[]);
  if(error)return <main className="mx-auto max-w-xl p-8" role="alert"><h1>${en?"Learning data needs recovery":"Lerndaten müssen wiederhergestellt werden"}</h1><p>{error}</p><p>${en?"Close other app tabs, then reload. Existing records have been kept.":"Schließe andere App-Tabs und lade diese Seite neu. Vorhandene Daten wurden beibehalten."}</p><button type="button" onClick={()=>window.location.reload()}>${en?"Try recovery again":"Wiederherstellung erneut versuchen"}</button></main>;
  if(!ready)return <p role="status" className="p-8">${en?"Checking saved learning data…":"Gespeicherte Lerndaten werden geprüft…"}</p>;
  return children;
}
`);
  const layout=`${app.root}/${app.layout}`;
  let layoutText=readFileSync(layout,"utf8");
  layoutText=`import { LearningRecoveryBoundary } from "@/features/${en?"components":"settings"}/learning-recovery-boundary";\n`+layoutText;
  layoutText=layoutText.replace(`<${app.provider}>`,`<LearningRecoveryBoundary><${app.provider}>`).replace(`</${app.provider}>`,`</${app.provider}></LearningRecoveryBoundary>`);
  writeFileSync(layout,layoutText);
}
