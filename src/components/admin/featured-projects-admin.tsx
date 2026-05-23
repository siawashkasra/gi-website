"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useCallback, useEffect, useState } from "react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { Button } from "@/components/ui/button";

type Row = { slug: string; name: string; featured: boolean };

export function FeaturedProjectsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/featured-projects");
      const j = (await res.json()) as { ok?: boolean; projects?: Row[] };
      if (j.projects) setRows(j.projects);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function toggle(slug: string, featured: boolean) {
    const res = await adminFetch("/api/admin/featured-projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectSlug: slug, featured }) });
    const j = (await res.json()) as { ok?: boolean; message?: string };
    if (res.ok && j.ok) {
      setRows((r) => r.map((x) => (x.slug === slug ? { ...x, featured } : x)));
      setFeedback({ tone: "success", text: "Featured projects updated on the home page." });
    } else setFeedback({ tone: "error", text: j.message ?? "Update failed" });
  }
  return (
    <AdminSectionCard title="Home page featured projects" description="Choose which projects appear in the featured section. If none are selected, the first three projects are shown.">
      {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : rows.length === 0 ? <AdminEmptyState title="No projects" description="Add projects in the codebase to manage featured toggles." /> : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {rows.map((r) => (
            <li key={r.slug} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-sm font-medium text-gi-navy">{r.name}</span>
              <Button type="button" size="sm" variant={r.featured ? "default" : "outline"} onClick={() => toggle(r.slug, !r.featured)}>{r.featured ? "Featured" : "Not featured"}</Button>
            </li>
          ))}
        </ul>
      )}
      {feedback ? <div className="mt-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
    </AdminSectionCard>
  );
}
