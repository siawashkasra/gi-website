"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companies, getCompanyBySlug } from "@/data/companies";
import { buildCompanyDirectorySections } from "@/lib/admin/editor-sections";
import { companyLogoKey } from "@/lib/media/placement-keys";
import { notFound } from "next/navigation";

function CompanyDirectoryInner({ slug, placement }: { slug: string; placement: { publicPath: string; alt: string } | null | undefined }) {
  const ctx = useCmsDocumentContext();
  const company = getCompanyBySlug(slug);
  const sections = buildCompanyDirectorySections(companies.map((c) => ({ slug: c.slug, name: c.name })));
  const [name, setName] = useState(company?.name ?? "");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  useEffect(() => {
    if (ctx.loading) return;
    const p = ctx.data;
    setName(typeof p.name === "string" ? p.name : company?.name ?? "");
    setDescription(typeof p.description === "string" ? p.description : "");
    setIndustry(typeof p.industry === "string" ? p.industry : "");
  }, [ctx.loading, ctx.data, ctx.locale, company?.name]);
  const logoUrl = placement?.publicPath ?? company?.logo ?? null;
  const preview = <CmsSectionPreview domain="companyDirectory" section={slug} locale={ctx.locale} companyCard={{ name, industry, description, logoUrl }} sections={sections} publicPath={company ? `/companies/${slug}` : undefined} />;
  const onSave = () => void ctx.save(() => ({ name, description, industry }));
  if (!company) return null;
  return (
    <AdminEditorLayout pageTitle="Companies directory" pageDescription="Review each company card, then edit copy and logo per language." sections={sections} activeSlug={slug} preview={preview} toolbar={
      <CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={onSave}>
        <div className="space-y-6">
          <MediaSlotEditor label="Logo" placementKey={companyLogoKey(slug)} current={placement ?? null} fallbackImage={{ publicPath: company.logo, alt: `${company.name} logo` }} variant="logo" compact description="Shown on the home grid and company page." />
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
          <div><Label>Industry</Label><Input value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-1.5" /></div>
          <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5 min-h-28" /></div>
        </div>
      </CmsEditorToolbar>
    } />
  );
}

export function CompaniesEditorShell({ placements }: { placements: Map<string, { publicPath: string; alt: string } | null | undefined> }) {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : companies[0]?.slug ?? "";
  if (!getCompanyBySlug(slug)) notFound();
  return (
    <CmsDocumentProvider entityType="company" entityKey={slug} merge onSaveTransform={(p) => p as Record<string, unknown>}>
      <CompanyDirectoryInner slug={slug} placement={placements.get(companyLogoKey(slug))} />
    </CmsDocumentProvider>
  );
}
