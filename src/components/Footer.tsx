import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { business } from "@/data/site";

const shopLinks = [
  { to: "/shop", label: "All Products" },
  { to: "/products/$handle", params: { handle: "curry-on-a-stik" }, label: "Curry On A Stik'" },
  { to: "/products/$handle", params: { handle: "corakko-canine-shampoo" }, label: "Corakko Shampoo" },
  { to: "/products/$handle", params: { handle: "corakko-snake-oil-8oz" }, label: "Corakko Snake Oil" },
] as const;

const infoLinks = [
  { to: "/our-story", label: "Our Story" },
  { to: "/faq", label: "FAQ & Grooming Tips" },
] as const;

const policyLinks = [
  { slug: "shipping-policy", label: "Shipping Policy" },
  { slug: "refund-policy", label: "Refund Policy" },
  { slug: "privacy-policy", label: "Privacy Policy" },
  { slug: "terms-of-service", label: "Terms of Service" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid grid-cols-2 gap-8 py-14 md:grid-cols-4 lg:py-16">
        <div className="col-span-2 md:col-span-1">
          <span className="text-lg font-extrabold tracking-tight">
            Curry On A Stik<span className="text-accent">'</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {business.tagline}
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://www.facebook.com/curryonastik"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 hover:bg-secondary hover:text-foreground"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/curryonastik"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 hover:bg-secondary hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 hover:bg-secondary hover:text-foreground"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Shop</h3>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  params={"params" in l ? (l.params as never) : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Learn</h3>
          <ul className="mt-4 space-y-2.5">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Policies</h3>
          <ul className="mt-4 space-y-2.5">
            {policyLinks.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/policies/$policy"
                  params={{ policy: l.slug }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="mailto:info@curryonastik.com"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" /> info@curryonastik.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Curry On A Stik'. All rights reserved.</p>
          <p>Veterinarian tested & approved · Endorsed by the Chi University</p>
        </div>
      </div>
    </footer>
  );
}
