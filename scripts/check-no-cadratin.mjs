import fs from "node:fs";
import path from "node:path";

// Fails if an em dash or en dash (or the usual HTML entities) appears in
// source. The typography rule documents the forbidden characters and is the
// only exempt file. See .cursor/rules/no-cadratin.mdc.

const root = process.cwd();

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  "build",
  "coverage",
  ".git",
  "media",
]);

const BINARY_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".mp4",
  ".webm",
  ".pdf",
  ".zip",
  ".gz",
]);

const EXEMPT = new Set([path.normalize(".cursor/rules/no-cadratin.mdc")]);

const CHAR_NEEDLES = [
  { label: "U+2014", value: String.fromCodePoint(0x2014) },
  { label: "U+2013", value: String.fromCodePoint(0x2013) },
];

const ENTITY_NEEDLES = [
  { label: "mdash", value: "&" + "mdash;" },
  { label: "ndash", value: "&" + "ndash;" },
  { label: "#8212", value: "&" + "#8212;" },
  { label: "#8211", value: "&" + "#8211;" },
  { label: "#x2014", value: "&" + "#x2014;" },
  { label: "#x2013", value: "&" + "#x2013;" },
];

const ESCAPE_NEEDLES = [
  { label: "js-u2014", value: "\\" + "u2014" },
  { label: "js-u2013", value: "\\" + "u2013" },
  { label: "js-u-brace-2014", value: "\\" + "u{2014}" },
  { label: "js-u-brace-2013", value: "\\" + "u{2013}" },
];

function isGeneratedBlogMarkdown(rel) {
  const normalized = rel.split(path.sep).join("/");
  if (!normalized.startsWith("public/blog/") || !normalized.endsWith(".md")) {
    return false;
  }
  const rest = normalized.slice("public/blog/".length);
  if (!rest.includes("/")) return true;
  return rest.endsWith("/index.md") && rest.split("/").length === 2;
}

function walk(dir, hits) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full);
    if (entry.isDirectory()) {
      walk(full, hits);
      continue;
    }
    if (!entry.isFile()) continue;
    if (EXEMPT.has(rel)) continue;
    if (isGeneratedBlogMarkdown(rel)) continue;
    if (BINARY_EXT.has(path.extname(entry.name).toLowerCase())) continue;

    const buffer = fs.readFileSync(full);
    if (buffer.includes(0)) continue;

    const lines = buffer.toString("utf8").split("\n");
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const lowered = line.toLowerCase();
      const match =
        CHAR_NEEDLES.find((needle) => line.includes(needle.value)) ??
        ENTITY_NEEDLES.find((needle) => lowered.includes(needle.value)) ??
        ESCAPE_NEEDLES.find((needle) => lowered.includes(needle.value));
      if (!match) continue;
      hits.push({ file: rel, line: index + 1, label: match.label });
    }
  }
}

const hits = [];
walk(root, hits);

if (hits.length === 0) {
  console.log("check:cadratin: ok");
  process.exit(0);
}

console.error(`check:cadratin: ${hits.length} occurrence(s)`);
for (const hit of hits) {
  console.error(`${hit.file}:${hit.line} (${hit.label})`);
}
process.exit(1);
