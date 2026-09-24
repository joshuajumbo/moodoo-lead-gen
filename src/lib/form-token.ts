import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Timing check. The server stamps the form when it renders; a submission is
 * accepted only if it arrives between MIN and MAX after that stamp. The stamp
 * is HMAC-signed, so a bot can't forge an old timestamp to skip the wait.
 */
const MIN_MS = 2_500;
const MAX_MS = 6 * 60 * 60 * 1000;

function secret(): string {
  const s = process.env.WAITLIST_FORM_SECRET;
  if (!s || s.length < 32) throw new Error("WAITLIST_FORM_SECRET must be set (≥32 chars)");
  return s;
}

const sign = (issuedAt: string) => createHmac("sha256", secret()).update(`waitlist:${issuedAt}`).digest("base64url");

export function issueFormToken(now = Date.now()): string {
  const issuedAt = String(now);
  return `${issuedAt}.${sign(issuedAt)}`;
}

export type TokenCheck = "ok" | "too-fast" | "expired" | "invalid";

export function checkFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== "string") return "invalid";
  const [issuedAt, mac] = token.split(".");
  if (!issuedAt || !mac || !/^\d{13}$/.test(issuedAt)) return "invalid";
  const expected = Buffer.from(sign(issuedAt));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";
  const age = now - Number(issuedAt);
  if (age < MIN_MS) return "too-fast";
  if (age > MAX_MS) return "expired";
  return "ok";
}
