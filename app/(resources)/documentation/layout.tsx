import Link from "next/link";
import Image from "next/image";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="Colbe" width={24} height={24} />
            <span className="text-sm font-semibold text-foreground">Colbe</span>
          </Link>
          <span className="text-sm text-muted-foreground">/ Docs</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl gap-10 px-6 py-12">
        <DocsSidebar />
        {children}
      </div>
    </div>
  );
}
