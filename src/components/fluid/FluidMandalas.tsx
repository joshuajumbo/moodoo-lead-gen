import { PhoneBezel } from "@/components/phone/PhoneBezel";
import { MandalaCycle } from "@/components/mandala/Cycle";
import { CheckinScreen } from "@/components/mandala/CheckinScreen";
import { MandalaConveyor } from "@/components/mandala/MandalaConveyor";
import { PauseButton } from "@/components/mandala/PauseButton";

/**
 * Mandalas below 1280px. The composition survives intact — phone centred on
 * the tile strip — retuned per width: tiles 112 / gap 150 on phones, Figma's
 * 159 / 183 from 768px. The phone is scaled 0.8 on phones.
 */
export function FluidMandalas() {
  return (
    <section aria-labelledby="mandalas-title-m" data-nav-tint="#d6e7eb" className="relative overflow-hidden bg-lagoon pb-16 pt-16 text-white md:pb-24 md:pt-24 desk:hidden">
      <MandalaCycle>
      <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#244b65" }} />
      <div className="relative mx-auto flex max-w-[720px] flex-col items-center gap-4 px-6 text-center md:gap-6">
        <h2 id="mandalas-title-m" className="text-[clamp(28px,7vw,40px)] font-bold leading-[1.25] tracking-[-0.015em]">
          Introducing Moodoo Mandalas
        </h2>
        <p className="max-w-[560px] text-[16px] font-bold leading-[1.5] tracking-[-0.02em] text-white/80 md:text-[18px] md:leading-[26.4px]">
          Explore how you feel through Moodoo’s intuitive mood interface, using pleasantness and energy to capture your current
          experience
        </p>
      </div>

      <div className="relative mt-12 h-[395px] md:mt-16 md:h-[488px]">
        <MandalaConveyor className="absolute inset-x-0 top-1/2 -translate-y-1/2 [--g:4px] [--sp:150px] [--t:112px] md:[--sp:183px] md:[--t:159px]" />
        <div className="absolute left-1/2 top-1/2 h-[371px] w-[182px] -translate-x-1/2 -translate-y-1/2 md:h-[463.5px] md:w-[227px]">
          <div className="origin-top-left [transform:scale(0.8)_rotate(-1deg)] md:[transform:rotate(-1deg)]">
            <PhoneBezel>
              <CheckinScreen />
            </PhoneBezel>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-[880px] gap-8 px-6 md:mt-16 md:grid-cols-2 md:gap-10 md:px-10">
        {[
          { t: "Pleasantness", d: "How positive or negative your current mood feels" },
          { t: "Energy", d: "How energized or drained you feel in the moment" },
        ].map((x) => (
          <div key={x.t} className="flex flex-col gap-[10px] md:gap-[12px]">
            <h3 className="text-[20px] font-extrabold leading-[26px] md:text-[22px]">{x.t}</h3>
            <p className="text-[16px] font-semibold leading-[24px] text-white/80 md:text-[18px] md:leading-[26px]">{x.d}</p>
          </div>
        ))}
      </div>
      <PauseButton className="absolute bottom-6 right-6 md:bottom-8 md:right-10" />
      </MandalaCycle>
    </section>
  );
}
