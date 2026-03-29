import { designClasses } from "@/lib/design-system";
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
      {eyebrow ? <p className={cn(designClasses.eyebrow, "mb-3")}>{eyebrow}</p> : null}
      <h2 id={id} className={designClasses.headingXl}>
        {title}
      </h2>
      {description ? <p className="mt-5 font-sans text-base font-normal leading-relaxed text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}
