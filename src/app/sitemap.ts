import type { MetadataRoute } from "next";
import { BREEDS, allPairs, comparisonSlug } from "@/lib/data";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/breeds`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/popular`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  for (const post of getAllPosts()) {
    base.push({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const breed of BREEDS) {
    base.push({
      url: `${SITE.url}/breed/${breed.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const [a, b] of allPairs()) {
    base.push({
      url: `${SITE.url}/compare/${comparisonSlug(a, b)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return base;
}
