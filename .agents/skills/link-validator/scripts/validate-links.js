#!/usr/bin/env node
/**
 * validate-links.js
 * Usage: node validate-links.js <file-or-dir> [vault-root]
 *
 * Scans Markdown files for [[wikilinks]] and checks whether a matching
 * .md file exists under the vault root (default: content/).
 */
const fs = require("fs");
const path = require("path");

const target = process.argv[2] || ".";
const vaultRoot = process.argv[3] || "content";

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

const vaultFiles = getAllMdFiles(vaultRoot);
const vaultNames = new Set(
  vaultFiles.map((f) => normalize(path.basename(f, ".md")))
);

const filesToCheck = fs.statSync(target).isDirectory()
  ? getAllMdFiles(target)
  : [target];

let broken = 0, valid = 0;

for (const file of filesToCheck) {
  const content = fs.readFileSync(file, "utf8");
  const links = extractLinks(content);
  for (const link of links) {
    const key = normalize(link);
    if (vaultNames.has(key)) {
      valid++;
    } else {
      console.error(`BROKEN  ${link}  (in ${file})`);
      broken++;
    }
  }
}

console.log(`\nResult: ${valid} valid, ${broken} broken`);
process.exit(broken > 0 ? 1 : 0);
