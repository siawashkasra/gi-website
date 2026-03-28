import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ProjectCardProps = { project: Project; priority?: boolean };

export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/80 py-0 transition-shadow duration-300 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" priority={priority} />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-80" aria-hidden />
          <Badge className="absolute left-4 top-4 border-0 bg-background/90 text-foreground backdrop-blur-sm" variant="secondary">
            {project.category}
          </Badge>
        </div>
        <CardContent className="gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-xl font-medium tracking-tight text-card-foreground">{project.name}</h3>
            <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.excerpt}</p>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">{project.status}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
