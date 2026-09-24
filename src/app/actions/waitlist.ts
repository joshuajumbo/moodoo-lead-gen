"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { checkFormToken, issueFormToken } from "@/lib/form-token";
import { waitlistSchema, type WaitlistState, type WaitlistInput } from "@/lib/waitlist-schema";

const FIELDS = [
  "work_email", "full_name", "organization", "role", "team_size", "phone",
  "utm_source", "utm_medium", "utm_campaign", "referrer",
] as const;

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: real people never see or fill this field. Pretend it worked so
  // the bot gets no signal to adapt to.
  const trap = formData.get("company_website");
  if (typeof trap === "string" && trap.trim() !== "") return { status: "success" };

  const timing = checkFormToken(formData.get("form_token"));
  if (timing === "too-fast") return { status: "success" };
  if (timing !== "ok") {
    return { status: "error", message: "This form has been open a while. Refresh the page and try again." };
  }

  const raw = Object.fromEntries(FIELDS.map((k) => [k, (formData.get(k) ?? "").toString()]));
  const code = (formData.get("phone_code") ?? "").toString().trim();
  if (raw.phone) raw.phone = `${code} ${raw.phone}`.trim();

  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof WaitlistInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof WaitlistInput;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Check the highlighted fields.", fieldErrors };
  }

  const { error } = await supabaseAdmin()
    .from("waitlist_leads")
    .insert({ ...parsed.data, source: "footer_form" });

  if (error) {
    // unique index on lower(work_email)
    if (error.code === "23505") return { status: "already" };
    console.error("[waitlist] insert failed", { code: error.code, message: error.message });
    return { status: "error", message: "We couldn't save your details. Try again in a moment." };
  }
  return { status: "success" };
}

/** Issued on mount so the static page stays cacheable and each visitor gets a fresh stamp. */
export async function getFormToken(): Promise<string> {
  return issueFormToken();
}
