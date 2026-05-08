import type { Breed } from "./types";
import { BREEDS_PART1 } from "./breeds-part1";
import { BREEDS_PART2 } from "./breeds-part2";
import { BREEDS_PART3 } from "./breeds-part3";
import { BREEDS_PART4 } from "./breeds-part4";
import { BREEDS_PART5 } from "./breeds-part5";
import { BREEDS_PART6 } from "./breeds-part6";

export const BREEDS: Breed[] = [
  ...BREEDS_PART1,
  ...BREEDS_PART2,
  ...BREEDS_PART3,
  ...BREEDS_PART4,
  ...BREEDS_PART5,
  ...BREEDS_PART6,
];

export const BREEDS_BY_SLUG = new Map(BREEDS.map((b) => [b.slug, b]));

export function getBreed(slug: string): Breed | null {
  return BREEDS_BY_SLUG.get(slug.toLowerCase()) ?? null;
}
