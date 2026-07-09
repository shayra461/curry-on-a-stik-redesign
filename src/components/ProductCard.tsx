import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/Stars";
import { useCart } from "@/lib/cart";
import { priceLabel, productTagline, formatPrice, categoryLabels, type Product } from "@/data/site";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const image = product.images[0];
  const hasVariants = product.variants.length > 1;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    const v = product.variants[0];
    addItem({
      handle: product.handle,
      title: product.title,
      variantTitle: v.title === "Default Title" ? "" : v.title,
      price: Number(v.price),
      image,
    });
    toast.success("Added to cart", { description: product.title });
  }

  return (
    <Link
      to="/products/$handle"
      params={{ handle: product.handle }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-5"
        />
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-semibold text-secondary-foreground">
          {categoryLabels[product.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Stars size={14} />
        <h3 className="text-base font-bold leading-snug text-foreground">{product.title}</h3>
        {productTagline[product.handle] && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {productTagline[product.handle]}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-bold text-foreground">{priceLabel(product)}</span>
          {hasVariants ? (
            <Button size="sm" variant="secondary" className="pointer-events-none">
              Options
            </Button>
          ) : (
            <Button size="sm" onClick={quickAdd} aria-label={`Add ${product.title} to cart`}>
              <Plus /> Add
            </Button>
          )}
        </div>
        <span className="sr-only">{formatPrice(product.priceMin)}</span>
      </div>
    </Link>
  );
}
