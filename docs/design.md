# Portfolio design

## Owner requirements

- Neutral grayscale page and material backgrounds. No blue-tinted gray, colored background wash, decorative orbs, or diagonal gradients.
- Reserve a blank portrait slot, 3:4 aspect ratio (240 x 320 px desktop). No profile photograph until the owner supplies one. Keep its size stable when adding the image. Mobile uses a smaller portrait next to the identity, with the biography below both.
- Research identity is broader than RideFlux. Mention RideFlux in its internship and industry-academia project entries, not as the introduction's central theme.
- Exclude domestic papers. Keep awards separate.
- Borrow the quality and continuity of PAVER controls, not its project-page layout.

## Information and surfaces

- Unframed two-column introduction, compact dated news, publications with real research figures, separate projects, employment/research experience, education and awards.
- Glass is reserved for interactive controls and floating navigation. Reading surfaces stay matte and unframed.
- Venue badges are metadata, not buttons. Use a single clean label such as `ICLR 2026`, without icons, dividers or year compartments. Under Review remains a distinct status. Color is restrained and never the only distinction.
- Contact links and publication links use local Lucide icons. Theme choices have accessible names and tooltips.

## Web glass implementation

`glass.css` applies translucent materials, background blur, a restrained inner rim and a soft cast shadow. It deliberately avoids metallic gradient shading.

`optics.js` progressively adds rounded-edge displacement maps to navigation, contact and publication buttons, and theme controls in Chromium. It bends only the sampled background, not labels. Maps are cached by dimensions and regenerated only on size changes, not every animation frame. Other browsers keep the legible blur-based treatment. Cast shadows remain shallow and duplicate inner outlines are intentionally removed.

This is a web implementation, not Apple's native Liquid Glass API or a claim of pixel-identical rendering. Backdrop distortion cannot be visible against a spatially uniform background; its purpose is evident when real page content passes beneath the floating navigation.

Selected segmented controls share a moving lens with a short spring-like cubic-bezier transition. Reduced motion disables transitions without changing lens position. Increased contrast removes translucency/refraction.

Header geometry: 56px outer shells, 44px square theme and motion targets, equal-width navigation items. Theme and motion share one glass shell, without nested backdrop filters. Do not let generic text-button padding override icon-button sizing. Dynamic header height drives both anchor offset and active-section tracking. At 900px and below navigation moves to its own centered row. See `header-50.md` for the second 50-item checklist.

## Maintenance

Readability floor: description/body 16px, authors 15px, dates/secondary labels 14px (venue metadata 13px). Do not shrink these on mobile to make layouts fit; reflow the layout instead. Neutral translucent full-width reading bands reduce background interference without turning sections into floating cards. See `readability-50.md` for the implementation and verification checklist.

- Test theme persistence, all publication filters, narrow viewports, and project/experience separation.
- Keep controls' dimensions stable between active and inactive states.
- Confirm both light and dark styles using screenshots, including navigation over scrolled content.
- Never introduce fake publication thumbnails or turn sections into nested cards.

## Ambient motion

Owner requested a flowing water/flame-like background. `background.js` adapts the React Bits Silk pattern to a single 2D WebGL pass in neutral grayscale, with weaker contrast behind the central reading area. There is no React or 3D runtime dependency. Source attribution and the upstream license are included in `assets/REACT-BITS-LICENSE`.

Limit rendering to 30 fps and at most 1280 by 900 pixels; stop animation in hidden tabs. The pause/play control persists its preference. Reduced-motion renders a still image; increased-contrast hides the canvas. Unsupported WebGL or a lost context falls back to the original flat background without breaking the page.

Static monochrome film grain is generated once as a small bitmap tile. It sits above the silk background but below all text, controls and publication images. No sepia tint, animated grain or per-frame texture generation. Increased contrast hides grain as well.
