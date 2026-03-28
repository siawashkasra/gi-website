import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${siteConfig.name} for partnerships, media, and project inquiries.`,
  openGraph: { title: `Contact | ${siteConfig.name}` },
};

export default function ContactPage() {
  return (
    <div className="border-b border-border/60">
      <div className="ds-container py-16 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Contact" title="Begin a private conversation" description="Share your objectives and a director will respond to qualified inquiries." />
            <dl className="mt-12 space-y-6 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</dt>
                <dd className="mt-1 text-foreground">{siteConfig.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${siteConfig.email}`} className="text-primary underline-offset-4 hover:underline">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-primary underline-offset-4 hover:underline">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
