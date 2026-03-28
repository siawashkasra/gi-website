"use server";

export type ContactState = { ok?: boolean; message?: string };

export async function submitContact(_prev: ContactState | null, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name) return { message: "Please enter your name." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: "Please enter a valid email." };
  if (!message) return { message: "Please enter a message." };
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, message: "Thank you. Our team will respond shortly." };
}
