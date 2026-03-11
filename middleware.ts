import { NextRequest, NextResponse } from "next/server";
import {
  AB_COOKIE_PREFIX,
  AB_SESSION_COOKIE,
  getActiveExperiments,
  hashString,
  pickVariant,
} from "@/src/lib/ab-testing";

/**
 * Middleware: A/B Test Variant Assignment
 *
 * On every request, checks if the visitor has variant assignments.
 * If not, assigns variants via weighted random (seeded by session ID)
 * and sets cookies for persistent assignment.
 *
 * Cookie format: mrdj_ab_{experimentId}={variantId}
 * Session cookie: mrdj_ab_session={uuid}
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only run on page requests, not API/static assets
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/downloads/") ||
    pathname.includes(".") // static files
  ) {
    return response;
  }

  // Get or create session ID
  let sessionId = request.cookies.get(AB_SESSION_COOKIE)?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    response.cookies.set(AB_SESSION_COOKIE, sessionId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  // Assign variants for all active experiments
  const activeExperiments = getActiveExperiments();

  for (const experiment of activeExperiments) {
    const cookieName = `${AB_COOKIE_PREFIX}${experiment.id}`;
    const existing = request.cookies.get(cookieName)?.value;

    if (!existing) {
      // Deterministic assignment based on session + experiment
      const seed = hashString(`${sessionId}_${experiment.id}`);
      const variant = pickVariant(experiment, seed);

      response.cookies.set(cookieName, variant.id, {
        httpOnly: false, // readable by client JS for rendering
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pages except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|images|downloads).*)",
  ],
};
