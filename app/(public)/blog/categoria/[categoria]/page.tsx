import { notFound } from "next/navigation";
import { getArticlesByCategory, getCategoryBySlug, getAllCategories } from "@/lib/db/data";
import { ArticleCard } from "@/components/blog/ArticleCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: Promise<{ categoria: string }> }

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: `${category.name} — Blog`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.id);

  return (
    <div className="container-site" style={{ padding: "4rem 1.5rem" }}>
      <header style={{ marginBottom: "3rem" }}>
        <Link href="/blog" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", marginBottom: "1rem", fontSize: "0.9375rem" }}>
          <ArrowLeft size={16} /> Volver al blog
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: category.color + "18", color: category.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "1.5rem" }}>#</span>
          </div>
          <div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)" }}>
              {category.name}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>
              {category.description}
            </p>
          </div>
        </div>
      </header>

      {articles.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.75rem" }}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 0", background: "var(--bg-secondary)", borderRadius: "var(--radius-xl)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem" }}>No hay artículos en esta categoría todavía.</p>
          <Link href="/blog" className="btn btn-primary" style={{ marginTop: "1rem" }}>Ver todos los artículos</Link>
        </div>
      )}
    </div>
  );
}
