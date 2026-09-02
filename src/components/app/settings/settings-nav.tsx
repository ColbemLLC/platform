"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  IdentificationBadge,
  Lock,
  Bell,
  PaintBrush,
  DeviceMobile,
  Link as LinkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { authClient } from "@/lib/auth/auth-client";

const items = [
  { href: "/settings", label: "My Account", icon: User },
  { href: "/settings/profile", label: "Profile", icon: IdentificationBadge },
  { href: "/settings/privacy", label: "Privacy", icon: Lock },
  { href: "/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/settings/appearance", label: "Appearance", icon: PaintBrush },
  { href: "/settings/sessions", label: "Sessions", icon: DeviceMobile },
  { href: "/settings/connections", label: "Connections", icon: LinkIcon },
];

export function SettingsNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <nav className="flex w-[240px] shrink-0 flex-col border-r border-border bg-background p-4">
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-foreground ring-1 ring-border">
          {user?.image ? (
            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            user?.name?.[0]?.toUpperCase() ?? "?"
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
          <p className="truncate text-xs text-muted-foreground">Account</p>
        </div>
      </div>

      <div className="my-3 h-px bg-border" />

      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2.5 rounded-[15px] px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute -left-4 top-1 bottom-1 w-[3px] rounded-full bg-primary" />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}