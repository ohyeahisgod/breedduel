import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Disclaimer</h1>
      <div className="prose prose-sm mt-4 space-y-4 text-foreground">
        <p>
          The information provided on {SITE.name} is for general informational
          purposes only. All information is provided in good faith, however we
          make no representation or warranty of any kind, express or implied,
          regarding the accuracy, adequacy, validity, reliability, or
          completeness of any information.
        </p>
        <p>
          Breed traits, weights, lifespans, and health information represent
          typical ranges from breed standards and veterinary literature. Every
          individual dog is different — temperament and health vary widely
          within any breed depending on genetics, breeder, training, and
          socialization.
        </p>
        <p>
          {SITE.name} is not a veterinary or breeding service. Nothing on this
          site is medical, behavioral, or legal advice for your dog. Always
          consult a licensed veterinarian for health concerns, a certified
          trainer for behavior, and a reputable breeder or shelter when
          selecting a dog.
        </p>
      </div>
    </div>
  );
}
