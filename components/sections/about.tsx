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
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About"
          title="Built by Healthcare Experts"
          subtitle="We're a team of clinicians, engineers, and healthcare IT veterans on a mission to fix patient intake."
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Patient intake hasn&apos;t changed in decades. Clipboards, PDF
                forms, and repetitive questions waste time for patients and
                staff alike. We started IntakeAI because we saw a better way.
              </p>
              <p>
                Our team combines deep clinical expertise with cutting-edge AI
                research. We&apos;ve built IntakeAI to handle the burden of
                intake documentation so providers can spend their time where it
                matters most — with patients.
              </p>
              <p>
                Based in San Francisco, we serve healthcare organizations across
                the United States, from independent practices to large health
                systems.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl border bg-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
