/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Module } from '@nestjs/common';

import { BootstrapController } from './bootstrap/bootstrap.controller';
import { BootstrapService } from './bootstrap/bootstrap.service';
import { EvaluationController } from './evaluation/evaluation.controller';
import { EvaluationService } from './evaluation/evaluation.service';
import { HealthController } from './health/health.controller';

/** ماژول Nest کنترلرها و سرویس‌های همین حوزه را به هم متصل می‌کند؛ ثبت وابستگی‌ها خودش ارزیابی یا ذخیرهٔ پاسخ نیست. */
@Module({
  imports: [],
  controllers: [HealthController, BootstrapController, EvaluationController],
  providers: [BootstrapService, EvaluationService],
})
export class AppModule {}
