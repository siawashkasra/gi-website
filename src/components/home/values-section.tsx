import { Eye, Gem, HeartHandshake, Leaf, Lightbulb, Shield, Target } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { companyValues } from "@/data/company-profile";

const iconMap = { eye: Eye, gem: Gem, leaf: Leaf, heartHandshake: HeartHandshake, lightbulb: Lightbulb, shield: Shield, target: Target } as const;

export function ValuesSection() {
  return (
    <section id="values" className="ds-section">
      <div className="ds-container">
        <SectionHeading align="center" eyebrow="Principles" title="Core values" description="The standards that guide governance, delivery, and relationships across the group." />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {companyValues.map(({ title, body, icon }) => {
            const Icon = iconMap[icon];
            return (
              <div key={title} className="relative rounded-2xl border border-border/60 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 font-sans text-sm font-normal leading-relaxed text-muted-foreground">{body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
