/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { allowedOrigins } from "./cors";

/** سرور Nest را با ماژول، مبدأهای مجاز و درگاه تنظیم‌شده راه‌اندازی می‌کند؛ Promise آماده‌شدن شنونده را می‌دهد و دادهٔ زبان‌آموز را ذخیره نمی‌کند. */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  /** مبدأهای مجاز تنظیم می‌شوند تا مرورگر فقط از مبدأهای پذیرفته‌شده پاسخ API را مصرف کند؛ این سیاست احراز هویت کاربر نیست. */
  app.enableCors({
    origin: allowedOrigins(),
    methods: ["GET", "POST", "OPTIONS"],
  });
  /** پیشوند موجود مسیرهای HTTP ثابت می‌ماند تا مصرف‌کنندهٔ وب همان نشانی قرارداد را فراخوانی کند. */
  app.setGlobalPrefix("api");
  /** چرخهٔ خاموش‌شدن Nest فعال می‌شود تا توقف سرور از مسیر مدیریت‌شدهٔ برنامه عبور کند. */
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 4201);
  /** شنونده روی درگاه و رابط فعلی باز می‌شود؛ آماده‌شدن شبکه با سنجش آموزشی اشتباه نمی‌شود. */
  await app.listen(port, "0.0.0.0");
}

void bootstrap();
