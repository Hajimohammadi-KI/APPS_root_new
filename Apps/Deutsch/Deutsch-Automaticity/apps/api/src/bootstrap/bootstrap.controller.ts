/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Controller, Get, Inject } from '@nestjs/common';

import type { BootstrapResponse } from '@grammar/contracts';

import { BootstrapService } from './bootstrap.service';

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Controller('bootstrap')
export class BootstrapController {
  /** سرویس را از تزریق وابستگی Nest می‌گیرد تا کنترلر فقط درخواست معتبر را انتقال دهد؛ ساخت کنترلر ارزیابی یا ذخیره اجرا نمی‌کند. ورودی‌ها: bootstrapService. */
  constructor(
    @Inject(BootstrapService)
    private readonly bootstrapService: BootstrapService,
  ) {}

  /** اطلاعات کاتالوگ، فعالیت‌ها و فاصله‌های مرور را برای آغاز رابط وب برمی‌گرداند؛ معرفی برنامه به معنی انجام یا ذخیرهٔ فعالیت نیست. */
  @Get()
  getBootstrap(): BootstrapResponse {
    return this.bootstrapService.getBootstrap();
  }
}
