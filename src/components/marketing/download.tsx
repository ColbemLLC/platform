"use client";

import  motion  from "motion/react-client";
import { WindowsLogo, LinuxLogo, DeviceMobile } from "@phosphor-icons/react";

const platforms = [
  {
    name: "Windows",
    icon: WindowsLogo,
    note: "10 & 11",
  },
  {
    name: "Linux",
    icon: LinuxLogo,
    note: "AppImage & .deb",
  },
  {
    name: "Mobile",
    icon: DeviceMobile,
    note: "iOS & Android",
  },
];

function CornerMarks() {
  return (
    <>
      <span className="absolute -top-px -left-px h-2 w-2 border-l border-t border-foreground/30" />
      <span className="absolute -top-px -right-px h-2 w-2 border-r border-t border-foreground/30" />
      <span className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-foreground/30" />
      <span className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-foreground/30" />
    </>
  );
}

export function Download() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Download
        </p>
        <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">
          Colbe, on your terms
        </h1>
        <p className="mt-4 text-muted-foreground">
          Native apps are on the way. Get notified the moment they land.
        </p>
      </div>

      <div className="relative grid grid-cols-1 border border-border sm:grid-cols-3">
        {platforms.map((platform, i) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`relative flex flex-col items-center gap-4 px-8 py-14 text-center ${
              i !== 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
            }`}
          >
            <CornerMarks />
            <platform.icon className="h-10 w-10 text-foreground/80" weight="thin" />
            <div>
              <h3 className="font-serif text-2xl">{platform.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{platform.note}</p>
            </div>
            <span className="mt-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Coming soon
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}