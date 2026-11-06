import { type NextRequest, NextResponse } from "next/server";
import {
  protectStaffRequest,
  requiredStaffRoles,
  staffConfigFromEnvironment,
} from "@automaticity/learning-core/staff-server";
import {
  legacyScreenRedirect,
  type SearchParamsRecord,
} from "@/features/navigation/screen-routes";

// Shell screens used to be addressed as `/?screen=<id>`. Redirecting here,
// before rendering, keeps old bookmarks working even though the root layout
// only mounts page content after client-side recovery of saved learning data.
export function proxy(request: NextRequest) {
  const denied = protectStaffRequest(request, staffConfigFromEnvironment());
  if (denied) return denied;
  if (requiredStaffRoles(request.nextUrl.pathname)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Vary", "Cookie");
    return response;
  }
  if (request.nextUrl.pathname !== "/") return NextResponse.next();
  const params: SearchParamsRecord = {};
  for (const key of new Set(request.nextUrl.searchParams.keys())) {
    params[key] = request.nextUrl.searchParams.getAll(key);
  }
  const target = legacyScreenRedirect(params);
  if (!target) return NextResponse.next();
  return NextResponse.redirect(new URL(target, request.nextUrl), 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
