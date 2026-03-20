import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductExplanation } from "@/components/sections/product-explanation";
import { Features } from "@/components/sections/features";
import { Security } from "@/components/sections/security";
import { SocialProof } from "@/components/sections/social-proof";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, COMPANY_INFO } from "@/lib/constants";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress: "548 Market St, Suite 72000",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94104",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IntakeAI",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "AI-powered patient intake software that automates clinical data collection, EHR integration, and preliminary diagnosis drafting.",
    url: SITE_URL,
    offers: [
      {
        "@type": "Offer",
        name: "Essentials",
        price: "2.50",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "3.50",
          priceCurrency: "USD",
          unitText: "per intake",
        },
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "3.50",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "2.50",
          priceCurrency: "USD",
          unitText: "per intake",
        },
      },
    ],
    featureList: [
      "AI-powered conversational patient intake",
      "Digital patient intake forms replacement",
      "Automated patient intake calls via voice AI",
      "EHR integration (Epic, Cerner, Athenahealth)",
      "Automated diagnosis draft generation",
      "Multi-language support (30+ languages)",
      "HIPAA compliant with SOC 2 Type II",
      "Real-time clinical data analytics",
    ],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <ProductExplanation />
      <Features />
      <Security />
      <SocialProof />
      <Pricing />
      <FAQ />
      <About />
      <Contact />
    </>
  );
}
