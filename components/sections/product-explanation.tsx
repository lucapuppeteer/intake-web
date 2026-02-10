import { FadeIn } from "@/components/animations/fade-in";
import { EhrPipelineAnimation } from "@/components/animations/ehr-pipeline-animation";
import { SectionHeading } from "@/components/shared/section-heading";

export function ProductExplanation() {
  return (
    <section id="product" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Product"
          title="How AI Transforms Patient Intake"
          subtitle="From the moment a patient engages, our AI agent handles the entire intake workflow — asking the right questions, structuring clinical data, and preparing providers with actionable insights."
        />

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Conversational AI Intake</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Our AI agent conducts natural, empathetic conversations with
                  patients — adapting questions based on their responses, medical
                  history, and presenting symptoms.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Automatic EHR Population</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Every data point captured during intake is structured and mapped
                  to your EHR fields automatically. No manual data entry, no
                  transcription errors.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Diagnosis Draft Generation</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Before the appointment begins, providers receive a concise
                  clinical summary with a preliminary diagnosis draft — reviewed
                  and confirmed by the clinician.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="flex justify-center">
              <EhrPipelineAnimation />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
