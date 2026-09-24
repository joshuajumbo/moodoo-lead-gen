import Image from "next/image";
import { SCREENS, type ScreenId } from "@/content/moodoo";

/**
 * Every screen is mounted once and stacked; only opacity changes, so swaps are
 * a pure compositor crossfade (200ms) with no decode or layout on switch.
 */
export function PhoneScreens({ active, screens, priority = false }: { active: ScreenId; screens: ScreenId[]; priority?: boolean }) {
  return (
    <>
      {screens.map((id) => (
        <Image
          key={id}
          src={SCREENS[id].src}
          alt={id === active ? SCREENS[id].alt : ""}
          aria-hidden={id !== active}
          width={645}
          height={1354}
          sizes="215px"
          quality={90}
          priority={priority && id === active}
          draggable={false}
          className="absolute inset-0 size-full select-none transition-opacity duration-200 ease-out"
          style={{ opacity: id === active ? 1 : 0 }}
        />
      ))}
    </>
  );
}
