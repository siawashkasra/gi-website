"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { leadershipTeam } from "@/data/team";

export type Member = { name: string; title: string; bio: string; photo?: string };

export function withPhotos(members: Member[]): Member[] {
  return members.map((m, i) => ({
    name: m.name,
    title: m.title,
    bio: m.bio,
    photo: typeof m.photo === "string" && m.photo ? m.photo : leadershipTeam[i]?.photo ?? "",
  }));
}

function localeLabel(locale: "en" | "fa-AF" | "ps") {
  return locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto";
}

export function TeamMemberFields() {
  const { payload, setPayload, locale, loading, source } = useCmsDocumentContext();
  const raw: Member[] = Array.isArray(payload) && payload.length ? (payload as Member[]) : [];
  const members = withPhotos(raw);
  async function restoreLocaleDefaults() {
    if (!confirm(`Remove saved database copy for ${localeLabel(locale)} and restore text from locale files?`)) return;
    const res = await adminFetch(`/api/admin/content?entityType=team&entityKey=all&locale=${encodeURIComponent(locale)}`, { method: "DELETE" });
    if (!res.ok) return;
    const get = await adminFetch(`/api/admin/content?entityType=team&entityKey=all&locale=${encodeURIComponent(locale)}`);
    const j = (await get.json()) as { ok?: boolean; payload?: Member[] | null };
    if (j.payload) setPayload(withPhotos(j.payload));
  }
  if (loading) return <p className="text-sm text-muted-foreground">Loading current content…</p>;
  if (members.length === 0) return <p className="text-sm text-muted-foreground">No team data for {localeLabel(locale)}.</p>;
  return (
    <div className="space-y-6">
      {locale !== "en" && source === "database" ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={restoreLocaleDefaults}>Restore locale defaults</Button>
          <span className="text-xs text-muted-foreground">Use if the site shows English after an earlier save.</span>
        </div>
      ) : null}
      {members.map((m, i) => (
        <div key={leadershipTeam[i]?.photo ?? i} className="rounded-lg border border-border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Member {i + 1} · {localeLabel(locale)}</p>
          <div className="mt-3 space-y-3">
            <Input value={m.name} onChange={(e) => setPayload(withPhotos(members.map((x, j) => (j === i ? { ...x, name: e.target.value } : x))))} placeholder="Name" />
            <Input value={m.title} onChange={(e) => setPayload(withPhotos(members.map((x, j) => (j === i ? { ...x, title: e.target.value } : x))))} placeholder="Title" />
            <Textarea value={m.bio} onChange={(e) => setPayload(withPhotos(members.map((x, j) => (j === i ? { ...x, bio: e.target.value } : x))))} className="min-h-20" placeholder="Bio" />
          </div>
        </div>
      ))}
    </div>
  );
}
