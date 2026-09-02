"use client";

import { useEffect, useState } from "react";
import { Desktop, DeviceMobile, Question } from "@phosphor-icons/react/dist/ssr";
import { authClient } from "@/lib/auth/auth-client";

type Session = {
  id: string;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
};

function parseDevice(userAgent?: string | null) {
  if (!userAgent) return { label: "Unknown device", Icon: Question };

  const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /Chrome\//.test(userAgent)
    ? "Chrome"
    : /Firefox\//.test(userAgent)
    ? "Firefox"
    : /Safari\//.test(userAgent)
    ? "Safari"
    : "Browser";

  const os = /Windows/.test(userAgent)
    ? "Windows"
    : /Mac OS/.test(userAgent)
    ? "macOS"
    : /Android/.test(userAgent)
    ? "Android"
    : /iPhone|iPad/.test(userAgent)
    ? "iOS"
    : /Linux/.test(userAgent)
    ? "Linux"
    : "";

  return {
    label: `${browser}${os ? ` on ${os}` : ""}`,
    Icon: isMobile ? DeviceMobile : Desktop,
  };
}

function formatRelative(date: string | Date) {
  const d = new Date(date);
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [list, current] = await Promise.all([
        authClient.listSessions(),
        authClient.getSession(),
      ]);
      setSessions((list.data as Session[]) ?? []);
      setCurrentToken(current.data?.session?.token ?? null);
      setLoading(false);
    }
    load();
  }, []);

  async function revoke(token: string) {
    setRevoking(token);
    await authClient.revokeSession({ token });
    setSessions((prev) => prev.filter((s) => s.token !== token));
    setRevoking(null);
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-foreground">
        Sessions
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Devices currently signed in to your account.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {loading && (
          <p className="text-sm text-muted-foreground">Loading sessions…</p>
        )}

        {!loading && sessions.length === 0 && (
          <p className="text-sm text-muted-foreground">No active sessions found.</p>
        )}

        {sessions.map((session) => {
          const { label, Icon } = parseDevice(session.userAgent);
          const isCurrent = session.token === currentToken;

          return (
            <div
              key={session.id}
              className="relative overflow-hidden rounded-[15px] border border-border bg-muted/20"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-[15px] bg-primary" />

              <div className="flex items-center justify-between py-4 pl-5 pr-4 pt-[18px]">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      {isCurrent && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                          Current session
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {session.ipAddress ?? "Unknown IP"} ·{" "}
                      {isCurrent ? "Active now" : `Active ${formatRelative(session.updatedAt)}`}
                    </p>
                  </div>
                </div>

                {!isCurrent && (
                  <button
                    onClick={() => revoke(session.token)}
                    disabled={revoking === session.token}
                    className="rounded-[15px] px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
                  >
                    {revoking === session.token ? "Revoking…" : "Revoke"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}