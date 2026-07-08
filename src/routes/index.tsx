import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrustBar } from "@/components/TrustBar";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { VideoCard } from "@/components/VideoCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Stars } from "@/components/Stars";
import { Accent } from "@/components/Accent";
import { useCart } from "@/lib/cart";
import {
  getProduct,
  retailProducts,
  benefits,
  animalCategories,
  testimonials,
  videos,
  faqs,
  ingredients,
  brandStory,
  formatPrice,
} from "@/data/site";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { addItem } = useCart();
  const hero = getProduct("curry-on-a-stik")!;

  function addHero() {
    addItem({
      handle: hero.handle,
      title: hero.title,
      variantTitle: "",
      price: hero.priceMin,
      image: hero.images[0],
    });
    toast.success("Added to cart", { description: hero.title });
  }

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-24 h-[32rem] w-[32rem] rounded-full bg-lilac-soft/60 blur-3xl" />
          <div className="absolute -left-24 top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container-page grid items-center gap-10 pb-16 pt-12 md:grid-cols-2 md:pb-20 md:pt-16 lg:gap-16">
          <div className="order-2 flex flex-col items-start gap-6 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-star text-star" />
              Winner — Family Choice Award
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[4rem]">
              The only grooming tool you'll <Accent>ever need</Accent>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Professional, therapeutic grooming, massage &amp; bathing in one
              patented tool for horses, dogs &amp; cats. The gold standard of pet
              wellness.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-1">
                <Stars size={16} />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Loved by 50,000+ fur parents
                </p>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold">
                  {formatPrice(hero.priceMin)}
                </span>
                <span className="text-xs text-muted-foreground">
                  Free 30-day returns
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button
                size="xl"
                onClick={addHero}
                className="flex-1 rounded-full sm:flex-none"
              >
                Add to Cart
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="flex-1 rounded-full sm:flex-none"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Veterinarian tested &amp; approved by the Chi Institute
            </p>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 shadow-card-hover sm:p-10">
                <img
                  src={hero.images[0]}
                  alt="Curry On A Stik' therapeutic curry comb"
                  className="h-full w-full object-contain"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 hidden -rotate-3 rounded-[1.5rem] bg-accent px-6 py-4 text-accent-foreground shadow-card-hover sm:block">
                <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-80">
                  Original Design
                </p>
                <p className="font-serif text-lg font-semibold italic">
                  Dual-Sided Action
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. BENEFITS */}
      <section className="container-page py-16 md:py-24">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Why it works
          </span>
          <h2 className="max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Grooming, massage &amp; bathing — <Accent>reimagined</Accent>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            A curry comb perfected over two years by a husband-and-wife team who
            reviewed nearly every brush on the market.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b}
              className="group flex items-start gap-4 rounded-[2rem] border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Check className="h-5 w-5" />
              </span>
              <p className="pt-1 text-[15px] font-medium leading-relaxed text-foreground">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHOP BY ANIMAL */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-24">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Curated collections
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Shop by <Accent>animal</Accent>
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/shop">View catalog</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {animalCategories.map((a) => (
              <Link
                key={a.key}
                to="/shop"
                search={{ animal: a.key }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-secondary to-lilac-soft/40">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="text-xl font-bold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.blurb}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Shop {a.title.replace("For ", "")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT COLLECTION */}
      <section className="container-page py-16 md:py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Best sellers
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Shop the <Accent>collection</Accent>
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/shop">View all products</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {retailProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. PRODUCT STORY */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            eyebrow="Our story"
            title="Built with veterinarians, perfected by hand"
            subtitle={brandStory.intro}
          />

          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-border bg-card p-6 shadow-card sm:p-10">
            <p className="font-serif text-xl italic leading-relaxed text-foreground">
              {brandStory.origin}
            </p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              — Sharon &amp; Jeff, founders of Curry On A Stik'
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <h3 className="text-center text-xl font-bold">
              The Corakko therapeutic line
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              {brandStory.corakko}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="rounded-[1.5rem] border border-border bg-card p-6 shadow-card"
                >
                  <h4 className="text-base font-bold text-foreground">
                    {ing.name}
                  </h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {ing.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="link">
                <Link to="/our-story">
                  Read the full story <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CUSTOMERS LOVE IT */}
      <section className="container-page py-16 md:py-24">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Reviews
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Why customers <Accent>love it</Accent>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Real reviews from real fur parents and professional equestrians.
          </p>
        </div>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="break-inside-avoid rounded-[1.5rem] border border-border bg-card p-6 shadow-card"
            >
              <Stars size={14} />
              {t.title && (
                <figcaption className="mt-3 text-sm font-bold text-foreground">
                  {t.title}
                </figcaption>
              )}
              <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground">
                "{t.quote}"
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {t.name}
                {t.location && (
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    · {t.location}
                  </span>
                )}
              </p>
            </figure>
          ))}
        </div>
      </section>

      {/* 8. VIDEO DEMONSTRATIONS */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-24">
          <SectionHeading
            eyebrow="See it in action"
            title="Video demonstrations"
            subtitle="Watch how horses, dogs and cats respond to Curry On A Stik'."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.slice(0, 5).map((f, i) => (
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
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/faq">View all FAQs &amp; grooming tips</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <Newsletter />
    </>
  );
}
