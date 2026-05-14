"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye } from "lucide-react";
import { getCategoryById } from "@/lib/db/data";
import { formatDateShort } from "@/lib/utils";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const category = getCategoryById(article.categoryId);

  return (
    <Link
      href={`/blog/${article.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        className="card"
        style={{
          height: "100%",
          cursor: "pointer",
          transition: "transform 250ms ease, box-shadow 250ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
        }}
      >
        {/* Cover image */}
        <div
          style={{
            position: "relative",
            aspectRatio: featured ? "16/7" : "16/9",
            overflow: "hidden",
            background: "var(--bg-secondary)",
          }}
        >
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            style={{ objectFit: "cover", transition: "transform 400ms ease" }}
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
          />
          {/* Category badge overlay */}
          {category && (
            <span
              className="badge"
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "0.75rem",
                background: category.color + "22",
                color: category.color,
                border: `1px solid ${category.color}44`,
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
            >
              {category.name}
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: featured ? "1.5rem" : "1.25rem" }}>
          <h3
            style={{
              fontSize: featured ? "1.25rem" : "1.0625rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.title}
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "1rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </p>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Calendar size={13} />
              {formatDateShort(article.publishedAt)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={13} />
              {article.readingTime} min
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Eye size={13} />
              {article.views.toLocaleString("es-ES")}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
