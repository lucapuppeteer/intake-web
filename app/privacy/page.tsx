import { createMetadata } from "@/lib/metadata";
import { SITE_NAME, COMPANY_INFO } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `${SITE_NAME} Privacy Policy — how we collect, use, and protect your data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: February 1, 2026
        </p>

        <div className="legal-content mt-10 space-y-6 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:text-muted-foreground [&_li]:leading-relaxed">
          <h2>1. Introduction</h2>
          <p>
            {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
            protecting the privacy and security of your personal information.
            This Privacy Policy describes how we collect, use, disclose, and
            safeguard information when you use our AI-powered patient intake
            platform.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Contact information (name, email, phone number)</li>
            <li>Organization and practice details</li>
            <li>Account credentials</li>
            <li>Communications you send to us</li>
          </ul>
          <h3>Patient Health Information</h3>
          <p>
            When healthcare providers use our platform, patient health
            information (PHI) may be processed. All PHI is handled in strict
            compliance with HIPAA regulations and applicable Business Associate
            Agreements.
          </p>

          <h2>3. How We Use Information</h2>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To process and complete intake sessions</li>
            <li>To integrate with your EHR system</li>
            <li>To improve our AI models and service quality</li>
            <li>To communicate with you about your account</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures including AES-256
            encryption at rest, TLS 1.3 encryption in transit, role-based access
            controls, and regular security audits. Our infrastructure is SOC 2
            Type II certified.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain data for as long as your account is active or as needed to
            provide services. PHI retention follows your organization&apos;s
            policies and applicable regulations. You may request data deletion
            at any time.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, delete, or port your personal data. To exercise these
            rights, contact us at {COMPANY_INFO.email}.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:{" "}
            {COMPANY_INFO.email}
          </p>
        </div>
      </div>
    </article>
  );
}
