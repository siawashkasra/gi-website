import Link from "next/link";
import { HardHat, HeartHandshake, Scale } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { standardPillars } from "@/data/home-premium";

const icons = [HardHat, HeartHandshake, Scale] as const;

export function StandardsSection() {
  return (
    <section id="standards" className="ds-section border-b border-border/60 bg-white" aria-labelledby="standards-heading">
      <div className="ds-container">
        <SectionHeading id="standards-heading" align="center" eyebrow="Commitment" title="How we work" description="Standards that underpin every mandate — from first sketch to long-term operations." className="mx-auto max-w-2xl" />
        <ul className="mt-14 grid list-none gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {standardPillars.map((p, i) => {
            const Icon = icons[i] ?? HardHat;
            return (
              <li key={p.title} className="rounded-2xl border border-border/60 bg-muted/30 p-8 text-center shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg lg:text-left">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10 lg:mx-0">
                  <Icon className="size-7" aria-hidden />
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                  {i === 2 ? (
                    <>
                      {p.description} Use our{" "}
                      <Link href="/complaint" className="font-semibold text-primary underline-offset-4 hover:underline">
                        complaint channel
                      </Link>{" "}
                      for formal feedback.
                    </>
                  ) : (
                    p.description
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
