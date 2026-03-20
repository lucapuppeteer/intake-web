import Link from "next/link";
import { FOOTER_LINKS, COMPANY_INFO } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              AI patient intake software that automates clinical data collection, reduces errors, and lets providers focus on care.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-sm font-semibold">Popular Articles</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/blog/what-is-a-patient-intake"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  What Is a Patient Intake?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/what-is-ai-patient-intake"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  What Is AI Patient Intake?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/best-voice-ai-patient-intake-calls"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Voice AI for Intake Calls
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/digital-patient-intake-forms-registration"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Digital Patient Intake Forms
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/hipaa-compliance-guide"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  HIPAA Compliance Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-muted-foreground">{COMPANY_INFO.email}</li>
              <li className="text-sm font-medium">{COMPANY_INFO.phone}</li>
              <li className="text-xs text-muted-foreground leading-relaxed">{COMPANY_INFO.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} IntakeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
