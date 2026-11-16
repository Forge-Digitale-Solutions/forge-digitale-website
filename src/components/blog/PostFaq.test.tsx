import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PostFaqSchema } from "../seo/PostFaqSchema";
import { PostFaq } from "./PostFaq";

const filled = [
  { question: "Quel délai ?", answer: "Deux semaines." },
  { question: "Et le prix ?", answer: "Au devis.\n\nSans hébergement." },
];

function renderFaq(items: { question: string; answer: string }[] | undefined) {
  return renderToStaticMarkup(
    createElement(
      Fragment,
      null,
      createElement(PostFaqSchema, { items }),
      createElement(PostFaq, { items }),
    ),
  );
}

describe("PostFaq rendering", () => {
  it("renders nothing when faq is empty or absent", () => {
    assert.equal(renderFaq(undefined), "");
    assert.equal(renderFaq([]), "");
    assert.equal(renderToStaticMarkup(createElement(PostFaq, { items: undefined })), "");
    assert.equal(renderToStaticMarkup(createElement(PostFaqSchema, { items: [] })), "");
  });

  it("renders the heading, questions and a single FAQPage script", () => {
    const html = renderFaq(filled);
    assert.match(html, /<h2>Questions fréquentes<\/h2>/);
    assert.match(html, /<h3>Quel délai \?<\/h3>/);
    assert.match(html, /<h3>Et le prix \?<\/h3>/);
    assert.match(html, /<p[^>]*>Deux semaines\.<\/p>/);
    assert.match(html, /<p[^>]*>Au devis\.<\/p>/);
    assert.match(html, /<p[^>]*>Sans hébergement\.<\/p>/);
    const scripts = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>/g) ?? [];
    assert.equal(scripts.length, 1);
    assert.equal((html.match(/FAQPage/g) ?? []).length, 1);
    const json = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
    assert.ok(json);
    const parsed = JSON.parse(json) as { "@type": string; mainEntity: unknown[] };
    assert.equal(parsed["@type"], "FAQPage");
    assert.equal(parsed.mainEntity.length, 2);
    assert.equal(html.includes("BlogPosting"), false);
    assert.equal(html.includes("LocalBusiness"), false);
  });
});
