import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import {
  BREEDS,
  comparisonSlug,
  formatHeight,
  formatLifespan,
  formatWeight,
  getBreed,
  RATING_LABELS,
  relatedBreeds,
} from "@/lib/data";
import { GROUP_LABELS, SIZE_LABELS, type Breed } from "@/lib/types";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BREEDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) return {};
  const title = `${breed.name}: Size, Temperament, Lifespan & Care`;
  const description = `${breed.name} breed guide — ${SIZE_LABELS[breed.size]} ${GROUP_LABELS[breed.group]} from ${breed.origin}. ${formatWeight(breed.weightMaleMin, breed.weightMaleMax)}, ${formatLifespan(breed.lifespanMin, breed.lifespanMax)}. ${breed.blurb}`;
  return {
    title,
    description,
    alternates: { canonical: `/breed/${breed.slug}` },
  };
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}

function RatingRow({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <div>
        <div className="font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`size-2 rounded-full ${i <= value ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
        <span className="w-20 text-right text-xs text-muted-foreground">
          {RATING_LABELS[value]}
        </span>
      </div>
    </div>
  );
}

export default async function BreedPage({ params }: PageProps) {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) return notFound();

  const related = relatedBreeds(breed, [], 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${breed.name} Breed Guide`,
    description: breed.blurb,
    datePublished: "2026-01-01T00:00:00Z",
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-3 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/breeds" className="hover:text-primary">Breeds</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{breed.name}</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{breed.name}</h1>
      <p className="mt-2 text-base text-muted-foreground">
        {GROUP_LABELS[breed.group]} group · {SIZE_LABELS[breed.size]} size · From {breed.origin}
      </p>

      <p className="mt-4 text-sm leading-relaxed">{breed.blurb}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {breed.temperament.map((t) => (
          <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Lifespan" value={formatLifespan(breed.lifespanMin, breed.lifespanMax)} />
        <Stat label="Weight (M)" value={formatWeight(breed.weightMaleMin, breed.weightMaleMax)} />
        <Stat label="Height (M)" value={formatHeight(breed.heightMaleMin, breed.heightMaleMax)} />
        <Stat label="Coat" value={breed.coatLength} />
      </div>

      <div className="my-8">
        <AdSlot slot="breed-mid" />
      </div>

      <h2 className="mt-8 mb-3 text-xl font-semibold">Trait ratings</h2>
      <div className="rounded-lg border border-border bg-card p-4">
        <RatingRow label="Energy" value={breed.energy} />
        <RatingRow label="Trainability" value={breed.trainability} />
        <RatingRow label="Intelligence" value={breed.intelligence} />
        <RatingRow label="Exercise needs" value={breed.exerciseNeeds} />
        <RatingRow label="Shedding" value={breed.shedding} hint="Lower = less hair" />
        <RatingRow label="Grooming effort" value={breed.grooming} />
        <RatingRow label="Drooling" value={breed.droolingLevel} />
        <RatingRow label="Barking" value={breed.barking} />
        <RatingRow label="Good with kids" value={breed.goodWithKids} />
        <RatingRow label="Good with dogs" value={breed.goodWithDogs} />
        <RatingRow label="Good with strangers" value={breed.goodWithStrangers} />
        <RatingRow label="Protectiveness" value={breed.protectiveness} />
        <RatingRow label="Adaptability" value={breed.adaptability} hint="Apartment / new environments" />
      </div>

      <h2 className="mt-8 mb-3 text-xl font-semibold">Common health issues</h2>
      <div className="rounded-lg border border-border bg-card p-4">
        <ul className="space-y-1 text-sm">
          {breed.commonHealthIssues.map((c) => (
            <li key={c}>• {c}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Health varies between individual dogs. Always ask breeders for OFA / health-test paperwork.
        </p>
      </div>

      <div className="my-10">
        <AdSlot slot="breed-bottom" />
      </div>

      <h2 className="mt-8 mb-3 text-xl font-semibold">Compare {breed.name} with...</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((other) => (
          <Link
            key={other.slug}
            href={`/compare/${comparisonSlug(breed.slug, other.slug)}`}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-primary hover:text-primary"
          >
            {breed.name} vs {other.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
