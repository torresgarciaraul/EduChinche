"use client";
import { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { 
  Settings, 
  User, 
  Globe, 
  Share2, 
  Save,
  X,
  Camera,
  Mail,
  Image as ImageIcon
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>Configuración</h1>
        <p style={{ color: "var(--text-secondary)" }}>Personaliza tu plataforma EduChinche</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2rem" }} className="settings-layout">
        {/* Sidebar Tabs */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ 
              justifyContent: "flex-start", 
              background: "var(--primary-50)", 
              color: "var(--primary-600)",
              borderColor: "transparent"
            }}
          >
            <Globe size={18} /> General
          </button>
          <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start", color: "var(--text-secondary)" }}>
            <User size={18} /> Perfil del Autor
          </button>
          <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start", color: "var(--text-secondary)" }}>
            <Share2 size={18} /> Redes Sociales
          </button>
          <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start", color: "var(--text-secondary)" }}>
            <Settings size={18} /> Avanzado
          </button>
        </aside>

        {/* Form Area */}
        <div className="card" style={{ padding: "2rem" }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* General Section */}
            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Globe size={20} style={{ color: "var(--primary-600)" }} /> Información del Sitio
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div className="form-group">
                  <label className="label">Nombre del Sitio</label>
                  <input type="text" defaultValue={SITE_CONFIG.siteName} className="input" />
                </div>
                <div className="form-group">
                  <label className="label">Eslogan (Tagline)</label>
                  <input type="text" defaultValue={SITE_CONFIG.tagline} className="input" />
                </div>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="label">Descripción (SEO)</label>
                  <textarea defaultValue={SITE_CONFIG.description} className="input" style={{ minHeight: 80 }} />
                </div>
              </div>
            </section>

            <div style={{ height: "1px", background: "var(--bg-border)" }} />

            {/* Author Section */}
            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <User size={20} style={{ color: "var(--primary-600)" }} /> Perfil del Autor
              </h2>
              <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }} className="author-form-row">
                <div style={{ flexShrink: 0 }}>
                  <label className="label">Avatar</label>
                  <div style={{ position: "relative", width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--bg-border)" }}>
                    <img src={SITE_CONFIG.authorAvatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button type="button" style={{ position: "absolute", bottom: 0, right: 0, left: 0, background: "rgba(0,0,0,0.5)", border: "none", color: "white", padding: "0.25rem", cursor: "pointer" }}>
                      <ImageIcon size={14} style={{ margin: "0 auto" }} />
                    </button>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="label">Nombre para mostrar</label>
                    <input type="text" defaultValue={SITE_CONFIG.authorName} className="input" />
                  </div>
                  <div className="form-group">
                    <label className="label">Biografía corta</label>
                    <textarea defaultValue={SITE_CONFIG.authorBio} className="input" style={{ minHeight: 80 }} />
                  </div>
                </div>
              </div>
            </section>

            <div style={{ height: "1px", background: "var(--bg-border)" }} />

            {/* Social Section */}
            <section>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Share2 size={20} style={{ color: "var(--primary-600)" }} /> Enlaces Sociales
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div className="form-group">
                  <label className="label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <X size={16} /> X (Twitter)
                  </label>
                  <input type="url" defaultValue={SITE_CONFIG.twitter} className="input" />
                </div>
                <div className="form-group">
                  <label className="label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Camera size={16} /> Instagram
                  </label>
                  <input type="url" defaultValue={SITE_CONFIG.instagram} className="input" />
                </div>
                <div className="form-group">
                  <label className="label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Mail size={16} /> Email de contacto
                  </label>
                  <input type="email" defaultValue={SITE_CONFIG.email} className="input" />
                </div>
              </div>
            </section>

            {/* Footer Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button type="button" className="btn btn-secondary">Descartar cambios</button>
              <button type="button" className="btn btn-primary btn-lg" onClick={() => alert("¡Próximamente disponible! De momento esta configuración es de solo lectura.")}>
                <Save size={18} /> Guardar configuración
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        @media (max-width: 768px) {
          .settings-layout { grid-template-columns: 1fr !important; }
          .author-form-row { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
