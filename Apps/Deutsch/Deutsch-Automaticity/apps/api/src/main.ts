/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/** سرور Nest را با ماژول، مبدأهای مجاز و درگاه تنظیم‌شده راه‌اندازی می‌کند؛ Promise آماده‌شدن شنونده را می‌دهد و دادهٔ زبان‌آموز را ذخیره نمی‌کند. */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });
  const origins = (
    process.env.WEB_ORIGINS ?? 'http://127.0.0.1:3210,http://localhost:3210'
  )
    .split(',')
    .map(
      /** فاصلهٔ اطراف هر مبدأ تنظیم‌شده حذف می‌شود؛ wildcard یا دامنهٔ تازه‌ای به فهرست مجاز اضافه نمی‌شود. ورودی‌ها: origin. */
      (origin) => origin.trim(),
    )
    .filter(Boolean);

  /** پیشوند موجود مسیرهای HTTP ثابت می‌ماند تا مصرف‌کنندهٔ وب همان نشانی قرارداد را فراخوانی کند. */
  app.setGlobalPrefix('api/v1');
  /** مبدأهای مجاز تنظیم می‌شوند تا مرورگر فقط از مبدأهای پذیرفته‌شده پاسخ API را مصرف کند؛ این سیاست احراز هویت کاربر نیست. */
  app.enableCors({
    origin: origins,
    credentials: true,
  });
  /** چرخهٔ خاموش‌شدن Nest فعال می‌شود تا توقف سرور از مسیر مدیریت‌شدهٔ برنامه عبور کند. */
  app.enableShutdownHooks();

  const port = Number(process.env.API_PORT ?? 4210);
  /** شنونده روی درگاه و رابط فعلی باز می‌شود؛ آماده‌شدن شبکه با سنجش آموزشی اشتباه نمی‌شود. */
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
