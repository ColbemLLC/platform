import { NavRail } from "@/components/app/nav-rail";
import { AppBar } from "@/components/app/app-titlebar";
import { BottomBar } from "@/components/app/shared/bottom-bar";

export function AppShell({
  sidebar,
  right,
  children,
}: {
  sidebar?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <AppBar />

      <div className="flex min-h-0 flex-1">
        <NavRail />

        {sidebar && (
          <aside className="hidden w-[280px] shrink-0 border-r border-border sm:block">
            {sidebar}
          </aside>
        )}

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">{children}</main>

        {right && (
          <aside className="hidden w-[320px] shrink-0 border-l border-border lg:block">
            {right}
          </aside>
        )}
      </div>

      <BottomBar />
    </div>
  );
}