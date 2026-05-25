import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { assets, placements } from "@/db/schema";
import { getDb } from "@/db/index";
import { isValidPlacementKey } from "@/lib/admin/placement-guard";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { removeStoredTeamMemberAllLocales, readStoredTeamLocale, upsertStoredTeamMember } from "@/lib/cms/team-store";
import { revalidateCmsContent } from "@/lib/cms/revalidate";
import type { CmsLocale } from "@/lib/i18n/locales";
import { teamPhotoKey } from "@/lib/media/placement-keys";
import { newTeamMemberId, resolveTeamMemberId } from "@/lib/team/member-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const locales = new Set(["en", "fa-AF", "ps"]);

type LocaleFields = { name: string; title: string; bio: string };
type MemberForm = Record<CmsLocale, LocaleFields>;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function fieldsForLocale(form: MemberForm, locale: CmsLocale): LocaleFields {
  const cur = form[locale] ?? { name: "", title: "", bio: "" };
  if (locale === "en") return { name: str(cur.name), title: str(cur.title), bio: str(cur.bio) };
  return { name: str(cur.name) || str(form.en.name), title: str(cur.title) || str(form.en.title), bio: str(cur.bio) || str(form.en.bio) };
}

function parseForm(raw: unknown): MemberForm | null {
  if (!raw || typeof raw !== "object") return null;
  const out = {} as MemberForm;
  for (const locale of ["en", "fa-AF", "ps"] as const) {
    const row = (raw as Record<string, unknown>)[locale];
    if (!row || typeof row !== "object") return null;
    const fields = row as Record<string, unknown>;
    if (typeof fields.name !== "string" || typeof fields.title !== "string" || typeof fields.bio !== "string") return null;
    out[locale] = { name: fields.name, title: fields.title, bio: fields.bio };
  }
  return out;
}

function ensurePlacement(memberId: string, assetId: string, alt: string, publicPath: string) {
  const placementKey = teamPhotoKey(memberId);
  if (!isValidPlacementKey(placementKey)) throw new Error("Invalid team placement key");
  const db = getDb();
  const asset = db.select().from(assets).where(eq(assets.id, assetId)).get();
  if (!asset) throw new Error("Asset not found");
  if (asset.publicPath !== publicPath) throw new Error("Asset path mismatch");
  db.insert(placements).values({ placementKey, assetId, alt }).onConflictDoUpdate({ target: placements.placementKey, set: { assetId, alt } }).run();
  revalidateTag("media", "max");
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { mode?: string; memberId?: string; form?: unknown; assetId?: string; publicPath?: string; alt?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON", code: "BAD_REQUEST" }, { status: 400 });
  }
  const mode = body.mode === "edit" ? "edit" : body.mode === "add" ? "add" : null;
  if (!mode) return NextResponse.json({ ok: false, message: "mode must be add or edit", code: "BAD_REQUEST" }, { status: 400 });
  const form = parseForm(body.form);
  if (!form) return NextResponse.json({ ok: false, message: "form with en, fa-AF, ps required", code: "BAD_REQUEST" }, { status: 400 });
  if (!form.en.name || !form.en.title) return NextResponse.json({ ok: false, message: "English name and title are required", code: "BAD_REQUEST" }, { status: 400 });
  const assetId = str(body.assetId);
  const publicPath = str(body.publicPath);
  const alt = str(body.alt) || form.en.name;
  if (mode === "add" && (!assetId || !publicPath.startsWith("/uploads/"))) return NextResponse.json({ ok: false, message: "Portrait upload required", code: "BAD_REQUEST" }, { status: 400 });
  const enTeam = readStoredTeamLocale("en");
  const existingIds = new Set(enTeam.map((m, i) => resolveTeamMemberId(m, i)));
  const memberId = mode === "edit" ? str(body.memberId) : newTeamMemberId(existingIds);
  if (mode === "edit" && !memberId) return NextResponse.json({ ok: false, message: "memberId required", code: "BAD_REQUEST" }, { status: 400 });
  if (mode === "edit" && !existingIds.has(memberId)) return NextResponse.json({ ok: false, message: "Team member not found", code: "NOT_FOUND" }, { status: 404 });
  let photo = mode === "edit" ? (enTeam.find((m, i) => resolveTeamMemberId(m, i) === memberId)?.photo ?? "") : publicPath;
  if (assetId && publicPath.startsWith("/uploads/")) {
    try {
      ensurePlacement(memberId, assetId, alt, publicPath);
      photo = publicPath;
    } catch (err) {
      return NextResponse.json({ ok: false, message: err instanceof Error ? err.message : "Could not assign photo", code: "PLACEMENT_FAILED" }, { status: 400 });
    }
  }
  if (mode === "add" && !photo.startsWith("/uploads/")) return NextResponse.json({ ok: false, message: "Portrait upload required", code: "BAD_REQUEST" }, { status: 400 });
  try {
    for (const locale of ["en", "fa-AF", "ps"] as const) {
      const fields = fieldsForLocale(form, locale);
      upsertStoredTeamMember(locale, { id: memberId, name: fields.name, title: fields.title, bio: fields.bio, photo }, mode);
    }
  } catch (err) {
    return NextResponse.json({ ok: false, message: err instanceof Error ? err.message : "Could not save team member", code: "SAVE_FAILED" }, { status: 400 });
  }
  revalidateCmsContent();
  return NextResponse.json({ ok: true, memberId, photo });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const memberId = new URL(request.url).searchParams.get("memberId")?.trim() ?? "";
  if (!memberId) return NextResponse.json({ ok: false, message: "memberId required", code: "BAD_REQUEST" }, { status: 400 });
  try {
    removeStoredTeamMemberAllLocales(memberId);
  } catch (err) {
    return NextResponse.json({ ok: false, message: err instanceof Error ? err.message : "Could not delete team member", code: "DELETE_FAILED" }, { status: 400 });
  }
  const db = getDb();
  db.delete(placements).where(eq(placements.placementKey, teamPhotoKey(memberId))).run();
  revalidateTag("media", "max");
  revalidateCmsContent();
  return NextResponse.json({ ok: true });
}
