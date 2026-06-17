export type GoogleReview = {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  text: string;
  relativeTime: string;
  date?: string; // ISO date — si présent, le relatif est recalculé dynamiquement
};

export type PlaceInfo = {
  placeId: string;
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
};

const STATIC_FALLBACK: PlaceInfo = {
  placeId: "",
  rating: 5,
  totalRatings: 7,
  reviews: [
    {
      authorName: "ANTHONY LGD",
      authorPhotoUrl: "",
      rating: 5,
      text: "1er rdv dans un café pour faire une \"interview client\", le lendemain la maquette de mon site était prête et correspondait parfaitement a mes attentes",
      relativeTime: "",
      date: "2026-06-16",
    },
    {
      authorName: "Anthony Di Sant'Agostino",
      authorPhotoUrl: "",
      rating: 5,
      text: "il a supprimer tous les problème de mon pc en moins de 5min, je recommande",
      relativeTime: "",
      date: "2026-06-16",
    },
    {
      authorName: "Lorenzo",
      authorPhotoUrl: "",
      rating: 5,
      text: "Développeur sérieux et efficace. Travail de qualité et très bonne communication. Merci beaucoup Anthony.",
      relativeTime: "",
      date: "2026-06-06",
    },
    {
      authorName: "Martin Ferret",
      authorPhotoUrl: "",
      rating: 5,
      text: "Anthony communique énormément lorsqu'il s'engage sur un projet, livre dans les temps et un produit de qualité.",
      relativeTime: "",
      date: "2026-06-02",
    },
    {
      authorName: "David Moussiron",
      authorPhotoUrl: "",
      rating: 5,
      text: "Très pro et très réactif. Merci pour votre travail.",
      relativeTime: "",
      date: "2026-05-30",
    },
    {
      authorName: "Stéphanie Cornut",
      authorPhotoUrl: "",
      rating: 5,
      text: "À l'écoute, réactif, sérieux.",
      relativeTime: "",
      date: "2026-05-23",
    },
    {
      authorName: "Zilya",
      authorPhotoUrl: "",
      rating: 5,
      text: "J'ai fait appel à ses services pour une remise à neuf de mon ordinateur pour mes études. J'avais un vieil ordinateur sous Windows 7 qui était lent. Je suis maintenant sur Linux Mint, l'ordinateur a repris une seconde jeunesse, fluide et simple à utiliser. Ce monsieur a été très pédagogue pour la prise en main prévue dans la prestation. Je recommande chaudement.",
      relativeTime: "",
      date: "2026-05-16",
    },
  ],
};

export async function getGoogleReviews(): Promise<PlaceInfo | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return STATIC_FALLBACK;

  try {
    const searchRes = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id",
        },
        body: JSON.stringify({ textQuery: "Forge Digitale Solutions Saint-Laurent-Médoc" }),
        next: { revalidate: 86400 },
      }
    );

    const searchData = await searchRes.json();
    const placeId = searchData.places?.[0]?.id;
    if (!placeId) return STATIC_FALLBACK;

    const detailRes = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 },
      }
    );

    const detail = await detailRes.json();

    const reviews: GoogleReview[] = (detail.reviews ?? []).map(
      (r: {
        authorAttribution: { displayName: string; photoUri: string };
        rating: number;
        text: { text: string };
        relativePublishTimeDescription: string;
      }) => ({
        authorName: r.authorAttribution.displayName,
        authorPhotoUrl: r.authorAttribution.photoUri,
        rating: r.rating,
        text: r.text?.text ?? "",
        relativeTime: r.relativePublishTimeDescription,
      })
    );

    if (reviews.length === 0) return STATIC_FALLBACK;

    return {
      placeId,
      rating: detail.rating ?? 0,
      totalRatings: detail.userRatingCount ?? 0,
      reviews,
    };
  } catch {
    return STATIC_FALLBACK;
  }
}
