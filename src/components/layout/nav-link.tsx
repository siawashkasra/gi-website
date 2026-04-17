"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <span className={cn("group relative inline-flex text-inherit", className)}>
      <Link href={href} onClick={onClick} className="relative z-10 rounded-lg px-3 py-2 text-sm font-medium text-current transition-colors hover:opacity-90">
        {children}
      </Link>
      <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-gi-gold transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden />
    </span>
  );
}
