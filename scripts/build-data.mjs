import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const html = fs.readFileSync(path.join(root, "source.html"), "utf8");
const $ = cheerio.load(html, { decodeEntities: true });

const imgName = (u) => (u || "").split("?")[0].split("/").pop();

const archive = [];
const seen = new Set();

$("a.framer-1tr28s").each((_, el) => {
  const $el = $(el);
  const slug = ($el.attr("href") || "").replace("./project/", "");
  if (seen.has(slug)) return;
  seen.add(slug);

  const multiline = (name) => {
    const $n = $el.find(`[data-framer-name="${name}"]`).first();
    if (!$n.length) return [];
    const h = $n.html() || "";
    return h
      .split(/<br[^>]*>/i)
      .map((chunk) => cheerio.load(`<x>${chunk}</x>`)("x").text().replace(/\s+/g, " ").trim())
      .filter(Boolean);
  };

  const colors = ["Color1", "Color2", "Color3"]
    .map((n) => {
      const d = $el.find(`[data-framer-name="${n}"]`).get(0);
      if (!d) return null;
      return (d.attribs.style || "").match(/rgb\([^)]+\)/)?.[0] || null;
    })
    .filter(Boolean);

  archive.push({
    slug,
    title: $el.find('[data-framer-name="Title"]').first().text().replace(/\s+/g, " ").trim(),
    date: ($el.find("time").attr("datetime") || "").slice(0, 10),
    dateLabel: $el.find("time").text().trim(),
    colors,
    recognition: multiline("Recognition"),
    roles: multiline("Author"),
    ruler: multiline("Ruler"),
    category: $el.find('[data-framer-name="Category"]').text().replace(/\s+/g, " ").trim(),
    description: $el.find('[data-framer-name="Description"]').text().replace(/\s+/g, " ").trim(),
    image: imgName($el.find("img").attr("src")),
  });
});

const selected = [];
const seenT = new Set();
$("span").each((_, el) => {
  const st = el.attribs?.style || "";
  if (!/font-size:24px/.test(st) || !/BT Glyphius Regular/.test(st)) return;
  const title = $(el).text().trim();
  if (!title || seenT.has(title)) return;
  let node = $(el);
  let card = null;
  for (let k = 0; k < 10; k++) {
    node = node.parent();
    if (!node.length) break;
    const s = node.attr("style") || "";
    if (/width:337px/.test(s) && /flex-direction:column/.test(s)) {
      card = node;
      break;
    }
  }
  if (!card) return;
  seenT.add(title);
  selected.push({
    title,
    tag: card.children("div").eq(0).find("div").eq(0).text().trim(),
    description: card.children("div").last().text().replace(/\s+/g, " ").trim(),
  });
});

fs.writeFileSync(path.join(root, "projects.json"), JSON.stringify({ archive, selected }, null, 2), "utf8");
console.log("archive:", archive.length, "selected:", selected.length);
console.log(JSON.stringify(selected, null, 2));
console.log(JSON.stringify(archive.map((a) => ({ s: a.slug, t: a.title, c: a.colors.length, r: a.recognition.length, ro: a.roles.length, ru: a.ruler.length })), null, 1));
