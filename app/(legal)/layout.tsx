import Link from "next/link";
import Image from "next/image";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="Colbe" width={24} height={24} />
            <span className="text-sm font-semibold text-foreground">Colbe</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>
    </div>
  );
}