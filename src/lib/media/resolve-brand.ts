import "server-only";
import { brandOgImageKey, brandSiteLogoKey } from "@/lib/media/placement-keys";
import { fetchPlacementMap } from "@/lib/media/queries";
import { siteConfig } from "@/lib/site";

export function resolveSiteBrand() {
  const map = fetchPlacementMap();
  const siteLogo = map.get(brandSiteLogoKey());
  const og = map.get(brandOgImageKey());
  return {
    siteLogoUrl: siteLogo?.publicPath ?? null,
    siteLogoAlt: siteLogo?.alt ?? "Gulbahar Investment",
    ogImagePath: og?.publicPath ?? siteConfig.openGraphImage,
  };
}
