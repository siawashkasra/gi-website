"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { AdminBanner } from "@/components/admin/admin-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function useProjectPublish(slug: string, published: boolean) {
  const router = useRouter();
  const [isPublished, setIsPublished] = useState(published);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  async function togglePublish() {
    setBusy(true);
    setFeedback(null);
    const next = !isPublished;
    try {
      const res = await adminFetch("/api/admin/projects", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, published: next }) });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && j.ok) {
        setIsPublished(next);
        setFeedback({ tone: "success", text: next ? "Project published — it is now live on the website." : "Project unpublished — it is hidden from the public site." });
        router.refresh();
      } else setFeedback({ tone: "error", text: j.message ?? "Update failed" });
    } finally {
      setBusy(false);
    }
  }
  const controls = (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Badge variant={isPublished ? "secondary" : "outline"}>{isPublished ? "Published" : "Draft"}</Badge>
      <Button type="button" size="sm" variant={isPublished ? "outline" : "default"} className={isPublished ? undefined : "bg-gi-navy hover:bg-gi-navy/90"} disabled={busy} onClick={() => void togglePublish()}>{busy ? "Updating…" : isPublished ? "Unpublish" : "Publish"}</Button>
    </div>
  );
  const feedbackBanner = feedback ? <AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner> : null;
  return { controls, feedbackBanner };
}
