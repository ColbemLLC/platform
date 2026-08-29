import { MarketingNavbar } from "@/components/marketing/marketing-navbar";
import Hero from "@/components/marketing/hero";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { Faq } from "@/components/marketing/faq";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export default function Page() {
  return (
    <main className="bg-background">
      <MarketingNavbar />
      <Hero />
      <FeaturesGrid />
      <Faq />
      <MarketingFooter />
    </main>
  );
}