"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Asset = { id: string; publicPath: string; mimeType: string; byteSize: number; createdAt: number; placementKeys: string[] };

export function MediaLibraryAdmin() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch(`/api/admin/assets${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      const j = (await res.json()) as { ok?: boolean; assets?: Asset[]; message?: string };
      if (!res.ok || !j.ok) {
        setError(j.message ?? "Failed to load assets");
        setAssets([]);
        return;
      }
      setAssets(j.assets ?? []);
    } catch {
      setError("Failed to load assets");
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, [query]);
  useEffect(() => {
    const t = setTimeout(() => void load(), 200);
    return () => clearTimeout(t);
  }, [load]);
  async function removeAsset(id: string, inUse: boolean) {
    if (inUse) {
      setFeedback({ tone: "error", text: "Remove this image from all placements before deleting." });
      return;
    }
    if (!confirm("Delete this uploaded file permanently?")) return;
    const res = await adminFetch(`/api/admin/upload?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const j = (await res.json()) as { ok?: boolean; message?: string };
    if (res.ok && j.ok) {
      setFeedback({ tone: "success", text: "Asset deleted." });
      await load();
    } else setFeedback({ tone: "error", text: j.message ?? "Delete failed" });
  }
  return (
    <AdminSectionCard title="Media library" description="Uploaded images. Search by path or placement key.">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by filename or placement…" className="max-w-md" />
      {error ? <div className="mt-4"><AdminBanner tone="error">{error}</AdminBanner></div> : null}
      {feedback ? <div className="mt-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
      {loading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : assets.length === 0 ? <div className="mt-6"><AdminEmptyState title="No uploads found" description="Upload images via page heroes, project media, or listing editors." /></div> : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((a) => (
            <div key={a.id} className="overflow-hidden rounded-lg border border-border">
              <div className="flex h-36 items-center justify-center bg-muted/50 p-2">
                <img src={a.publicPath} alt="" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="px-3 py-2">
                <p className="truncate font-mono text-xs text-muted-foreground">{a.publicPath}</p>
                {a.placementKeys.length ? <p className="mt-1 text-xs text-gi-navy">Used in: {a.placementKeys.join(", ")}</p> : <p className="mt-1 text-xs text-muted-foreground">Not assigned to a slot</p>}
                <Button type="button" variant="ghost" size="sm" className="mt-2 text-destructive" disabled={a.placementKeys.length > 0} onClick={() => removeAsset(a.id, a.placementKeys.length > 0)}><Trash2 className="size-4" /> Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminSectionCard>
  );
}
