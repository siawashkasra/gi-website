import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { fetchAssetsForAdmin } from "@/lib/media/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const q = new URL(request.url).searchParams.get("q")?.toLowerCase() ?? "";
  let assets = fetchAssetsForAdmin(200);
  if (q) assets = assets.filter((a) => a.publicPath.toLowerCase().includes(q) || a.placementKeys.some((k) => k.toLowerCase().includes(q)));
  return NextResponse.json({ ok: true, assets });
}
