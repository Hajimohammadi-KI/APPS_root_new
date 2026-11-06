import { type NextRequest, NextResponse } from "next/server";
import {
  protectStaffRequest,
  requiredStaffRoles,
  staffConfigFromEnvironment,
} from "@automaticity/learning-core/staff-server";

export function proxy(request: NextRequest) {
  const denied = protectStaffRequest(request, staffConfigFromEnvironment());
  if (denied) return denied;
  const response = NextResponse.next();
  if (requiredStaffRoles(request.nextUrl.pathname)) {
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Vary", "Cookie");
  }
  return response;
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
