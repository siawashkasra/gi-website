"use client";

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className ? `${className} leading-relaxed text-foreground/90` : "leading-relaxed text-foreground/90"}>{children}</p>;
}

function H({ children }: { children: React.ReactNode }) {
  return <p className="font-heading text-base font-semibold text-gi-navy">{children}</p>;
}

export function HomeSectionPreview({ section, data, placements }: { section: string; data: Record<string, unknown>; placements?: Map<string, { publicPath: string; alt: string } | null | undefined> }) {
  if (section === "testimonials") return (
    <ul className="space-y-4">
      {(Array.isArray(data.testimonials) ? data.testimonials : []).map((t: { quote?: string; attribution?: string; context?: string }, i: number) => (
        <li key={i} className="rounded-lg border border-border/60 bg-white p-3">
          {t.quote ? <P className="italic">&ldquo;{t.quote}&rdquo;</P> : null}
          {t.attribution ? <p className="mt-2 text-xs font-medium text-gi-navy">{t.attribution}</p> : null}
          {t.context ? <p className="text-xs text-muted-foreground">{t.context}</p> : null}
        </li>
      ))}
    </ul>
  );
  if (section === "milestones") return (
    <ul className="space-y-3">
      {(Array.isArray(data.milestones) ? data.milestones : []).map((m: { year?: string; title?: string; detail?: string }, i: number) => (
        <li key={i} className="flex gap-3 border-b border-border/50 pb-2"><span className="shrink-0 font-mono text-xs font-semibold text-primary">{m.year}</span><div><H>{m.title}</H>{m.detail ? <P>{m.detail}</P> : null}</div></li>
      ))}
    </ul>
  );
  if (section === "standards") return (
    <ul className="space-y-3">
      {(Array.isArray(data.standardPillars) ? data.standardPillars : []).map((p: { title?: string; description?: string }, i: number) => (
        <li key={i}><H>{p.title}</H><P>{p.description}</P></li>
      ))}
    </ul>
  );
  if (section === "images") {
    const slots = placements ? [...placements.entries()].filter(([, v]) => v?.publicPath) : [];
    if (!slots.length) return <P className="text-muted-foreground">No uploaded section images yet.</P>;
    return (
      <ul className="space-y-3">
        {slots.map(([key, v]) => (
          <li key={key} className="flex items-center gap-3 rounded border border-border/60 bg-white p-2">
            <img src={v!.publicPath} alt={v!.alt} className="size-14 rounded object-cover" />
            <div><p className="text-xs font-medium text-gi-navy">{v!.alt || key}</p><p className="text-[0.65rem] text-muted-foreground">{key}</p></div>
          </li>
        ))}
      </ul>
    );
  }
  if (section === "featured") return <P className="text-muted-foreground">Featured projects are chosen in the editor below; order appears on the home page carousel.</P>;
  return null;
}
