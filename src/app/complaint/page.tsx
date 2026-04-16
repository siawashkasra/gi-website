import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Complaint",
  description: `Submit feedback or a complaint regarding ${siteConfig.name} services.`,
  openGraph: { title: `Complaint | ${siteConfig.name}` },
};

export default function ComplaintPage() {
  return (
    <div className="border-b border-border/60">
      <div className="ds-container ds-section max-w-3xl">
        <SectionHeading title="Complaint" description="We take service quality seriously. Share details of your concern and a member of our team will review your message and respond through the channel you provide." />
        <p className="mt-8 text-muted-foreground">
          Please use the contact form and select a clear subject line, or email <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline-offset-4 hover:underline">{siteConfig.email}</a> with &quot;Complaint&quot; in the subject.
        </p>
        <Button render={<Link href="/contact" />} nativeButton={false} variant="luxurySolid" size="lg" className="mt-10">
          Go to contact form
        </Button>
      </div>
    </div>
  );
}
