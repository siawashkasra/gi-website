"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/session");
      const j = (await res.json()) as { ok?: boolean };
      if (j.ok) router.replace("/admin");
      setChecking(false);
    })();
  }, [router]);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setErr(data.message ?? "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }
  if (checking) return <div className="admin-cms flex min-h-screen items-center justify-center bg-gi-navy text-white/70 text-sm">Loading…</div>;
  return (
    <div className="admin-cms relative flex min-h-screen items-center justify-center overflow-hidden bg-gi-navy px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,162,39,0.18),transparent)]" aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-gi-navy text-sm font-bold text-white">GI</div>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-gi-navy">Gulbahar CMS</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your website</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" placeholder="Password" autoComplete="current-password" />
          {err ? <p className="text-sm text-destructive">{err}</p> : null}
          <Button type="submit" className="w-full bg-gi-navy hover:bg-gi-navy/90" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
