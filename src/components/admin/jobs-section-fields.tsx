"use client";

import { useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function JobsSectionFields({ section }: { section: string }) {
  const { data, patch } = useCmsDocumentContext();
  const s1 = (data.sector1 ?? {}) as { title?: string; body?: string };
  const s2 = (data.sector2 ?? {}) as { title?: string; body?: string };
  const s3 = (data.sector3 ?? {}) as { title?: string; body?: string };
  if (section === "intro") return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Careers label</Label><Input value={typeof data.careers === "string" ? data.careers : ""} onChange={(e) => patch({ careers: e.target.value })} className="mt-1.5" /></div>
        <div><Label>Join headline</Label><Input value={typeof data.join === "string" ? data.join : ""} onChange={(e) => patch({ join: e.target.value })} className="mt-1.5" /></div>
      </div>
      <div><Label>Intro body</Label><Textarea value={typeof data.body === "string" ? data.body : ""} onChange={(e) => patch({ body: e.target.value })} className="mt-1.5 min-h-28" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Contact CTA</Label><Input value={typeof data.contactUs === "string" ? data.contactUs : ""} onChange={(e) => patch({ contactUs: e.target.value })} className="mt-1.5" /></div>
        <div><Label>Email CV label</Label><Input value={typeof data.emailCv === "string" ? data.emailCv : ""} onChange={(e) => patch({ emailCv: e.target.value })} className="mt-1.5" /></div>
      </div>
    </div>
  );
  if (section === "sectors") return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-4 space-y-3"><p className="text-sm font-medium text-gi-navy">Sector 1</p><Input value={s1.title ?? ""} onChange={(e) => patch({ sector1: { ...s1, title: e.target.value } })} placeholder="Title" /><Textarea value={s1.body ?? ""} onChange={(e) => patch({ sector1: { ...s1, body: e.target.value } })} className="min-h-20" placeholder="Body" /></div>
      <div className="rounded-lg border border-border p-4 space-y-3"><p className="text-sm font-medium text-gi-navy">Sector 2</p><Input value={s2.title ?? ""} onChange={(e) => patch({ sector2: { ...s2, title: e.target.value } })} placeholder="Title" /><Textarea value={s2.body ?? ""} onChange={(e) => patch({ sector2: { ...s2, body: e.target.value } })} className="min-h-20" placeholder="Body" /></div>
      <div className="rounded-lg border border-border p-4 space-y-3"><p className="text-sm font-medium text-gi-navy">Sector 3</p><Input value={s3.title ?? ""} onChange={(e) => patch({ sector3: { ...s3, title: e.target.value } })} placeholder="Title" /><Textarea value={s3.body ?? ""} onChange={(e) => patch({ sector3: { ...s3, body: e.target.value } })} className="min-h-20" placeholder="Body" /></div>
    </div>
  );
  if (section === "footnotes") return (
    <div className="space-y-4">
      <div><Label>Footnote 1</Label><Textarea value={typeof data.footnote1 === "string" ? data.footnote1 : ""} onChange={(e) => patch({ footnote1: e.target.value })} className="mt-1.5 min-h-20" /></div>
      <div><Label>Footnote 2</Label><Textarea value={typeof data.footnote2 === "string" ? data.footnote2 : ""} onChange={(e) => patch({ footnote2: e.target.value })} className="mt-1.5 min-h-20" /></div>
    </div>
  );
  return <p className="text-sm text-muted-foreground">Unknown section.</p>;
}
