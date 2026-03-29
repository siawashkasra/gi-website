import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="contact-cta" className="ds-section border-t border-border/60 bg-[#0f172a] text-white">
      <div className="ds-container">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">Share your name, email, and message — we respond to serious inquiries about our projects and services.</p>
            <p className="mt-5 text-sm text-white/55">
              Hiring? See open roles on our{" "}
              <Link href="/jobs" className="font-semibold text-[#c9a96e] underline-offset-4 transition-colors hover:text-[#dcc090] hover:underline">
                Jobs
              </Link>{" "}
              page.
            </p>
          </div>
          <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="h-14 shrink-0 rounded-xl px-10 font-semibold">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
