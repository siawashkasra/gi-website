import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/require-admin";
import { fetchPlacementMap } from "@/lib/media/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const map = fetchPlacementMap();
  const placements: Record<string, { publicPath: string; alt: string }> = {};
  for (const [key, value] of map.entries()) placements[key] = { publicPath: value.publicPath, alt: value.alt };
  return NextResponse.json({ ok: true, placements });
}
