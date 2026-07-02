import "server-only";
import { normalizePseudoArrayObject } from "@/lib/admin/object-path";
import { normalizeTeamMembers } from "@/lib/team/member-utils";

export const CMS_ENTITY_TYPES = ["homePremium", "companyProfile", "team", "company", "project", "projectsData", "jobs"] as const;
export type CmsEntityType = (typeof CMS_ENTITY_TYPES)[number];

export function isCmsEntityType(v: string): v is CmsEntityType {
  return (CMS_ENTITY_TYPES as readonly string[]).includes(v);
}

export function validateAndNormalizeContentPayload(entityType: CmsEntityType, payload: unknown): { ok: true; payload: Record<string, unknown> | unknown[] } | { ok: false; message: string; code: string } {
  if (entityType === "team") {
    if (!Array.isArray(payload)) return { ok: false, message: "team payload must be an array", code: "INVALID_PAYLOAD" };
    for (const item of payload) {
      if (!item || typeof item !== "object") return { ok: false, message: "team members must be objects", code: "INVALID_PAYLOAD" };
      const m = item as Record<string, unknown>;
      if (typeof m.name !== "string" || typeof m.title !== "string" || typeof m.bio !== "string") return { ok: false, message: "team members require name, title, bio", code: "INVALID_PAYLOAD" };
      if (m.photo != null && typeof m.photo !== "string") return { ok: false, message: "team member photo must be a string", code: "INVALID_PAYLOAD" };
      if (m.id != null && typeof m.id !== "string") return { ok: false, message: "team member id must be a string", code: "INVALID_PAYLOAD" };
    }
    return { ok: true, payload: normalizeTeamMembers(payload as { id?: string; name: string; title: string; photo?: string; bio: string }[]) };
  }
  if (entityType === "company") {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return { ok: false, message: "company payload must be an object", code: "INVALID_PAYLOAD" };
    const c = payload as Record<string, unknown>;
    if (c.name != null && typeof c.name !== "string") return { ok: false, message: "company name must be a string", code: "INVALID_PAYLOAD" };
    if (c.description != null && typeof c.description !== "string") return { ok: false, message: "company description must be a string", code: "INVALID_PAYLOAD" };
    if (c.industry != null && typeof c.industry !== "string") return { ok: false, message: "company industry must be a string", code: "INVALID_PAYLOAD" };
    return { ok: true, payload: c };
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return { ok: false, message: "payload must be an object", code: "INVALID_PAYLOAD" };
  const obj = normalizePseudoArrayObject(payload as Record<string, unknown>) as Record<string, unknown>;
  if (entityType === "homePremium") {
    for (const key of ["testimonials", "milestones", "standardPillars"] as const) {
      if (obj[key] != null && !Array.isArray(obj[key])) return { ok: false, message: `${key} must be an array`, code: "INVALID_PAYLOAD" };
    }
  }
  if (entityType === "projectsData" && obj.projectTypeLabels != null && (typeof obj.projectTypeLabels !== "object" || Array.isArray(obj.projectTypeLabels))) return { ok: false, message: "projectTypeLabels must be an object", code: "INVALID_PAYLOAD" };
  return { ok: true, payload: obj };
}
