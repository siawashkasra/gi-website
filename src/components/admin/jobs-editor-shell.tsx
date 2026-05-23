"use client";

import { Suspense, useCallback, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { AdminSectionPreviewPanel } from "@/components/admin/admin-section-preview-panel";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { JobsAnnouncementEditor, JobsAnnouncementsList } from "@/components/admin/jobs-announcements-admin";
import { JobPostingPreview, type JobPostingPreviewData } from "@/components/admin/previews/job-posting-preview";
import { JobsSectionFields } from "@/components/admin/jobs-section-fields";
import { jobsEditorSections } from "@/lib/admin/editor-sections";
import type { CmsLocaleId } from "@/components/admin/locale-tabs";

function JobsCmsEditorInner({ section }: { section: string }) {
  const ctx = useCmsDocumentContext();
  return (
    <AdminEditorLayout pageTitle="Jobs page" pageDescription="Review the current careers copy for this section, then edit per language." sections={jobsEditorSections} activeSlug={section} preview={<CmsSectionPreview domain="jobs" section={section} locale={ctx.locale} data={ctx.data} sections={jobsEditorSections} />} toolbar={<CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => p as Record<string, unknown>)}><JobsSectionFields section={section} /></CmsEditorToolbar>} />
  );
}

function JobsAnnouncementsLayout({ section }: { section: string }) {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const [preview, setPreview] = useState<JobPostingPreviewData | null>(null);
  const [previewLocale, setPreviewLocale] = useState<CmsLocaleId>("en");
  const onPreview = useCallback((data: JobPostingPreviewData | null, locale: CmsLocaleId) => {
    setPreview(data);
    setPreviewLocale(locale);
  }, []);
  const listPreview = <p className="text-muted-foreground">Select a role to preview its copy for the active language.</p>;
  const editPreview = (
    <AdminSectionPreviewPanel locale={previewLocale} sectionLabel="Job announcement" publicHref={`/${previewLocale}/jobs#open-roles`} empty={!preview?.title?.trim() && !preview?.summary?.trim()}>
      <JobPostingPreview job={preview} />
    </AdminSectionPreviewPanel>
  );
  return (
    <AdminEditorLayout pageTitle="Jobs page" pageDescription="Create and publish open roles in English, Dari, and Pashto." sections={jobsEditorSections} activeSlug={section} preview={section === "announcement-edit" ? editPreview : listPreview} toolbar={section === "announcement-edit" ? <JobsAnnouncementEditor editId={editId} onPreview={onPreview} /> : <JobsAnnouncementsList />} />
  );
}

function JobsEditorRouter({ section }: { section: string }) {
  if (section === "announcements" || section === "announcement-edit") {
    return (
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
        <JobsAnnouncementsLayout section={section} />
      </Suspense>
    );
  }
  return (
    <CmsDocumentProvider entityType="jobs" entityKey="default" merge onSaveTransform={(p) => p as Record<string, unknown>}>
      <JobsCmsEditorInner section={section} />
    </CmsDocumentProvider>
  );
}

export function JobsEditorShell() {
  const params = useParams();
  const section = typeof params.section === "string" ? params.section : "intro";
  return <JobsEditorRouter section={section} />;
}
