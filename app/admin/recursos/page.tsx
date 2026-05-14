"use client";
import { getAllResourcesAdmin, getCategoryById } from "@/lib/db/data";
import { 
  Download, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  ExternalLink,
  FileText,
  Presentation,
  FileIcon
} from "lucide-react";
import Link from "next/link";
import { formatFileSize, formatDateShort } from "@/lib/utils";
import { FILE_TYPE_COLORS } from "@/lib/constants";

export default function AdminResources() {
  const resources = getAllResourcesAdmin();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>Recursos</h1>
          <p style={{ color: "var(--text-secondary)" }}>Biblioteca de materiales descargables ({resources.length})</p>
        </div>
        <Link href="/admin/recursos/nuevo" className="btn btn-primary">
          <Plus size={18} /> Nuevo Recurso
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
        <select className="input" style={{ width: 150, background: "var(--bg-secondary)" }}>
          <option value="">Tipo de archivo</option>
          <option value="pdf">PDF</option>
          <option value="pptx">PowerPoint</option>
          <option value="docx">Word</option>
        </select>
      </div>

      {/* Resources Table */}
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
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Recurso</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Tipo</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Tamaño</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Descargas</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Valoración</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => {
                const typeColor = FILE_TYPE_COLORS[resource.fileType] || "#6B7280";
                return (
                  <tr key={resource.id} style={{ borderBottom: "1px solid var(--bg-border)", transition: "background 150ms ease" }} className="table-row-hover">
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0 }}>
                          <img src={resource.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {resource.title}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {resource.fileName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span 
                        style={{ 
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          padding: "0.25rem 0.625rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: typeColor + "15",
                          color: typeColor
                        }}
                      >
                        {resource.fileType === "pdf" && <FileText size={12} />}
                        {resource.fileType === "pptx" && <Presentation size={12} />}
                        {resource.fileType === "docx" && <FileIcon size={12} />}
                        {resource.fileType.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      {formatFileSize(resource.fileSize)}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      {resource.downloads.toLocaleString("es-ES")}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F59E0B", fontWeight: 700, fontSize: "0.875rem" }}>
                        <Star size={14} fill="#F59E0B" />
                        {resource.rating.toFixed(1)}
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <Link href={`/recursos/${resource.slug}`} target="_blank" className="btn btn-ghost btn-icon" title="Ver en la web">
                          <ExternalLink size={16} />
                        </Link>
                        <Link href={`/admin/recursos/editar/${resource.id}`} className="btn btn-ghost btn-icon" title="Editar">
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

      <style>{`
        .table-row-hover:hover {
          background: var(--bg-secondary) !important;
        }
      `}</style>
    </div>
  );
}
