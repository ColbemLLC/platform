"use client";

import Link from "next/link";
import { House, Trophy, Star, ChatCircleDots, Plus, At, Gear, DotsThree } from "@phosphor-icons/react";
import { Profile } from "@/components/app/shared/profile";
import { authClient } from "@/lib/auth/auth-client";

export function BottomBar() {
  const { data: session } = authClient.useSession();
  const displayName = session?.user.username ?? session?.user.name;
  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-between border-t border-border bg-background px-3">
      <div className="flex items-center gap-1">
        <Link
          href="/me"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted"
        >
          <House weight="fill" className="h-5 w-5" />
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Trophy className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Star className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <ChatCircleDots className="h-5 w-5" />
        </button>

        <div className="mx-1 h-6 w-px bg-border" />

        {/* Pinned guilds render here */}
        <div className="flex items-center gap-1 overflow-x-auto" />

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
          aria-label="Add guild"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Profile avatarUrl={session?.user.image} status="online" />
          {displayName && (
            <span className="text-sm font-medium text-foreground">{displayName}</span>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          aria-label="Mentions"
        >
          <At className="h-5 w-5" />
        </button>
        <Link
          href="/settings"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Gear className="h-5 w-5" />
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          aria-label="More"
        >
          <DotsThree className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}