export const UNIT_LISTING_PROJECT_SLUGS = ["gulbahar-center", "gulbahar-plaza", "gulbahar-towers"] as const;

export type UnitListingProjectSlug = (typeof UNIT_LISTING_PROJECT_SLUGS)[number];

const allowed = new Set<string>(UNIT_LISTING_PROJECT_SLUGS);

export function isUnitListingAdminProject(slug: string): slug is UnitListingProjectSlug {
  return allowed.has(slug);
}
