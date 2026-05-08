import { BREEDS, BREEDS_BY_SLUG, getBreed } from "./breeds";
import type { Breed } from "./types";

export { BREEDS, BREEDS_BY_SLUG, getBreed };

export function comparisonSlug(a: string, b: string): string {
  const [x, y] = a.toLowerCase() < b.toLowerCase() ? [a, b] : [b, a];
  return `${x.toLowerCase()}-vs-${y.toLowerCase()}`;
}

export function parseComparisonSlug(slug: string): [string, string] | null {
  const m = slug.match(/^([a-z][a-z0-9-]*?)-vs-([a-z][a-z0-9-]*)$/i);
  if (!m) return null;
  return [m[1].toLowerCase(), m[2].toLowerCase()];
}

/** All unordered breed pairs (a < b alphabetically). */
export function allPairs(): Array<[string, string]> {
  const slugs = BREEDS.map((b) => b.slug).sort();
  const pairs: Array<[string, string]> = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push([slugs[i], slugs[j]]);
    }
  }
  return pairs;
}

/** Curated featured comparisons for the home page (popular searches). */
export const FEATURED_COMPARISONS: Array<[string, string]> = [
  ["golden-retriever", "labrador-retriever"],
  ["border-collie", "australian-shepherd"],
  ["french-bulldog", "boston-terrier"],
  ["german-shepherd", "belgian-malinois"],
  ["siberian-husky", "alaskan-malamute"],
  ["yorkshire-terrier", "maltese"],
  ["pug", "french-bulldog"],
  ["rottweiler", "doberman-pinscher"],
  ["beagle", "basset-hound"],
  ["dachshund", "chihuahua"],
  ["bernese-mountain-dog", "saint-bernard"],
  ["cavalier-king-charles-spaniel", "shih-tzu"],
  ["goldendoodle", "labradoodle"],
  ["pembroke-welsh-corgi", "cardigan-welsh-corgi"],
  ["akita", "shiba-inu"],
];

export const RATING_LABELS: Record<number, string> = {
  1: "Very Low",
  2: "Low",
  3: "Moderate",
  4: "High",
  5: "Very High",
};

export function ratingDots(rating: number): string {
  return "●".repeat(rating) + "○".repeat(5 - rating);
}

export function formatHeight(min: number, max: number): string {
  if (min === max) return `${min}"`;
  return `${min}–${max}"`;
}

export function formatWeight(min: number, max: number): string {
  if (min === max) return `${min} lbs`;
  return `${min}–${max} lbs`;
}

export function formatLifespan(min: number, max: number): string {
  if (min === max) return `${min} years`;
  return `${min}–${max} years`;
}

export function avgWeight(b: Breed): number {
  return (b.weightMaleMin + b.weightMaleMax + b.weightFemaleMin + b.weightFemaleMax) / 4;
}

export function avgHeight(b: Breed): number {
  return (b.heightMaleMin + b.heightMaleMax + b.heightFemaleMin + b.heightFemaleMax) / 4;
}

export function avgLifespan(b: Breed): number {
  return (b.lifespanMin + b.lifespanMax) / 2;
}

/** Find related breeds (same group, excluding given) */
export function relatedBreeds(breed: Breed, exclude: string[] = [], limit = 6): Breed[] {
  return BREEDS.filter(
    (b) => b.group === breed.group && b.slug !== breed.slug && !exclude.includes(b.slug),
  ).slice(0, limit);
}
