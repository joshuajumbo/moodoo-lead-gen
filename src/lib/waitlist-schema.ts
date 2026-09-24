import { z } from "zod";

/** Mirrors the CHECK constraints on public.waitlist_leads exactly. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v.length ? v : null))
    .nullable()
    .optional()
    .transform((v) => v ?? null);

export const waitlistSchema = z.object({
  work_email: z
    .string()
    .trim()
    .min(3, "Enter your work email")
    .max(254, "That email is too long")
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Enter a valid email, like you@company.com"),
  full_name: optionalText(120),
  organization: optionalText(160),
  role: optionalText(80),
  team_size: optionalText(40),
  phone: z
    .string()
    .trim()
    .max(32, "That number is too long")
    .refine((v) => v === "" || /^[+()\-\s\d]{6,}$/.test(v), "Use digits, spaces or dashes")
    .transform((v) => (v ? v : null))
    .optional()
    .transform((v) => v ?? null),
  utm_source: optionalText(120),
  utm_medium: optionalText(120),
  utm_campaign: optionalText(120),
  referrer: optionalText(500),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "already" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof WaitlistInput, string>> };
