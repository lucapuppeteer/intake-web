import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { mark: "h-7 w-7", text: "text-base" },
    md: { mark: "h-8 w-8", text: "text-lg" },
    lg: { mark: "h-10 w-10", text: "text-xl" },
  };

  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className={s.mark}
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" className="fill-primary" />
        <rect x="20" y="10" width="8" height="28" rx="3" fill="white" />
        <rect x="10" y="20" width="28" height="8" rx="3" fill="white" />
        <circle cx="36" cy="12" r="4" className="fill-accent" />
        <circle cx="36" cy="12" r="2" fill="white" opacity="0.6" />
      </svg>
      <span className={cn("font-serif font-semibold tracking-tight", s.text)}>
        Intake<span className="text-primary">AI</span>
      </span>
    </div>
  );
}
