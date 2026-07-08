import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-muted-foreground",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
