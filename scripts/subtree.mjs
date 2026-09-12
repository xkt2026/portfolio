import fs from "node:fs";
import * as cheerio from "cheerio";

const html = fs.readFileSync("docs/research/huyml-co-eb36a18b/root-8a5edab2/source.html", "utf8");
const $ = cheerio.load(html);
const sels = process.argv.slice(2);

const KEEP = /^(position|top|left|right|bottom|width|height|display|flex-direction|align-items|justify-content|gap|padding|font-size|font-family|font-weight|letter-spacing|line-height|color|background-color|opacity|mix-blend-mode|transform|text-align|white-space|text-transform|border-radius|border|grid-template-columns|grid-template-rows|z-index|overflow|text-decoration)$/;

function walk(el, d) {
  if (d > 14) return;
  const tag = el.tagName?.toLowerCase();
  if (!tag) return;
  const a = el.attribs || {};
  let text = "";
  for (const c of el.children || []) if (c.type === "text") text += c.data;
  text = text.replace(/\s+/g, " ").trim().slice(0, 70);
  const st = (a.style || "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => KEEP.test(p.split(":")[0]))
    .map((p) => (p.length > 80 ? p.slice(0, 80) + "…" : p))
    .join(" | ");
  const nm = a["data-framer-name"] || a["aria-label"];
  console.log(
    `${"  ".repeat(d)}<${tag}${nm ? ` [${nm}]` : ""}>${text ? ` "${text}"` : ""}` + (st ? `\n${"  ".repeat(d + 1)}{${st}}` : "")
  );
  for (const c of el.children || []) if (c.type === "tag") walk(c, d + 1);
}

for (const sel of sels) {
  console.log(`\n================ ${sel} ================`);
  const el = $(sel).get(0);
  if (!el) {
    console.log("NOT FOUND");
    continue;
  }
  walk(el, 0);
}
