"use client";

import Link from "next/link";

interface DocsNavItemProps {
  title: string;
  href: string;
  active?: boolean;
  disabled?: boolean;
}

export function DocsNavItem({ title, href, active, disabled }: DocsNavItemProps) {
  if (disabled) {
    return (
      <span className="block cursor-not-allowed rounded-md px-2 py-1 text-sm text-muted-foreground/40">
        {title}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`block rounded-md px-2 py-1 text-sm transition-colors ${
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {title}
    </Link>
  );
}