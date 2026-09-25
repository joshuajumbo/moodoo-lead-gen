import Image from "next/image";
import { PERSONAS } from "@/content/moodoo";

/**
 * "Built for the people" below 1280px. No pinning: the office photo becomes the
 * first tile of the grid (it pairs with card 01 from 768px, giving 3 even rows).
 */
const ANCHOR: Record<string, string> = { managers: "for-managers-m", remote: "for-remote-m", creatives: "for-creatives-m" };

export function FluidPersonas() {
  return (
    <section aria-labelledby="personas-title-m" data-nav-tint="#fff5e2" className="bg-butter desk:hidden">
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-10 md:py-24">
        <header className="flex flex-col items-center gap-[19px] text-center">
          <p className="eyebrow">building a healthier workplace culture</p>
          <h2 id="personas-title-m" className="text-[clamp(28px,7.4vw,40px)] font-bold leading-[1.25] tracking-[-0.015em] text-ink">
            Built for the people
            <br />
            shaping how work feels
          </h2>
        </header>

        <ol className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2">
          <li aria-hidden className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px]">
            <Image
              src="/img/photos/office-team.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={80}
              className="object-cover"
            />
          </li>
          {PERSONAS.map((p) => (
            <li key={p.id} id={ANCHOR[p.id]} className="flex flex-col gap-[22px] bg-white p-6 sm:p-8 md:p-7 lg:p-11">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[15px] leading-[24px] text-ink-muted md:text-[16px] md:leading-[26px]">{p.number}</p>
                <h3 className="text-[clamp(24px,5.6vw,32px)] font-bold leading-[1.1] tracking-[-0.019em] text-ink md:text-[26px] lg:text-[30px]">{p.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-muted md:text-[16px] md:leading-[26px]">{p.body}</p>
              </div>
              <div className="relative mt-auto aspect-[565/260] w-full overflow-hidden border border-cream">
                <Image src={p.img} alt={p.alt} fill sizes="(min-width: 768px) 45vw, 90vw" quality={80} className="object-cover" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
