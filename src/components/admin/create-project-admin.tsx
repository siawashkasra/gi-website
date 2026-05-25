"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROJECT_TEMPLATE_OPTIONS } from "@/lib/projects/project-template";
import type { ProjectType } from "@/data/projects";

const types: { value: ProjectType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed-use", label: "Mixed-use" },
];

export function CreateProjectAdmin() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<ProjectType>("mixed-use");
  const [templateSlug, setTemplateSlug] = useState("blank");
  const [enableUnitListings, setEnableUnitListings] = useState(true);
  const [publish, setPublish] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFeedback(null);
    try {
      const res = await adminFetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, name, category, type, templateSlug, enableUnitListings, publish }) });
      const j = (await res.json()) as { ok?: boolean; slug?: string; message?: string };
      if (res.ok && j.ok && j.slug) {
        router.push(`/admin/projects/${j.slug}/basics`);
        router.refresh();
        return;
      }
      setFeedback({ tone: "error", text: j.message ?? "Could not create project" });
    } finally {
      setBusy(false);
    }
  }
  return (
    <AdminSectionCard title="Create project" description="Add a new project with editable copy, images, and optional unit listings. Draft projects stay off the public site until published.">
      {feedback ? <div className="mb-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-slug">Slug</Label>
          <Input id="project-slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-new-project" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-name">Name</Label>
          <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-category">Category</Label>
          <Input id="project-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Mixed-use development" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-type">Type</Label>
          <select id="project-type" value={type} onChange={(e) => setType(e.target.value as ProjectType)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="project-template">Content template</Label>
          <select id="project-template" value={templateSlug} onChange={(e) => setTemplateSlug(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {PROJECT_TEMPLATE_OPTIONS.map((t) => <option key={t.slug} value={t.slug}>{t.label}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={enableUnitListings} onChange={(e) => setEnableUnitListings(e.target.checked)} />
          Enable unit listings
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
          Publish on create
        </label>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={busy}>{busy ? "Creating…" : "Create project"}</Button>
        </div>
      </form>
    </AdminSectionCard>
  );
}
