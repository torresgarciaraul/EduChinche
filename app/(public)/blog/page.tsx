import Link from "next/link";
import { getAllArticles, getAllCategories } from "@/lib/db/data";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Search, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre educación, metodologías activas, recursos y oposiciones para maestros de Primaria.",
};

export default function BlogPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  return (
    <div>
      {/* Header */}
      <section
        style={{
          padding: "3.5rem 0 2.5rem",
          background: "linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%)",
        }}
      >
        <div className="container-site" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 1rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "9999px",
              color: "#93C5FD",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            <BookOpen size={14} />
            {articles.length} artículos publicados
          </div>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 900,
              color: "white",
              marginBottom: "0.75rem",
            }}
          >
            Blog EduChinche
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto" }}>
            Reflexiones, estrategias y recursos para maestros de Primaria y opositores
          </p>
        </div>
      </section>

      <div className="container-site" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--bg-border)",
          }}
        >
          <Link
            href="/blog"
            className="badge"
            style={{
              background: "var(--primary-600)",
              color: "white",
              textDecoration: "none",
              padding: "0.4rem 1rem",
            }}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog/categoria/${cat.slug}`}
              className="badge badge-hover"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                border: "1.5px solid var(--bg-border)",
                padding: "0.4rem 1rem",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Search bar */}
        <form action="/buscar" style={{ marginBottom: "2.5rem", maxWidth: 480 }}>
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              name="q"
              type="search"
              placeholder="Buscar en el blog..."
              className="input"
              style={{ paddingLeft: "2.75rem" }}
            />
          </div>
        </form>

        {/* Articles grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
            <BookOpen size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>No hay artículos todavía</p>
            <p style={{ marginTop: "0.5rem" }}>¡Vuelve pronto!</p>
          </div>
        )}
      </div>
    </div>
  );
}
