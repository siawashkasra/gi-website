import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className, id }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}
