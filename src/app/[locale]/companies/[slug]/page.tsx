import type { Metadata } from "next";
import Image from "next/image";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getCompanyPageSlugs } from "@/data/companies";
import { getLocalizedCompanies, type Messages } from "@/lib/i18n/localized-data";
import { getMergedCompanyForCompanyPage } from "@/lib/media/merge";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getCompanyPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = await getMessages();
  const merged = await getMergedCompanyForCompanyPage(slug);
  const localized = getLocalizedCompanies(messages as Messages).find((c) => c.slug === slug) ?? merged;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const site = await getTranslations({ locale, namespace: "site" });
  if (!localized) return { title: tMeta("companyFallback") };
  return {
    title: localized.name,
    description: localized.description,
    openGraph: { title: `${localized.name} | ${site("name")}`, description: localized.description },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const tCompanies = await getTranslations("companies");
  const tNav = await getTranslations("nav");
  const messages = await getMessages();
  const merged = await getMergedCompanyForCompanyPage(slug);
  if (!merged) notFound();
  const localized = getLocalizedCompanies(messages as Messages).find((c) => c.slug === slug);
  const company = localized ? { ...merged, ...localized } : merged;
  return (
    <article className="border-b border-border/60 bg-background">
      <div className="ds-container ds-section max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-10 flex h-28 w-full max-w-xs items-center justify-center md:h-32 md:max-w-sm">
            <Image src={company.logo} alt={tCompanies("logoAlt", { name: company.name })} width={400} height={240} className="h-auto w-full object-contain" priority />
          </div>
          <p className="text-eyebrow mb-3">{company.industry}</p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.1]">{company.name}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{company.description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="luxurySolid" size="lg" nativeButton={false} render={<Link href="/contact" />}>
              {tCompanies("getInTouch")}
            </Button>
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/" />}>
              {tNav("home")}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
