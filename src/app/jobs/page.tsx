import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jobs",
  description: `Careers and opportunities at ${siteConfig.name}.`,
  openGraph: { title: `Jobs | ${siteConfig.name}` },
};

export default function JobsPage() {
  return (
    <div className="border-b border-border/60">
      <div className="ds-container ds-section max-w-3xl">
        <SectionHeading title="Jobs" description={`${siteConfig.name} has provided thousands of Afghans with jobs and helped build skills to serve society. We post roles here as they become available; you may also reach out with your CV and area of interest.`} />
        <p className="mt-8 text-muted-foreground">
          For general employment inquiries, email <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline-offset-4 hover:underline">{siteConfig.email}</a> or use our contact form.
        </p>
        <Button render={<Link href="/contact" />} nativeButton={false} variant="luxurySolid" size="lg" className="mt-10">
          Contact us
        </Button>
      </div>
    </div>
  );
}
