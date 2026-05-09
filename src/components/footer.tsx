import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-muted">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="max-w-md">
            <div className="text-base font-semibold text-foreground">
              {SITE.name}
            </div>
            <p className="mt-2">{SITE.description}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/breeds" className="hover:text-primary">
              All breeds
            </Link>
            <Link href="/popular" className="hover:text-primary">
              Popular comparisons
            </Link>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/disclaimer" className="hover:text-primary">
              Disclaimer
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs">
          <p>
            Information on {SITE.name} is for general guidance only. Individual
            dogs vary widely in temperament, size, and health regardless of
            breed. Consult a veterinarian, breeder, or shelter when choosing a
            dog for your home.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
