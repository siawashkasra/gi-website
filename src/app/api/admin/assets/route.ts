import { NextResponse } from "next/server";
import { fetchRecentAssets } from "@/lib/media/queries";

export const runtime = "nodejs";

export async function GET() {
  const assets = fetchRecentAssets(40);
  return NextResponse.json({ assets });
}
