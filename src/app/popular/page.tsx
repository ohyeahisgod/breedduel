import type { Metadata } from "next";
import Link from "next/link";
import { FEATURED_COMPARISONS, comparisonSlug, getBreed } from "@/lib/data";

export const metadata: Metadata = {
  title: "Popular Dog Breed Comparisons",
  description: "The most-searched dog breed comparisons — Golden Retriever vs Labrador, German Shepherd vs Belgian Malinois, French Bulldog vs Boston Terrier, and more.",
  alternates: { canonical: "/popular" },
};

export default function PopularPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Popular dog breed comparisons
      </h1>
      <p className="mt-2 text-muted-foreground">
        The head-to-head matchups people search for most.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {FEATURED_COMPARISONS.map(([a, b]) => {
          const aData = getBreed(a);
          const bData = getBreed(b);
          if (!aData || !bData) return null;
          return (
            <Link
              key={`${a}-${b}`}
              href={`/compare/${comparisonSlug(a, b)}`}
              className="group rounded-lg border border-border bg-card p-4 transition hover:border-primary"
            >
              <div className="text-base font-bold tracking-tight">
                {aData.name} <span className="font-normal text-muted-foreground">vs</span> {bData.name}
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {aData.blurb}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
