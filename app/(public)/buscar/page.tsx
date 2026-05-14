"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { searchArticles, searchResources } from "@/lib/db/data";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ResourceCard } from "@/components/recursos/ResourceCard";
import { Search, BookOpen, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Article, Resource } from "@/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate slight delay for feel
      setTimeout(() => {
        setArticles(searchArticles(query));
        setResources(searchResources(query));
        setLoading(false);
      }, 300);
    } else {
      setLoading(false);
    }
  }, [query]);

  if (!query) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0" }}>
        <Search size={48} style={{ margin: "0 auto 1.5rem", color: "var(--text-muted)", opacity: 0.3 }} />
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>¿Qué estás buscando?</h1>
        <p style={{ color: "var(--text-secondary)" }}>Introduce un término de búsqueda para encontrar artículos y recursos.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0" }}>
        <div className="animate-spin" style={{ width: 40, height: 40, border: "3px solid var(--primary-100)", borderTopColor: "var(--primary-600)", borderRadius: "50%", margin: "0 auto 1.5rem" }} />
        <p style={{ color: "var(--text-secondary)" }}>Buscando "{query}"...</p>
      </div>
    );
  }

  const hasResults = articles.length > 0 || resources.length > 0;

  return (
    <div>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Resultados para "{query}"
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Hemos encontrado {articles.length + resources.length} resultados coincidentes.
        </p>
      </div>

      {!hasResults ? (
        <div style={{ textAlign: "center", padding: "4rem 0", background: "var(--bg-secondary)", borderRadius: "var(--radius-xl)" }}>
          <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-primary)" }}>No se han encontrado resultados</p>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>Prueba con términos más generales o revisa la ortografía.</p>
          <Link href="/blog" className="btn btn-primary btn-sm">Ir al blog</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {/* Articles Section */}
          {articles.length > 0 && (
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <BookOpen size={20} style={{ color: "var(--primary-600)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Artículos ({articles.length})</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Resources Section */}
          {resources.length > 0 && (
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <Download size={20} style={{ color: "var(--accent-500)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Recursos ({resources.length})</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container-site" style={{ padding: "4rem 1.5rem" }}>
      <Suspense fallback={<div>Cargando...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
