/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import {
  evaluationRequestSchema,
  type EvaluationResponse,
} from '@grammar/contracts';

import { EvaluationService } from './evaluation.service';

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Controller('evaluate')
export class EvaluationController {
  /** سرویس را از تزریق وابستگی Nest می‌گیرد تا کنترلر فقط درخواست معتبر را انتقال دهد؛ ساخت کنترلر ارزیابی یا ذخیره اجرا نمی‌کند. ورودی‌ها: evaluationService. */
  constructor(private readonly evaluationService: EvaluationService) {}

  /** بدنهٔ ناشناخته را با قرارداد مشترک می‌سنجد و فقط دادهٔ پذیرفته‌شده را به سرویس می‌فرستد؛ خطای ورودی پاسخ ۴۰۰ می‌گیرد. ورودی‌ها: body. */
  @Post()
  async evaluate(@Body() body: unknown): Promise<EvaluationResponse> {
    const parsed = evaluationRequestSchema.safeParse(body);
    /* مرز API بدنهٔ نامعتبر را پیش از فراخوانی سرویس رد می‌کند؛ دامنه فقط قرارداد پذیرفته‌شده می‌گیرد. */
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Die Auswertungsanfrage ist ungültig.',
        issues: parsed.error.issues,
      });
    }

    return this.evaluationService.evaluate(parsed.data);
  }
}
