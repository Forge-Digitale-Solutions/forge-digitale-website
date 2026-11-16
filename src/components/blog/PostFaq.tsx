import {
  answerParagraphs,
  buildFaqPageSchema,
  type FaqSource,
} from "@/lib/faq-page";

export function PostFaq({ items }: { items?: readonly FaqSource[] | null }) {
  const schema = buildFaqPageSchema(items);
  if (!schema) return null;
  return (
    <section className="prose prose-lg max-w-none mt-12">
      <h2>Questions fréquentes</h2>
      {schema.mainEntity.map((item) => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          {answerParagraphs(item.acceptedAnswer.text).map((paragraph) => (
            <p key={paragraph} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
