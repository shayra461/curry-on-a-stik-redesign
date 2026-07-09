import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Editorial serif-italic emphasis word, e.g. "reimagined". */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-serif font-medium italic text-lilac", className)}>{children}</span>
  );
}
