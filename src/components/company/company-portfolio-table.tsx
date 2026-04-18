import { SectionHeading } from "@/components/shared/section-heading";
import { portfolioTableRows } from "@/data/company-profile";

export function CompanyPortfolioTable() {
  return (
    <section id="portfolio" className="ds-section border-b border-border/60 bg-section" aria-labelledby="portfolio-heading">
      <div className="ds-container">
        <SectionHeading id="portfolio-heading" eyebrow="Developments" title="Portfolio overview" description="Strategic positioning by project and sector." />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border/60 shadow-sm">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Project</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Sector</th>
              </tr>
            </thead>
            <tbody>
              {portfolioTableRows.map((row) => (
                <tr key={row.project} className="border-t border-border/60 bg-card">
                  <td className="px-5 py-4 font-semibold text-foreground">{row.project}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.location}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
