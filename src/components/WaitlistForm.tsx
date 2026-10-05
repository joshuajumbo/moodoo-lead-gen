"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { getFormToken, joinWaitlist } from "@/app/actions/waitlist";
import type { WaitlistState } from "@/lib/waitlist-schema";

const INITIAL: WaitlistState = { status: "idle" };
const META_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "referrer"] as const;

/** Attribution is read at the moment of submit — no state, no extra render. */
function stampMeta(e: React.FormEvent<HTMLFormElement>) {
  const q = new URLSearchParams(window.location.search);
  const values: Record<(typeof META_FIELDS)[number], string> = {
    utm_source: q.get("utm_source") ?? "",
    utm_medium: q.get("utm_medium") ?? "",
    utm_campaign: q.get("utm_campaign") ?? "",
    referrer: document.referrer.slice(0, 500),
  };
  for (const k of META_FIELDS) {
    const el = e.currentTarget.elements.namedItem(k);
    if (el instanceof HTMLInputElement) el.value = values[k];
  }
}

const fieldShell =
  "relative h-[56px] w-full rounded-[22px] border bg-white transition-[border-color,box-shadow] duration-200 ease-out " +
  "shadow-[0_8px_22px_-14px_rgb(4_58_78/0.2),inset_0_1px_0_1px_rgb(255_255_255/0.6)] " +
  "focus-within:border-[rgb(4_58_78/0.35)] focus-within:shadow-[0_8px_22px_-14px_rgb(4_58_78/0.2),0_0_0_4px_rgb(227_200_4/0.35)]";
const inputBase =
  "size-full rounded-[22px] bg-transparent pl-[17px] pr-[17px] text-[14.5px] text-ink-soft outline-none placeholder:text-[rgb(51_53_59/0.33)]";

export function WaitlistForm() {
  const [token, setToken] = useState("");
  const [state, action, pending] = useActionState(joinWaitlist, INITIAL);
  const [email, setEmail] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    getFormToken().then((t) => alive && setToken(t)).catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success" || state.status === "already") {
    const joined = state.status === "success";
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="mt-[40px] flex w-full flex-col items-center gap-[12px] rounded-[22px] border border-[rgb(4_58_78/0.1)] bg-white px-6 py-12 md:mt-[48px] md:px-[40px] md:py-[56px] text-center shadow-[0_8px_22px_-14px_rgb(4_58_78/0.2)] outline-none"
      >
        <span aria-hidden className="grid size-[48px] place-items-center rounded-full" style={{ backgroundImage: "linear-gradient(150deg, #e3c804 0%, #f8a706 100%)" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11.5l4 4 8-9" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <p className="text-[clamp(26px,6.4vw,32px)] font-bold leading-[1.1] tracking-[-0.019em] text-ink">
          {joined ? "You’re on the list" : "You’re already on the list"}
        </p>
        <p className="max-w-[440px] text-[16px] leading-[26px] text-ink-muted">
          {joined
            ? `We’ll write to ${email || "you"} when early access opens.`
            : `${email || "This email"} is already signed up. We’ll be in touch when early access opens.`}
        </p>
      </div>
    );
  }

  const emailError = state.status === "error" ? (state.fieldErrors?.work_email ?? null) : null;

  return (
    <form
      action={action}
      onSubmit={stampMeta}
      noValidate
      className="mt-[33.23px] flex w-full max-w-[560px] flex-col gap-[8px]"
      aria-describedby={state.status === "error" ? "form-error" : undefined}
    >
      {/* bot traps: honeypot + signed render time */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="form_token" value={token} />
      {META_FIELDS.map((k) => (
        <input key={k} type="hidden" name={k} defaultValue="" />
      ))}

      <label htmlFor="work_email" className="text-[18px] font-bold leading-[29.16px] text-ink-soft">
        Work Email
      </label>

      {/* one field, one action: a single row from 640px, stacked on phones */}
      <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
        <div className={`${fieldShell} sm:flex-1 ${emailError ? "border-[#b3261e]/60" : "border-[rgb(4_58_78/0.1)]"}`}>
          <input
            id="work_email"
            name="work_email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "work_email-error" : undefined}
            className={inputBase}
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary h-[56px] shrink-0 justify-center disabled:cursor-progress disabled:opacity-70 max-sm:w-full"
        >
          {pending ? "Joining…" : "Join Early Access"}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/icons/arrow.svg" alt="" width={14} height={14} className="btn-arrow" />
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="min-h-[19.5px] pl-[17px] outline-none">
        {emailError ? (
          <p id="work_email-error" className="text-[13px] leading-[19.5px] text-[#b3261e]">{emailError}</p>
        ) : state.status === "error" ? (
          <p id="form-error" className="text-[13px] leading-[19.5px] text-[#b3261e]">{state.message}</p>
        ) : null}
      </div>
    </form>
  );
}
