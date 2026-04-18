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
      <div className="ds-container bg-white pt-0 pb-20 sm:pb-28 lg:pb-32">
        <ContactSection />
      </div>
    </div>
  );
}
