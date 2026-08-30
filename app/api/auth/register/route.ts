// FILE: src/app/api/auth/register/route.ts
// Called by: components/auth/register-form.tsx  ->  fetch("/api/auth/register")
// POST only. Checks email/username are free, creates the user, signs a session, sets the cookie.

import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/index.js";
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

  const passwordHash = await bcrypt.hash(password, 12);

  const [user] = await db
    .insert(users)
    .values({ email, username, passwordHash })
    .returning({ id: users.id, email: users.email, username: users.username });

  const token = await signSession(user.id);

  const response = NextResponse.json({ user }, { status: 201 });
  response.cookies.set("colbe_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}