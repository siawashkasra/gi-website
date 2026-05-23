"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsLocaleId } from "@/components/admin/locale-tabs";
import { adminFetch } from "@/lib/admin/admin-fetch";

export type CmsFeedback = { tone: "success" | "error"; text: string } | null;
export type CmsPayloadSource = "database" | "bundled" | "none";

export function useCmsDocument(entityType: string, entityKey: string, options?: { merge?: boolean }) {
  const merge = options?.merge !== false;
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [payload, setPayload] = useState<Record<string, unknown> | unknown[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<CmsFeedback>(null);
  const [dirty, setDirty] = useState(false);
  const [source, setSource] = useState<CmsPayloadSource>("none");
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await adminFetch(`/api/admin/content?entityType=${encodeURIComponent(entityType)}&entityKey=${encodeURIComponent(entityKey)}&locale=${encodeURIComponent(locale)}`);
      const j = (await res.json()) as { ok?: boolean; message?: string; payload?: Record<string, unknown> | unknown[] | null; source?: CmsPayloadSource };
      if (!res.ok || !j.ok) {
        setError(j.message ?? "Failed to load content");
        setPayload(null);
        setSource("none");
        return;
      }
      setPayload(j.payload ?? null);
      setSource(j.source ?? (j.payload != null ? "database" : "none"));
      setDirty(false);
    } catch {
      setError("Failed to load content");
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [entityType, entityKey, locale]);
  useEffect(() => {
    void load();
  }, [load]);
  const save = useCallback(async (data: Record<string, unknown> | unknown[]) => {
    setBusy(true);
    setFeedback(null);
    try {
      const res = await adminFetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entityType, entityKey, locale, payload: data, merge: merge ? true : false }) });
      const j = (await res.json()) as { ok?: boolean; message?: string; payload?: Record<string, unknown> | unknown[] | null; source?: CmsPayloadSource };
      if (res.ok && j.ok) {
        setFeedback({ tone: "success", text: "Saved. Changes are live on the public site." });
        setDirty(false);
        if (j.payload !== undefined) {
          setPayload(j.payload);
          setSource(j.source ?? "database");
        } else await load();
      } else setFeedback({ tone: "error", text: j.message ?? "Save failed" });
    } finally {
      setBusy(false);
    }
  }, [entityType, entityKey, locale, merge, load]);
  const copyFromEnglish = useCallback(async () => {
    if (locale === "en") return;
    if (!confirm("Replace this locale with English content?")) return;
    const res = await adminFetch(`/api/admin/content?entityType=${encodeURIComponent(entityType)}&entityKey=${encodeURIComponent(entityKey)}&locale=en`);
    const j = (await res.json()) as { ok?: boolean; payload?: Record<string, unknown> | unknown[] | null };
    if (j.payload != null) {
      setPayload(j.payload);
      setDirty(true);
    }
  }, [entityType, entityKey, locale]);
  const updatePayload = useCallback((next: Record<string, unknown> | unknown[] | null) => {
    setPayload(next);
    setDirty(true);
  }, []);
  return { locale, setLocale, payload, setPayload: updatePayload, loading, error, busy, feedback, setFeedback, dirty, source, load, save, copyFromEnglish };
}
