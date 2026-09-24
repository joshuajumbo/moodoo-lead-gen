import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Vercel Cron keep-alive. Supabase pauses free projects after a week without
 * activity; one cheap indexed read a day keeps "moodoo" awake.
 * Vercel sends `Authorization: Bearer $CRON_SECRET` on cron invocations.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const started = Date.now();
  const { error } = await supabaseAdmin()
    .from("waitlist_leads")
    .select("id", { head: true, count: "exact" })
    .limit(1);
  if (error) {
    console.error("[keepalive] supabase ping failed", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true, ms: Date.now() - started, at: new Date().toISOString() });
}
