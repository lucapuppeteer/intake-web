import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Essentials",
    price: "$2.50",
    period: "/intake",
    description: "Everything you need to get started. Pay only for completed intakes.",
    featured: false,
    cta: "Book a Call",
    features: [
      "Pay per completed intake",
      "Basic EHR integration",
      "Email support",
      "Standard analytics dashboard",
      "English language support",
    ],
  },
  {
    name: "Professional",
    price: "$3.50",
    period: "/intake",
    description: "Advanced features for growing practices that need the full platform.",
    featured: true,
    cta: "Book a Call",
    features: [
      "Everything in Essentials",
      "Advanced EHR integration",
      "Priority support",
      "Custom intake workflows",
      "Advanced analytics & reports",
      "Multi-language support",
      "Diagnosis draft generation",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored pricing for health systems with high volume or complex needs.",
    featured: false,
    cta: "Contact Sales",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "99.99% uptime SLA",
      "Custom integrations & API",
      "On-premise deployment option",
      "SAML SSO",
      "Audit logs & compliance reports",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pricing"
          title="Pay per intake, not per seat"
          subtitle="You only pay for completed intakes. No monthly minimums, no per-user fees."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-lg border bg-card",
                  tier.featured && "ring-2 ring-primary"
                )}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Best Value
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {tier.name}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-serif text-4xl tracking-tight">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <Separator />
                <div className="flex-1 p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Button
                    className="w-full"
                    variant={tier.featured ? "default" : "outline"}
                    asChild
                  >
                    <a href={tier.name === "Enterprise" ? "#contact" : "https://calendly.com/luca-ka3s"} target={tier.name === "Enterprise" ? undefined : "_blank"} rel={tier.name === "Enterprise" ? undefined : "noopener noreferrer"}>
                      {tier.cta}
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          High volume?{" "}
          <a href="#contact" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Talk to us about custom rates
          </a>
        </p>
      </div>
    </section>
  );
}
