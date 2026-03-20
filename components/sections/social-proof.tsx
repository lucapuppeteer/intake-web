import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

const testimonials = [
  {
    quote:
      "IntakeAI cut our average intake time from 15 minutes to under 4. Our front desk staff can finally focus on patients instead of paperwork.",
    name: "Dr. Rachel Torres",
    role: "Medical Director",
    org: "Pacific Primary Care",
  },
  {
    quote:
      "The EHR integration is seamless. Data flows directly into Epic without anyone touching it. We've eliminated transcription errors completely.",
    name: "James Liu",
    role: "Practice Administrator",
    org: "Meridian Health Partners",
  },
  {
    quote:
      "Our Spanish-speaking patients love it. For the first time, they can complete intake in their own language without needing a translator.",
    name: "Dr. Maria Santos",
    role: "Family Medicine",
    org: "Community Health Alliance",
  },
];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/[0.85]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              What Providers Say
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Trusted by practices across the country
            </h2>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-lg border bg-card p-6">
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.org}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
