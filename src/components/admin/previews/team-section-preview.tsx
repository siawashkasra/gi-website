"use client";

import { AdminTeamPortrait } from "@/components/admin/admin-team-portrait";
import { cn } from "@/lib/utils";
import { withPhotos, type Member } from "@/components/admin/team-content-admin";
import { resolveMemberPhoto, resolveTeamMemberId } from "@/lib/team/member-utils";

export function TeamSectionPreview({ members, selectedMemberId, onSelectMember, placements }: { members: Member[]; selectedMemberId?: string | null; onSelectMember?: (id: string | null) => void; placements?: Record<string, { publicPath: string; alt: string } | null> }) {
  const list = withPhotos(members).map((m, i) => ({ member: m, id: resolveTeamMemberId(m, i), index: i }));
  const visible = selectedMemberId ? list.filter((x) => x.id === selectedMemberId) : list;
  if (!visible.length) return null;
  return (
    <div className="space-y-3">
      {selectedMemberId && onSelectMember ? (
        <button type="button" className="text-xs font-medium text-primary hover:underline" onClick={() => onSelectMember(null)}>← Show all members</button>
      ) : null}
      <ul className="space-y-3">
        {visible.map(({ member: m, id: memberId, index: i }) => {
          const photo = resolveMemberPhoto(m, i, placements);
          const selected = selectedMemberId === memberId;
          return (
            <li key={memberId}>
              <button type="button" onClick={() => onSelectMember?.(memberId)} className={cn("flex w-full gap-3 rounded-lg border bg-white p-3 text-start transition-colors", selected ? "border-primary ring-2 ring-primary/20" : "border-border/60 hover:border-primary/40")}>
                {photo ? (
                  <AdminTeamPortrait src={photo} name={m.name} className="size-14 shrink-0 rounded-full" />
                ) : (
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-sm font-semibold text-muted-foreground">{m.name.trim().slice(0, 1) || "?"}</div>
                )}
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-gi-navy">{m.name || "Untitled member"}</p>
                  <p className="text-xs uppercase tracking-wide text-primary/90">{m.title || "No title"}</p>
                  {m.bio ? <p className="mt-1 text-xs leading-relaxed text-foreground/85 line-clamp-4">{m.bio}</p> : null}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
