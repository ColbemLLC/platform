"use client";

import Link from "next/link";
import Image from "next/image";

export function NavRail() {
  return (
    <nav className="flex h-full w-[72px] flex-col items-center gap-2 border-r border-border bg-background py-3">
      <Link
        href="/me"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted transition-colors hover:rounded-xl"
      >
        <Image src="/favicon.ico" alt="Colbe" width={28} height={28} />
      </Link>

      <div className="my-1 h-px w-8 bg-border" />

      {/* Guild list renders here */}
      <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto" />
    </nav>
  );
}