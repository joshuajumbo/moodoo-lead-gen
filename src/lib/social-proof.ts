import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type SocialProof = { total: number; initials: string[] };

const EMPTY: SocialProof = { total: 0, initials: [] };

/** First letter or digit of a name, falling back to the email's local part. */
function initialOf(name: string | null, email: string): string {
  for (const source of [name ?? "", email.split("@")[0] ?? ""]) {
    const ch = source.trim().match(/[\p{L}\p{N}]/u)?.[0];
    if (ch) return ch.toLocaleUpperCase();
  }
  return "•";
}

/**
 * Hero social proof: total sign-ups plus the initials of the first four people
 * to join, in order. Only single letters leave the server. Never throws; a
 * database hiccup degrades to the empty state instead of breaking the page.
 */
export async function getSocialProof(): Promise<SocialProof> {
  try {
    const db = supabaseAdmin();
    const [count, first] = await Promise.all([
      db.from("waitlist_leads").select("id", { count: "exact", head: true }),
      db.from("waitlist_leads").select("full_name, work_email").order("created_at", { ascending: true }).limit(4),
    ]);
    if (count.error || first.error) throw count.error ?? first.error;
    return {
      total: count.count ?? 0,
      initials: (first.data ?? []).map((r) => initialOf(r.full_name, r.work_email)),
    };
  } catch (err) {
    const e = err as { message?: string; code?: string; details?: string };
    console.error("[social-proof] falling back to empty state", { code: e?.code, message: e?.message || String(err), details: e?.details });
    return EMPTY;
  }
}
