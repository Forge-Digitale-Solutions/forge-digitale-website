import fs from "node:fs";
import path from "node:path";

const postsDir = path.join(process.cwd(), "src/posts");
const outBlog = path.join(process.cwd(), "out/blog");

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
