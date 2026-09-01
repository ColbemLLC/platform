import { NavRail } from "@/components/app/nav-rail";
import { AppBar } from "@/components/app/app-titlebar";
import { BottomBar } from "@/components/app/shared/bottom-bar";
import { ShieldCheck, Trophy, UsersThree, EnvelopeSimple, SealCheck } from "@phosphor-icons/react/dist/ssr";

const badges = [
  {
    icon: ShieldCheck,
    name: "Administrator Badge",
    description:
      "Identifies an account as belonging to a Colbe administrator. Only official Colbe staff will possess this badge.",
  },
  {
    icon: Trophy,
    name: "Veteran Badge",
    description:
      "Awarded to members who have been part of Colbe for over a year, recognizing long-standing members of the community.",
  },
  {
    icon: UsersThree,
    name: "Friendship Badge",
    description:
      "Awarded to members who have built meaningful connections within the Colbe community.",
  },
  {
    icon: EnvelopeSimple,
    name: "Inviter Badge",
    description:
      "Obtainable via the Inviter Program, awarded to members who help grow Colbe by inviting others.",
  },
  {
    icon: SealCheck,
    name: "Verified Badge",
    description:
      "Reserved for verified public figures, organizations, and brands. Not obtainable through normal means.",
  },
];

export default function BadgesPage() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <AppBar />

      <div className="flex min-h-0 flex-1">
        <NavRail />

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight text-foreground sm:text-6xl">
              Community Badges
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              These badges are awarded directly by the Colbe team and mark official recognition within the community.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className="flex items-start gap-5 rounded-xl bg-card p-5"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                    <badge.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-instrument-serif)] text-xl text-foreground">
                      {badge.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomBar />
    </div>
  );
}