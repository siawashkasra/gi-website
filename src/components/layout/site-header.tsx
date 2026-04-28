import type { ComponentProps } from "react";
import { Header } from "@/components/layout/Header";

export function SiteHeader(props: ComponentProps<typeof Header>) {
  return <Header {...props} />;
}
