import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <div className="prose prose-sm mt-4 space-y-4 text-foreground">
        <p>
          {SITE.name} does not require accounts and does not collect personally
          identifiable information directly. We use privacy-friendly analytics
          (Vercel Analytics) and may serve advertising via Google AdSense.
        </p>
        <p>
          Google AdSense and similar partners may use cookies or device
          identifiers to serve ads based on a user&apos;s prior visits to this
          site or other sites. You can opt out of personalized advertising by
          visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="underline hover:text-primary"
          >
            Google&apos;s Ads Settings
          </a>
          .
        </p>
        <p>
          We do not sell or share user data. Questions? Reach us via the contact
          form on our parent site.
        </p>
      </div>
    </div>
  );
}
