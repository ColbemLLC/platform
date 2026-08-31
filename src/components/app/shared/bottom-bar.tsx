"use client";

import Link from "next/link";
import { House, Trophy, Star, ChatCircleDots, Plus, At, Gear, DotsThree } from "@phosphor-icons/react";
import { Profile } from "@/components/app/shared/profile";

export function BottomBar() {
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
      </div>

      <div className="flex items-center gap-1">
        <Profile />

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