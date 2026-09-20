"use client";

export type EventPreviewData = { title?: string; dateLabel?: string; location?: string; summary?: string; ctaLabel?: string; ctaHref?: string; imageUrl?: string | null };

export function EventsSectionPreview({ section, event }: { section: string; event?: EventPreviewData | null }) {
  if (section === "list") return <p className="text-muted-foreground">Select an event from the list to preview and edit its copy.</p>;
  if (section !== "edit" || !event) return null;
  return (
    <div className="space-y-3">
      {event.imageUrl ? <img src={event.imageUrl} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" /> : null}
      {event.title ? <p className="font-heading text-base font-semibold text-gi-navy">{event.title}</p> : null}
      {event.dateLabel ? <p className="text-xs font-medium uppercase tracking-wide text-primary/90">{event.dateLabel}</p> : null}
      {event.location ? <p className="text-xs text-muted-foreground">{event.location}</p> : null}
      {event.summary ? <p className="leading-relaxed text-foreground/90">{event.summary}</p> : null}
      {event.ctaLabel ? <span className="inline-block rounded bg-gi-navy/10 px-2 py-1 text-xs font-medium text-gi-navy">{event.ctaLabel}</span> : null}
    </div>
  );
}
