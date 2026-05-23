import "server-only";
import type { TeamMember } from "@/data/team";
import { getBundledCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import type { CmsLocale } from "@/lib/i18n/locales";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function pickField(locale: CmsLocale, field: "name" | "title" | "bio", patch: Record<string, unknown>, base: TeamMember, en: TeamMember): string {
  const v = str(patch[field]).trim();
  if (!v) return str(base[field]) || str(en[field]);
  if (locale !== "en" && v === str(en[field]).trim()) return str(base[field]) || v;
  return v;
}

export function mergeTeamCmsPayload(locale: CmsLocale, bundledTeam: TeamMember[], stored: unknown): TeamMember[] {
  if (!Array.isArray(stored) || stored.length === 0) return bundledTeam;
  const enRef = getBundledCmsPayload("team", "all", "en");
  const enTeam = Array.isArray(enRef) ? (enRef as TeamMember[]) : [];
  return (stored as Record<string, unknown>[]).map((patch, i) => {
    const base = bundledTeam[i] ?? enTeam[i] ?? { name: "", title: "", photo: "", bio: "" };
    const en = enTeam[i] ?? base;
    return {
      name: pickField(locale, "name", patch, base, en),
      title: pickField(locale, "title", patch, base, en),
      bio: pickField(locale, "bio", patch, base, en),
      photo: str(patch.photo) || str(base.photo) || str(en.photo),
    };
  });
}

export function sanitizeTeamRowsForLocale(locale: CmsLocale, rows: TeamMember[]): TeamMember[] {
  const bundled = getBundledCmsPayload("team", "all", locale);
  const bundledTeam = Array.isArray(bundled) ? (bundled as TeamMember[]) : [];
  return mergeTeamCmsPayload(locale, bundledTeam, rows);
}
