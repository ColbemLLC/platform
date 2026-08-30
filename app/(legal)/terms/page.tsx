import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const lastUpdated = "August 30, 2026";

export default function TermsPage() {
  return (
    <article className="prose-invert">
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            1. Eligibility
          </h2>
          <p className="mt-2">
            You must be at least 13 years old to use Colbe. By creating an
            account you confirm you meet this requirement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            2. Your account
          </h2>
          <p className="mt-2">
            You&apos;re responsible for keeping your login credentials
            secure and for activity that happens under your account. Let us
            know immediately if you suspect unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            3. Acceptable use
          </h2>
          <p className="mt-2">You agree not to use Colbe to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Harass, threaten, or hate on other members.</li>
            <li>
              Share content that exploits or endangers minors, in any guild,
              for any reason.
            </li>
            <li>Distribute malware, spam, or engage in illegal activity.</li>
            <li>Impersonate another person or entity.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Guild ownership & moderation
          </h2>
          <p className="mt-2">
            Guild owners and moderators are responsible for moderating
            content within their own guilds and enforcing their own
            community rules, in addition to Colbe&apos;s platform-wide
            rules.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            5. Termination
          </h2>
          <p className="mt-2">
            We may suspend or terminate accounts that violate these terms.
            You can delete your own account at any time from your account
            settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            6. Changes to these terms
          </h2>
          <p className="mt-2">
            We may update these terms from time to time. Continued use of
            Colbe after changes take effect means you accept the updated
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            7. Contact
          </h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a
              href="mailto:legal@colbe.cc"
              className="text-primary underline underline-offset-4"
            >
              legal@colbe.cc
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}