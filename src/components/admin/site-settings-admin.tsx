"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminFetch } from "@/lib/admin/admin-fetch";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";
import { cn } from "@/lib/utils";

const settingsSections = [
  { slug: "contact", label: "Contact", description: "Email and phone numbers shown in the footer and contact page." },
  { slug: "address", label: "Address", description: "Street address per language (English, Dari, Pashto)." },
  { slug: "social", label: "Social links", description: "Instagram and Facebook URLs." },
] as const;

type SettingsSectionSlug = (typeof settingsSections)[number]["slug"];

export function SiteSettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettingsPayload>({});
  const [section, setSection] = useState<SettingsSectionSlug>("contact");
  const [addrLocale, setAddrLocale] = useState<CmsLocaleId>("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch("/api/admin/site-settings");
      const j = (await res.json()) as { ok?: boolean; settings?: SiteSettingsPayload; message?: string };
      if (!res.ok || !j.ok) {
        setError(j.message ?? "Failed to load settings");
        return;
      }
      if (j.settings) setSettings(j.settings);
    } catch {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function save() {
    setBusy(true);
    setFeedback(null);
    try {
      const res = await adminFetch("/api/admin/site-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      const j = (await res.json()) as { ok?: boolean; message?: string; settings?: SiteSettingsPayload };
      if (res.ok && j.ok) {
        setFeedback({ tone: "success", text: "Settings saved." });
        if (j.settings) setSettings(j.settings);
        else await load();
      } else setFeedback({ tone: "error", text: j.message ?? "Save failed" });
    } finally {
      setBusy(false);
    }
  }
  const activeMeta = settingsSections.find((s) => s.slug === section) ?? settingsSections[0];
  const previewLocale = section === "address" ? addrLocale : "en";
  return (
    <div className="space-y-6">
      <div className="admin-page-hero px-5 py-5 sm:px-6">
        <h1 className="font-heading text-xl font-semibold tracking-tight text-gi-navy sm:text-2xl">Site settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contact, address per language, and social links used across the public site.</p>
      </div>
      <Link href="/admin/brand" className="admin-quick-card flex items-center gap-4 p-5">
        <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5">
          <Palette className="size-5 text-gi-navy" />
        </div>
        <div>
          <p className="font-medium text-gi-navy">Brand & logos</p>
          <p className="text-sm text-muted-foreground">Upload site logo and social preview image</p>
        </div>
      </Link>
      <div className="admin-editor-workspace -mx-4 flex flex-col sm:-mx-8">
        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-8 sm:px-8 lg:flex-row">
          <aside className="admin-section-nav shrink-0 lg:w-52">
            <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">Sections</p>
            <nav className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
              {settingsSections.map((s) => (
                <button key={s.slug} type="button" onClick={() => setSection(s.slug)} className={cn("admin-section-link shrink-0 rounded-lg px-3 py-2 text-start text-sm transition-colors lg:shrink", section === s.slug ? "bg-gi-navy text-white font-medium" : "text-foreground/75 hover:bg-muted")}>
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 xl:flex-row">
            <div className="w-full shrink-0 xl:w-[min(42%,22rem)] xl:max-w-md">
              <CmsSectionPreview domain="settings" section={section} locale={previewLocale} settings={settings} sectionLabel={activeMeta.label} publicPath={section === "address" ? `/${previewLocale}/contact` : `/${previewLocale}`} />
            </div>
            <div className="admin-editor-panel min-w-0 flex-1">
              <div className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 border-b border-border pb-4">
                  <h2 className="font-heading text-lg font-semibold text-gi-navy">{activeMeta.label}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{activeMeta.description}</p>
                </div>
                {error ? <AdminBanner tone="error">{error}</AdminBanner> : null}
                {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
                  <>
                    {section === "contact" ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div><Label>Email</Label><Input value={settings.email ?? ""} onChange={(e) => setSettings((s) => ({ ...s, email: e.target.value }))} className="mt-1.5" /></div>
                        <div><Label>Mobile phone</Label><Input value={settings.phone ?? ""} onChange={(e) => setSettings((s) => ({ ...s, phone: e.target.value }))} className="mt-1.5" /></div>
                        <div className="sm:col-span-2"><Label>Landline</Label><Input value={settings.phoneLandline ?? ""} onChange={(e) => setSettings((s) => ({ ...s, phoneLandline: e.target.value }))} className="mt-1.5" /></div>
                      </div>
                    ) : null}
                    {section === "address" ? (
                      <div>
                        <p className="text-sm text-muted-foreground">Each language has its own address line. Translations from locale files load here when nothing is saved yet.</p>
                        <div className="mt-4"><LocaleTabs value={addrLocale} onChange={setAddrLocale} /></div>
                        <div className="mt-4"><Label>Address ({addrLocale === "en" ? "English" : addrLocale === "fa-AF" ? "Dari" : "Pashto"})</Label><Textarea value={settings.addressByLocale?.[addrLocale] ?? ""} onChange={(e) => setSettings((s) => ({ ...s, addressByLocale: { ...s.addressByLocale, [addrLocale]: e.target.value } }))} className="mt-1.5 min-h-24" placeholder="Street address for this language" /></div>
                      </div>
                    ) : null}
                    {section === "social" ? (
                      <div className="grid gap-4 sm:grid-cols-1">
                        <div><Label>Instagram URL</Label><Input value={settings.social?.instagram ?? ""} onChange={(e) => setSettings((s) => ({ ...s, social: { ...s.social, instagram: e.target.value } }))} className="mt-1.5" /></div>
                        <div><Label>Facebook URL</Label><Input value={settings.social?.facebook ?? ""} onChange={(e) => setSettings((s) => ({ ...s, social: { ...s.social, facebook: e.target.value } }))} className="mt-1.5" /></div>
                      </div>
                    ) : null}
                    <Button type="button" size="sm" className="mt-6" disabled={busy || loading} onClick={save}>Save settings</Button>
                    {feedback ? <div className="mt-4"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
