import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80"
                alt="Healthcare team collaborating in a modern office"
                width={800}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" delay={0.1}>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                About
              </p>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                Rethinking patient intake from the ground up
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Patient intake hasn&apos;t changed in decades. Clipboards, PDF
                  forms, and repetitive questions waste time for patients and
                  staff alike. We built IntakeAI because we saw a better way.
                </p>
                <p>
                  IntakeAI automates the entire intake process — from scheduling
                  to pre-visit data collection — so your team can focus on
                  delivering great care instead of chasing paperwork.
                </p>
                <p>
                  Built with HIPAA compliance and EHR integration at its core,
                  IntakeAI works with the systems you already use.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
