import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const html = fs.readFileSync(path.join(root, "source.html"), "utf8");
const $ = cheerio.load(html);

const WANT = /^(font-size|font-family|font-weight|letter-spacing|line-height|color|text-transform|text-align|white-space|--framer-font-size|--framer-font-family|--framer-font-weight|--framer-letter-spacing|--framer-line-height|--framer-text-color|--framer-text-transform|--extracted-[a-z0-9]+|top|left|right|bottom|position|width|height|background-color|opacity|mix-blend-mode|text-shadow|-webkit-text-stroke|transform|padding|gap|display|flex-direction|align-items|justify-content)=?/;

const out = [];
const seen = new Set();

function walk(el) {
  const tag = el.tagName?.toLowerCase();
  if (!tag) return;
  const a = el.attribs || {};
  let text = "";
  for (const c of el.children || []) if (c.type === "text") text += c.data;
  text = text.replace(/\s+/g, " ").trim();

  const style = a.style || "";
  const parts = style.split(";").map((s) => s.trim()).filter(Boolean).filter((p) => {
    const k = p.split(":")[0];
    return /^(font-size|font-family|font-weight|letter-spacing|line-height|color|text-transform|text-align)$/.test(k) ||
      /^--framer-(font-size|font-family|font-weight|letter-spacing|line-height|text-color|text-transform)$/.test(k) ||
      /^--extracted/.test(k) ||
      /^(width|height|background-color|text-shadow|-webkit-text-stroke-width|-webkit-text-stroke-color)$/.test(k);
  });

  if (text && text.length < 90) {
    const key = text + "|" + parts.join(";");
    if (!seen.has(key)) {
      seen.add(key);
      out.push(`TEXT ${JSON.stringify(text)}\n   ${parts.join(" | ")}`);
    }
  }
  for (const c of el.children || []) if (c.type === "tag") walk(c);
}
walk($("body").get(0));

// standalone absolute-positioned decorations with no text
const deco = [];
$("div[style]").each((_, el) => {
  const st = el.attribs.style || "";
  const a = el.attribs;
  if (!a["data-framer-name"] && !a["aria-label"]) return;
  let t = "";
  for (const c of el.children || []) if (c.type === "text") t += c.data;
  if (t.trim()) return;
  const keep = st.split(";").map((s) => s.trim()).filter(Boolean).filter((p) => /^(position|top|left|right|bottom|width|height|background|background-color|background-image|border-radius|transform|opacity|mix-blend-mode|border|border-top|z-index|padding|display|clip-path|box-shadow)=/.test(p));
  if (keep.length >= 3) deco.push(`${a["data-framer-name"] || a["aria-label"]}: ${keep.join(" | ")}`);
});

fs.writeFileSync(path.join(root, "typography.txt"), out.join("\n\n") + "\n\n\n=== DECORATIONS ===\n" + [...new Set(deco)].join("\n"), "utf8");
console.log("text nodes:", out.length, "deco:", new Set(deco).size);
