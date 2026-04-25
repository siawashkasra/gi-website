"use client";

import { useMemo, useState } from "react";
import { MediaSlotEditor, type MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import type { Project } from "@/data/projects";
import { projectGalleryKey, projectHeroKey } from "@/lib/media/placement-keys";

export function ProjectMediaAdmin({ slugs, meta, placements, projects }: { slugs: { slug: string; name: string }[]; meta: Record<string, { galleryLength: number }>; placements: Record<string, MediaSlotCurrent>; projects: Project[] }) {
  const [slug, setSlug] = useState(slugs[0]?.slug ?? "");
  const m = meta[slug];
  const proj = useMemo(() => projects.find((p) => p.slug === slug), [projects, slug]);
  const indices = useMemo(() => (m ? Array.from({ length: m.galleryLength }, (_, i) => i) : []), [m]);
  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="text-sm font-medium">Project</label>
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block rounded-md border border-input bg-background px-3 py-2 text-sm">
            {slugs.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {m ? (
        <div className="mt-8 space-y-8">
          <MediaSlotEditor label={`${slug} — hero / card image`} placementKey={projectHeroKey(slug)} current={placements[projectHeroKey(slug)] ?? null} fallbackImage={proj ? { publicPath: proj.image, alt: proj.name } : null} />
          <div>
            <h2 className="font-heading text-lg font-semibold text-gi-navy">Gallery</h2>
            <p className="mt-1 text-sm text-muted-foreground">Slots 0…{m.galleryLength - 1}. Clear a slot to use the default from code.</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {indices.map((i) => (
                <MediaSlotEditor
                  key={i}
                  label={`Gallery image ${i}`}
                  placementKey={projectGalleryKey(slug, i)}
                  current={placements[projectGalleryKey(slug, i)] ?? null}
                  fallbackImage={proj ? { publicPath: proj.gallery[i] ?? proj.image, alt: proj.name } : null}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
