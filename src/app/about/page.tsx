import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">About {SITE.name}</h1>
      <div className="prose prose-sm mt-4 space-y-4 text-foreground">
        <p>
          {SITE.name} is a free tool for comparing dog breeds side by side.
          We compile breed data from the American Kennel Club (AKC), national
          breed clubs, and veterinary literature, and lay it out in a single
          tidy comparison table covering size, lifespan, temperament, exercise
          needs, grooming, and common health concerns.
        </p>
        <p>
          We are independent and not affiliated with any breeder or kennel
          club. We do not accept compensation for ranking or featuring any
          specific breed.
        </p>
        <p>
          Information on this site is for general guidance only. Individual
          dogs vary widely in temperament, size, and health regardless of
          breed. When choosing a dog for your home, consult a veterinarian, a
          reputable breeder, or your local shelter or rescue.
        </p>
      </div>
    </div>
  );
}
