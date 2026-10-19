import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { getPayload } from "payload";
import config from "@payload-config";

const postsDirectory = path.join(process.cwd(), "src/posts-archive");

export interface PostFaqItem {
  question: string;
  answer: string;
}

export interface ImageCredit {
  name: string;
  profileUrl?: string;
  photoUrl?: string;
  isUnsplash: boolean;
}

export interface PostData {
  id: string;
  title: string;
  h1?: string;
  date: string;
  lastModified?: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: ImageCredit;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  faq?: PostFaqItem[];
  category: string;
  contentHtml?: string;
}

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
  creditName?: string | null;
  creditUrl?: string | null;
  sourceUrl?: string | null;
};
type PostDoc = {
  slug?: string | null;
  title?: string | null;
  h1?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  excerpt?: string | null;
  category?: string | null;
  content?: string | null;
  image?: MediaDoc | number | string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: MediaDoc | number | string | null;
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

function asMedia(image: PostDoc["image"]): MediaDoc | undefined {
  if (!image || typeof image === "string" || typeof image === "number") {
    return undefined;
  }
  return image;
}

function imageUrl(image: PostDoc["image"]): string | undefined {
  return asMedia(image)?.url || undefined;
}

function imageAlt(image: PostDoc["image"]): string | undefined {
  const alt = asMedia(image)?.alt?.trim();
  return alt || undefined;
}

function imageCredit(image: PostDoc["image"]): ImageCredit | undefined {
  const media = asMedia(image);
  const name = media?.creditName?.trim();
  if (!name) return undefined;
  const profileUrl = media?.creditUrl?.trim() || undefined;
  const photoUrl = media?.sourceUrl?.trim() || undefined;
  const isUnsplash = [media?.creditUrl, media?.sourceUrl].some((url) =>
    url?.toLowerCase().includes("unsplash.com"),
  );
  return { name, profileUrl, photoUrl, isUnsplash };
}

export function formatImageCreditMarkdown(credit: ImageCredit): string {
  const name = credit.profileUrl
    ? `[${credit.name}](${credit.profileUrl})`
    : credit.name;
  if (!credit.isUnsplash) {
    return `Photo : ${name}`;
  }
  const unsplash = credit.photoUrl
    ? `[Unsplash](${credit.photoUrl})`
    : "Unsplash";
  return `Photo : ${name} sur ${unsplash}`;
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
    imageAlt: imageAlt(doc.image),
    imageCredit: imageCredit(doc.image),
    metaTitle: doc.metaTitle || undefined,
    metaDescription: doc.metaDescription || undefined,
    ogImage: imageUrl(doc.ogImage),
    faq: faqItems(doc.faq),
    category: doc.category || "Web",
    contentHtml: withHtml ? await markdownToHtml(doc.content || "") : undefined,
  };
}

function newestFirst(a: PostDoc, b: PostDoc): number {
  const byPublished = (b.publishedAt || "").localeCompare(a.publishedAt || "");
  if (byPublished !== 0) return byPublished;
  return (b.updatedAt || "").localeCompare(a.updatedAt || "");
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
    return (result.docs as PostDoc[]).sort(newestFirst);
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

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
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
    return payload;
  }
  // Emergency fallback only: archived Markdown if Payload is unavailable
  return readMarkdownList();
}

export function formatPostMarkdown(
  title: string,
  content: string,
  credit?: ImageCredit,
): string {
  const heading = title.trim();
  const body = (content || "").replace(/^\uFEFF/, "").trim();
  const h1 = `# ${heading}`;
  let markdown: string;
  if (body === h1 || body.startsWith(`${h1}\n`) || body.startsWith(`${h1}\r\n`)) {
    markdown = body;
  } else {
    markdown = `${h1}\n\n${body}`;
  }
  if (credit) {
    const creditLine = formatImageCreditMarkdown(credit);
    const rest = markdown.startsWith(h1)
      ? markdown.slice(h1.length).replace(/^\r?\n*/, "")
      : markdown;
    markdown = rest
      ? `${h1}\n\n${creditLine}\n\n${rest}`
      : `${h1}\n\n${creditLine}`;
  }
  return markdown.endsWith("\n") ? markdown : `${markdown}\n`;
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
        depth: 1,
        limit: 1,
        where: { slug: { equals: slug } },
      });
      const match = result.docs[0] as PostDoc | undefined;
      if (!match) return null;
      const title = (match.h1 || match.title || slug).trim();
      return formatPostMarkdown(
        title,
        match.content || "",
        imageCredit(match.image),
      );
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

export async function getPostData(id: string): Promise<PostData | null> {
  const remote = await payloadPosts();
  if (remote?.length) {
    const match = remote.find((doc) => doc.slug === id);
    if (!match) return null;
    return toPostData(match, true);
  }
  // Emergency fallback only: archived Markdown if Payload is unavailable
  try {
    return await readMarkdownPost(id);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
}
