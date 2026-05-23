"use client";

import type { CmsLocaleId } from "@/components/admin/locale-tabs";

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className ? `${className} leading-relaxed text-foreground/90` : "leading-relaxed text-foreground/90"}>{children}</p>;
}

function H({ children }: { children: React.ReactNode }) {
  return <p className="font-heading text-base font-semibold text-gi-navy">{children}</p>;
}

export function CompanySectionPreview({ section, data }: { section: string; data: Record<string, unknown> }) {
  const hero = (data.companyHero ?? {}) as { subtitle?: string };
  const about = (data.companyAbout ?? {}) as { headline?: string; paragraphs?: string[] };
  const ceo = (data.ceoProfile ?? {}) as { quote?: string; name?: string; title?: string };
  const clients = (data.clientsPartners ?? {}) as { title?: string; note?: string };
  const intl = (data.internationalPresence ?? {}) as { uae?: string; regional?: string; crossBorder?: string };
  const org = (data.organizationalStructure ?? {}) as { sectionTitle?: string; chairman?: { name?: string; title?: string }; chiefExecutive?: { name?: string; title?: string }; units?: unknown[] };
  if (section === "hero") return hero.subtitle ? <P>{hero.subtitle}</P> : null;
  if (section === "about") return (
    <div className="space-y-3">
      {about.headline ? <H>{about.headline}</H> : null}
      {(Array.isArray(about.paragraphs) ? about.paragraphs : []).map((p, i) => <P key={i}>{p}</P>)}
    </div>
  );
  if (section === "mission-vision") return (
    <div className="space-y-4">
      {typeof data.companyMission === "string" && data.companyMission ? <div><p className="text-xs font-semibold uppercase text-primary/80">Mission</p><P>{data.companyMission}</P></div> : null}
      {typeof data.companyVision === "string" && data.companyVision ? <div><p className="text-xs font-semibold uppercase text-primary/80">Vision</p><P>{data.companyVision}</P></div> : null}
    </div>
  );
  if (section === "snapshot") return (
    <ul className="space-y-2">
      {(Array.isArray(data.companySnapshot) ? data.companySnapshot : []).map((r: { label?: string; value?: string }, i: number) => (
        <li key={i} className="flex justify-between gap-4 border-b border-border/60 pb-2"><span className="font-medium text-gi-navy">{r.label}</span><span>{r.value}</span></li>
      ))}
    </ul>
  );
  if (section === "values") return (
    <ul className="space-y-3">
      {(Array.isArray(data.companyValues) ? data.companyValues : []).map((v: { title?: string; body?: string }, i: number) => (
        <li key={i}><H>{v.title}</H><P>{v.body}</P></li>
      ))}
    </ul>
  );
  if (section === "core-areas") return (
    <ul className="space-y-3">
      {(Array.isArray(data.coreBusinessAreas) ? data.coreBusinessAreas : []).map((a: { title?: string; body?: string }, i: number) => (
        <li key={i}><H>{a.title}</H><P>{a.body}</P></li>
      ))}
    </ul>
  );
  if (section === "strengths") return (
    <ul className="space-y-3">
      {(Array.isArray(data.competitiveStrengths) ? data.competitiveStrengths : []).map((s: { title?: string; body?: string }, i: number) => (
        <li key={i}><H>{s.title}</H><P>{s.body}</P></li>
      ))}
    </ul>
  );
  if (section === "governance") return (
    <div className="space-y-2">
      {(Array.isArray(data.governanceIntro) ? data.governanceIntro : []).map((p: string, i: number) => <P key={i}>{p}</P>)}
    </div>
  );
  if (section === "portfolio") return (
    <table className="w-full text-left text-xs">
      <thead><tr className="border-b"><th className="pb-2 pe-2">Project</th><th className="pb-2 pe-2">Location</th><th className="pb-2">Sector</th></tr></thead>
      <tbody>
        {(Array.isArray(data.portfolioTableRows) ? data.portfolioTableRows : []).map((r: { project?: string; location?: string; sector?: string }, i: number) => (
          <tr key={i} className="border-b border-border/40"><td className="py-2 pe-2">{r.project}</td><td className="py-2 pe-2">{r.location}</td><td className="py-2">{r.sector}</td></tr>
        ))}
      </tbody>
    </table>
  );
  if (section === "ceo") return (
    <div className="space-y-2">
      {ceo.quote ? <P className="italic">&ldquo;{ceo.quote}&rdquo;</P> : null}
      {ceo.name ? <H>{ceo.name}</H> : null}
      {ceo.title ? <p className="text-xs uppercase tracking-wide text-primary/90">{ceo.title}</p> : null}
    </div>
  );
  if (section === "growth-clients") return (
    <div className="space-y-4">
      {typeof data.growthOutlook === "string" && data.growthOutlook ? <P>{data.growthOutlook}</P> : null}
      {clients.title ? <H>{clients.title}</H> : null}
      {clients.note ? <P>{clients.note}</P> : null}
    </div>
  );
  if (section === "international") return (
    <div className="space-y-3">
      {intl.uae ? <div><p className="text-xs font-semibold text-gi-navy">UAE</p><P>{intl.uae}</P></div> : null}
      {intl.regional ? <div><p className="text-xs font-semibold text-gi-navy">Regional</p><P>{intl.regional}</P></div> : null}
      {intl.crossBorder ? <div><p className="text-xs font-semibold text-gi-navy">Cross-border</p><P>{intl.crossBorder}</P></div> : null}
    </div>
  );
  if (section === "market") return (
    <ul className="space-y-3">
      {(Array.isArray(data.marketPositioning) ? data.marketPositioning : []).map((m: { title?: string; body?: string }, i: number) => (
        <li key={i}><H>{m.title}</H><P>{m.body}</P></li>
      ))}
    </ul>
  );
  if (section === "standards") return (
    <div className="space-y-4">
      {typeof data.technologyStandards === "string" && data.technologyStandards ? <div><p className="text-xs font-semibold text-gi-navy">Technology</p><P>{data.technologyStandards}</P></div> : null}
      {typeof data.sustainabilityStandards === "string" && data.sustainabilityStandards ? <div><p className="text-xs font-semibold text-gi-navy">Sustainability</p><P>{data.sustainabilityStandards}</P></div> : null}
    </div>
  );
  if (section === "org") return (
    <div className="space-y-3">
      {org.sectionTitle ? <H>{org.sectionTitle}</H> : null}
      {org.chairman?.name ? <P><strong>{org.chairman.name}</strong> — {org.chairman.title}</P> : null}
      {org.chiefExecutive?.name ? <P><strong>{org.chiefExecutive.name}</strong> — {org.chiefExecutive.title}</P> : null}
      {(Array.isArray(org.units) ? (org.units as { title?: string; subtitle?: string; roles?: string[] }[]) : []).map((u, i) => (
        <div key={i} className="rounded border border-border/60 bg-white p-2">
          <p className="font-medium text-gi-navy">{u.title}{u.subtitle ? ` · ${u.subtitle}` : ""}</p>
          {Array.isArray(u.roles) ? <p className="mt-1 text-xs text-muted-foreground">{u.roles.join(" · ")}</p> : null}
        </div>
      ))}
    </div>
  );
  return null;
}
