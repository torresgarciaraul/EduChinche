import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { X, Camera, Mail, GraduationCap, BookOpen, Heart, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Conoce a Raúl, maestro de Educación Primaria y opositor que comparte sus conocimientos y recursos educativos.",
};

export default function SobreMiPage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "linear-gradient(135deg, var(--primary-900), var(--primary-700))",
        }}
      >
        <div className="container-site" style={{ textAlign: "center" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.2)",
              margin: "0 auto 1.5rem",
              position: "relative",
            }}
          >
            <Image
              src={SITE_CONFIG.authorAvatar}
              alt={SITE_CONFIG.authorName}
              fill
              style={{ objectFit: "cover" }}
              sizes="140px"
              priority
            />
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", marginBottom: "0.5rem" }}>
            Hola, soy {SITE_CONFIG.authorName} 👋
          </h1>
          <p style={{ color: "#93C5FD", fontSize: "1.125rem", maxWidth: 480, margin: "0 auto 1.5rem" }}>
            Maestro de Educación Primaria · Opositor · Apasionado de la educación
          </p>
          {/* Social */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            {SITE_CONFIG.twitter && (
              <a href={SITE_CONFIG.twitter} target="_blank" rel="noopener noreferrer" aria-label="X"
                style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>
                <X size={18} />
              </a>
            )}
            {SITE_CONFIG.instagram && (
              <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>
                <Camera size={18} />
              </a>
            )}
            {SITE_CONFIG.email && (
              <a href={`mailto:${SITE_CONFIG.email}`} aria-label="Email"
                style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container-site" style={{ maxWidth: 780 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="about-content-grid">
            <div>
              <h2 style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Mi historia
              </h2>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>
                  Soy maestro de Educación Primaria y llevo años trabajando en el aula, aprendiendo cada día de mis alumnos. Actualmente estoy preparando las oposiciones mientras sigo formándome y buscando nuevas formas de hacer la educación más significativa.
                </p>
                <p>
                  Creé EduChinche porque quería un espacio donde compartir todo lo que aprendo: recursos que me han funcionado en el aula, reflexiones sobre pedagogía, materiales que he ido creando para las oposiciones...
                </p>
                <p>
                  Creo firmemente que los maestros crecemos juntos cuando compartimos. Este es mi pequeño granito de arena.
                </p>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Mis intereses
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {[
                  { icon: <GraduationCap size={20} />, color: "var(--primary-600)", title: "Oposiciones", desc: "Preparación de temario y unidades didácticas para las oposiciones de maestro." },
                  { icon: <BookOpen size={20} />, color: "#8B5CF6", title: "Lectura y escritura", desc: "Apasionado de la literatura y la didáctica de la lengua." },
                  { icon: <Lightbulb size={20} />, color: "var(--accent-500)", title: "Metodologías activas", desc: "ABP, gamificación, flipped classroom y aprendizaje cooperativo." },
                  { icon: <Heart size={20} />, color: "#EF4444", title: "Comunidad docente", desc: "Creo que compartir es la mejor forma de crecer como maestros." },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      padding: "1rem",
                      background: "var(--bg-secondary)",
                      borderRadius: "var(--radius-lg)",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius-md)",
                        background: item.color + "18",
                        color: item.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9375rem" }}>{item.title}</p>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 0 4rem" }}>
        <div className="container-site" style={{ textAlign: "center", maxWidth: 600 }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            ¿Empezamos juntos?
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Explora el blog, descarga recursos gratuitos o escríbeme directamente.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/blog" className="btn btn-primary btn-lg">Leer el blog</Link>
            <Link href="/recursos" className="btn btn-secondary btn-lg">Ver recursos</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
