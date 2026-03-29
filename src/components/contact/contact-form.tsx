"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = { compact?: boolean };

export function ContactForm({ compact }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, null as ContactState | null);
  const gap = compact ? "space-y-5" : "space-y-7";
  const gridGap = compact ? "gap-5" : "gap-7";
  return (
    <form action={formAction} className={gap}>
      <div className={`grid sm:grid-cols-2 ${gridGap}`}>
        <div className="space-y-2">
          <Label htmlFor={compact ? "home-name" : "name"}>Full name</Label>
          <Input id={compact ? "home-name" : "name"} name="name" autoComplete="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={compact ? "home-email" : "email"}>Email</Label>
          <Input id={compact ? "home-email" : "email"} name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={compact ? "home-phone" : "phone"}>Phone (optional)</Label>
        <Input id={compact ? "home-phone" : "phone"} name="phone" type="tel" autoComplete="tel" placeholder="+93 …" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={compact ? "home-message" : "message"}>Message</Label>
        <Textarea id={compact ? "home-message" : "message"} name="message" required rows={compact ? 3 : 5} placeholder="How can we help?" className={compact ? "min-h-24" : "min-h-32"} />
      </div>
      {state?.message ? (
        <p className={`text-sm ${state.ok ? "text-primary" : "text-destructive"}`} role={state.ok ? "status" : "alert"}>
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} size="lg" className={`h-12 min-w-[11rem] rounded-xl px-8 font-semibold ${compact ? "mt-1" : "mt-2"}`}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
