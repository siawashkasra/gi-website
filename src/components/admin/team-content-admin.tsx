"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamMemberModal } from "@/components/admin/team-member-modal";
import { Button } from "@/components/ui/button";
import { useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import type { MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import { normalizeTeamMembers, resolveMemberPhoto, resolveTeamMemberId, type TeamMemberRecord } from "@/lib/team/member-utils";
import { ChevronDown, ChevronUp, Pencil, Plus } from "lucide-react";
import { AdminTeamPortrait } from "@/components/admin/admin-team-portrait";
import { cn } from "@/lib/utils";

export type Member = TeamMemberRecord;

export function withPhotos(members: Member[]): Member[] {
  return normalizeTeamMembers(members);
}

function localeLabel(locale: "en" | "fa-AF" | "ps") {
  return locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto";
}

export function TeamMemberFields({ selectedMemberId, onSelectMember, placements, onRefreshPlacements }: { selectedMemberId: string | null; onSelectMember: (id: string | null) => void; placements: Record<string, MediaSlotCurrent | null>; onRefreshPlacements: () => Promise<void> }) {
  const router = useRouter();
  const { payload, setPayload, locale, loading, reload, setFeedback } = useCmsDocumentContext();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const raw: Member[] = Array.isArray(payload) && payload.length ? (payload as Member[]) : [];
  const members = withPhotos(raw);
  const items = members.map((m, i) => ({ member: m, id: resolveTeamMemberId(m, i), index: i }));
  const selected = selectedMemberId ? items.find((x) => x.id === selectedMemberId) : undefined;
  function updateMembers(next: Member[]) {
    setPayload(withPhotos(next));
  }
  function moveMember(index: number, dir: -1 | 1) {
    const swap = index + dir;
    if (swap < 0 || swap >= members.length) return;
    const next = [...members];
    [next[index], next[swap]] = [next[swap]!, next[index]!];
    updateMembers(next);
  }
  async function onMemberSaved() {
    await reload();
    await onRefreshPlacements();
    router.refresh();
    setFeedback({ tone: "success", text: "Team updated. Changes are live on the public site." });
    onSelectMember(null);
  }
  if (loading) return <p className="text-sm text-muted-foreground">Loading current content…</p>;
  return (
    <div className="space-y-4">
      <TeamMemberModal mode="add" open={addOpen} onOpenChange={setAddOpen} existingMembers={members} placements={placements} onSaved={onMemberSaved} />
      {selected ? (
        <TeamMemberModal mode="edit" open={editOpen} onOpenChange={setEditOpen} memberId={selected.id} existingMembers={members} placements={placements} onSaved={onMemberSaved} />
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => setAddOpen(true)}><Plus className="size-4" />Add team member</Button>
      </div>
      {selected ? (
        <div className="rounded-lg border border-border p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Selected member · {localeLabel(locale)}</p>
              <p className="mt-1 font-heading text-lg font-semibold text-gi-navy">{selected.member.name || "Untitled member"}</p>
              <p className="text-xs uppercase tracking-wide text-primary/90">{selected.member.title || "No title"}</p>
            </div>
            {(() => {
              const photo = resolveMemberPhoto(selected.member, selected.index, placements);
              return photo ? <AdminTeamPortrait src={photo} name={selected.member.name} className="size-20 shrink-0 rounded-lg" /> : <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-muted font-heading text-lg font-semibold text-muted-foreground">{selected.member.name.trim().slice(0, 1) || "?"}</div>;
            })()}
          </div>
          {selected.member.bio ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selected.member.bio}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" className="gap-1.5 bg-gi-navy hover:bg-gi-navy/90" onClick={() => setEditOpen(true)}><Pencil className="size-4" />Edit</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => onSelectMember(null)}>Show all members</Button>
          </div>
        </div>
      ) : members.length === 0 ? (
        <p className="text-sm text-muted-foreground">No team members yet for {localeLabel(locale)}.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(({ member: m, id: memberId, index: i }) => {
            const photo = resolveMemberPhoto(m, i, placements);
            return (
              <li key={memberId}>
                <div className={cn("flex items-center gap-2 rounded-lg border border-border/60 bg-white p-2")}>
                  <button type="button" onClick={() => onSelectMember(memberId)} className="flex min-w-0 flex-1 items-center gap-3 rounded-md p-1 text-start hover:bg-muted/40">
                    {photo ? <AdminTeamPortrait src={photo} name={m.name} className="size-10 shrink-0 rounded-full" /> : <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">{m.name.trim().slice(0, 1) || "?"}</div>}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gi-navy">{m.name || `Member ${i + 1}`}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.title || "No title"}</p>
                    </div>
                  </button>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <Button type="button" variant="ghost" size="icon" className="size-8" disabled={i === 0} onClick={() => moveMember(i, -1)} aria-label="Move up"><ChevronUp className="size-4" /></Button>
                    <Button type="button" variant="ghost" size="icon" className="size-8" disabled={i === members.length - 1} onClick={() => moveMember(i, 1)} aria-label="Move down"><ChevronDown className="size-4" /></Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!selected && members.length > 0 ? <p className="text-xs text-muted-foreground">Select a member to edit details, or use Save to persist order changes for {localeLabel(locale)}.</p> : null}
    </div>
  );
}
