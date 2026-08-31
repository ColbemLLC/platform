"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  UsersThree,
  Compass,
  ChatCircleDots,
  Gear,
  HeartStraight,
} from "@phosphor-icons/react/dist/ssr";

interface ActivityItem {
  id: string;
  actorName: string;
  actorAvatarUrl?: string | null;
  message: string;
  timestamp: string;
}

interface HomeFeedProps {
  activity?: ActivityItem[];
}

export function HomeFeed({ activity = [] }: HomeFeedProps) {
  const router = useRouter();

  if (activity.length > 0) {
    return (
      <div className="flex h-full w-full flex-col bg-background">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            {activity.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-[15px] bg-card p-4">
                <div className="h-9 w-9 shrink-0 rounded-[15px] bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.actorName}</span> {item.message}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background px-6">
      <div className="mb-8 flex items-center gap-3">
        <img src="/favicon.svg" alt="Colbe" className="h-10 w-10" />
        <span className="font-[family-name:var(--font-instrument-serif)] text-2xl text-foreground">Colbe</span>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        <ActionCard
          icon={<Plus size={20} />}
          title="Create a guild"
          description="Invite your friends, add bots, and start your own community."
          onClick={() => router.push("/guilds/create")}
        />
        <ActionCard
          icon={<Compass size={20} />}
          title="Discover guilds"
          description="Find a community based on your hobbies or interests."
          onClick={() => router.push("/guilds")}
        />
        <ActionCard
          icon={<ChatCircleDots size={20} />}
          title="Give feedback"
          description="Let us know how we can improve the app by giving us feedback."
          onClick={() => router.push("/feedback")}
        />
        <ActionCard
          icon={<HeartStraight size={20} />}
          title="Support Colbe"
          description="Support the project — thank you!"
          onClick={() => router.push("/shop")}
          accent
        />
        <ActionCard
          icon={<Gear size={20} />}
          title="Open settings"
          description="You can also click the gear icon in the bottom bar."
          onClick={() => router.push("/settings")}
        />
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
  accent = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 rounded-[15px] p-4 text-left transition-colors ${
        accent ? "bg-primary/20 hover:bg-primary/30" : "bg-card hover:bg-muted"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[15px] bg-background text-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}