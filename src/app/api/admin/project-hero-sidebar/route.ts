import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getMergedProject } from "@/lib/media/merge";
import { getProjectRecord } from "@/lib/projects/project-source";
import { getMessagesForLocale } from "@/lib/cms/get-messages";
import { fetchHeroSidebarConfig, fetchHeroSidebarRows, parseHeroSidebarPutBody, saveHeroSidebarPayload } from "@/lib/media/project-hero-sidebar-repo";
import { resolveHeroSidebarForAdmin, ribbonLabelsFromMessages } from "@/lib/media/admin-public-content";
import type { CmsLocale } from "@/lib/i18n/locales";
import { getRibbonItems } from "@/lib/project-ribbon";
import { requireAdminApi } from "@/lib/admin/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function revalidateHero(slug: string) {
  revalidatePath("/admin/hero-sidebar");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
}

export async function GET(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const url = new URL(request.url);
  const slug = url.searchParams.get("projectSlug");
  const localeRaw = url.searchParams.get("locale") ?? "en";
  const locale: CmsLocale = localeRaw === "fa-AF" || localeRaw === "ps" ? localeRaw : "en";
  if (!slug) return NextResponse.json({ ok: false, message: "projectSlug required" }, { status: 400 });
  const base = getProjectRecord(slug, { includeUnpublished: true });
  if (!base) return NextResponse.json({ ok: false, message: "Unknown project" }, { status: 400 });
  const project = (await getMergedProject(slug)) ?? base;
  const messages = await getMessagesForLocale(locale);
  const config = fetchHeroSidebarConfig(slug);
  const rows = fetchHeroSidebarRows(slug);
  const computedFallback = getRibbonItems(project, ribbonLabelsFromMessages(messages), locale);
  const resolved = resolveHeroSidebarForAdmin(project, slug, locale, messages);
  return NextResponse.json({ ok: true, config: config ?? null, rows, computedFallback, resolved, locale });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const parsed = parseHeroSidebarPutBody(body);
  if (!parsed) return NextResponse.json({ ok: false, message: "Invalid body" }, { status: 400 });
  if (!getProjectRecord(parsed.projectSlug, { includeUnpublished: true })) return NextResponse.json({ ok: false, message: "Unknown project" }, { status: 400 });
  saveHeroSidebarPayload(parsed.projectSlug, parsed.locale, { eyebrow: parsed.eyebrow, title: parsed.title, blurb: parsed.blurb, rows: parsed.rows });
  revalidateHero(parsed.projectSlug);
  const project = (await getMergedProject(parsed.projectSlug)) ?? getProjectRecord(parsed.projectSlug, { includeUnpublished: true });
  const messages = project ? await getMessagesForLocale(parsed.locale) : null;
  const resolved = project && messages ? resolveHeroSidebarForAdmin(project, parsed.projectSlug, parsed.locale, messages) : null;
  return NextResponse.json({ ok: true, resolved, locale: parsed.locale });
}
