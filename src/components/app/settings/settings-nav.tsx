"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/settings", label: "My Account" },
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/privacy", label: "Privacy" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/appearance", label: "Appearance" },
  { href: "/settings/sessions", label: "Sessions" },
  { href: "/settings/connections", label: "Connections" },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-background px-8 pt-8">
      <h1 className="mb-6 font-serif text-3xl text-foreground">Settings</h1>

      <nav className="flex items-center gap-6 border-b border-border">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
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