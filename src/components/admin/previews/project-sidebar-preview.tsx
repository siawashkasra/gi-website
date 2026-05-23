"use client";

import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";

export function ProjectSidebarPreview({ resolved }: { resolved: ResolvedHeroSidebar | null }) {
  if (!resolved) return null;
  return (
    <div className="space-y-3 rounded-lg bg-gi-navy p-4 text-white">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/55">{resolved.intro.eyebrow}</p>
        <p className="mt-1 font-heading text-base font-semibold">{resolved.intro.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/75">{resolved.intro.blurb}</p>
      </div>
      {resolved.ribbon.length ? (
        <ul className="space-y-2 border-t border-white/10 pt-3">
          {resolved.ribbon.map((r) => (
            <li key={r.rowKey}>
              <p className="text-[0.65rem] uppercase tracking-wide text-white/50">{r.label}</p>
              <p className="text-sm font-semibold tabular-nums">{r.value}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
