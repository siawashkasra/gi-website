import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.excerpt,
    openGraph: { title: `${project.name} | ${siteConfig.name}`, description: project.excerpt, images: [{ url: project.image, width: 1200, height: 630, alt: project.name }] },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const specs = [
    { label: "Location", value: project.location },
    { label: "Status", value: project.status },
    { label: "Year", value: project.year },
    { label: "Scale", value: project.area },
  ];
  return (
    <article className="border-b border-border/60">
      <div className="relative aspect-[21/9] min-h-[14rem] w-full sm:min-h-[18rem] lg:aspect-[3/1]">
        <Image src={project.image} alt={project.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/35 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Button render={<Link href="/projects" />} nativeButton={false} variant="outline" size="sm" className="mb-6 border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
            <ArrowLeft className="mr-2 size-4" aria-hidden />
            All projects
          </Button>
          <Badge className="border-0 bg-white/15 text-white backdrop-blur-md">{project.category}</Badge>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{project.excerpt}</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-medium tracking-tight">Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{project.description}</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={src} alt={`${project.name} gallery ${i + 1}`} fill className="object-cover" sizes="(max-width:1024px) 100vw, 33vw" loading={i === 0 ? "eager" : "lazy"} />
                </div>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-border/80 bg-muted/30 p-6 lg:sticky lg:top-24">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Facts</h3>
            <ul className="mt-4 space-y-4">
              {specs.map((s) => (
                <li key={s.label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-medium text-foreground">{s.value}</p>
                </li>
              ))}
            </ul>
            <Separator className="my-6" />
            <Button render={<Link href="/contact" />} nativeButton={false} className="w-full" size="lg">
              Request details
            </Button>
          </aside>
        </div>
      </div>
    </article>
  );
}
