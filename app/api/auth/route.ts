// FILE: src/app/api/auth/route.ts
// NOT called by login-form.tsx or register-form.tsx — those hit the
// separate /login and /register routes above.
// This file only handles: GET (who's logged in?) and DELETE (log out).

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index.js";
import { users } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/shared";

/**
 * GET /api/auth — return the currently logged-in user, if any
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get("colbe_session")?.value;
  const userId = await verifySession(token);

  if (!userId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id, email: users.email, username: users.username })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}

/**
 * DELETE /api/auth — log out (clears the session cookie)
 */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("colbe_session");
  return response;
}