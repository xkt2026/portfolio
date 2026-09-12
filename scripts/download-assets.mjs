import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.argv[2] || "docs/research/huyml-co-eb36a18b/root-8a5edab2";
const siteKey = process.argv[3] || "huyml-co-eb36a18b";
const pageKey = process.argv[4] || path.basename(root);
const shared = path.join("public", "sites", siteKey, "shared");
const pageDir = path.join("public", "sites", siteKey, pageKey);
fs.mkdirSync(shared, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

const html = fs.readFileSync(path.join(root, "source.html"), "utf8");
const css = fs.readFileSync(path.join(root, "extracted-styles.css"), "utf8");

// ---- fonts: map family/weight -> url
const fontFaces = [];
for (const m of css.matchAll(/@font-face\s*{([^}]*)}/gi)) {
  const body = m[1].replace(/\s+/g, " ");
  const fam = body.match(/font-family:\s*"([^"]+)"/)?.[1] || body.match(/font-family:\s*([^;]+)/)?.[1];
  const weight = body.match(/font-weight:\s*([^;]+)/)?.[1];
  const style = body.match(/font-style:\s*([^;]+)/)?.[1];
  const url = body.match(/url\(["']?([^"')]+)["']?\)/)?.[1];
  if (url) fontFaces.push({ fam: fam?.trim(), weight: weight?.trim(), style: style?.trim(), url });
}

// ---- images
const urlSet = new Map();
for (const m of html.matchAll(/(?:src|srcset)=["']([^"']*framerusercontent[^"']*)["']/gi)) {
  const u = m[1].split(/\s+/)[0].split(/[?#]/)[0];
  urlSet.set(u, true);
}
for (const m of css.matchAll(/url\(["']?([^"')]*framerusercontent[^"')]*)["']?\)/gi)) {
  urlSet.set(m[1].split(/[?#]/)[0], true);
}
for (const f of fontFaces) urlSet.set(f.url.split(/[?#]/)[0], true);

const urls = [...urlSet.keys()].filter((u) => /\.(woff2?|ttf|otf|png|jpe?g|webp|gif|svg|avif|riv)$/i.test(u));

const manifest = { site: "https://huyml.co", page: "/", downloadedAt: new Date().toISOString(), fonts: [], assets: [] };

function localName(u) {
  const base = u.split("/").pop();
  return base;
}

const report = [];
const CONCURRENCY = 6;
let idx = 0;
async function worker() {
  while (idx < urls.length) {
    const u = urls[idx++];
    const name = localName(u);
    const dir = /\.(woff2?|ttf|otf)$/i.test(u) ? shared : /\.(svg|png)$/i.test(u) && u.includes("/images/") ? shared : shared;
    const dest = path.join(dir, name);
    try {
      if (!fs.existsSync(dest)) {
        const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
      }
      const size = fs.statSync(dest).size;
      const sha = crypto.createHash("sha256").update(fs.readFileSync(dest)).digest("hex").slice(0, 12);
      report.push({ url: u, file: `/sites/${siteKey}/shared/${name}`, bytes: size, sha });
    } catch (e) {
      report.push({ url: u, error: String(e.message || e) });
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

manifest.fonts = fontFaces.map((f) => ({ family: f.fam, weight: f.weight, style: f.style, remote: f.url, local: `/sites/${siteKey}/shared/${localName(f.url)}` }));
manifest.assets = report;
fs.writeFileSync(path.join(root, "assets-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

const ok = report.filter((r) => !r.error);
console.log("total urls:", urls.length, "ok:", ok.length, "failed:", report.length - ok.length);
console.log("fonts:", manifest.fonts.length);
for (const r of report.filter((x) => x.error)) console.log("FAIL", r.url, r.error);
