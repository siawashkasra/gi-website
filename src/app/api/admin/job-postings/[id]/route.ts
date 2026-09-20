import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { deleteJobPosting, updateJobPosting } from "@/lib/cms/job-postings-repo";
import { revalidateCmsContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, ctx: Ctx) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await ctx.params;
  let body: { sortOrder?: number; published?: boolean; translations?: { locale: string; title: string; dateLabel: string; location: string; summary: string; department?: string | null; ctaLabel?: string | null; ctaHref?: string | null }[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const ok = updateJobPosting(id, body);
  if (!ok) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  revalidateCmsContent();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await ctx.params;
  deleteJobPosting(id);
  revalidateCmsContent();
  return NextResponse.json({ ok: true });
}
