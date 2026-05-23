"use client";

import { useParams } from "next/navigation";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { CompanySectionFields } from "@/components/admin/company-section-fields";
import { companyEditorSections } from "@/lib/admin/editor-sections";

function CompanyEditorInner({ section }: { section: string }) {
  const ctx = useCmsDocumentContext();
  return (
    <AdminEditorLayout pageTitle="Company profile" pageDescription="Review the current section copy, then edit and save. Use the language tabs to switch English, Dari, or Pashto." sections={companyEditorSections} activeSlug={section} preview={<CmsSectionPreview domain="company" section={section} locale={ctx.locale} data={ctx.data} sections={companyEditorSections} />} toolbar={<CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => p as Record<string, unknown>)}><CompanySectionFields section={section} /></CmsEditorToolbar>} />
  );
}

export function CompanyEditorShell() {
  const params = useParams();
  const section = typeof params.section === "string" ? params.section : "about";
  return (
    <CmsDocumentProvider entityType="companyProfile" entityKey="default" merge onSaveTransform={(p) => p as Record<string, unknown>}>
      <CompanyEditorInner section={section} />
    </CmsDocumentProvider>
  );
}
