export type ProjectStatusKey = "completed" | "ongoing" | "operational" | "active" | "operationalDevelopment";

export function formatProjectStatusLabel(status: string, t?: (key: ProjectStatusKey) => string): string {
  const s = status.toLowerCase();
  if (s.includes("operat") && s.includes("develop")) return t ? t("operationalDevelopment") : status;
  if (s.includes("deliver")) return t ? t("completed") : "Completed";
  if (s.includes("develop")) return t ? t("ongoing") : "Ongoing";
  if (s.includes("operat")) return t ? t("operational") : "Operational";
  if (s.includes("leas") && s.includes("active")) return t ? t("active") : "Active";
  if (s.includes("active")) return t ? t("active") : "Active";
  return status;
}
