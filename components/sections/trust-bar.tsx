import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

const ehrLogos = [
  { src: "/logos/healthie.png", alt: "Healthie", width: 120, height: "h-4" },
  { src: "/logos/epic.png", alt: "Epic Systems", width: 90, height: "h-6" },
  { src: "/logos/cerner.png", alt: "Oracle Health", width: 140, height: "h-6" },
  { src: "/logos/athenahealth.png", alt: "athenahealth", width: 155, height: "h-11" },
  { src: "/logos/allscripts.png", alt: "Veradigm", width: 120, height: "h-11" },
  { src: "/logos/eclinicalworks.png", alt: "eClinicalWorks", width: 155, height: "h-4" },
];

export function TrustBar() {
  return (
    <section className="border-y bg-card py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
              Trusted integrations with leading EHR systems
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {ehrLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex h-8 items-center opacity-80 grayscale brightness-0 transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:brightness-100"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={32}
                    className={`${logo.height} w-auto object-contain`}
                  />
                </div>
              ))}
              <div className="flex h-8 items-center rounded-full border border-dashed border-muted-foreground/30 px-4">
                <span className="text-xs font-medium text-muted-foreground/50">
                  + Your EHR
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
