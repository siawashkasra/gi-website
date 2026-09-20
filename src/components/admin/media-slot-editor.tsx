"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useEffect, useRef, useState } from "react";
import { ImageIcon, Sparkles, Upload, X } from "lucide-react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Feedback = { text: string; tone: "success" | "error" };
export type MediaSlotCurrent = { publicPath: string; alt: string };
export type MediaSlotVariant = "hero" | "logo" | "portrait";

function PreviewFrame({ src, alt, variant, label }: { src: string; alt: string; variant: MediaSlotVariant; label: string }) {
  if (variant === "logo") {
    return (
      <div className="mt-2 overflow-hidden rounded-lg border border-border">
        <p className="border-b border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">{label}</p>
        <div className="grid sm:grid-cols-2">
          <div className="admin-logo-checker flex min-h-[7rem] items-center justify-center p-4">
            <img src={src} alt={alt} className="max-h-16 max-w-full object-contain" />
          </div>
          <div className="flex min-h-[7rem] items-center justify-center bg-gi-navy p-4">
            <img src={src} alt={alt} className="max-h-16 max-w-full object-contain brightness-0 invert" />
          </div>
        </div>
        <p className="border-t border-border px-3 py-1.5 text-[0.65rem] text-muted-foreground">Light background · Dark header (inverted)</p>
      </div>
    );
  }
  if (variant === "portrait") {
    return (
      <div className="mt-2 overflow-hidden rounded-lg border border-border">
        <p className="border-b border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex justify-center bg-muted/30 p-4">
          <div className="relative aspect-[3/4] w-36 overflow-hidden rounded-lg border border-border bg-muted/50">
            <img src={src} alt={alt} className="size-full object-cover" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-2 overflow-hidden rounded-lg border border-border">
      <p className="border-b border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex aspect-video max-h-56 items-center justify-center bg-muted/50 p-2">
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
}

export function MediaSlotEditor({ label, placementKey, current = null, fallbackImage = null, variant = "hero", compact = false, description }: { label: string; placementKey: string; current?: MediaSlotCurrent | null; fallbackImage?: MediaSlotCurrent | null; variant?: MediaSlotVariant; compact?: boolean; description?: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pickedName, setPickedName] = useState("");
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<MediaSlotCurrent | null>(current ?? null);
  useEffect(() => {
    setPreview(current ?? null);
  }, [current, placementKey]);
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);
  function onFileChange(file: File | undefined) {
    if (localPreview) URL.revokeObjectURL(localPreview);
    if (!file) {
      setLocalPreview(null);
      setPickedName("");
      return;
    }
    setPickedName(file.name);
    setLocalPreview(URL.createObjectURL(file));
    if (!alt.trim()) setAlt(label);
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFeedback(null);
    const fd = new FormData(form);
    const file = fd.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setFeedback({ tone: "error", text: "Choose an image file first." });
      return;
    }
    if (!alt.trim()) {
      setFeedback({ tone: "error", text: "Alt text is required for accessibility." });
      return;
    }
    setBusy(true);
    try {
      const upFd = new FormData();
      upFd.append("file", file);
      const up = await adminFetch("/api/admin/upload", { method: "POST", body: upFd });
      const upJson = (await up.json()) as { ok?: boolean; message?: string; id?: string; publicPath?: string };
      if (!up.ok || !upJson.ok || !upJson.id) {
        setFeedback({ tone: "error", text: upJson.message ?? "Upload failed." });
        return;
      }
      const pl = await adminFetch("/api/admin/placements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ placementKey, assetId: upJson.id, alt: alt.trim() }) });
      const plJson = (await pl.json()) as { ok?: boolean; message?: string };
      if (!pl.ok || !plJson.ok) {
        setFeedback({ tone: "error", text: plJson.message ?? "Could not assign image to this slot." });
        return;
      }
      if (upJson.publicPath) setPreview({ publicPath: upJson.publicPath, alt: alt.trim() });
      if (localPreview) URL.revokeObjectURL(localPreview);
      setLocalPreview(null);
      setFeedback({ tone: "success", text: "Published — live on the website now." });
      form.reset();
      setAlt("");
      setPickedName("");
    } finally {
      setBusy(false);
    }
  }
  async function onClear() {
    setFeedback(null);
    setBusy(true);
    try {
      const res = await adminFetch(`/api/admin/placements?placementKey=${encodeURIComponent(placementKey)}`, { method: "DELETE" });
      const j = (await res.json()) as { ok?: boolean };
      if (res.ok && j.ok) {
        setPreview(null);
        if (localPreview) URL.revokeObjectURL(localPreview);
        setLocalPreview(null);
      }
      setFeedback(res.ok && j.ok ? { tone: "success", text: "Custom image removed. Default is shown again." } : { tone: "error", text: "Could not remove image." });
    } finally {
      setBusy(false);
    }
  }
  const displaySrc = localPreview ?? preview?.publicPath ?? fallbackImage?.publicPath;
  const displayAlt = preview?.alt ?? fallbackImage?.alt ?? alt;
  const isDraft = Boolean(localPreview);
  const isLive = Boolean(preview?.publicPath && !localPreview);
  return (
    <div className={cn("admin-media-card", compact ? "p-4" : "p-5")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-gi-navy">{label}</p>
          {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {isLive ? <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-800">Live</span> : isDraft ? <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-900">Preview</span> : null}
      </div>
      {displaySrc ? <PreviewFrame src={displaySrc} alt={displayAlt} variant={variant} label={isDraft ? "Before you save" : isLive ? "Live on site" : "Default"} /> : (
        <div className="mt-3 flex min-h-[8rem] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 text-muted-foreground">
          <ImageIcon className="size-8 opacity-40" />
          <p className="mt-2 text-xs">No image yet</p>
        </div>
      )}
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div className="rounded-lg border border-dashed border-border/80 bg-muted/20 p-3">
          <input ref={fileRef} name="file" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="sr-only" onChange={(ev) => onFileChange(ev.target.files?.[0])} />
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="sm" disabled={busy} className="gap-1.5" onClick={() => fileRef.current?.click()}>
              <Upload className="size-3.5" /> {pickedName ? "Change file" : "Choose file"}
            </Button>
            {pickedName ? (
              <Button type="button" variant="ghost" size="icon-sm" disabled={busy} onClick={() => { fileRef.current && (fileRef.current.value = ""); onFileChange(undefined); }} aria-label="Clear file">
                <X className="size-4" />
              </Button>
            ) : null}
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{pickedName || "PNG, JPG, WebP, SVG · max 8 MB"}</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium">Alt text</label>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Describe the image" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="sm" disabled={busy} className="gap-1.5 bg-gi-navy hover:bg-gi-navy/90">
            <Sparkles className="size-3.5" /> {busy ? "Publishing…" : "Publish image"}
          </Button>
          {preview ? (
            <Button type="button" variant="outline" size="sm" disabled={busy} onClick={onClear}>
              Reset to default
            </Button>
          ) : null}
        </div>
      </form>
      {feedback ? <div className="mt-3"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
    </div>
  );
}
