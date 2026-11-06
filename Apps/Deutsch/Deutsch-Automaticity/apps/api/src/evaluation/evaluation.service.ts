/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Injectable } from '@nestjs/common';

import type { EvaluationRequest, EvaluationResponse } from '@grammar/contracts';
import { evaluationResponseSchema } from '@grammar/contracts';
import { evaluateAnswer, type LanguageToolMatch } from '@grammar/domain';

/** ساختار «LanguageToolPayload» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
interface LanguageToolPayload {
  readonly matches?: readonly LanguageToolMatch[];
}

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Injectable()
export class EvaluationService {
  /** درخواست معتبر آلمانی را به LanguageTool می‌فرستد و گزارش دامنه را اعتبارسنجی می‌کند؛ شکست شبکه مسیر محلیِ بدون تأیید آنلاین را فعال می‌کند. ورودی‌ها: input. */
  async evaluate(input: EvaluationRequest): Promise<EvaluationResponse> {
    const endpoint =
      process.env.LANGUAGE_TOOL_URL ?? 'https://api.languagetool.org/v2/check';

    try {
      const body = new URLSearchParams({
        text: input.text,
        language: 'de-DE',
      });
      /** فقط متن و پارامتر زبان به سرویس تنظیم‌شده ارسال می‌شود؛ مجوز استفاده از این مسیر باید در فراخواننده رعایت شده باشد و صوت در این درخواست نیست. */
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body,
        signal: AbortSignal.timeout(8_000),
      });

      /* پاسخ HTTP ناموفق نتیجهٔ زبانی معتبر نیست و به مسیر خطای سرویس می‌رود. */
      if (!response.ok) {
        throw new Error(`LanguageTool antwortet mit HTTP ${response.status}.`);
      }

      const payload = (await response.json()) as LanguageToolPayload;
      return evaluationResponseSchema.parse(
        evaluateAnswer(
          input.text,
          input.grammar,
          input.kind,
          {
            matches: payload.matches ?? [],
            online: true,
          },
          input.taskPrompt,
        ),
      );
    } catch (error) {
      /* شکست عملیات با معنی خطا یا مسیر محافظه‌کارانهٔ موجود منتقل می‌شود؛ دادهٔ ناموفق نتیجهٔ موفق ساختگی نمی‌سازد. */
      return evaluationResponseSchema.parse(
        evaluateAnswer(
          input.text,
          input.grammar,
          input.kind,
          {
            matches: [],
            online: false,
            networkError:
              error instanceof Error
                ? error.message
                : 'LanguageTool ist momentan nicht erreichbar.',
          },
          input.taskPrompt,
        ),
      );
    }
  }
}
