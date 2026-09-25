import { PhoneBezel } from "@/components/phone/PhoneBezel";
import { MandalaCycle } from "@/components/mandala/Cycle";
import { CheckinScreen } from "@/components/mandala/CheckinScreen";
import { MandalaConveyor } from "@/components/mandala/MandalaConveyor";
import { PauseButton } from "@/components/mandala/PauseButton";

/**
 * "Introducing Moodoo Mandalas" (807:324061). 1440 × 900 on lagoon.
 * Tiles are 159² on a 163px pitch at y 423, split around the phone.
 * The phone (807:338428, mid-energy variant) pins within this section using the
 * same sticky model as the hero: natural top 270.75, pinned at 170.75, released
 * 40px above the section's end. Pure CSS — no scroll listeners needed.
 */
const PHONE = { x: 606, y: 270.75, w: 227, h: 463.5 };

export function Mandalas() {
  return (
    <section
      id="mandalas"
      data-nav-tint="#d6e7eb"
      aria-labelledby="mandalas-title"
      className="relative hidden h-[900px] overflow-hidden bg-lagoon text-white desk:block"
    >
      <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#244b65" }} />
      <MandalaCycle>
      <div className="relative h-full w-[1440px]" style={{ marginLeft: "calc(50% - 720px)" }}>
        <h2
          id="mandalas-title"
          className="absolute left-[720.5px] top-[70px] -translate-x-1/2 whitespace-nowrap text-center text-[40px] font-bold leading-[50px] tracking-[-0.6px]"
        >
          Introducing Moodoo{"\u00a0 "}Mandalas
        </h2>
        <p className="absolute left-[720px] top-[152px] -translate-x-1/2 whitespace-nowrap text-center text-[18px] font-bold leading-[26.4px] tracking-[-0.6px] text-white/80">
          Explore how you feel through Moodoo’s intuitive mood interface,
          <br />
          using pleasantness and energy to capture your current experience
        </p>

        <MandalaConveyor className="absolute left-0 top-[423px] [--g:4px] [--sp:183px] [--t:159px]" />

        <div className="absolute left-[140px] top-[650px] flex w-[404px] flex-col gap-[12px]">
          <h3 className="text-[22px] font-extrabold leading-[26px]">Pleasantness</h3>
          <p className="whitespace-nowrap text-[18px] font-semibold leading-[26px] text-white/80">How positive or negative your current mood feels</p>
        </div>
        <div className="absolute left-[896px] top-[650px] flex w-[404px] flex-col gap-[12px]">
          <h3 className="text-[22px] font-extrabold leading-[26px]">Energy</h3>
          <p className="whitespace-nowrap text-[18px] font-semibold leading-[26px] text-white/80">How energized or drained you feel in the moment</p>
        </div>

        {/* phone track */}
        <div className="pointer-events-none absolute inset-x-0 top-0" style={{ bottom: 40 }}>
          <div
            className="sticky"
            style={{ top: 170.75, marginTop: PHONE.y, marginLeft: PHONE.x, width: PHONE.w, height: PHONE.h, transform: "rotate(-1deg)" }}
          >
            <PhoneBezel>
              <CheckinScreen />
            </PhoneBezel>
          </div>
        </div>
        <PauseButton className="absolute bottom-[40px] right-[140px]" />
      </div>
      </MandalaCycle>
    </section>
  );
}
