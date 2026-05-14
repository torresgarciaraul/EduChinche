"use client";
import { getAllArticlesAdmin, getCategoryById } from "@/lib/db/data";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  MoreVertical,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { useState } from "react";

export default function AdminArticles() {
  const articles = getAllArticlesAdmin();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>Artículos</h1>
          <p style={{ color: "var(--text-secondary)" }}>Gestiona el contenido de tu blog ({articles.length})</p>
        </div>
        <Link href="/admin/articulos/nuevo" className="btn btn-primary">
          <Plus size={18} /> Nuevo Artículo
        </Link>
      </div>

      {/* Filters Bar */}
      <div 
        style={{ 
          display: "flex", 
          gap: "1rem", 
          marginBottom: "1.5rem", 
          background: "var(--bg-card)", 
          padding: "1rem", 
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--bg-border)",
          alignItems: "center"
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            placeholder="Buscar por título o etiqueta..." 
            className="input" 
            style={{ paddingLeft: "2.75rem", background: "var(--bg-secondary)" }}
          />
        </div>
        <select className="input" style={{ width: 180, background: "var(--bg-secondary)" }}>
          <option value="">Todas las categorías</option>
          <option value="matematicas">Matemáticas</option>
          <option value="lengua">Lengua</option>
          <option value="oposiciones">Oposiciones</option>
        </select>
        <select className="input" style={{ width: 150, background: "var(--bg-secondary)" }}>
          <option value="">Todos los estados</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
      </div>

      {/* Articles Table */}
      <div 
        className="card" 
        style={{ 
          overflow: "hidden",
          border: "1px solid var(--bg-border)",
          background: "var(--bg-card)"
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--bg-border)", background: "var(--bg-secondary)" }}>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Artículo</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Categoría</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Estado</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Fecha</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Vistas</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                const category = getCategoryById(article.categoryId);
                return (
                  <tr key={article.id} style={{ borderBottom: "1px solid var(--bg-border)", transition: "background 150ms ease" }} className="table-row-hover">
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0 }}>
                          <img src={article.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {article.title}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            /{article.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      {category && (
                        <span 
                          className="badge" 
                          style={{ 
                            background: category.color + "15", 
                            color: category.color,
                            fontSize: "0.75rem"
                          }}
                        >
                          {category.name}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      {article.published ? (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#10B981", fontSize: "0.8125rem", fontWeight: 600 }}>
                          <CheckCircle size={14} /> Publicado
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--text-muted)", fontSize: "0.8125rem", fontWeight: 600 }}>
                          <Clock size={14} /> Borrador
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      {formatDateShort(article.publishedAt)}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      {article.views.toLocaleString("es-ES")}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <Link href={`/blog/${article.slug}`} target="_blank" className="btn btn-ghost btn-icon" title="Ver en la web">
                          <ExternalLink size={16} />
                        </Link>
                        <Link href={`/admin/articulos/editar/${article.id}`} className="btn btn-ghost btn-icon" title="Editar">
                          <Edit3 size={16} />
                        </Link>
                        <button className="btn btn-ghost btn-icon" title="Eliminar" style={{ color: "var(--status-error)" }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {articles.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <FileText size={48} style={{ color: "var(--text-muted)", opacity: 0.2, margin: "0 auto 1rem" }} />
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)" }}>No has creado ningún artículo todavía.</p>
          <Link href="/admin/articulos/nuevo" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Crea tu primer artículo
          </Link>
        </div>
      )}

      <style>{`
        .table-row-hover:hover {
          background: var(--bg-secondary) !important;
        }
      `}</style>
    </div>
  );
}
