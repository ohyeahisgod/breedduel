"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { comparisonSlug } from "@/lib/data";
import type { Breed } from "@/lib/types";

interface Props {
  breeds: Pick<Breed, "slug" | "name" | "group">[];
}

function matches(query: string, items: Props["breeds"]) {
  const q = query.trim().toLowerCase();
  if (!q) return [] as typeof items;
  return items
    .filter(
      (b) =>
        b.slug.includes(q) ||
        b.name.toLowerCase().includes(q),
    )
    .slice(0, 8);
}

function BreedPicker({
  label,
  value,
  setValue,
  breeds,
  exclude,
}: {
  label: string;
  value: Breed["slug"] | "";
  setValue: (v: string) => void;
  breeds: Props["breeds"];
  exclude: string;
}) {
  const [query, setQuery] = useState("");
  const list = useMemo(
    () => matches(query, breeds).filter((b) => b.slug !== exclude),
    [query, breeds, exclude],
  );
  const selected = breeds.find((b) => b.slug === value);

  return (
    <div className="flex-1">
      <label className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {selected ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            setQuery("");
          }}
          className="w-full rounded-md border border-border bg-card px-3 py-2 text-left text-sm hover:border-primary"
        >
          <span className="font-semibold">{selected.name}</span>
          <span className="ml-2 text-xs text-muted-foreground">change</span>
        </button>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a breed name..."
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
          />
          {list.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg">
              {list.map((b) => (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => {
                    setValue(b.slug);
                    setQuery("");
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DuelSearch({ breeds }: Props) {
  const router = useRouter();
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");

  function go() {
    if (!a || !b || a === b) return;
    router.push(`/compare/${comparisonSlug(a, b)}`);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <BreedPicker label="Breed 1" value={a} setValue={setA} breeds={breeds} exclude={b} />
        <div className="hidden self-center pb-2 text-sm text-muted-foreground sm:block">vs</div>
        <BreedPicker label="Breed 2" value={b} setValue={setB} breeds={breeds} exclude={a} />
        <button
          type="button"
          onClick={go}
          disabled={!a || !b || a === b}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          Compare
        </button>
      </div>
    </div>
  );
}
