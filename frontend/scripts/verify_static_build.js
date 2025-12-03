import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const indexFile = path.join(distDir, "index.html");
const assetsDir = path.join(distDir, "assets");

const exists = (target) => {
  try {
    fs.accessSync(target, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

if (!exists(distDir) || !exists(indexFile) || !exists(assetsDir)) {
  console.error("ERROR: Vite build output ontbreekt (dist/index.html of dist/assets niet gevonden).");
  process.exit(2);
}

console.log("OK: Vite build output gevonden in dist/.");
