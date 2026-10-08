import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { suppliedAssets } from "./asset-map.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const sourceDirectory = path.resolve(
  process.argv[2] || path.join(root, "../assets"),
);
const inventory = JSON.parse(
  await readFile(path.join(root, "scripts/asset-inventory.json"), "utf8"),
);
const records = [];
for (const asset of suppliedAssets) {
  const input = path.join(sourceDirectory, inventory[asset.index].name);
  const output = path.join(root, "assets", asset.source);
  await mkdir(path.dirname(output), { recursive: true });
  const bytes = await readFile(input);
  const hash = createHash("sha256").update(bytes).digest("hex");
  await copyFile(input, output);
  if (
    createHash("sha256")
      .update(await readFile(output))
      .digest("hex") !== hash
  )
    throw new Error(`Copy verification failed: ${asset.source}`);
  if (
    createHash("sha256")
      .update(await readFile(input))
      .digest("hex") !== hash
  )
    throw new Error("A supplied source changed during import");
  records.push({
    source: asset.source,
    sha256: hash,
    referenceOnly: asset.referenceOnly,
  });
}
await writeFile(
  path.join(root, "assets/supplied-assets.json"),
  JSON.stringify(records, null, 2),
);
console.log(
  `Copied and checksum-verified ${records.length} supplied images. Source files were only read.`,
);
