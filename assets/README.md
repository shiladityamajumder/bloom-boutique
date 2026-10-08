# Local image sources

This folder contains all 45 supplied image copies with descriptive filenames, plus 14 generated standalone photographs: four distinct bouquet portraits and ten detail images. Original files in the parent `assets/` folder and the root design screenshots remain untouched.

The `home`, `products`, `wedding`, `about`, `contact`, `brand` and `decorative` folders contain complete standalone images. `reference-only` contains the nine supplied icon sheets and moodboards; none is cropped or served by the website.

Run `npm run assets:prepare` from the project directory to produce categorized WebP images in `public/images/` and refresh `src/lib/images.ts`. This uses only this local library. See [image documentation](../docs/IMAGE_ASSETS.md) for the source manifests, workflow and generation prompts.
