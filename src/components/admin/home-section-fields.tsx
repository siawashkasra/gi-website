"use client";

import Link from "next/link";
import { ArrayFieldEditor } from "@/components/admin/array-field-editor";
import { useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { FeaturedProjectsAdmin } from "@/components/admin/featured-projects-admin";
import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { Button } from "@/components/ui/button";
import { adminHomeSectionFallbacks } from "@/lib/admin/media-slot-defaults";
import { sectionHomeAboutKey, sectionHomeCeoKey, sectionHomeMilestonesKey } from "@/lib/media/placement-keys";

type Testimonial = { quote: string; attribution: string; context: string };
type Milestone = { year: string; title: string; detail: string };
type Pillar = { title: string; description: string };

const defaultTestimonial = (): Testimonial => ({ quote: "", attribution: "", context: "" });
const defaultMilestone = (): Milestone => ({ year: "", title: "", detail: "" });
const defaultPillar = (): Pillar => ({ title: "", description: "" });

export function HomeSectionFields({ section, placements }: { section: string; placements: Map<string, { publicPath: string; alt: string } | null | undefined> }) {
  const { data, setPayload } = useCmsDocumentContext();
  const testimonials = Array.isArray(data.testimonials) ? (data.testimonials as Testimonial[]) : [];
  const milestones = Array.isArray(data.milestones) ? (data.milestones as Milestone[]) : [];
  const pillars = Array.isArray(data.standardPillars) ? (data.standardPillars as Pillar[]) : [];
  if (section === "testimonials") return <ArrayFieldEditor title="Testimonials" description="Partner quotes on the home page." items={testimonials.map((t) => ({ quote: t.quote ?? "", attribution: t.attribution ?? "", context: t.context ?? "" }))} columns={[{ key: "quote", label: "Quote", multiline: true }, { key: "attribution", label: "Attribution" }, { key: "context", label: "Context" }]} minItems={1} createItem={defaultTestimonial} onChange={(items) => setPayload({ ...data, testimonials: items })} />;
  if (section === "milestones") return <ArrayFieldEditor title="Milestones" description="Track record timeline on the home page." items={milestones.map((m) => ({ year: m.year ?? "", title: m.title ?? "", detail: m.detail ?? "" }))} columns={[{ key: "year", label: "Year" }, { key: "title", label: "Title" }, { key: "detail", label: "Detail", multiline: true }]} minItems={1} createItem={defaultMilestone} onChange={(items) => setPayload({ ...data, milestones: items })} />;
  if (section === "standards") return <ArrayFieldEditor title="Standards pillars" description="Technology, sustainability, and governance blocks." items={pillars.map((p) => ({ title: p.title ?? "", description: p.description ?? "" }))} columns={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]} minItems={1} createItem={defaultPillar} onChange={(items) => setPayload({ ...data, standardPillars: items })} />;
  if (section === "images") return (
    <div className="space-y-4">
      <Button render={<Link href="/admin/heroes" />} nativeButton={false} variant="outline" size="sm">Edit page hero image</Button>
      <div className="grid gap-6 md:grid-cols-2">
        <MediaSlotEditor label="About section" placementKey={sectionHomeAboutKey()} current={placements.get(sectionHomeAboutKey()) ?? null} fallbackImage={adminHomeSectionFallbacks.about} />
        <MediaSlotEditor label="Milestones section" placementKey={sectionHomeMilestonesKey()} current={placements.get(sectionHomeMilestonesKey()) ?? null} fallbackImage={adminHomeSectionFallbacks.milestones} />
        <MediaSlotEditor label="CEO message portrait" placementKey={sectionHomeCeoKey()} current={placements.get(sectionHomeCeoKey()) ?? null} fallbackImage={adminHomeSectionFallbacks.ceo} variant="portrait" />
      </div>
    </div>
  );
  if (section === "featured") return <FeaturedProjectsAdmin />;
  return <p className="text-sm text-muted-foreground">Unknown section.</p>;
}
