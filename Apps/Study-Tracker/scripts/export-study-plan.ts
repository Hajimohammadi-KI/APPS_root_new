import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ARTICLE_READING_POLICIES,
  PLAN_VERSION,
  articleReadings,
  learningResources,
  nlpCourseMeta,
  nlpCourseSessions,
  planMeta,
  planWeeks,
  sources,
} from "../app/plan-data";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const outputPath = resolve(
  projectRoot,
  process.argv[2] || "docs/STUDY-TRACKER-PLAN.md",
);

const lines: string[] = [];
const add = (...values: string[]) => lines.push(...values);
const clean = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();
const tableCell = (value: unknown) => clean(value).replace(/\|/g, "\\|");
const generatedDate = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Europe/Berlin",
}).format(new Date());

function sourceMarkdown(sourceId: string) {
  const source = sources[sourceId];
  if (!source) return `\`${sourceId}\``;
  const label = clean(source.label);
  return source.href ? `[${label}](${source.href})` : label;
}

function readingMarkdown(readingId: string) {
  const reading = articleReadings.find((entry) => entry.id === readingId);
  if (!reading) return `\`${readingId}\``;
  return `${sourceMarkdown(reading.sourceId)} (${reading.mode})`;
}

add(
  "# برنامه کامل Study Tracker",
  "",
  `> تولیدشده در ${generatedDate} از داده‌های واقعی \`app/plan-data.ts\`، نسخه برنامه ${PLAN_VERSION}.`,
  "> متن اصلی فعالیت‌ها به زبان آلمانی حفظ شده است تا با برنامه داخل اپلیکیشن دقیقاً یکسان بماند.",
  "",
  "این فایل نسخه قابل‌خواندن و قابل‌چاپ برنامه داخل Study Tracker است. علامت‌زدن چک‌باکس‌های این فایل، وضعیت داخل اپلیکیشن را تغییر نمی‌دهد؛ برای همگام‌سازی پیشرفت باید از خود اپلیکیشن استفاده شود.",
  "",
  "## خلاصه برنامه",
  "",
  "| مورد | مقدار |",
  "| --- | ---: |",
  `| نسخه برنامه | ${PLAN_VERSION} |`,
  `| شروع برنامه | ${planMeta.start} |`,
  `| پایان برنامه | ${planMeta.end} |`,
  `| تعداد هفته‌ها | ${planMeta.totalWeeks} |`,
  `| تعداد روزهای برنامه‌ریزی‌شده | ${planMeta.totalDays} |`,
  `| تعداد ریزفعالیت‌ها | ${planMeta.totalItems} |`,
  `| مقاله‌های برنامه‌ریزی‌شده | ${planMeta.requiredArticleCount} |`,
  `| زمان هر مقاله | ${planMeta.articleHoursPerRequiredReading} ساعت |`,
  `| کل زمان مقاله‌ها | ${planMeta.requiredArticleHours} ساعت |`,
  `| ظرفیت هفتگی | ${planMeta.weeklyCapacityHours} ساعت |`,
  `| کل زمان برنامه | ${planMeta.plannedHours} ساعت |`,
  `| پایان فاز طراحی | ${planMeta.designEnd} |`,
  `| شروع فاز فنی | ${planMeta.technicalStart} |`,
  "",
  "## قانون اجرای روزانه",
  "",
  "1. فقط کوچک‌ترین واحد معنادار همان روز را بخوانید و بعد از فهم آن توقف کنید.",
  "2. خروجی روز باید سه جزء قابل‌ردیابی داشته باشد: **Artefakt + Test + Evidence**.",
  "3. یادداشت روزانه در Tracker حداکثر سه خط است؛ هایلایت، شماره صفحه و ارجاع منبع در Zotero باقی می‌ماند.",
  "4. کارهای عقب‌افتاده فشرده یا دوبرابر نمی‌شوند و محدودیت پزشکی همیشه بر برنامه اولویت دارد.",
  "5. Study Tracker سطح برنامه‌ریزی و کنترل پیشرفت است؛ وجود کارت‌های Roslyn، Neo4j یا Cypher به‌تنهایی اثبات پیاده‌سازی علمی پایان‌نامه نیست.",
  "",
  "## برنامه خواندن مقاله‌ها",
  "",
);

for (const reading of [...articleReadings].sort((a, b) => a.courseOrder - b.courseOrder)) {
  const policy = ARTICLE_READING_POLICIES[reading.mode];
  add(
    `### ${String(reading.courseOrder).padStart(2, "0")}. ${sourceMarkdown(reading.sourceId)}`,
    "",
    `- **شناسه:** \`${reading.id}\``,
    `- **فایل:** \`${reading.fileName}\``,
    `- **حالت مطالعه:** ${reading.mode} — ${policy.label}`,
    `- **وضعیت اولیه در برنامه:** ${reading.status}`,
    `- **جلسه‌های مرتبط:** ${reading.sessionNumbers.length ? reading.sessionNumbers.join(", ") : "—"}`,
    `- **بخش‌های الزامی:** ${policy.requiredSections.join("؛ ")}`,
    `- **تمرکز:** ${reading.readingFocus.join("؛ ")}`,
    `- **ارتباط با پروژه:** ${reading.projectConnection}`,
    "",
  );
}

add(
  "## دوره NLP مرتبط",
  "",
  "| مورد | مقدار |",
  "| --- | --- |",
  `| نام | ${tableCell(nlpCourseMeta.name)} |`,
  `| مدرس | ${tableCell(nlpCourseMeta.instructor)} |`,
  `| پلتفرم | ${tableCell(nlpCourseMeta.platform)} |`,
  `| بازه | ${nlpCourseMeta.startDate} تا ${nlpCourseMeta.endDate} |`,
  `| زمان برلین | ${tableCell(nlpCourseMeta.berlinTime)} |`,
  `| تعداد جلسه | ${nlpCourseMeta.sessionCount} |`,
  "",
);

for (const session of nlpCourseSessions) {
  add(
    `### جلسه ${session.number} — ${session.date} — ${session.title}`,
    "",
    `- **زمان:** ${session.berlinTime} برلین / ${session.iranTime} ایران`,
    `- **موضوع‌ها:** ${session.topics.join("؛ ")}`,
    `- **پرسش پروژه:** ${session.projectQuestion}`,
    `- **کاربرد:** ${session.useCase}`,
    `- **مطالعه مرتبط:** ${session.readingIds.map(readingMarkdown).join("؛ ") || "—"}`,
    `- **تمرکز مطالعه:** ${session.readingFocus.join("؛ ")}`,
    `- **ارتباط با پروژه:** ${session.projectConnection}`,
    `- **هدف استخراج:** ${session.extractionGoal}`,
    `- **چرا مهم است:** ${session.whyThisMattersFa}`,
    `- **اقدام برنامه‌ریزی‌شده:** ${session.plannedActionFa}`,
    "",
    "**پرسش‌های کلاس:**",
    "",
    ...session.classQuestionsFa.map((question) => `- ${question}`),
    "",
  );
}

add("## برنامه هفتگی و روزانه", "");

for (const week of planWeeks) {
  add(
    `## هفته ${week.number} — ${week.title}`,
    "",
    `- **فاز:** ${week.phase}`,
    `- **هدف هفته:** ${week.goal}`,
    `- **خروجی الزامی هفته:** \`${week.weeklyOutput.deliverable}\` (روز \`${week.weeklyOutput.dayId}\`)`,
    `- **بازه:** ${week.days[0]?.date ?? "—"} تا ${week.days.at(-1)?.date ?? "—"}`,
    "",
  );

  for (const [dayIndex, day] of week.days.entries()) {
    add(
      `### روز ${dayIndex + 1} — ${day.date} — ${day.title}`,
      "",
      "| مشخصه | مقدار |",
      "| --- | --- |",
      `| شناسه پایدار | \`${day.id}\` |`,
      `| حالت کار | ${day.workMode === "paper" ? "Paper-only" : "Screen"} |`,
      `| نوع | ${tableCell(day.kind ?? "project")} |`,
      `| ماژول | ${tableCell(day.module)} |`,
      `| خروجی روز | \`${tableCell(day.deliverable)}\` |`,
      `| منبع‌ها | ${day.sourceIds.map(sourceMarkdown).join("؛ ") || "—"} |`,
      `| بخش‌های Exposé | ${day.proposal.length ? day.proposal.join(", ") : "—"} |`,
      "",
      `**دلیل:** ${day.why}`,
      "",
      "#### مسیر تحقیق یا یادگیری",
      "",
      `- **عنوان:** ${day.researchTrack.title}`,
      `- **حالت / بلوک:** ${day.researchTrack.mode}، بلوک ${day.researchTrack.block}/5، ${day.researchTrack.plannedMinutes} دقیقه`,
      `- **فقط این را بخوان:** ${day.researchTrack.readOnly}`,
      `- **امروز نخوان:** ${day.researchTrack.doNotRead}`,
      `- **پرسش راهنما:** ${day.researchTrack.question}`,
      `- **مدرک تحقیق:** \`${day.researchTrack.expectedOutput}\``,
      `- **قانون توقف:** ${day.researchTrack.stopRule}`,
      "",
      "#### پیش‌نیازهای کوتاه",
      "",
    );

    if (!day.learningResourceIds.length) {
      add("- موردی تعریف نشده است.", "");
    } else {
      for (const resourceId of day.learningResourceIds) {
        const resource = learningResources[resourceId];
        if (!resource) {
          add(`- \`${resourceId}\` (منبع تعریف‌شده پیدا نشد)`);
          continue;
        }
        add(
          `- [${resource.title}](${resource.href}) — ${resource.provider}، ${resource.minutes} دقیقه`,
          `  - **بخوان:** ${resource.read}`,
          `  - **به‌کار ببر:** ${resource.apply}`,
        );
      }
      add("");
    }

    add("#### چک‌لیست روز", "");
    for (const task of day.tasks) {
      add(`**${task.title} — ${task.minutes} دقیقه**`, "");
      for (const item of task.items) {
        add(`- [ ] ${item.label} <!-- ${item.id} -->`);
      }
      add("");
    }

    add(
      "#### ثبت نتیجه",
      "",
      "- **Artefakt:**",
      "- **Test / Prüfung:**",
      "- **Evidence:**",
      "- **نتیجه حداکثر سه‌خطی برای Tracker:**",
      "- **قدم بعدی فردا:**",
      "",
    );
  }
}

add("## فهرست منابع", "");
for (const source of Object.values(sources).sort((a, b) => a.label.localeCompare(b.label))) {
  const label = source.href ? `[${source.label}](${source.href})` : source.label;
  add(
    `- ${label} — \`${source.id}\` — priority: ${source.priority}${source.thesisRole ? ` — thesis role: ${source.thesisRole}` : ""}`,
  );
}
add("");

const markdown = `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
const dayHeadingCount = (markdown.match(/^### روز /gm) || []).length;
const checkboxCount = (markdown.match(/^- \[ \] /gm) || []).length;

if (planWeeks.length !== planMeta.totalWeeks) {
  throw new Error(`Week count mismatch: ${planWeeks.length} != ${planMeta.totalWeeks}`);
}
if (dayHeadingCount !== planMeta.totalDays) {
  throw new Error(`Day count mismatch: ${dayHeadingCount} != ${planMeta.totalDays}`);
}
if (checkboxCount !== planMeta.totalItems) {
  throw new Error(`Task item count mismatch: ${checkboxCount} != ${planMeta.totalItems}`);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, markdown, "utf8");

console.log(JSON.stringify({
  outputPath,
  planVersion: PLAN_VERSION,
  weeks: planWeeks.length,
  days: dayHeadingCount,
  checkboxes: checkboxCount,
  articles: articleReadings.length,
  nlpSessions: nlpCourseSessions.length,
  bytes: Buffer.byteLength(markdown, "utf8"),
}, null, 2));
