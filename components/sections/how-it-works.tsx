import Image from "next/image";
import { UserPlus, MessageCircle, RefreshCw, ClipboardCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    icon: UserPlus,
    title: "Patient Begins Intake",
    description:
      "Patient receives a link or opens the intake portal. The AI agent greets them and starts the conversation.",
  },
  {
    icon: MessageCircle,
    title: "AI Asks Smart Questions",
    description:
      "Contextual, adaptive questioning captures chief complaint, history, medications, allergies, and more.",
  },
  {
    icon: RefreshCw,
    title: "Data Syncs to EHR",
    description:
      "Structured data is validated and pushed directly into the patient's electronic health record in real time.",
  },
  {
    icon: ClipboardCheck,
    title: "Provider Reviews Draft",
    description:
      "The clinician receives a complete intake summary with a preliminary diagnosis draft before the visit.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-24 sm:py-32">
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1920&q=80"
          alt="Medical team reviewing AI-assisted patient intake workflow"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/[0.85]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="From patient to provider-ready in minutes"
          subtitle="Four steps. No paper. No data entry. No wasted time."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-lg border bg-card/80 backdrop-blur-sm p-6 text-center">
                <div className="mx-auto mb-1 font-serif text-4xl font-semibold text-primary/20">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
