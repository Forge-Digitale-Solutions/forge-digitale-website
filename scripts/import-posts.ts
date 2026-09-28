import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPayload } from "payload";
import config from "../src/payload.config";

function loadEnvFile(file: string) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    if (process.env[key]) continue;
    const value = trimmed.slice(eq + 1).replace(/^["']|["']$/g, "");
    process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const postsDirectory = path.join(process.cwd(), "src/posts");
const categories = new Set(["Web", "Hardware", "Gestion", "Sécurité"]);

function day(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const text = String(value ?? "");
  return text.slice(0, 10);
}

async function main() {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error("DATABASE_URI and PAYLOAD_SECRET are required");
  }

  const payload = await getPayload({ config });
  const files = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

  for (const fileName of files) {
    const slug = fileName.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
    const parsed = matter(raw);
    const data = parsed.data as {
      title?: string;
      h1?: string;
      date?: unknown;
      excerpt?: string;
      category?: string;
      image?: string;
    };

    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs.length > 0) {
      console.log(`skip ${slug}`);
      continue;
    }

    let imageId: number | undefined;
    if (data.image?.startsWith("/")) {
      const filePath = path.join(process.cwd(), "public", data.image);
      if (fs.existsSync(filePath)) {
        const media = await payload.create({
          collection: "media",
          data: { alt: data.title || slug },
          filePath,
        });
        imageId = media.id;
      }
    }

    const rawCategory = data.category || "";
    const category = (
      categories.has(rawCategory) ? rawCategory : "Web"
    ) as "Web" | "Hardware" | "Gestion" | "Sécurité";

    await payload.create({
      collection: "posts",
      data: {
        title: data.title || slug,
        h1: data.h1,
        slug,
        publishedAt: day(data.date),
        excerpt: data.excerpt || "",
        category,
        content: parsed.content.trim(),
        image: imageId,
        _status: "published",
      },
    });
    console.log(`imported ${slug}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
