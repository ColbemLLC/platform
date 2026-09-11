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
    <div className="w-full bg-background px-8 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl text-foreground">Settings</h1>
        <Link
          href="/me"
          aria-label="Close settings"
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-foreground ring-1 ring-border transition-opacity hover:opacity-80"
        >
          {user?.image ? (
            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            user?.name?.[0]?.toUpperCase() ?? "?"
          )}
        </Link>
      </div>

      <nav className="flex items-center gap-6 border-b border-border">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-1.5 pb-3 text-sm font-medium transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" weight={active ? "fill" : "regular"} />
              {item.label}
              {active && (
                <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}