"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { LocalePanel, LocaleTabs, cmsLocales, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { eventsEditorSections } from "@/lib/admin/editor-sections";

type Tr = { locale: string; title: string; dateLabel: string; location: string; summary: string; ctaLabel: string; ctaHref: string };
type Ev = { id: string; sortOrder: number; published: number; imageAssetId: string | null; translations: Tr[] };
type Asset = { id: string; publicPath: string };

function emptyTr(locale: string): Tr {
  return { locale, title: "", dateLabel: "", location: "", summary: "", ctaLabel: "", ctaHref: "" };
}

export function EventsEditorShell() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = typeof params.section === "string" ? params.section : "list";
  const editId = searchParams.get("id");
  const [events, setEvents] = useState<Ev[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editing, setEditing] = useState<Ev | null>(null);
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [evRes, assetRes] = await Promise.all([fetch("/api/admin/events"), fetch("/api/admin/assets")]);
      const evJ = (await evRes.json()) as { ok?: boolean; events?: Ev[] };
      const assetJ = (await assetRes.json()) as { ok?: boolean; assets?: Asset[] };
      if (evJ.events) setEvents(evJ.events);
      if (assetJ.assets) setAssets(assetJ.assets.map((a) => ({ id: a.id, publicPath: a.publicPath })));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  useEffect(() => {
    if (section !== "edit") return;
    if (!editId) {
      setEditing(null);
      return;
    }
    const found = events.find((e) => e.id === editId);
    if (found) {
      setEditing(found);
      return;
    }
    setEditing((prev) => (prev?.id === editId ? prev : { id: editId, sortOrder: events.length, published: 1, imageAssetId: null, translations: cmsLocales.map((l) => emptyTr(l.id)) }));
  }, [section, editId, events]);
  const tr = editing?.translations.find((t) => t.locale === locale) ?? emptyTr(locale);
  function setTr(patch: Partial<Tr>) {
    if (!editing) return;
    const translations = cmsLocales.map((l) => {
      const existing = editing.translations.find((t) => t.locale === l.id) ?? emptyTr(l.id);
      return l.id === locale ? { ...existing, ...patch, locale: l.id } : existing;
    });
    setEditing({ ...editing, translations });
  }
  async function persistOrder(next: Ev[]) {
    const res = await adminFetch("/api/admin/events", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: next.map((e) => e.id) }) });
    const j = (await res.json()) as { ok?: boolean };
    if (res.ok && j.ok) {
      setEvents(next);
      setFeedback({ tone: "success", text: "Event order updated." });
    } else setFeedback({ tone: "error", text: "Reorder failed" });
  }
  function moveEvent(id: string, dir: -1 | 1) {
    const idx = events.findIndex((e) => e.id === id);
    if (idx < 0) return;
    const next = [...events];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap]!, next[idx]!];
    void persistOrder(next);
  }
  async function saveEditing() {
    if (!editing) return;
    const en = editing.translations.find((t) => t.locale === "en");
    if (!en?.title.trim() || !en?.dateLabel.trim()) {
      setFeedback({ tone: "error", text: "English title and date are required." });
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const isNew = !events.some((e) => e.id === editing.id);
      const url = isNew ? "/api/admin/events" : `/api/admin/events/${editing.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await adminFetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: editing.published === 1, sortOrder: editing.sortOrder, imageAssetId: editing.imageAssetId, translations: editing.translations }) });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      setFeedback(res.ok && j.ok ? { tone: "success", text: "Event saved." } : { tone: "error", text: j.message ?? "Save failed" });
      if (res.ok && j.ok) {
        await load();
        router.push("/admin/events/list");
      }
    } finally {
      setBusy(false);
    }
  }
  async function remove(id: string) {
    if (!confirm("Delete this event?")) return;
    setBusy(true);
    setFeedback(null);
    try {
      const res = await adminFetch(`/api/admin/events/${id}`, { method: "DELETE" });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      setFeedback(res.ok && j.ok ? { tone: "success", text: "Event deleted." } : { tone: "error", text: j.message ?? "Delete failed" });
      if (res.ok && j.ok) {
        router.push("/admin/events/list");
        await load();
      }
    } finally {
      setBusy(false);
    }
  }
  function startNew() {
    router.push(`/admin/events/edit?id=${crypto.randomUUID()}`);
  }
  function openEdit(e: Ev) {
    router.push(`/admin/events/edit?id=${e.id}`);
  }
  const imageUrl = editing?.imageAssetId ? assets.find((a) => a.id === editing.imageAssetId)?.publicPath ?? null : null;
  const eventPreview = editing ? { title: tr.title, dateLabel: tr.dateLabel, location: tr.location, summary: tr.summary, ctaLabel: tr.ctaLabel, ctaHref: tr.ctaHref, imageUrl } : null;
  const preview = <CmsSectionPreview domain="events" section={section} locale={locale} event={eventPreview} sections={eventsEditorSections} />;
  const listBody = loading ? <p className="text-sm text-muted-foreground">Loading events…</p> : (
    <>
      <div className="mb-4 flex justify-end">
        <Button type="button" size="sm" onClick={startNew} className="gap-1.5"><Plus className="size-4" /> Add event</Button>
      </div>
      {events.length === 0 ? <AdminEmptyState title="No events yet" description="Create an event to show on the public events page." /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {events.map((e, i) => (
            <div key={e.id} className="flex gap-2">
              <div className="flex flex-col gap-1">
                <Button type="button" variant="outline" size="icon-sm" disabled={i === 0} onClick={() => moveEvent(e.id, -1)} aria-label="Move up"><ChevronUp className="size-4" /></Button>
                <Button type="button" variant="outline" size="icon-sm" disabled={i === events.length - 1} onClick={() => moveEvent(e.id, 1)} aria-label="Move down"><ChevronDown className="size-4" /></Button>
              </div>
              <button type="button" onClick={() => openEdit(e)} className="flex-1 rounded-xl border border-border bg-card p-4 text-start transition-colors hover:border-primary/30">
                <p className="font-medium text-gi-navy">{e.translations.find((t) => t.locale === "en")?.title || "Untitled"}</p>
                <p className="mt-1 text-xs text-muted-foreground">{e.published ? "Published" : "Draft"} · {e.translations.find((t) => t.locale === "en")?.dateLabel}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
  const editBody = section === "edit" && !editing ? (
    <p className="text-sm text-muted-foreground">Choose an event from the list or add a new one.</p>
  ) : section === "edit" && editing ? (
    <>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.published === 1} onChange={(e) => setEditing({ ...editing, published: e.target.checked ? 1 : 0 })} /> Published</label>
      <div className="mt-4">
        <Label>Cover image (optional)</Label>
        <select value={editing.imageAssetId ?? ""} onChange={(e) => setEditing({ ...editing, imageAssetId: e.target.value || null })} className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">None</option>
          {assets.map((a) => (
            <option key={a.id} value={a.id}>{a.publicPath}</option>
          ))}
        </select>
      </div>
      <div className="mt-4"><LocaleTabs value={locale} onChange={setLocale} /></div>
      <LocalePanel locale={locale}>
        <div className="mt-4 grid gap-3">
          <div><Label>Title</Label><Input value={tr.title} onChange={(e) => setTr({ title: e.target.value })} className="mt-1.5" /></div>
          <div><Label>Date label</Label><Input value={tr.dateLabel} onChange={(e) => setTr({ dateLabel: e.target.value })} className="mt-1.5" /></div>
          <div><Label>Location</Label><Input value={tr.location} onChange={(e) => setTr({ location: e.target.value })} className="mt-1.5" /></div>
          <div><Label>Summary</Label><Textarea value={tr.summary} onChange={(e) => setTr({ summary: e.target.value })} className="mt-1.5 min-h-24" /></div>
          <div className="grid gap-3 sm:grid-cols-2"><div><Label>CTA label</Label><Input value={tr.ctaLabel} onChange={(e) => setTr({ ctaLabel: e.target.value })} className="mt-1.5" /></div><div><Label>CTA link</Label><Input value={tr.ctaHref} onChange={(e) => setTr({ ctaHref: e.target.value })} className="mt-1.5" /></div></div>
        </div>
      </LocalePanel>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={busy} onClick={saveEditing}>{busy ? "Saving…" : "Save"}</Button>
        <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => router.push("/admin/events/list")}>Cancel</Button>
        {events.some((e) => e.id === editing.id) ? <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => remove(editing.id)} className="text-destructive"><Trash2 className="size-4" /></Button> : null}
      </div>
    </>
  ) : null;
  return (
    <AdminEditorLayout pageTitle="Events" pageDescription="Manage upcoming events. Review copy per language before saving." sections={eventsEditorSections} activeSlug={section} preview={preview} toolbar={<>{section === "list" ? listBody : editBody}{feedback ? <div className="mt-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}</>} />
  );
}
