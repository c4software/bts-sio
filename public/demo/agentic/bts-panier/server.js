// Un petit serveur web sans dépendance : il sert public/ et src/.
// Lancement : npm start, puis http://localhost:3000
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT) || 3000;
const ROOT = import.meta.dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

createServer(async (req, res) => {
  let path = new URL(req.url, "http://localhost").pathname;
  if (path === "/") path = "/public/index.html";
  // Seuls public/ et src/ sont servis : jamais package.json, test/ ou .env.
  const file = normalize(join(ROOT, path));
  const allowed = [join(ROOT, "public"), join(ROOT, "src")];
  if (!allowed.some((dir) => file.startsWith(dir + "/"))) {
    res.writeHead(404).end("Introuvable");
    return;
  }
  try {
    const content = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "text/plain" });
    res.end(content);
  } catch {
    res.writeHead(404).end("Introuvable");
  }
}).listen(PORT, () => {
  console.log(`Boutique BTS : http://localhost:${PORT}`);
});
