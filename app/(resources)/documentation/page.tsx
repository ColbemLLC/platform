import type { Metadata } from "next";
import { DocsContent } from "@/components/docs/docs-content";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocumentationPage() {
  return (
    <DocsContent>
      <h1>Colbe Docs</h1>
      <p>
        Everything you need to know about using Colbe — chat, hang out, and
        build communities with your people.
      </p>
      <p>
        We&apos;re still building out these docs alongside the platform.
        Start with{" "}
        <a
          href="/documentation/getting-started"
          className="text-primary underline underline-offset-4"
        >
          Getting started
        </a>{" "}
        — more sections (guilds, messaging, moderation, account) are on the
        way.
      </p>
    </DocsContent>
  );
}