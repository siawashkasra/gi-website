import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { createProjectFromAdmin, normalizeProjectSlug } from "@/lib/projects/create-project";
import { deleteRegistryProject, fetchRegistryProject, updateRegistryProject } from "@/lib/projects/project-registry-repo";
import { isStaticProjectSlug } from "@/lib/projects/project-source";
import { revalidateProjects } from "@/lib/cms/revalidate";
import type { ProjectType } from "@/data/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const types = new Set<ProjectType>(["residential", "commercial", "mixed-use"]);

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { fetchRegistryProjects } = await import("@/lib/projects/project-registry-repo");
  return NextResponse.json({ ok: true, projects: fetchRegistryProjects() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { slug?: string; name?: string; category?: string; type?: string; templateSlug?: string; enableUnitListings?: boolean; publish?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON", code: "BAD_REQUEST" }, { status: 400 });
  }
  const type = body.type as ProjectType;
  if (!body.slug || !body.name || !body.category || !types.has(type)) return NextResponse.json({ ok: false, message: "slug, name, category, and valid type required", code: "BAD_REQUEST" }, { status: 400 });
  try {
    const slug = createProjectFromAdmin({ slug: body.slug, name: body.name, category: body.category, type, templateSlug: body.templateSlug, enableUnitListings: body.enableUnitListings });
    if (body.publish) updateRegistryProject(slug, { published: true });
    revalidateProjects();
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    return NextResponse.json({ ok: false, message: err instanceof Error ? err.message : "Could not create project", code: "CREATE_FAILED" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { slug?: string; published?: boolean; name?: string; category?: string; enableUnitListings?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON", code: "BAD_REQUEST" }, { status: 400 });
  }
  const slug = normalizeProjectSlug(body.slug ?? "");
  if (!slug || isStaticProjectSlug(slug)) return NextResponse.json({ ok: false, message: "Invalid or built-in project slug", code: "BAD_REQUEST" }, { status: 400 });
  if (!fetchRegistryProject(slug)) return NextResponse.json({ ok: false, message: "Project not found", code: "NOT_FOUND" }, { status: 404 });
  updateRegistryProject(slug, { published: body.published, name: body.name?.trim(), category: body.category?.trim(), enableUnitListings: body.enableUnitListings });
  revalidateProjects();
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const slug = normalizeProjectSlug(new URL(request.url).searchParams.get("slug") ?? "");
  if (!slug || isStaticProjectSlug(slug)) return NextResponse.json({ ok: false, message: "Invalid or built-in project slug", code: "BAD_REQUEST" }, { status: 400 });
  if (!fetchRegistryProject(slug)) return NextResponse.json({ ok: false, message: "Project not found", code: "NOT_FOUND" }, { status: 404 });
  deleteRegistryProject(slug);
  revalidateProjects();
  return NextResponse.json({ ok: true });
}
