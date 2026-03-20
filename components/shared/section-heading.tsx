import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" && "mx-auto max-w-2xl text-center"
      )}
    >
      {badge && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          {badge}
        </p>
      )}
      <h2
        id={id}
        className="font-serif text-3xl tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
