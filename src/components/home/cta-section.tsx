import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="contact-cta" className="ds-section border-t border-border bg-primary text-primary-foreground">
      <div className="ds-container">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">Get in touch</h2>
            <p className="mt-5 font-sans text-lg font-normal leading-relaxed text-white/85">Share your name, email, and message — we respond to serious inquiries about our projects and services.</p>
            <p className="mt-5 font-sans text-sm text-white/70">
              Hiring? See open roles on our{" "}
              <Link href="/jobs" className="font-semibold text-white underline-offset-4 transition-colors hover:text-[#2f6ea5] hover:underline">
                Jobs
              </Link>{" "}
              page.
            </p>
          </div>
          <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="h-14 shrink-0 rounded-xl border-2 border-white/30 bg-white px-10 font-semibold text-primary shadow-md hover:scale-[1.02] hover:border-white hover:bg-[#f5f7fa] hover:text-primary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
