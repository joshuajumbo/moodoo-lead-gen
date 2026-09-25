"use client";

import { STATS, useStatFocus } from "./StatFocus";

/** The 40% / 22% figures. Hover, focus or tap one to light its marker on the curve. */
export function StatItems({ variant }: { variant: "desk" | "fluid" }) {
  const { focus, setFocus } = useStatFocus();
  return (
    <>
      {STATS.map((s) => {
        const dim = focus !== null && focus !== s.id;
        return (
          <div
            key={s.id}
            tabIndex={0}
            onPointerEnter={(e) => e.pointerType === "mouse" && setFocus(s.id)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setFocus(null)}
            onFocus={() => setFocus(s.id)}
            onBlur={() => setFocus(null)}
            onClick={() => setFocus(s.id)}
            className={`flex cursor-default flex-col outline-none transition-opacity duration-300 ease-out focus-visible:rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white ${
              variant === "desk" ? "w-[356px] gap-[32px]" : "gap-4 md:gap-8"
            }`}
            style={{ opacity: dim ? 0.45 : 1 }}
          >
            <dt
              className={
                variant === "desk"
                  ? "text-[64px] font-bold leading-[50px] tracking-[-0.6px]"
                  : "text-[clamp(52px,14vw,64px)] font-bold leading-[0.78] tracking-[-0.01em]"
              }
            >
              {s.value}%
            </dt>
            <dd className={variant === "desk" ? "text-[16px] leading-[26px]" : "max-w-[356px] text-[16px] leading-[26px]"}>
              {s.body[0]}
              {variant === "desk" ? <br /> : " "}
              {s.body[1]}
            </dd>
          </div>
        );
      })}
    </>
  );
}
