"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Feedback = { text: string; tone: "success" | "error" };

export type MediaSlotCurrent = { publicPath: string; alt: string };

export function MediaSlotEditor({ label, placementKey, current = null, fallbackImage = null }: { label: string; placementKey: string; current?: MediaSlotCurrent | null; fallbackImage?: MediaSlotCurrent | null }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pickedName, setPickedName] = useState("");
  const [alt, setAlt] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<MediaSlotCurrent | null>(current ?? null);
  useEffect(() => { setPreview(current ?? null); }, [current, placementKey]);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFeedback(null);
    const fd = new FormData(form);
    const file = fd.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setFeedback({ tone: "error", text: "Select an image first — use “Choose image” above, then pick a JPEG, PNG, or WebP file." });
      return;
    }
    if (!alt.trim()) {
      setFeedback({ tone: "error", text: "Add a short description in the Alt text field. It tells people using screen readers what the image shows, and it is required before you can publish." });
      return;
    }
    setBusy(true);
    try {
      const upFd = new FormData();
      upFd.append("file", file);
      const up = await fetch("/api/admin/upload", { method: "POST", body: upFd });
      const upJson = (await up.json()) as { ok?: boolean; message?: string; id?: string; publicPath?: string };
      if (!up.ok || !upJson.ok || !upJson.id) {
        setFeedback({ tone: "error", text: upJson.message ?? "The upload did not finish. Check your connection and file size (max 8 MB), then try again." });
        return;
      }
      const pl = await fetch("/api/admin/placements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ placementKey, assetId: upJson.id, alt: alt.trim() }) });
      const plJson = (await pl.json()) as { ok?: boolean; message?: string };
      if (!pl.ok || !plJson.ok) {
        setFeedback({ tone: "error", text: plJson.message ?? "The image uploaded, but we could not attach it to this slot. Try again, or refresh the page." });
        return;
      }
      if (upJson.publicPath) setPreview({ publicPath: upJson.publicPath, alt: alt.trim() });
      setFeedback({ tone: "success", text: "Done — this image is now live for this section. If you still see the old picture, wait a few seconds or refresh the page." });
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
      const res = await fetch(`/api/admin/placements?placementKey=${encodeURIComponent(placementKey)}`, { method: "DELETE" });
      const j = (await res.json()) as { ok?: boolean };
      if (res.ok && j.ok) setPreview(null);
      setFeedback(
        res.ok && j.ok
          ? { tone: "success", text: "Custom image removed. This area will show the original website image again (the one from the site files). Changes may take a moment to appear." }
          : { tone: "error", text: "We could not remove the custom image. Try again, or refresh the page and use “Remove custom image” once more." },
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="font-semibold text-gi-navy">{label}</h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{placementKey}</p>
      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">Preview</p>
        {preview?.publicPath ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-border bg-muted/40">
            <p className="border-b border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">Custom image (active for this slot)</p>
            <div className="flex h-48 items-center justify-center bg-muted/60 p-2">
              <img src={preview.publicPath} alt={preview.alt || ""} className="mx-auto block max-h-full w-auto max-w-full object-contain" />
            </div>
            {preview.alt ? <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">{preview.alt}</p> : null}
          </div>
        ) : fallbackImage?.publicPath ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-border bg-muted/40">
            <p className="border-b border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">Default from site — shown until you upload a custom image</p>
            <div className="flex h-48 items-center justify-center bg-muted/60 p-2">
              <img src={fallbackImage.publicPath} alt={fallbackImage.alt || ""} className="mx-auto block max-h-full w-auto max-w-full object-contain" referrerPolicy="no-referrer" />
            </div>
            {fallbackImage.alt ? <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">{fallbackImage.alt}</p> : null}
          </div>
        ) : (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">No image to show for this slot yet.</p>
        )}
      </div>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div>
          <span className="text-sm font-medium text-foreground">Image</span>
          <p className="mt-0.5 text-xs text-muted-foreground">JPEG, PNG, or WebP · max 8 MB</p>
          <div className="mt-2 flex min-h-10 flex-wrap items-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/30 px-3 py-2.5">
            <input ref={fileRef} name="file" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(ev) => setPickedName(ev.target.files?.[0]?.name ?? "")} />
            <Button type="button" variant="outline" size="sm" disabled={busy} className="shrink-0 gap-1.5" onClick={() => fileRef.current?.click()}>
              <Upload className="size-3.5 opacity-80" aria-hidden />
              Choose image
            </Button>
            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{pickedName || "No file selected"}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Alt text</label>
          <p className="mt-0.5 text-xs text-muted-foreground">Required: a concise description for accessibility (e.g. who or what is in the photo).</p>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Gulbahar Plaza exterior at dusk" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="sm" disabled={busy}>
            Upload and assign
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={busy} onClick={onClear}>
            Remove custom image
          </Button>
        </div>
      </form>
      {feedback ? (
        <p
          role="status"
          className={cn("mt-3 text-sm leading-relaxed", feedback.tone === "success" ? "text-emerald-800 dark:text-emerald-400/90" : "text-destructive")}
        >
          {feedback.text}
        </p>
      ) : null}
    </div>
  );
}
