# Portfolio design

## Owner requirements

- Neutral grayscale page and material backgrounds. No blue-tinted gray, colored background wash, decorative orbs, or diagonal gradients.
- No profile photograph until the owner supplies one.
- Research identity is broader than RideFlux. Mention RideFlux in its internship and industry-academia project entries, not as the introduction's central theme.
- Exclude domestic papers. Keep awards separate.
- Borrow the quality and continuity of PAVER controls, not its project-page layout.

## Information and surfaces

- Unframed two-column introduction, compact dated news, publications with real research figures, separate projects, employment/research experience, education and awards.
- Glass is reserved for interactive controls and floating navigation. Reading surfaces stay matte and unframed.
- Venue badges are metadata, not buttons. Venue label and year have separate compartments; Under Review remains a distinct status. Color is restrained and never the only distinction.
- Contact links and publication links use local Lucide icons. Theme choices have accessible names and tooltips.

## Web glass implementation

`glass.css` applies translucent materials, background blur, a restrained inner rim and a soft cast shadow. It deliberately avoids metallic gradient shading.

`optics.js` progressively adds a rounded-edge displacement map to the floating navigation's backdrop in Chromium. It bends only the sampled background, not labels. Maps are regenerated only on size changes, not every animation frame. Other browsers keep the legible blur-based treatment.

This is a web implementation, not Apple's native Liquid Glass API or a claim of pixel-identical rendering. Backdrop distortion cannot be visible against a spatially uniform background; its purpose is evident when real page content passes beneath the floating navigation.

Selected segmented controls share a moving lens with a short spring-like cubic-bezier transition. Reduced motion disables transitions without changing lens position. Increased contrast removes translucency/refraction.

## Maintenance

- Test theme persistence, all publication filters, narrow viewports, and project/experience separation.
- Keep controls' dimensions stable between active and inactive states.
- Confirm both light and dark styles using screenshots, including navigation over scrolled content.
- Never introduce fake publication thumbnails or turn sections into nested cards.
