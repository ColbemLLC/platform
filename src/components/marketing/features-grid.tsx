import { ShieldCheck, Eye, UsersThree, Lock } from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: ShieldCheck,
    title: "Content moderation",
    description:
      "Automated and human-reviewed moderation keeps conversations safe without slowing your team down.",
  },
  {
    icon: Eye,
    title: "Privacy controls",
    description:
      "Fine-grained control over who sees what — read receipts, presence, and message history are all opt-in.",
  },
  {
    icon: UsersThree,
    title: "Real-time sync",
    description:
      "Every message reflects instantly across your whole team, no refresh needed.",
  },
  {
    icon: Lock,
    title: "Built-in auth",
    description:
      "Secure by default — sign-in, sessions, and permissions handled out of the box.",
  },
];

function CornerMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 border border-border bg-background ${className}`}
    />
  );
}

export function FeaturesGrid() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Our features
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Colbe&apos;s core features are built around trust — from
          encryption to moderation, every conversation stays private, safe,
          and in sync.
        </p>

        <div className="relative mt-16 border border-border">
          <CornerMark className="-left-1 -top-1" />
          <CornerMark className="-right-1 -top-1" />
          <CornerMark className="-bottom-1 -left-1" />
          <CornerMark className="-bottom-1 -right-1" />

          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-8">
                <Icon size={24} className="text-primary" />
                <h3 className="mt-6 font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}