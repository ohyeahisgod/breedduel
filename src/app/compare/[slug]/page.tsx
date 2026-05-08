import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/comparison-table";
import { AdSlot } from "@/components/ad-slot";
import {
  BREEDS,
  allPairs,
  avgHeight,
  avgLifespan,
  avgWeight,
  comparisonSlug,
  formatLifespan,
  formatWeight,
  getBreed,
  parseComparisonSlug,
} from "@/lib/data";
import { GROUP_LABELS, SIZE_LABELS } from "@/lib/types";
import { SITE } from "@/lib/site";
import type { Breed } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

// Pre-render the most popular pairings, others render on first request.
const STATIC_PAIRS_LIMIT = 4000;

export async function generateStaticParams() {
  return allPairs()
    .slice(0, STATIC_PAIRS_LIMIT)
    .map(([a, b]) => ({ slug: comparisonSlug(a, b) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return {};
  const [aS, bS] = parsed;
  const a = getBreed(aS);
  const b = getBreed(bS);
  if (!a || !b) return {};
  const title = `${a.name} vs ${b.name}: Side-by-Side Breed Comparison`;
  const description = `Compare ${a.name} and ${b.name} — size, weight, lifespan, temperament, shedding, exercise needs, grooming, and health. Find the right breed for you.`;
  return {
    title,
    description,
    alternates: { canonical: `/compare/${comparisonSlug(a.slug, b.slug)}` },
    openGraph: { title, description, type: "article" },
  };
}

function pickWinner(a: number, b: number, better: "higher" | "lower"): "a" | "b" | null {
  if (a === b) return null;
  if (better === "higher") return a > b ? "a" : "b";
  return a < b ? "a" : "b";
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return notFound();
  const [aS, bS] = parsed;
  if (aS === bS) return notFound();
  const a = getBreed(aS);
  const b = getBreed(bS);
  if (!a || !b) return notFound();

  // Quick takeaway lines
  const summaryLines: string[] = [];
  const sizeWinner = pickWinner(avgWeight(a), avgWeight(b), "higher");
  if (sizeWinner) {
    const winA = sizeWinner === "a" ? a : b;
    const lose = sizeWinner === "a" ? b : a;
    summaryLines.push(
      `${winA.name} is the larger breed at ${formatWeight(winA.weightMaleMin, winA.weightMaleMax)} (males) vs ${formatWeight(lose.weightMaleMin, lose.weightMaleMax)} for the ${lose.name}.`,
    );
  }
  const lifespanWinner = pickWinner(avgLifespan(a), avgLifespan(b), "higher");
  if (lifespanWinner) {
    const win = lifespanWinner === "a" ? a : b;
    summaryLines.push(
      `The ${win.name} typically lives longer (${formatLifespan(win.lifespanMin, win.lifespanMax)}).`,
    );
  }
  const energyWinner = pickWinner(a.energy, b.energy, "higher");
  if (energyWinner) {
    const win = energyWinner === "a" ? a : b;
    summaryLines.push(`The ${win.name} has higher daily energy needs.`);
  }
  const sheddingWinner = pickWinner(a.shedding, b.shedding, "lower");
  if (sheddingWinner) {
    const win = sheddingWinner === "a" ? a : b;
    summaryLines.push(`The ${win.name} sheds less.`);
  }
  const trainabilityWinner = pickWinner(a.trainability, b.trainability, "higher");
  if (trainabilityWinner) {
    const win = trainabilityWinner === "a" ? a : b;
    summaryLines.push(`The ${win.name} is generally more trainable.`);
  }

  const related = relatedComparisons(a, b);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${a.name} vs ${b.name}: Side-by-Side Breed Comparison`,
    description: `Side-by-side comparison of the ${a.name} and ${b.name}.`,
    datePublished: "2026-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/compare/${comparisonSlug(a.slug, b.slug)}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-3 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span>Compare</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">{a.name} vs {b.name}</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {a.name} vs {b.name}
      </h1>
      <p className="mt-1 text-base text-muted-foreground">
        {GROUP_LABELS[a.group]} · {SIZE_LABELS[a.size]} vs {GROUP_LABELS[b.group]} · {SIZE_LABELS[b.size]}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <BreedCard breed={a} />
        <BreedCard breed={b} />
      </div>

      {summaryLines.length > 0 && (
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4 text-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quick take
          </div>
          <ul className="space-y-1.5">
            {summaryLines.map((line, i) => (
              <li key={i}>• {line}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Side-by-side traits</h2>
        <ComparisonTable a={a} b={b} />
      </div>

      <div className="my-8">
        <AdSlot slot="compare-mid" />
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <BreedAbout breed={a} />
        <BreedAbout breed={b} />
      </div>

      <div className="my-10">
        <AdSlot slot="compare-bottom" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <HealthBlock breed={a} />
        <HealthBlock breed={b} />
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">Related comparisons</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(([x, y]) => {
            const xb = getBreed(x);
            const yb = getBreed(y);
            if (!xb || !yb) return null;
            return (
              <Link
                key={`${x}-${y}`}
                href={`/compare/${comparisonSlug(x, y)}`}
                className="rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-primary hover:text-primary"
              >
                {xb.name} vs {yb.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BreedCard({ breed }: { breed: Breed }) {
  return (
    <Link
      href={`/breed/${breed.slug}`}
      className="block rounded-lg border border-border bg-card p-4 hover:border-primary"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xl font-bold tracking-tight">{breed.name}</span>
        <span className="text-xs text-muted-foreground">{SIZE_LABELS[breed.size]}</span>
      </div>
      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {breed.blurb}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span>
          <span className="text-muted-foreground">Weight:</span>{" "}
          {formatWeight(breed.weightMaleMin, breed.weightMaleMax)}
        </span>
        <span>
          <span className="text-muted-foreground">Lifespan:</span>{" "}
          {formatLifespan(breed.lifespanMin, breed.lifespanMax)}
        </span>
      </div>
    </Link>
  );
}

function BreedAbout({ breed }: { breed: Breed }) {
  const sentences: string[] = [];
  sentences.push(`The ${breed.name} is ${breed.blurb.charAt(0).toLowerCase()}${breed.blurb.slice(1)}`);
  sentences.push(
    `Originally from ${breed.origin}, this ${SIZE_LABELS[breed.size].toLowerCase()} ${GROUP_LABELS[breed.group].toLowerCase()} breed typically weighs ${formatWeight(breed.weightMaleMin, breed.weightMaleMax)} and lives ${formatLifespan(breed.lifespanMin, breed.lifespanMax)}.`,
  );
  const traitWords = breed.temperament.join(", ").toLowerCase();
  sentences.push(`Breeders describe them as ${traitWords}.`);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="mb-2 text-base font-semibold">About the {breed.name}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{sentences.join(" ")}</p>
    </div>
  );
}

function HealthBlock({ breed }: { breed: Breed }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="mb-2 text-base font-semibold">{breed.name} health</h2>
      <p className="text-xs text-muted-foreground">
        Common health concerns reported in this breed:
      </p>
      <ul className="mt-2 space-y-1 text-sm">
        {breed.commonHealthIssues.map((c) => (
          <li key={c}>• {c}</li>
        ))}
      </ul>
    </div>
  );
}

function relatedComparisons(a: Breed, b: Breed): Array<[string, string]> {
  const sameGroup = BREEDS.filter(
    (e) => (e.group === a.group || e.group === b.group) && e.slug !== a.slug && e.slug !== b.slug,
  ).slice(0, 6);
  const out: Array<[string, string]> = [];
  for (const e of sameGroup.slice(0, 3)) out.push([a.slug, e.slug]);
  for (const e of sameGroup.slice(3, 6)) out.push([b.slug, e.slug]);
  return out.slice(0, 6);
}
