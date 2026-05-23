import "server-only";
import type { Project } from "@/data/projects";
import { getMessagesForLocale } from "@/lib/cms/get-messages";
import { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";
import { DEFAULT_RIBBON_LABELS } from "@/lib/project-ribbon";
import type { RibbonLabels } from "@/lib/project-ribbon";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
import type { CmsLocale } from "@/lib/i18n/locales";
import { locales } from "@/lib/i18n/locales";
import { getListingLabelsByLocale } from "@/lib/media/project-listings-repo";
import { fetchHeroSidebarConfig, fetchHeroSidebarIntroI18n, resolveIntroForLocale } from "@/lib/media/project-hero-sidebar-repo";
import { resolveRibbonForLocale } from "@/lib/project-hero-sidebar";

type HeroIntroCopy = { eyebrow: string; title: string; blurb: string };

function heroIntroFromMessages(messages: Record<string, unknown>): HeroIntroCopy {
  const block = (messages.projects as { heroIntro?: HeroIntroCopy } | undefined)?.heroIntro;
  return block ?? HERO_SIDEBAR_DEFAULT_INTRO;
}

export function ribbonLabelsFromMessages(messages: Record<string, unknown>): RibbonLabels {
  const ribbon = (messages.projects as { ribbon?: Partial<RibbonLabels> } | undefined)?.ribbon;
  return {
    floors: ribbon?.floors ?? DEFAULT_RIBBON_LABELS.floors,
    retailUnits: ribbon?.retailUnits ?? DEFAULT_RIBBON_LABELS.retailUnits,
    apartments: ribbon?.apartments ?? DEFAULT_RIBBON_LABELS.apartments,
    investment: ribbon?.investment ?? DEFAULT_RIBBON_LABELS.investment,
    scale: ribbon?.scale ?? DEFAULT_RIBBON_LABELS.scale,
    capacity: ribbon?.capacity ?? DEFAULT_RIBBON_LABELS.capacity,
    scope: ribbon?.scope ?? DEFAULT_RIBBON_LABELS.scope,
    footprint: ribbon?.footprint ?? DEFAULT_RIBBON_LABELS.footprint,
  };
}

export function applyHeroIntroMessageOverlay(intro: HeroIntroCopy, msg: HeroIntroCopy): HeroIntroCopy {
  return {
    eyebrow: intro.eyebrow === HERO_SIDEBAR_DEFAULT_INTRO.eyebrow ? msg.eyebrow : intro.eyebrow,
    title: intro.title === HERO_SIDEBAR_DEFAULT_INTRO.title ? msg.title : intro.title,
    blurb: intro.blurb === HERO_SIDEBAR_DEFAULT_INTRO.blurb ? msg.blurb : intro.blurb,
  };
}

export function hasStoredHeroSidebarIntro(projectSlug: string, locale: CmsLocale): boolean {
  const row = fetchHeroSidebarIntroI18n(projectSlug, locale);
  if (row && (row.eyebrow?.trim() || row.title?.trim() || row.blurb?.trim())) return true;
  if (locale !== "en") return false;
  const legacy = fetchHeroSidebarConfig(projectSlug);
  return !!(legacy && (legacy.eyebrow?.trim() || legacy.title?.trim() || legacy.blurb?.trim()));
}

export function resolveHeroSidebarForAdmin(project: Project, projectSlug: string, locale: CmsLocale, messages: Record<string, unknown>): ResolvedHeroSidebar {
  const introI18n = resolveIntroForLocale(projectSlug, locale);
  const intro = hasStoredHeroSidebarIntro(projectSlug, locale) && introI18n
    ? { eyebrow: introI18n.eyebrow?.trim() || "", title: introI18n.title?.trim() || "", blurb: introI18n.blurb?.trim() || "" }
    : applyHeroIntroMessageOverlay(
        {
          eyebrow: introI18n?.eyebrow?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.eyebrow,
          title: introI18n?.title?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.title,
          blurb: introI18n?.blurb?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.blurb,
        },
        heroIntroFromMessages(messages),
      );
  const ribbonLabels = ribbonLabelsFromMessages(messages);
  const ribbon = resolveRibbonForLocale(project, ribbonLabels, locale);
  return { intro, ribbon };
}

function messageListingLabel(messages: Record<string, unknown>, projectSlug: string, listingId: string): string | undefined {
  const pd = messages.projectsData as { projects?: Record<string, { listings?: { id: string; label?: string }[] }> } | undefined;
  const listings = pd?.projects?.[projectSlug]?.listings;
  if (!listings?.length) return undefined;
  const hit = listings.find((l) => l.id === listingId);
  return hit?.label?.trim() || undefined;
}

export async function getListingLabelsByLocaleForAdmin(listingId: string, projectSlug: string): Promise<Partial<Record<CmsLocale, string>>> {
  const out: Partial<Record<CmsLocale, string>> = { ...getListingLabelsByLocale(listingId) };
  for (const locale of locales) {
    if (out[locale]) continue;
    const messages = await getMessagesForLocale(locale);
    const fromMsg = messageListingLabel(messages, projectSlug, listingId);
    if (fromMsg) out[locale] = fromMsg;
  }
  return out;
}
