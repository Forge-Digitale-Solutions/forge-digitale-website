import fs from "node:fs";
import path from "node:path";

// Served by `next start` from `public/` (static export used to write `out/`).
// Apache content negotiation is replaced by `src/proxy.ts` (Accept: text/markdown).
const postsDir = path.join(process.cwd(), "src/posts");
const outBlog = path.join(process.cwd(), "public/blog");

const names = fs.readdirSync(postsDir).filter((name) => name.endsWith(".md"));

for (const name of names) {
  const slug = name.slice(0, -3);
  const source = fs.readFileSync(path.join(postsDir, name));
  const dir = path.join(outBlog, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(outBlog, `${slug}.md`), source);
  fs.writeFileSync(path.join(dir, "index.md"), source);
}

console.log(`blog markdown: ${names.length} articles`);
