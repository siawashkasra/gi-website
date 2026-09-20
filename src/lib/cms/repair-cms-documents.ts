import "server-only";
import type Database from "better-sqlite3";
import { normalizePseudoArrayObject } from "@/lib/admin/object-path";
import { getBundledCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import { mergeTeamCmsPayload } from "@/lib/cms/merge-team-payload";
import type { TeamMember } from "@/data/team";
import type { CmsLocale } from "@/lib/i18n/locales";
import { localizeJsonStrings } from "@/lib/i18n/localize-content-rules";

export function repairCorruptedContentDocumentsSqlite(sqlite: Database.Database) {
  const rows = sqlite.prepare("SELECT entity_type, entity_key, locale, payload_json FROM content_documents").all() as { entity_type: string; entity_key: string; locale: string; payload_json: string }[];
  const update = sqlite.prepare("UPDATE content_documents SET payload_json = ?, updated_at = ? WHERE entity_type = ? AND entity_key = ? AND locale = ?");
  const now = Date.now();
  for (const row of rows) {
    try {
      const parsed = JSON.parse(row.payload_json) as unknown;
      if (!parsed || typeof parsed !== "object") continue;
      let normalized: unknown = Array.isArray(parsed) ? parsed : normalizePseudoArrayObject(parsed as Record<string, unknown>);
      const locale = row.locale as CmsLocale;
      if (locale === "fa-AF" || locale === "ps") normalized = localizeJsonStrings(normalized, locale);
      if (row.entity_type === "team" && Array.isArray(normalized) && row.locale !== "en") {
        const bundled = getBundledCmsPayload("team", "all", locale);
        const bundledTeam = Array.isArray(bundled) ? (bundled as TeamMember[]) : [];
        normalized = mergeTeamCmsPayload(locale, bundledTeam, normalized);
      }
      const fixed = JSON.stringify(normalized);
      if (fixed !== row.payload_json) update.run(fixed, now, row.entity_type, row.entity_key, row.locale);
    } catch {
      continue;
    }
  }
}
