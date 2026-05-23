"use client";

export function CompanyDirectoryPreview({ name, industry, description, logoUrl }: { name?: string; industry?: string; description?: string; logoUrl?: string | null }) {
  return (
    <div className="space-y-3">
      {logoUrl ? <img src={logoUrl} alt="" className="mx-auto size-20 object-contain" /> : <div className="mx-auto size-20 rounded-lg bg-muted" />}
      {name ? <p className="text-center font-heading text-base font-semibold text-gi-navy">{name}</p> : null}
      {industry ? <p className="text-center text-xs uppercase tracking-wide text-primary/90">{industry}</p> : null}
      {description ? <p className="text-center text-sm leading-relaxed text-foreground/90">{description}</p> : null}
    </div>
  );
}
