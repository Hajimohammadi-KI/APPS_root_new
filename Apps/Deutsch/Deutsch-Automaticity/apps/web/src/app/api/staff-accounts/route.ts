import { staffAccountsResponse } from "@automaticity/learning-core/staff-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** درخواست فهرست/تغییر حساب به هستهٔ مشترک می‌رود تا سیاست مالکیت در دو اپ یکسان بماند. */
export const GET = (request: Request) => staffAccountsResponse(request);
export const POST = (request: Request) => staffAccountsResponse(request);
