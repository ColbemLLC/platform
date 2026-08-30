import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Routes anyone can hit, logged in or not.
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/documentation",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
];

// Routes that only make sense once you're already authenticated —
// redirect logged-in users away from these instead of showing them again.
const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Lightweight check only — confirms a session cookie exists and is
  // well-formed. Real verification happens server-side per request via
  // auth.api.getSession(), same as Better Auth's own docs recommend for
  // edge middleware.
  const sessionCookie = getSessionCookie(req);
  const isAuthenticated = Boolean(sessionCookie);

  const isPublic =
    PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/documentation/");
  const isAuthOnly = AUTH_ONLY_PATHS.includes(pathname);

  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/@me", req.url));
  }

  if (isAuthenticated && isAuthOnly) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && !isPublic) {
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