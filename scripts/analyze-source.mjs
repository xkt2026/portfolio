import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const src = path.join(root, "source.html");
const html = fs.readFileSync(src, "utf8");

const out = [];
const log = (...a) => out.push(a.join(" "));

log("=== SIZE ===", html.length);

// Title / meta
const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
log("=== TITLE ===", title);
for (const m of html.matchAll(/<meta[^>]+(?:name|property)="([^"]+)"[^>]*content="([^"]*)"/gi)) {
  if (/og:|twitter:|description/i.test(m[1])) log("META", m[1], "=>", m[2].slice(0, 300));
}

// link tags
for (const m of html.matchAll(/<link[^>]+>/gi)) {
  if (/stylesheet|icon|font|preload/i.test(m[0])) log("LINK", m[0].slice(0, 300));
}

// style blocks -> save
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);
fs.writeFileSync(path.join(root, "extracted-styles.css"), styles.join("\n\n"), "utf8");
log("=== STYLE BLOCKS ===", styles.length, "total chars", styles.join("").length);

const css = styles.join("\n");
const inline = [...html.matchAll(/style="([^"]*)"/gi)].map((m) => m[1]).join(";\n");
const allCss = css + "\n" + inline;

// Font families
const fonts = new Map();
for (const m of allCss.matchAll(/font-family:\s*([^;"}]+)/gi)) {
  const v = m[1].trim();
  fonts.set(v, (fonts.get(v) || 0) + 1);
}
log("=== FONT FAMILIES ===");
[...fonts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([k, v]) => log(v, "|", k));

// font-face declarations
log("=== @font-face ===");
for (const m of allCss.matchAll(/@font-face\s*{([^}]*)}/gi)) {
  const body = m[1].replace(/\s+/g, " ").trim();
  const fam = body.match(/font-family:\s*([^;]+)/)?.[1];
  const wt = body.match(/font-weight:\s*([^;]+)/)?.[1];
  const style = body.match(/font-style:\s*([^;]+)/)?.[1];
  const url = body.match(/url\(([^)]+)\)/)?.[1];
  log(`fam=${fam} weight=${wt} style=${style} url=${(url || "").slice(0, 160)}`);
}

// Colors
const colors = new Map();
for (const m of allCss.matchAll(/(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|oklch\([^)]*\)|hsla?\([^)]*\))/g)) {
  const v = m[0].toLowerCase().replace(/\s+/g, "");
  colors.set(v, (colors.get(v) || 0) + 1);
}
log("=== COLORS (top 40) ===");
[...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([k, v]) => log(v, "|", k));

// Images
const imgs = new Map();
for (const m of html.matchAll(/(?:src|srcset|background-image:url\()["'\s]*([^"'\s)]*framerusercontent[^"'\s)]*)/gi)) {
  let u = m[1].split(/[?#]/)[0];
  imgs.set(u, (imgs.get(u) || 0) + 1);
}
log("=== UNIQUE framerusercontent ASSETS ===", imgs.size);
[...imgs.entries()].forEach(([k, v]) => log(v, "|", k));

// All img tags
log("=== IMG TAGS ===");
for (const m of html.matchAll(/<img[^>]+>/gi)) {
  const alt = m[0].match(/alt="([^"]*)"/)?.[1] ?? "";
  const src = m[0].match(/src="([^"]*)"/)?.[1] ?? "";
  log("alt=" + JSON.stringify(alt), "|", src.split("?")[0]);
}

// Text content
const stripped = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim())
  .filter(Boolean);
fs.writeFileSync(path.join(root, "extracted-text.txt"), stripped.join("\n"), "utf8");
log("=== TEXT NODE COUNT ===", stripped.length);

fs.writeFileSync(path.join(root, "analysis.txt"), out.join("\n"), "utf8");
console.log(out.join("\n"));
