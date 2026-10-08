import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("public/icon.svg", root));
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((size) => sharp(source).resize(size, size).png().toBuffer()),
);

// ICO directory entries point to complete PNG images at native tab sizes.
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
pngs.forEach((png, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(
  new URL("public/favicon.ico", root),
  Buffer.concat([header, ...pngs]),
);
await writeFile(new URL("public/favicon-32.png", root), pngs[1]);
await sharp(source)
  .resize(180, 180)
  .flatten({ background: "#fff0f4" })
  .png()
  .toFile(fileURLToPath(new URL("public/apple-touch-icon.png", root)));
console.log(
  "Prepared branded SVG, 16/32/48px ICO, 32px PNG and 180px touch icon.",
);
