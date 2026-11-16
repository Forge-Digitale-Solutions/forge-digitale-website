import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

export interface FaqSource {
  question?: unknown;
  answer?: unknown;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqPageQuestion {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface FaqPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FaqPageQuestion[];
}

const HTML_TAG = /<\/?[a-z][a-z0-9]*\b[^<>]*\/?>/i;
const RICH_HTML =
  /<\/?(?:p|div|br|strong|em|b|i|u|a|ul|ol|li|blockquote|span|h[1-6])\b/i;

function fromCodePoint(code: number): string {
  if (!Number.isInteger(code) || code < 0 || code > 0x10ffff) return "";
  return String.fromCodePoint(code);
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code: string) => fromCodePoint(Number(code)))
    .replace(/&amp;/gi, "&");
}

function htmlToPlain(value: string): string {
  const withoutEmbedded = value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  if (!HTML_TAG.test(withoutEmbedded)) return withoutEmbedded.trim();
  const text = withoutEmbedded
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|blockquote|tr)>/gi, "\n\n")
    .replace(/<\/?[a-z][a-z0-9]*\b[^<>]*\/?>/gi, "");
  return decodeEntities(text)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isLexicalState(value: unknown): value is { root: { children: unknown[] } } {
  if (!value || typeof value !== "object") return false;
  const root = (value as { root?: unknown }).root;
  if (!root || typeof root !== "object") return false;
  return Array.isArray((root as { children?: unknown }).children);
}

function lexicalPlain(value: { root: { children: unknown[] } }): string {
  try {
    return convertLexicalToPlaintext({
      data: value as Parameters<typeof convertLexicalToPlaintext>[0]["data"],
    }).trim();
  } catch {
    return "";
  }
}

function lexicalFromString(value: string): { root: { children: unknown[] } } | undefined {
  const trimmed = value.trim();
  if (!trimmed.startsWith("{") || !trimmed.includes('"root"')) return undefined;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    return isLexicalState(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function toPlainText(value: unknown): string {
  if (typeof value === "string") {
    const lexical = lexicalFromString(value);
    if (lexical) return lexicalPlain(lexical);
    if (!RICH_HTML.test(value)) return value.trim();
    return htmlToPlain(value);
  }
  if (isLexicalState(value)) return lexicalPlain(value);
  return "";
}

export function buildFaqPageSchema(
  faq: readonly FaqSource[] | null | undefined,
): FaqPageSchema | null {
  if (!Array.isArray(faq) || faq.length === 0) return null;
  const mainEntity: FaqPageQuestion[] = [];
  for (const item of faq) {
    if (!item || typeof item !== "object") continue;
    const name = toPlainText(item.question);
    const text = toPlainText(item.answer);
    if (!name || !text) continue;
    mainEntity.push({
      "@type": "Question",
      name,
      acceptedAnswer: {
        "@type": "Answer",
        text,
      },
    });
  }
  if (mainEntity.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function serializeJsonLd(schema: FaqPageSchema): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function normalizeFaq(faq: readonly FaqSource[] | null | undefined): FaqItem[] {
  const schema = buildFaqPageSchema(faq);
  if (!schema) return [];
  return schema.mainEntity.map((item) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
}

export function answerParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
