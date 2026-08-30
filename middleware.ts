import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "colbe_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

// Routes anyone can hit, logged in or not.
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
];

// Routes that only make sense once you're already authenticated —
// redirect logged-in users away from these instead of showing them again.
const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.sub ?? null;
  } catch {
    // expired, tampered, or wrong secret — treat as logged out
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const userId = await verifySession(token);
  const isAuthenticated = Boolean(userId);

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
    const response = NextResponse.redirect(loginUrl);
    // clear any invalid/expired cookie so it doesn't keep failing verification
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on everything except static assets, images, and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|background/|api/).*)",
  ],
};