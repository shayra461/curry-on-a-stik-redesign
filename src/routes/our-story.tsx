import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustBar } from "@/components/TrustBar";
import { brandStory, ingredients, keyBenefits, getProduct } from "@/data/site";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Curry On A Stik'" },
      {
        name: "description",
        content:
          "Meet Jeff & Sharon, the husband-and-wife team behind Curry On A Stik', and discover the Corakko therapeutic line built with veterinarians.",
      },
      { property: "og:title", content: "Our Story — Curry On A Stik'" },
      {
        property: "og:description",
        content:
          "The husband-and-wife team and veterinary science behind Curry On A Stik' & Corakko.",
      },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  const hero = getProduct("curry-on-a-stik")!;
  const shampoo = getProduct("corakko-canine-shampoo")!;

  return (
    <>
      <section className="bg-cream">
        <div className="container-page py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Our Story
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl">A better way to groom</h1>
            <p className="mt-4 text-lg text-muted-foreground">{brandStory.intro}</p>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="container-page py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-cream p-8 sm:p-12">
            <img
              src={hero.images[0]}
              alt="Curry On A Stik'"
              loading="lazy"
              className="mx-auto max-w-sm object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">From the barn, by hand</h2>
            <p className="mt-4 text-lg italic leading-relaxed text-foreground">
              {brandStory.origin}
            </p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              — Sharon &amp; Jeff, founders
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {keyBenefits.slice(0, 6).map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Corakko */}
      <section className="bg-cream">
        <div className="container-page py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold md:text-3xl">The Corakko therapeutic line</h2>
              <p className="mt-4 text-muted-foreground">{brandStory.corakko}</p>
              <p className="mt-3 text-muted-foreground">{brandStory.corakkoDetail}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="rounded-xl border border-border bg-card p-5 shadow-card"
                  >
                    <h3 className="text-base font-bold">{ing.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{ing.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl bg-background p-8 sm:p-12 lg:order-2">
              <img
                src={shampoo.images[0]}
                alt="Corakko therapeutic shampoo"
                loading="lazy"
                className="mx-auto max-w-sm object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vet + awards */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading eyebrow="Trusted & recognized" title="Backed by veterinary science" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
            <ShieldCheck className="h-7 w-7 shrink-0 text-primary" />
            <div>
              <h3 className="text-base font-bold">Veterinarian recommended</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{brandStory.vet}</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
            <Award className="h-7 w-7 shrink-0 text-accent" />
            <div>
              <h3 className="text-base font-bold">Award winning</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{brandStory.awards}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
