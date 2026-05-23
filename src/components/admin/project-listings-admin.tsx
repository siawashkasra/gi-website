"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pencil, Plus, Upload } from "lucide-react";
import { LocalePanel, LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { propertyListingAvailabilityLabels, propertyListingTypeLabels } from "@/lib/property-listings";

type ProjectOption = { slug: string; name: string };

type Row = {
  id: string;
  projectSlug: string;
  priceUsd: number;
  sizeSqm: string;
  type: string;
  availability: string;
  imagePath: string;
  label: string | null;
  labelsByLocale?: Partial<Record<CmsLocaleId, string>>;
  sortOrder: number;
  featured: number;
  createdAt: number;
};

const types = ["apartment", "shop"] as const;
const availabilities = ["available", "reserved", "sold"] as const;
function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function labelForLocale(labels: Partial<Record<CmsLocaleId, string>>, locale: CmsLocaleId): { text: string; usesEnglishFallback: boolean } {
  const direct = labels[locale]?.trim();
  if (direct) return { text: direct, usesEnglishFallback: false };
  const en = labels.en?.trim();
  if (locale !== "en" && en) return { text: en, usesEnglishFallback: true };
  return { text: "", usesEnglishFallback: false };
}

function listingLocaleCompleteness(labels: Partial<Record<CmsLocaleId, string>>): Partial<Record<CmsLocaleId, boolean>> {
  const hasEn = Boolean(labels.en?.trim());
  return { en: hasEn, "fa-AF": Boolean(labels["fa-AF"]?.trim()), ps: Boolean(labels.ps?.trim()) };
}

export function ProjectListingsAdmin({ projectOptions, fixedProjectSlug }: { projectOptions: ProjectOption[]; fixedProjectSlug?: string }) {
  const [slug, setSlug] = useState(fixedProjectSlug ?? projectOptions[0]?.slug ?? "");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; err: boolean } | null>(null);
  const [addSuccessOpen, setAddSuccessOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addLocale, setAddLocale] = useState<CmsLocaleId>("en");
  const addFileRef = useRef<HTMLInputElement>(null);
  const [pickedName, setPickedName] = useState("");
  const [form, setForm] = useState({ priceUsd: "", sizeSqm: "", type: "apartment" as (typeof types)[number], availability: "available" as (typeof availabilities)[number], labelsByLocale: {} as Partial<Record<CmsLocaleId, string>>, featured: false, sortOrder: "" });
  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/project-listings?projectSlug=${encodeURIComponent(slug)}`);
      const j = (await res.json()) as { ok?: boolean; listings?: Row[] };
      if (res.ok && j.ok && j.listings) setRows(j.listings);
      else setRows([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!addModalOpen) return;
    setMsg(null);
    setAddLocale("en");
    setForm({ priceUsd: "", sizeSqm: "", type: "apartment", availability: "available", labelsByLocale: {}, featured: false, sortOrder: "" });
    setPickedName("");
    if (addFileRef.current) addFileRef.current.value = "";
  }, [addModalOpen]);
  async function uploadFile(f: File) {
    const fd = new FormData();
    fd.append("file", f);
    const up = await adminFetch("/api/admin/upload", { method: "POST", body: fd });
    const j = (await up.json()) as { ok?: boolean; id?: string; message?: string };
    if (!up.ok || !j.ok || !j.id) throw new Error(j.message ?? "Upload failed");
    return j.id;
  }
  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const priceUsd = Number.parseInt(form.priceUsd.replace(/,/g, ""), 10);
    const sizeSqm = Number.parseFloat(form.sizeSqm);
    if (!Number.isFinite(priceUsd) || priceUsd < 0) {
      setMsg({ text: "Enter a valid price in USD (whole dollars).", err: true });
      return;
    }
    if (!Number.isFinite(sizeSqm) || sizeSqm <= 0) {
      setMsg({ text: "Enter a valid size in square metres.", err: true });
      return;
    }
    const file = addFileRef.current?.files?.[0];
    if (!file) {
      setMsg({ text: "Choose an image file for this unit.", err: true });
      return;
    }
    let assetId: string;
    try {
      assetId = await uploadFile(file);
    } catch (err) {
      setMsg({ text: err instanceof Error ? err.message : "Upload failed", err: true });
      return;
    }
    const sortOrder = form.sortOrder.trim() === "" ? undefined : Number.parseInt(form.sortOrder, 10);
    const res = await adminFetch("/api/admin/project-listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectSlug: slug,
        priceUsd,
        sizeSqm,
        type: form.type,
        availability: form.availability,
        labelsByLocale: form.labelsByLocale,
        featured: form.featured,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : undefined,
        assetId,
      }),
    });
    const j = (await res.json()) as { ok?: boolean; message?: string };
    if (!res.ok || !j.ok) {
      setMsg({ text: j.message ?? "Could not create unit.", err: true });
      return;
    }
    setAddModalOpen(false);
    setAddSuccessOpen(true);
    await load();
  }
  return (
    <div className="space-y-10">
      <Dialog open={addSuccessOpen} onOpenChange={setAddSuccessOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Unit added</DialogTitle>
            <DialogDescription>The unit has been added successfully.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button className="w-full sm:w-auto" />}>OK</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add unit</DialogTitle>
            <DialogDescription>Upload a photo and enter details for this project. Featured highlights one unit on the public page.</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4" onSubmit={onCreate}>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Image</Label>
              <div className="mt-2 flex min-h-10 flex-wrap items-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/30 px-3 py-2.5">
                <input ref={addFileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={() => setPickedName(addFileRef.current?.files?.[0]?.name ?? "")} />
                <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => addFileRef.current?.click()}>
                  <Upload className="size-3.5 opacity-80" aria-hidden />
                  Choose image
                </Button>
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{pickedName || "Required"}</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Price (USD)</Label>
                <Input className="mt-1" inputMode="numeric" value={form.priceUsd} onChange={(e) => setForm((s) => ({ ...s, priceUsd: e.target.value }))} placeholder="e.g. 198000" />
              </div>
              <div>
                <Label>Size (m²)</Label>
                <Input className="mt-1" inputMode="decimal" value={form.sizeSqm} onChange={(e) => setForm((s) => ({ ...s, sizeSqm: e.target.value }))} placeholder="e.g. 112" />
              </div>
              <div>
                <Label>Sort order</Label>
                <Input className="mt-1" inputMode="numeric" value={form.sortOrder} onChange={(e) => setForm((s) => ({ ...s, sortOrder: e.target.value }))} placeholder="Auto if empty" />
              </div>
              <div>
                <Label>Type</Label>
                <select className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value as (typeof types)[number] }))}>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Availability</Label>
                <select className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.availability} onChange={(e) => setForm((s) => ({ ...s, availability: e.target.value as (typeof availabilities)[number] }))}>
                  {availabilities.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Label (optional)</Label>
                <LocaleTabs value={addLocale} onChange={setAddLocale} completeness={listingLocaleCompleteness(form.labelsByLocale)} />
                <LocalePanel locale={addLocale}>
                  <Input className="mt-1" value={form.labelsByLocale[addLocale] ?? ""} onChange={(e) => setForm((s) => ({ ...s, labelsByLocale: { ...s.labelsByLocale, [addLocale]: e.target.value } }))} placeholder={addLocale === "en" ? "Tower A · 12 East" : "Translated label for this language"} />
                </LocalePanel>
                <p className="text-xs text-muted-foreground">Price, size, type, and availability are shared across languages. The label can differ per language.</p>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <input id="feat-new-modal" type="checkbox" checked={form.featured} onChange={(e) => setForm((s) => ({ ...s, featured: e.target.checked }))} className="size-4 rounded border-input" />
                <Label htmlFor="feat-new-modal" className="font-normal">
                  Featured unit
                </Label>
              </div>
            </div>
            {msg?.err && addModalOpen ? <p className="text-sm text-destructive">{msg.text}</p> : null}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save listing</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex flex-wrap items-end justify-between gap-4">
        {!fixedProjectSlug ? (
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <Label className="text-sm font-medium">Project</Label>
              <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block min-w-[14rem] rounded-md border border-input bg-background px-3 py-2 text-sm">
                {projectOptions.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            {loading ? <span className="text-xs text-muted-foreground">Loading…</span> : null}
          </div>
        ) : loading ? <span className="text-xs text-muted-foreground">Loading…</span> : null}
        <Button type="button" className="gap-1.5" onClick={() => setAddModalOpen(true)}>
          <Plus className="size-4" aria-hidden />
          Add unit
        </Button>
      </div>
      <div>
        <h2 className="font-heading text-lg font-semibold text-gi-navy">Current listings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Each unit has English, Dari, and Pashto tabs for its label. Price, size, type, and availability are shared across languages.</p>
        <ul className="mt-6 space-y-6">
          {rows.map((r) => (
            <ListingRow key={r.id} row={r} onSaved={load} onMsg={setMsg} />
          ))}
        </ul>
        {rows.length === 0 && !loading ? <p className="mt-6 text-sm text-muted-foreground">No current listings for this project — visitors see file-based listings if the project still defines them in site content.</p> : null}
      </div>
      {msg?.err && !addModalOpen ? <p className="text-sm text-destructive">{msg.text}</p> : null}
    </div>
  );
}

function ListingRow({ row, onSaved, onMsg }: { row: Row; onSaved: () => Promise<void>; onMsg: (m: { text: string; err: boolean } | null) => void }) {
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [editing, setEditing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [priceUsd, setPriceUsd] = useState(String(row.priceUsd));
  const [sizeSqm, setSizeSqm] = useState(row.sizeSqm);
  const [type, setType] = useState(row.type);
  const [availability, setAvailability] = useState(row.availability);
  const [labelsByLocale, setLabelsByLocale] = useState<Partial<Record<CmsLocaleId, string>>>(() => ({ ...(row.labelsByLocale ?? {}), ...(row.label ? { en: row.label } : {}) }));
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [featured, setFeatured] = useState(row.featured === 1);
  const [previewPath, setPreviewPath] = useState(row.imagePath);
  const [busy, setBusy] = useState(false);
  const activeLabel = labelsByLocale[locale] ?? "";
  function resetFromRow() {
    setPriceUsd(String(row.priceUsd));
    setSizeSqm(row.sizeSqm);
    setType(row.type);
    setAvailability(row.availability);
    setLabelsByLocale({ ...(row.labelsByLocale ?? {}), ...(row.label ? { en: row.label } : {}) });
    setSortOrder(String(row.sortOrder));
    setFeatured(row.featured === 1);
    setPreviewPath(row.imagePath);
    if (fileRef.current) fileRef.current.value = "";
  }
  useEffect(() => {
    setPriceUsd(String(row.priceUsd));
    setSizeSqm(row.sizeSqm);
    setType(row.type);
    setAvailability(row.availability);
    setLabelsByLocale({ ...(row.labelsByLocale ?? {}), ...(row.label ? { en: row.label } : {}) });
    setSortOrder(String(row.sortOrder));
    setFeatured(row.featured === 1);
    setPreviewPath(row.imagePath);
    if (fileRef.current) fileRef.current.value = "";
  }, [row]);
  function cancelEdit() {
    resetFromRow();
    setEditing(false);
    onMsg(null);
  }
  function setActiveLabel(value: string) {
    setLabelsByLocale((prev) => {
      const next = { ...prev };
      if (value.trim()) next[locale] = value;
      else delete next[locale];
      return next;
    });
  }
  async function save(assetId?: string) {
    onMsg(null);
    const pu = Number.parseInt(priceUsd.replace(/,/g, ""), 10);
    const sz = Number.parseFloat(sizeSqm);
    if (!Number.isFinite(pu) || pu < 0) {
      onMsg({ text: "Invalid price.", err: true });
      return;
    }
    if (!Number.isFinite(sz) || sz <= 0) {
      onMsg({ text: "Invalid size.", err: true });
      return;
    }
    const so = Number.parseInt(sortOrder, 10);
    const labelPayload = activeLabel.trim() || null;
    setBusy(true);
    try {
      const res = await adminFetch(`/api/admin/project-listings/${encodeURIComponent(row.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceUsd: pu,
          sizeSqm: sz,
          type,
          availability,
          label: labelPayload,
          locale,
          sortOrder: Number.isFinite(so) ? so : row.sortOrder,
          featured,
          ...(assetId ? { assetId } : {}),
        }),
      });
      const j = (await res.json()) as { ok?: boolean; message?: string; labelsByLocale?: Partial<Record<CmsLocaleId, string>> };
      if (!res.ok || !j.ok) {
        onMsg({ text: j.message ?? "Save failed", err: true });
        return;
      }
      if (j.labelsByLocale) setLabelsByLocale(j.labelsByLocale);
      else setLabelsByLocale((prev) => {
        const next = { ...prev };
        if (labelPayload) next[locale] = labelPayload;
        else delete next[locale];
        return next;
      });
      onMsg(null);
      setEditing(false);
      await onSaved();
    } finally {
      setBusy(false);
    }
  }
  async function confirmDelete() {
    onMsg(null);
    setBusy(true);
    try {
      const res = await adminFetch(`/api/admin/project-listings/${encodeURIComponent(row.id)}`, { method: "DELETE" });
      const j = (await res.json()) as { ok?: boolean };
      if (!res.ok || !j.ok) {
        onMsg({ text: "Delete failed", err: true });
        return;
      }
      setDeleteOpen(false);
      onMsg(null);
      await onSaved();
    } finally {
      setBusy(false);
    }
  }
  async function uploadAndSave() {
    const f = fileRef.current?.files?.[0];
    if (!f) return;
    setBusy(true);
    onMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const up = await adminFetch("/api/admin/upload", { method: "POST", body: fd });
      const j = (await up.json()) as { ok?: boolean; id?: string; message?: string };
      if (!up.ok || !j.ok || !j.id) {
        onMsg({ text: j.message ?? "Upload failed", err: true });
        return;
      }
      await save(j.id);
      const pathRes = await adminFetch(`/api/admin/project-listings?projectSlug=${encodeURIComponent(row.projectSlug)}`);
      const pathJ = (await pathRes.json()) as { listings?: Row[] };
      const updated = pathJ.listings?.find((x) => x.id === row.id);
      if (updated) setPreviewPath(updated.imagePath);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }
  const typeLabel = propertyListingTypeLabels[row.type as keyof typeof propertyListingTypeLabels] ?? row.type;
  const availLabel = propertyListingAvailabilityLabels[row.availability as keyof typeof propertyListingAvailabilityLabels] ?? row.availability;
  const viewLabel = labelForLocale(labelsByLocale, locale);
  return (
    <li className="rounded-lg border border-border bg-card p-4">
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this listing?</DialogTitle>
            <DialogDescription>
              This removes the unit from the live site for this project. You can add a new unit later. This action cannot be undone from here if you need the exact same record back.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={busy} onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" disabled={busy} onClick={() => void confirmDelete()}>
              Delete listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <LocaleTabs value={locale} onChange={setLocale} completeness={listingLocaleCompleteness(labelsByLocale)} />
        {!editing ? (
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" className="gap-1" disabled={busy} onClick={() => { onMsg(null); setEditing(true); }}>
              <Pencil className="size-3.5" aria-hidden />
              Edit
            </Button>
            <Button type="button" variant="destructive" size="sm" disabled={busy} onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="shrink-0 lg:w-56">
          <div className="flex h-36 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/50">
            {previewPath ? <img src={previewPath} alt="" className="max-h-full max-w-full object-contain" /> : null}
          </div>
          {editing ? (
            <div className="mt-2 flex flex-wrap gap-2">
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="max-w-full text-xs" />
              <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => void uploadAndSave()}>
                Replace image
              </Button>
            </div>
          ) : null}
          <p className="mt-2 font-mono text-[10px] text-muted-foreground break-all">{row.id}</p>
        </div>
        <div className="min-w-0 flex-1">
          {!editing ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Price · </span>
                <span className="font-semibold tabular-nums text-gi-navy">{formatUsd(row.priceUsd)}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Size · </span>
                <span className="font-medium">{row.sizeSqm} m²</span>
              </p>
              <p>
                <span className="text-muted-foreground">Type · </span>
                {typeLabel}
              </p>
              <p>
                <span className="text-muted-foreground">Availability · </span>
                {availLabel}
              </p>
              <p>
                <span className="text-muted-foreground">Sort order · </span>
                {row.sortOrder}
              </p>
              <p>
                <span className="text-muted-foreground">Featured · </span>
                {row.featured === 1 ? "Yes" : "No"}
              </p>
              <LocalePanel locale={locale}>
                <p>
                  <span className="text-muted-foreground">Label · </span>
                  {viewLabel.text ? (
                    <>
                      {viewLabel.text}
                      {viewLabel.usesEnglishFallback ? <span className="ms-2 text-xs text-muted-foreground">(English fallback)</span> : null}
                    </>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </p>
              </LocalePanel>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Price USD</Label>
                <Input className="mt-1 h-9" value={priceUsd} onChange={(e) => setPriceUsd(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Size m²</Label>
                <Input className="mt-1 h-9" value={sizeSqm} onChange={(e) => setSizeSqm(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Type</Label>
                <select className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs">Availability</Label>
                <select className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {availabilities.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs">Label ({locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto"})</Label>
                <LocalePanel locale={locale}>
                  <Input className="mt-1 h-9" value={activeLabel} onChange={(e) => setActiveLabel(e.target.value)} placeholder={locale === "en" ? "Tower A · 12 East" : "Translation for this unit"} />
                </LocalePanel>
              </div>
              <div>
                <Label className="text-xs">Sort order</Label>
                <Input className="mt-1 h-9" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input id={`feat-${row.id}`} type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="size-4 rounded border-input" />
                <Label htmlFor={`feat-${row.id}`} className="text-xs font-normal">
                  Featured
                </Label>
              </div>
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <Button type="button" size="sm" disabled={busy} onClick={() => void save()}>
                  Save changes
                </Button>
                <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => cancelEdit()}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
