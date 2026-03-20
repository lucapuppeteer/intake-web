import {
  Brain,
  Database,
  Link2,
  FileText,
  Globe,
  BarChart3,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    icon: Brain,
    title: "Adaptive AI Questioning",
    description:
      "Context-aware follow-up questions that adapt in real time based on patient responses and medical history.",
  },
  {
    icon: Database,
    title: "Structured Data Capture",
    description:
      "Clinical data extraction from natural conversation — demographics, symptoms, medications, and more.",
  },
  {
    icon: Link2,
    title: "EHR Integration",
    description:
      "Seamless connectivity with Epic, Cerner, Athenahealth, AllScripts, and other major EHR systems.",
  },
  {
    icon: FileText,
    title: "Diagnosis Drafts",
    description:
      "AI-generated preliminary diagnosis with supporting evidence, ready for provider review and confirmation.",
  },
  {
    icon: Globe,
    title: "30+ Languages",
    description:
      "Conduct intake in the patient's preferred language, breaking down barriers for diverse populations.",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description:
      "Track completion rates, average times, common conditions, and workflow bottlenecks in real time.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Capabilities"
          title="Built for clinical workflows"
          subtitle="Everything your practice needs to modernize intake — without disrupting the workflows your team already knows."
        />

        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.06}>
              <div className="flex h-full flex-col bg-card p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
