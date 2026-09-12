import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const html = fs.readFileSync(path.join(root, "source.html"), "utf8");
const $ = cheerio.load(html);

const KEY = ["position", "display", "flex-direction", "justify-content", "align-items", "gap",
  "width", "height", "max-width", "min-height", "padding", "margin", "top", "left", "right", "bottom",
  "font-size", "font-weight", "font-family", "line-height", "letter-spacing", "color", "background",
  "background-color", "border-radius", "border", "border-top", "border-bottom", "opacity", "transform",
  "z-index", "overflow", "text-align", "white-space", "mix-blend-mode", "backdrop-filter", "text-transform"];

const out = [];
function brief(el) {
  const raw = el.attribs?.style || "";
  const keep = [];
  for (const p of raw.split(";")) {
    const i = p.indexOf(":");
    if (i < 0) continue;
    const k = p.slice(0, i).trim();
    let v = p.slice(i + 1).trim();
    if (!KEY.includes(k)) continue;
    if (v.length > 70) v = v.slice(0, 70) + "…";
    keep.push(`${k}=${v}`);
  }
  return keep.join(" ");
}

const MAX = Number(process.argv[3] || 11);
function walk(el, d) {
  if (d > MAX) return;
  const tag = el.tagName?.toLowerCase();
  if (!tag) return;
  const a = el.attribs || {};
  const nm = a["data-framer-name"];
  const aria = a["aria-label"];
  const cls = (a.class || "").split(" ").filter(Boolean).slice(0, 2).join(".");
  // direct text
  let t = "";
  for (const c of el.children || []) if (c.type === "text") t += c.data;
  t = t.replace(/\s+/g, " ").trim().slice(0, 90);
  const kidTags = new Set((el.children || []).filter((c) => c.type === "tag").map((c) => c.tagName?.toLowerCase()));

  const interesting = nm || aria || t || d <= 6;
  if (interesting) {
    out.push(
      `${"  ".repeat(d)}${tag}${nm ? ` [${nm}]` : ""}${aria ? ` (${aria})` : ""}${cls ? ` .${cls.split("__")[0].slice(0, 40)}` : ""}` +
      (t ? ` "${t}"` : "") + ` {kids:${kidTags.size}}` +
      (brief(el) ? `\n${"  ".repeat(d)}    ${brief(el)}` : "")
    );
  }
  for (const c of el.children || []) if (c.type === "tag") walk(c, d + 1);
}
walk($("body").get(0), 0);
fs.writeFileSync(path.join(root, "outline.txt"), out.join("\n"), "utf8");
console.log("lines", out.length);
