"use client";

import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { projectsLabelsSection } from "@/lib/admin/editor-sections";

const TYPE_KEYS = ["residential", "commercial", "mixed-use"] as const;
const sections = [projectsLabelsSection];

function LabelsInner() {
  const ctx = useCmsDocumentContext();
  const labels = ((ctx.data ?? {}) as { projectTypeLabels?: Record<string, string> }).projectTypeLabels ?? {};
  const preview = <CmsSectionPreview domain="projectsLabels" section="labels" locale={ctx.locale} projectLabels={labels} sections={sections} />;
  return (
    <AdminEditorLayout pageTitle="Project type labels" pageDescription="Filter labels on the projects index — review then edit per language." sections={sections} activeSlug="labels" preview={preview} toolbar={
      <CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => p as Record<string, unknown>)}>
        <Link href="/admin/projects" className="mb-4 inline-block text-sm text-primary hover:underline">← All projects</Link>
        <div className="space-y-3">
          {TYPE_KEYS.map((key) => (
            <div key={key}>
              <Label>{key}</Label>
              <Input value={labels[key] ?? ""} onChange={(e) => ctx.patch({ projectTypeLabels: { ...labels, [key]: e.target.value } })} className="mt-1.5" />
            </div>
          ))}
        </div>
      </CmsEditorToolbar>
    } />
  );
}

export function ProjectsLabelsEditorShell() {
  return (
    <CmsDocumentProvider entityType="projectsData" entityKey="labels" merge onSaveTransform={(p) => p as Record<string, unknown>}>
      <LabelsInner />
    </CmsDocumentProvider>
  );
}
