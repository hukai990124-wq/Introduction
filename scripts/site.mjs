import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Node 18 cannot run TypeScript directly; compile the tool before starting it.
const compiler = fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url));
const config = fileURLToPath(new URL("../tsconfig.tools.json", import.meta.url));
if (!existsSync(compiler)) {
  console.error("TypeScript is missing. Run npm install first.");
  process.exitCode = 1;
} else {
  const result = spawnSync(process.execPath, [compiler, "--project", config], { stdio: "inherit" });
  if (result.status !== 0) process.exitCode = result.status || 1;
  else await import("./.generated/site.js");
}
