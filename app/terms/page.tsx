import { createMetadata } from "@/lib/metadata";
import { SITE_NAME, COMPANY_INFO } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `${SITE_NAME} Terms of Service — the agreement governing your use of our platform.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: February 1, 2026
        </p>

        <div className="legal-content mt-10 space-y-6 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:text-muted-foreground [&_li]:leading-relaxed">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the {SITE_NAME} platform, you agree to be
            bound by these Terms of Service. If you do not agree, do not use
            our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            {SITE_NAME} provides an AI-powered patient intake platform that
            conducts conversational intake sessions, captures clinical data,
            integrates with electronic health record systems, and generates
            preliminary diagnosis drafts for provider review.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            Our services are intended for licensed healthcare organizations and
            their authorized personnel. You represent that you have the
            authority to bind your organization to these terms.
          </p>

          <h2>4. Account Responsibilities</h2>
          <ul>
            <li>You are responsible for maintaining account security</li>
            <li>You must provide accurate and complete information</li>
            <li>You must notify us of any unauthorized access</li>
            <li>You are responsible for all activity under your account</li>
          </ul>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to reverse-engineer our AI models</li>
            <li>Share account access with unauthorized individuals</li>
            <li>Upload malicious content or interfere with the service</li>
          </ul>

          <h2>6. Clinical Disclaimer</h2>
          <p>
            {SITE_NAME} is a clinical support tool. AI-generated diagnosis
            drafts are preliminary assessments intended to assist — not replace
            — clinical judgment. Providers are solely responsible for all
            clinical decisions and patient care.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE_NAME} shall not be
            liable for indirect, incidental, special, or consequential damages
            arising from your use of the service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will notify you of
            material changes via email or through the platform.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these terms? Contact us at {COMPANY_INFO.email}.
          </p>
        </div>
      </div>
    </article>
  );
}
