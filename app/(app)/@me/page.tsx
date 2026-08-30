import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function MePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">
        You&apos;re in. The app shell goes here next.
      </p>
    </div>
  );
}