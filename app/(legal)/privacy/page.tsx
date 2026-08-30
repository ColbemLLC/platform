import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const lastUpdated = "August 30, 2026";

export default function PrivacyPage() {
  return (
    <article className="prose-invert">
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            1. What we collect
          </h2>
          <p className="mt-2">
            When you create a Colbe account we collect your email, username,
            and password (stored as a hash, never in plain text). We also
            collect the messages and content you post in guilds you belong
            to, and basic device/usage data (IP address, browser type,
            timestamps) for security and abuse prevention.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            2. How we use it
          </h2>
          <p className="mt-2">
            We use your data to operate the platform: authenticating you,
            delivering messages, enforcing our community guidelines, and
            improving reliability. We don&apos;t sell your personal data to
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            3. Message visibility
          </h2>
          <p className="mt-2">
            Messages are visible to other members of the channel or guild
            they&apos;re posted in. Direct messages are visible only to the
            participants. Guild owners and moderators may have access to
            content within their own guild for moderation purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Data retention & deletion
          </h2>
          <p className="mt-2">
            You can request deletion of your account and associated personal
            data at any time. Some information may be retained where
            required for legal, safety, or fraud-prevention purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            5. Children&apos;s privacy
          </h2>
          <p className="mt-2">
            Colbe is not intended for anyone under 13. We do not knowingly
            collect data from children under 13, and accounts found to
            belong to a user under 13 will be removed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            6. Contact
          </h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:privacy@colbe.cc"
              className="text-primary underline underline-offset-4"
            >
              privacy@colbe.cc
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}