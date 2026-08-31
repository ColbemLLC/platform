import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { AppShell } from "@/components/app/app-shell";
import { HomeFeed } from "@/components/app/home/homefeed";

export const metadata: Metadata = {
  title: "Home",
};

export default async function MePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <AppShell>
      <HomeFeed />
    </AppShell>
  );
}