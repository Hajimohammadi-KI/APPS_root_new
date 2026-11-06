import type { Language, Stage } from "./contracts";

// Match the authored question exactly. A changed question must not inherit stale
// requirements. This is instruction text, never a model answer or a rubric.
const questions: Record<string, readonly [string, readonly string[]][]> = {
  en: [
    [
      "Compare ‘I am a nurse’ and ‘I am tired’. Which describes a job and which describes a present state? Explain in your own words.",
      [
        "دو جملهٔ سؤال را مقایسه کن: کدام دربارهٔ شغل است و کدام حال فعلیِ گوینده را می‌گوید؟",
        "برای هر جمله دلیل کوتاهی بنویس. لازم نیست جمله‌ها را تغییر بدهی.",
      ],
    ],
    [
      "Compare ‘She works at home every Friday’ and ‘She is working at home today’. What does each tell you about the timing? Explain the difference.",
      [
        "دو جملهٔ سؤال را از نظر زمان انجام کار مقایسه کن.",
        "توضیح بده کدام کار یک عادت تکراری است و کدام فقط امروز در جریان است؛ به واژه‌های زمان توجه کن.",
      ],
    ],
    [
      "Compare ‘If the bus arrives soon, we will catch the train’ and ‘The bus always arrives at six’. Which proposes a future condition, and which reports a routine? Explain.",
      [
        "دو جملهٔ سؤال را مقایسه کن: کدام یک شرط برای آینده می‌سازد و کدام یک اتفاق همیشگی را گزارش می‌کند؟",
        "برای انتخابت دلیل کوتاهی بنویس و رابطهٔ شرط و نتیجه را مشخص کن.",
      ],
    ],
    [
      "Compare ‘If I have time, I will help’ and ‘If I had had time, I would have helped’. Which leaves the help possible, and which looks back on an unreal past? Explain.",
      [
        "دو جملهٔ شرطیِ سؤال را مقایسه کن.",
        "توضیح بده در کدام جمله کمک‌کردن هنوز ممکن است و کدام دربارهٔ گذشته‌ای است که اتفاق نیفتاده است.",
      ],
    ],
    [
      "Compare ‘If we had received notice, we would have attended’ and ‘Had we received notice, we would have attended’. Does the event history change? Explain the change in style and word order.",
      [
        "دو جملهٔ سؤال را مقایسه کن: آیا جابه‌جایی واژه‌ها، اتفاقِ گذشته را هم تغییر داده است؟",
        "تفاوت ترتیب واژه‌ها و میزان رسمی‌بودن را توضیح بده؛ قرار نیست داستان تازه‌ای بسازی.",
      ],
    ],
    [
      "Read ‘Although the trial was short, its protocol, which was published in advance, reassured the panel’. Identify the limitation, the main claim and the background detail. Explain how the reader can keep them separate.",
      [
        "جملهٔ سؤال دربارهٔ یک آزمایش و روش ازپیش‌منتشرشدهٔ آن را بخوان.",
        "سه بخش را مشخص کن: محدودیت آزمایش، ادعای اصلی و توضیح تکمیلی. بگو پیوندهای جمله چگونه آن‌ها را از هم جدا می‌کنند.",
      ],
    ],
    [
      "Write two short sentences introducing yourself to a new classmate. Include your name or role and how you feel today.",
      [
        "برای هم‌کلاسی تازه‌ات دو جملهٔ کوتاه بنویس.",
        "جملهٔ اول: نام یا نقش خودت را بگو. جملهٔ دوم: بگو امروز چه حالی داری.",
        "این یک پاسخ شخصی است؛ نام و احساس خودت را انتخاب کن و متن سؤال را کپی نکن.",
      ],
    ],
    [
      "A visitor is looking for the right room. Write a short welcome message explaining who you are, where the group is and whether everyone is ready to start.",
      [
        "یک مهمان اتاق درست را پیدا نمی‌کند. برایش یک پیام خوشامد کوتاه بنویس.",
        "در پیام سه نکته را بگو: تو چه کسی هستی، گروه کجاست و آیا همه برای شروع آماده‌اند.",
      ],
    ],
    [
      "Write a message about two things happening around you now. Explain why one of them matters to you.",
      [
        "در یک پیام، دو اتفاق را که همین حالا اطرافت در جریان‌اند توصیف کن.",
        "سپس بگو چرا یکی از این دو اتفاق برایت مهم است.",
      ],
    ],
    [
      "You cannot join an online meeting yet because there is an interruption at home. Send the organiser a brief update about the situation and say what you will do next.",
      [
        "به‌دلیل مشکلی در خانه هنوز نمی‌توانی وارد جلسهٔ آنلاین شوی. برای برگزارکننده پیام کوتاهی بنویس.",
        "توضیح بده اکنون چه اتفاقی افتاده و بعد از آن چه خواهی کرد.",
      ],
    ],
    [
      "Write a realistic plan for your coming weekend. Explain what you intend to do and how a possible change in circumstances would affect your plan.",
      [
        "برای آخر هفتهٔ پیش رو یک برنامهٔ واقعی بنویس.",
        "بگو چه کاری می‌خواهی انجام بدهی و اگر شرایط عوض شود، برنامه‌ات چه تغییری می‌کند.",
      ],
    ],
    [
      "You are coordinating a school trip. A parent asks what will happen if the museum closes unexpectedly. Reply with a practical alternative and explain when you will confirm the arrangements.",
      [
        "مسئول هماهنگی اردوی مدرسه هستی. یکی از والدین می‌پرسد: اگر موزه ناگهان بسته باشد چه می‌کنید؟",
        "در پاسخ یک برنامهٔ جایگزینِ عملی پیشنهاد بده و بگو چه زمانی برنامهٔ نهایی را اعلام می‌کنی.",
      ],
    ],
    [
      "Describe a small past decision of your own and an alternative result you now imagine. Make clear what actually happened and what did not.",
      [
        "یک تصمیم کوچک از گذشتهٔ خودت را توصیف کن.",
        "بگو واقعاً چه اتفاقی افتاد و اگر تصمیم یا شرایط فرق می‌کرد، چه نتیجهٔ دیگری ممکن بود رخ بدهد. واقعیت و حالت خیالی را روشن جدا کن.",
      ],
    ],
    [
      "A project review asks why a delivery failed. The address was corrected only after the driver left. Write a tactful explanation of how earlier information could have changed the outcome, then suggest a practical improvement.",
      [
        "برای بازبینی یک پروژه توضیح بده چرا تحویل انجام نشد: نشانی فقط بعد از رفتن راننده اصلاح شده بود.",
        "محترمانه بنویس اگر اطلاعات زودتر رسیده بود، نتیجه چطور می‌توانست فرق کند؛ سپس یک راهکار عملی برای دفعهٔ بعد پیشنهاد بده.",
      ],
    ],
    [
      "Write a short formal reflection on a missed opportunity of your own. Give the actual outcome and describe how earlier knowledge might have changed it.",
      [
        "دربارهٔ یک فرصت ازدست‌رفتهٔ خودت متن کوتاه و رسمی بنویس.",
        "نتیجهٔ واقعی را بگو و توضیح بده اگر زودتر خبر داشتی، نتیجه چگونه ممکن بود تغییر کند.",
      ],
    ],
    [
      "Reply to a formal complaint about a cancelled appointment. You received no notice of the cancellation. Explain the consequence of that missing information and propose a remedy in a professional tone.",
      [
        "به یک شکایت رسمی دربارهٔ قرار لغوشده پاسخ بده. به تو خبر نداده بودند که قرار لغو شده است.",
        "با لحن حرفه‌ای پیامدِ بی‌خبری را توضیح بده و یک راه‌حل پیشنهاد کن.",
      ],
    ],
    [
      "Write a short paragraph about evidence for a decision you care about. State a claim, acknowledge a limitation and add a relevant background detail without making the message hard to follow.",
      [
        "دربارهٔ شواهدِ یک تصمیم مهم برای خودت یک بند کوتاه بنویس.",
        "ادعای اصلی، یک محدودیتِ شواهد و یک نکتهٔ مرتبط دربارهٔ زمینهٔ موضوع را بیان کن؛ ارتباط جمله‌ها روشن باشد.",
      ],
    ],
    [
      "A city council is considering an experimental transport scheme. Write a concise recommendation that weighs one reported benefit against a limitation of the evidence and explains what further information the council needs.",
      [
        "شورای شهر یک طرح آزمایشی حمل‌ونقل را بررسی می‌کند. یک پیشنهاد کوتاه برای شورا بنویس.",
        "یک فایدهٔ گزارش‌شده را در کنار یک محدودیتِ شواهد بسنج و بگو پیش از تصمیم چه اطلاعات دیگری لازم است.",
      ],
    ],
  ],
  de: [
    [
      "Vergleiche: ‚Wir sind Studierende‘ und ‚Wir sind müde‘. Welcher Satz nennt eine Rolle und welcher einen Zustand? Erkläre den Unterschied mit eigenen Worten.",
      [
        "دو جملهٔ سؤال را مقایسه کن: کدام نقش افراد را معرفی می‌کند و کدام وضعیت فعلی آن‌ها را می‌گوید؟",
        "تفاوت را با واژه‌های خودت توضیح بده؛ لازم نیست جمله‌ها را تغییر بدهی.",
      ],
    ],
    [
      "Vergleiche: ‚Ich koche heute Suppe‘ und ‚Ich habe gestern Suppe gekocht‘. Welche Tätigkeit ist als vergangen dargestellt? Erkläre, welche Wörter das zeigen.",
      [
        "دو جملهٔ سؤال دربارهٔ پختن سوپ را مقایسه کن.",
        "بگو کدام جمله به گذشته مربوط است و کدام واژه‌ها یا شکل فعل این موضوع را نشان می‌دهند.",
      ],
    ],
    [
      "Vergleiche: ‚Wir fahren am Freitag ans Meer‘ und ‚Wir würden gern ans Meer fahren‘. Welcher Satz stellt einen Plan als fest dar und welcher einen Wunsch? Erkläre.",
      [
        "دو جملهٔ سؤال دربارهٔ رفتن به کنار دریا را مقایسه کن.",
        "بگو کدام جمله یک برنامهٔ قطعی و کدام یک خواسته را بیان می‌کند؛ برای انتخابت دلیل بیاور.",
      ],
    ],
    [
      "Vergleiche: ‚Wenn ich Zeit habe, komme ich mit‘ und ‚Wenn ich Zeit gehabt hätte, wäre ich mitgekommen‘. Bei welchem Satz ist das Mitkommen noch offen? Was sagt der andere über die Vergangenheit?",
      [
        "دو جملهٔ شرطیِ سؤال را مقایسه کن.",
        "بگو در کدام جمله همراه‌شدن هنوز ممکن است و جملهٔ دیگر چه چیزی دربارهٔ گذشته و همراه‌نشدن می‌گوید.",
      ],
    ],
    [
      "Vergleiche: ‚Die Firma ist zahlungsfähig‘ und ‚Die Sprecherin erklärt, die Firma sei zahlungsfähig‘. Wer verantwortet die Aussage jeweils? Erkläre, ohne aus der zweiten Aussage Wahrheit oder Unwahrheit abzuleiten.",
      [
        "دو جملهٔ سؤال دربارهٔ توانایی پرداختِ یک شرکت را مقایسه کن.",
        "بگو در هر جمله چه کسی مسئول ادعاست: نویسنده یا سخنگو؟ گزارشِ حرف سخنگو به‌تنهایی درستی یا نادرستی آن را ثابت نمی‌کند.",
      ],
    ],
    [
      "Vergleiche: ‚Die Änderung verursacht Verzögerungen‘ und ‚Die Änderung könnte Verzögerungen verursachen‘. Welcher Satz behauptet eine Folge und welcher hält sie für möglich? Erkläre die unterschiedliche Stärke der Aussage.",
      [
        "دو جملهٔ سؤال دربارهٔ ایجاد تأخیر را مقایسه کن.",
        "بگو کدام پیامد را قطعی بیان می‌کند و کدام آن را فقط ممکن می‌داند؛ تفاوت میزان اطمینان را توضیح بده.",
      ],
    ],
    [
      "Stelle dich einer neuen Lerngruppe in zwei kurzen Sätzen vor. Sage, wer du bist und wie es dir heute geht.",
      [
        "خودت را به یک گروه تازهٔ یادگیری معرفی کن. دو جملهٔ کوتاه بنویس.",
        "جملهٔ اول: نام یا نقش خودت را بگو. جملهٔ دوم: بگو امروز چه حالی داری؛ مثلاً خسته، خوشحال یا آماده‌ای.",
        "این یک پاسخ شخصی است؛ نام و احساس خودت را انتخاب کن و متن سؤال را کپی نکن.",
      ],
    ],
    [
      "Eine neue Kollegin sucht euer Team. Schreibe eine kurze Begrüßung: Wer seid ihr, wo seid ihr und ist die Gruppe bereit anzufangen?",
      [
        "یک همکار تازه دنبال گروه شما می‌گردد. برایش یک پیام خوشامد کوتاه بنویس.",
        "در پیام سه نکته را بگو: شما چه کسانی هستید، کجا هستید و آیا گروه برای شروع آماده است.",
      ],
    ],
    [
      "Schreibe einer Freundin, was du gestern erledigt hast und was noch offen ist. Verwende eigene konkrete Tätigkeiten.",
      [
        "برای یک دوست پیام بنویس: دیروز چه کارهایی را انجام دادی و چه کاری هنوز باقی مانده است؟",
        "کارهای مشخصی از زندگی خودت انتخاب کن و انجام‌شده‌ها را از کارهای باقی‌مانده جدا کن.",
      ],
    ],
    [
      "Du übergibst eine Schicht im Café. Schreibe dem nächsten Team eine kurze Nachricht: Was ist schon erledigt, und was muss es noch tun?",
      [
        "شیفت کارت در کافه تمام شده و کار را به گروه بعدی تحویل می‌دهی. برای آن‌ها یک یادداشت کوتاه بنویس.",
        "بگو کدام کارها انجام شده‌اند و گروه بعدی هنوز چه کارهایی باید انجام بدهد.",
      ],
    ],
    [
      "Schreibe zwei eigene Wünsche für eine freie Woche. Erkläre auch, was dir daran gefällt.",
      [
        "دو آرزوی خودت را برای یک هفتهٔ آزاد بنویس.",
        "توضیح بده در هر کدام چه چیزی برایت خوشایند است.",
      ],
    ],
    [
      "Deine Gruppe plant einen gemeinsamen Ausflug, hat sich aber noch nicht entschieden. Schlage ein Ziel höflich vor und frage die anderen nach ihrer Meinung.",
      [
        "گروه شما می‌خواهد به گردش برود، اما هنوز مقصد را انتخاب نکرده است.",
        "یک مقصد را مؤدبانه پیشنهاد بده و نظر دیگران را بپرس.",
      ],
    ],
    [
      "Beschreibe eine kleine verpasste Gelegenheit aus deinem Alltag. Trenne klar, was tatsächlich geschah und wie es unter anderen Umständen hätte ausgehen können.",
      [
        "یک فرصت کوچک ازدست‌رفته از زندگی روزمره‌ات را توصیف کن.",
        "بگو واقعاً چه اتفاقی افتاد و اگر شرایط فرق می‌کرد، چه نتیجهٔ دیگری ممکن بود رخ بدهد. واقعیت و حالت خیالی را روشن جدا کن.",
      ],
    ],
    [
      "Eine Kollegin fragt, warum ihr eine Besprechung verpasst habt. Der Termin wurde euch zu spät mitgeteilt. Erkläre den möglichen anderen Verlauf sachlich und schlage eine Verbesserung für die nächste Einladung vor.",
      [
        "همکارت می‌پرسد چرا جلسه را از دست دادید. زمان جلسه خیلی دیر به شما اطلاع داده شده بود.",
        "بی‌طرفانه توضیح بده با اطلاع زودتر، نتیجه چگونه می‌توانست فرق کند؛ سپس برای دعوت بعدی یک راهکار پیشنهاد بده.",
      ],
    ],
    [
      "Fasse eine kurze Aussage zusammen, die dir jemand mitgeteilt hat. Mache deutlich, von wem sie stammt und dass du sie hier nur wiedergibst.",
      [
        "گفتهٔ کوتاهی را که از کسی شنیده‌ای خلاصه کن.",
        "منبع گفته را نام ببر و روشن کن که فقط حرف او را گزارش می‌کنی، نه اینکه درستی آن را تأیید کنی.",
      ],
    ],
    [
      "Du schreibst ein neutrales Sitzungsprotokoll. Die Projektleiterin kündigt an, dass die Lieferung pünktlich ankommt; eine Bestätigung fehlt noch. Berichte ihre Ankündigung und benenne die offene Prüfung, ohne selbst die Pünktlichkeit zu garantieren.",
      [
        "یک صورت‌جلسهٔ بی‌طرفانه می‌نویسی. مدیر پروژه گفته است محموله به‌موقع می‌رسد، اما هنوز تأییدی نرسیده است.",
        "گفتهٔ مدیر را گزارش کن و بگو چه چیزی هنوز باید بررسی شود. خودت رسیدنِ به‌موقع را تضمین نکن.",
      ],
    ],
    [
      "Formuliere eine vorsichtige eigene Prognose zu einer geplanten Veränderung. Benenne eine mögliche Folge und welche Information deine Einschätzung noch verändern würde.",
      [
        "دربارهٔ یک تغییرِ برنامه‌ریزی‌شده پیش‌بینی محتاطانهٔ خودت را بنویس.",
        "یک پیامد احتمالی را بگو و مشخص کن چه اطلاعاتی ممکن است نظرت را تغییر بدهد.",
      ],
    ],
    [
      "Ein Gemeinderat berät über längere Öffnungszeiten einer Bibliothek. Schreibe eine abgewogene Empfehlung: Welche Vorteile sind denkbar, was ist noch unsicher und welche Daten sollte der Rat vor der Entscheidung erheben?",
      [
        "شورای محلی دربارهٔ افزایش ساعت کار کتابخانه تصمیم می‌گیرد. یک پیشنهاد سنجیده بنویس.",
        "سه نکته را پوشش بده: فایده‌های احتمالی، موارد نامطمئن و اطلاعاتی که شورا باید پیش از تصمیم جمع‌آوری کند.",
      ],
    ],
  ],
};

export function cyclePromptGuide(
  language: Language,
  stage: Stage,
  prompt: string,
): readonly string[] | null {
  if (stage !== "notice" && stage !== "produce" && stage !== "transfer")
    return null;
  return (
    questions[language]?.find(([source]) => source === prompt)?.[1] ?? null
  );
}
