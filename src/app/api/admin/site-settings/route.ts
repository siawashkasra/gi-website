import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { getSiteSettingsPayload, saveSiteSettingsPayload } from "@/lib/cms/site-settings-repo";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return NextResponse.json({ ok: true, settings: getSiteSettingsPayload() });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: SiteSettingsPayload;
  try {
    body = (await request.json()) as SiteSettingsPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  saveSiteSettingsPayload(body);
  revalidateCmsContent();
  return NextResponse.json({ ok: true, settings: getSiteSettingsPayload() });
}
