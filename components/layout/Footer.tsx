"use client";
import Link from "next/link";
import { GraduationCap, X, Camera, Play, Mail, Heart } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

const RESOURCE_LINKS = [
  { href: "/recursos", label: "Todos los recursos" },
  { href: "/recursos?tipo=pdf", label: "Documentos PDF" },
  { href: "/recursos?tipo=pptx", label: "Presentaciones" },
  { href: "/blog/categoria/oposiciones", label: "Material oposiciones" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--gray-900)",
        color: "var(--gray-300)",
        marginTop: "auto",
      }}
    >
      <div className="container-site" style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--primary-500), var(--primary-700))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap size={20} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.125rem", color: "white" }}>
                {SITE_CONFIG.siteName}
              </span>
            </Link>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--gray-400)", maxWidth: 260 }}>
              {SITE_CONFIG.tagline}. Recursos y reflexiones para maestros de Primaria y opositores.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              {SITE_CONFIG.twitter && (
                <a
                  href={SITE_CONFIG.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "var(--gray-800)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gray-300)",
                    transition: "background 150ms ease, color 150ms ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gray-700)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gray-800)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gray-300)";
                  }}
                >
                  <X size={16} />
                </a>
              )}
              {SITE_CONFIG.instagram && (
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "var(--gray-800)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gray-300)",
                    transition: "background 150ms ease, color 150ms ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#E1306C";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gray-800)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gray-300)";
                  }}
                >
                  <Camera size={16} />
                </a>
              )}
              {SITE_CONFIG.email && (
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  aria-label="Email"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "var(--gray-800)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gray-300)",
                    transition: "background 150ms ease, color 150ms ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-500)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gray-800)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gray-300)";
                  }}
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Blog links */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9375rem" }}>
              Blog
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--gray-400)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 150ms ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gray-400)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9375rem" }}>
              Recursos
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--gray-400)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 150ms ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gray-400)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter mini */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9375rem" }}>
              Newsletter
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--gray-400)", marginBottom: "1rem", lineHeight: 1.6 }}>
              Recursos y artículos directamente en tu email. Sin spam.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("¡Suscripción próximamente disponible!");
              }}
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                required
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--gray-700)",
                  background: "var(--gray-800)",
                  color: "white",
                  fontSize: "0.875rem",
                  outline: "none",
                  width: "100%",
                }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ width: "100%" }}
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--gray-800)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>
            © {new Date().getFullYear()} {SITE_CONFIG.siteName}. Hecho con{" "}
            <Heart size={12} style={{ display: "inline", color: "#EF4444" }} /> para la comunidad docente.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/privacidad" style={{ fontSize: "0.875rem", color: "var(--gray-500)", textDecoration: "none" }}>
              Privacidad
            </Link>
            <Link href="/aviso-legal" style={{ fontSize: "0.875rem", color: "var(--gray-500)", textDecoration: "none" }}>
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
