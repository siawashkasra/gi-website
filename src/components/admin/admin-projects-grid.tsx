"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { AdminBanner } from "@/components/admin/admin-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AdminProjectCard = {
  slug: string;
  name: string;
  image: string;
  featured: boolean;
  hasCustomHero: boolean;
  listingCount: number;
  published?: boolean;
  isRegistry?: boolean;
};

export function AdminProjectsGrid({ projects }: { projects: AdminProjectCard[] }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  async function togglePublish(slug: string, published: boolean) {
    setBusySlug(slug);
    setFeedback(null);
    try {
      const res = await adminFetch("/api/admin/projects", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, published }) });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && j.ok) {
        setFeedback({ tone: "success", text: published ? "Project published." : "Project unpublished." });
        router.refresh();
      } else setFeedback({ tone: "error", text: j.message ?? "Update failed" });
    } finally {
      setBusySlug(null);
    }
  }
  async function remove(slug: string) {
    if (!confirm(`Delete ${slug}? This removes the registry entry only.`)) return;
    setBusySlug(slug);
    setFeedback(null);
    try {
      const res = await adminFetch(`/api/admin/projects?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && j.ok) {
        setFeedback({ tone: "success", text: "Project deleted." });
        router.refresh();
      } else setFeedback({ tone: "error", text: j.message ?? "Delete failed" });
    } finally {
      setBusySlug(null);
    }
  }
  return (
    <div>
      {feedback ? <div className="mb-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.slug} className="overflow-hidden rounded-xl border border-border bg-card">
            <Link href={`/admin/projects/${p.slug}/basics`} className="group block">
              <div className="relative aspect-[16/10] bg-muted">
                <Image src={p.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-medium text-gi-navy group-hover:text-primary">{p.name}</h2>
                  {p.featured ? <Badge variant="secondary">Featured</Badge> : null}
                  {p.hasCustomHero ? <Badge>Custom hero</Badge> : null}
                  {p.isRegistry && !p.published ? <Badge variant="outline">Draft</Badge> : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.slug}{p.listingCount > 0 ? ` · ${p.listingCount} listings` : ""}</p>
              </div>
            </Link>
            {p.isRegistry ? (
              <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
                <Button type="button" size="sm" variant="outline" disabled={busySlug === p.slug} onClick={() => void togglePublish(p.slug, !p.published)}>{p.published ? "Unpublish" : "Publish"}</Button>
                <Button type="button" size="sm" variant="ghost" disabled={busySlug === p.slug} onClick={() => void remove(p.slug)}>Delete</Button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
