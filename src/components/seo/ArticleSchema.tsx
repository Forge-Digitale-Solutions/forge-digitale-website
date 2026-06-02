interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  slug: string;
  category?: string;
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  image,
  slug,
  category,
}: ArticleSchemaProps) {
  const articleUrl = `https://forgedigitalesolutions.com/blog/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image || "https://forgedigitalesolutions.com/images/og-image.jpg",
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Anthony Marcelin",
      url: "https://forgedigitalesolutions.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Forge Digitale Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://forgedigitalesolutions.com/images/og-image.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleBody: description,
    keywords: [category, "Forge Digitale", "blog"].filter(Boolean).join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
