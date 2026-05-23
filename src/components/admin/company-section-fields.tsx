"use client";

import { ArrayFieldEditor, StringListEditor } from "@/components/admin/array-field-editor";
import { useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { OrgStructureEditor } from "@/components/admin/org-structure-editor";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type SnapshotRow = { label: string; value: string };
type ValueItem = { title: string; body: string; icon: string };
type CoreArea = { title: string; body: string };
type Strength = { title: string; body: string };
type PortfolioRow = { project: string; location: string; sector: string };
type MarketRow = { title: string; body: string };

export function CompanySectionFields({ section }: { section: string }) {
  const { data, patch } = useCmsDocumentContext();
  const hero = (data.companyHero ?? {}) as { subtitle?: string };
  const about = (data.companyAbout ?? {}) as { headline?: string; paragraphs?: string[] };
  const snapshot = Array.isArray(data.companySnapshot) ? (data.companySnapshot as SnapshotRow[]) : [];
  const values = Array.isArray(data.companyValues) ? (data.companyValues as ValueItem[]) : [];
  const areas = Array.isArray(data.coreBusinessAreas) ? (data.coreBusinessAreas as CoreArea[]) : [];
  const strengths = Array.isArray(data.competitiveStrengths) ? (data.competitiveStrengths as Strength[]) : [];
  const governance = Array.isArray(data.governanceIntro) ? (data.governanceIntro as string[]) : [];
  const portfolio = Array.isArray(data.portfolioTableRows) ? (data.portfolioTableRows as PortfolioRow[]) : [];
  const ceo = (data.ceoProfile ?? {}) as { quote?: string; name?: string; title?: string };
  const clients = (data.clientsPartners ?? {}) as { title?: string; note?: string };
  const intl = (data.internationalPresence ?? {}) as { uae?: string; regional?: string; crossBorder?: string };
  const marketPositioning = Array.isArray(data.marketPositioning) ? (data.marketPositioning as MarketRow[]) : [];
  const org = (data.organizationalStructure ?? {}) as Record<string, unknown>;
  if (section === "hero") return <div className="space-y-3"><Label>Hero subtitle</Label><Textarea value={hero.subtitle ?? ""} onChange={(e) => patch({ companyHero: { ...hero, subtitle: e.target.value } })} className="min-h-24" /></div>;
  if (section === "about") return <div className="space-y-3"><Label>About headline</Label><Input value={about.headline ?? ""} onChange={(e) => patch({ companyAbout: { ...about, headline: e.target.value } })} /><StringListEditor title="About paragraphs" items={Array.isArray(about.paragraphs) ? about.paragraphs : []} onChange={(paragraphs) => patch({ companyAbout: { ...about, paragraphs } })} minItems={1} /></div>;
  if (section === "mission-vision") return <div className="grid gap-4 sm:grid-cols-2"><div><Label>Mission</Label><Textarea value={typeof data.companyMission === "string" ? data.companyMission : ""} onChange={(e) => patch({ companyMission: e.target.value })} className="mt-1.5 min-h-28" /></div><div><Label>Vision</Label><Textarea value={typeof data.companyVision === "string" ? data.companyVision : ""} onChange={(e) => patch({ companyVision: e.target.value })} className="mt-1.5 min-h-28" /></div></div>;
  if (section === "snapshot") return <ArrayFieldEditor title="Company snapshot" items={snapshot.map((r) => ({ label: r.label ?? "", value: r.value ?? "" }))} columns={[{ key: "label", label: "Label" }, { key: "value", label: "Value" }]} minItems={1} createItem={() => ({ label: "", value: "" })} onChange={(rows) => patch({ companySnapshot: rows })} />;
  if (section === "values") return <ArrayFieldEditor title="Core values" items={values.map((v) => ({ title: v.title ?? "", body: v.body ?? "", icon: v.icon ?? "eye" }))} columns={[{ key: "title", label: "Title" }, { key: "body", label: "Body", multiline: true }, { key: "icon", label: "Icon key", help: "e.g. eye, gem, leaf, shield" }]} minItems={1} createItem={() => ({ title: "", body: "", icon: "eye" })} onChange={(rows) => patch({ companyValues: rows })} />;
  if (section === "core-areas") return <ArrayFieldEditor title="Core business areas" items={areas.map((a) => ({ title: a.title ?? "", body: a.body ?? "" }))} columns={[{ key: "title", label: "Title" }, { key: "body", label: "Body", multiline: true }]} minItems={1} createItem={() => ({ title: "", body: "" })} onChange={(rows) => patch({ coreBusinessAreas: rows })} />;
  if (section === "strengths") return <ArrayFieldEditor title="Competitive strengths" items={strengths.map((s) => ({ title: s.title ?? "", body: s.body ?? "" }))} columns={[{ key: "title", label: "Title" }, { key: "body", label: "Body", multiline: true }]} minItems={1} createItem={() => ({ title: "", body: "" })} onChange={(rows) => patch({ competitiveStrengths: rows })} />;
  if (section === "governance") return <StringListEditor title="Governance intro" items={governance} onChange={(governanceIntro) => patch({ governanceIntro })} minItems={1} />;
  if (section === "portfolio") return <ArrayFieldEditor title="Portfolio table" items={portfolio.map((r) => ({ project: r.project ?? "", location: r.location ?? "", sector: r.sector ?? "" }))} columns={[{ key: "project", label: "Project" }, { key: "location", label: "Location" }, { key: "sector", label: "Sector" }]} minItems={0} createItem={() => ({ project: "", location: "", sector: "" })} onChange={(rows) => patch({ portfolioTableRows: rows })} />;
  if (section === "ceo") return <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3"><div><Label>CEO quote</Label><Textarea value={ceo.quote ?? ""} onChange={(e) => patch({ ceoProfile: { ...ceo, quote: e.target.value } })} className="mt-1.5 min-h-24" /></div><div><Label>CEO name</Label><Input value={ceo.name ?? ""} onChange={(e) => patch({ ceoProfile: { ...ceo, name: e.target.value } })} className="mt-1.5" /></div><div><Label>CEO title</Label><Input value={ceo.title ?? ""} onChange={(e) => patch({ ceoProfile: { ...ceo, title: e.target.value } })} className="mt-1.5" /></div></div>;
  if (section === "growth-clients") return <div className="space-y-4"><div><Label>Growth outlook</Label><Textarea value={typeof data.growthOutlook === "string" ? data.growthOutlook : ""} onChange={(e) => patch({ growthOutlook: e.target.value })} className="mt-1.5 min-h-24" /></div><div className="grid gap-4 sm:grid-cols-2"><div><Label>Clients title</Label><Input value={clients.title ?? ""} onChange={(e) => patch({ clientsPartners: { ...clients, title: e.target.value } })} className="mt-1.5" /></div><div><Label>Clients note</Label><Textarea value={clients.note ?? ""} onChange={(e) => patch({ clientsPartners: { ...clients, note: e.target.value } })} className="mt-1.5 min-h-20" /></div></div></div>;
  if (section === "international") return <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3"><div><Label>UAE presence</Label><Textarea value={intl.uae ?? ""} onChange={(e) => patch({ internationalPresence: { ...intl, uae: e.target.value } })} className="mt-1.5 min-h-20" /></div><div><Label>Regional links</Label><Textarea value={intl.regional ?? ""} onChange={(e) => patch({ internationalPresence: { ...intl, regional: e.target.value } })} className="mt-1.5 min-h-20" /></div><div><Label>Cross-border</Label><Textarea value={intl.crossBorder ?? ""} onChange={(e) => patch({ internationalPresence: { ...intl, crossBorder: e.target.value } })} className="mt-1.5 min-h-20" /></div></div>;
  if (section === "market") return <ArrayFieldEditor title="Market positioning" items={marketPositioning.map((m) => ({ title: m.title ?? "", body: m.body ?? "" }))} columns={[{ key: "title", label: "Title" }, { key: "body", label: "Body", multiline: true }]} minItems={0} createItem={() => ({ title: "", body: "" })} onChange={(rows) => patch({ marketPositioning: rows })} />;
  if (section === "standards") return <div className="grid gap-4"><div><Label>Technology standards</Label><Textarea value={typeof data.technologyStandards === "string" ? data.technologyStandards : ""} onChange={(e) => patch({ technologyStandards: e.target.value })} className="mt-1.5 min-h-28" /></div><div><Label>Sustainability standards</Label><Textarea value={typeof data.sustainabilityStandards === "string" ? data.sustainabilityStandards : ""} onChange={(e) => patch({ sustainabilityStandards: e.target.value })} className="mt-1.5 min-h-28" /></div></div>;
  if (section === "org") return <OrgStructureEditor value={org} onChange={(organizationalStructure) => patch({ organizationalStructure })} />;
  return <p className="text-sm text-muted-foreground">Unknown section.</p>;
}
