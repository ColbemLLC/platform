"use client";

import { usePathname } from "next/navigation";
import { SquaresFour, House, Gear, ChatCircleDots } from "@phosphor-icons/react";

const routeMeta: Record<string, { icon: typeof House; label: string }> = {
  "/me": { icon: House, label: "Home" },
  "/settings": { icon: Gear, label: "Settings" },
  "/feedback": { icon: ChatCircleDots, label: "Feedback" },
};

export function AppBar() {
  const pathname = usePathname();
  const meta = routeMeta[pathname] ?? { icon: SquaresFour, label: "Overview" };
  const Icon = meta.icon;

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-semibold text-foreground">{meta.label}</span>
    </header>
  );
}