import { Shield, Lock, KeyRound, Server } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const certifications = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description:
      "Full compliance with HIPAA Privacy and Security Rules. Business Associate Agreements included with every plan.",
    detail: "Annual third-party audits",
  },
  {
    icon: Lock,
    title: "SOC 2 Type II",
    description:
      "Independently audited security controls for data processing, storage, and transmission.",
    detail: "Continuous monitoring",
  },
  {
    icon: KeyRound,
    title: "256-bit Encryption",
    description:
      "AES-256 encryption at rest and TLS 1.3 in transit. Your patients' data is always protected.",
    detail: "Zero-knowledge architecture",
  },
  {
    icon: Server,
    title: "Data Residency",
    description:
      "Choose where your data is stored. US, EU, and custom region options for regulatory compliance.",
    detail: "SOC 2 certified data centers",
  },
];

export function Security() {
  return (
    <section id="security" className="bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
              Security & Compliance
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Your patients&apos; data is our top priority
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/70">
              Built from the ground up with healthcare data protection in mind.
              Every layer of IntakeAI is designed for clinical-grade security.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.08}>
              <div className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                  <cert.icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold">{cert.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {cert.description}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-primary-foreground/40">
                  {cert.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
