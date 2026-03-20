import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { IntakeFlowAnimation } from "@/components/animations/intake-flow-animation";

export function ProductExplanation() {
  return (
    <section id="product" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Product"
          title="How IntakeAI transforms your practice"
          subtitle="From the moment a patient engages, our AI replaces traditional intake — asking the right questions, structuring clinical data, and preparing providers with actionable insights."
        />

        {/* Feature 1 — Conversational AI with image */}
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Medical professional reviewing patient data on a tablet"
                width={800}
                height={534}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-8">
              <div className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:bg-primary">
                <h3 className="font-serif text-xl font-semibold">Conversational AI Intake</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our AI agent conducts natural, empathetic conversations with
                  patients — adapting questions based on their responses, medical
                  history, and presenting symptoms.
                </p>
              </div>
              <div className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:bg-accent">
                <h3 className="font-serif text-xl font-semibold">Automatic EHR Population</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Every data point captured during intake is structured and mapped
                  to your EHR fields automatically. No manual data entry, no
                  transcription errors.
                </p>
              </div>
              <div className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:bg-primary">
                <h3 className="font-serif text-xl font-semibold">Diagnosis Draft Generation</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Before the appointment begins, providers receive a concise
                  clinical summary with a preliminary diagnosis draft — reviewed
                  and confirmed by the clinician.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Feature 2 — Live product demo */}
        <div id="demo" className="mt-24 scroll-mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left" className="order-2 lg:order-1">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold tracking-tight">
                See it in action
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Watch how IntakeAI conducts a real patient conversation — capturing
                symptoms, medications, and history in a natural dialogue, then
                syncing structured data directly to the EHR.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1} className="order-1 lg:order-2">
            <IntakeFlowAnimation />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
