"use client";

import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { brandOgImageKey, brandSiteLogoKey } from "@/lib/media/placement-keys";
import { siteConfig } from "@/lib/site";

export function BrandAdmin({ placements }: { placements: Map<string, { publicPath: string; alt: string }> }) {
  const siteLogo = placements.get(brandSiteLogoKey()) ?? null;
  const og = placements.get(brandOgImageKey()) ?? null;
  return (
    <div className="space-y-8">
      <div className="admin-page-hero p-6">
        <p className="text-sm font-medium text-gi-navy">Brand identity</p>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Upload your site logo for the header and footer. It appears instantly after you publish. Social sharing image is used for link previews and search results.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <MediaSlotEditor label="Site logo" description="Shown in the navigation bar and footer. Use a horizontal logo with transparent background (PNG or SVG)." placementKey={brandSiteLogoKey()} current={siteLogo} fallbackImage={{ publicPath: "/logos/gulbahar-investment.png", alt: "Gulbahar Investment" }} variant="logo" />
        <MediaSlotEditor label="Social & SEO image" description="Used when the site is shared on social media and in search results. Recommended 1200×630 px." placementKey={brandOgImageKey()} current={og} fallbackImage={{ publicPath: siteConfig.openGraphImage, alt: "Gulbahar Investment" }} variant="hero" />
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-gi-navy">Where logos appear</p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· Header and footer — site logo above</li>
          <li>· Home “Our companies” grid — per-company logos under Companies</li>
          <li>· Company detail pages — same company logos</li>
        </ul>
      </div>
    </div>
  );
}
