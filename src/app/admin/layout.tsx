import type { Metadata, Viewport } from "next";
import { siteFontManrope } from "@/lib/site-fonts";
import "@/styles/globals.css";
import "@/styles/admin.css";

export const metadata: Metadata = { title: { default: "Gulbahar CMS", template: "%s | Gulbahar CMS" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d1b3e" };

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${siteFontManrope.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
