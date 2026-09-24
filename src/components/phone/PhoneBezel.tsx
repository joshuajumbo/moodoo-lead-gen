/**
 * Phone body from main components 788:80968–70 ("Component 27/32/33/34").
 * Built in CSS rather than rasterised so it stays crisp under rotation and
 * scale. Geometry is in the component's own units (227 × 463.5).
 */
export function PhoneBezel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative h-[463.5px] w-[227px] ${className}`}>
      {/* body — linear 160°: #3a4047 → #23272d (45%) → #0f1115 */}
      <div
        className="absolute inset-0 rounded-[44px]"
        style={{
          background: "linear-gradient(160deg, #3a4047 0%, #23272d 45%, #0f1115 100%)",
          boxShadow: [
            "inset 0 -2px 0 0 rgb(0 0 0 / 0.45)",
            "inset 0 1px 0 0 rgb(255 255 255 / 0.14)",
            "0 16px 32px -14px rgb(15 17 21 / 0.45)",
            "0 40px 80px -28px rgb(15 17 21 / 0.55)",
          ].join(", "),
        }}
      />
      {/* side keys */}
      {/* side keys — positions un-rotated from the instance's -1° bbox into local space */}
      <span aria-hidden className="absolute left-[-1.9px] top-[102px] h-[24.1px] w-[2.6px] rounded-[2px] bg-[#0a0c0f]" />
      <span aria-hidden className="absolute left-[-2.1px] top-[148.5px] h-[43px] w-[2.6px] rounded-[2px] bg-[#0a0c0f]" />
      <span aria-hidden className="absolute left-[225.7px] top-[120.7px] h-[67.1px] w-[2.6px] rounded-[2px] bg-[#0a0c0f]" />
      {/* screen well: 215 × 451.5 at 6.1 inset, r36 — the screen raster carries its own inset shadow */}
      <div className="absolute left-[6.1px] top-[6.1px] h-[451.5px] w-[215px] overflow-hidden rounded-[36px] bg-[#0f1115]">
        {children}
      </div>
    </div>
  );
}
