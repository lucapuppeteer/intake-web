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
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="Four Steps to Effortless Intake"
          subtitle="From patient engagement to provider-ready insights in minutes, not hours."
        />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.15}>
              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-bold">
                  {i + 1}
                </div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
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
