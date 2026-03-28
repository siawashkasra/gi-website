import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${siteConfig.name} for partnerships, media, and project inquiries.`,
  openGraph: { title: `Contact | ${siteConfig.name}` },
};

export default function ContactPage() {
  return (
    <div className="border-b border-border/60">
      <div className="ds-container py-16 sm:py-20 lg:py-24">
        <ContactSection />
      </div>
    </div>
  );
}
