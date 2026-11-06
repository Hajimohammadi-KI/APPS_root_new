import type { Language } from "./contracts";
import type { SupportLanguage } from "./support-language";

type Copy = {
  readonly title: string;
  readonly intro: string;
  readonly steps: readonly {
    readonly title: string;
    readonly description: string;
    readonly linkLabel: string;
  }[];
  readonly reminder: {
    readonly title: string;
    readonly description: string;
    readonly linkLabel: string;
  };
  readonly otherTitle: string;
  readonly otherLabels: {
    readonly grammar: string;
    readonly studio: string;
    readonly progress: string;
    readonly settings: string;
  };
  readonly limits: string;
  readonly backup: string;
};

const copy: Record<SupportLanguage, Copy> = {
  fa: {
    title: "چگونه از اپ استفاده کنی",
    intro: "از برنامهٔ امروز شروع کن. هر بار فقط یک سؤال را انجام بده.",
    steps: [
      {
        title: "۱. سؤال امروز را باز کن",
        description:
          "اول سؤال پیشنهادی را انجام بده. اگر پاسخ قبلی نیاز به اصلاح یا مرور دارد، از همان شروع کن. هفت فعالیت دیگر تمرین‌های اضافی‌اند.",
        linkLabel: "برنامهٔ امروز",
      },
      {
        title: "۲. اول خودت پاسخ بده",
        description:
          "پیش از دیدن راهنما یا نمونه، پاسخ را بنویس. اگر خطایی دیدی، پاسخ خودت را اصلاح کن.",
        linkLabel: "صفحهٔ تمرین",
      },
      {
        title: "۳. در موقعیت تازه به کار ببر",
        description:
          "به تمرین موقعیت تازه برو یا یک جمله دربارهٔ زندگی خودت بساز. پاسخ آزاد ممکن است بدون نمره ذخیره شود.",
        linkLabel: "گام‌های امروز",
      },
      {
        title: "۴. بعداً مرور کن",
        description:
          "وقتی مرور موعدرسید، به سؤال تازه بدون دیدن نمونه پاسخ بده. انجام تمرین امروز به معنی تسلط نیست.",
        linkLabel: "بازگشت به برنامهٔ امروز",
      },
    ],
    reminder: {
      title: "یادآوری ساعت تمرین",
      description:
        "در برنامهٔ امروز یک ساعت انتخاب کن و «ذخیرهٔ ساعت» را بزن. وقتی اپ باز باشد ممکن است پیام درون‌برنامه‌ای ببینی. برای یادآوری وقتی اپ بسته است، «افزودن به تقویم» را بزن و فایل را در تقویم دستگاه وارد کن. اگر بعداً ساعت را تغییر دادی، رویداد تقویم را هم جداگانه تغییر بده.",
      linkLabel: "تنظیم ساعت در برنامهٔ امروز",
    },
    otherTitle: "بخش‌های دیگر",
    otherLabels: {
      grammar: "گرامر و مثال‌ها",
      studio: "تمرین مکالمه",
      progress: "پیشرفت من",
      settings: "تنظیمات و پشتیبان‌گیری",
    },
    limits:
      "پاسخ آزاد یا گفتاری همیشه نمرهٔ معتبر ندارد. تعداد تمرین‌های انجام‌شده و سرعت تایپ، تسلط یا روانی گفتار را ثابت نمی‌کنند.",
    backup:
      "پیشرفت روی همین مرورگر و دستگاه ذخیره می‌شود. پیش از تغییر دستگاه یا پاک‌کردن داده‌های مرورگر، از بخش تنظیمات فایل پشتیبان بگیر.",
  },
  en: {
    title: "How to use the app",
    intro: "Start with today's plan. Work on one question at a time.",
    steps: [
      {
        title: "1. Open today's question",
        description:
          "Start with the recommended question. Repair an earlier error or do a due review first when one appears. The seven other activities are extra practice.",
        linkLabel: "Today's plan",
      },
      {
        title: "2. Answer before seeing a model",
        description:
          "Write your own response first. Use a hint only if needed, then repair an error in your own answer.",
        linkLabel: "Practice",
      },
      {
        title: "3. Use it in a new situation",
        description:
          "Open the new-context task or make a sentence about your own life. An open answer may be saved unscored.",
        linkLabel: "Today's steps",
      },
      {
        title: "4. Return later",
        description:
          "When a review is due, answer a fresh question without the model. Finishing today is practice, not mastery.",
        linkLabel: "Return to today's plan",
      },
    ],
    reminder: {
      title: "Choose a practice reminder",
      description:
        "On today's page, choose a time and select Save time. The open app may show a prompt. For a reminder when the app is closed, select Add to calendar and import the file on your device. If you change the time later, update the calendar event separately.",
      linkLabel: "Set a time on today's page",
    },
    otherTitle: "Other parts of the app",
    otherLabels: {
      grammar: "Grammar and examples",
      studio: "Conversation practice",
      progress: "My progress",
      settings: "Settings and backup",
    },
    limits:
      "Open or spoken answers may remain unscored. Completed activities and typing speed do not establish mastery or speaking fluency.",
    backup:
      "Progress is stored in this browser on this device. Export a backup in Settings before changing devices or clearing browser data.",
  },
  de: {
    title: "So benutzt du die App",
    intro:
      "Beginne mit dem heutigen Plan. Bearbeite eine Frage nach der anderen.",
    steps: [
      {
        title: "1. Öffne die heutige Frage",
        description:
          "Beginne mit der empfohlenen Frage. Korrigiere zuerst einen früheren Fehler oder mache eine fällige Wiederholung. Die sieben anderen Aktivitäten sind Zusatzübungen.",
        linkLabel: "Heutiger Plan",
      },
      {
        title: "2. Antworte vor dem Muster",
        description:
          "Schreibe zuerst deine eigene Antwort. Nutze bei Bedarf einen Hinweis und korrigiere danach deinen Fehler.",
        linkLabel: "Üben",
      },
      {
        title: "3. Verwende die Form in einer neuen Situation",
        description:
          "Öffne die Aufgabe mit neuem Kontext oder bilde einen Satz über dein Leben. Eine freie Antwort kann ohne Bewertung gespeichert werden.",
        linkLabel: "Heutige Schritte",
      },
      {
        title: "4. Komm später zurück",
        description:
          "Wenn eine Wiederholung fällig ist, beantworte eine neue Frage ohne Muster. Eine erledigte Übung ist noch keine Beherrschung.",
        linkLabel: "Zurück zum Tagesplan",
      },
    ],
    reminder: {
      title: "Erinnerung an die Übungszeit",
      description:
        "Wähle auf der heutigen Seite eine Uhrzeit und speichere sie. Die geöffnete App kann einen Hinweis zeigen. Für eine Erinnerung bei geschlossener App lade die Kalenderdatei herunter und importiere sie auf deinem Gerät. Wenn du die Uhrzeit änderst, passe den Kalendereintrag gesondert an.",
      linkLabel: "Uhrzeit im Tagesplan wählen",
    },
    otherTitle: "Weitere Bereiche",
    otherLabels: {
      grammar: "Grammatik und Beispiele",
      studio: "Gespräche üben",
      progress: "Mein Fortschritt",
      settings: "Einstellungen und Sicherung",
    },
    limits:
      "Freie oder gesprochene Antworten können ohne Bewertung bleiben. Erledigte Übungen und Tippgeschwindigkeit belegen keine Beherrschung oder Sprechflüssigkeit.",
    backup:
      "Dein Fortschritt bleibt in diesem Browser auf diesem Gerät. Exportiere vor einem Gerätewechsel oder dem Löschen der Browserdaten eine Sicherung in den Einstellungen.",
  },
};

const paths = {
  en: {
    daily: "/daily",
    grammar: "/grammar",
    studio: "/studio",
    progress: "/progress",
    settings: "/settings",
  },
  de: {
    daily: "/heute",
    grammar: "/grammatik",
    studio: "/studio",
    progress: "/fortschritt",
    settings: "/einstellungen",
  },
} as const;

export const PERSIAN_PRACTICE_GUIDE = {
  steps: [
    "اول بدون دیدن نمونه پاسخ بده.",
    "اگر لازم شد، بعد از تلاش از راهنما استفاده کن. این پاسخ تمرین کمکی است.",
    "یک جملهٔ تازه دربارهٔ موقعیت دیگر بساز.",
    "روز دیگری بدون دیدن نمونه دوباره پاسخ بده.",
  ],
  criteria: [
    "برای نوشتن و گفتن جداگانه سنجیده می‌شود.",
    "دست‌کم ۱۸ پاسخ درست از ۲۰ پاسخ مستقل و بررسی‌شده لازم است.",
    "مرور موفق در دو روز جدا و پاسخ در دو موقعیت تازه لازم است.",
    "خطای حل‌نشده باید اصلاح شود.",
  ],
  limitation:
    "این‌ها معیار تمرین‌اند. به‌تنهایی روانی یا خودکارشدن گفتار را ثابت نمی‌کنند؛ سرعت تایپ هم معیار روانی گفتار نیست.",
} as const;

export function getAppUsageGuide(target: Language, support: SupportLanguage) {
  const content = copy[support];
  const links = paths[target];
  return {
    ...content,
    steps: content.steps.map((step, index) => ({
      ...step,
      href:
        index === 1
          ? "/practice"
          : index === 2
            ? `${links.daily}#daily-path-plan`
            : links.daily,
    })),
    reminder: {
      ...content.reminder,
      href: `${links.daily}#daily-reminder`,
    },
    links,
  };
}
