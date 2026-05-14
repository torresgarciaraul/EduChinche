import { MetadataRoute } from "next";
import { getAllArticles, getAllResources, getAllCategories } from "@/lib/db/data";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const resources = getAllResources().map((resource) => ({
    url: `${SITE_URL}/recursos/${resource.slug}`,
    lastModified: new Date(resource.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categories = getAllCategories().map((cat) => ({
    url: `${SITE_URL}/blog/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const staticPages = ["", "/blog", "/recursos", "/sobre-mi"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  return [...staticPages, ...articles, ...resources, ...categories];
}
