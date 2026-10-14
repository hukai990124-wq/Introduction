import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".jpg": "image/jpeg", ".png": "image/png", ".ttf": "font/ttf" };
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
    const allowed = /^(index\.html|myCV\.html|certificates\.html|myWorks\.html|artworks\.html|(?:styles|app|assets)\/.+)$/;
    const filename = path.resolve(root, relative);
    if (!allowed.test(relative) || !filename.startsWith(root) || !mime[path.extname(filename)]) {
      response.writeHead(404).end("Not found");
      return;
    }
    const content = await readFile(filename);
    response.writeHead(200, { "Content-Type": mime[path.extname(filename)], "Cache-Control": "no-store" });
    response.end(content);
  } catch {
    if (!response.headersSent) response.writeHead(404);
    response.end("Not found");
  }
}).listen(8765, "127.0.0.1", () => console.log("Local: http://127.0.0.1:8765"));
