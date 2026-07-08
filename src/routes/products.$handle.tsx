import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stars } from "@/components/Stars";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { useCart } from "@/lib/cart";
import {
  getProduct,
  retailProducts,
  formatPrice,
  productTagline,
  categoryLabels,
  keyBenefits,
  groomingTips,
  faqs,
  brandStory,
  ingredients,
  type Product,
} from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$handle")({
  loader: ({ params }) => {
    const product = getProduct(params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Curry On A Stik'" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const desc = (productTagline[product.handle] ?? product.description).slice(0, 155);
    return {
      meta: [
        { title: `${product.title} — Curry On A Stik'` },
        { name: "description", content: desc },
        { property: "og:title", content: `${product.title} — Curry On A Stik'` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:image", content: product.images[0] },
        { name: "twitter:image", content: product.images[0] },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  errorComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="text-muted-foreground">This product may have moved or is no longer available.</p>
      <Button asChild>
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem, open } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const variant = product.variants[variantIdx];
  const price = Number(variant.price);
  const hasRealVariants = !(product.variants.length === 1 && variant.title === "Default Title");

  const related = retailProducts.filter((p) => p.handle !== product.handle).slice(0, 4);

  function add() {
    addItem(
      {
        handle: product.handle,
        title: product.title,
        variantTitle: variant.title === "Default Title" ? "" : variant.title,
        price,
        image: product.images[0],
      },
      qty,
    );
    toast.success("Added to cart", { description: `${product.title}${variant.title !== "Default Title" ? ` · ${variant.title}` : ""}` });
  }

  const usageSteps =
    product.category === "tool"
      ? groomingTips
      : [
          "Apply a generous amount to a wet coat, working it in with your hands or with Curry On A Stik'.",
          "Massage into the skin, focusing on affected or problem areas.",
          "Allow the formula to sit briefly so the active ingredients can work.",
          "Rinse thoroughly and repeat as needed for best results.",
        ];

  return (
    <>
      <section className="container-page py-6 md:py-10">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>{" "}
          / <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border bg-cream">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="aspect-square w-full object-contain p-6 sm:p-10"
                fetchPriority="high"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {product.images.slice(0, 12).map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "overflow-hidden rounded-lg border bg-cream",
                      i === activeImage ? "border-primary ring-1 ring-primary" : "border-border",
                    )}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {categoryLabels[product.category]}
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl">{product.title}</h1>
            <div className="flex items-center gap-3">
              <Stars />
              <span className="text-sm text-muted-foreground">Loved by 50,000+ fur parents</span>
            </div>
            {productTagline[product.handle] && (
              <p className="text-lg text-muted-foreground">{productTagline[product.handle]}</p>
            )}
            <div className="text-3xl font-bold">{formatPrice(price)}</div>

            {hasRealVariants && (
              <div>
                <p className="mb-2 text-sm font-semibold">
                  {product.options.join(" · ") || "Options"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.title}
                      onClick={() => setVariantIdx(i)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                        i === variantIdx
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-foreground hover:border-primary/50",
                      )}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-foreground"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-foreground"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button size="xl" className="flex-1" onClick={add}>
                Add to Cart · {formatPrice(price * qty)}
              </Button>
            </div>
            <Button variant="outline" size="lg" onClick={() => { add(); open(); }}>
              Buy Now
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-cream p-4">
              {[
                { icon: RotateCcw, t: "30-Day Money Back" },
                { icon: Truck, t: "Fast, Tracked Shipping" },
                { icon: Lock, t: "Secure Checkout" },
                { icon: ShieldCheck, t: "Vet Tested & Approved" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-2 text-sm font-medium">
                  <b.icon className="h-4 w-4 shrink-0 text-primary" />
                  {b.t}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose-sm text-muted-foreground">
              <p className="leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / Ingredients / Usage / FAQ */}
      <section className="bg-cream">
        <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">
              {product.category === "tool" ? "Key benefits" : "Benefits"}
            </h2>
            <ul className="mt-5 grid gap-3">
              {(product.category === "tool"
                ? keyBenefits
                : [
                    "Therapeutic nano-copper technology",
                    "Anti-inflammatory, anti-oxidative & anti-microbial",
                    "Soothes, heals and protects the skin",
                    "Leaves the coat moisturized with a healthy shine",
                    "Crafted to be gentle on your animal's skin",
                    "Veterinarian recommended (Dr. Selmer, TCVM)",
                  ]
              ).map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {product.category === "tool" ? "How to use" : "Usage instructions"}
            </h2>
            <ol className="mt-5 grid gap-3">
              {usageSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {product.category !== "tool" && (
        <section className="container-page py-14 md:py-16">
          <h2 className="text-2xl font-bold">Ingredients</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ingredients.map((ing) => (
              <div key={ing.name} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="text-base font-bold">{ing.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{ing.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{brandStory.vet}</p>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page pb-14 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
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

      {/* Related */}
      <section className="bg-cream">
        <div className="container-page py-14 md:py-16">
          <SectionHeading align="left" title="You may also like" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile add-to-cart */}
      <div className="sticky bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden [box-shadow:var(--shadow-sticky)]">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{product.title}</p>
            <p className="text-sm font-bold text-primary">{formatPrice(price)}</p>
          </div>
          <Button size="lg" onClick={add} className="shrink-0">
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
