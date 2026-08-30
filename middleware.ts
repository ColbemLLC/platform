import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Only these need a session. Everything else (marketing, docs, legal,
// any future page) is public by default — nothing to remember to add.
const PROTECTED_PREFIXES = ["/onboarding", "/@me"];

// Logged-in users get bounced away from these instead of seeing them again.
const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = getSessionCookie(req);
  const isAuthenticated = Boolean(sessionCookie);

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  const isAuthOnly = AUTH_ONLY_PATHS.includes(pathname);

  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/@me", req.url));
  }

  if (isAuthenticated && isAuthOnly) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && isProtected) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|background/|api/).*)",
  ],
};