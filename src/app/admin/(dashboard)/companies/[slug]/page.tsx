import { notFound } from "next/navigation";
import { companies } from "@/data/companies";

export default async function AdminCompanySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!companies.some((c) => c.slug === slug)) notFound();
  return null;
}
