"use client";

import { cn } from "@/lib/utils";

export function AdminTabs({ tabs, value, onChange }: { tabs: { id: string; label: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-border">
      {tabs.map((t) => (
        <button key={t.id} type="button" onClick={() => onChange(t.id)} className={cn("-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors", value === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
