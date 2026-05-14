import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getArticleBySlug,
  getCategoryById,
  getRelatedArticles,
  getAllArticles,
} from "@/lib/db/data";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import {
  Clock,
  Eye,
  Calendar,
  ChevronRight,
  Home,
} from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artículo no encontrado" };

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: [{ url: article.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryById(article.categoryId);
  const relatedArticles = getRelatedArticles(article, 3);
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

  return (
    <article>
      {/* Cover image */}
      <div style={{ position: "relative", height: "clamp(280px, 45vw, 520px)", overflow: "hidden" }}>
        <Image
          src={article.coverImage}
          alt={article.coverImageAlt}
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      <div className="container-site" style={{ maxWidth: 900, paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
          aria-label="Ruta de navegación"
        >
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Home size={14} /> Inicio
          </Link>
          <ChevronRight size={14} />
          <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Blog</Link>
          {category && (
            <>
              <ChevronRight size={14} />
              <Link
                href={`/blog/categoria/${category.slug}`}
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight size={14} />
          <span style={{ color: "var(--text-secondary)" }}>{article.title}</span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: "2.5rem" }}>
          {category && (
            <span
              className="badge"
              style={{
                background: category.color + "18",
                color: category.color,
                border: `1.5px solid ${category.color}33`,
                marginBottom: "1rem",
                display: "inline-flex",
              }}
            >
              {category.name}
            </span>
          )}

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.625rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
            }}
          >
            {article.title}
          </h1>

          <p
            style={{
              fontSize: "1.1875rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: "1.5rem",
            }}
          >
            {article.excerpt}
          </p>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--bg-border)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Calendar size={15} />
              {formatDate(article.publishedAt)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Clock size={15} />
              {article.readingTime} min de lectura
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Eye size={15} />
              {article.views.toLocaleString("es-ES")} lecturas
            </span>
          </div>
        </header>

        {/* Content + Sidebar layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "3rem",
            alignItems: "start",
          }}
          className="article-layout"
        >
          {/* Article content */}
          <div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{ maxWidth: "100%" }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginTop: "2.5rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--bg-border)",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Etiquetas:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share buttons */}
            <div style={{ marginTop: "2rem" }}>
              <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                ¿Te ha gustado? ¡Compártelo!
              </p>
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: "5rem" }}>
            {/* Share vertical */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--bg-border)",
                borderRadius: "var(--radius-xl)",
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                Compartir
              </p>
              <ShareButtons url={articleUrl} title={article.title} vertical />
            </div>

            {/* Newsletter mini - INTERACTION REMOVED TO KEEP SC */}
            <div
              style={{
                background: "linear-gradient(135deg, var(--primary-700), var(--primary-900))",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                color: "white",
              }}
            >
              <p style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "0.5rem" }}>📬 Newsletter</p>
              <p style={{ fontSize: "0.875rem", color: "#93C5FD", marginBottom: "1rem", lineHeight: 1.5 }}>
                Recibe artículos como este directamente en tu email.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  readOnly
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "none",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-sans)",
                    outline: "none",
                    cursor: "not-allowed"
                  }}
                />
                <button type="button" className="btn btn-accent btn-sm" style={{ width: "100%" }} disabled>
                  Próximamente
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section style={{ background: "var(--bg-secondary)", padding: "3rem 0" }}>
          <div className="container-site">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "1.75rem",
              }}
            >
              Artículos relacionados
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 900px) {
          .article-layout { grid-template-columns: 1fr !important; }
          .article-layout aside { position: static !important; }
        }
      `}</style>
    </article>
  );
}
