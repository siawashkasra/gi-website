const attempts = new Map<string, { n: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 12;

export function allowLoginAttempt(ip: string) {
  const now = Date.now();
  const row = attempts.get(ip);
  if (!row || now > row.resetAt) {
    attempts.set(ip, { n: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (row.n >= MAX_ATTEMPTS) return false;
  row.n += 1;
  return true;
}
