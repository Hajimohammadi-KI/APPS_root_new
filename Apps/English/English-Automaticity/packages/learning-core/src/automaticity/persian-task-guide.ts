import type { Language, Modality, Stage } from "./contracts";

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
  const words = prompt.toLocaleLowerCase();
  let action = stageActions[stage];
  if (/schreibe (?:den|einen weiteren) modellsatz/u.test(words))
    action =
      "جملهٔ نمونهٔ داده‌شده را دقیق بخوان و همان جمله را به آلمانی بنویس.";
  else if (/bilde das perfekt/u.test(words))
    action = "جمله را به گذشتهٔ کامل (Perfekt) تبدیل کن و شکل فعل را بررسی کن.";
  else if (/entscheide haben oder sein/u.test(words))
    action =
      "برای زمان گذشتهٔ کامل، از میان haben و sein فعل کمکی درست را انتخاب کن.";
  else if (/verdichte den satz/u.test(words))
    action = "جمله را کوتاه‌تر بنویس، اما معنی اصلی آن را حفظ کن.";
  else if (/formuliere höflicher/u.test(words))
    action = "همان درخواست را مؤدبانه‌تر بیان کن و معنی آن را نگه دار.";
  else if (
    /_{2,}|\b(?:lücke|missing|fehlende|complete the sentence)\b/u.test(words)
  )
    action = "جای خالی را با شکل درست پر کن و جملهٔ کامل را بساز.";
  else if (/\b(?:ordne|reorder|put .* in order)\b/u.test(words))
    action = "بخش‌های داده‌شده را به ترتیب درست بچین و جملهٔ کامل را بساز.";
  else if (/\b(?:korrigiere|correct|repair|überarbeite)\b/u.test(words))
    action = "خطا را پیدا کن، جمله را اصلاح کن و اطلاعات اصلی را تغییر نده.";
  else if (/\b(?:wähle|choose|select)\b/u.test(words))
    action =
      "از میان شکل‌های داده‌شده، گزینهٔ مناسبِ معنی و موقعیت را انتخاب کن.";
  else if (/\b(?:erkläre|explain|describe)\b/u.test(words))
    action = "با واژه‌های خودت توضیح بده این ساختار چه معنی و کاربردی دارد.";
  else if (/\b(?:schreibe|write|formuliere|compose)\b/u.test(words))
    action = "با توجه به موقعیت سؤال، پاسخ خودت را در جملهٔ کامل بساز.";
  const requirements: string[] = [];
  if (/drei persönliche informationen/u.test(words))
    requirements.push("سه اطلاعات شخصی دربارهٔ خودت بگو.");
  if (/am ende eine einfache frage/u.test(words))
    requirements.push("در پایان یک سؤال ساده از طرف مقابل بپرس.");
  if (/four short sentences/u.test(words))
    requirements.push(
      "چهار جملهٔ کوتاه بساز: یک واقعیت، یک نکتهٔ شخصی، یک مثال و یک سؤال.",
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
    modality === "speaking"
      ? `پاسخ را به ${target} بلند بگو و ضبط کن. سپس متن ثبت‌شده را بررسی کن.`
      : `پاسخ را به ${target} بنویس. سپس آن را ثبت کن و بازخورد را بخوان.`,
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
