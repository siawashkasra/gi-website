"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import type { JobPostingPreviewData } from "@/components/admin/previews/job-posting-preview";
import { LocalePanel, LocaleTabs, cmsLocales, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Tr = { locale: string; title: string; dateLabel: string; location: string; summary: string; department: string; ctaLabel: string; ctaHref: string };
type Job = { id: string; sortOrder: number; published: number; translations: Tr[] };

function emptyTr(locale: string): Tr {
  return { locale, title: "", dateLabel: "", location: "", summary: "", department: "", ctaLabel: "", ctaHref: "" };
}

export function JobsAnnouncementsList() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/job-postings");
      const j = (await res.json()) as { ok?: boolean; jobs?: Job[] };
      if (j.jobs) setJobs(j.jobs);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function persistOrder(next: Job[]) {
    const res = await adminFetch("/api/admin/job-postings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: next.map((j) => j.id) }) });
    const j = (await res.json()) as { ok?: boolean };
    if (res.ok && j.ok) {
      setJobs(next);
      setFeedback({ tone: "success", text: "Order updated." });
    } else setFeedback({ tone: "error", text: "Reorder failed" });
  }
  function moveJob(id: string, dir: -1 | 1) {
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx < 0) return;
    const next = [...jobs];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap]!, next[idx]!];
    void persistOrder(next);
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button type="button" size="sm" onClick={() => router.push(`/admin/jobs/announcement-edit?id=${crypto.randomUUID()}`)} className="gap-1.5"><Plus className="size-4" /> Add role</Button>
      </div>
      {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : jobs.length === 0 ? <AdminEmptyState title="No open roles" description="Create a job announcement to show on the careers page." /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((j, i) => (
            <div key={j.id} className="flex gap-2">
              <div className="flex flex-col gap-1">
                <Button type="button" variant="outline" size="icon-sm" disabled={i === 0} onClick={() => moveJob(j.id, -1)} aria-label="Move up"><ChevronUp className="size-4" /></Button>
                <Button type="button" variant="outline" size="icon-sm" disabled={i === jobs.length - 1} onClick={() => moveJob(j.id, 1)} aria-label="Move down"><ChevronDown className="size-4" /></Button>
              </div>
              <button type="button" onClick={() => router.push(`/admin/jobs/announcement-edit?id=${j.id}`)} className="flex-1 rounded-xl border border-border bg-card p-4 text-start transition-colors hover:border-primary/30">
                <p className="font-medium text-gi-navy">{j.translations.find((t) => t.locale === "en")?.title || "Untitled"}</p>
                <p className="mt-1 text-xs text-muted-foreground">{j.published ? "Published" : "Draft"} · {j.translations.find((t) => t.locale === "en")?.dateLabel}</p>
              </button>
            </div>
          ))}
        </div>
      )}
      {feedback ? <AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner> : null}
    </div>
  );
}

export function JobsAnnouncementEditor({ editId, onPreview }: { editId: string | null; onPreview: (data: JobPostingPreviewData | null, locale: CmsLocaleId) => void }) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  useEffect(() => {
    void (async () => {
      const res = await adminFetch("/api/admin/job-postings");
      const j = (await res.json()) as { ok?: boolean; jobs?: Job[] };
      if (j.jobs) setJobs(j.jobs);
    })();
  }, []);
  useEffect(() => {
    if (!editId) {
      setEditing(null);
      onPreview(null, locale);
      return;
    }
    const found = jobs.find((j) => j.id === editId);
    if (found) setEditing(found);
    else setEditing((prev) => (prev?.id === editId ? prev : { id: editId, sortOrder: jobs.length, published: 1, translations: cmsLocales.map((l) => emptyTr(l.id)) }));
  }, [editId, jobs, locale, onPreview]);
  const tr = editing?.translations.find((t) => t.locale === locale) ?? emptyTr(locale);
  useEffect(() => {
    if (!editing) {
      onPreview(null, locale);
      return;
    }
    onPreview({ title: tr.title, dateLabel: tr.dateLabel, location: tr.location, department: tr.department, summary: tr.summary, ctaLabel: tr.ctaLabel }, locale);
  }, [editing, tr.title, tr.dateLabel, tr.location, tr.department, tr.summary, tr.ctaLabel, locale, onPreview]);
  function setTr(patch: Partial<Tr>) {
    if (!editing) return;
    const translations = cmsLocales.map((l) => {
      const existing = editing.translations.find((t) => t.locale === l.id) ?? emptyTr(l.id);
      return l.id === locale ? { ...existing, ...patch, locale: l.id } : existing;
    });
    setEditing({ ...editing, translations });
  }
  async function saveEditing() {
    if (!editing) return;
    const en = editing.translations.find((t) => t.locale === "en");
    if (!en?.title.trim() || !en?.dateLabel.trim()) {
      setFeedback({ tone: "error", text: "English title and date label are required." });
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const isNew = !jobs.some((j) => j.id === editing.id);
      const url = isNew ? "/api/admin/job-postings" : `/api/admin/job-postings/${editing.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await adminFetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: editing.published === 1, sortOrder: editing.sortOrder, translations: editing.translations }) });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      setFeedback(res.ok && j.ok ? { tone: "success", text: "Role saved." } : { tone: "error", text: j.message ?? "Save failed" });
      if (res.ok && j.ok) router.push("/admin/jobs/announcements");
    } finally {
      setBusy(false);
    }
  }
  async function remove(id: string) {
    if (!confirm("Delete this job announcement?")) return;
    setBusy(true);
    try {
      await adminFetch(`/api/admin/job-postings/${id}`, { method: "DELETE" });
      router.push("/admin/jobs/announcements");
    } finally {
      setBusy(false);
    }
  }
  if (!editing) return <p className="text-sm text-muted-foreground">Choose a role from Open roles or add a new one.</p>;
  return (
    <div className="space-y-6">
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.published === 1} onChange={(e) => setEditing({ ...editing, published: e.target.checked ? 1 : 0 })} /> Published</label>
      <div className="mt-4"><LocaleTabs value={locale} onChange={setLocale} /></div>
      <LocalePanel locale={locale}>
        <div className="mt-4 grid gap-3">
          <div><Label>Job title</Label><Input value={tr.title} onChange={(e) => setTr({ title: e.target.value })} className="mt-1.5" /></div>
          <div><Label>Date / status label</Label><Input value={tr.dateLabel} onChange={(e) => setTr({ dateLabel: e.target.value })} className="mt-1.5" placeholder="e.g. Applications open" /></div>
          <div><Label>Location</Label><Input value={tr.location} onChange={(e) => setTr({ location: e.target.value })} className="mt-1.5" /></div>
          <div><Label>Department</Label><Input value={tr.department} onChange={(e) => setTr({ department: e.target.value })} className="mt-1.5" /></div>
          <div><Label>Description</Label><Textarea value={tr.summary} onChange={(e) => setTr({ summary: e.target.value })} className="mt-1.5 min-h-24" /></div>
          <div className="grid gap-3 sm:grid-cols-2"><div><Label>CTA label</Label><Input value={tr.ctaLabel} onChange={(e) => setTr({ ctaLabel: e.target.value })} className="mt-1.5" /></div><div><Label>CTA link</Label><Input value={tr.ctaHref} onChange={(e) => setTr({ ctaHref: e.target.value })} className="mt-1.5" /></div></div>
        </div>
      </LocalePanel>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={busy} onClick={saveEditing}>{busy ? "Saving…" : "Save"}</Button>
        <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => router.push("/admin/jobs/announcements")}>Cancel</Button>
        {jobs.some((j) => j.id === editing.id) ? <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => remove(editing.id)} className="text-destructive"><Trash2 className="size-4" /></Button> : null}
      </div>
      {feedback ? <AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner> : null}
    </div>
  );
}
