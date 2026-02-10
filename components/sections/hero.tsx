import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { IntakeFlowAnimation } from "@/components/animations/intake-flow-animation";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <FadeIn direction="up">
            <div className="max-w-xl">
              <Badge variant="secondary" className="mb-6">
                AI-Powered Patient Intake
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Patient Intake,{" "}
                <span className="text-primary">Reimagined</span> with AI
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                An intelligent agent that conducts patient intake
                conversations, captures structured clinical data, syncs it to
                your EHR, and delivers a diagnosis draft — before the provider
                walks in.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="#contact">Start Free Trial</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required &middot; HIPAA compliant
              </p>
            </div>
          </FadeIn>

          {/* Right — animated demo */}
          <FadeIn direction="right" delay={0.3}>
            <IntakeFlowAnimation />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
