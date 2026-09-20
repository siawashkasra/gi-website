"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export type ArrayFieldColumn = { key: string; label: string; multiline?: boolean; help?: string };

export function ArrayFieldEditor<T extends Record<string, string>>({ title, description, items, columns, onChange, minItems = 0, createItem }: { title: string; description?: string; items: T[]; columns: ArrayFieldColumn[]; onChange: (items: T[]) => void; minItems?: number; createItem: () => T }) {
  function updateItem(index: number, key: string, value: string) {
    onChange(items.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }
  function addItem() {
    onChange([...items, createItem()]);
  }
  function removeItem(index: number) {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  }
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gi-navy">{title}</p>
        {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      {items.map((row, index) => (
        <div key={index} className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Item {index + 1}</p>
            {items.length > minItems ? (
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeItem(index)} aria-label="Remove item">
                <Trash2 className="size-4 text-destructive" />
              </Button>
            ) : null}
          </div>
          <div className="space-y-3">
            {columns.map((col) => (
              <div key={col.key}>
                <Label>{col.label}</Label>
                {col.help ? <p className="mt-0.5 text-xs text-muted-foreground">{col.help}</p> : null}
                {col.multiline ? (
                  <Textarea value={row[col.key] ?? ""} onChange={(e) => updateItem(index, col.key, e.target.value)} className="mt-1.5 min-h-20" />
                ) : (
                  <Input value={row[col.key] ?? ""} onChange={(e) => updateItem(index, col.key, e.target.value)} className="mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1.5">
        <Plus className="size-4" /> Add
      </Button>
    </div>
  );
}

export function StringListEditor({ title, description, items, onChange, minItems = 0 }: { title: string; description?: string; items: string[]; onChange: (items: string[]) => void; minItems?: number }) {
  return (
    <ArrayFieldEditor title={title} description={description} items={items.map((v) => ({ value: v }))} columns={[{ key: "value", label: "Text", multiline: true }]} minItems={minItems} createItem={() => ({ value: "" })} onChange={(rows) => onChange(rows.map((r) => r.value))} />
  );
}
