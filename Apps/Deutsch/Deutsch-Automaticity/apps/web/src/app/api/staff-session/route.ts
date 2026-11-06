import { staffSessionResponse } from "@automaticity/learning-core/staff-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const GET = (request: Request) => staffSessionResponse(request);
export const POST = (request: Request) => staffSessionResponse(request);
export const DELETE = (request: Request) => staffSessionResponse(request);
