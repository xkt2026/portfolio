import fs from "node:fs";

const css = fs.readFileSync("docs/research/huyml-co-eb36a18b/root-8a5edab2/extracted-styles.css", "utf8");
const flat = fs.readFileSync("docs/research/huyml-co-eb36a18b/root-8a5edab2/css-flat.txt", "utf8").split(/\r?\n/);

const rows = new Map();
for (const line of flat) {
  const mm = line.match(/^(.*?)@media[^{]*|^(.*)$/);
  if (!/framer-styles-preset-/.test(line)) continue;
  const preset = line.match(/framer-styles-preset-([a-z0-9]+)/)?.[1];
  const scope = line.match(/\.framer-([A-Za-z0-9]+) \.framer-styles-preset/)?.[1];
  const selKind = line.match(/rich-text-wrapper (p|h1|h2|h3|h4|h5|h6|a|li)\b/)?.[1] || (line.includes(":not(.rich-text-wrapper)") ? "base" : "?");
  const mediaM = line.match(/@media\s*([^{]*?)\s*\.framer-/);
  const media = mediaM ? mediaM[1].trim() : "base";
  const g = (k) => line.match(new RegExp("--framer-" + k + ":([^;]+)"))?.[1];
  const fam = g("font-family")?.split(",")[0];
  const key = [scope, preset, selKind, media].join("|");
  rows.set(key, {
    scope, preset, selKind, media,
    fam, size: g("font-size"), weight: g("font-weight"),
    lh: g("line-height"), ls: g("letter-spacing"),
    color: g("text-color"), transform: g("text-transform"),
    align: g("text-alignment"), boldFam: g("font-family-bold")?.split(",")[0],
  });
}

const out = [...rows.values()].map((r) =>
  `${r.scope} .${r.preset} (${r.selKind}) [${r.media}]\n    fam=${r.fam} size=${r.size} w=${r.weight} lh=${r.lh} ls=${r.ls} color=${r.color} transform=${r.transform} align=${r.align}`
);
fs.writeFileSync("docs/research/huyml-co-eb36a18b/root-8a5edab2/presets.txt", out.join("\n"), "utf8");
console.log("presets:", rows.size);
console.log(out.join("\n"));
