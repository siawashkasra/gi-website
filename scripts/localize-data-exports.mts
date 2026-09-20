import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = join(import.meta.dirname, "..");

type Rule = [from: string, to: string];

function applyRules(text: string, rules: Rule[]): string {
  let out = text;
  for (const [from, to] of rules) out = out.split(from).join(to);
  return out;
}

const faRules: Rule[] = JSON.parse(readFileSync(join(root, "messages/localize-replacements.fa-AF.json"), "utf8"));
const psRules: Rule[] = JSON.parse(readFileSync(join(root, "messages/localize-replacements.ps.json"), "utf8"));

function patchFile(filename: string, rules: Rule[]) {
  const path = join(root, "messages", filename);
  const raw = readFileSync(path, "utf8");
  writeFileSync(path, applyRules(raw, rules));
  console.log(`Patched ${filename}`);
}

patchFile("_data-export.fa-AF.json", faRules);
patchFile("_data-export.ps.json", psRules);
