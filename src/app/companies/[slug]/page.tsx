import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCompanyForCompanyPage, getCompanyPageSlugs } from "@/data/companies";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCompanyPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyForCompanyPage(slug);
  if (!company) return { title: "Company" };
  return {
    title: company.name,
    description: company.description,
    openGraph: { title: `${company.name} | ${siteConfig.name}`, description: company.description },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyForCompanyPage(slug);
  if (!company) notFound();
  return (
    <article className="border-b border-border/60 bg-background">
      <div className="ds-container ds-section max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-10 flex h-28 w-full max-w-xs items-center justify-center md:h-32 md:max-w-sm">
            <Image src={company.logo} alt={`${company.name} logo`} width={400} height={240} className="h-auto w-full object-contain" priority />
          </div>
          <p className="text-eyebrow mb-3">{company.industry}</p>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.12]">{company.name}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{company.description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="luxurySolid" size="lg" nativeButton={false} render={<Link href="/contact" />}>
              Get in touch
            </Button>
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/" />}>
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
