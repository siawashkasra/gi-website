import { Eye, Gem, HeartHandshake, Leaf, Lightbulb, Shield, Target } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const items = [
  { icon: Eye, title: "Transparency", body: "Conducting business with clarity, accountability, and responsible financial and operational practices." },
  { icon: Gem, title: "Quality", body: "Maintaining defined standards in planning, construction, and project delivery to ensure durability and long-term performance." },
  { icon: Leaf, title: "Sustainability", body: "Integrating energy efficiency, environmental responsibility, and resource-conscious development into core operations." },
  { icon: HeartHandshake, title: "Social responsibility", body: "Contributing to employment generation, community development, and social support initiatives." },
  { icon: Lightbulb, title: "Innovation", body: "Adopting modern technologies and smart infrastructure systems to enhance efficiency, security, and development standards." },
  { icon: Shield, title: "Integrity", body: "Upholding ethical conduct, contractual reliability, and professional responsibility in all partnerships and stakeholder relationships." },
  { icon: Target, title: "Long-term commitment", body: "Focusing on durable projects and sustained economic contribution rather than short-term gains." },
];

export function ValuesSection() {
  return (
    <section id="values" className="ds-section">
      <div className="ds-container">
        <SectionHeading align="center" eyebrow="Principles" title="Core values" description="The standards that guide governance, delivery, and relationships across the group." />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="relative rounded-2xl border border-border/60 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 font-sans text-sm font-normal leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
