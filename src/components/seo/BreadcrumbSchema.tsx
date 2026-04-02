"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Add home as first item if not already present
  const fullItems = [
    { label: "Accueil", path: "/" },
    ...items.filter((item) => item.path !== "/"),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://forgedigitalesolutions.com${item.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          {fullItems.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <span className="text-slate-600">/</span>}
              {item.path === window?.location?.pathname ? (
                <span className="text-slate-300">{item.label}</span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
