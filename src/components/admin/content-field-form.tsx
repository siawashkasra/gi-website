"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useCallback, useEffect, useState } from "react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { LocalePanel, LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildPayloadFromFields, extractFieldValues } from "@/lib/admin/object-path";

export type ContentFieldDef = { key: string; label: string; multiline?: boolean; help?: string };

export function ContentFieldForm({ entityType, entityKey, title, description, fields }: { entityType: string; entityKey: string; title: string; description?: string; fields: ContentFieldDef[] }) {
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await adminFetch(`/api/admin/content?entityType=${encodeURIComponent(entityType)}&entityKey=${encodeURIComponent(entityKey)}&locale=${encodeURIComponent(locale)}`);
      const j = (await res.json()) as { ok?: boolean; message?: string; payload?: Record<string, unknown> | null };
      if (!res.ok || !j.ok) {
        setError(j.message ?? "Failed to load");
        setValues({});
        return;
      }
      setValues(extractFieldValues(j.payload ?? null, fields));
    } catch {
      setError("Failed to load");
      setValues({});
    } finally {
      setLoading(false);
    }
  }, [entityType, entityKey, locale, fields]);
  useEffect(() => {
    void load();
  }, [load]);
  async function save() {
    setBusy(true);
    setFeedback(null);
    try {
      const payload = buildPayloadFromFields(values, fields);
      const res = await adminFetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entityType, entityKey, locale, payload, merge: true }) });
      const j = (await res.json()) as { ok?: boolean; message?: string; payload?: Record<string, unknown> | null };
      if (res.ok && j.ok) {
        setFeedback({ tone: "success", text: "Saved. Changes are live on the public site." });
        if (j.payload !== undefined) setValues(extractFieldValues(j.payload, fields));
        else await load();
      } else setFeedback({ tone: "error", text: j.message ?? "Save failed" });
    } finally {
      setBusy(false);
    }
  }
  async function copyFromEnglish() {
    if (locale === "en") return;
    if (!confirm("Replace this locale with English content?")) return;
    const res = await adminFetch(`/api/admin/content?entityType=${encodeURIComponent(entityType)}&entityKey=${encodeURIComponent(entityKey)}&locale=en`);
    const j = (await res.json()) as { ok?: boolean; payload?: Record<string, unknown> | null };
    setValues(extractFieldValues(j.payload ?? null, fields));
  }
  return (
    <AdminSectionCard title={title} description={description}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <LocaleTabs value={locale} onChange={setLocale} />
        {locale !== "en" ? (
          <Button type="button" variant="outline" size="sm" onClick={copyFromEnglish}>
            Copy from English
          </Button>
        ) : null}
      </div>
      {error ? <AdminBanner tone="error">{error}</AdminBanner> : null}
      <LocalePanel locale={locale}>
        {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                {f.help ? <p className="mt-0.5 text-xs text-muted-foreground">{f.help}</p> : null}
                {f.multiline ? (
                  <Textarea value={values[f.key] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} className="mt-1.5 min-h-24" />
                ) : (
                  <Input value={values[f.key] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} className="mt-1.5" />
                )}
              </div>
            ))}
          </div>
        )}
      </LocalePanel>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={busy || loading} onClick={save}>
          Save {locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto"}
        </Button>
      </div>
      {feedback ? <div className="mt-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
    </AdminSectionCard>
  );
}
