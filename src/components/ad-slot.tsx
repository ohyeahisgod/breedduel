"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slot, format = "auto", className }: AdSlotProps) {
  useEffect(() => {
    if (!SITE.adsense.publisher) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // no-op
    }
  }, []);

  if (!SITE.adsense.publisher) {
    return (
      <div
        className={`flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-border bg-muted text-xs text-muted-foreground ${className ?? ""}`}
      >
        Ad slot · {slot}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={SITE.adsense.publisher}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
