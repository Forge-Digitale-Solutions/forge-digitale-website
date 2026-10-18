export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  name: string;
  /** Card copy. Do not add a price. Do not promise a free trial. */
  description: string;
  /** Shows the provisional-copy badge while true. */
  placeholder: boolean;
  /** Product site, without tracking parameters. */
  url: string;
  image?: ProductImage;
};

const PRODUCT_UTM = {
  utm_source: "forgedigitalesolutions",
  utm_medium: "referral",
  utm_campaign: "nos-outils",
} as const;

/** Append the referral parameters used on /outils/. */
export function withProductUtm(url: string): string {
  const target = new URL(url);
  for (const [key, value] of Object.entries(PRODUCT_UTM)) {
    target.searchParams.set(key, value);
  }
  return target.toString();
}

/**
 * Products shown on /outils/, in display order.
 * Add an object here to publish another product.
 */
export const products: Product[] = [
  {
    id: "grilla",
    name: "Grilla",
    description:
      "Grilla aide à auditer l'accessibilité d'un site selon le RGAA, critère par critère, en vue de l'European Accessibility Act. L'IA propose un verdict, c'est l'auditeur qui décide.",
    placeholder: false,
    url: "https://grilla.fr",
    image: {
      src: "/outils/grilla-exemple.webp",
      alt: "Rapport d'audit Grilla sur un site fictif de démonstration",
      width: 1600,
      height: 1000,
    },
  },
];
