/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from "@nestjs/common";
import { assessmentRequestSchema } from "./assessment.contract";
import { AssessmentService } from "./assessment.service";

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Controller("assessment")
export class AssessmentController {
  /** سرویس را از تزریق وابستگی Nest می‌گیرد تا کنترلر فقط درخواست معتبر را انتقال دهد؛ ساخت کنترلر ارزیابی یا ذخیره اجرا نمی‌کند. ورودی‌ها: assessmentService. */
  constructor(private readonly assessmentService: AssessmentService) {}

  /** بدنهٔ ناشناخته را با قرارداد انگلیسی می‌سنجد و به سرویس می‌سپارد؛ درخواست نامعتبر پیش از ارزیابی با ۴۲۲ رد می‌شود. ورودی‌ها: body. */
  @Post()
  assess(@Body() body: unknown) {
    const parsed = assessmentRequestSchema.safeParse(body);
    /* مرز API بدنهٔ نامعتبر را پیش از فراخوانی سرویس رد می‌کند؛ دامنه فقط قرارداد پذیرفته‌شده می‌گیرد. */
    if (!parsed.success) {
      throw new UnprocessableEntityException({
        message: "Invalid assessment request.",
        issues: parsed.error.issues,
      });
    }
    return this.assessmentService.assess(parsed.data);
  }
}
