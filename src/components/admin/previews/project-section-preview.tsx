"use client";

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed text-foreground/90">{children}</p>;
}

function H({ children }: { children: React.ReactNode }) {
  return <p className="font-heading text-base font-semibold text-gi-navy">{children}</p>;
}

export function ProjectSectionPreview({ section, data }: { section: string; data: Record<string, unknown> }) {
  const mv = (data.missionVision ?? {}) as { vision?: string; mission?: string };
  const timeline = Array.isArray(data.timeline) ? data.timeline : [];
  const features = Array.isArray(data.features) ? data.features : [];
  const paragraphs = Array.isArray(data.detailOverviewParagraphs) ? data.detailOverviewParagraphs : [];
  const keyStats = (data.keyStats ?? {}) as Record<string, string>;
  if (section === "basics") return (
    <div className="space-y-2">
      {typeof data.name === "string" && data.name ? <H>{data.name}</H> : null}
      <dl className="grid gap-2 text-xs">
        {typeof data.location === "string" && data.location ? <div className="flex justify-between gap-2"><dt className="text-muted-foreground">Location</dt><dd>{data.location}</dd></div> : null}
        {typeof data.status === "string" && data.status ? <div className="flex justify-between gap-2"><dt className="text-muted-foreground">Status</dt><dd>{data.status}</dd></div> : null}
        {typeof data.year === "string" && data.year ? <div className="flex justify-between gap-2"><dt className="text-muted-foreground">Year</dt><dd>{data.year}</dd></div> : null}
      </dl>
      {typeof data.excerpt === "string" && data.excerpt ? <P>{data.excerpt}</P> : null}
    </div>
  );
  if (section === "overview") return (
    <div className="space-y-3">
      {typeof data.detailOverviewTitle === "string" && data.detailOverviewTitle ? <H>{data.detailOverviewTitle}</H> : null}
      {typeof data.description === "string" && data.description ? <P>{data.description}</P> : null}
      {paragraphs.map((p: string, i: number) => <P key={i}>{p}</P>)}
    </div>
  );
  if (section === "mission") return (
    <div className="space-y-3">
      {mv.vision ? <div><p className="text-xs font-semibold uppercase text-primary/80">Vision</p><P>{mv.vision}</P></div> : null}
      {mv.mission ? <div><p className="text-xs font-semibold uppercase text-primary/80">Mission</p><P>{mv.mission}</P></div> : null}
      {typeof data.strategicPositioning === "string" && data.strategicPositioning ? <P>{data.strategicPositioning}</P> : null}
    </div>
  );
  if (section === "timeline") return (
    <ul className="space-y-2">
      {timeline.map((t: { label?: string; value?: string }, i: number) => (
        <li key={i} className="flex justify-between gap-4 border-b border-border/50 pb-2"><span className="font-medium text-gi-navy">{t.label}</span><span>{t.value}</span></li>
      ))}
    </ul>
  );
  if (section === "features") return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {features.map((f: { title?: string; description?: string }, i: number) => (
          <li key={i}><H>{f.title}</H><P>{f.description}</P></li>
        ))}
      </ul>
      {Object.keys(keyStats).length ? (
        <dl className="grid gap-2 text-xs">
          {Object.entries(keyStats).map(([k, v]) => v ? <div key={k} className="flex justify-between gap-2"><dt className="capitalize text-muted-foreground">{k}</dt><dd>{v}</dd></div> : null)}
        </dl>
      ) : null}
    </div>
  );
  if (section === "media" || section === "sidebar" || section === "listings") return <p className="text-muted-foreground">Preview updates from the editor fields on the right.</p>;
  return null;
}
