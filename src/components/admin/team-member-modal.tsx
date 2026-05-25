"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { LocalePanel, LocaleTabs, cmsLocales, type CmsLocaleId } from "@/components/admin/locale-tabs";
import type { Member } from "@/components/admin/team-content-admin";
import type { MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resolveMemberPhoto, resolveTeamMemberId } from "@/lib/team/member-utils";
import { deleteTeamMemberAllLocales, emptyTeamForm, fetchTeamMemberForm, saveTeamMember, teamFormCompleteness, uploadTeamPortrait, type TeamMemberForm } from "@/lib/admin/team-admin-api";

function PortraitPreview({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  if (!src || failed) {
    return <div className="flex size-full items-center justify-center bg-muted font-heading text-lg font-semibold text-muted-foreground">{name.trim().slice(0, 1) || "?"}</div>;
  }
  return <img src={src} alt="" className="size-full object-cover" onError={() => setFailed(true)} />;
}

export function TeamMemberModal({ mode, open, onOpenChange, memberId, existingMembers, placements, onSaved }: { mode: "add" | "edit"; open: boolean; onOpenChange: (open: boolean) => void; memberId?: string; existingMembers: Member[]; placements: Record<string, MediaSlotCurrent | null>; onSaved: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [form, setForm] = useState<TeamMemberForm>(emptyTeamForm());
  const [pickedName, setPickedName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return;
    setLocale("en");
    setPickedName("");
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
    if (mode === "add") {
      setForm(emptyTeamForm());
      setCurrentPhotoUrl(null);
      return;
    }
    if (!memberId) return;
    setLoadingForm(true);
    void fetchTeamMemberForm(memberId).then((loaded) => {
      setForm(loaded);
      const index = existingMembers.findIndex((m, i) => resolveTeamMemberId(m, i) === memberId);
      const member = index >= 0 ? existingMembers[index] : undefined;
      setCurrentPhotoUrl(member ? resolveMemberPhoto(member, index, placements) || null : null);
    }).finally(() => setLoadingForm(false));
  }, [open, mode, memberId, existingMembers, placements]);
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  function updateLocaleField(loc: CmsLocaleId, patch: Partial<TeamMemberForm[CmsLocaleId]>) {
    setForm((cur) => ({ ...cur, [loc]: { ...cur[loc], ...patch } }));
  }
  function onFileChange(file: File | undefined) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (!file) {
      setPreviewUrl(null);
      setPickedName("");
      return;
    }
    setPickedName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  }
  const displayPhoto = previewUrl ?? currentPhotoUrl;
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.en.name.trim() || !form.en.title.trim()) {
      setError("English name and title are required.");
      setLocale("en");
      return;
    }
    const file = fileRef.current?.files?.[0];
    if (mode === "add" && !file) {
      setError("Choose a portrait photo for this team member.");
      return;
    }
    setBusy(true);
    try {
      let assetId: string | undefined;
      let publicPath: string | undefined;
      if (file) {
        try {
          const uploaded = await uploadTeamPortrait(file);
          assetId = uploaded.assetId;
          publicPath = uploaded.publicPath;
        } catch (err) {
          setError(err instanceof Error ? err.message : "Photo upload failed");
          return;
        }
      }
      if (mode === "add" && !publicPath) {
        setError("Choose a portrait photo for this team member.");
        return;
      }
      await saveTeamMember(mode, form, { memberId, assetId, publicPath, alt: form.en.name.trim() });
      onOpenChange(false);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : mode === "add" ? "Could not add team member" : "Could not save team member");
    } finally {
      setBusy(false);
    }
  }
  async function onDelete() {
    if (mode !== "edit" || !memberId) return;
    const label = form.en.name.trim() || "this team member";
    if (!confirm(`Delete ${label} from all languages? This cannot be undone.`)) return;
    setBusy(true);
    setError(null);
    try {
      await deleteTeamMemberAllLocales(memberId);
      onOpenChange(false);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete team member");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,760px)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add team member" : "Edit team member"}</DialogTitle>
          <DialogDescription>{mode === "add" ? "Enter details in each language and upload a portrait." : "Update copy, replace the portrait, or delete this member."} English name and title are required; empty Dari or Pashto fields use English.</DialogDescription>
        </DialogHeader>
        {loadingForm ? <p className="text-sm text-muted-foreground">Loading member…</p> : (
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Portrait photo</Label>
              <div className="mt-2 flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/30 px-3 py-2.5">
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(ev) => onFileChange(ev.target.files?.[0])} />
                <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => fileRef.current?.click()}>
                  <Upload className="size-3.5 opacity-80" aria-hidden />
                  {displayPhoto ? "Change photo" : "Choose photo"}
                </Button>
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{pickedName || (mode === "add" ? "Required · PNG, JPG, or WebP" : "Optional · PNG, JPG, or WebP")}</span>
              </div>
              {displayPhoto ? (
                <div className="mt-3 flex justify-center">
                  <div className="relative aspect-[3/4] w-32 overflow-hidden rounded-lg border border-border bg-muted">
                    <PortraitPreview src={displayPhoto} name={form.en.name} />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>Member details</Label>
              <LocaleTabs value={locale} onChange={setLocale} completeness={teamFormCompleteness(form)} />
              <LocalePanel locale={locale}>
                <div className="mt-3 space-y-3">
                  <Input value={form[locale].name} onChange={(e) => updateLocaleField(locale, { name: e.target.value })} placeholder={locale === "en" ? "Full name" : "Name in this language"} />
                  <Input value={form[locale].title} onChange={(e) => updateLocaleField(locale, { title: e.target.value })} placeholder={locale === "en" ? "Job title" : "Title in this language"} />
                  <Textarea value={form[locale].bio} onChange={(e) => updateLocaleField(locale, { bio: e.target.value })} className="min-h-24" placeholder={locale === "en" ? "Short bio" : "Bio in this language"} />
                </div>
              </LocalePanel>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <DialogFooter className="gap-2 sm:justify-between">
              {mode === "edit" ? (
                <Button type="button" variant="destructive" className="gap-1.5 sm:me-auto" disabled={busy} onClick={() => void onDelete()}>
                  <Trash2 className="size-4" />Delete
                </Button>
              ) : <span />}
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>Cancel</Button>
                <Button type="submit" disabled={busy}>{busy ? "Saving…" : mode === "add" ? "Add member" : "Save changes"}</Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
