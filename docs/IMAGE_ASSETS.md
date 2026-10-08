# Image asset library

All 45 supplied PNGs were copied into `assets/` with descriptive filenames and checksum verification. Their originals remain unchanged. The site serves 51 complete images from `public/images/`: 36 supplied standalone images and 15 generated photographs. Nine icon sheets and moodboards are retained under `assets/reference-only/` and are never included in the website image registry.

## Locations and workflow

- `assets/home`, `products`, `wedding`, `about`, `contact`, `brand`, `decorative`: descriptively named original PNG copies.
- `assets/products/details`: newly generated standalone detail photographs.
- `assets/reference-only`: supplied sheets and moodboards, for reference only.
- `public/images`: categorized WebP copies for Next.js image delivery.
- `src/lib/images.ts`: generated registry; `imagePath()` resolves semantic names to organized local URLs.
- `assets/supplied-assets.json`: checksums for the 45 imported copies.
- `assets/optimized-assets.json`: dimensions and source provenance for the 51 complete served images.

Run `npm run assets:prepare` to regenerate WebP images and the registry entirely from local `assets/`. It preserves aspect ratios and never extracts image regions. All twelve catalogue bouquets have distinct primary photos and separate galleries. The custom-bouquet promotional banner reuses the complete home photograph. `npm run assets:import` explicitly recopies supplied files from the parent folder, using the saved inventory; this is not required to build or run the site.

## Generated images

### Newsletter floral corner

Source: `assets/decorative/newsletter-floral-corner.png`

Served file: `public/images/decorative/newsletter-floral-corner.webp`

Tool: built-in `image_gen.imagegen`; mode: generation; transparent background; no reference image or editing input. The delivered PNG is 1536 × 1024. The complete image is resized proportionally with transparency preserved; no regions are extracted from design screenshots or composite assets.

Exact prompt:

Use case: photorealistic-natural. Asset type: a single standalone floral corner photograph for a premium Parisian florist newsletter and footer. Create one cohesive, beautifully detailed cluster of real soft blush-pink garden roses, creamy white hydrangea blossoms, delicate pink waxflower, tiny white baby's breath and natural muted sage eucalyptus leaves. Match the romantic high-end botanical photography in the supplied florist reference: soft bright daylight, powder-pink and ivory palette, tender layered petals, subtle depth of field. Composition: landscape canvas, flowers concentrated in the right two-thirds, tallest airy sprigs at upper right, a large pink rose in the lower central part of the cluster, white hydrangea at the right edge, irregular organic outline and delicate loose stems extending left. The left third should be completely empty transparency. Fully transparent background around the floral cluster; preserve delicate edges, no vase, no wrapping, no ribbon, no hands, no environment, no lettering, no logo, no border, no watermark. This is a botanical photographic asset, NOT a screenshot or website mockup. Generate at high resolution suitable for a 500px-wide website decoration.

### Bouquet portraits and details

The latest premium pass added four distinct bouquet portraits and eight matching botanical close-ups using the built-in tool in generation mode. See [PREMIUM_REFINEMENT.md](PREMIUM_REFINEMENT.md) for final paths and [generated-photography.json](../assets/generated-photography.json) for the exact twelve prompts. The two earlier standalone details are documented below.

Tool: built-in `image_gen.imagegen`; mode: generation; no reference image or editing input. The two outputs were generated independently as single scenes and copied into the project. Prompts requested 1024 × 1024; the delivered source files are 1254 × 1254. Only proportional WebP resizing is applied for delivery.

### Blush garden rose

Source: `assets/products/details/blush-garden-rose.png`

Served file: `public/images/products/details/blush-garden-rose.webp`

Exact prompt:

Use case: photorealistic-natural. Asset type: standalone floral detail photograph for L’Âme des Fleurs, a premium pastel florist website. Create ONE square photograph of a single blush-pink garden rose in full bloom, softly curled layered petals, a few delicate white baby's-breath flowers and natural eucalyptus softly out of focus behind it. Macro editorial photography, soft morning window light, realistic velvety petal texture, dreamy pale pink and ivory Parisian atelier backdrop, refined understated luxury. Entire composition must be a single cohesive photograph, photographed independently as its own asset. No montage, no collage, no split panels, no contact sheet, no writing, no logos, no watermark. Do not crop or extract a region from another supplied image. Image should fill a square 1024x1024 canvas.

### Blush satin ribbon

Source: `assets/products/details/blush-satin-ribbon.png`

Served file: `public/images/products/details/blush-satin-ribbon.webp`

Exact prompt:

Use case: product-mockup. Asset type: standalone packaging detail photograph for the premium pastel florist L’Âme des Fleurs. Create ONE square 1024x1024 photograph showing a carefully tied blush-pink satin bow around the stems of a fresh florist bouquet, layered pale pink and powder-blue tissue wrapping, an elegant blank ivory hang tag. The bow is the clear hero subject, fully visible, with pink roses, white hydrangeas and eucalyptus softly out of focus near the upper edge. Resting on creamy white marble inside a sunlit Parisian flower atelier, warm diffused daylight, realistic luxurious satin folds, premium editorial product photography in a gentle blush, ivory and powder-blue palette. This must be a standalone single scene, not a collage, montage, grid, contact sheet or split panel. Generate it independently rather than cropping another image. No text, no writing, no logos, no watermark.
