import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const html = fs.readFileSync(path.join(root, "source.html"), "utf8");
const $ = cheerio.load(html);

const KEEP = [
  "position", "display", "flex-direction", "justify-content", "align-items",
  "gap", "grid-template-columns", "grid-template-rows", "top", "right",
  "bottom", "left", "width", "height", "max-width", "min-height",
  "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
  "margin", "font-size", "font-weight", "font-family", "line-height",
  "letter-spacing", "text-transform", "text-align", "color", "background",
  "background-color", "border-radius", "border", "border-top", "border-bottom",
  "opacity", "transform", "z-index", "mix-blend-mode", "text-shadow",
  "filter", "backdrop-filter", "overflow", "white-space", "aspect-ratio",
  "object-fit", "column-gap", "row-gap", "text-decoration", "box-shadow",
  "clip-path", "flex-shrink", "flex-grow", "pointer-events", "cursor", "visibility"
];

const out = [];
function stylesOf(el) {
  const raw = el.attribs?.style || "";
  if (!raw) return "";
  const parts = raw.split(";").map((s) => s.trim()).filter(Boolean);
  const keep = [];
  const framerVars = [];
  for (const p of parts) {
    const idx = p.indexOf(":");
    if (idx < 0) continue;
    const k = p.slice(0, idx).trim();
    let v = p.slice(idx + 1).trim();
    if (v.length > 90) v = v.slice(0, 90) + "…";
    if (k.startsWith("--framer-") || k.startsWith("--token-") || k.startsWith("--bt-")) {
      framerVars.push(`${k}=${v}`);
    } else if (KEEP.includes(k)) {
      keep.push(`${k}:${v}`);
    }
  }
  return [...keep, ...framerVars].join(" | ");
}

function walk(el, depth, maxDepth) {
  if (depth > maxDepth) return;
  const tag = el.tagName?.toLowerCase();
  if (!tag) return;
  const a = el.attribs || {};
  const clsShort = (a.class || "").split(" ").filter(Boolean).slice(0, 2).join(".").split("__")[0].slice(0, 55);
  const st = stylesOf(el);
  const indent = "  ".repeat(depth);
  const imgSrc = tag === "img" ? (a.src || "").split("?")[0].replace("https://framerusercontent.com/", "") : "";
  const meta = [];
  if (a["data-framer-name"]) meta.push(`name=${JSON.stringify(a["data-framer-name"]).slice(0, 70)}`);
  if (a["aria-label"]) meta.push(`aria=${JSON.stringify(a["aria-label"])}`);
  if (a.id) meta.push(`id=${a.id}`);
  if (a.href && a.href !== "#") meta.push(`href=${a.href.slice(0, 60)}`);
  if (tag === "img") meta.push(`src=${imgSrc}`);

  let directText = "";
  for (const c of el.children || []) if (c.type === "text") directText += c.data;
  directText = directText.replace(/\s+/g, " ").trim().slice(0, 140);

  out.push(
    `${indent}<${tag}${meta.length ? " " + meta.join(" ") : ""}${clsShort ? " ." + clsShort : ""}>` +
      (directText ? ` TEXT="${directText}"` : "") +
      (st ? `\n${indent}   {${st}}` : "")
  );
  for (const c of el.children || []) if (c.type === "tag") walk(c, depth + 1, maxDepth);
}

walk($("body").get(0), 0, Number(process.argv[3] || 20));
fs.writeFileSync(path.join(root, "dom-tree.txt"), out.join("\n"), "utf8");
console.log("lines:", out.length);
