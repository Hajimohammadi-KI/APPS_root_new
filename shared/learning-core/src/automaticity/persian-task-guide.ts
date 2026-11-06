import type { Language, Modality, Stage } from "./contracts";
import { cyclePromptGuide } from "./cycle-prompt-guide";

const stageLabels: Record<Stage, string> = {
  notice: "الگو را پیدا کن",
  retrieve: "از حافظه پاسخ بده",
  vary: "جمله را تغییر بده",
  produce: "جملهٔ خودت را بساز",
  repair: "خطا را اصلاح کن",
  transfer: "در موقعیت تازه به کار ببر",
  retain: "بعداً دوباره پاسخ بده",
};

const stageActions: Record<Stage, string> = {
  notice: "مثال‌ها را مقایسه کن و بگو این ساختار چه معنی و کاربردی دارد.",
  retrieve: "پیش از دیدن راهنما، شکل درست را از حافظه پیدا کن.",
  vary: "بخش خواسته‌شده را تغییر بده و معنی اصلی را حفظ کن.",
  produce: "با این ساختار یک پیام واقعی و مربوط به زندگی خودت بساز.",
  repair: "خطا را پیدا کن، اصلاحش کن و معنی جمله را نگه دار.",
  transfer: "ببین موقعیت تازه چه می‌خواهد و ساختار را متناسب با آن به کار ببر.",
  retain: "بعد از فاصلهٔ زمانی، بدون نگاه به نمونه دوباره پاسخ بده.",
};

export function persianStageLabel(stage: Stage): string {
  return stageLabels[stage];
}

export function persianStageAction(stage: Stage): string {
  return stageActions[stage];
}

export function persianTaskSteps(
  language: Language,
  stage: Stage,
  modality: Modality,
  prompt: string,
): readonly string[] {
  const target = language === "de" ? "آلمانی" : "انگلیسی";
  // Quoted/source sentences are not commands (e.g. “Choose your seat”).
  const words = prompt.split(/:\s/u, 1)[0]!.toLocaleLowerCase();
  const allWords = prompt.toLocaleLowerCase();
  const submit =
    modality === "speaking"
      ? `پاسخ را به ${target} بلند بگو و ضبط کن. سپس متن ثبت‌شده را بررسی کن.`
      : `پاسخ را به ${target} بنویس. سپس آن را ثبت کن و بازخورد را بخوان.`;
  const authored = cyclePromptGuide(language, stage, prompt);
  if (authored) return [...authored, submit];
  if (
    /^you are sending a short message to a new classmate\.|^du schickst einem neuen kursmitglied eine kurze nachricht\./u.test(
      allWords,
    )
  )
    return [
      "برای یک هم‌کلاسی تازه پیام کوتاهی بساز. یک اتفاق یا برنامه از زندگی روزمرهٔ خودت انتخاب کن.",
      "دو جملهٔ مرتبط با ساختارِ نام‌برده‌شده در سؤال بساز؛ جزئیات کافی بده تا مخاطب منظورت را بفهمد.",
      "خودِ پیام را بنویس یا بگو؛ جمله‌ای مثل «من می‌توانم این گرامر را استفاده کنم» پاسخ این تمرین نیست.",
      submit,
    ];
  if (
    /(?:write|say and record) two new versions\. in the first, change one detail/u.test(
      allWords,
    ) ||
    /(?:schreibe|sprich) zwei neue fassungen/u.test(allWords)
  )
    return [
      "از مثالِ سؤال دو نسخهٔ تازه بساز و هر دو را کامل بنویس یا بگو.",
      "در نسخهٔ اول یک جزئیات، مثلاً شخص، کار، شیء، مکان یا زمان را تغییر بده. در نسخهٔ دوم جزئیات دیگری را عوض کن.",
      "ساختار دستوریِ تمرین را حفظ کن و واژه‌هایی را که باید با هم هماهنگ باشند تغییر بده.",
      submit,
    ];
  let action = stageActions[stage];
  if (/(?<!\p{L})(?:übersetze|translate)(?!\p{L})/u.test(words))
    action = `جملهٔ داده‌شده را به ${target} ترجمه کن؛ معنی آن را حفظ کن.`;
  else if (/write the noun phrase/iu.test(prompt))
    action =
      "واژه‌های داده‌شده را به ترتیب درست در یک عبارت اسمی بنویس؛ جملهٔ کامل لازم نیست.";
  else if (
    /\b(?:write|give|type) only (?:the )?(?:missing )?word|\bwrite only (?:the ).*form|schreibe nur (?:das|ein) (?:fehlende )?wort/u.test(
      words,
    )
  )
    action =
      "فقط واژهٔ خواسته‌شده را بنویس؛ لازم نیست تمام جمله را دوباره بنویسی.";
  else if (/schreibe (?:den|einen weiteren) modellsatz/u.test(words))
    action =
      "جملهٔ نمونهٔ داده‌شده را دقیق بخوان و همان جمله را به آلمانی بنویس.";
  else if (/bilde das perfekt/u.test(words))
    action = "جمله را به گذشتهٔ نقلی (Perfekt) تبدیل کن و شکل فعل را بررسی کن.";
  else if (/entscheide haben oder sein/u.test(words))
    action =
      "برای گذشتهٔ نقلی (Perfekt)، از میان haben و sein فعل کمکی درست را انتخاب کن.";
  else if (/verdichte den satz/u.test(words))
    action = "جمله را کوتاه‌تر بنویس، اما معنی اصلی آن را حفظ کن.";
  else if (/formuliere höflicher/u.test(words))
    action = "همان درخواست را مؤدبانه‌تر بیان کن و معنی آن را نگه دار.";
  else if (/rewrite.*without if.*beginning had/u.test(words))
    action =
      "جملهٔ شرطی را بدون if بازنویسی کن و با Had شروع کن؛ معنی و اطلاعات اصلی را نگه دار.";
  else if (/combine.*although.*which/u.test(words))
    action =
      "اطلاعاتِ سه جمله را در یک جمله ترکیب کن؛ از Although و یک جملهٔ موصولی با which استفاده کن و هیچ اطلاعاتی را حذف نکن.";
  else if (/combine.*into one sentence/u.test(words))
    action =
      "جمله‌های داده‌شده را در یک جمله ترکیب کن؛ اطلاعات و رابطهٔ معنایی آن‌ها را نگه دار.";
  else if (
    /^(?:object|speaker|subject|action|time|sprecher|handlung|gegenstand|zeit)\s*:/u.test(
      allWords,
    )
  )
    action =
      "با اطلاعاتِ داده‌شده دربارهٔ شخص، کار یا زمان، جملهٔ خواسته‌شده را بساز؛ اطلاعات اصلی را تغییر نده.";
  else if (/formuliere denselben wunsch/u.test(words))
    action =
      "همان خواسته را با واژه‌های داده‌شده در دستور بازنویسی کن؛ شخص، کار و معنی اصلی را تغییر نده.";
  else if (/gib .*aussage.*konjunktiv i/u.test(words))
    action =
      "گفتهٔ شخص را به نقل غیرمستقیم در Konjunktiv I تبدیل کن؛ مشخص باشد این گفته از چه کسی است.";
  else if (/formuliere dieselbe möglichkeit/u.test(words))
    action =
      "جمله را با könnte بازنویسی کن؛ پیامد باید همچنان احتمالی باشد، نه قطعی.";
  else if (
    /_{2,}|\b(?:lücke|missing|fehlende|complete the sentence)\b/u.test(words) ||
    /_{2,}/u.test(prompt)
  )
    action = "جای خالی را با شکل درست پر کن و جملهٔ کامل را بساز.";
  else if (/\b(?:ordne|reorder|put .* in order)\b/u.test(words))
    action = "بخش‌های داده‌شده را به ترتیب درست بچین و جملهٔ کامل را بساز.";
  else if (
    /(?<!\p{L})(?:korrigiere|überarbeite|repair|correct(?= (?:the|this|only|each|a)\b))(?!\p{L})/u.test(
      words,
    )
  )
    action = "خطا را پیدا کن، جمله را اصلاح کن و اطلاعات اصلی را تغییر نده.";
  else if (
    /\b(?:wähle|choose|select)\b/u.test(words) &&
    !/choose your own|select your own|wähle (?:eigene|selbst)/u.test(allWords)
  )
    action =
      "از میان شکل‌های داده‌شده، گزینهٔ مناسبِ معنی و موقعیت را انتخاب کن.";
  else if (/explain the rule|erkläre die regel/u.test(words))
    action = "قاعدهٔ موضوعِ نام‌برده‌شده را با واژه‌های خودت توضیح بده.";
  else if (
    stage === "notice" ||
    /(?:explain|erkläre).*(?:pattern|muster|rule|regel)/u.test(words)
  )
    action =
      "مثال‌ها را بخوان و به پرسش دربارهٔ تفاوت یا کاربرد آن‌ها با واژه‌های خودت پاسخ بده.";
  else if (/\b(?:describe|beschreibe|explain|erkläre)\b/u.test(words))
    action =
      "دربارهٔ موضوع خواسته‌شده توضیح بده؛ شخص، اتفاق یا وضعیت موردنظر سؤال را توصیف کن.";
  else if (/\b(?:schreibe|write|formuliere|compose)\b/u.test(words))
    action = "با توجه به موقعیت سؤال، پاسخ خودت را در جملهٔ کامل بساز.";
  const requirements: string[] = [];
  if (
    /beabsichtigte bedeutung auf persisch|first state your intended meaning in persian/u.test(
      allWords,
    )
  )
    requirements.push(
      "ابتدا منظورت را در کادر فارسی بنویس؛ سپس جملهٔ آلمانیِ خودت را در کادر پاسخ بساز.",
    );
  if (/drei persönliche informationen/u.test(words))
    requirements.push("سه نکتهٔ شخصی دربارهٔ خودت بگو.");
  if (/keinen dass-satz/u.test(words))
    requirements.push("از جملهٔ وابسته با dass استفاده نکن.");
  if (/am ende eine einfache frage/u.test(words))
    requirements.push("در پایان یک سؤال ساده از طرف مقابل بپرس.");
  if (
    /four short sentences: one fact, one personal detail, one example, and one question/iu.test(
      prompt,
    )
  )
    requirements.push(
      "چهار جملهٔ کوتاه بساز: یک واقعیت، یک نکتهٔ شخصی، یک مثال و یک سؤال.",
    );
  // Bind counts to the output verb. “Combine two sentences into one” names
  // two INPUT sentences and must not request two answers.
  const count = allWords.match(
    /\b(?:write|say|give|schreibe|sprich|formuliere)\s+(?:exactly |genau )?(one or two|one|two|three|four|1|2|3|4|einen|einem|einer|zwei|drei|vier)\s+(?:(?:short|complete|connected|english|german|deutschen?|kurzen?|vollständigen?|zusammenhängenden?)\s+)*(?:sentences?|sätze|sätzen|satz)\b/u,
  )?.[1];
  const counts: Record<string, string> = {
    "one or two": "یک یا دو",
    one: "یک",
    "1": "یک",
    einen: "یک",
    einem: "یک",
    einer: "یک",
    two: "دو",
    "2": "دو",
    zwei: "دو",
    three: "سه",
    "3": "سه",
    drei: "سه",
    four: "چهار",
    "4": "چهار",
    vier: "چهار",
  };
  if (count && !/four short sentences: one fact/iu.test(prompt))
    requirements.push(
      `${counts[count]} جمله ${modality === "speaking" ? "بگو" : "بنویس"}؛ موضوع و جزئیات را از متن سؤال بردار.`,
    );
  if (/schreibe genau einen vollständigen satz/u.test(words))
    requirements.push("دقیقاً یک جملهٔ کامل بنویس.");
  else if (/schreibe 2 zusammenhängende vollständige sätze/u.test(words))
    requirements.push("دو جملهٔ کامل و مرتبط بنویس.");
  else if (/schreibe 3 zusammenhängende vollständige sätze/u.test(words))
    requirements.push("سه جملهٔ کامل و مرتبط بنویس.");
  return [
    `متن ${target} سؤال و مثال آن را بخوان؛ اول معنی و موقعیت را مشخص کن.`,
    action,
    ...requirements,
    submit,
  ];
}

type Goals = { form: string; meaning: string; use: string };
const cycleGoals: Record<string, Goals> = {
  "en.c.001": {
    form: "فعل be را با فاعل هماهنگ کن: I am، he/she is، you/we/they are.",
    meaning: "بگو یک نفر کیست یا اکنون چه حالتی دارد.",
    use: "خودت را معرفی کن یا آمادگی دیگران را بپرس.",
  },
  "en.c.015": {
    form: "فعل be و شکل ing فعل اصلی را با فاعل هماهنگ کن.",
    meaning: "کاری را که همین حالا جریان دارد از عادت همیشگی جدا کن.",
    use: "دربارهٔ وضعیت موقت یا اتفاق همین لحظه حرف بزن.",
  },
  "en.c.034": {
    form: "بخش شرط را با if و زمان حال، و نتیجه را با will و شکل سادهٔ فعل بساز.",
    meaning: "یک شرط ممکن در آینده را به نتیجهٔ آن وصل کن.",
    use: "دربارهٔ برنامه‌ای که به یک اتفاق آینده وابسته است توافق کن.",
  },
  "en.c.048": {
    form: "در بخش شرط if و گذشتهٔ کامل، و در نتیجه would have و شکل سوم فعل را به کار ببر.",
    meaning: "گذشته‌ای را تصور کن که اتفاق نیفتاده و نتیجهٔ خیالی آن را بگو.",
    use: "دربارهٔ فرصت ازدست‌رفته فکر کن، بی‌آنکه واقعیت را تغییر بدهی.",
  },
  "en.c.058": {
    form: "در شرطِ رسمیِ گذشته، had را پیش از فاعل بیاور و if را حذف کن.",
    meaning: "با تغییر شکل جمله، همان شرطِ غیرواقعیِ گذشته را نگه دار.",
    use: "یک حالتِ خلاف واقع را در نامه‌نگاری رسمی بیان کن.",
  },
  "en.c.072": {
    form: "جملهٔ امتیاز و جملهٔ موصولی را به جملهٔ اصلی وصل کن و هماهنگی فعل‌ها را نگه دار.",
    meaning: "ادعای اصلی را از محدودیت و توضیح پس‌زمینه جدا کن.",
    use: "شواهد را برای خوانندهٔ دقیق با نکته‌سنجی ارائه کن.",
  },
  "de.c.001": {
    form: "شکل فعل sein را با ضمیر شخصی هماهنگ کن؛ مثلاً ich bin و du bist.",
    meaning: "شخص، مکان و وضعیت فعلی را از هم تشخیص بده.",
    use: "خودت را معرفی کن و بگو چه کسی یا چه گروهی آماده است.",
  },
  "de.c.015": {
    form: "فعل haben و قسمت سوم فعل را درست کنار هم به کار ببر و جای فعل را در جمله حفظ کن.",
    meaning: "کاری را بیان کن که در گذشته تمام شده است.",
    use: "دربارهٔ کارهایی که در زندگی روزمره انجام داده‌ای گزارش بده.",
  },
  "de.c.033": {
    form: "شکل مناسب würde را با فاعل و مصدر فعل به کار ببر.",
    meaning: "خواسته‌ای را به صورت یک امکان فرضی بیان کن.",
    use: "خواسته یا پیشنهاد غیرقطعی را مؤدبانه بگو.",
  },
  "de.c.043": {
    form: "برای گذشتهٔ فرضی، hätte یا wäre را با قسمت سوم فعل به کار ببر.",
    meaning: "اتفاق واقعی را از حالت دیگری که رخ نداده جدا کن.",
    use: "دربارهٔ تصمیم‌های گذشته و فرصت‌های ازدست‌رفته فکر کن.",
  },
  "de.c.057": {
    form: "برای نقل غیرمستقیم، شکل سوم‌شخص فعل را در Konjunktiv I بساز.",
    meaning: "حرف منبع را از نظر و ادعای خودت جدا کن.",
    use: "در خلاصه‌ای بی‌طرفانه نشان بده کدام گفته از شخص دیگری است.",
  },
  "de.c.071": {
    form: "فعل وجهی را با فاعل هماهنگ کن و مصدر فعل اصلی را به کار ببر.",
    meaning: "یک امکان را از یک واقعیت قطعی جدا کن.",
    use: "در پیشنهادهای دقیق، میزان اطمینان یا تردید را روشن کن.",
  },
};

export function persianCycleGoals(unitId: string): Goals | null {
  return cycleGoals[unitId] ?? null;
}
