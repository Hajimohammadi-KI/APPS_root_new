/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Injectable } from '@nestjs/common';

import { catalogSummary } from '@grammar/content';
import {
  apiVersion,
  bootstrapResponseSchema,
  cefrLevelSchema,
  type BootstrapResponse,
} from '@grammar/contracts';
import { DAILY_PRACTICE_STEPS, REVIEW_INTERVAL_DAYS } from '@grammar/domain';

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Injectable()
export class BootstrapService {
  /** اطلاعات کاتالوگ، فعالیت‌ها و فاصله‌های مرور را برای آغاز رابط وب برمی‌گرداند؛ معرفی برنامه به معنی انجام یا ذخیرهٔ فعالیت نیست. */
  getBootstrap(): BootstrapResponse {
    const payload = {
      apiVersion,
      product: {
        name: 'DeutschFlow',
        locale: 'de',
      },
      content: {
        topics: catalogSummary.topicCount,
        grammarUnits: catalogSummary.grammarUnitCount,
        levels: cefrLevelSchema.array().parse(catalogSummary.levels),
      },
      learning: {
        dailySteps: DAILY_PRACTICE_STEPS.map(
          /** در getBootstrap، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: { id, label, minutes }. */
          ({ id, label, minutes }) => ({
            id,
            label,
            minutes,
          }),
        ),
        reviewIntervalsDays: [...REVIEW_INTERVAL_DAYS],
      },
      capabilities: {
        persistence: 'local-first',
        sync: 'planned',
        languageFeedback: 'external',
      },
    } as const;

    return bootstrapResponseSchema.parse(payload);
  }
}
