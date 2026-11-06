/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Controller, Get } from '@nestjs/common';

import { healthResponseSchema, type HealthResponse } from '@grammar/contracts';

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Controller('health')
export class HealthController {
  /** وضعیت و زمان فعلی سرویس را در قرارداد معتبر برمی‌گرداند؛ سلامت HTTP به‌تنهایی صحت ارزیابی یا اتصال همهٔ سرویس‌ها را اثبات نمی‌کند. */
  @Get()
  getHealth(): HealthResponse {
    return healthResponseSchema.parse({
      status: 'ok',
      service: 'grammar-api',
      version: '10.8.2026',
      timestamp: new Date().toISOString(),
    });
  }
}
