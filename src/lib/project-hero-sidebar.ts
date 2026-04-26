import "server-only";
import type { Project } from "@/data/projects";
import { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";
import { fetchHeroSidebarConfig, fetchHeroSidebarRows } from "@/lib/media/project-hero-sidebar-repo";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
import { getRibbonItems } from "@/lib/project-ribbon";

export type { HeroSidebarRibbonItem, ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
export { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";

export function resolveHeroSidebar(project: Project): ResolvedHeroSidebar {
  const config = fetchHeroSidebarConfig(project.slug);
  const dbRows = fetchHeroSidebarRows(project.slug);
  const intro = {
    eyebrow: config?.eyebrow?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.eyebrow,
    title: config?.title?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.title,
    blurb: config?.blurb?.trim() || HERO_SIDEBAR_DEFAULT_INTRO.blurb,
  };
  const ribbon: ResolvedHeroSidebar["ribbon"] =
    dbRows.length > 0
      ? dbRows.map((r) => ({ rowKey: r.id, label: r.label, value: r.value }))
      : getRibbonItems(project).map((r, i) => ({ rowKey: `legacy-${project.slug}-${i}`, label: r.label, value: r.value }));
  return { intro, ribbon };
}
