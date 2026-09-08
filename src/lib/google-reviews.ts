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
  placeId: "g/11zbjsx1hc",
  rating: 5,
  totalRatings: 6,
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
  ],
};

export async function getGoogleReviews(): Promise<PlaceInfo | null> {
  return STATIC_FALLBACK;
}
