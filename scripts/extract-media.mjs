import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const css = fs.readFileSync(path.join(root, "extracted-styles.css"), "utf8");

const out = [];
let i = 0;
let depth = 0;
let buf = "";
let media = "TOP";
let mediaStack = [];

function flushSelector() {
  const sel = buf.trim();
  buf = "";
  return sel;
}

// Simple tokenizer over the whole CSS
while (i < css.length) {
  const ch = css[i];

  // detect @media
  if (ch === "@" && css.startsWith("@media", i)) {
    const open = css.indexOf("{", i);
    const q = css.slice(i, open).replace(/\s+/g, " ").trim();
    mediaStack.push(media);
    media = q;
    depth++;
    i = open + 1;
    buf = "";
    continue;
  }
  if (ch === "@" && (css.startsWith("@media", i) === false)) {
    // other at-rules: skip to matching brace
    const open = css.indexOf("{", i);
    if (open < 0) break;
    let d = 0;
    let j = open;
    for (; j < css.length; j++) {
      if (css[j] === "{") d++;
      else if (css[j] === "}") {
        d--;
        if (d === 0) break;
      }
    }
    i = j + 1;
    buf = "";
    continue;
  }

  if (ch === "{") {
    const sel = buf.trim();
    buf = "";
    // read body until matching }
    let d = 1;
    let j = i + 1;
    for (; j < css.length; j++) {
      if (css[j] === "{") d++;
      else if (css[j] === "}") {
        d--;
        if (d === 0) break;
      }
    }
    const body = css.slice(i + 1, j).replace(/\s+/g, " ").trim();
    if (sel && body) {
      out.push((media === "TOP" ? "" : media + "  ") + sel + " { " + body + " }");
    }
    i = j + 1;
    continue;
  }
  if (ch === "}") {
    if (mediaStack.length) media = mediaStack.pop();
    i++;
    buf = "";
    continue;
  }
  buf += ch;
  i++;
}

fs.writeFileSync(path.join(root, "css-flat.txt"), out.join("\n"), "utf8");
console.log("rules", out.length, "chars", out.join("\n").length);
