"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, GraduationCap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={`navbar-header`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "all 250ms ease",
          background: scrolled
            ? "rgba(var(--bg-primary-rgb, 255,255,255), 0.92)"
            : "var(--bg-primary)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--bg-border)" : "transparent"}`,
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <div className="container-site" style={{ display: "flex", alignItems: "center", height: 64, gap: "1.5rem" }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--primary-600), var(--primary-800))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.35)",
              }}
            >
              <GraduationCap size={20} color="white" />
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.1875rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {SITE_CONFIG.siteName}
            </span>
          </Link>

          {/* Nav desktop */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              marginLeft: "1rem",
              flex: 1,
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.4rem 0.875rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? "var(--primary-600)" : "var(--text-secondary)",
                  textDecoration: "none",
                  background: isActive(link.href) ? "var(--primary-50)" : "transparent",
                  transition: "all 150ms ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginLeft: "auto" }}>
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artículos, recursos..."
                  className="input"
                  style={{ width: 240, height: 36, padding: "0 0.75rem", fontSize: "0.9rem" }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="btn btn-ghost btn-icon"
                  aria-label="Cerrar búsqueda"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="btn btn-ghost btn-icon"
                aria-label="Abrir búsqueda"
              >
                <Search size={18} />
              </button>
            )}

            <ThemeToggle />

            {/* CTA desktop */}
            <Link href="/admin/login" className="btn btn-primary btn-sm desktop-nav" style={{ marginLeft: "0.5rem" }}>
              Admin
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost btn-icon mobile-menu-btn"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid var(--bg-border)",
              background: "var(--bg-primary)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "1rem",
                    fontWeight: isActive(link.href) ? 600 : 500,
                    color: isActive(link.href) ? "var(--primary-600)" : "var(--text-primary)",
                    textDecoration: "none",
                    background: isActive(link.href) ? "var(--primary-50)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="btn btn-primary"
                style={{ marginTop: "0.75rem" }}
              >
                Panel de Admin
              </Link>
            </nav>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
        @media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
    </>
  );
}
