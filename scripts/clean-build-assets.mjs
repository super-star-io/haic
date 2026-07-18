import { access, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";

const buildRoot = path.resolve("dist");
const fontsRoot = path.join(buildRoot, "client/assets/_vinext_fonts");

try {
  await access(fontsRoot);
  const assetRoot = path.join(buildRoot, "client/assets");
  const assets = await readdir(assetRoot, { recursive: true, withFileTypes: true });
  const searchable = assets.filter((entry) => entry.isFile() && /\.(?:css|js)$/.test(entry.name));
  let referencesBundledFonts = false;

  for (const entry of searchable) {
    const content = await readFile(path.join(entry.parentPath, entry.name), "utf8");
    if (content.includes("_vinext_fonts/")) {
      referencesBundledFonts = true;
      break;
    }
  }

  if (!referencesBundledFonts) {
    await rm(fontsRoot, { recursive: true });
    console.log("Removed unreferenced vinext font assets.");
  }
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
