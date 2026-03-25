import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Chief Medical Informatics Officer. 15 years in health IT.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "Ex-Google Health engineer. ML and NLP specialist.",
  },
  {
    name: "Dr. Emily Rivera",
    role: "Chief Medical Officer",
    bio: "Board-certified internist. Clinical AI researcher.",
  },
  {
    name: "James Park",
    role: "VP of Engineering",
    bio: "Built enterprise healthcare platforms at Epic and Cerner.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80"
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
                Built by healthcare & AI experts
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Patient intake hasn&apos;t changed in decades. Clipboards, PDF
                  forms, and repetitive questions waste time for patients and
                  staff alike. We started IntakeAI because we saw a better way.
                </p>
                <p>
                  Our team combines deep clinical expertise with cutting-edge AI
                  research — so providers can spend their time where it matters
                  most.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {team.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-lg border bg-card p-4"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <p className="text-sm font-bold">{member.name}</p>
                    <p className="text-xs text-primary">{member.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
