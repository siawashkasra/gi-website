export function isNumericPathSegment(p: string) {
  return /^\d+$/.test(p);
}

export function objectToArray(obj: Record<string, unknown>): unknown[] {
  const keys = Object.keys(obj).filter(isNumericPathSegment).map((k) => parseInt(k, 10)).sort((a, b) => a - b);
  if (keys.length === 0) return [];
  const arr: unknown[] = [];
  for (const k of keys) arr[k] = obj[String(k)];
  return arr;
}

export function normalizePseudoArray(value: unknown): unknown {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map((item) => (item && typeof item === "object" && !Array.isArray(item) ? normalizePseudoArrayObject(item as Record<string, unknown>) : item));
  if (typeof value === "object") return normalizePseudoArrayObject(value as Record<string, unknown>);
  return value;
}

export function normalizePseudoArrayObject(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).every(isNumericPathSegment)) out[k] = objectToArray(v as Record<string, unknown>).map((item) => (item && typeof item === "object" && !Array.isArray(item) ? normalizePseudoArrayObject(item as Record<string, unknown>) : item));
    else if (v && typeof v === "object" && !Array.isArray(v)) out[k] = normalizePseudoArrayObject(v as Record<string, unknown>);
    else if (Array.isArray(v)) out[k] = v.map((item) => (item && typeof item === "object" && !Array.isArray(item) ? normalizePseudoArrayObject(item as Record<string, unknown>) : item));
    else out[k] = v;
  }
  return out;
}

export function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    if (Array.isArray(cur)) {
      const idx = parseInt(p, 10);
      if (!Number.isFinite(idx)) return undefined;
      cur = cur[idx];
    } else if (typeof cur === "object") {
      cur = (cur as Record<string, unknown>)[p];
    } else return undefined;
  }
  return cur;
}

export function setByPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split(".");
  let cur: Record<string, unknown> | unknown[] = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i]!;
    const nextP = parts[i + 1]!;
    const nextIsIndex = isNumericPathSegment(nextP);
    if (Array.isArray(cur)) {
      const idx = parseInt(p, 10);
      while (cur.length <= idx) cur.push(nextIsIndex ? {} : {});
      const slot = cur[idx];
      if (slot == null || typeof slot !== "object" || Array.isArray(slot)) cur[idx] = nextIsIndex ? {} : {};
      cur = cur[idx] as Record<string, unknown>;
    } else {
      let next = cur[p];
      if (next == null || typeof next !== "object") {
        cur[p] = nextIsIndex ? [] : {};
        next = cur[p];
      } else if (nextIsIndex && !Array.isArray(next)) {
        cur[p] = objectToArray(next as Record<string, unknown>);
        next = cur[p];
      }
      if (Array.isArray(next)) {
        const idx = parseInt(nextP, 10);
        while (next.length <= idx) next.push({});
        cur = next[idx] as Record<string, unknown>;
        i++;
      } else {
        cur = next as Record<string, unknown>;
      }
    }
  }
  const last = parts[parts.length - 1]!;
  if (Array.isArray(cur)) cur[parseInt(last, 10)] = value;
  else cur[last] = value;
}

export function buildPayloadFromFields(values: Record<string, string>, fields: { key: string }[]) {
  const payload: Record<string, unknown> = {};
  for (const f of fields) setByPath(payload, f.key, values[f.key] ?? "");
  return normalizePseudoArrayObject(payload) as Record<string, unknown>;
}

export function extractFieldValues(payload: Record<string, unknown> | null, fields: { key: string }[]) {
  const normalized = payload ? (normalizePseudoArrayObject(payload) as Record<string, unknown>) : null;
  const next: Record<string, string> = {};
  for (const f of fields) {
    const v = normalized ? getByPath(normalized, f.key) : undefined;
    next[f.key] = typeof v === "string" ? v : v != null ? String(v) : "";
  }
  return next;
}
