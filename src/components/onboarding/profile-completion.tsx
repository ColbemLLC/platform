"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

function CornerMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 border border-border bg-background ${className}`}
    />
  );
}

interface ProfileCompletionProps {
  onFinish: (data: { displayName: string; bio: string }) => void;
  onBack: () => void;
  loading?: boolean;
  error?: string | null;
}

export function ProfileCompletion({
  onFinish,
  onBack,
  loading,
  error,
}: ProfileCompletionProps) {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onFinish({ displayName, bio });
  }

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center bg-background bg-cover bg-center px-6 py-16 dark:bg-[url('/background/fluent_web_dark_2.svg')] bg-[url('/background/fluent_web_light_2_1.svg')]"
    >
      <div className="mx-auto w-full max-w-md">
        <div className="relative border border-border bg-background/80 p-8 backdrop-blur-sm">
          <CornerMark className="-left-1 -top-1" />
          <CornerMark className="-right-1 -top-1" />
          <CornerMark className="-bottom-1 -left-1" />
          <CornerMark className="-bottom-1 -right-1" />

          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Step 3 of 3
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-foreground">
              Finish your profile
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="displayName" className="text-sm font-medium text-foreground">
                Display name
              </label>
              <input
                id="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                placeholder="How others will see you"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="bio" className="text-sm font-medium text-foreground">
                Bio <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={160}
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                placeholder="A short intro"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="h-11 rounded-lg border-border bg-background px-6 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="h-11 flex-1 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                {loading ? "Finishing…" : "Finish"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}