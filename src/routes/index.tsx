import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Star,
  ShieldCheck,
  ArrowRight,
  Quote,
  X,
  Hand,
  Heart,
  Sparkles,
  Repeat,
  Droplets,
  Activity,
  Zap,
  Droplet,
  Leaf,
  Sparkle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  VideoItem,
  faqs,
  ingredients,
  brandStory,
  formatPrice,
} from "@/data/site";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  {
    id: "handle",
    title: "Ergonomic TPE Handle",
    description:
      "Balanced weight fits right or left hand comfortably, reducing finger and joint stress.",
    icon: Hand,
    dotCoords: "left-[50%] top-[38%]",
  },
  {
    id: "teeth",
    title: "Coarse Massage Teeth",
    description: "Deep massaging action stimulates blood flow and loosens dead hair/fur.",
    icon: Heart,
    dotCoords: "left-[20%] top-[28%]",
  },
  {
    id: "bristles",
    title: "Fine Finishing Bristles",
    description: "Gentle grooming for sensitive spots like the face, chest, and legs.",
    icon: Sparkles,
    dotCoords: "left-[25%] bottom-[32%]",
  },
] as const;

const sellerDetailsMap: Record<string, { tag: string; description: string; bullets: string[] }> = {
  "curry-on-a-stik": {
    tag: "Therapeutic Tool",
    description:
      "The patented, veterinarian-approved therapeutic massage & grooming brush that promotes skin health and blood circulation for horses, dogs, and cats.",
    bullets: [
      "Dual-sided teeth for all coats",
      "Ergonomic pocket-fit handle",
      "Works wet during baths or dry",
    ],
  },
  "complete-grooming-kit-save-10": {
    tag: "Ultimate Bundle",
    description:
      "Get the complete veterinary-developed grooming collection. Pairs the patented massage brush with Chile's medicinal herbal shampoo and anti-fungal copper salve.",
    bullets: [
      "Combines all 3 wellness products",
      "Includes skin-healing copper salve",
      "Saves 10% instantly compared to separate items",
    ],
  },
  "corakko-canine-shampoo": {
    tag: "Skin Care Formula",
    description:
      "Infused with nano-copper technology and Chile's healing Quillac plant extract to treat skin diseases, stop itchiness, and prevent fungal growth.",
    bullets: [
      "Nano-copper antiseptic defense",
      "Chilean herb extract calms skin",
      "Maintains deep coat shine & health",
    ],
  },
};

function Index() {
  const { addItem } = useCart();
  const hero = getProduct("curry-on-a-stik")!;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeFeature, setActiveFeature] = useState<"handle" | "teeth" | "bristles" | null>(null);
  const [activeBestSeller, setActiveBestSeller] = useState<string>("5753876676768");

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.05 },
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getAvatarStyles = (name: string) => {
    const code = name.charCodeAt(0) % 3;
    if (code === 0) return "bg-primary/15 text-primary border border-primary/20";
    if (code === 1) return "bg-accent/15 text-accent border border-accent/20";
    return "bg-lilac-soft text-lilac border border-lilac/20";
  };

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
          <div className="absolute -right-20 -top-24 h-[32rem] w-[32rem] rounded-full bg-lilac-soft/60 blur-3xl animate-float-slow" />
          <div className="absolute -left-24 top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float-reverse" />

          {/* Floating organic wellness symbols */}
          <div className="absolute left-[8%] top-[25%] hidden lg:block parallax-slow-up animate-float-slow opacity-25">
            <Leaf className="h-10 w-10 text-primary stroke-[1.2] fill-primary/10" />
          </div>
          <div className="absolute right-[5%] top-[15%] hidden lg:block parallax-medium-down animate-float-reverse opacity-30">
            <Sparkles className="h-8 w-8 text-accent stroke-[1.2] fill-accent/5" />
          </div>
        </div>
        <div className="container-page grid items-center gap-10 pb-16 pt-12 md:grid-cols-2 md:pb-20 md:pt-16 lg:gap-16">
          <div className="order-2 flex flex-col items-start gap-6 md:order-1 reveal-on-scroll">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-star text-star" />
              Winner — Family Choice Award
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[4rem]">
              The only grooming tool you'll <Accent>ever need</Accent>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Professional, therapeutic grooming, massage &amp; bathing in one patented tool for
              horses, dogs &amp; cats. The gold standard of pet wellness.
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
                <span className="text-3xl font-extrabold">{formatPrice(hero.priceMin)}</span>
                <span className="text-xs text-muted-foreground">Free 30-day returns</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button size="xl" onClick={addHero} className="flex-1 rounded-full sm:flex-none">
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

          <div className="order-1 md:order-2 reveal-on-scroll">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 shadow-card-hover sm:p-10">
                <img
                  src="/hero_brush.jpg"
                  alt="Curry On A Stik' therapeutic curry comb"
                  className="h-full w-full object-contain"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 hidden -rotate-3 rounded-[1.5rem] bg-accent px-6 py-4 text-accent-foreground shadow-card-hover sm:block">
                <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-80">
                  Original Design
                </p>
                <p className="font-serif text-lg font-semibold italic">Dual-Sided Action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. BENEFITS */}
      <section className="relative overflow-hidden container-page py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Floating water droplet */}
          <div className="absolute left-[4%] top-[40%] hidden lg:block parallax-medium-up animate-float-slow opacity-20">
            <Droplet className="h-9 w-9 text-blue-400 stroke-[1.2] fill-blue-400/5" />
          </div>
          {/* Floating sparkles */}
          <div className="absolute right-[6%] top-[25%] hidden lg:block parallax-slow-down animate-float-reverse opacity-25">
            <Sparkle className="h-7 w-7 text-accent stroke-[1.2]" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#cd7f32]">
            Why it works
          </span>
          <h2 className="max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Grooming, massage &amp; bathing — <Accent>reimagined</Accent>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            A curry comb perfected over two years by a husband-and-wife team who reviewed nearly
            every brush on the market.
          </p>
        </div>

        {/* Thematic Pillars Benefits Grid */}
        {(() => {
          const pillars = [
            {
              id: "grooming",
              title: "I. Grooming & Bathing",
              description: "Shedding, cleaning, and daily coat maintenance.",
              items: [
                { text: benefits[0], icon: Sparkles, color: "bg-[#cd7f32]/10 text-[#cd7f32]" },
                { text: benefits[4], icon: Repeat, color: "bg-[#cd7f32]/10 text-[#cd7f32]" },
                { text: benefits[7], icon: Droplets, color: "bg-[#cd7f32]/10 text-[#cd7f32]" },
              ],
            },
            {
              id: "massage",
              title: "II. Massage & Circulation",
              description: "Deep tissue massage and coat oil stimulation.",
              items: [
                { text: benefits[3], icon: Activity, color: "bg-primary/10 text-primary" },
                { text: benefits[5], icon: Zap, color: "bg-primary/10 text-primary" },
                { text: benefits[6], icon: Droplet, color: "bg-primary/10 text-primary" },
              ],
            },
            {
              id: "wellness",
              title: "III. Scientific Wellness",
              description: "Ergonomics, joint care, and veterinary approval.",
              items: [
                { text: benefits[2], icon: Hand, color: "bg-accent/10 text-accent" },
                { text: benefits[1], icon: Heart, color: "bg-accent/10 text-accent" },
                { text: benefits[8], icon: ShieldCheck, color: "bg-accent/10 text-accent" },
              ],
            },
          ];

          return (
            <div className="mt-16 grid gap-8 md:grid-cols-3 text-left reveal-on-scroll">
              {pillars.map((col) => (
                <div key={col.id} className="space-y-5">
                  {/* Column Header */}
                  <div className="border-b border-border/65 pb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                      {col.title}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">{col.description}</p>
                  </div>

                  {/* Cards Stack */}
                  <div className="flex flex-col gap-4">
                    {col.items.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={idx}
                          className="group flex items-start gap-4 rounded-[1.8rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/40"
                        >
                          <span
                            className={cn(
                              "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1a1a1a] group-hover:text-white",
                              item.color,
                            )}
                          >
                            <IconComponent className="h-4.5 w-4.5 stroke-[1.8]" />
                          </span>
                          <p className="pt-0.5 text-sm font-semibold leading-relaxed text-foreground">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* 4. SHOP BY ANIMAL */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-24">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end reveal-on-scroll">
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
          <div className="grid gap-6 sm:grid-cols-3 reveal-on-scroll">
            {animalCategories.map((a) => (
              <Link
                key={a.key}
                to="/shop"
                search={{ animal: a.key }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white flex items-end justify-center pb-2">
                  {"tag" in a && a.tag && (
                    <span className="absolute left-4 top-4 z-20 rounded-full bg-foreground/5 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                      {a.tag}
                    </span>
                  )}

                  {"video" in a && a.video ? (
                    a.video.endsWith(".gif") ? (
                      <img
                        src={a.video}
                        alt={a.title}
                        className="h-full w-full object-contain object-bottom transition-transform duration-500"
                        style={{
                          ...("videoStyle" in a ? (a.videoStyle as React.CSSProperties) : {}),
                        }}
                      />
                    ) : (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`h-full w-full object-contain transition-transform duration-500 ${
                          a.key === "horse" ? "object-left-bottom" : "object-bottom"
                        }`}
                        style={{
                          filter: a.video.includes("_green") ? "url(#chromakey)" : undefined,
                          ...("videoStyle" in a ? (a.videoStyle as React.CSSProperties) : {}),
                        }}
                      >
                        <source
                          src={a.video}
                          type={a.video.endsWith(".webm") ? "video/webm" : "video/mp4"}
                        />
                        {a.video.endsWith(".mov") && (
                          <source src={a.video} type="video/quicktime" />
                        )}
                      </video>
                    )
                  ) : (
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-contain p-6 transition-transform duration-500"
                      style={{
                        ...("videoStyle" in a ? (a.videoStyle as React.CSSProperties) : {}),
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6 pt-2 bg-white">
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
      <section className="relative overflow-hidden container-page py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Floating leaf */}
          <div className="absolute left-[3%] bottom-[15%] hidden lg:block parallax-slow-down animate-float-reverse opacity-25">
            <Leaf className="h-8 w-8 text-primary stroke-[1.2] fill-primary/5" />
          </div>
          {/* Floating bubble circle */}
          <div className="absolute right-[4%] top-[10%] hidden lg:block parallax-medium-up animate-float-slow opacity-15">
            <div className="h-10 w-10 rounded-full border border-accent/40 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full border border-accent/30" />
            </div>
          </div>
        </div>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end reveal-on-scroll">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Best sellers
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground font-sans">
              Shop the <Accent>collection</Accent>
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/shop">View all products</Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3 pt-6 md:pt-12 reveal-on-scroll">
          {retailProducts.map((p, idx) => {
            const isDark = idx === 1;
            const cleanTitle = p.title.split(" - ")[0];
            const tagline =
              p.handle === "curry-on-a-stik"
                ? "Veterinarian-approved massage comb"
                : p.handle === "complete-grooming-kit-save-10"
                  ? "Complete 3-step therapeutic bundle"
                  : "Nano-copper anti-fungal shampoo";
            const tags =
              p.handle === "curry-on-a-stik"
                ? ["Patented", "Dual-sided"]
                : p.handle === "complete-grooming-kit-save-10"
                  ? ["Value Set", "Save 10%"]
                  : ["Antiseptic", "Coat Shine"];

            const productImage = p.id === "5753876676768" ? "/brush_box.png" : p.images[0];

            // Soft organic radial glows for each product card
            const glowColor =
              p.handle === "curry-on-a-stik"
                ? "bg-[#cd7f32]/15"
                : p.handle === "complete-grooming-kit-save-10"
                  ? "bg-primary/25"
                  : "bg-[#a2d2ff]/25";

            const wrapperBg =
              p.handle === "curry-on-a-stik"
                ? ""
                : p.handle === "complete-grooming-kit-save-10"
                  ? "bg-[#ffffff]"
                  : "";

            return (
              <Link
                key={p.id}
                to="/products/$handle"
                params={{ handle: p.handle }}
                className={cn(
                  "group relative overflow-hidden rounded-[2.5rem] p-6 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between text-left",
                  isDark
                    ? "bg-[#1a1a1a] border border-white/5 text-white md:-translate-y-4 md:shadow-2xl"
                    : "bg-white border border-border/50 text-foreground md:translate-y-4",
                )}
              >
                {/* Header Metadata */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-[9px] font-extrabold uppercase tracking-wider",
                      isDark ? "text-white/60" : "text-muted-foreground",
                    )}
                  >
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <Stars count={5} size={11} />
                    <span className={isDark ? "text-white/70" : "text-muted-foreground"}>5.0</span>
                  </div>
                </div>

                {/* Large Image Container with Soft Circular Glow */}
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full flex items-center justify-center my-6 overflow-hidden rounded-[1.8rem] transition-all duration-500",
                    wrapperBg,
                  )}
                >
                  <div
                    className={cn(
                      "absolute h-36 w-36 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-125",
                      glowColor,
                    )}
                  />

                  <img
                    src={productImage}
                    alt={cleanTitle}
                    loading="lazy"
                    className="relative z-10 max-h-[190px] sm:max-h-[170px] lg:max-h-[220px] object-contain transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Details */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className={cn(
                        "text-xl font-extrabold tracking-tight leading-tight transition-colors",
                        isDark
                          ? "text-white group-hover:text-accent"
                          : "text-foreground group-hover:text-primary",
                      )}
                    >
                      {cleanTitle}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-xs leading-relaxed line-clamp-2",
                        isDark ? "text-white/70" : "text-muted-foreground",
                      )}
                    >
                      {tagline}
                    </p>

                    {/* Minimalist pill tags */}
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className={cn(
                            "inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border",
                            isDark
                              ? "bg-white/10 border-white/10 text-white/90"
                              : "bg-cream text-muted-foreground border-border/20",
                          )}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Purchase Actions */}
                  <div
                    className={cn(
                      "mt-4 flex items-center justify-between gap-4 border-t pt-4",
                      isDark ? "border-white/10" : "border-border/40",
                    )}
                  >
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-[10px] uppercase font-bold tracking-wider",
                          isDark ? "text-white/40" : "text-muted-foreground",
                        )}
                      >
                        Price
                      </span>
                      <span
                        className={cn(
                          "text-lg font-extrabold",
                          isDark ? "text-white" : "text-foreground",
                        )}
                      >
                        {formatPrice(p.priceMin)}
                      </span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          handle: p.handle,
                          title: p.title,
                          variantTitle: "",
                          price: p.priceMin,
                          image: productImage,
                        });
                        toast.success("Added to cart", { description: p.title });
                      }}
                      className={cn(
                        "rounded-full px-5 shadow-sm transition-all duration-300 h-9 text-xs cursor-pointer",
                        isDark
                          ? "bg-white text-black hover:bg-accent hover:text-accent-foreground"
                          : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. PRODUCT STORY */}
      <section className="relative overflow-hidden bg-cream/40">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Floating water droplets */}
          <div className="absolute right-[8%] bottom-[20%] hidden lg:block parallax-medium-down animate-float-slow opacity-20">
            <Droplets className="h-8 w-8 text-blue-400/80 stroke-[1.2]" />
          </div>
          {/* Floating leaf */}
          <div className="absolute left-[6%] top-[35%] hidden lg:block parallax-slow-up animate-float-reverse opacity-20">
            <Leaf className="h-9 w-9 text-primary stroke-[1.2] fill-primary/5" />
          </div>
        </div>
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center reveal-on-scroll">
            {/* Left Column: Interactive Hotspot Diagram */}
            <div className="relative flex items-center justify-center rounded-[2.5rem] bg-gradient-to-tr from-secondary/15 via-cream/45 to-lilac-soft/5 p-8 border border-border/40 min-h-[380px] lg:min-h-[460px] overflow-hidden">
              <img
                src="/brush_box.png"
                alt="Curry On A Stik"
                className="max-h-[360px] object-contain transition-all duration-500"
                style={{
                  filter: activeFeature ? "brightness(0.95) contrast(1.02)" : "none",
                }}
              />

              {/* Hotspot Dots */}
              {features.map((f) => {
                const isActive = activeFeature === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onMouseEnter={() => setActiveFeature(f.id)}
                    onMouseLeave={() => setActiveFeature(null)}
                    onClick={() => setActiveFeature(isActive ? null : f.id)}
                    className={cn(
                      "absolute z-20 flex h-6 w-6 items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer",
                      f.dotCoords,
                      isActive
                        ? "bg-accent text-accent-foreground scale-125"
                        : "bg-[#1a1a1a] text-white hover:bg-accent",
                    )}
                    aria-label={`Highlight ${f.title}`}
                  >
                    <span
                      className={cn(
                        "absolute h-full w-full animate-ping rounded-full bg-accent/40 opacity-75 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Interactive Tour Cards List */}
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Interactive Features Tour
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Designed for comfort, loved by pets
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Hover over the brush points or cards below to explore the design details.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {features.map((f) => {
                  const isActive = activeFeature === f.id;
                  return (
                    <div
                      key={f.id}
                      onMouseEnter={() => setActiveFeature(f.id)}
                      onMouseLeave={() => setActiveFeature(null)}
                      onClick={() => setActiveFeature(isActive ? null : f.id)}
                      className={cn(
                        "flex gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left",
                        isActive
                          ? "bg-white border-accent shadow-md translate-x-2"
                          : "bg-transparent border-transparent hover:bg-white/40 hover:border-border/60",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300",
                          isActive
                            ? "bg-accent/15 text-accent scale-105"
                            : "bg-secondary/60 text-foreground",
                        )}
                      >
                        {(() => {
                          const IconComponent = f.icon;
                          return <IconComponent className="h-5 w-5 stroke-[1.8]" />;
                        })()}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                          {f.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Founders Quote Banner */}
          <div className="mx-auto mt-16 max-w-4xl relative rounded-3xl border border-border/60 bg-white p-8 shadow-sm">
            <Quote className="absolute right-6 top-6 h-14 w-14 text-secondary/15 stroke-[1.2]" />
            <div className="max-w-3xl pr-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Our Origin Story
              </span>
              <p className="mt-3 font-serif text-xl italic leading-relaxed text-foreground">
                "{brandStory.origin}"
              </p>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  — Sharon &amp; Jeff, Founders of Curry On A Stik'
                </p>
                <Button asChild size="sm" variant="outline" className="rounded-full shrink-0">
                  <Link to="/our-story">
                    Read full story
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Active Ingredients Banner */}
          <div className="mt-16 rounded-[2.5rem] bg-[#1a1a1a] text-background p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(205,127,50,0.12),transparent_60%)] pointer-events-none" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-5 items-center">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-light">
                  Active Formula
                </span>
                <h4 className="text-2xl font-bold tracking-tight text-white md:text-3xl font-serif italic">
                  The Corakko Line
                </h4>
                <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                  {brandStory.corakko}
                </p>
              </div>

              <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
                {ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                  >
                    <h5 className="text-base font-bold text-white tracking-wide">{ing.name}</h5>
                    <p className="mt-1.5 text-xs text-white/60 leading-relaxed">{ing.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CUSTOMERS LOVE IT */}
      <section className="container-page py-16 md:py-24 reveal-on-scroll">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Reviews</span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Why customers <Accent>love it</Accent>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Real reviews from real fur parents and professional equestrians.
          </p>
        </div>

        {/* Rating Summary Panel */}
        <div className="mx-auto mt-8 max-w-4xl rounded-[1.5rem] border border-border bg-card p-6 md:p-8 shadow-card grid gap-6 md:grid-cols-12 items-center">
          {/* Left Column: Big Number */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b border-border md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-6">
            <span className="text-5xl font-black text-foreground">4.9</span>
            <div className="mt-2">
              <Stars count={5} size={18} />
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Based on 120+ reviews
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary border border-primary/20">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Verified
            </div>
          </div>

          {/* Middle Column: Rating Bars */}
          <div className="md:col-span-5 space-y-2">
            {[
              { stars: 5, percentage: 95 },
              { stars: 4, percentage: 5 },
              { stars: 3, percentage: 0 },
              { stars: 2, percentage: 0 },
              { stars: 1, percentage: 0 },
            ].map((row) => (
              <div
                key={row.stars}
                className="flex items-center gap-3 text-xs font-semibold text-muted-foreground"
              >
                <span className="w-12 flex items-center gap-1">
                  {row.stars} <Star className="h-3.5 w-3.5 fill-star text-star" />
                </span>
                <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-star rounded-full"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right">{row.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Right Column: Key Takeaway */}
          <div className="md:col-span-3 flex flex-col justify-center text-center md:text-left md:pl-6 space-y-2">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">
              Why it excels
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Pet owners report instant deshedding success, relief from hand arthritis/fatigue, and
              a soothing massage experience that calms even nervous pets.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "All Reviews", icon: "⭐" },
            { id: "horse", label: "Horses", icon: "🐴" },
            { id: "dog", label: "Dogs", icon: "🐶" },
            { id: "cat", label: "Cats", icon: "🐱" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? testimonials.length
                : testimonials.filter((t) => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-card hover:bg-secondary text-foreground border border-border"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 transition-all duration-300">
          {(selectedCategory === "all"
            ? testimonials
            : testimonials.filter((t) => t.category === selectedCategory)
          ).map((t, i) => (
            <figure
              key={i}
              className="break-inside-avoid relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30"
            >
              {/* Quote Icon Watermark - solid very low opacity color */}
              <Quote className="absolute right-4 bottom-4 h-16 w-16 text-foreground/[0.03] -rotate-12 pointer-events-none" />

              <div className="flex items-center justify-between gap-2 relative z-10">
                <Stars count={t.rating || 5} size={13} />
                {t.category && t.category !== "general" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    {t.category === "horse"
                      ? "Horse 🐴"
                      : t.category === "dog"
                        ? "Dog 🐶"
                        : "Cat 🐱"}
                  </span>
                )}
              </div>

              {t.title && (
                <figcaption className="mt-4 text-sm font-bold text-foreground relative z-10">
                  {t.title}
                </figcaption>
              )}

              <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground relative z-10">
                "{t.quote}"
              </blockquote>

              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3 relative z-10">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarStyles(t.name)}`}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    {t.name}
                    {t.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" /> Verified
                      </span>
                    )}
                  </p>
                  {t.location && <p className="text-[10px] text-muted-foreground">{t.location}</p>}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* 8. VIDEO DEMONSTRATIONS */}
      <section className="bg-cream">
        <div className="container-page py-16 md:py-24 reveal-on-scroll">
          <SectionHeading
            eyebrow="See it in action"
            title="Video demonstrations"
            subtitle="Watch how horses, dogs and cats respond to Curry On A Stik'."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {videos.map((v) => (
              <div
                key={v.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
              >
                <VideoCard video={v} onClick={() => setActiveVideo(v)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close video player"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
            <iframe
              src={
                activeVideo.provider === "vimeo"
                  ? `https://player.vimeo.com/video/${activeVideo.id}?title=0&byline=0&portrait=0&autoplay=1`
                  : `https://www.youtube.com/embed/${activeVideo.id}?rel=0&autoplay=1`
              }
              title={activeVideo.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}

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

      {/* Chroma Key Green Screen Filter */}
      <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <filter id="chromakey">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      4.5 -5.5 4.5 1 -0.1"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
