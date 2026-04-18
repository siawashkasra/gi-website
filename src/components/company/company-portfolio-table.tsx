import { SectionHeading } from "@/components/shared/section-heading";
import { portfolioTableRows } from "@/data/company-profile";

export function CompanyPortfolioTable() {
  return (
    <section id="portfolio" className="ds-section border-b border-border/60 bg-white" aria-labelledby="portfolio-heading">
      <div className="ds-container">
        <div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]">
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <SectionHeading id="portfolio-heading" eyebrow="Developments" title="Portfolio overview" description="Strategic positioning by project and sector." />
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="overflow-x-auto border-t border-border/50 bg-white p-0">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-gradient-to-b from-gi-navy/[0.06] to-gi-navy/[0.02] text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-sans sm:px-6">Project</th>
                  <th className="px-5 py-4 font-sans sm:px-6">Location</th>
                  <th className="px-5 py-4 font-sans sm:px-6">Sector</th>
                </tr>
              </thead>
              <tbody>
                {portfolioTableRows.map((row) => (
                  <tr key={row.project} className="border-t border-border/50 bg-white transition-colors hover:bg-muted/20">
                    <td className="px-5 py-4 font-semibold text-foreground sm:px-6">{row.project}</td>
                    <td className="px-5 py-4 text-muted-foreground sm:px-6">{row.location}</td>
                    <td className="px-5 py-4 text-muted-foreground sm:px-6">{row.sector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-border/50 bg-white px-7 py-5 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:py-6 sm:text-xs">Indicative portfolio list; visit project pages for specifications and media.</p>
        </div>
      </div>
    </section>
  );
}
