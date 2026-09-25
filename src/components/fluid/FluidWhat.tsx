"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneBezel } from "@/components/phone/PhoneBezel";
import { PhoneScreens } from "@/components/phone/PhoneScreens";
import { CHAPTERS } from "@/content/moodoo";

/**
 * "What is Moodoo" below 1280px. The desktop pins one phone and swaps its
 * screen per chapter; without pinning, each chapter carries its own phone in a
 * swipeable gallery. The desktop's focus language carries over: the chapter in
 * view is full strength, the rest sit at 0.32 (Figma's inactive opacity).
 */
const SLIDES = CHAPTERS.slice(1);

export function FluidWhat() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const slides = Array.from(el.children).filter((c) => c instanceof HTMLElement && c.dataset.slide) as HTMLElement[];
    if (slides.length < 2) return;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
      setActive(slides.length - 1);
      return;
    }
    const step = slides[1].offsetLeft - slides[0].offsetLeft;
    setActive(Math.max(0, Math.min(slides.length - 1, Math.round(el.scrollLeft / step))));
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sync]);

  const goTo = (i: number) => {
    const el = scroller.current;
    const slide = el?.querySelector<HTMLElement>(`[data-slide="${i}"]`);
    if (!el || !slide) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: slide.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="what-is-moodoo-m" aria-labelledby="what-title-m" data-nav-tint="#fff5e2" className="relative overflow-hidden desk:hidden">
      <Image src="/img/photos/office-team.jpg" alt="" fill sizes="100vw" quality={80} className="object-cover" />
      <div className="relative mx-auto max-w-[1233px] px-3 pb-3 pt-[168px] sm:px-6 sm:pb-6 sm:pt-[220px] md:px-10 md:py-16">
        <div className="bg-cream pb-10 pt-10 md:pb-14 md:pt-14">
          <header className="flex max-w-[612px] flex-col items-start gap-[19px] px-6 md:px-10 lg:px-14">
            <p className="eyebrow">What is moodoo</p>
            <div className="flex flex-col gap-[16px] md:gap-[21px]">
              <h2 id="what-title-m" className="max-w-[499px] text-[clamp(30px,7.6vw,40px)] font-bold leading-[1.25] tracking-[-0.015em] text-ink">
                Some things don’t show up in a status update
              </h2>
              {CHAPTERS[0].body.map((p) => (
                <p key={p} className="text-[16px] leading-[26px] text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
          </header>

          <div className="mt-10 md:mt-12" role="region" aria-roledescription="carousel" aria-label="What Moodoo does">
            <div
              ref={scroller}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-1 md:scroll-px-10 md:px-10 lg:scroll-px-14 lg:px-14"
            >
              {SLIDES.map((c, i) => (
                <article
                  key={c.id}
                  data-slide={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${SLIDES.length}: ${c.title}`}
                  onClick={() => i !== active && goTo(i)}
                  className="w-[82%] max-w-[340px] shrink-0 snap-start bg-white transition-opacity duration-300 ease-out"
                  style={{ opacity: i === active ? 1 : 0.32, cursor: i === active ? "default" : "pointer" }}
                >
                  <div className="flex justify-center bg-[linear-gradient(180deg,#fff5e2_0%,#ffffff_100%)] pb-6 pt-8">
                    <div className="h-[371px] w-[182px]">
                      <div className="origin-top-left" style={{ transform: "scale(0.8) rotate(-1deg)" }}>
                        <PhoneBezel>
                          <PhoneScreens active={c.screen} screens={[c.screen]} />
                        </PhoneBezel>
                      </div>
                    </div>
                  </div>
                  <div className="relative mx-6 mb-7 mt-1 pl-[22px]">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px]"
                      style={{ background: "linear-gradient(180deg, #e3c804 0%, #ffffff 100%)" }}
                    />
                    <p className="text-[15px] leading-[24px] text-ink-muted">{c.number}</p>
                    <h3 className="mt-[6px] text-[clamp(24px,6.4vw,28px)] font-bold leading-[1.18] tracking-[-0.015em] text-ink">{c.title}</h3>
                    <p className="mt-[8px] text-[15px] leading-[24px] text-ink-muted">{c.body[0]}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-[6px]">
              {SLIDES.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${c.title}`}
                  aria-current={i === active ? "true" : undefined}
                  className="grid h-6 place-items-center px-[3px] focus-visible:rounded-full"
                >
                  <span
                    className="block h-[6px] rounded-full transition-all duration-300 ease-[var(--ease-soft)]"
                    style={{ width: i === active ? 22 : 6, background: i === active ? "#e3c804" : "rgb(51 53 59 / 0.2)" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
