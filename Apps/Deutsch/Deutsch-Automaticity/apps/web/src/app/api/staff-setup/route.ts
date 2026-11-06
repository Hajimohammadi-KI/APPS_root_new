import { staffSetupResponse } from "@automaticity/learning-core/staff-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** راه‌اندازی مالک فقط در سرور و با کلید خصوصی انجام می‌شود؛ صفحهٔ عمومی هیچ اختیار ساخت حساب ندارد. */
export const POST = (request: Request) => staffSetupResponse(request);
