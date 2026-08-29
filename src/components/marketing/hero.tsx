import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex flex-col min-h-screen overflow-hidden bg-background">
      {/* Cover video — drop in the asset here when ready */}
      {/*
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src=""
      />
      */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col px-6 pb-20 md:px-12 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-4"
        >
          <Image src="/favicon.ico" alt="Colbe" width={48} height={48} priority />
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl leading-[1] tracking-tight text-foreground md:text-5xl lg:text-[4rem]">
            Every guild, <em className="italic text-muted-foreground">one</em>{" "}
            home.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-6 max-w-[480px] text-base text-muted-foreground md:text-lg"
        >
          Chat, hang out, and grow with your people.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-8 flex items-center gap-4"
        >
          <Button
            asChild
            className="h-12 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/download">Download</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-lg border-border bg-background/80 px-7 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <Link href="/signup">Create account</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}