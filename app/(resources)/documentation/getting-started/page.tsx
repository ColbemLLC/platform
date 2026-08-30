import type { Metadata } from "next";
import { DocsContent } from "@/components/docs/docs-content";

export const metadata: Metadata = {
  title: "Getting Started",
};

export default function GettingStartedPage() {
  return (
    <DocsContent>
      <h1>Getting started</h1>
      <p>
        Create an account to get started with Colbe. You&apos;ll need to be
        at least 13 years old.
      </p>
      <h2>1. Create your account</h2>
      <p>
        Head to the sign-up page and fill in your email, username, and
        password. You&apos;ll be asked to accept our community guidelines
        and Terms of Service first.
      </p>
      <h2>2. Finish onboarding</h2>
      <p>
        A few quick steps — birthday, gender, and profile — to finish
        setting up your account.
      </p>
      <h2>3. Join or create a guild</h2>
      <p>
        Guilds are where the community lives. Join one with an invite, or
        start your own.
      </p>
    </DocsContent>
  );
}