# Asset manifest

Every asset is pulled from Figma file `0hJxVjyUUXUnL81whE0RCT` (page "Lead Gen Page", frame `788:2`).

| File | Figma node | Notes |
|---|---|---|
| `public/img/screens/high.png` | `788:66547` | Screen of main component 788:80970 (High energy) |
| `public/img/screens/mid.png` | `788:52134` | 788:80968 (Mid) — hero cycle + mandalas phone |
| `public/img/screens/low.png` | `788:59340` | 788:80969 (Low) — hero cycle + chapter 01 |
| `public/img/screens/dash.png` | `801:154512` | Chapter intro (Team Mood dashboard) |
| `public/img/screens/insights.png` | `805:286633` | Chapter 02 |
| `public/img/screens/resources.png` | `805:301380` | Chapter 03 |
| `public/img/screens/culture.png` | `805:315964` | Chapter 04 |
| `public/img/photos/office-team.jpg` | `799:139684`, `807:323388` | Same source image (hash b4d67f70); 1168×784 — request a larger original |
| `public/img/photos/persona-0{1..5}-*.jpg` | `807:323529…323561` | Card photos, FILL/cover, no filters |
| `public/img/mandalas/mandala-{1..8}.svg` | tiles `807:352948…352950` | Exported SVG; tiles 1 & 8 normalised to 159² (Figma clips them at the frame edge) |
| `public/img/icons/logo.svg` | `788:14640` | Same paths as nav logo `788:7364`, used at both sizes |
| `public/img/icons/arrow.svg` | `788:7259` | |
| `public/img/icons/chip-icon.svg` | `801:154479` | |
| `public/img/icons/chevron.svg` | `812:389805` | |

Inline, not files: stats chart (`805:264785–91`) and quote glyph (`805:264777`) in `Stats.tsx`; dot fields as CSS (`.dot-field`) instead of ~7k ellipse nodes per section; phone body in CSS (`PhoneBezel.tsx`).

## Phone screens

Figma bakes the parent instance's −1° rotation into child exports. Screens are exported at 4× and run through `scripts/process-screens.py`: rotate +1°, crop the true 215 × 451.5 content box, mask to the 36px radius with supersampled anti-aliasing, resample to 3× (645 × 1354). The ~3px darker rim is the screen's own inset shadow in Figma, not bleed.

```bash
python3 scripts/process-screens.py <dir-of-*.4x.png> public/img/screens
```
