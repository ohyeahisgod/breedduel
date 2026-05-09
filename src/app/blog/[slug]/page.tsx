import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/blog";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/blog/${post.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE.url}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {" · "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        {" · "}
        <span className="text-foreground">{post.title}</span>
      </nav>

      <article>
        <header className="mb-6">
          <p className="text-xs text-muted-foreground mb-2">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingTime} min read
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            {post.description}
          </p>
        </header>

        <div className="mb-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Compare any two dog breeds
              </p>
              <p className="text-xs text-muted-foreground">
                8,778 head-to-head breed comparisons. Size, lifespan,
                temperament, health, and more.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90"
            >
              Compare breeds →
            </Link>
          </div>
        </div>

        <div
          className="text-base leading-relaxed text-foreground
          [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border
          [&_h3]:text-lg [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mt-7 [&_h3]:mb-2
          [&_p]:my-4
          [&_a]:text-primary [&_a]:font-semibold hover:[&_a]:underline
          [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:list-disc
          [&_ol]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal
          [&_li]:my-1
          [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <footer className="mt-12">
        <div className="rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary p-8 text-center text-primary-foreground">
          <p className="text-3xl">🐾</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
            Ready to compare dog breeds?
          </h2>
          <p className="mt-2 text-sm opacity-90">
            8,778 breed comparisons. Free, no login required.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-primary shadow-sm hover:bg-white/90"
          >
            Compare breeds →
          </Link>
        </div>
        <Link
          href="/blog"
          className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Blog
        </Link>
      </footer>
    </div>
  );
}
