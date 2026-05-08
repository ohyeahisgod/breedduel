import type { Metadata } from "next";
import Link from "next/link";
import { BREEDS } from "@/lib/data";
import { GROUP_LABELS, type BreedGroup } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Dog Breeds",
  description: "Browse every dog breed in our database — sorted by AKC group with size, lifespan, and temperament details.",
  alternates: { canonical: "/breeds" },
};

export default function AllBreedsPage() {
  const byGroup = new Map<BreedGroup, typeof BREEDS>();
  for (const breed of BREEDS) {
    const arr = byGroup.get(breed.group) ?? [];
    arr.push(breed);
    byGroup.set(breed.group, arr);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All dog breeds</h1>
      <p className="mt-2 text-muted-foreground">
        {BREEDS.length} breeds in our database, organized by AKC group.
      </p>

      <div className="mt-8 space-y-8">
        {[...byGroup.entries()]
          .sort((a, b) => b[1].length - a[1].length)
          .map(([group, list]) => (
            <section key={group}>
              <h2 className="mb-3 text-xl font-semibold">
                {GROUP_LABELS[group]}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  ({list.length})
                </span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {list
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((breed) => (
                    <Link
                      key={breed.slug}
                      href={`/breed/${breed.slug}`}
                      className="rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-primary hover:text-primary"
                    >
                      <div className="font-medium">{breed.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {breed.origin}
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
