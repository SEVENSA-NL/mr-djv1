import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../../", import.meta.url));
const canonicalPath = "mr-dj-eds-components/src/components/Templates/LocalSeoPage.jsx";
const templateDirectory = join(repoRoot, dirname(canonicalPath));

function trackedPaths() {
  return execFileSync("git", ["ls-files", "-z"], { cwd: repoRoot, encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
}

test("LocalSeoPage has one canonical Git-tree spelling on every filesystem", () => {
  const matchingPaths = trackedPaths().filter((path) => path.toLowerCase() === canonicalPath.toLowerCase());
  assert.deepEqual(matchingPaths, [canonicalPath]);

  const filesystemMatches = readdirSync(templateDirectory).filter(
    (name) => name.toLowerCase() === "localseopage.jsx"
  );
  assert.deepEqual(filesystemMatches, ["LocalSeoPage.jsx"]);
  assert.equal(existsSync(join(repoRoot, canonicalPath)), true);
});

test("App imports LocalSeoPage with the canonical case", () => {
  const appSource = readFileSync(join(repoRoot, "mr-dj-eds-components/src/App.jsx"), "utf8");
  assert.match(appSource, /Templates\/LocalSeoPage\.jsx/);
  assert.doesNotMatch(appSource, /Templates\/LocalSEOPage\.jsx/);
});
