import { ShieldCheck, Lock, Truck, BadgeCheck } from "lucide-react";
import { trustItems } from "@/data/site";

const iconMap = {
  "shield-check": ShieldCheck,
  lock: Lock,
  truck: Truck,
  "badge-check": BadgeCheck,
} as const;

export function TrustBar() {
  return (
    <section className="border-y border-border bg-cream">
      <div className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:grid-cols-4 md:py-10">
        {trustItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight text-foreground">
                  {item.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
