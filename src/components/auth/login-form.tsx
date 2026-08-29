"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CornerMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 border border-border bg-background ${className}`}
    />
  );
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Invalid email or password.");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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

          <div className="flex flex-col items-center gap-3 text-center">
            <Image src="/favicon.ico" alt="Colbe" width={36} height={36} />
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary underline underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}