export const SITE_NAME = "IntakeAI";
export const SITE_DESCRIPTION =
  "AI patient intake software that replaces paper patient intake forms with conversational AI. Automate patient intake calls, capture structured clinical data, sync to your EHR, and draft a diagnosis — so providers can focus on care. HIPAA compliant.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aipatientintake.com";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#security" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const COMPANY_INFO = {
  email: "hello@intakeai.com",
  phone: "+1 (800) 555-0199",
  address: "548 Market St, Suite 72000, San Francisco, CA 94104",
} as const;
