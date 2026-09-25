import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { WaitlistInput } from "@/lib/waitlist-schema";

/**
 * Email the team about a new waitlist sign-up (Resend REST API).
 * Runs inside `after()`, so the visitor's response never waits on it, and it
 * never throws: a missing config or a failed send is logged, the sign-up stands.
 *
 * Env (Vercel, server-only):
 *   RESEND_API_KEY   required to send
 *   NOTIFY_EMAIL     recipient(s), comma-separated
 *   NOTIFY_FROM      optional; defaults to Resend's test sender, which can only
 *                    deliver to the Resend account owner's own address
 */
const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function notifyNewSignup(lead: WaitlistInput) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to?.length) {
    console.info("[notify] skipped: RESEND_API_KEY / NOTIFY_EMAIL not set");
    return;
  }

  let total: number | null = null;
  try {
    const { count } = await supabaseAdmin().from("waitlist_leads").select("id", { count: "exact", head: true });
    total = count ?? null;
  } catch {
    /* the count is a nicety; send without it */
  }

  const who = lead.full_name || lead.work_email;
  const rows: [string, string | null][] = [
    ["Email", lead.work_email],
    ["Name", lead.full_name],
    ["Organization", lead.organization],
    ["Role", lead.role],
    ["Team size", lead.team_size],
    ["Phone", lead.phone],
    ["Came from", [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || lead.referrer],
  ];
  const filled = rows.filter(([, v]) => v);

  const html = `<!doctype html><html><body style="margin:0;background:#ffeac0;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#121212">
  <div style="max-width:520px;margin:0 auto;padding:32px 20px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#696c75">Moodoo waitlist</p>
    <h1 style="margin:0 0 20px;font-size:24px;line-height:1.25">${esc(who)} just joined${total ? ` · #${total}` : ""}</h1>
    <table cellpadding="0" cellspacing="0" style="width:100%;background:#fff;border-radius:14px;border-collapse:separate;padding:6px 18px">
      ${filled
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 0;border-bottom:1px solid #f1e6cf;font-size:13px;color:#696c75;width:120px;vertical-align:top">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #f1e6cf;font-size:14px">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="margin:18px 0 0;font-size:12px;color:#696c75">${total ? `${total} people are on the list.` : ""} Full list: Supabase → Table Editor → waitlist_leads.</p>
  </div></body></html>`;
  const text = `${who} just joined the Moodoo waitlist${total ? ` (#${total})` : ""}.\n\n${filled.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  // One send per recipient: Resend rejects a whole message if any address is
  // disallowed (e.g. the test sender before a domain is verified), so separate
  // sends keep one bad address from blocking everyone else. Sequential to stay
  // inside Resend's free-tier rate limit.
  for (const recipient of to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.NOTIFY_FROM || "Moodoo Waitlist <onboarding@resend.dev>",
          to: [recipient],
          reply_to: lead.work_email,
          subject: `New sign-up: ${who}${total ? ` (#${total})` : ""}`,
          html,
          text,
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) console.error(`[notify] resend rejected ${recipient}`, res.status, (await res.text()).slice(0, 300));
    } catch (err) {
      console.error(`[notify] send to ${recipient} failed`, err instanceof Error ? err.message : err);
    }
  }
}
