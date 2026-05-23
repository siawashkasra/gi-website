"use client";

import { CmsDocumentEditor } from "@/components/admin/cms-document-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TYPE_KEYS = ["residential", "commercial", "mixed-use"] as const;

export function ProjectsDataLabelsAdmin() {
  return (
    <CmsDocumentEditor entityType="projectsData" entityKey="labels" title="Project type labels" description="Filter labels on the public projects index." onSave={(p) => p as Record<string, unknown>}>
      {({ payload, setPayload }) => {
        const labels = ((payload ?? {}) as { projectTypeLabels?: Record<string, string> }).projectTypeLabels ?? {};
        return (
          <div className="space-y-3">
            {TYPE_KEYS.map((key) => (
              <div key={key}>
                <Label>{key}</Label>
                <Input value={labels[key] ?? ""} onChange={(e) => setPayload({ projectTypeLabels: { ...labels, [key]: e.target.value } })} className="mt-1.5" />
              </div>
            ))}
          </div>
        );
      }}
    </CmsDocumentEditor>
  );
}
