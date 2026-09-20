"use client";

import { ArrayFieldEditor, StringListEditor } from "@/components/admin/array-field-editor";
import { CmsDocumentEditor } from "@/components/admin/cms-document-editor";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type TimelineRow = { label: string; value: string };
type FeatureRow = { icon: string; title: string; description: string };

export function ProjectContentFields({ slug, projectName }: { slug: string; projectName: string }) {
  return (
    <CmsDocumentEditor entityType="project" entityKey={slug} title={`${projectName} — content`} description="Overview, mission, timeline, and features for this project page." onSave={(p) => p as Record<string, unknown>}>
      {({ payload, setPayload }) => {
        const data = (payload ?? {}) as Record<string, unknown>;
        const mv = (data.missionVision ?? {}) as { vision?: string; mission?: string; values?: { title: string; description: string }[] };
        const timeline = Array.isArray(data.timeline) ? (data.timeline as TimelineRow[]) : [];
        const features = Array.isArray(data.features) ? (data.features as FeatureRow[]) : [];
        const overviewParagraphs = Array.isArray(data.detailOverviewParagraphs) ? (data.detailOverviewParagraphs as string[]) : [];
        const keyStats = (data.keyStats ?? {}) as Record<string, string>;
        const patch = (partial: Record<string, unknown>) => setPayload({ ...data, ...partial });
        return (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Name</Label><Input value={typeof data.name === "string" ? data.name : ""} onChange={(e) => patch({ name: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Location</Label><Input value={typeof data.location === "string" ? data.location : ""} onChange={(e) => patch({ location: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Status</Label><Input value={typeof data.status === "string" ? data.status : ""} onChange={(e) => patch({ status: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Year</Label><Input value={typeof data.year === "string" ? data.year : ""} onChange={(e) => patch({ year: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Area</Label><Input value={typeof data.area === "string" ? data.area : ""} onChange={(e) => patch({ area: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Overview title</Label><Input value={typeof data.detailOverviewTitle === "string" ? data.detailOverviewTitle : ""} onChange={(e) => patch({ detailOverviewTitle: e.target.value })} className="mt-1.5" /></div>
            </div>
            <div><Label>Excerpt</Label><Textarea value={typeof data.excerpt === "string" ? data.excerpt : ""} onChange={(e) => patch({ excerpt: e.target.value })} className="mt-1.5 min-h-20" /></div>
            <div><Label>Description</Label><Textarea value={typeof data.description === "string" ? data.description : ""} onChange={(e) => patch({ description: e.target.value })} className="mt-1.5 min-h-28" /></div>
            <StringListEditor title="Overview paragraphs" items={overviewParagraphs} onChange={(detailOverviewParagraphs) => patch({ detailOverviewParagraphs })} minItems={0} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Vision</Label><Textarea value={mv.vision ?? ""} onChange={(e) => patch({ missionVision: { ...mv, vision: e.target.value } })} className="mt-1.5 min-h-20" /></div>
              <div><Label>Mission</Label><Textarea value={mv.mission ?? ""} onChange={(e) => patch({ missionVision: { ...mv, mission: e.target.value } })} className="mt-1.5 min-h-20" /></div>
            </div>
            <div><Label>Strategic positioning</Label><Textarea value={typeof data.strategicPositioning === "string" ? data.strategicPositioning : ""} onChange={(e) => patch({ strategicPositioning: e.target.value })} className="mt-1.5 min-h-20" /></div>
            <ArrayFieldEditor title="Timeline" items={timeline.map((t) => ({ label: t.label ?? "", value: t.value ?? "" }))} columns={[{ key: "label", label: "Label" }, { key: "value", label: "Value" }]} minItems={0} createItem={() => ({ label: "", value: "" })} onChange={(rows) => patch({ timeline: rows })} />
            <ArrayFieldEditor title="Features" items={features.map((f) => ({ icon: f.icon ?? "layers", title: f.title ?? "", description: f.description ?? "" }))} columns={[{ key: "icon", label: "Icon" }, { key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]} minItems={0} createItem={() => ({ icon: "layers", title: "", description: "" })} onChange={(rows) => patch({ features: rows })} />
            <div className="grid gap-4 sm:grid-cols-3">
              <div><Label>Key stat — units</Label><Input value={keyStats.units ?? ""} onChange={(e) => patch({ keyStats: { ...keyStats, units: e.target.value } })} className="mt-1.5" /></div>
              <div><Label>Key stat — shops</Label><Input value={keyStats.shops ?? ""} onChange={(e) => patch({ keyStats: { ...keyStats, shops: e.target.value } })} className="mt-1.5" /></div>
              <div><Label>Key stat — facilities</Label><Input value={keyStats.facilities ?? ""} onChange={(e) => patch({ keyStats: { ...keyStats, facilities: e.target.value } })} className="mt-1.5" /></div>
            </div>
          </div>
        );
      }}
    </CmsDocumentEditor>
  );
}
