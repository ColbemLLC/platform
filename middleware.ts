import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "colbe_session";

// Routes anyone can hit, logged in or not.
const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password", "/reset-password"];

// Routes that only make sense once you're already authenticated —
// redirect logged-in users away from these instead of showing them again.
const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get(SESSION_COOKIE)?.value;

  // TODO: replace this presence check with real verification
  // (e.g. jwt.verify(session, process.env.AUTH_SECRET)) once
  // api/auth/route.ts actually issues signed sessions.
  const isAuthenticated = Boolean(session);

  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isAuthOnly = AUTH_ONLY_PATHS.includes(pathname);

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
    /*
     * Run on everything except static assets, images, and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|background/).*)",
  ],
};