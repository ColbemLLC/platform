import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { db } from "@/lib/db/index.js";
import { users } from "@/lib/db/schema";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

async function signSession(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

/**
 * TODO: wire this up to your real Kafka producer (kafkajs or similar).
 * Left as a stub since broker config / topic names aren't defined yet.
 */
async function publishAuthEvent(event: string, payload: Record<string, unknown>) {
  // const producer = kafka.producer();
  // await producer.connect();
  // await producer.send({ topic: "auth-events", messages: [{ value: JSON.stringify({ event, ...payload }) }] });
  console.log(`[kafka:stub] ${event}`, payload);
}

/**
 * POST /api/auth — log in
 */
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

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  await publishAuthEvent("user.logged_in", { userId: user.id });

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

/**
 * PUT /api/auth — register
 */
export async function PUT(req: NextRequest) {
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

  await publishAuthEvent("user.registered", {
    userId: user.id,
    email: user.email,
    username: user.username,
  });

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