import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { leadershipTeam } from "@/data/team";

export function TeamSection() {
  return (
    <section id="team" className="ds-section border-b border-border/60 bg-muted/20" aria-labelledby="team-heading">
      <div className="ds-container">
        <SectionHeading id="team-heading" align="center" eyebrow="People" title="Meet The Team" description="Leadership and specialists guiding operations, finance, legal, and human resources." className="mx-auto max-w-2xl" />
        <ul className="mt-14 grid list-none gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-10">
          {leadershipTeam.map((m) => (
            <li key={m.name} className="flex flex-col items-center rounded-2xl border border-border/60 bg-white px-5 py-8 text-center shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:scale-[1.02]">
              <div className="relative mx-auto aspect-square w-full max-w-[11.5rem] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60">
                <Image src={m.photo} alt={`${m.name}, ${m.title}`} fill className="object-cover object-top" sizes="(max-width:1024px) 45vw, 12rem" />
              </div>
              <p className="mt-5 font-serif text-lg font-semibold tracking-tight text-primary">{m.name}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{m.title}</p>
              <p className="mt-4 text-left text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
