import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import type { CmsLocale } from "@/lib/cms/apply-content-overlay";
import { isCmsEntityType, validateAndNormalizeContentPayload } from "@/lib/cms/cms-content-validation";
import { resolveAdminCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import { sanitizeTeamRowsForLocale } from "@/lib/cms/merge-team-payload";
import type { TeamMember } from "@/data/team";
import { deleteContentDocument, fetchContentDocument, replaceContentDocument, upsertContentDocument } from "@/lib/cms/content-documents-repo";
import { revalidateCmsContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const locales = new Set(["en", "fa-AF", "ps"]);

export async function GET(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const sp = new URL(request.url).searchParams;
  const entityType = sp.get("entityType");
  const entityKey = sp.get("entityKey");
  const locale = sp.get("locale");
  if (!entityType || !entityKey || !locale || !locales.has(locale)) return NextResponse.json({ ok: false, message: "entityType, entityKey, locale required", code: "BAD_REQUEST" }, { status: 400 });
  if (!isCmsEntityType(entityType)) return NextResponse.json({ ok: false, message: "Unknown entity type", code: "INVALID_ENTITY" }, { status: 400 });
  const row = fetchContentDocument(entityType, entityKey, locale as CmsLocale);
  const stored = row ? (JSON.parse(row.payloadJson) as unknown) : null;
  const { payload, source } = resolveAdminCmsPayload(entityType, entityKey, locale as CmsLocale, stored);
  return NextResponse.json({ ok: true, payload, source });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { entityType?: string; entityKey?: string; locale?: string; payload?: unknown; merge?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON", code: "BAD_REQUEST" }, { status: 400 });
  }
  if (!body.entityType || !body.entityKey || !body.locale || body.payload === undefined || !locales.has(body.locale)) return NextResponse.json({ ok: false, message: "entityType, entityKey, locale, payload required", code: "BAD_REQUEST" }, { status: 400 });
  if (!isCmsEntityType(body.entityType)) return NextResponse.json({ ok: false, message: "Unknown entity type", code: "INVALID_ENTITY" }, { status: 400 });
  const validated = validateAndNormalizeContentPayload(body.entityType, body.payload);
  if (!validated.ok) return NextResponse.json({ ok: false, message: validated.message, code: validated.code }, { status: 400 });
  let payloadToStore = validated.payload;
  if (body.entityType === "team" && Array.isArray(payloadToStore)) payloadToStore = sanitizeTeamRowsForLocale(body.locale as CmsLocale, payloadToStore as TeamMember[]);
  if (body.merge === false) replaceContentDocument(body.entityType, body.entityKey, body.locale as CmsLocale, payloadToStore);
  else if (Array.isArray(validated.payload)) return NextResponse.json({ ok: false, message: "Array payloads require merge: false", code: "INVALID_PAYLOAD" }, { status: 400 });
  else upsertContentDocument(body.entityType, body.entityKey, body.locale as CmsLocale, validated.payload);
  revalidateCmsContent();
  const row = fetchContentDocument(body.entityType, body.entityKey, body.locale as CmsLocale);
  const stored = row ? (JSON.parse(row.payloadJson) as unknown) : null;
  const { payload, source } = resolveAdminCmsPayload(body.entityType, body.entityKey, body.locale as CmsLocale, stored);
  return NextResponse.json({ ok: true, payload, source });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const sp = new URL(request.url).searchParams;
  const entityType = sp.get("entityType");
  const entityKey = sp.get("entityKey");
  const locale = sp.get("locale");
  if (!entityType || !entityKey || !locale || !locales.has(locale)) return NextResponse.json({ ok: false, message: "entityType, entityKey, locale required", code: "BAD_REQUEST" }, { status: 400 });
  if (!isCmsEntityType(entityType)) return NextResponse.json({ ok: false, message: "Unknown entity type", code: "INVALID_ENTITY" }, { status: 400 });
  deleteContentDocument(entityType, entityKey, locale as CmsLocale);
  revalidateCmsContent();
  return NextResponse.json({ ok: true });
}
