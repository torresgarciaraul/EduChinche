"use client";
import { getSiteStats, getLatestArticles } from "@/lib/db/data";
import { 
  FileText, 
  Download, 
  Eye, 
  TrendingUp, 
  ArrowRight,
  Clock,
  Plus
} from "lucide-react";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";

export default function AdminDashboard() {
  const stats = getSiteStats();
  const latestArticles = getLatestArticles(5);

  const statCards = [
    { label: "Artículos Publicados", value: stats.totalArticles, icon: <FileText size={20} />, color: "var(--primary-600)", trend: "+2 este mes" },
    { label: "Recursos Disponibles", value: stats.totalResources, icon: <Download size={20} />, color: "var(--accent-500)", trend: "4 tipos de archivo" },
    { label: "Lecturas Totales", value: stats.totalViews.toLocaleString("es-ES"), icon: <Eye size={20} />, color: "#8B5CF6", trend: "+12% vs ayer" },
    { label: "Descargas Totales", value: stats.totalDownloads.toLocaleString("es-ES"), icon: <TrendingUp size={20} />, color: "#10B981", trend: "Recurso top: Matematicas" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>Dashboard</h1>
          <p style={{ color: "var(--text-secondary)" }}>Resumen de actividad de EduChinche</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/admin/articulos/nuevo" className="btn btn-primary btn-sm">
            <Plus size={18} /> Nuevo Artículo
          </Link>
          <Link href="/admin/recursos/nuevo" className="btn btn-secondary btn-sm">
            <Plus size={18} /> Nuevo Recurso
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {statCards.map((stat) => (
          <div 
            key={stat.label} 
            className="card" 
            style={{ 
              padding: "1.5rem", 
              display: "flex", 
              flexDirection: "column", 
              gap: "0.5rem",
              borderLeft: `4px solid ${stat.trend ? stat.color : "transparent"}` 
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 600 }}>{stat.label}</span>
              <div style={{ padding: "0.5rem", borderRadius: "var(--radius-md)", background: stat.color + "15", color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <TrendingUp size={12} style={{ color: "#10B981" }} />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }} className="dashboard-sections">
        {/* Latest Activity */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Últimos artículos</h2>
            <Link href="/admin/articulos" style={{ fontSize: "0.875rem", color: "var(--primary-600)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Gestionar todos <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {latestArticles.map((article) => (
              <div 
                key={article.id} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "1rem", 
                  padding: "0.75rem", 
                  borderRadius: "var(--radius-lg)", 
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--bg-border)"
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <img src={article.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {article.title}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={12} /> {formatDateShort(article.publishedAt)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Eye size={12} /> {article.views} vistas</span>
                  </div>
                </div>
                <Link href={`/blog/${article.slug}`} target="_blank" className="btn btn-ghost btn-icon">
                  <ExternalLink size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips / Author Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ padding: "1.5rem", background: "linear-gradient(135deg, var(--primary-700), var(--primary-900))", color: "white" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>¡Hola, Raúl!</h2>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, opacity: 0.9, marginBottom: "1.25rem" }}>
              Tu blog está creciendo. Tienes un total de <b>{stats.totalViews}</b> lecturas acumuladas. 
              El recurso de <b>Plantilla Unidad Didáctica</b> es el que más éxito está teniendo esta semana.
            </p>
            <Link href="/admin/configuracion" className="btn btn-accent btn-sm" style={{ width: "100%", justifyContent: "center" }}>
              Ajustar Perfil
            </Link>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Acciones rápidas</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "flex-start", textAlign: "left" }}>
                <TrendingUp size={16} /> Ver estadísticas completas
              </button>
              <button className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "flex-start", textAlign: "left" }}>
                <Users size={16} /> Gestionar suscriptores (Beta)
              </button>
              <button className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "flex-start", textAlign: "left" }}>
                <Plus size={16} /> Crear nueva categoría
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-sections { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// Re-using icon
function ExternalLink({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Users({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
