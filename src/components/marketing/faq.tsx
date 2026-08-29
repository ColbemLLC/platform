import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  title: string;
  description?: React.ReactNode;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    title: "Getting started",
    description: "The basics of setting up and using Colbe.",
    items: [
      {
        question: "Is Colbe free to use?",
        answer:
          "Yes. Creating a guild, chatting, and voice channels are free. Optional paid perks (custom emoji limits, higher upload sizes, profile customization) are available per guild.",
      },
      {
        question: "What currencies do you support for paid plans?",
        answer:
          "Billing is in USD by default. Your card is charged in your local currency at checkout using your bank's exchange rate — we don't add a markup.",
      },
      {
        question: "Can I use Colbe on mobile?",
        answer:
          "Yes, Colbe is available on iOS, Android, and desktop, and stays in sync across all your devices.",
      },
    ],
  },
  {
    title: "Safety & moderation",
    description: "How we keep guilds and conversations safe.",
    items: [
      {
        question: "How does content moderation work?",
        answer:
          "Messages and media are automatically screened for harmful content, with human review for anything flagged. Guild owners can also set their own moderation rules and word filters.",
      },
      {
        question: "Who can see my messages?",
        answer:
          "Only members of the channel or DM you're in. Message history, read receipts, and presence are opt-in and controlled per guild in your privacy settings.",
      },
      {
        question: "How do I report a user or message?",
        answer:
          "Right-click (or long-press on mobile) any message or profile and select Report. Our trust & safety team reviews reports and typically responds within 24 hours.",
      },
      {
        question: "Is my data encrypted?",
        answer:
          "All messages are encrypted in transit and at rest. Voice and video calls use end-to-end encryption by default.",
      },
    ],
  },
];

export function Faq() {
  return (
    <section
      className={cn(
        "bg-background text-foreground w-full py-16 sm:px-10 md:py-24",
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 md:gap-24 md:px-6 lg:px-8">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="flex flex-col gap-4 lg:sticky lg:top-8 lg:col-span-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {category.title}
              </h2>
              {category.description && (
                <div className="text-muted-foreground text-base leading-relaxed md:text-lg">
                  {category.description}
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <Accordion multiple={false} className="w-full">
                {category.items.map((item, itemIdx) => (
                  <AccordionItem
                    key={itemIdx}
                    value={`item-${idx}-${itemIdx}`}
                    className="border-border/80 border-b"
                  >
                    <AccordionTrigger className="hover:text-primary py-5 text-left text-lg font-medium transition-colors hover:no-underline md:text-xl">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed md:text-lg lg:pr-12">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}