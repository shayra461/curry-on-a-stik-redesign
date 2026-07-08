import { ShieldCheck, Lock, Truck, BadgeCheck } from "lucide-react";
import { trustItems } from "@/data/site";

const iconMap = {
  "shield-check": ShieldCheck,
  lock: Lock,
  truck: Truck,
  "badge-check": BadgeCheck,
} as const;

const tints = [
  "bg-primary/10 text-primary",
  "bg-lilac-soft text-lilac",
  "bg-accent/10 text-accent",
  "bg-star/15 text-foreground",
] as const;

export function TrustBar() {
  return (
    <section className="container-page -mt-6 pb-4">
      <div className="grid grid-cols-2 gap-6 rounded-[2rem] border border-border bg-card px-6 py-8 shadow-card sm:gap-8 lg:grid-cols-4 lg:px-10 lg:py-10">
        {trustItems.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={item.title}
              className="group flex flex-col items-center gap-3 text-center lg:border-l lg:border-border lg:first:border-l-0"
            >
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-full transition-transform group-hover:scale-105 ${tints[i % tints.length]}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
