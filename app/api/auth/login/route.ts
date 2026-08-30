// FILE: src/app/api/auth/login/route.ts
// Called by: components/auth/login-form.tsx  ->  fetch("/api/auth/login")
// POST only. Verifies email+password, signs a session, sets the cookie.

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { signSession } from "@/lib/auth/shared";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const valid = await Bun.password.verify(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const token = await signSession(user.id);

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, username: user.username },
  });
  response.cookies.set("colbe_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}