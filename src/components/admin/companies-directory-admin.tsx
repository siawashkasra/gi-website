"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { LocalePanel, LocaleTabs } from "@/components/admin/locale-tabs";
import { AdminBanner } from "@/components/admin/admin-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCmsDocument } from "@/components/admin/use-cms-document";
import { companies } from "@/data/companies";
import { companyLogoKey } from "@/lib/media/placement-keys";

function CompanyEditorCard({ company, placement }: { company: (typeof companies)[0]; placement: { publicPath: string; alt: string } | null | undefined }) {
  const doc = useCmsDocument("company", company.slug, { merge: true });
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  useEffect(() => {
    if (doc.loading) return;
    const p = doc.payload as { name?: string; description?: string; industry?: string } | null;
    setName(typeof p?.name === "string" ? p.name : company.name);
    setDescription(typeof p?.description === "string" ? p.description : "");
    setIndustry(typeof p?.industry === "string" ? p.industry : "");
  }, [doc.loading, doc.payload, doc.locale, company.name]);
  async function saveCopy() {
    await doc.save({ name, description, industry });
  }
  return (
    <article className="admin-media-card overflow-hidden">
      <div className="border-b border-border bg-gradient-to-r from-gi-navy/5 to-transparent px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg font-semibold text-gi-navy">{company.name}</h3>
            <p className="font-mono text-xs text-muted-foreground">{company.slug}</p>
          </div>
          <Button render={<Link href={`/en/companies/${company.slug}`} target="_blank" />} nativeButton={false} variant="outline" size="sm" className="gap-1.5">
            View page <ExternalLink className="size-3" />
          </Button>
        </div>
      </div>
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-e">
          <MediaSlotEditor label="Logo" placementKey={companyLogoKey(company.slug)} current={placement ?? null} fallbackImage={{ publicPath: company.logo, alt: `${company.name} logo` }} variant="logo" compact description="Shown on the home grid and company page." />
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <LocaleTabs value={doc.locale} onChange={doc.setLocale} />
            {doc.locale !== "en" ? (
              <Button type="button" variant="outline" size="sm" onClick={doc.copyFromEnglish}>
                Copy EN
              </Button>
            ) : null}
          </div>
          <LocalePanel locale={doc.locale}>
            {doc.loading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
              <div className="space-y-3">
                {!doc.loading && doc.source === "bundled" ? <p className="text-xs text-sky-800">Default {doc.locale === "fa-AF" ? "Dari" : doc.locale === "ps" ? "Pashto" : "English"} copy from locale files.</p> : null}
                <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" /></div>
                <div><Label>Industry</Label><Input value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-1" /></div>
                <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 min-h-28" /></div>
              </div>
            )}
          </LocalePanel>
          <Button type="button" size="sm" className="mt-4 bg-gi-navy hover:bg-gi-navy/90" disabled={doc.busy || doc.loading} onClick={saveCopy}>
            Save copy
          </Button>
          {doc.feedback ? <div className="mt-3"><AdminBanner tone={doc.feedback.tone}>{doc.feedback.text}</AdminBanner></div> : null}
        </div>
      </div>
    </article>
  );
}

export function CompaniesDirectoryAdmin({ placements }: { placements: Map<string, { publicPath: string; alt: string }> }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q) || c.industry.toLowerCase().includes(q));
  }, [query]);
  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search companies…" className="ps-9" />
      </div>
      <p className="text-sm text-muted-foreground">{filtered.length} of {companies.length} companies</p>
      <div className="space-y-8">
        {filtered.map((c) => (
          <CompanyEditorCard key={c.slug} company={c} placement={placements.get(companyLogoKey(c.slug))} />
        ))}
      </div>
    </div>
  );
}
