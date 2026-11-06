/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Module } from "@nestjs/common";
import { AssessmentController } from "./assessment.controller";
import { AssessmentService } from "./assessment.service";

/** ماژول Nest کنترلرها و سرویس‌های همین حوزه را به هم متصل می‌کند؛ ثبت وابستگی‌ها خودش ارزیابی یا ذخیرهٔ پاسخ نیست. */
@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
