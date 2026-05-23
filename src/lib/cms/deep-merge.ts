export function deepMerge<T extends Record<string, unknown>>(base: T, overlay: Record<string, unknown>): T {
  if (!overlay || typeof overlay !== "object") return base;
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(overlay)) {
    const bv = base[key];
    const ov = overlay[key];
    if (ov === undefined) continue;
    if (ov !== null && typeof ov === "object" && !Array.isArray(ov) && bv !== null && typeof bv === "object" && !Array.isArray(bv)) {
      out[key] = deepMerge(bv as Record<string, unknown>, ov as Record<string, unknown>);
    } else {
      out[key] = ov;
    }
  }
  return out as T;
}
