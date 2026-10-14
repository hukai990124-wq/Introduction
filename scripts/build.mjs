import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const compiler = path.join(root, "node_modules/typescript/bin/tsc");
const compiled = spawnSync(process.execPath, [compiler, "--project", path.join(root, "tsconfig.json")], { cwd: root, stdio: "inherit" });
if (compiled.status !== 0) process.exit(compiled.status ?? 1);
const destination = path.join(root, "dist");
mkdirSync(destination, { recursive: true });
for (const entry of ["index.html", "myCV.html", "certificates.html", "myWorks.html", "artworks.html", "styles", "app", "assets"]) {
  cpSync(path.join(root, entry), path.join(destination, entry), { recursive: true });
}
console.log("Built TypeScript modules and static website in dist/.");
