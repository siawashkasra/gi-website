"use client";

import { useEffect, useState } from "react";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { TeamMemberFields, withPhotos, type Member } from "@/components/admin/team-content-admin";
import type { MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import { fetchTeamPlacements } from "@/lib/admin/team-admin-api";

function TeamEditorInner({ initialPlacements }: { initialPlacements: Record<string, MediaSlotCurrent | null> }) {
  const ctx = useCmsDocumentContext();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [placements, setPlacements] = useState(initialPlacements);
  useEffect(() => {
    setPlacements(initialPlacements);
  }, [initialPlacements]);
  const members = Array.isArray(ctx.payload) && ctx.payload.length ? withPhotos(ctx.payload as Member[]) : [];
  async function refreshPlacements() {
    const next = await fetchTeamPlacements();
    setPlacements((cur) => ({ ...cur, ...next }));
  }
  return (
    <div className="admin-editor-workspace -mx-4 flex flex-col gap-4 px-4 pb-8 sm:-mx-8 sm:px-8">
      <div className="admin-page-hero px-5 py-5 sm:px-6">
        <h1 className="font-heading text-xl font-semibold tracking-tight text-gi-navy sm:text-2xl">Team</h1>
        <p className="mt-1 text-sm text-muted-foreground">Select a member in Current content to focus, then edit name, bio, photo, and translations in the modal.</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 xl:flex-row">
        <div className="w-full shrink-0 xl:w-[min(42%,22rem)] xl:max-w-md">
          <CmsSectionPreview domain="team" section="team" locale={ctx.locale} members={members} sectionLabel="Leadership team" publicPath={`/${ctx.locale}/#team`} selectedMemberId={selectedMemberId} onSelectMember={setSelectedMemberId} teamPlacements={placements} />
        </div>
        <div className="min-w-0 flex-1 rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
          <CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => withPhotos(Array.isArray(p) && (p as Member[]).length ? (p as Member[]) : []))}>
            <TeamMemberFields selectedMemberId={selectedMemberId} onSelectMember={setSelectedMemberId} placements={placements} onRefreshPlacements={refreshPlacements} />
          </CmsEditorToolbar>
        </div>
      </div>
    </div>
  );
}

export function TeamEditorPage({ placements }: { placements: Record<string, MediaSlotCurrent | null> }) {
  return (
    <CmsDocumentProvider entityType="team" entityKey="all" merge={false}>
      <TeamEditorInner initialPlacements={placements} />
    </CmsDocumentProvider>
  );
}
