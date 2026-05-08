import Script from "next/script";
import { SITE } from "@/lib/site";

export function AdSenseScript() {
  if (!SITE.adsense.publisher) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsense.publisher}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
