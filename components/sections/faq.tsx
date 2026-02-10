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
    <section id="faq" className="bg-muted/30 py-20 sm:py-28">
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about IntakeAI."
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
