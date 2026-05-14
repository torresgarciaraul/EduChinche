import Link from "next/link";
import Image from "next/image";
import { 
  getAllArticles, 
  getAllResources, 
  getAllCategories 
} from "@/lib/db/data";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Lightbulb, 
  Users, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);
  const featuredResources = getAllResources().slice(0, 3);
  const categories = getAllCategories();

  return (
    <div style={{ overflow: "hidden" }}>
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section 
        style={{ 
          position: "relative",
          padding: "8rem 0 6rem",
          background: "var(--bg-gradient-hero)",
          color: "white",
        }}
      >
        <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <span 
              className="animate-fadeIn"
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                padding: "0.5rem 1.25rem", 
                background: "rgba(255,255,255,0.1)", 
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--primary-300)",
                marginBottom: "2rem",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <Sparkles size={16} /> 100% Recursos Gratuitos para Maestros
            </span>
            
            <h1 
              className="animate-fadeInUp"
              style={{ 
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)", 
                fontWeight: 900, 
                lineHeight: 1.1, 
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em"
              }}
            >
              Transforma tu aula con <span className="text-gradient" style={{ filter: "brightness(1.5)" }}>EduChinche</span>
            </h1>
            
            <p 
              className="animate-fadeInUp"
              style={{ 
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)", 
                color: "#CBD5E1", 
                marginBottom: "3rem",
                lineHeight: 1.6,
                maxWidth: 600,
                marginInline: "auto"
              }}
            >
              El espacio donde los maestros compartimos estrategias reales, recursos listos para usar y la inspiración que necesitas para cada día.
            </p>
            
            <div 
              className="animate-fadeInUp"
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href="/blog" className="btn btn-primary btn-lg" style={{ minWidth: 200 }}>
                Explorar el Blog <ArrowRight size={18} />
              </Link>
              <Link href="/recursos" className="btn btn-lg glass" style={{ minWidth: 200, color: "white" }}>
                Descargar Recursos
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, background: "var(--primary-600)", filter: "blur(120px)", opacity: 0.2, borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "var(--accent-500)", filter: "blur(150px)", opacity: 0.15, borderRadius: "50%" }} />
      </section>

      {/* ─── Manifesto Section ─── */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "center" }} className="manifesto-grid">
            <div style={{ position: "relative" }}>
              <div style={{ 
                borderRadius: "var(--radius-2xl)", 
                overflow: "hidden", 
                boxShadow: "var(--shadow-xl)",
                aspectRatio: "4/5",
                position: "relative"
              }}>
                <Image 
                  src={SITE_CONFIG.authorAvatar} 
                  alt={SITE_CONFIG.authorName}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "white" }}>
                  <p style={{ fontWeight: 800, fontSize: "1.25rem" }}>{SITE_CONFIG.authorName}</p>
                  <p style={{ opacity: 0.8, fontSize: "0.875rem" }}>Maestro y Creador de EduChinche</p>
                </div>
              </div>
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: "var(--accent-500)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "var(--shadow-lg)", zIndex: 10 }}>
                <Lightbulb size={32} />
              </div>
            </div>
            
            <div>
              <span style={{ color: "var(--primary-600)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.875rem" }}>El porqué de este portal</span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginTop: "1rem", marginBottom: "1.5rem", color: "var(--text-primary)", lineHeight: 1.2 }}>
                Educación con alma, recursos con propósito
              </h2>
              <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                {SITE_CONFIG.authorManifesto}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, background: "var(--primary-50)", color: "var(--primary-600)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>Comunidad</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Hecho por maestros, para maestros.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, background: "var(--accent-50)", color: "var(--accent-600)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>Innovación</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Estrategias que funcionan hoy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)" }}>Proyectos Destacados</h2>
            <div className="section-divider" />
            <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto" }}>
              Iniciativas pedagógicas que han transformado el aprendizaje en mi aula y que puedes replicar en la tuya.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="projects-grid">
            {(SITE_CONFIG as any).featuredProjects?.map((project: any) => (
              <div key={project.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: 300 }}>
                  <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text-primary)" }}>{project.title}</h3>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>{project.description}</p>
                  <Link href={`/proyectos/${project.slug}`} className="btn btn-secondary" style={{ width: "100%", justifyContent: "space-between" }}>
                    Ver proyecto completo <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Blog Posts ─── */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container-site">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
            <div>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)" }}>Últimas reflexiones</h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>Contenido fresco sobre pedagogía y recursos.</p>
            </div>
            <Link href="/blog" className="btn btn-ghost" style={{ fontWeight: 700 }}>
              Ver todo el blog <ArrowRight size={18} />
            </Link>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Authority Section ─── */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid var(--bg-border)", borderBottom: "1px solid var(--bg-border)" }}>
        <div className="container-site">
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2.5rem" }}>
            Colaboraciones y Presencia
          </p>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "3rem", flexWrap: "wrap", opacity: 0.5, filter: "grayscale(100%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}><Globe size={24} /> Universidad X</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}><ShieldCheck size={24} /> Congreso Edu</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}><BookOpen size={24} /> Prensa Escolar</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}><Users size={24} /> Formación Docente</div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)" }}>Lo que dicen los compañeros</h2>
            <div className="section-divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { 
                name: "Lucía García", 
                role: "Maestra de 3º Primaria", 
                text: "Los recursos de EduChinche me han salvado más de una sesión. El enfoque práctico y sencillo es justo lo que necesitamos en el día a día del aula.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
              },
              { 
                name: "Miguel Ángel", 
                role: "Opositor", 
                text: "El blog sobre oposiciones es oro puro. Me ha ayudado a estructurar mi unidad didáctica y a darle ese toque de innovación que buscan los tribunales.",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop"
              },
              { 
                name: "Elena Marín", 
                role: "Directora de Innovación", 
                text: "EduChinche es un referente para nuestra claustro. Siempre que buscamos inspiración para proyectos de gamificación, venimos aquí.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop"
              }
            ].map((t, i) => (
              <div key={i} className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <p style={{ color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6, fontSize: "1rem" }}>
                  &quot;{t.text}&quot;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                    <Image src={t.avatar} alt={t.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "0.9375rem" }}>{t.name}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter Section ─── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container-site">
          <div 
            style={{ 
              background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)", 
              borderRadius: "var(--radius-2xl)", 
              padding: "4rem", 
              color: "white",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)"
            }}
          >
            <div style={{ position: "relative", zIndex: 2, maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>No te pierdas nada</h2>
              <p style={{ fontSize: "1.125rem", opacity: 0.9, marginBottom: "2.5rem" }}>
                Únete a más de 500 maestros y recibe cada semana un recurso exclusivo, una reflexión pedagógica y las últimas noticias del sector.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", maxWidth: 500, margin: "0 auto" }} className="newsletter-form-home">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  readOnly
                  style={{ 
                    flex: 1, 
                    padding: "1rem 1.5rem", 
                    borderRadius: "var(--radius-lg)", 
                    border: "none", 
                    fontSize: "1rem",
                    outline: "none",
                    color: "var(--text-primary)",
                    cursor: "not-allowed"
                  }} 
                />
                <button type="button" className="btn btn-accent btn-lg" disabled>Próximamente</button>
              </div>
              <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", opacity: 0.7 }}>
                Sin spam. Solo contenido educativo de calidad. Puedes darte de baja en cualquier momento.
              </p>
            </div>
            
            <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .manifesto-grid, .projects-grid { grid-template-columns: 1fr !important; }
          .manifesto-grid { gap: 2rem !important; }
          .newsletter-form-home { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
