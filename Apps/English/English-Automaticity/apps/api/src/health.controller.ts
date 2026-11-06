/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { Controller, Get } from "@nestjs/common";

/** کلاس مرز API، مسئولیت درخواست/سرویس را از منطق دامنه جدا می‌کند؛ ساخت نمونه دادهٔ زبان‌آموز را تغییر نمی‌دهد. */
@Controller("health")
export class HealthController {
  /** شناسهٔ سرویس و زمان پاسخ را برای تشخیص دسترس‌پذیری API برمی‌گرداند؛ این مسیر ارزیابی آموزشی انجام نمی‌دهد. */
  @Get()
  check() {
    return {
      service: "grammar-automaticity-api",
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
