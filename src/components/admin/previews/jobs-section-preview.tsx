"use client";

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed text-foreground/90">{children}</p>;
}

function H({ children }: { children: React.ReactNode }) {
  return <p className="font-heading text-base font-semibold text-gi-navy">{children}</p>;
}

export function JobsSectionPreview({ section, data }: { section: string; data: Record<string, unknown> }) {
  const s1 = (data.sector1 ?? {}) as { title?: string; body?: string };
  const s2 = (data.sector2 ?? {}) as { title?: string; body?: string };
  const s3 = (data.sector3 ?? {}) as { title?: string; body?: string };
  if (section === "intro") return (
    <div className="space-y-3">
      {typeof data.join === "string" && data.join ? <H>{data.join}</H> : null}
      {typeof data.careers === "string" && data.careers ? <p className="text-xs uppercase tracking-wide text-primary/90">{data.careers}</p> : null}
      {typeof data.body === "string" && data.body ? <P>{data.body}</P> : null}
      <div className="flex flex-wrap gap-2 pt-2">
        {typeof data.contactUs === "string" && data.contactUs ? <span className="rounded bg-gi-navy/10 px-2 py-1 text-xs font-medium">{data.contactUs}</span> : null}
        {typeof data.emailCv === "string" && data.emailCv ? <span className="rounded border border-border px-2 py-1 text-xs">{data.emailCv}</span> : null}
      </div>
    </div>
  );
  if (section === "sectors") return (
    <ul className="space-y-3">
      {[s1, s2, s3].map((s, i) => (
        <li key={i} className="rounded-lg border border-border/60 bg-white p-3"><H>{s.title}</H><P>{s.body}</P></li>
      ))}
    </ul>
  );
  if (section === "footnotes") return (
    <div className="space-y-2">
      {typeof data.footnote1 === "string" && data.footnote1 ? <P>{data.footnote1}</P> : null}
      {typeof data.footnote2 === "string" && data.footnote2 ? <P>{data.footnote2}</P> : null}
    </div>
  );
  return null;
}
