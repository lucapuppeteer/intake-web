import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go Home</Link>
      </Button>
      <div className="mt-10 text-sm text-muted-foreground">
        <p>You might be looking for:</p>
        <ul className="mt-3 space-y-1">
          <li>
            <Link href="/#features" className="text-primary underline hover:text-primary/80">
              AI Patient Intake Features
            </Link>
          </li>
          <li>
            <Link href="/#how-it-works" className="text-primary underline hover:text-primary/80">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-primary underline hover:text-primary/80">
              Blog &amp; Guides
            </Link>
          </li>
          <li>
            <Link href="/blog/what-is-ai-patient-intake" className="text-primary underline hover:text-primary/80">
              What Is AI Patient Intake?
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
