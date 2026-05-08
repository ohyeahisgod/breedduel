import Link from "next/link";
import { SITE } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            {SITE.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Dog breed head-to-head
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/breeds" className="hover:text-primary">
            All breeds
          </Link>
          <Link href="/popular" className="hover:text-primary">
            Popular
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
