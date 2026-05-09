import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Dog Breed Guides & Comparisons",
  description:
    "In-depth dog breed guides, head-to-head comparisons, and tips for choosing the right dog for your family.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "BreedDuel Blog — Dog Breed Guides",
    description:
      "Dog breed guides, comparisons, and tips for choosing the right dog.",
    url: `${SITE.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Dog Breed Blog
        </h1>
        <p className="mt-2 text-muted-foreground">
          Breed comparisons, care guides, and tips for finding your perfect dog.
        </p>
      </header>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-border bg-card p-5 hover:bg-muted/50 transition-colors"
          >
            <p className="text-xs text-muted-foreground mb-1">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readingTime} min read
            </p>
            <h2 className="text-lg font-bold leading-snug">{post.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
