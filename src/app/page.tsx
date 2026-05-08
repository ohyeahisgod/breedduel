import Link from "next/link";
import { DuelSearch } from "@/components/duel-search";
import { AdSlot } from "@/components/ad-slot";
import { BREEDS, FEATURED_COMPARISONS, comparisonSlug, getBreed } from "@/lib/data";
import { GROUP_LABELS, type BreedGroup } from "@/lib/types";

export default function Home() {
  const byGroup = new Map<BreedGroup, typeof BREEDS>();
  for (const breed of BREEDS) {
    const arr = byGroup.get(breed.group) ?? [];
    arr.push(breed);
    byGroup.set(breed.group, arr);
  }

  const searchBreeds = BREEDS.map((b) => ({ slug: b.slug, name: b.name, group: b.group }));

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {BREEDS.length} breeds · {((BREEDS.length * (BREEDS.length - 1)) / 2).toLocaleString()}+ comparisons
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Compare any two dog breeds<br className="hidden sm:block" /> head-to-head
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-muted-foreground">
            Size, lifespan, temperament, exercise needs, grooming, shedding,
            and health — side by side, with the right pick highlighted for you.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <DuelSearch breeds={searchBreeds} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-4 text-2xl font-semibold">Popular duels</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold tracking-tight">
                    {aData.name} <span className="font-normal text-muted-foreground">vs</span> {bData.name}
                  </span>
                  <span className="text-muted-foreground transition group-hover:text-primary">
                    →
                  </span>
                </div>
                <div className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                  {aData.temperament[0]} · {bData.temperament[0]}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-6">
        <AdSlot slot="home-mid" />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-4 text-2xl font-semibold">Browse by group</h2>
        <div className="space-y-6">
          {[...byGroup.entries()]
            .sort((a, b) => b[1].length - a[1].length)
            .map(([group, list]) => (
              <div key={group}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {GROUP_LABELS[group]} ({list.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((breed) => (
                    <Link
                      key={breed.slug}
                      href={`/breed/${breed.slug}`}
                      className="rounded-md border border-border bg-card px-2.5 py-1 text-sm hover:border-primary hover:text-primary"
                    >
                      {breed.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
