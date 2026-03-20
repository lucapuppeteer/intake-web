import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd } from "@/components/shared/json-ld";

const faqs = [
  {
    question: "What is AI patient intake?",
    answer:
      "AI patient intake uses conversational artificial intelligence to collect patient information before their appointment. Instead of paper forms or static digital questionnaires, patients have a natural conversation with our AI agent that adapts in real time based on their responses.",
  },
  {
    question: "How does EHR integration work?",
    answer:
      "IntakeAI connects to your existing EHR system via secure APIs (HL7 FHIR, REST, or custom). Captured data is automatically structured and mapped to the correct fields in the patient's record. We support Epic, Cerner, Athenahealth, AllScripts, and more.",
  },
  {
    question: "Is IntakeAI HIPAA compliant?",
    answer:
      "Yes. IntakeAI is fully HIPAA compliant and has achieved SOC 2 Type II certification. We provide Business Associate Agreements (BAAs) with every subscription. All data is encrypted at rest (AES-256) and in transit (TLS 1.3).",
  },
  {
    question: "How accurate is the diagnosis draft?",
    answer:
      "The diagnosis draft is an AI-generated preliminary assessment designed to assist — not replace — clinical judgment. It provides differential diagnoses with supporting evidence from the intake data. Providers always review and confirm before any clinical decisions.",
  },
  {
    question: "What languages are supported?",
    answer:
      "IntakeAI supports 30+ languages including English, Spanish, Mandarin, French, Arabic, Portuguese, Hindi, and more. The AI agent conducts the entire conversation in the patient's preferred language and translates captured data for the provider.",
  },
  {
    question: "Can I customize the intake workflow?",
    answer:
      "Professional and Enterprise plans include fully customizable intake workflows. You can define question sets, branching logic, required fields, and specialty-specific protocols through our workflow editor.",
  },
  {
    question: "What EHR systems do you integrate with?",
    answer:
      "We integrate with all major EHR systems including Epic, Cerner (Oracle Health), Athenahealth, AllScripts, eClinicalWorks, NextGen, Greenway, and Practice Fusion. Custom integrations are available on the Enterprise plan.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. All plans include a 14-day free trial with full access to features. No credit card required to start. Our team will help you set up the integration during the trial period.",
  },
  {
    question: "How does AI patient intake reduce costs?",
    answer:
      "AI patient intake reduces costs by eliminating manual data entry, reducing staff time spent on intake by up to 70%, decreasing data errors that lead to claim denials, and increasing patient throughput. Practices typically see $1,000–$5,000+ in monthly savings depending on patient volume.",
  },
  {
    question: "Can AI patient intake integrate with my existing EHR?",
    answer:
      "Yes. IntakeAI integrates with all major EHR systems including Epic, Cerner (Oracle Health), Athenahealth, AllScripts, eClinicalWorks, and NextGen via secure APIs (HL7 FHIR and REST). Custom integrations are available for enterprise clients.",
  },
  {
    question: "Is AI patient intake safe for patient data?",
    answer:
      "IntakeAI is fully HIPAA compliant and SOC 2 Type II certified. All patient data is encrypted with AES-256 at rest and TLS 1.3 in transit. We provide Business Associate Agreements (BAAs) and support regional data residency options.",
  },
  {
    question: "How long does it take to implement AI patient intake?",
    answer:
      "Most practices are fully onboarded within 1–2 weeks. This includes EHR integration setup, workflow customization, and staff training. Enterprise deployments with complex requirements typically take 4–6 weeks.",
  },
  {
    question: "How does AI replace paper patient intake forms?",
    answer:
      "Instead of handing patients a clipboard or static digital patient intake form, IntakeAI engages them in a guided conversational experience. The AI asks adaptive questions, validates responses in real time, and pushes structured data directly into your EHR — eliminating the need for paper forms entirely.",
  },
  {
    question: "Can AI automate patient intake calls?",
    answer:
      "Yes. IntakeAI's voice AI agent can conduct patient intake calls over the phone, collecting the same clinical data as an in-person conversation. This is ideal for practices that serve patients who prefer phone-based interactions or need pre-visit data collection via automated calls.",
  },
  {
    question: "What is the difference between patient intake forms and AI intake?",
    answer:
      "Traditional patient intake forms — whether paper or digital — are static questionnaires that every patient fills out the same way. AI patient intake is adaptive: it asks follow-up questions based on responses, validates data in real time, supports 30+ languages, and maps information directly into EHR fields without manual entry.",
  },
];

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 sm:py-32">
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Common questions"
          subtitle="Find answers to common questions about AI patient intake and IntakeAI."
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-center text-muted-foreground">
          Want to learn more? Read our{" "}
          <Link
            href="/blog/what-is-a-patient-intake"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            guide to patient intake
          </Link>
          , learn{" "}
          <Link
            href="/blog/what-is-ai-patient-intake"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            what AI patient intake is
          </Link>
          , or discover the{" "}
          <Link
            href="/blog/best-voice-ai-patient-intake-calls"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            best voice AI for patient intake calls
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
