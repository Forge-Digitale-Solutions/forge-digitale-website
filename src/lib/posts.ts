import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "src/posts-archive");

export interface PostFaqItem {
  question: string;
  answer: string;
}

export interface PostData {
  id: string;
  title: string;
  h1?: string;
  date: string;
  lastModified?: string;
  excerpt: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  faq?: PostFaqItem[];
  category: string;
  contentHtml?: string;
}

type MediaDoc = { url?: string | null };
type PostDoc = {
  slug?: string | null;
  title?: string | null;
  h1?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  excerpt?: string | null;
  category?: string | null;
  content?: string | null;
  image?: MediaDoc | string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: MediaDoc | string | null;
  faq?: { question?: string | null; answer?: string | null }[] | null;
};

function day(value: string | undefined | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return processed.toString().replace(
    /<a href="http/g,
    '<a target="_blank" rel="noopener noreferrer" href="http',
  );
}

function imageUrl(
  image: MediaDoc | string | null | undefined,
): string | undefined {
  if (!image || typeof image === "string") return undefined;
  return image.url || undefined;
}

function faqItems(faq: PostDoc["faq"]): PostFaqItem[] | undefined {
  if (!faq?.length) return undefined;
  const items = faq
    .map((item) => ({
      question: item.question?.trim() || "",
      answer: item.answer?.trim() || "",
    }))
    .filter((item) => item.question && item.answer);
  return items.length ? items : undefined;
}

async function toPostData(doc: PostDoc, withHtml: boolean): Promise<PostData> {
  return {
    id: doc.slug || "",
    title: doc.title || "",
    h1: doc.h1 || undefined,
    date: day(doc.publishedAt),
    lastModified: day(doc.updatedAt) || day(doc.publishedAt),
    excerpt: doc.excerpt || "",
    image: imageUrl(doc.image),
    metaTitle: doc.metaTitle || undefined,
    metaDescription: doc.metaDescription || undefined,
    ogImage: imageUrl(doc.ogImage),
    faq: faqItems(doc.faq),
    category: doc.category || "Web",
    contentHtml: withHtml ? await markdownToHtml(doc.content || "") : undefined,
  };
}

async function payloadPosts(): Promise<PostDoc[] | null> {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) return null;
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      overrideAccess: false,
      depth: 1,
      limit: 200,
      sort: "-publishedAt",
    });
    return result.docs as PostDoc[];
  } catch (error) {
    console.error("Payload posts unavailable, using Markdown", error);
    return null;
  }
}

function readMarkdownList(): PostData[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const allPostsData = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const matterResult = matter(fileContents);
      return {
        id,
        ...(matterResult.data as Omit<PostData, "id" | "contentHtml">),
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function readMarkdownPost(id: string): Promise<PostData> {
  const fileContents = fs.readFileSync(path.join(postsDirectory, `${id}.md`), "utf8");
  const matterResult = matter(fileContents);
  return {
    id,
    contentHtml: await markdownToHtml(matterResult.content),
    ...(matterResult.data as Omit<PostData, "id" | "contentHtml">),
  };
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const remote = await payloadPosts();
  if (remote?.length) {
    const payload = await Promise.all(
      remote.filter((doc) => doc.slug).map((doc) => toPostData(doc, false)),
    );
    return payload.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  // Emergency fallback only: archived Markdown if Payload is unavailable
  return readMarkdownList();
}

export function formatPostMarkdown(title: string, content: string): string {
  const heading = title.trim();
  const body = (content || "").replace(/^\uFEFF/, "").trim();
  const h1 = `# ${heading}`;
  if (body === h1 || body.startsWith(`${h1}\n`) || body.startsWith(`${h1}\r\n`)) {
    return body.endsWith("\n") ? body : `${body}\n`;
  }
  return `${h1}\n\n${body}\n`;
}

export async function getPostMarkdown(id: string): Promise<string | null> {
  const slug = id.replace(/\.md$/i, "");
  if (!slug || slug.includes("/") || slug.includes("..") || slug.includes(".")) {
    return null;
  }

  if (process.env.DATABASE_URI && process.env.PAYLOAD_SECRET) {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "posts",
        overrideAccess: false,
        depth: 0,
        limit: 1,
        where: { slug: { equals: slug } },
      });
      const match = result.docs[0] as PostDoc | undefined;
      if (!match) return null;
      const title = (match.h1 || match.title || slug).trim();
      return formatPostMarkdown(title, match.content || "");
    } catch (error) {
      console.error("Payload markdown unavailable, using archive", error);
    }
  }

  try {
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, `${slug}.md`),
      "utf8",
    );
    const matterResult = matter(fileContents);
    const data = matterResult.data as { h1?: string; title?: string };
    const title = (data.h1 || data.title || slug).trim();
    return formatPostMarkdown(title, matterResult.content || "");
  } catch {
    return null;
  }
}

export async function getPostData(id: string): Promise<PostData> {
  const remote = await payloadPosts();
  if (remote?.length) {
    const match = remote.find((doc) => doc.slug === id);
    if (!match) notFound();
    return toPostData(match, true);
  }
  // Emergency fallback only: archived Markdown if Payload is unavailable
  return readMarkdownPost(id);
}
