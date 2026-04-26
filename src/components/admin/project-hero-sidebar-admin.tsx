"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";

type ProjectOption = { slug: string; name: string };

type ConfigRow = { eyebrow: string | null; title: string | null; blurb: string | null } | null;

const inlineField =
  "w-full rounded-md border border-white/30 bg-white/20 px-2.5 py-2 !text-white caret-white outline-none placeholder:text-white/55 focus:border-white/55 focus:ring-2 focus:ring-white/25";

export function ProjectHeroSidebarAdmin({ projectOptions }: { projectOptions: ProjectOption[] }) {
  const [slug, setSlug] = useState(projectOptions[0]?.slug ?? "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; err: boolean } | null>(null);
  const [resolved, setResolved] = useState<ResolvedHeroSidebar | null>(null);
  const [eyebrowIn, setEyebrowIn] = useState("");
  const [titleIn, setTitleIn] = useState("");
  const [blurbIn, setBlurbIn] = useState("");
  const [rows, setRows] = useState<{ label: string; value: string }[]>([]);
  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/project-hero-sidebar?projectSlug=${encodeURIComponent(slug)}`);
      const j = (await res.json()) as { ok?: boolean; config?: ConfigRow; resolved?: ResolvedHeroSidebar; message?: string };
      if (!res.ok || !j.ok) {
        setMsg({ text: j.message ?? "Load failed", err: true });
        setResolved(null);
        return;
      }
      setResolved(j.resolved ?? null);
    } finally {
      setLoading(false);
    }
  }, [slug]);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    setEditing(false);
  }, [slug]);
  function patchRow(i: number, field: "label" | "value", v: string) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, [field]: v } : r)));
  }
  function startEdit() {
    if (!resolved) return;
    setEyebrowIn(resolved.intro.eyebrow);
    setTitleIn(resolved.intro.title);
    setBlurbIn(resolved.intro.blurb);
    setRows(resolved.ribbon.map((r) => ({ label: r.label, value: r.value })));
    setEditing(true);
    setMsg(null);
  }
  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    for (const r of rows) {
      if (!r.label.trim() || !r.value.trim()) {
        setMsg({ text: "Each metric needs both a label and a value.", err: true });
        return;
      }
    }
    const trimmedRows = rows.map((r) => ({ label: r.label.trim(), value: r.value.trim() }));
    setSaving(true);
    try {
      const res = await fetch("/api/admin/project-hero-sidebar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: slug,
          eyebrow: eyebrowIn.trim() === "" ? null : eyebrowIn.trim(),
          title: titleIn.trim() === "" ? null : titleIn.trim(),
          blurb: blurbIn.trim() === "" ? null : blurbIn.trim(),
          rows: trimmedRows,
        }),
      });
      const j = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !j.ok) {
        setMsg({ text: j.message ?? "Save failed", err: true });
        return;
      }
      setMsg({ text: "Saved.", err: false });
      setEditing(false);
      await load();
    } finally {
      setSaving(false);
    }
  }
  function onCancelEdit() {
    setEditing(false);
    setMsg(null);
    void load();
  }
  const introRead = resolved?.intro ?? { eyebrow: HERO_SIDEBAR_DEFAULT_INTRO.eyebrow, title: HERO_SIDEBAR_DEFAULT_INTRO.title, blurb: HERO_SIDEBAR_DEFAULT_INTRO.blurb };
  const ribbonRead = resolved?.ribbon ?? [];
  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="text-sm font-medium">Project</label>
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block rounded-md border border-input bg-background px-3 py-2 text-sm" disabled={editing || saving}>
            {projectOptions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="button" variant="outline" size="sm" disabled={loading || editing || saving} onClick={() => void load()}>
          Reload
        </Button>
        {!editing ? (
          <Button type="button" size="sm" className="gap-1.5" disabled={loading || !resolved} onClick={startEdit}>
            <Pencil className="size-4" aria-hidden />
            Edit
          </Button>
        ) : null}
      </div>
      {msg ? <p className={`mt-4 text-sm ${msg.err ? "text-destructive" : "text-muted-foreground"}`}>{msg.text}</p> : null}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hero sidebar</p>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">Same layout as the public project hero. Edit updates only this column; the main specs block is unchanged.</p>
        <div className="mt-6">
          {loading || !resolved ? (
            <div className="h-72 max-w-[19.5rem] animate-pulse rounded-lg bg-muted" />
          ) : editing ? (
            <form onSubmit={onSave} className="max-w-[19.5rem]">
              <aside className="relative flex w-full flex-col justify-between border-t border-white/10 bg-gi-navy px-6 py-9 text-white sm:px-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-11 xl:px-10 xl:py-12" aria-label="Edit project key figures">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.035)_0%,transparent_42%)]" aria-hidden />
                <div className="relative space-y-3">
                  <input value={eyebrowIn} onChange={(e) => setEyebrowIn(e.target.value)} className={`${inlineField} font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em]`} aria-label="Eyebrow" />
                  <input value={titleIn} onChange={(e) => setTitleIn(e.target.value)} className={`${inlineField} font-heading text-lg font-semibold leading-snug tracking-tight xl:text-xl`} aria-label="Title" />
                  <textarea value={blurbIn} onChange={(e) => setBlurbIn(e.target.value)} rows={3} className={`${inlineField} min-h-[4.5rem] resize-y font-sans text-sm leading-relaxed`} aria-label="Subtitle" />
                </div>
                <ul className="relative mt-8 space-y-6 border-t border-white/10 pt-8 lg:mt-10 lg:flex-1">
                  {rows.length === 0 ? (
                    <li className="font-sans text-xs leading-relaxed text-white/70">This project has no sidebar metrics on the live site yet, so there is nothing to edit here. The column stays hidden until there is at least one figure.</li>
                  ) : (
                    rows.map((r, i) => (
                      <li key={`e-${i}`} className="space-y-2">
                        <input value={r.label} onChange={(e) => patchRow(i, "label", e.target.value)} className={`${inlineField} font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em]`} aria-label={`Metric ${i + 1} label`} />
                        <input value={r.value} onChange={(e) => patchRow(i, "value", e.target.value)} className={`${inlineField} font-heading text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl`} aria-label={`Metric ${i + 1} value`} />
                      </li>
                    ))
                  )}
                </ul>
                <div className="relative mt-8 border-t border-white/10 pt-8">
                  <span className="inline-flex w-full cursor-default select-none items-center justify-center rounded-xl border border-white/35 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-white shadow-none backdrop-blur-sm">
                    Discuss this project
                  </span>
                </div>
                <div className="relative mt-6 flex flex-col gap-2">
                  <Button type="submit" disabled={saving || loading} className="w-full bg-gi-gold text-gi-navy hover:bg-gi-gold-light">
                    {saving ? "Saving…" : "Save"}
                  </Button>
                  <Button type="button" variant="outline" disabled={saving} className="border-white/35 bg-white/[0.06] !text-white hover:bg-white/12 hover:!text-white" onClick={onCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </aside>
            </form>
          ) : (
            <aside className="relative flex w-full max-w-[19.5rem] flex-col justify-between border-t border-white/10 bg-gi-navy px-6 py-9 text-white sm:px-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-11 xl:px-10 xl:py-12" aria-label="Preview: project key figures">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.035)_0%,transparent_42%)]" aria-hidden />
              <div className="relative">
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/55">{introRead.eyebrow}</p>
                <p className="mt-3 font-heading text-lg font-semibold leading-snug tracking-tight text-white xl:text-xl">{introRead.title}</p>
                <p className="mt-3 font-sans text-xs leading-relaxed text-white/68 sm:text-sm">{introRead.blurb}</p>
              </div>
              <ul className="relative mt-8 space-y-6 border-t border-white/10 pt-8 lg:mt-10 lg:flex-1">
                {ribbonRead.length === 0 ? (
                  <li className="font-sans text-xs leading-relaxed text-white/55">No key figures — on the live site this column is hidden until there is at least one metric.</li>
                ) : (
                  ribbonRead.map((item) => (
                    <li key={item.rowKey}>
                      <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/50">{item.label}</p>
                      <p className="mt-1 break-words font-heading text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">{item.value}</p>
                    </li>
                  ))
                )}
              </ul>
              <div className="relative mt-8 border-t border-white/10 pt-8 lg:mt-10">
                <span className="inline-flex w-full cursor-default select-none items-center justify-center rounded-xl border border-white/35 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-white shadow-none backdrop-blur-sm opacity-95">
                  Discuss this project
                </span>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
