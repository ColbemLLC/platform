"use client";

import { StatusDot } from "@/components/app/shared/status-dot";

export function Profile({
  avatarUrl,
  status = "online",
}: {
  avatarUrl?: string | null;
  status?: "online" | "idle" | "dnd" | "offline";
}) {
  return (
    <button
      type="button"
      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted"
      aria-label="Your profile"
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
      ) : null}
      <StatusDot status={status} className="absolute -bottom-0.5 -right-0.5" />
    </button>
  );
}