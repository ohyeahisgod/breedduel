export type BreedGroup =
  | "sporting"
  | "hound"
  | "working"
  | "terrier"
  | "toy"
  | "non-sporting"
  | "herding"
  | "miscellaneous";

export type Size = "toy" | "small" | "medium" | "large" | "giant";

// 1 = lowest, 5 = highest
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Breed {
  slug: string;
  name: string;
  group: BreedGroup;
  size: Size;
  origin: string;

  // Physical
  heightMaleMin: number; // inches
  heightMaleMax: number;
  heightFemaleMin: number;
  heightFemaleMax: number;
  weightMaleMin: number; // pounds
  weightMaleMax: number;
  weightFemaleMin: number;
  weightFemaleMax: number;
  lifespanMin: number; // years
  lifespanMax: number;

  // Temperament & care (1-5 scale)
  energy: Rating;
  trainability: Rating;
  shedding: Rating;
  grooming: Rating; // grooming effort
  barking: Rating;
  goodWithKids: Rating;
  goodWithDogs: Rating;
  goodWithStrangers: Rating;
  protectiveness: Rating;
  adaptability: Rating;
  intelligence: Rating;
  exerciseNeeds: Rating;
  droolingLevel: Rating;
  coatLength: "short" | "medium" | "long" | "wirehaired";
  hypoallergenic: boolean;

  // Common health issues (free text)
  commonHealthIssues: string[];

  // Description
  blurb: string;
  temperament: string[]; // 3-5 keywords
}

export const GROUP_LABELS: Record<BreedGroup, string> = {
  sporting: "Sporting",
  hound: "Hound",
  working: "Working",
  terrier: "Terrier",
  toy: "Toy",
  "non-sporting": "Non-Sporting",
  herding: "Herding",
  miscellaneous: "Miscellaneous",
};

export const SIZE_LABELS: Record<Size, string> = {
  toy: "Toy",
  small: "Small",
  medium: "Medium",
  large: "Large",
  giant: "Giant",
};
