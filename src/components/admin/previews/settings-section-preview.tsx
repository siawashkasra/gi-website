"use client";

import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";
import type { CmsLocaleId } from "@/components/admin/locale-tabs";

export function SettingsSectionPreview({ section, settings, locale }: { section: string; settings: SiteSettingsPayload; locale?: CmsLocaleId }) {
  if (section === "contact") return (
    <dl className="space-y-3 text-sm">
      {settings.email ? <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Email</dt><dd className="mt-0.5">{settings.email}</dd></div> : null}
      {settings.phone ? <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Mobile</dt><dd className="mt-0.5">{settings.phone}</dd></div> : null}
      {settings.phoneLandline ? <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Landline</dt><dd className="mt-0.5">{settings.phoneLandline}</dd></div> : null}
    </dl>
  );
  if (section === "address" && locale) {
    const addr = settings.addressByLocale?.[locale]?.trim();
    if (!addr) return null;
    return <p className="whitespace-pre-wrap leading-relaxed">{addr}</p>;
  }
  if (section === "social") return (
    <ul className="space-y-2 text-sm">
      {settings.social?.instagram ? <li><span className="text-xs font-semibold text-muted-foreground">Instagram · </span>{settings.social.instagram}</li> : null}
      {settings.social?.facebook ? <li><span className="text-xs font-semibold text-muted-foreground">Facebook · </span>{settings.social.facebook}</li> : null}
    </ul>
  );
  return null;
}
