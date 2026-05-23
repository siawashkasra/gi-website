"use client";

export type JobPostingPreviewData = { title?: string; dateLabel?: string; location?: string; department?: string; summary?: string; ctaLabel?: string };

export function JobPostingPreview({ job }: { job?: JobPostingPreviewData | null }) {
  if (!job) return null;
  return (
    <div className="space-y-3">
      {job.title ? <p className="font-heading text-base font-semibold text-gi-navy">{job.title}</p> : null}
      {job.dateLabel ? <p className="text-xs font-medium uppercase tracking-wide text-primary/90">{job.dateLabel}</p> : null}
      {job.location ? <p className="text-xs text-muted-foreground">{job.location}</p> : null}
      {job.department ? <p className="text-xs font-medium text-gi-navy">{job.department}</p> : null}
      {job.summary ? <p className="leading-relaxed text-foreground/90">{job.summary}</p> : null}
      {job.ctaLabel ? <span className="inline-block rounded bg-gi-navy/10 px-2 py-1 text-xs font-medium">{job.ctaLabel}</span> : null}
    </div>
  );
}
