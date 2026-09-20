"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { MediaSlotEditor, type MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { parseGalleryPlacementKey, projectGalleryKey, projectHeroKey } from "@/lib/media/placement-keys";

function gallerySlotCount(slug: string, baseGalleryLength: number, placements: Record<string, MediaSlotCurrent>) {
  let max = Math.max(baseGalleryLength, 1);
  for (const key of Object.keys(placements)) {
    const parsed = parseGalleryPlacementKey(key);
    if (parsed?.slug === slug) max = Math.max(max, parsed.index + 1);
  }
  return max;
}

export function ProjectMediaAdmin({ slugs, placements, projects, fixedProjectSlug }: { slugs: { slug: string; name: string }[]; placements: Record<string, MediaSlotCurrent>; projects: Project[]; fixedProjectSlug?: string }) {
  const [slug, setSlug] = useState(fixedProjectSlug ?? slugs[0]?.slug ?? "");
  const [extraSlots, setExtraSlots] = useState(0);
  const proj = useMemo(() => projects.find((p) => p.slug === slug), [projects, slug]);
  const minSlots = useMemo(() => gallerySlotCount(slug, proj?.gallery.length ?? 0, placements), [slug, proj, placements]);
  const slotCount = minSlots + extraSlots;
  useEffect(() => {
    setExtraSlots(0);
  }, [slug, minSlots]);
  const indices = useMemo(() => Array.from({ length: slotCount }, (_, i) => i), [slotCount]);
  return (
    <div>
      {!fixedProjectSlug ? (
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
      ) : null}
      {proj ? (
        <div className="mt-8 space-y-8">
          <MediaSlotEditor label={`${slug} — hero / card image`} placementKey={projectHeroKey(slug)} current={placements[projectHeroKey(slug)] ?? null} fallbackImage={{ publicPath: proj.image, alt: proj.name }} />
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-lg font-semibold text-gi-navy">Gallery</h2>
                <p className="mt-1 text-sm text-muted-foreground">Upload multiple images for the project gallery. Reset a slot to fall back to the default image.</p>
              </div>
              <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => setExtraSlots((n) => n + 1)}>
                <Plus className="size-3.5" /> Add gallery image
              </Button>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {indices.map((i) => (
                <MediaSlotEditor
                  key={i}
                  label={`Gallery image ${i + 1}`}
                  placementKey={projectGalleryKey(slug, i)}
                  current={placements[projectGalleryKey(slug, i)] ?? null}
                  fallbackImage={{ publicPath: proj.gallery[i] ?? proj.image, alt: proj.name }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
