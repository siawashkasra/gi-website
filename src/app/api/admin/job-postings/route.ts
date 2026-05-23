import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { createJobPosting, fetchAdminJobPostings, reorderJobPostings } from "@/lib/cms/job-postings-repo";
import { revalidateCmsContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return NextResponse.json({ ok: true, jobs: fetchAdminJobPostings() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { sortOrder?: number; published?: boolean; translations: { locale: string; title: string; dateLabel: string; location: string; summary: string; department?: string | null; ctaLabel?: string | null; ctaHref?: string | null }[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  if (!body.translations?.length) return NextResponse.json({ ok: false, message: "translations required" }, { status: 400 });
  const id = createJobPosting(body);
  revalidateCmsContent();
  return NextResponse.json({ ok: true, id });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { order?: string[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  if (!body.order?.length) return NextResponse.json({ ok: false, message: "order required" }, { status: 400 });
  reorderJobPostings(body.order);
  revalidateCmsContent();
  return NextResponse.json({ ok: true });
}
