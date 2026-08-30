import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export const metadata: Metadata = {
  title: "Home",
};

export default async function MePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // middleware already gates this route on a cookie *existing*, but that's
  // just a presence check — this is the real, server-verified check. If
  // the cookie was stale/tampered, this is what actually catches it.
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-foreground">
          You&apos;re in, {session.user.username ?? session.user.name}.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {session.user.email}
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          The app shell goes here next.
        </p>
      </div>
    </div>
  );
}