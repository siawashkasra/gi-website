import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Company } from "@/data/companies";
import { companies as staticCompanies, getCompanyForCompanyPage } from "@/data/companies";
import type { Project } from "@/data/projects";
import { listProjectRecords, getProjectRecord } from "@/lib/projects/project-source";
import type { PropertyListing } from "@/lib/property-listings";
import { fetchProjectListingRows, rowToPropertyListing } from "@/lib/media/project-listings-repo";
import type { TeamMember } from "@/data/team";
import { leadershipTeam } from "@/data/team";
import { getBundledCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import { getMessagesForLocale } from "@/lib/cms/get-messages";
import type { CmsLocale } from "@/lib/i18n/locales";
import { getLocalizedCompanies, getLocalizedTeam, type Messages } from "@/lib/i18n/localized-data";
import { fetchPlacementMap, type ResolvedPlacement } from "@/lib/media/queries";
import { companyLogoKey, heroMobilePlacementKey, heroPlacementKey, listingImageKey, parseGalleryPlacementKey, projectGalleryKey, projectHeroKey, sectionHomeAboutKey, sectionHomeCeoKey, sectionHomeMilestonesKey, teamPhotoKey, type HeroRoute } from "@/lib/media/placement-keys";
import { normalizeTeamMembers, resolveTeamMemberId, teamMembersById } from "@/lib/team/member-utils";

export const getPlacementEntriesCached = unstable_cache(async () => [...fetchPlacementMap()] as [string, ResolvedPlacement][], ["placements-map-v1"], { tags: ["media"] });

async function placementMap() {
  return new Map<string, ResolvedPlacement>(await getPlacementEntriesCached());
}

function photoKeyFromPath(photo: string) {
  const m = photo.match(/\/([^/]+)\.(png|jpe?g|webp)$/i);
  return m ? m[1] : "";
}

export function mergeProjectFromMap(base: Project, map: Map<string, ResolvedPlacement>, listingsSource?: PropertyListing[]): Project {
  const heroP = map.get(projectHeroKey(base.slug));
  const image = heroP?.publicPath ?? base.image;
  let maxI = Math.max(base.gallery.length - 1, -1);
  for (const k of map.keys()) {
    const p = parseGalleryPlacementKey(k);
    if (p?.slug === base.slug) maxI = Math.max(maxI, p.index);
  }
  const gallery: string[] = [];
  for (let i = 0; i <= maxI; i++) {
    const o = map.get(projectGalleryKey(base.slug, i));
    gallery.push(o?.publicPath ?? base.gallery[i] ?? image);
  }
  if (gallery.length === 0) gallery.push(...(base.gallery.length > 0 ? base.gallery : [image]));
  const rawListings = listingsSource !== undefined ? listingsSource : base.listings;
  const listings = rawListings?.map((l) => {
    const o = map.get(listingImageKey(l.id));
    return o ? { ...l, image: o.publicPath } : l;
  });
  return { ...base, image, gallery, listings };
}

export function mergeCompanyFromMap(base: Company, map: Map<string, ResolvedPlacement>): Company {
  const o = map.get(companyLogoKey(base.slug));
  return o ? { ...base, logo: o.publicPath } : base;
}

export function mergeTeamMemberFromMap(base: TeamMember, map: Map<string, ResolvedPlacement>): TeamMember {
  const idKey = typeof base.id === "string" && base.id.trim() ? base.id.trim() : "";
  const byId = idKey ? map.get(teamPhotoKey(idKey)) : undefined;
  if (byId) return { ...base, photo: byId.publicPath };
  if (typeof base.photo === "string" && base.photo.startsWith("/uploads/")) return base;
  const legacyKey = photoKeyFromPath(base.photo);
  if (!legacyKey) return base;
  const legacy = map.get(teamPhotoKey(legacyKey));
  return legacy ? { ...base, photo: legacy.publicPath } : base;
}

export const getMergedProject = cache(async (slug: string, locale: CmsLocale = "en"): Promise<Project | undefined> => {
  const base = getProjectRecord(slug);
  if (!base) return undefined;
  const map = await placementMap();
  const dbRows = fetchProjectListingRows(slug);
  const listingsSource = dbRows.length > 0 ? dbRows.map((r) => rowToPropertyListing(r, locale)) : undefined;
  return mergeProjectFromMap(base, map, listingsSource);
});

export const getMergedProjects = cache(async (): Promise<Project[]> => {
  const map = await placementMap();
  return listProjectRecords({ publishedOnly: true }).map((p) => {
    const dbRows = fetchProjectListingRows(p.slug);
    const listingsSource = dbRows.length > 0 ? dbRows.map((r) => rowToPropertyListing(r, "en")) : undefined;
    return mergeProjectFromMap(p, map, listingsSource);
  });
});

export const getMergedCompanies = cache(async (locale: CmsLocale): Promise<Company[]> => {
  const map = await placementMap();
  const messages = (await getMessagesForLocale(locale)) as Messages;
  const cmsList = getLocalizedCompanies(messages);
  const list = cmsList.length > 0 ? cmsList : staticCompanies;
  return list.map((c) => mergeCompanyFromMap(c, map));
});

export const getMergedCompanyForCompanyPage = cache(async (slug: string): Promise<Company | undefined> => {
  const base = getCompanyForCompanyPage(slug);
  if (!base) return undefined;
  const map = await placementMap();
  return mergeCompanyFromMap(base, map);
});

export const getMergedLeadershipTeam = cache(async (locale: CmsLocale): Promise<TeamMember[]> => {
  const map = await placementMap();
  const messages = (await getMessagesForLocale(locale)) as Messages;
  const cmsTeam = getLocalizedTeam(messages);
  const bundled = getBundledCmsPayload("team", "all", locale);
  const bundledTeam = Array.isArray(bundled) ? (bundled as TeamMember[]) : [];
  const list = cmsTeam.length > 0 ? cmsTeam : bundledTeam.length > 0 ? bundledTeam : locale === "en" ? leadershipTeam : bundledTeam;
  const staticById = teamMembersById(leadershipTeam) as Map<string, TeamMember>;
  return normalizeTeamMembers(list).map((m, i) => {
    const id = resolveTeamMemberId(m, i);
    const fallback = staticById.get(id);
    const photo = typeof m.photo === "string" && m.photo.trim() ? m.photo.trim() : (fallback?.photo ?? "");
    return mergeTeamMemberFromMap({ id, name: m.name, title: m.title, bio: m.bio, photo }, map);
  });
});

export async function getResolvedPageHero(route: HeroRoute) {
  const map = await placementMap();
  const main = map.get(heroPlacementKey(route));
  if (!main) return null;
  const mobile = route === "home" ? map.get(heroMobilePlacementKey()) : undefined;
  return { desktop: main.publicPath, alt: main.alt, mobile: mobile?.publicPath };
}

export async function getResolvedHomeSectionMedia() {
  const map = await placementMap();
  const about = map.get(sectionHomeAboutKey());
  const milestones = map.get(sectionHomeMilestonesKey());
  const ceo = map.get(sectionHomeCeoKey());
  return {
    about: about ? { src: about.publicPath, alt: about.alt } : undefined,
    milestones: milestones ? { src: milestones.publicPath, alt: milestones.alt } : undefined,
    ceo: ceo ? { src: ceo.publicPath, alt: ceo.alt } : undefined,
  };
}
