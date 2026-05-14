import articlesData from "@/data/articles.json";
import categoriesData from "@/data/categories.json";
import resourcesData from "@/data/resources.json";
import type { Article, Category, Resource } from "@/types";

const articles = articlesData as Article[];
const categories = categoriesData as Category[];
const resources = resourcesData as Resource[];

// ── Articles ──────────────────────────────────────────────────────────

export function getAllArticles(): Article[] {
  return articles.filter((a) => a.published).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getLatestArticles(limit = 6): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.published);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return getAllArticles().filter((a) => a.categoryId === category.id);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.id !== article.id && a.categoryId === article.categoryId)
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return getAllArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getAllArticlesAdmin(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// ── Categories ────────────────────────────────────────────────────────

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

// ── Resources ─────────────────────────────────────────────────────────

export function getAllResources(): Resource[] {
  return [...resources].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTopResources(limit = 4): Resource[] {
  return [...resources].sort((a, b) => b.downloads - a.downloads).slice(0, limit);
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByCategory(categoryId: string): Resource[] {
  return getAllResources().filter((r) => r.categoryId === categoryId);
}

export function searchResources(query: string): Resource[] {
  const q = query.toLowerCase();
  return getAllResources().filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// ── Stats (for admin dashboard) ───────────────────────────────────────

export function getSiteStats() {
  return {
    totalArticles: articles.filter((a) => a.published).length,
    draftArticles: articles.filter((a) => !a.published).length,
    totalResources: resources.length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0),
  };
}

export function getAllResourcesAdmin(): Resource[] {
  return [...resources].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
