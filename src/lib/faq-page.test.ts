import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildFaqPageSchema, serializeJsonLd } from "./faq-page";

const lexicalAnswer = {
  root: {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Bonjour " },
          { type: "text", text: "monde" },
        ],
      },
      {
        type: "paragraph",
        children: [{ type: "text", text: "Suite" }],
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  },
};

describe("buildFaqPageSchema", () => {
  it("returns null when faq is missing or empty", () => {
    assert.equal(buildFaqPageSchema(undefined), null);
    assert.equal(buildFaqPageSchema(null), null);
    assert.equal(buildFaqPageSchema([]), null);
    assert.equal(
      buildFaqPageSchema([
        { question: "  ", answer: "Réponse" },
        { question: "Question", answer: "" },
        { question: "Question", answer: "   " },
      ]),
      null,
    );
  });

  it("builds one FAQPage from faq entries only", () => {
    const schema = buildFaqPageSchema([
      { question: " Quel délai ? ", answer: "Deux semaines." },
      { question: "Et le prix ?", answer: "Au devis." },
    ]);
    assert.ok(schema);
    assert.equal(schema["@context"], "https://schema.org");
    assert.equal(schema["@type"], "FAQPage");
    assert.equal(schema.mainEntity.length, 2);
    assert.deepEqual(schema.mainEntity[0], {
      "@type": "Question",
      name: "Quel délai ?",
      acceptedAnswer: { "@type": "Answer", text: "Deux semaines." },
    });
    assert.equal(schema.mainEntity[1].acceptedAnswer.text, "Au devis.");
    assert.equal("articleBody" in schema, false);
    assert.equal("mainEntityOfPage" in schema, false);
  });

  it("converts lexical and HTML answers to plain text", () => {
    const schema = buildFaqPageSchema([
      { question: "Format riche ?", answer: lexicalAnswer },
      {
        question: "Balises ?",
        answer: "<p>Prix &lt; 500&nbsp;€</p><p>Puis <strong>suite</strong>.</p>",
      },
    ]);
    assert.ok(schema);
    assert.equal(schema.mainEntity[0].acceptedAnswer.text, "Bonjour monde\n\nSuite");
    assert.equal(schema.mainEntity[1].acceptedAnswer.text, "Prix < 500 €\n\nPuis suite.");
    assert.equal(schema.mainEntity[1].acceptedAnswer.text.includes("<"), true);
    assert.equal(schema.mainEntity[1].acceptedAnswer.text.includes("strong"), false);
  });

  it("escapes script-breaking characters in the JSON-LD payload", () => {
    const schema = buildFaqPageSchema([
      {
        question: 'Que veut dire "a < b" ?',
        answer: 'Réponse </script><script>alert(1)</script> & "ok"',
      },
    ]);
    assert.ok(schema);
    const json = serializeJsonLd(schema);
    assert.equal(json.includes("<"), false);
    assert.equal(json.toLowerCase().includes("</script"), false);
    const parsed = JSON.parse(json) as {
      "@type": string;
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    assert.equal(parsed["@type"], "FAQPage");
    assert.equal(parsed.mainEntity.length, 1);
    assert.equal(parsed.mainEntity[0].name, 'Que veut dire "a < b" ?');
    assert.equal(
      parsed.mainEntity[0].acceptedAnswer.text,
      'Réponse </script><script>alert(1)</script> & "ok"',
    );
  });
});
