import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "For small practices getting started with AI intake.",
    featured: false,
    cta: "Start Free Trial",
    features: [
      "Up to 100 intakes per month",
      "Basic EHR integration",
      "Email support",
      "Standard analytics dashboard",
      "English language support",
    ],
  },
  {
    name: "Professional",
    price: "$799",
    period: "/month",
    description: "For growing practices that need full-featured AI intake.",
    featured: true,
    cta: "Start Free Trial",
    features: [
      "Unlimited intakes",
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
    description: "For health systems with complex requirements.",
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
    <section id="pricing" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your practice. All plans include a 14-day free trial."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <Card
                className={cn(
                  "relative flex h-full flex-col",
                  tier.featured &&
                    "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                )}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {tier.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full"
                    variant={tier.featured ? "default" : "outline"}
                    asChild
                  >
                    <a href="#contact">{tier.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
