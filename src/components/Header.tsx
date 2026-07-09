import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { business } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Horses", search: { animal: "horse" } },
  { to: "/shop", label: "Dogs", search: { animal: "dog" } },
  { to: "/shop", label: "Cats", search: { animal: "cat" } },
  { to: "/our-story", label: "Our Story" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-foreground text-background">
        <div className="container-page py-2 text-center text-[0.72rem] font-medium leading-tight tracking-wide sm:text-xs">
          {business.banner}
        </div>
      </div>

      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="container-page">
          <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-border/70 bg-background/80 px-4 shadow-card backdrop-blur-xl sm:h-16 sm:px-6">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Curry On A Stik"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  search={"search" in link ? (link.search as never) : undefined}
                  className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-widest text-foreground/60 transition-colors hover:bg-secondary hover:text-foreground"
                  activeOptions={{ exact: false }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                onClick={open}
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-accent-foreground">
                    {count}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-foreground/40 transition-opacity",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-80 max-w-[85%] bg-background shadow-xl transition-transform",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="text-base font-extrabold">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col p-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium hover:bg-secondary"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                search={"search" in link ? (link.search as never) : undefined}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
