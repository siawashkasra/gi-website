import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { fetchFeaturedAdminState, setProjectFeatured } from "@/lib/cms/project-featured-repo";
import { revalidateCmsContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return NextResponse.json({ ok: true, projects: fetchFeaturedAdminState() });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { projectSlug?: string; featured?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  if (!body.projectSlug || body.featured === undefined) return NextResponse.json({ ok: false, message: "projectSlug and featured required" }, { status: 400 });
  setProjectFeatured(body.projectSlug, body.featured);
  revalidateCmsContent();
  return NextResponse.json({ ok: true });
}
