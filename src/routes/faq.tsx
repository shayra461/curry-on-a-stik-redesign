import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";
import { Newsletter } from "@/components/Newsletter";
import { faqs, groomingTips } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Grooming Tips — Curry On A Stik'" },
      {
        name: "description",
        content:
          "Answers to common questions about Curry On A Stik' and Corakko, plus expert grooming and massage tips for horses, dogs and cats.",
      },
      { property: "og:title", content: "FAQ & Grooming Tips — Curry On A Stik'" },
      {
        property: "og:description",
        content: "Common questions and expert grooming tips for horses, dogs and cats.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl">FAQ &amp; grooming tips</h1>
            <p className="mt-3 text-muted-foreground">
              Everything you need to get the most out of Curry On A Stik' and Corakko.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page py-14 md:py-16">
          <SectionHeading
            eyebrow="Expert technique"
            title="Grooming tips for a better experience"
            subtitle="Having the right tool is vital — here's how to make grooming highly effective and therapeutic."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {groomingTips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/products/$handle" params={{ handle: "curry-on-a-stik" }}>
                Get your Curry On A Stik'
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
