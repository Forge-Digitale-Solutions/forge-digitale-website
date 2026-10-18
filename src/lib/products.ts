export type Product = {
  id: string;
  name: string;
  /**
   * Card copy. Placeholder until the final text is provided.
   * Do not add a price. Do not promise a free trial.
   */
  description: string;
  /** True until `description` is replaced with the final copy. */
  placeholder: boolean;
  /** Product site, without tracking parameters. */
  url: string;
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
      "Grilla vérifie la conformité RGAA et l'accessibilité d'un site, dans le cadre de l'European Accessibility Act.",
    placeholder: true,
    url: "https://grilla.fr",
  },
];
