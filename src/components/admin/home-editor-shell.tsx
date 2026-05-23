"use client";

import { useParams } from "next/navigation";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { HomeSectionFields } from "@/components/admin/home-section-fields";
import { homeEditorSections } from "@/lib/admin/editor-sections";

function HomeEditorInner({ section, placements }: { section: string; placements: Map<string, { publicPath: string; alt: string } | null | undefined> }) {
  const ctx = useCmsDocumentContext();
  const usesCms = section === "testimonials" || section === "milestones" || section === "standards";
  const preview = <CmsSectionPreview domain="home" section={section} locale={ctx.locale} data={ctx.data} placements={placements} sections={homeEditorSections} />;
  const editor = usesCms ? (
    <CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => p as Record<string, unknown>)}><HomeSectionFields section={section} placements={placements} /></CmsEditorToolbar>
  ) : (
    <HomeSectionFields section={section} placements={placements} />
  );
  return (
    <AdminEditorLayout pageTitle="Home page" pageDescription="Review what this section shows today, then edit. Language tabs apply to testimonials, milestones, and standards." sections={homeEditorSections} activeSlug={section} preview={preview} toolbar={editor} />
  );
}

export function HomeEditorShell({ placements }: { placements: Map<string, { publicPath: string; alt: string } | null | undefined> }) {
  const params = useParams();
  const section = typeof params.section === "string" ? params.section : "testimonials";
  return (
    <CmsDocumentProvider entityType="homePremium" entityKey="default" merge onSaveTransform={(p) => p as Record<string, unknown>}>
      <HomeEditorInner section={section} placements={placements} />
    </CmsDocumentProvider>
  );
}
