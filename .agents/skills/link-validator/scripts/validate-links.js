#!/usr/bin/env node
/**
 * validate-links.js
 * Usage: node validate-links.js <file-or-dir> [vault-root...]
 *
 * Scans Markdown files for [[wikilinks]] and checks whether a matching
 * .md file exists under each given vault root. The site is bilingual,
 * so by default both `content/` (Swedish source) and `content-en/`
 * (English mirror) are checked — a wikilink must resolve in BOTH
 * vaults for the link to render correctly on each language's build.
 *
 * If you pass explicit vault roots, only those are checked.
 *
 * Examples:
 *   node validate-links.js content/Sessions/Session\ 03*.md
 *   node validate-links.js content-en/Sessions/Session\ 03*.md content-en
 *   node validate-links.js content/Platser/Caer\ Konig.md content content-en
 */
import fs from "fs";
import path from "path";

const target = process.argv[2] || ".";
const vaultRoots = process.argv.slice(3);
if (vaultRoots.length === 0) {
  if (fs.existsSync("content")) vaultRoots.push("content");
  if (fs.existsSync("content-en")) vaultRoots.push("content-en");
}
if (vaultRoots.length === 0) {
  console.error("ERROR: no vault root found (looked for content/ and content-en/).");
  process.exit(2);
}

function getAllMdFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllMdFiles(full));
    else if (entry.name.endsWith(".md")) results.push(full);
  }
  return results;
}

function extractLinks(content) {
  const re = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  const links = [];
  let m;
  while ((m = re.exec(content)) !== null) links.push(m[1].trim());
  return links;
}

function normalize(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const namesByRoot = new Map();
for (const root of vaultRoots) {
  if (!fs.existsSync(root)) {
    console.error(`WARN: vault root '${root}' not found, skipping.`);
    continue;
  }
  const files = getAllMdFiles(root);
  namesByRoot.set(root, new Set(files.map((f) => normalize(path.basename(f, ".md")))));
}

const filesToCheck = fs.statSync(target).isDirectory()
  ? getAllMdFiles(target)
  : [target];

let broken = 0, valid = 0, mirrorMissing = 0;

for (const file of filesToCheck) {
  const content = fs.readFileSync(file, "utf8");
  const links = extractLinks(content);
  for (const link of links) {
    const key = normalize(link);
    const missingIn = [];
    for (const [root, names] of namesByRoot) {
      if (!names.has(key)) missingIn.push(root);
    }
    if (missingIn.length === 0) {
      valid++;
    } else if (missingIn.length === namesByRoot.size) {
      console.error(`BROKEN  ${link}  (in ${file}) — missing in all vaults`);
      broken++;
    } else {
      console.error(`MIRROR  ${link}  (in ${file}) — missing in: ${missingIn.join(", ")}`);
      mirrorMissing++;
    }
  }
}

console.log(`\nResult: ${valid} valid, ${broken} broken, ${mirrorMissing} bilingual-mirror-missing`);
process.exit(broken > 0 ? 1 : 0);
