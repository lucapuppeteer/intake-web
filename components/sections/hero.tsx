import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Shield, Award, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80"
          alt="Healthcare provider using AI patient intake software on a tablet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 sm:pb-32 sm:pt-44 lg:px-8 lg:pb-40 lg:pt-52">
        <FadeIn direction="up">
          <div className="max-w-2xl">
            {/* Trust line */}
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                HIPAA Compliant
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-primary" />
                SOC 2 Type II Certified
              </span>
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              AI patient intake.
              <br />
              <span className="text-primary">Clinical-grade</span> reliability.
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              An AI agent that replaces paper forms and repetitive phone calls.
              It captures structured clinical data, syncs it to your EHR, and
              delivers a diagnosis draft — before the provider walks in.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <a href="https://calendly.com/luca-ka3s" target="_blank" rel="noopener noreferrer">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <a href="#demo">See It In Action</a>
              </Button>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
