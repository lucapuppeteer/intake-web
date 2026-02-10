import { Shield, Lock, KeyRound, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const certifications = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description:
      "Full compliance with HIPAA Privacy and Security Rules. Business Associate Agreements included.",
  },
  {
    icon: Lock,
    title: "SOC 2 Type II",
    description:
      "Independently audited security controls for data processing, storage, and transmission.",
  },
  {
    icon: KeyRound,
    title: "256-bit Encryption",
    description:
      "AES-256 encryption at rest and TLS 1.3 in transit. Your patients' data is always protected.",
  },
  {
    icon: Server,
    title: "Data Residency",
    description:
      "Choose where your data is stored. US, EU, and custom region options for regulatory compliance.",
  },
];

export function Security() {
  return (
    <section id="security" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Security"
          title="Enterprise-Grade Security"
          subtitle="Built from the ground up with healthcare data protection in mind. Your patients' data is our top priority."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1}>
              <Card className="h-full text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <cert.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-semibold">{cert.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
