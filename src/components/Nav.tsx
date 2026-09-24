"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/content/moodoo";

/**
 * Nav pill (788:7360). The tint follows whichever section sits under the pill:
 * each section declares `data-nav-tint`, and a 1px observer line at the pill's
 * vertical midline (y = 48) decides which one wins.
 */
const DEFAULT_TINT = "#fff5e2";

export function Nav() {
  const [tint, setTint] = useState(DEFAULT_TINT);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-tint]"));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setTint((e.target as HTMLElement).dataset.navTint || DEFAULT_TINT);
      },
      { rootMargin: "-48px 0px -100% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[20px] z-50 px-[24px] max-[1023px]:top-[12px] max-[1023px]:px-[12px]">
      <nav
        aria-label="Primary"
        className="pointer-events-auto relative mx-auto flex h-[56.75px] max-w-[1392px] items-center justify-between rounded-[9999px] border border-[rgba(4,58,78,0.1)] pl-[24.2px] pr-[24px] backdrop-blur-[9px] transition-[background-color] duration-500 ease-[var(--ease-soft)]"
        style={{
          backgroundColor: tint,
          boxShadow: "0 10px 30px -14px rgb(4 58 78 / 0.13), inset 0 1px 0 1px rgb(255 255 255 / 0.67)",
        }}
      >
        <a href="#top" aria-label="Moodoo — back to top" className="flex h-[20px] w-[106px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/icons/logo.svg" alt="moo·doo" width={105.714} height={19.755} className="h-[19.755px] w-[105.714px]" />
        </a>
        <ul className="flex items-center gap-[28px] max-[1199px]:gap-[20px] max-[1023px]:hidden">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[13px] font-medium leading-[19.5px] text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:rounded-[6px]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#join" className="btn-primary !px-[16px] !py-[8px] !text-[13px] min-[1024px]:hidden">
          Join Early Access
        </a>
      </nav>
    </header>
  );
}
