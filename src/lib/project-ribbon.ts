import type { Project } from "@/data/projects";

export type RibbonItem = { label: string; value: string };

export function getRibbonItems(project: Project): RibbonItem[] {
  if (project.slug === "gulbahar-center") {
    return [
      { label: "Floors", value: "17" },
      { label: "Retail units", value: "1,172" },
      { label: "Apartments", value: "225+" },
      { label: "Investment", value: "USD 120M" },
    ];
  }
  const labels = project.keyStatLabels;
  const k = project.keyStats;
  const rows: RibbonItem[] = [
    { label: labels?.units ?? "Scale", value: k.units },
    { label: labels?.shops ?? "Capacity", value: k.shops },
    { label: labels?.facilities ?? "Scope", value: k.facilities },
  ];
  if (project.area && project.area !== "—") rows.push({ label: "Footprint", value: project.area });
  return rows.filter((r) => r.value && r.value !== "—");
}
