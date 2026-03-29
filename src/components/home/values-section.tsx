import { Building2, Gem, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const items = [
  { icon: Building2, title: "Scale with discipline", body: "Mega-projects executed with clear governance, expert teams, and measurable milestones." },
  { icon: Gem, title: "Material excellence", body: "Materials, detailing, and spatial planning chosen for longevity and distinguished presence." },
  { icon: Shield, title: "Trust & transparency", body: "Registered with the Ministry of Commerce and Industries; accountable to partners and communities." },
];

export function ValuesSection() {
  return (
    <section id="values" className="ds-section">
      <div className="ds-container">
        <SectionHeading align="center" eyebrow="Principles" title="Built on institutional rigor" description="We combine Afghan ownership with international standards of delivery — from first sketch to handover." />
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="relative rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
