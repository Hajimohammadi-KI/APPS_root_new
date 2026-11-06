/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import type {
  AssessmentRequest,
  AssessmentResponse,
  LanguageToolMatch,
} from "./assessment.contract";
import { parseLanguageToolResponse } from "./assessment.contract";

/** پیشنهادهای اعتبارسنجی‌شده را از انتهای متن به ابتدا اعمال می‌کند تا مکان‌های UTF-16 ثابت بمانند؛ خروجی متن پیشنهادی تازه است و ورودی بازنویسی نمی‌شود. ورودی‌ها: text، matches. */
export function applyCorrections(
  text: string,
  matches: LanguageToolMatch[],
): string {
  return parseLanguageToolResponse({ matches }, text)
    .filter(
      /** در applyCorrections، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: match. */
      (match) => match.replacements[0]?.value !== undefined,
    )
    .toSorted(
      /** در applyCorrections، مقایسهٔ عددی یک ترتیب تازه می‌سازد و آرایهٔ ورودی تغییر نمی‌کند. ورودی‌ها: a، b. */
      (a, b) => b.offset - a.offset,
    )
    .reduce(
      /** در applyCorrections، انباشت از مقدار آغازین مشخص پیش می‌رود؛ سهم هر عضو فقط در نتیجهٔ محاسبه اعمال می‌شود. ورودی‌ها: corrected، match. */
      (corrected, match) => {
        const replacement = match.replacements[0]?.value;
        /* نبود جایگزین معتبر نباید متن را حذف یا ویرایش فرضی ایجاد کند؛ متن فعلی حفظ می‌شود. */
        if (replacement === undefined) return corrected;
        return (
          corrected.slice(0, match.offset) +
          replacement +
          corrected.slice(match.offset + match.length)
        );
      },
      text,
    );
}

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Injectable()
export class AssessmentService {
  private readonly endpoint =
    process.env.LANGUAGETOOL_URL ?? "https://api.languagetool.org/v2/check";

  /** متن معتبر را با مهلت مشخص به سرویس می‌فرستد و پیشنهادها را اعتبارسنجی می‌کند؛ شکست سرویس به قبولی یا خروجی ساختگی تبدیل نمی‌شود. ورودی‌ها: input. */
  async assess(input: AssessmentRequest): Promise<AssessmentResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(
      /** پایان مهلت، درخواست بالادستی همین ارزیابی را لغو می‌کند تا اتصال معلق باقی نماند. */
      () => controller.abort(),
      12_000,
    );

    try {
      /** فقط متن و پارامتر زبان به سرویس تنظیم‌شده ارسال می‌شود؛ مجوز استفاده از این مسیر باید در فراخواننده رعایت شده باشد و صوت در این درخواست نیست. */
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          text: input.text,
          language: input.language,
        }),
        signal: controller.signal,
      });

      /* پاسخ HTTP ناموفق نتیجهٔ زبانی معتبر نیست و به مسیر خطای سرویس می‌رود. */
      if (!response.ok) {
        throw new BadGatewayException(
          `LanguageTool returned HTTP ${response.status}.`,
        );
      }

      let matches: LanguageToolMatch[];
      try {
        matches = parseLanguageToolResponse(await response.json(), input.text);
      } catch (error) {
        /* شکست عملیات با معنی خطا یا مسیر محافظه‌کارانهٔ موجود منتقل می‌شود؛ دادهٔ ناموفق نتیجهٔ موفق ساختگی نمی‌سازد. */
        /* لغو ناشی از مهلت با خطای شکل JSON اشتباه گرفته نمی‌شود؛ علت اصلی برای مسیر عدم‌دسترسی حفظ می‌شود. */
        if (controller.signal.aborted) throw error;
        throw new BadGatewayException(
          "LanguageTool returned an invalid assessment response.",
        );
      }
      const corrected = applyCorrections(input.text, matches);

      return {
        original: input.text,
        corrected,
        changed: corrected !== input.text,
        online: true,
        matches,
      };
    } catch (error) {
      /* شکست عملیات با معنی خطا یا مسیر محافظه‌کارانهٔ موجود منتقل می‌شود؛ دادهٔ ناموفق نتیجهٔ موفق ساختگی نمی‌سازد. */
      /* خطای معتبر درگاه با همان معنی عبور می‌کند؛ سایر شکست‌ها جدا به عدم‌دسترسی سرویس نگاشت می‌شوند. */
      if (error instanceof BadGatewayException) throw error;
      const reason =
        error instanceof Error ? error.message : "Unknown upstream error";
      throw new ServiceUnavailableException(
        `Online assessment is unavailable: ${reason}`,
      );
    } finally {
      /** تایمر همین درخواست در هر نتیجه پاک می‌شود تا بعد از پاسخ، لغو دیرهنگام اجرا نشود. */
      clearTimeout(timeout);
    }
  }
}
