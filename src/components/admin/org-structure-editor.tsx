"use client";

import { StringListEditor } from "@/components/admin/array-field-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { OrgStructureUnit } from "@/data/company-profile";

type OrgData = { sectionTitle?: string; chairman?: { name?: string; title?: string }; chiefExecutive?: { name?: string; title?: string }; units?: OrgStructureUnit[] };

export function OrgStructureEditor({ value, onChange }: { value: OrgData; onChange: (next: OrgData) => void }) {
  const chairman = value.chairman ?? {};
  const chiefExecutive = value.chiefExecutive ?? {};
  const units = Array.isArray(value.units) ? value.units : [];
  const patch = (partial: Partial<OrgData>) => onChange({ ...value, ...partial });
  const patchUnit = (index: number, unit: OrgStructureUnit) => onChange({ ...value, units: units.map((u, i) => (i === index ? unit : u)) });
  return (
    <div className="space-y-6 rounded-lg border border-border p-4">
      <p className="text-sm font-medium text-gi-navy">Organizational structure</p>
      <div><Label>Section title</Label><Input value={value.sectionTitle ?? ""} onChange={(e) => patch({ sectionTitle: e.target.value })} className="mt-1.5" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Chairman name</Label><Input value={chairman.name ?? ""} onChange={(e) => patch({ chairman: { ...chairman, name: e.target.value } })} className="mt-1.5" /></div>
        <div><Label>Chairman title</Label><Input value={chairman.title ?? ""} onChange={(e) => patch({ chairman: { ...chairman, title: e.target.value } })} className="mt-1.5" /></div>
        <div><Label>CEO name</Label><Input value={chiefExecutive.name ?? ""} onChange={(e) => patch({ chiefExecutive: { ...chiefExecutive, name: e.target.value } })} className="mt-1.5" /></div>
        <div><Label>CEO title</Label><Input value={chiefExecutive.title ?? ""} onChange={(e) => patch({ chiefExecutive: { ...chiefExecutive, title: e.target.value } })} className="mt-1.5" /></div>
      </div>
      {units.map((unit, index) => (
        <div key={index} className="space-y-3 rounded-md border border-border/80 bg-muted/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Unit {index + 1}</p>
          <div><Label>Title</Label><Input value={unit.title ?? ""} onChange={(e) => patchUnit(index, { ...unit, title: e.target.value })} className="mt-1.5" /></div>
          {"subtitle" in unit ? <div><Label>Subtitle</Label><Input value={unit.subtitle ?? ""} onChange={(e) => patchUnit(index, { ...unit, subtitle: e.target.value })} className="mt-1.5" /></div> : null}
          {"roles" in unit && unit.roles ? <StringListEditor title="Roles" items={unit.roles} onChange={(roles) => patchUnit(index, { ...unit, roles })} minItems={0} /> : null}
          {"pairs" in unit && unit.pairs ? (
            <div className="space-y-2">
              <Label>Role pairs</Label>
              {unit.pairs.map((pair, pairIndex) => (
                <div key={pairIndex} className="grid gap-2 sm:grid-cols-2">
                  <Input value={pair[0] ?? ""} onChange={(e) => patchUnit(index, { ...unit, pairs: unit.pairs.map((p, j) => (j === pairIndex ? [e.target.value, p[1]] as [string, string] : p)) })} />
                  <Input value={pair[1] ?? ""} onChange={(e) => patchUnit(index, { ...unit, pairs: unit.pairs.map((p, j) => (j === pairIndex ? [p[0], e.target.value] as [string, string] : p)) })} />
                </div>
              ))}
              {unit.extraSingles ? <StringListEditor title="Extra roles" items={unit.extraSingles} onChange={(extraSingles) => patchUnit(index, { ...unit, extraSingles })} minItems={0} /> : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
