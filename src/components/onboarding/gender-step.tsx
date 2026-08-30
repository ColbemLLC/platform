"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function CornerMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 border border-border bg-background ${className}`}
    />
  );
}

const OPTIONS = ["Female", "Male", "Non-binary", "Prefer not to say"];

interface GenderStepProps {
  onContinue: (gender: string) => void;
  onBack: () => void;
}

export function GenderStep({ onContinue, onBack }: GenderStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

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
              Step 2 of 3
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-foreground">
              How do you identify?
            </h1>
          </div>

          <div className="mt-8 space-y-2">
            {OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  selected === option
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-11 rounded-lg border-border bg-background px-6 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Back
            </Button>
            <Button
              type="button"
              disabled={!selected}
              onClick={() => selected && onContinue(selected)}
              className="h-11 flex-1 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}