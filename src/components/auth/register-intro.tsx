"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function CornerMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 border border-border bg-background ${className}`}
    />
  );
}

interface RegisterIntroProps {
  onContinue?: () => void;
}

export function RegisterIntro({ onContinue }: RegisterIntroProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center bg-background bg-cover bg-center px-6 py-16 dark:bg-[url('/background/fluent_web_dark_2.svg')] bg-[url('/background/fluent_web_light_2_1.svg')]"
    >
      <div className="mx-auto w-full max-w-2xl">
        {/* Shortened Cloudflare-style banner */}
        <div className="relative border border-border bg-background/80 py-12 backdrop-blur-sm">
          <CornerMark className="-left-1 -top-1" />
          <CornerMark className="-right-1 -top-1" />
          <CornerMark className="-bottom-1 -left-1" />
          <CornerMark className="-bottom-1 -right-1" />

          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <Image src="/favicon.ico" alt="Colbe" width={40} height={40} />
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-foreground md:text-4xl">
              Before you join <em className="italic text-muted-foreground">Colbe</em>
            </h1>
          </div>
        </div>

        {/* Intro copy, under the banner */}
        <div className="mt-10 space-y-6">
          <p className="text-muted-foreground">
            Colbe is a place to chat, hang out, and build communities with
            people you trust. You need to be at least 13 years old to create
            an account.
          </p>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary">—</span>
              Treat other members with respect. Harassment, hate speech, and
              threats aren&apos;t allowed.
            </li>
            <li className="flex gap-3">
              <span className="text-primary">—</span>
              Don&apos;t share content that exploits or endangers minors, in
              any guild, for any reason.
            </li>
            <li className="flex gap-3">
              <span className="text-primary">—</span>
              Keep illegal activity, malware, and spam off the platform.
            </li>
            <li className="flex gap-3">
              <span className="text-primary">—</span>
              Guild owners are responsible for moderating their own spaces.
            </li>
          </ul>

          <label className="flex items-start gap-3 pt-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border bg-background accent-primary"
            />
            <span>
              I&apos;m 13 or older and I agree to Colbe&apos;s{" "}
              <a href="/terms" className="text-primary underline underline-offset-4">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary underline underline-offset-4">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <Button
            disabled={!agreed}
            onClick={onContinue}
            className="h-12 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            Continue
          </Button>
        </div>
      </div>
    </section>
  );
}