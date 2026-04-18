import { SectionHeading } from "@/components/shared/section-heading";
import { organizationalStructure, type OrgStructureUnit } from "@/data/company-profile";
import { cn } from "@/lib/utils";

const impactCard =
  "group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-lg transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.06] hover:scale-[1.02] sm:p-8";

const impactBlob = "pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/[0.06] transition-transform duration-500 group-hover:scale-110";

function LeaderCard({ name, position }: { name: string; position: string }) {
  return (
    <div className={cn(impactCard, "text-center")}>
      <div className={impactBlob} aria-hidden />
      <p className="relative font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{name}</p>
      <p className="relative mt-2 font-sans text-sm font-semibold text-foreground">{position}</p>
    </div>
  );
}

function UnitCard({ unit, className }: { unit: OrgStructureUnit; className?: string }) {
  const titleBlock = (
    <>
      <div className={impactBlob} aria-hidden />
      <h3 className="relative font-sans text-xs font-semibold uppercase leading-snug tracking-[0.12em] text-foreground sm:text-sm">
        {"subtitle" in unit && unit.subtitle ? (
          <>
            {unit.title}
            <br />
            <span className="mt-1 inline-block">{unit.subtitle}</span>
          </>
        ) : (
          unit.title
        )}
      </h3>
    </>
  );
  if ("pairs" in unit) {
    return (
      <div className={cn(impactCard, "flex flex-col", className)}>
        {titleBlock}
        <div className="relative mt-4 flex flex-1 flex-col divide-y divide-border/40 border-t border-border/40 pt-4">
          {unit.pairs.map(([left, right], i) => (
            <div key={i} className="grid grid-cols-2 gap-2 py-2.5 first:pt-0 last:pb-0">
              <p className="text-xs font-normal leading-snug text-muted-foreground">{left}</p>
              <p className="border-l border-border/40 pl-2 text-xs font-normal leading-snug text-muted-foreground">{right}</p>
            </div>
          ))}
          {unit.extraSingles?.map((role) => (
            <div key={role} className="py-2.5 text-center text-xs font-normal text-muted-foreground first:pt-0 last:pb-0">
              {role}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={cn(impactCard, "flex flex-col", className)}>
      {titleBlock}
      <ul className="relative mt-4 flex flex-1 flex-col gap-2 border-t border-border/40 pt-4">
        {unit.roles.map((role) => (
          <li key={role} className="text-xs font-normal leading-snug text-muted-foreground">
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OrganizationChartSection() {
  const o = organizationalStructure;
  return (
    <section id="org" className="ds-section relative border-b border-border/60 bg-white" aria-labelledby="org-chart-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.08,transparent)]" aria-hidden />
      <div className="relative ds-container">
        <SectionHeading id="org-chart-heading" align="center" eyebrow="Structure" title={o.sectionTitle} description="Leadership and key roles across Gulbahar Group businesses." className="mx-auto max-w-2xl" />
        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-6 lg:gap-8">
          <LeaderCard name={o.chairman.name} position={o.chairman.title} />
          <LeaderCard name={o.chiefExecutive.name} position={o.chiefExecutive.title} />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:mt-10 lg:grid-cols-5 lg:gap-8">
          {o.units.map((unit) => (
            <UnitCard key={"pairs" in unit ? unit.title : unit.title + (unit.subtitle ?? "")} unit={unit} />
          ))}
        </div>
      </div>
    </section>
  );
}
