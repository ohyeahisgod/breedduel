import { cn } from "@/lib/utils";
import { RATING_LABELS, formatHeight, formatLifespan, formatWeight } from "@/lib/data";
import { GROUP_LABELS, SIZE_LABELS } from "@/lib/types";
import type { Breed } from "@/lib/types";

interface Row {
  label: string;
  hint?: string;
  format: "rating" | "text" | "yes-no";
  better?: "higher" | "lower" | null; // null = no winner highlighting
  values: [string | number | boolean | null, string | number | boolean | null];
}

function fmt(v: Row["values"][0], format: Row["format"]): string {
  if (v === null || v === undefined) return "—";
  if (format === "rating" && typeof v === "number") {
    return `${RATING_LABELS[v]} (${v}/5)`;
  }
  if (format === "yes-no" && typeof v === "boolean") {
    return v ? "Yes" : "No";
  }
  return String(v);
}

function winner(row: Row): 0 | 1 | null {
  if (!row.better) return null;
  const [a, b] = row.values;
  if (typeof a !== "number" || typeof b !== "number") return null;
  if (a === b) return null;
  if (row.better === "higher") return a > b ? 0 : 1;
  return a < b ? 0 : 1;
}

export function ComparisonTable({ a, b }: { a: Breed; b: Breed }) {
  const rows: Row[] = [
    {
      label: "Group",
      format: "text",
      values: [GROUP_LABELS[a.group], GROUP_LABELS[b.group]],
    },
    {
      label: "Size",
      format: "text",
      values: [SIZE_LABELS[a.size], SIZE_LABELS[b.size]],
    },
    {
      label: "Origin",
      format: "text",
      values: [a.origin, b.origin],
    },
    {
      label: "Height (male)",
      format: "text",
      values: [formatHeight(a.heightMaleMin, a.heightMaleMax), formatHeight(b.heightMaleMin, b.heightMaleMax)],
    },
    {
      label: "Height (female)",
      format: "text",
      values: [formatHeight(a.heightFemaleMin, a.heightFemaleMax), formatHeight(b.heightFemaleMin, b.heightFemaleMax)],
    },
    {
      label: "Weight (male)",
      format: "text",
      values: [formatWeight(a.weightMaleMin, a.weightMaleMax), formatWeight(b.weightMaleMin, b.weightMaleMax)],
    },
    {
      label: "Weight (female)",
      format: "text",
      values: [formatWeight(a.weightFemaleMin, a.weightFemaleMax), formatWeight(b.weightFemaleMin, b.weightFemaleMax)],
    },
    {
      label: "Lifespan",
      hint: "Average expected lifespan.",
      format: "text",
      values: [formatLifespan(a.lifespanMin, a.lifespanMax), formatLifespan(b.lifespanMin, b.lifespanMax)],
    },
    {
      label: "Energy level",
      hint: "Daily activity needs.",
      format: "rating",
      values: [a.energy, b.energy],
    },
    {
      label: "Trainability",
      hint: "How quickly the breed learns commands.",
      format: "rating",
      better: "higher",
      values: [a.trainability, b.trainability],
    },
    {
      label: "Intelligence",
      hint: "Problem-solving ability.",
      format: "rating",
      better: "higher",
      values: [a.intelligence, b.intelligence],
    },
    {
      label: "Exercise needs",
      hint: "Daily physical activity required.",
      format: "rating",
      values: [a.exerciseNeeds, b.exerciseNeeds],
    },
    {
      label: "Shedding",
      hint: "Lower = less hair around your home.",
      format: "rating",
      better: "lower",
      values: [a.shedding, b.shedding],
    },
    {
      label: "Grooming effort",
      hint: "Brushing, bathing, professional grooming.",
      format: "rating",
      better: "lower",
      values: [a.grooming, b.grooming],
    },
    {
      label: "Drooling",
      hint: "Lower = drier face and furniture.",
      format: "rating",
      better: "lower",
      values: [a.droolingLevel, b.droolingLevel],
    },
    {
      label: "Barking",
      hint: "How vocal the breed is.",
      format: "rating",
      better: "lower",
      values: [a.barking, b.barking],
    },
    {
      label: "Good with kids",
      format: "rating",
      better: "higher",
      values: [a.goodWithKids, b.goodWithKids],
    },
    {
      label: "Good with other dogs",
      format: "rating",
      better: "higher",
      values: [a.goodWithDogs, b.goodWithDogs],
    },
    {
      label: "Good with strangers",
      format: "rating",
      better: "higher",
      values: [a.goodWithStrangers, b.goodWithStrangers],
    },
    {
      label: "Protectiveness",
      hint: "Watchdog tendencies.",
      format: "rating",
      values: [a.protectiveness, b.protectiveness],
    },
    {
      label: "Adaptability",
      hint: "Apartment / new environment tolerance.",
      format: "rating",
      better: "higher",
      values: [a.adaptability, b.adaptability],
    },
    {
      label: "Coat length",
      format: "text",
      values: [a.coatLength, b.coatLength],
    },
    {
      label: "Hypoallergenic",
      hint: "Lower-shedding, less dander.",
      format: "yes-no",
      values: [a.hypoallergenic, b.hypoallergenic],
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted text-left">
            <th className="px-4 py-3 font-medium text-muted-foreground">Trait</th>
            <th className="px-4 py-3 text-right font-semibold">{a.name}</th>
            <th className="px-4 py-3 text-right font-semibold">{b.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const w = winner(row);
            return (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 align-top">
                  <div className="font-medium">{row.label}</div>
                  {row.hint && (
                    <div className="mt-0.5 text-xs text-muted-foreground">{row.hint}</div>
                  )}
                </td>
                <td
                  className={cn(
                    "px-4 py-3 text-right",
                    w === 0 && "font-semibold text-success",
                  )}
                >
                  {fmt(row.values[0], row.format)}
                </td>
                <td
                  className={cn(
                    "px-4 py-3 text-right",
                    w === 1 && "font-semibold text-success",
                  )}
                >
                  {fmt(row.values[1], row.format)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
