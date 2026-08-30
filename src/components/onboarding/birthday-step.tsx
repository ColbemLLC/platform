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

interface BirthdayStepProps {
  onContinue: (birthday: string) => void;
}

export function BirthdayStep({ onContinue }: BirthdayStepProps) {
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!birthday) {
      setError("Enter your date of birth.");
      return;
    }

    const age =
      (Date.now() - new Date(birthday).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25);

    if (age < 13) {
      setError("You must be at least 13 years old to use Colbe.");
      return;
    }

    onContinue(birthday);
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
              Step 1 of 3
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-foreground">
              When&apos;s your birthday?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This won&apos;t be shown to other members.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="date"
              required
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}