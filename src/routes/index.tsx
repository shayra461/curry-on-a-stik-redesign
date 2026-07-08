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
      <section className="bg-background">
        <div className="container-page grid items-center gap-8 py-10 md:grid-cols-2 md:py-16 lg:gap-12">
          <div className="order-2 flex flex-col items-start gap-5 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
              <Star className="h-3.5 w-3.5 fill-star text-star" />
              Winner — Family Choice Award
            </span>
            <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              The only grooming tool you'll ever need
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Professional, therapeutic grooming, massage &amp; bathing in one
              patented tool for horses, dogs &amp; cats.
            </p>
            <div className="flex items-center gap-3">
              <Stars />
              <span className="text-sm font-medium text-muted-foreground">
                Loved by 50,000+ fur parents
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatPrice(hero.priceMin)}</span>
              <span className="text-sm text-muted-foreground">Free returns for 30 days</span>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button size="xl" onClick={addHero} className="flex-1 sm:flex-none">
                Add to Cart
              </Button>
              <Button asChild size="xl" variant="outline" className="flex-1 sm:flex-none">
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Veterinarian tested &amp; approved by the Chi Institute
            </p>
          </div>

          <div className="order-1 md:order-2">
            <div className="mx-auto max-w-md overflow-hidden rounded-3xl bg-cream p-6 sm:p-10">
              <img
                src={hero.images[0]}
                alt="Curry On A Stik' therapeutic curry comb"
                className="h-full w-full object-contain"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. BENEFITS */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Why it works"
          title="Grooming, massage & bathing — reimagined"
          subtitle="A curry comb perfected over two years by a husband-and-wife team who reviewed nearly every brush on the market."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium text-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHOP BY ANIMAL */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="Made for every coat" title="Shop by animal" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {animalCategories.map((a) => (
              <Link
                key={a.key}
                to="/shop"
                search={{ animal: a.key }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-6"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
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
      <section className="container-page py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Best sellers"
            title="Shop the collection"
          />
          <Button asChild variant="outline">
            <Link to="/shop">View all products</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {retailProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. PRODUCT STORY */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Our story"
            title="Built with veterinarians, perfected by hand"
            subtitle={brandStory.intro}
          />

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10">
            <p className="text-lg italic leading-relaxed text-foreground">
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
                  className="rounded-xl border border-border bg-card p-5 shadow-card"
                >
                  <h4 className="text-base font-bold text-foreground">{ing.name}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">{ing.text}</p>
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
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Reviews"
          title="Why customers love it"
          subtitle="Real reviews from real fur parents and professional equestrians."
        />
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="break-inside-avoid rounded-2xl border border-border bg-card p-5 shadow-card"
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
                  <span className="font-normal text-muted-foreground"> · {t.location}</span>
                )}
              </p>
            </figure>
          ))}
        </div>
      </section>

      {/* 8. VIDEO DEMONSTRATIONS */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="See it in action"
            title="Video demonstrations"
            subtitle="Watch how horses, dogs and cats respond to Curry On A Stik'."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="container-page py-16 md:py-20">
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
            <Button asChild variant="outline">
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
