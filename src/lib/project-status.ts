export function formatProjectStatusLabel(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return "Completed";
  if (s.includes("develop")) return "Ongoing";
  if (s.includes("operat")) return "Operational";
  if (s.includes("leas") && s.includes("active")) return "Active";
  if (s.includes("active")) return "Active";
  return status;
}
