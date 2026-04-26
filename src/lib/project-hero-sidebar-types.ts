export type HeroSidebarRibbonItem = { rowKey: string; label: string; value: string };

export type ResolvedHeroSidebar = { intro: { eyebrow: string; title: string; blurb: string }; ribbon: HeroSidebarRibbonItem[] };
