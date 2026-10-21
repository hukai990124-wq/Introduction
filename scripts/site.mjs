// Local development and build tools. Uses Node.js built-ins only.
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";

const root = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const source = path.join(root, "src");
const output = path.join(root, "dist");
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".ttf": "font/ttf", ".woff2": "font/woff2", ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8"
};

function inside(base, relative) {
  const filename = path.resolve(base, relative);
  return filename === base || filename.startsWith(base + path.sep) ? filename : null;
}

function publicFile(pathname, built = false) {
  let relative = decodeURIComponent(pathname).replace(/^\/+/, "") || "index.html";
  if (!path.posix.extname(relative)) relative += ".html";
  if (built) return inside(output, relative);
  if (/^[^/]+\.html$/.test(relative)) return inside(path.join(source, "html"), relative);
  if (/^(css|js|assets)\//.test(relative)) return inside(source, relative);
  return null;
}

function check() {
  const syntax = spawnSync(process.execPath, ["--check", path.join(source, "js/site.js")], { stdio: "inherit" });
  if (syntax.status !== 0) throw new Error("JavaScript syntax validation failed.");
  const files = readdirSync(path.join(source, "html")).filter(name => name.endsWith(".html"));
  const errors = [];
  let checked = 0;
  const inspect = (value, from) => {
    if (/^(?:https?:|mailto:|tel:|data:|blob:|\/\/)/i.test(value)) return;
    const url = new URL(value, "http://local/" + from);
    const filename = publicFile(url.pathname);
    if (!filename || !existsSync(filename) || !lstatSync(filename).isFile()) errors.push(`${from}: missing resource ${value}`);
    else if (url.hash && filename.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      const html = readFileSync(filename, "utf8");
      if (id && !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) errors.push(`${from}: missing anchor ${value}`);
    }
    checked++;
  };
  for (const file of files) {
    const html = readFileSync(path.join(source, "html", file), "utf8");
    for (const match of html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) inspect(match[1], file);
  }
  const css = readFileSync(path.join(source, "css/site.css"), "utf8");
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) inspect(match[1].trim(), "css/site.css");
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(`Checked JavaScript syntax, ${files.length} HTML pages and ${checked} local links/assets.`);
}

function build() {
  check();
  // Replace only this project's generated directory; never follow a link.
  if (path.dirname(output) !== root) throw new Error("Invalid output directory.");
  if (existsSync(output) && lstatSync(output).isSymbolicLink()) throw new Error("dist must not be a symbolic link.");
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  for (const file of readdirSync(path.join(source, "html"))) {
    if (file.endsWith(".html")) cpSync(path.join(source, "html", file), path.join(output, file));
  }
  for (const directory of ["css", "js", "assets"]) cpSync(path.join(source, directory), path.join(output, directory), { recursive: true });
  console.log("Built website in dist/ (generated output; edit src/).");
}

function serve(built = false) {
  if (built && !existsSync(path.join(output, "index.html"))) throw new Error("Run npm run build before npm run preview.");
  const port = Number(process.env.PORT || 8765);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be an integer from 1 to 65535.");
  console.log("Starting local website preview...");
  const server = http.createServer((request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
    try {
      const url = new URL(request.url || "/", "http://localhost");
      const filename = publicFile(url.pathname, built);
      if (!filename || !mime[path.extname(filename)] || !lstatSync(filename).isFile()) throw new Error("Not found");
      const content = readFileSync(filename);
      response.writeHead(200, { "Content-Type": mime[path.extname(filename)], "Content-Length": content.length, "Cache-Control": "no-store" });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    }
  });
  server.on("error", error => { console.error(error.message); process.exitCode = 1; });
  server.listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port} (${built ? "dist" : "src"})`));
}

try {
  const command = process.argv[2] || "dev";
  if (command === "check") check();
  else if (command === "build") build();
  else if (command === "dev") serve();
  else if (command === "preview") serve(true);
  else throw new Error("Use dev, build, preview or check.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
