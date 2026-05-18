import type { Project } from "@/data/projects";

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

export function getRibbonItems(project: Project, labels: RibbonLabels): RibbonItem[] {
  if (project.slug === "gulbahar-center") {
    return [
      { label: labels.floors, value: "17" },
      { label: labels.retailUnits, value: "1,172" },
      { label: labels.apartments, value: "225+" },
      { label: labels.investment, value: "USD 120M" },
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
