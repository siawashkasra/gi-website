import type { Project } from "@/data/projects";
import type { CmsLocale } from "@/lib/i18n/locales";

export type RibbonItem = { label: string; value: string };

export type RibbonLabels = {
  floors: string;
  retailUnits: string;
  apartments: string;
  investment: string;
  scale: string;
  capacity: string;
  scope: string;
  footprint: string;
};

export const DEFAULT_RIBBON_LABELS: RibbonLabels = { floors: "Floors", retailUnits: "Retail units", apartments: "Apartments", investment: "Investment", scale: "Scale", capacity: "Capacity", scope: "Scope", footprint: "Footprint" };

const GULBAHAR_CENTER_VALUES: Record<CmsLocale, [string, string, string, string]> = {
  en: ["17", "1,172", "225+", "USD 120M"],
  "fa-AF": ["۱۷", "۱٬۱۷۲", "۲۲۵+", "۱۲۰ میلیون دلار"],
  ps: ["۱۷", "۱٬۱۷۲", "۲۲۵+", "۱۲۰ میلیون امریکایی ډالر"],
};

export function getRibbonItems(project: Project, labels: RibbonLabels, locale: CmsLocale = "en"): RibbonItem[] {
  if (project.slug === "gulbahar-center") {
    const [floors, retailUnits, apartments, investment] = GULBAHAR_CENTER_VALUES[locale];
    return [
      { label: labels.floors, value: floors },
      { label: labels.retailUnits, value: retailUnits },
      { label: labels.apartments, value: apartments },
      { label: labels.investment, value: investment },
    ];
  }
  const keyLabels = project.keyStatLabels;
  const k = project.keyStats;
  const rows: RibbonItem[] = [
    { label: keyLabels?.units ?? labels.scale, value: k.units },
    { label: keyLabels?.shops ?? labels.capacity, value: k.shops },
    { label: keyLabels?.facilities ?? labels.scope, value: k.facilities },
  ];
  if (project.area && project.area !== "—") rows.push({ label: labels.footprint, value: project.area });
  return rows.filter((r) => r.value && r.value !== "—");
}
