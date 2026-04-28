import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/data/projects";
import { getMergedProject } from "@/lib/media/merge";
import { fetchHeroSidebarConfig, fetchHeroSidebarRows, parseHeroSidebarPutBody, saveHeroSidebarPayload } from "@/lib/media/project-hero-sidebar-repo";
import { resolveHeroSidebar } from "@/lib/project-hero-sidebar";
import { getRibbonItems } from "@/lib/project-ribbon";

export const runtime = "nodejs";

function revalidateHero(slug: string) {
  revalidatePath("/admin/hero-sidebar");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("projectSlug");
  if (!slug) return NextResponse.json({ ok: false, message: "projectSlug required" }, { status: 400 });
  const base = getProjectBySlug(slug);
  if (!base) return NextResponse.json({ ok: false, message: "Unknown project" }, { status: 400 });
  const project = (await getMergedProject(slug)) ?? base;
  const config = fetchHeroSidebarConfig(slug);
  const rows = fetchHeroSidebarRows(slug);
  const computedFallback = getRibbonItems(project);
  const resolved = resolveHeroSidebar(project);
  return NextResponse.json({ ok: true, config: config ?? null, rows, computedFallback, resolved });
}

export async function PUT(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const parsed = parseHeroSidebarPutBody(body);
  if (!parsed) return NextResponse.json({ ok: false, message: "Invalid body" }, { status: 400 });
  if (!getProjectBySlug(parsed.projectSlug)) return NextResponse.json({ ok: false, message: "Unknown project" }, { status: 400 });
  saveHeroSidebarPayload(parsed.projectSlug, { eyebrow: parsed.eyebrow, title: parsed.title, blurb: parsed.blurb, rows: parsed.rows });
  revalidateHero(parsed.projectSlug);
  return NextResponse.json({ ok: true });
}
