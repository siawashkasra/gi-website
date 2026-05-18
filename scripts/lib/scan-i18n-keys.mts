import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export type I18nKeyRef = { namespace: string; key: string; file: string };

const SRC_ROOT = join(import.meta.dirname, "../..", "src");

const DYNAMIC_KEYS: I18nKeyRef[] = [
  { namespace: "hero", key: "stats.residential", file: "dynamic" },
  { namespace: "hero", key: "stats.retail", file: "dynamic" },
  { namespace: "hero", key: "stats.founded", file: "dynamic" },
  { namespace: "hero", key: "stats.industrialJobs", file: "dynamic" },
  { namespace: "projects.heroIntro", key: "eyebrow", file: "dynamic" },
  { namespace: "projects.heroIntro", key: "title", file: "dynamic" },
  { namespace: "projects.heroIntro", key: "blurb", file: "dynamic" },
  { namespace: "projects.status", key: "completed", file: "dynamic" },
  { namespace: "projects.status", key: "ongoing", file: "dynamic" },
  { namespace: "projects.status", key: "operational", file: "dynamic" },
  { namespace: "projects.status", key: "active", file: "dynamic" },
  { namespace: "projects.status", key: "operationalDevelopment", file: "dynamic" },
  { namespace: "projects.listings", key: "types.apartment", file: "dynamic" },
  { namespace: "projects.listings", key: "types.shop", file: "dynamic" },
  { namespace: "projects.listings", key: "availabilityLabels.available", file: "dynamic" },
  { namespace: "projects.listings", key: "availabilityLabels.reserved", file: "dynamic" },
  { namespace: "projects.listings", key: "availabilityLabels.sold", file: "dynamic" },
  { namespace: "nav.languageSwitcher", key: "english", file: "dynamic" },
  { namespace: "nav.languageSwitcher", key: "dari", file: "dynamic" },
  { namespace: "nav.languageSwitcher", key: "pashto", file: "dynamic" },
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(tsx?)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function rel(file: string) {
  return file.replace(`${SRC_ROOT}/`, "");
}

function lineOf(content: string, index: number) {
  return content.slice(0, index).split("\n").length;
}

type Binding = { var: string; namespace: string; line: number };

function collectBindings(content: string): Binding[] {
  const bindings: Binding[] = [];
  const re = /(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:\{[^}]*namespace:\s*)?["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) bindings.push({ var: m[1], namespace: m[2], line: lineOf(content, m.index) });
  return bindings;
}

function namespaceForCall(bindings: Binding[], varName: string, line: number): string | null {
  let ns: string | null = null;
  let bindLine = 0;
  for (const b of bindings) {
    if (b.var !== varName || b.line > line) continue;
    if (b.line >= bindLine) {
      bindLine = b.line;
      ns = b.namespace;
    }
  }
  return ns;
}

function collectKeys(content: string, bindings: Binding[], file: string, out: I18nKeyRef[]) {
  const callRe = /\b(t\w*)\(\s*["']([a-zA-Z][\w.]*)["']/g;
  let m: RegExpExecArray | null;
  while ((m = callRe.exec(content))) {
    const line = lineOf(content, m.index);
    const ns = namespaceForCall(bindings, m[1], line);
    if (!ns) continue;
    out.push({ namespace: ns, key: m[2], file: rel(file) });
  }
  const tplRe = /\b(t\w*)\(\s*`([a-zA-Z][\w.]*)\$\{/g;
  while ((m = tplRe.exec(content))) {
    const line = lineOf(content, m.index);
    const ns = namespaceForCall(bindings, m[1], line);
    if (!ns) continue;
    const prefix = m[2];
    for (const d of DYNAMIC_KEYS.filter((d) => d.namespace === ns && d.key.startsWith(prefix))) out.push({ ...d, file: rel(file) });
  }
}

export function scanSourceTranslationKeys(): I18nKeyRef[] {
  const out: I18nKeyRef[] = [];
  const seen = new Set<string>();
  const add = (ref: I18nKeyRef) => {
    const id = `${ref.namespace}\0${ref.key}`;
    if (seen.has(id)) return;
    seen.add(id);
    out.push(ref);
  };
  for (const ref of DYNAMIC_KEYS) add(ref);
  for (const file of walk(SRC_ROOT)) {
    const content = readFileSync(file, "utf8");
    if (!content.includes("Translations")) continue;
    const bindings = collectBindings(content);
    const found: I18nKeyRef[] = [];
    collectKeys(content, bindings, file, found);
    for (const ref of found) add(ref);
  }
  return out;
}

export function hasMessageKey(messages: Record<string, unknown>, namespace: string, key: string): boolean {
  const parts = namespace.split(".");
  let cur: unknown = messages;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object" || !(p in (cur as object))) return false;
    cur = (cur as Record<string, unknown>)[p];
  }
  const keyParts = key.split(".");
  for (const p of keyParts) {
    if (cur === null || typeof cur !== "object" || !(p in (cur as object))) return false;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string";
}

export function assertAllKeysPresent(messages: Record<string, unknown>, locale: string, refs: I18nKeyRef[]) {
  const missing: string[] = [];
  for (const ref of refs) {
    if (!hasMessageKey(messages, ref.namespace, ref.key)) missing.push(`${ref.namespace}.${ref.key} (from ${ref.file})`);
  }
  if (missing.length) {
    throw new Error(`[${locale}] missing ${missing.length} translation key(s):\n${missing.map((m) => `  - ${m}`).join("\n")}`);
  }
}
