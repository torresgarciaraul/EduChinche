import { SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lightbulb, Rocket, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos Pedagógicos",
  description: "Iniciativas y proyectos de aula diseñados para transformar el aprendizaje a través de la innovación y la creatividad.",
};

export default function ProyectosPage() {
  const projects = SITE_CONFIG.featuredProjects || [];

  return (
    <div>
      {/* Header */}
      <section 
        style={{ 
          padding: "5rem 0 4rem", 
          background: "linear-gradient(135deg, var(--gray-900) 0%, var(--primary-900) 100%)",
          color: "white"
        }}
      >
        <div className="container-site" style={{ textAlign: "center" }}>
          <div style={{ 
            display: "inline-flex", 
            padding: "0.5rem 1.25rem", 
            background: "rgba(255,255,255,0.1)", 
            borderRadius: "9999px",
            color: "var(--accent-400)",
            fontSize: "0.875rem",
            fontWeight: 700,
            marginBottom: "1.5rem"
          }}>
            <Rocket size={16} style={{ marginRight: "0.5rem" }} /> Innovación Educativa
          </div>
          <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem" }}>
            Proyectos de Aula
          </h1>
          <p style={{ color: "var(--gray-400)", fontSize: "1.125rem", maxWidth: 600, margin: "0 auto" }}>
            Estrategias pedagógicas aplicadas con éxito. Desde gamificación hasta aprendizaje basado en retos.
          </p>
        </div>
      </section>

      <div className="container-site" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ display: "grid", gap: "4rem" }}>
          {projects.map((project: any, index: number) => (
            <div 
              key={project.id} 
              style={{ 
                display: "grid", 
                gridTemplateColumns: index % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: "4rem",
                alignItems: "center"
              }}
              className="project-row"
            >
              <div style={{ order: index % 2 === 0 ? 1 : 2 }} className="project-image-container">
                <div style={{ 
                  position: "relative", 
                  aspectRatio: "16/10", 
                  borderRadius: "var(--radius-2xl)", 
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xl)"
                }}>
                  <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
                </div>
              </div>
              <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
                  {project.title}
                </h2>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ padding: "0.5rem 1rem", background: "var(--primary-50)", color: "var(--primary-700)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem", fontWeight: 700 }}>
                    Gamificación
                  </div>
                  <div style={{ padding: "0.5rem 1rem", background: "var(--accent-50)", color: "var(--accent-700)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem", fontWeight: 700 }}>
                    Primaria
                  </div>
                </div>
                <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <Target size={24} style={{ color: "var(--primary-600)", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                      <strong>Objetivo:</strong> Fomentar la participación activa y el trabajo cooperativo.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <Lightbulb size={24} style={{ color: "var(--accent-500)", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                      <strong>Idea clave:</strong> Integrar elementos de juego en el currículo de Matemáticas.
                    </p>
                  </div>
                </div>
                <Link href={`/proyectos/${project.slug}`} className="btn btn-primary btn-lg">
                  Ver detalles del proyecto <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .project-row { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .project-image-container { order: 1 !important; }
          .project-row > div:last-child { order: 2 !important; }
        }
      `}</style>
    </div>
  );
}
