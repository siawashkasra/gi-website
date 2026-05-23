"use client";

const TYPE_KEYS = ["residential", "commercial", "mixed-use"] as const;

export function ProjectsLabelsPreview({ labels }: { labels: Record<string, string> }) {
  return (
    <ul className="space-y-2">
      {TYPE_KEYS.map((key) => (
        <li key={key} className="flex justify-between gap-4 border-b border-border/50 pb-2 text-sm">
          <span className="font-mono text-xs text-muted-foreground">{key}</span>
          <span className="font-medium text-gi-navy">{labels[key] || "—"}</span>
        </li>
      ))}
    </ul>
  );
}
