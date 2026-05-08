import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">
        We don&apos;t track that ETF (yet) or the URL is wrong.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
      >
        Back to homepage
      </Link>
    </div>
  );
}
