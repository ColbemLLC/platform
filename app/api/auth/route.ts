import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

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

  // TODO: look up user by email in your DB, verify password hash (bcrypt.compare).
  // Placeholder rejects everything until wired to a real datastore.
  const user = null as null | { id: string; email: string };

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  await publishAuthEvent("user.logged_in", { userId: user.id });

  // TODO: issue a session (cookie / JWT) here — this is the "unbypassable" part.
  return NextResponse.json({ user });
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

  // TODO: check email/username uniqueness against your DB before creating.
  // TODO: hash password with bcrypt before storing — never store plaintext.

  const userId = randomUUID();

  // TODO: persist { id: userId, email, username, passwordHash } to your DB.

  await publishAuthEvent("user.registered", { userId, email, username });

  // TODO: issue a session (cookie / JWT) here, same as login.
  return NextResponse.json(
    { user: { id: userId, email, username } },
    { status: 201 },
  );
}