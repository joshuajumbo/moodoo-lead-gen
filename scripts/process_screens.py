"""
De-rotate Figma phone-screen exports.
Figma bakes the parent's -1deg into child exports, so each 4x export is the
rotated bounding box of a 215x451.5 screen. We rotate +1deg about the centre,
crop the true content box, mask to the 36px radius with supersampled AA, and
downsample to 3x.
"""
from PIL import Image, ImageDraw
import sys, os, glob
W, H, R, S_IN, S_OUT = 215.0, 451.5, 36.0, 4, 3
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
for f in sorted(glob.glob(os.path.join(src, "*.4x.png"))):
    name = os.path.basename(f).replace(".4x.png", "")
    im = Image.open(f).convert("RGBA")
    rot = im.rotate(1.0, resample=Image.BICUBIC, expand=True)
    cw, ch = round(W * S_IN), round(H * S_IN)
    cx, cy = rot.width / 2, rot.height / 2
    box = (round(cx - cw / 2), round(cy - ch / 2))
    crop = rot.crop((box[0], box[1], box[0] + cw, box[1] + ch))
    # anti-aliased rounded mask, 4x supersampled
    ss = 4
    m = Image.new("L", (cw * ss, ch * ss), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, cw * ss - 1, ch * ss - 1), radius=R * S_IN * ss, fill=255)
    m = m.resize((cw, ch), Image.LANCZOS)
    a = crop.split()[3]
    crop.putalpha(Image.composite(a, Image.new("L", a.size, 0), m))
    out = crop.resize((round(W * S_OUT), round(H * S_OUT)), Image.LANCZOS)
    out.save(os.path.join(dst, f"{name}.png"), optimize=True)
    print(name, im.size, "->", out.size)
