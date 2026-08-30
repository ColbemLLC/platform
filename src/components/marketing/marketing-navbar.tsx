import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 w-full">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/favicon.ico" alt="Colbe" width={28} height={28} />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Colbe
          </span>
        </Link>

        <Link href="/login">
          <Button className="rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}