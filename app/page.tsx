import { Hero } from "@/components/sections/hero";
import { ProductExplanation } from "@/components/sections/product-explanation";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Security } from "@/components/sections/security";
import { FAQ } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@intakeai.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <Hero />
      <ProductExplanation />
      <Features />
      <HowItWorks />
      <Pricing />
      <Security />
      <FAQ />
      <About />
      <Contact />
    </>
  );
}
