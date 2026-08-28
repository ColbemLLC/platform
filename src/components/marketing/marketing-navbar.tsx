import Link from "next/link";
import Image from "next/image";
import { StatefulButton as Button } from "@/src/components/motion/button/stateful";
import { cn } from "@/src/lib/utils";

interface MarketingNavbarProps {
  variant?: "transparent" | "solid";
}

export function MarketingNavbar({ variant = "solid" }: MarketingNavbarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-5 sm:px-10",
        variant === "solid" && "border-b border-border bg-background"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/favicon.svg" alt="Colbe" width={28} height={28} />
        <span className="text-lg font-semibold text-foreground">Colbe</span>
      </Link>

      <Link
        href="/login"
        className={cn(
          "rounded-[15px] px-4 py-2 text-foreground",
          variant === "transparent" && "bg-white/10 backdrop-blur-md hover:bg-white/20"
        )}
      >
        Sign In
      </Link>
    </nav>
  );
}