import { cn } from "@/lib/utils";

export function BidiLtr({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span dir="ltr" className={cn("inline [unicode-bidi:isolate]", className)}>{children}</span>;
}
