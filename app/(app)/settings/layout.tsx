import Link from "next/link";
import { X } from "@phosphor-icons/react/dist/ssr";
import { SettingsNav } from "@/components/app/settings/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-dvh w-full flex-col bg-background text-foreground">
      <Link
        href="/me"
        className="absolute right-6 top-8 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Close settings"
      >
        <X className="h-5 w-5" />
      </Link>

      <SettingsNav />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-12">{children}</div>
      </div>
    </div>
  );
}