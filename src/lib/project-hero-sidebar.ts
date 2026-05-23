import "server-only";
import type { Project } from "@/data/projects";
import { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";
import { fetchHeroSidebarRowI18nForLocale, fetchHeroSidebarRows, resolveIntroForLocale, resolveRowsForLocale } from "@/lib/media/project-hero-sidebar-repo";
import type { CmsLocale } from "@/lib/i18n/locales";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
import { DEFAULT_RIBBON_LABELS, getRibbonItems, type RibbonLabels } from "@/lib/project-ribbon";

export type { HeroSidebarRibbonItem, ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
export { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";
export { DEFAULT_RIBBON_LABELS } from "@/lib/project-ribbon";

const RIBBON_LABEL_KEYS: (keyof RibbonLabels)[] = ["floors", "retailUnits", "apartments", "investment", "scale", "capacity", "scope", "footprint"];

const RIBBON_VALUE_KEYS: Record<string, Partial<Record<string, keyof RibbonLabels>>> = {
  "gulbahar-center": {
    "17": "floors", "۱۷": "floors",
    "1,172": "retailUnits", "۱٬۱۷۲": "retailUnits",
    "225+": "apartments", "۲۲۵+": "apartments",
    "USD 120M": "investment", "۱۲۰ میلیون دلار": "investment", "۱۲۰ میلیون امریکایی ډالر": "investment",
  },
};

function ribbonLabelKey(project: Project, label: string, value: string): keyof RibbonLabels | undefined {
  const byLabel = RIBBON_LABEL_KEYS.find((k) => label === DEFAULT_RIBBON_LABELS[k]);
  if (byLabel) return byLabel;
  const valueKey = RIBBON_VALUE_KEYS[project.slug]?.[value];
  if (valueKey && label === DEFAULT_RIBBON_LABELS[valueKey]) return valueKey;
  return undefined;
}

export function resolveRibbonForLocale(project: Project, ribbonLabels: RibbonLabels, locale: CmsLocale): ResolvedHeroSidebar["ribbon"] {
  const stored = fetchHeroSidebarRows(project.slug);
  if (!stored.length) {
    return getRibbonItems(project, ribbonLabels, locale).map((r, i) => ({ rowKey: `legacy-${project.slug}-${i}`, label: r.label, value: r.value }));
  }
  const resolved = resolveRowsForLocale(project.slug, locale);
  if (locale === "en") return resolved;
  const translatedRowIds = new Set(fetchHeroSidebarRowI18nForLocale(stored.map((r) => r.id), locale).map((t) => t.rowId));
  return resolved.map((item) => {
    if (translatedRowIds.has(item.rowKey)) return item;
    const key = ribbonLabelKey(project, item.label, item.value);
    if (key) return { ...item, label: ribbonLabels[key] };
    return item;
  });
}

export function resolveHeroSidebar(project: Project, ribbonLabels: RibbonLabels = DEFAULT_RIBBON_LABELS, locale: CmsLocale = "en"): ResolvedHeroSidebar {
  const introI18n = resolveIntroForLocale(project.slug, locale);
  const intro = {
    eyebrow: introI18n?.eyebrow?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.eyebrow,
    title: introI18n?.title?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.title,
    blurb: introI18n?.blurb?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.blurb,
  };
  const ribbon = resolveRibbonForLocale(project, ribbonLabels, locale);
  return { intro, ribbon };
}
