import { SettingsNav } from "@/components/app/settings/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-dvh w-full flex-col bg-background text-foreground">
      <SettingsNav />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl px-8 py-12">{children}</div>
      </div>
    </div>
  );
}