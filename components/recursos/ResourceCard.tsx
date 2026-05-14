"use client";
import Link from "next/link";
import Image from "next/image";
import { Download, Star, FileText, Presentation, FileIcon } from "lucide-react";
import { getCategoryById } from "@/lib/db/data";
import { formatFileSize } from "@/lib/utils";
import { FILE_TYPE_LABELS, FILE_TYPE_COLORS } from "@/lib/constants";
import type { Resource } from "@/types";

interface ResourceCardProps {
  resource: Resource;
}

function FileTypeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    pdf: <FileText size={16} />,
    pptx: <Presentation size={16} />,
    docx: <FileIcon size={16} />,
  };
  return <>{icons[type] ?? <FileIcon size={16} />}</>;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const category = getCategoryById(resource.categoryId);
  const typeColor = FILE_TYPE_COLORS[resource.fileType] ?? "#6B7280";
  const typeLabel = FILE_TYPE_LABELS[resource.fileType] ?? resource.fileType.toUpperCase();

  return (
    <article
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
      {/* Cover */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "var(--bg-secondary)",
        }}
      >
        <Image
          src={resource.coverImage}
          alt={resource.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* File type badge */}
        <span
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.25rem 0.625rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            background: typeColor,
            color: "white",
          }}
        >
          <FileTypeIcon type={resource.fileType} />
          {typeLabel}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {category && (
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: category.color,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            {category.name}
          </span>
        )}

        <h3
          style={{
            fontSize: "1rem",
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
          {resource.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          {resource.description}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Download size={13} />
            {resource.downloads.toLocaleString("es-ES")} descargas
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Star size={13} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
            {resource.rating.toFixed(1)}
            <span style={{ color: "var(--text-muted)" }}>({resource.ratingCount})</span>
          </span>
        </div>

        {/* Download button */}
        <Link
          href={`/recursos/${resource.slug}`}
          className="btn btn-primary btn-sm"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Download size={15} />
          Descargar {resource.fileSize ? `(${formatFileSize(resource.fileSize)})` : ""}
        </Link>
      </div>
    </article>
  );
}
