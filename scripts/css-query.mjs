import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const sels = process.argv.slice(3);
const css = fs.readFileSync(path.join(root, "extracted-styles.css"), "utf8");

// split into top-level rules, honoring @media nesting
function splitRules(text) {
  const rules = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        rules.push(text.slice(start, i + 1));
        start = i + 1;
      }
    }
  }
  return rules;
}

const rules = splitRules(css);
console.log("TOTAL RULES", rules.length);

// media query map
const mediaMap = new Map();
for (const r of rules) {
  const m = r.match(/@media[^{]+/);
  if (m) mediaMap.set(m[0].trim(), (mediaMap.get(m[0].trim()) || 0) + 1);
}
console.log("=== MEDIA QUERIES ===");
[...mediaMap.entries()].forEach(([k, v]) => console.log(v, k));

console.log("\n=== SELECTOR RULES ===");
for (const sel of sels) {
  let found = 0;
  for (const r of rules) {
    const head = r.split("{")[0];
    if (head.includes(sel)) {
      console.log("\n--- " + sel + " ---");
      console.log(r.replace(/\s+/g, " ").trim().slice(0, 2200));
      found++;
      if (found > 6) break;
    }
  }
  if (!found) console.log("\n--- " + sel + " : NOT FOUND ---");
}

// hidden-* rules
console.log("\n=== HIDDEN RULES ===");
for (const r of rules) {
  if (/^\.ssr-variant|hidden-/.test(r.split("{")[0].trim()) || /^\.hidden-/.test(r.trim())) {
    console.log(r.replace(/\s+/g, " ").trim().slice(0, 400));
  }
}
