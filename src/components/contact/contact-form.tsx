"use client";

import { useActionState, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = { compact?: boolean };

export function ContactForm({ compact }: ContactFormProps) {
  // Remounting on reset clears the action state and the form fields, so a
  // successful submission cannot be accidentally resent.
  const [instance, setInstance] = useState(0);
  return <ContactFormInstance key={instance} compact={compact} onReset={() => setInstance((n) => n + 1)} />;
}

function ContactFormInstance({ compact, onReset }: ContactFormProps & { onReset: () => void }) {
  const t = useTranslations("contact.form");
  const [state, formAction, pending] = useActionState(submitContact, null as ContactState | null);
  const gap = compact ? "space-y-5" : "space-y-7";
  const gridGap = compact ? "gap-5" : "gap-7";

  if (state?.ok) {
    return (
      <div role="status" aria-live="polite" className={`flex flex-col items-center gap-4 text-center ${compact ? "py-6" : "py-10"}`}>
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <p className="font-heading text-lg font-semibold tracking-tight text-gi-navy">{t("sent")}</p>
          <p className="mx-auto max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">{state.message}</p>
        </div>
        <Button type="button" variant="outline" onClick={onReset} className="mt-1 h-11 rounded-xl px-6 font-semibold">
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className={gap}>
      <div className={`grid sm:grid-cols-2 ${gridGap}`}>
        <div className="space-y-2">
          <Label htmlFor={compact ? "home-name" : "name"}>{t("fullName")}</Label>
          <Input id={compact ? "home-name" : "name"} name="name" autoComplete="name" required placeholder={t("namePlaceholder")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={compact ? "home-email" : "email"}>{t("email")}</Label>
          <Input id={compact ? "home-email" : "email"} name="email" type="email" autoComplete="email" required placeholder={t("emailPlaceholder")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={compact ? "home-phone" : "phone"}>{t("phone")}</Label>
        <Input id={compact ? "home-phone" : "phone"} name="phone" type="tel" autoComplete="tel" placeholder={t("phonePlaceholder")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor={compact ? "home-message" : "message"}>{t("message")}</Label>
        <Textarea id={compact ? "home-message" : "message"} name="message" required rows={compact ? 3 : 5} placeholder={t("messagePlaceholder")} className={compact ? "min-h-24" : "min-h-32"} />
      </div>
      {state?.message ? (
        <p className="font-sans text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} size="lg" className={`h-12 min-w-[11rem] rounded-xl px-8 font-semibold ${compact ? "mt-1" : "mt-2"}`}>
        {pending ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
