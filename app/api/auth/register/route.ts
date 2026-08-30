// FILE: src/app/api/auth/register/route.ts
// Called by: components/auth/register-form.tsx  ->  fetch("/api/auth/register")
// POST only. Checks email/username are free, creates the user, signs a session, sets the cookie.

import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { signSession } from "@/lib/auth/shared";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json(
      { message: "Email, username, and password are required." },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(or(eq(users.email, email), eq(users.username, username)))
    .limit(1);

  if (existing) {
    return NextResponse.json(
      { message: "An account with that email or username already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 12,
  });

  // Generated here instead of relying on drizzle's .returning() on insert —
  // libsql's returning-row objects are frozen and drizzle's column mapping
  // tries to mutate them, causing "Attempted to assign to readonly property".
  const userId = crypto.randomUUID();

  await db.insert(users).values({
    id: userId,
    email,
    username,
    passwordHash,
  });

  const token = await signSession(userId);

  const response = NextResponse.json(
    { user: { id: userId, email, username } },
    { status: 201 },
  );
  response.cookies.set("colbe_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}