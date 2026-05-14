import { getAllResources, getAllCategories } from "@/lib/db/data";
import { ResourceCard } from "@/components/recursos/ResourceCard";
import { Download, Search } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Descarga gratis programaciones, fichas, plantillas y recursos educativos para maestros de Primaria.",
};

export default function RecursosPage() {
  const resources = getAllResources();
  const categories = getAllCategories();

  return (
    <div>
      <section
        style={{
          padding: "3.5rem 0 2.5rem",
          background: "linear-gradient(135deg, var(--primary-900), var(--accent-600) 150%)",
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
              color: "#FED7AA",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            <Download size={14} />
            {resources.length} recursos disponibles • 100% gratuitos
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, color: "white", marginBottom: "0.75rem" }}>
            Biblioteca de Recursos
          </h1>
          <p style={{ color: "#FED7AA", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto" }}>
            Materiales listos para usar en el aula. Programaciones, fichas, plantillas y más.
          </p>
        </div>
      </section>

      <div className="container-site" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <span
            className="badge"
            style={{ background: "var(--accent-500)", color: "white", padding: "0.4rem 1rem" }}
          >
            Todos ({resources.length})
          </span>
          {categories.map((cat) => {
            const count = resources.filter((r) => r.categoryId === cat.id).length;
            if (count === 0) return null;
            return (
              <span
                key={cat.id}
                className="badge"
                style={{
                  background: cat.color + "18",
                  color: cat.color,
                  border: `1.5px solid ${cat.color}33`,
                  padding: "0.4rem 1rem",
                  cursor: "pointer",
                }}
              >
                {cat.name} ({count})
              </span>
            );
          })}
        </div>

        {/* Search */}
        <form action="/buscar" style={{ marginBottom: "2.5rem", maxWidth: 480 }}>
          <div style={{ position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
            <input name="q" type="search" placeholder="Buscar recursos..." className="input" style={{ paddingLeft: "2.75rem" }} />
          </div>
        </form>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {resources.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
            <Download size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>Pronto habrá recursos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
