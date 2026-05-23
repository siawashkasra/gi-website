"use client";

import { withPhotos, type Member } from "@/components/admin/team-content-admin";

export function TeamSectionPreview({ members }: { members: Member[] }) {
  const list = withPhotos(members);
  if (!list.length) return null;
  return (
    <ul className="space-y-4">
      {list.map((m, i) => (
        <li key={i} className="flex gap-3 rounded-lg border border-border/60 bg-white p-3">
          {m.photo ? (
            <img src={m.photo} alt="" className="size-12 shrink-0 rounded-full object-cover" />
          ) : (
            <div className="size-12 shrink-0 rounded-full bg-muted" />
          )}
          <div className="min-w-0">
            <p className="font-heading font-semibold text-gi-navy">{m.name}</p>
            <p className="text-xs uppercase tracking-wide text-primary/90">{m.title}</p>
            {m.bio ? <p className="mt-1 text-xs leading-relaxed text-foreground/85 line-clamp-4">{m.bio}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
