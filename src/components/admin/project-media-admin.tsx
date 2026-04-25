"use client";

import { useMemo, useState } from "react";
import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { listingImageKey, projectGalleryKey, projectHeroKey } from "@/lib/media/placement-keys";

export function ProjectMediaAdmin({ slugs, meta }: { slugs: { slug: string; name: string }[]; meta: Record<string, { galleryLength: number; listings: { id: string; label?: string }[] }> }) {
  const [slug, setSlug] = useState(slugs[0]?.slug ?? "");
  const m = meta[slug];
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
          <MediaSlotEditor label={`${slug} — hero / card image`} placementKey={projectHeroKey(slug)} />
          <div>
            <h2 className="font-heading text-lg font-semibold text-gi-navy">Gallery</h2>
            <p className="mt-1 text-sm text-muted-foreground">Slots 0…{m.galleryLength - 1}. Clear a slot to use the default from code.</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {indices.map((i) => (
                <MediaSlotEditor key={i} label={`Gallery image ${i}`} placementKey={projectGalleryKey(slug, i)} />
              ))}
            </div>
          </div>
          {m.listings.length > 0 ? (
            <div>
              <h2 className="font-heading text-lg font-semibold text-gi-navy">Listing thumbnails</h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {m.listings.map((l) => (
                  <MediaSlotEditor key={l.id} label={l.label ? `${l.label} (${l.id})` : l.id} placementKey={listingImageKey(l.id)} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
