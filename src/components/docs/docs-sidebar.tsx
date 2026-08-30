"use client";

import { usePathname } from "next/navigation";
import { DocsNavItem } from "@/components/docs/docs-nav-item";

interface DocsLink {
  title: string;
  href: string;
}

interface DocsSection {
  label: string;
  links: DocsLink[];
  disabled?: boolean;
}

const sections: DocsSection[] = [
  {
    label: "Introduction",
    links: [
      { title: "Overview", href: "/documentation" },
      { title: "Getting started", href: "/documentation/getting-started" },
    ],
  },
  {
    label: "Guilds",
    disabled: true,
    links: [
      { title: "Creating a guild", href: "/documentation/guilds/creating-a-guild" },
      { title: "Channels", href: "/documentation/guilds/channels" },
      { title: "Roles & permissions", href: "/documentation/guilds/roles-permissions" },
    ],
  },
  {
    label: "Messaging",
    disabled: true,
    links: [
      { title: "Sending messages", href: "/documentation/messaging/sending-messages" },
      { title: "Voice & video", href: "/documentation/messaging/voice-video" },
    ],
  },
  {
    label: "Moderation",
    disabled: true,
    links: [
      { title: "Content moderation", href: "/documentation/moderation/content-moderation" },
      { title: "Reporting", href: "/documentation/moderation/reporting" },
    ],
  },
  {
    label: "Account",
    disabled: true,
    links: [
      { title: "Privacy settings", href: "/documentation/account/privacy-settings" },
      { title: "Security", href: "/documentation/account/security" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 space-y-6">
      {sections.map((section) => (
        <div key={section.label}>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {section.label}
            {section.disabled && (
              <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-normal normal-case text-muted-foreground">
                Soon
              </span>
            )}
          </h3>
          <ul className="mt-2 space-y-1">
            {section.links.map((link) => (
              <li key={link.href}>
                <DocsNavItem
                  title={link.title}
                  href={link.href}
                  active={pathname === link.href}
                  disabled={section.disabled}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}