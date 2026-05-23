"use client";

import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { TeamMemberFields, withPhotos, type Member } from "@/components/admin/team-content-admin";

function TeamEditorInner() {
  const ctx = useCmsDocumentContext();
  const members = Array.isArray(ctx.payload) && ctx.payload.length ? withPhotos(ctx.payload as Member[]) : [];
  return (
    <div className="admin-editor-workspace -mx-4 flex flex-col gap-4 px-4 pb-8 sm:-mx-8 sm:px-8">
      <div className="admin-page-hero px-5 py-5 sm:px-6">
        <h1 className="font-heading text-xl font-semibold tracking-tight text-gi-navy sm:text-2xl">Team</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review the team copy for the selected language, then edit names, titles, and bios below.</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 xl:flex-row">
        <div className="w-full shrink-0 xl:w-[min(42%,22rem)] xl:max-w-md">
          <CmsSectionPreview domain="team" section="team" locale={ctx.locale} members={members} sectionLabel="Leadership team" publicPath={`/${ctx.locale}/#team`} />
        </div>
        <div className="min-w-0 flex-1 rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
          <CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => withPhotos(Array.isArray(p) && (p as Member[]).length ? (p as Member[]) : []))}><TeamMemberFields /></CmsEditorToolbar>
        </div>
      </div>
    </div>
  );
}

export function TeamEditorPage() {
  return (
    <CmsDocumentProvider entityType="team" entityKey="all" merge={false}>
      <TeamEditorInner />
    </CmsDocumentProvider>
  );
}
