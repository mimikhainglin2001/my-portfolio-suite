/// <reference types="node" />

import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export default async function handler(req: any, res: any) {
  // Basic CORS to support local preview + production (same-origin is fine too).
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ ok: false, error: "Invalid request" });
      return;
    }

    const resend = new Resend(getEnv("RESEND_API_KEY"));
    const to = getEnv("CONTACT_TO_EMAIL");
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    const { name, email, message } = parsed.data;

    const subject = `Portfolio contact from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}\n`;

    const result = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email,
    });

    if ((result as any)?.error) {
      res.status(502).json({ ok: false, error: "Email provider error" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Server error" });
  }
}
