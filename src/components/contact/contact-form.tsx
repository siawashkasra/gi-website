"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null as ContactState | null);
  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" autoComplete="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+93 …" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={5} placeholder="How can we help?" className="min-h-32" />
      </div>
      {state?.message ? (
        <p className={`text-sm ${state.ok ? "text-primary" : "text-destructive"}`} role={state.ok ? "status" : "alert"}>
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} size="lg" className="h-11 min-w-[10rem]">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
