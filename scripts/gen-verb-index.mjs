// Regenerates the "Verb index" tables in content/concepts/verbs-of-computing/index.md from verbs.json,
// and checks that every verb's "base" verbs exist and every "wiki" link points to a real page.
// Usage (from compuwiki-website/): node scripts/gen-verb-index.mjs
import fs from "node:fs";
import path from "node:path";

const dir = "content/concepts/verbs-of-computing";
const jsonFile = path.join(dir, "verbs.json");
const mdFile = path.join(dir, "index.md");
const START = "<!-- verb-index:start -->", END = "<!-- verb-index:end -->";

const DATA = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

const ids = new Set(DATA.palabras.map(p => p.id));
const capas = new Set(DATA.capas.map(c => c.id)), fams = new Set(DATA.familias.map(f => f.id));
const errs = [];
for (const p of DATA.palabras) {
  if (!capas.has(p.capa)) errs.push(`${p.id}: unknown layer "${p.capa}"`);
  if (!fams.has(p.fam)) errs.push(`${p.id}: unknown family "${p.fam}"`);
  for (const b of p.base) if (!ids.has(b)) errs.push(`${p.id}: built from unknown verb "${b}"`);
  for (const w of p.wiki || []) {
    if (!fs.existsSync(path.join("content", w + ".md"))) errs.push(`${p.id}: wiki page content/${w}.md does not exist`);
    if (!DATA.wikiTitles[w]) errs.push(`wikiTitles: no title for ${w}`);
  }
}
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }

const byId = Object.fromEntries(DATA.palabras.map(p => [p.id, p]));
const memo = {};
const depth = id => (memo[id] ??= byId[id].base.length ? 1 + Math.max(...byId[id].base.map(depth)) : 0);
const cell = s => String(s).replace(/\|/g, "\\|");

let out = "";
for (const c of DATA.capas) {
  out += `\n### ${c.en}\n\n*${c.desc.en}.* Body lens: ${c.cuerpo.en}.\n\n| Verb | Level | Built from | Meaning | PowerShell |\n|---|---|---|---|---|\n`;
  for (const p of DATA.palabras.filter(p => p.capa === c.id)) {
    const link = `<a href="./verbs-of-computing-map.html#${p.id}" data-router-ignore>${p.en}</a>`;
    const base = p.base.map(b => byId[b].en).join(", ") || "logic gates";
    out += `| ${link} | ${depth(p.id)} | ${base} | ${cell(p.def.en)} | ${p.ps ? "`" + p.ps + "`" : "—"} |\n`;
  }
}

const md = fs.readFileSync(mdFile, "utf8");
const a = md.indexOf(START), b = md.indexOf(END);
if (a < 0 || b < a) { console.error(`Markers ${START} / ${END} not found in ${mdFile}`); process.exit(1); }
fs.writeFileSync(mdFile, md.slice(0, a + START.length) + "\n" + out + "\n" + md.slice(b));
console.log(`Verb index updated: ${DATA.palabras.length} verbs, ${DATA.palabras.filter(p => p.wiki).length} with wiki links.`);
