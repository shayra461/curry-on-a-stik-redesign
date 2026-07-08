import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  count = 5,
  className,
  size = 16,
}: {
  count?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(i < count ? "fill-star text-star" : "fill-muted text-muted")}
        />
      ))}
    </div>
  );
}
