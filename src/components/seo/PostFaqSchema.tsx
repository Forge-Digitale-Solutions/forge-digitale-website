import { buildFaqPageSchema, serializeJsonLd, type FaqSource } from "@/lib/faq-page";

export function PostFaqSchema({ items }: { items?: readonly FaqSource[] | null }) {
  const schema = buildFaqPageSchema(items);
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
