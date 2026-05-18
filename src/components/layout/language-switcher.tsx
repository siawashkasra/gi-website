"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const options = [{ code: "en" as const, labelKey: "english" as const }, { code: "fa-AF" as const, labelKey: "dari" as const }, { code: "ps" as const, labelKey: "pashto" as const }];

type LanguageSwitcherProps = { className?: string; dropUp?: boolean };

export function LanguageSwitcher({ className, dropUp }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav.languageSwitcher");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.code === locale) ?? options[0];
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return (
    <div ref={ref} className={cn("relative", className)}>
      <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/35 bg-white/10 px-2.5 text-sm font-medium text-white transition-colors hover:bg-white/16" aria-expanded={open} aria-haspopup="listbox" aria-label={t("label")} onClick={() => setOpen((v) => !v)}>
        <Globe className="size-4 shrink-0" aria-hidden />
        <span className="max-w-[5.5rem] truncate sm:max-w-none">{t(current.labelKey)}</span>
        <ChevronDown className={cn("size-3.5 shrink-0 opacity-80 transition-transform rtl:scale-x-[-1]", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <ul className={cn("absolute end-0 z-[400] min-w-[9rem] overflow-hidden rounded-xl border border-white/20 bg-gi-navy py-1 shadow-xl", dropUp ? "bottom-full mb-2" : "top-full mt-2")} role="listbox">
          {options.map((o) => (
            <li key={o.code} role="option" aria-selected={o.code === locale}>
              <button type="button" className={cn("w-full px-4 py-2.5 text-start text-sm transition-colors hover:bg-white/10", o.code === locale ? "font-semibold text-white" : "text-white/80")} onClick={() => { setOpen(false); router.replace(pathname, { locale: o.code }); }}>
                {t(o.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
