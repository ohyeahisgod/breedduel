export const SITE = {
  name: "BreedDuel",
  tagline: "Compare dog breeds head-to-head",
  description:
    "Side-by-side dog breed comparisons covering size, lifespan, temperament, grooming, exercise needs, and health — for every popular breed.",
  url: "https://breedduel.satosushi.co",
  twitter: "@breedduel",
  adsense: {
    publisher: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER || "",
  },
} as const;
