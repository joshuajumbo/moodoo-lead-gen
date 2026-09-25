# Check-in screen chrome (public/img/screens/checkin-chrome.png)

Recovered from Figma's three check-in variants (788:66547 high, 788:52134 mid,
788:59340 low) by difference matting: the same UI over three known flat
backgrounds gives, per pixel, colour + alpha by least squares (leave-one-out
where a mandala/handle contaminates one variant). The centre zone where all
three mandalas overlap is rebuilt from the dot grid shifted by whole periods
(33px @3x). Dot ghosts are inpainted out: the grid is a live CSS layer instead,
because Figma composites the dots additively (+22/channel → plus-lighter),
which a linear matte cannot represent. Verified by recompositing all three
variants: mean abs error 1.0–1.4 / 255.
