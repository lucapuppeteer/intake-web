import {
  Brain,
  Database,
  Link2,
  FileText,
  Globe,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questioning",
    description:
      "Context-aware follow-up questions that adapt in real time based on patient responses and medical history.",
  },
  {
    icon: Database,
    title: "Smart Data Capture",
    description:
      "Structured clinical data extraction from natural conversation — demographics, symptoms, medications, and more.",
  },
  {
    icon: Link2,
    title: "EHR Integration",
    description:
      "Seamless connectivity with major EHR systems including Epic, Cerner, Athenahealth, and AllScripts.",
  },
  {
    icon: FileText,
    title: "Diagnosis Draft",
    description:
      "AI-generated preliminary diagnosis with supporting evidence, ready for provider review and confirmation.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Conduct intake in 30+ languages, breaking down barriers for diverse patient populations.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track intake completion rates, average times, common conditions, and workflow bottlenecks in a live dashboard.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title="Everything You Need for Smarter Intake"
          subtitle="A comprehensive AI intake solution built for modern healthcare practices."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <Card className="group h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
