export const heroRoutes = ["home", "company", "jobs", "events", "projectsIndex"] as const;
export type HeroRoute = (typeof heroRoutes)[number];

export function heroPlacementKey(route: HeroRoute) {
  return `hero:${route}`;
}

export function heroMobilePlacementKey() {
  return `hero:home:mobile`;
}

export function sectionHomeAboutKey() {
  return "section:home:about";
}

export function sectionHomeMilestonesKey() {
  return "section:home:milestones";
}

export function sectionHomeCeoKey() {
  return "section:home:ceo";
}

export function projectHeroKey(slug: string) {
  return `project:${slug}:hero`;
}

export function projectGalleryKey(slug: string, index: number) {
  return `project:${slug}:gallery:${index}`;
}

export function listingImageKey(listingId: string) {
  return `listing:${listingId}`;
}

export function companyLogoKey(slug: string) {
  return `company:${slug}`;
}

export function teamPhotoKey(memberKey: string) {
  return `team:${memberKey}`;
}

export function parseGalleryPlacementKey(key: string): { slug: string; index: number } | null {
  const m = key.match(/^project:([^:]+):gallery:(\d+)$/);
  if (!m) return null;
  return { slug: m[1], index: Number(m[2]) };
}
