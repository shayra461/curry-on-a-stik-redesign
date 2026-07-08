import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { retailProducts, categoryLabels, type Product } from "@/data/site";

type ShopSearch = {
  animal?: "horse" | "dog" | "cat";
  category?: Product["category"];
  sort?: "featured" | "price-asc" | "price-desc";
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const animals = ["horse", "dog", "cat"];
    const cats = ["tool", "shampoo", "topical", "other"];
    const sorts = ["featured", "price-asc", "price-desc"];
    return {
      animal: animals.includes(search.animal as string)
        ? (search.animal as ShopSearch["animal"])
        : undefined,
      category: cats.includes(search.category as string)
        ? (search.category as Product["category"])
        : undefined,
      sort: sorts.includes(search.sort as string)
        ? (search.sort as ShopSearch["sort"])
        : "featured",
    };
  },
  head: () => ({
    meta: [
      { title: "Shop All Products — Curry On A Stik'" },
      {
        name: "description",
        content:
          "Shop therapeutic grooming tools, Corakko shampoos and topical care for horses, dogs and cats. Veterinarian tested & approved.",
      },
      { property: "og:title", content: "Shop All Products — Curry On A Stik'" },
      {
        property: "og:description",
        content: "Therapeutic grooming tools and Corakko skin care for horses, dogs and cats.",
      },
    ],
  }),
  component: ShopPage,
});

const animalFilters = [
  { key: undefined, label: "All Animals" },
  { key: "horse", label: "Horses" },
  { key: "dog", label: "Dogs" },
  { key: "cat", label: "Cats" },
] as const;

function ShopPage() {
  const { animal, category, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const filtered = useMemo(() => {
    let list = [...retailProducts];
    if (animal) list = list.filter((p) => p.animals.includes(animal));
    if (category) list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.priceMin - b.priceMin);
    if (sort === "price-desc") list.sort((a, b) => b.priceMin - a.priceMin);
    return list;
  }, [animal, category, sort]);

  function update(patch: Partial<ShopSearch>) {
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...patch }) });
  }

  return (
    <>
      <section className="bg-cream">
        <div className="container-page py-12 md:py-16">
          <nav className="mb-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            / <span className="text-foreground">Shop</span>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">All Products</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Professional, therapeutic grooming and skin care for every animal.
          </p>
        </div>
      </section>

      <section className="container-page py-8 md:py-12">
        {/* Filters + sort */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {animalFilters.map((f) => {
              const active = animal === f.key;
              return (
                <Button
                  key={f.label}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() => update({ animal: f.key })}
                >
                  {f.label}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={category ?? "all"}
              onValueChange={(v) =>
                update({ category: v === "all" ? undefined : (v as Product["category"]) })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tool">{categoryLabels.tool}</SelectItem>
                <SelectItem value="shampoo">{categoryLabels.shampoo}</SelectItem>
                <SelectItem value="topical">{categoryLabels.topical}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sort ?? "featured"}
              onValueChange={(v) => update({ sort: v as ShopSearch["sort"] })}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No products match these filters.</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => update({ animal: undefined, category: undefined })}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      <TrustBar />
    </>
  );
}
