"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Download,
  Settings,
  LogOut,
  ExternalLink,
  GraduationCap,
  ChevronLeft,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import toast from "react-hot-toast";
import { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface AdminSidebarProps {
  children: React.ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/articulos", label: "Artículos", icon: <FileText size={20} /> },
    { href: "/admin/recursos", label: "Recursos", icon: <Download size={20} /> },
    { href: "/admin/configuracion", label: "Configuración", icon: <Settings size={20} /> },
  ];

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      toast.success("Sesión cerrada");
      router.push("/admin/login");
      router.refresh();
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-secondary)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? 80 : 260,
          background: "var(--bg-card)",
          borderRight: "1px solid var(--bg-border)",
          display: "flex",
          flexDirection: "column",
          transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 50,
        }}
      >
        {/* Logo Area */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: collapsed ? "0" : "0 1.5rem",
            justifyContent: collapsed ? "center" : "space-between",
            borderBottom: "1px solid var(--bg-border)",
          }}
        >
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--primary-600), var(--primary-800))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <GraduationCap size={18} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.125rem", color: "var(--text-primary)" }}>
                {SITE_CONFIG.siteName}
              </span>
            </div>
          )}
          {collapsed && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--primary-600), var(--primary-800))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <GraduationCap size={18} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: "1.25rem 0.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                borderRadius: "var(--radius-lg)",
                color: isActive(item.href) ? "var(--primary-600)" : "var(--text-secondary)",
                background: isActive(item.href) ? "var(--primary-50)" : "transparent",
                textDecoration: "none",
                fontWeight: isActive(item.href) ? 600 : 500,
                transition: "all 200ms ease",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              className={isActive(item.href) ? "" : "admin-nav-hover"}
            >
              <span style={{ color: isActive(item.href) ? "var(--primary-600)" : "inherit" }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}

          <div style={{ height: "1px", background: "var(--bg-border)", margin: "1rem 0.5rem" }} />

          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem",
              borderRadius: "var(--radius-lg)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            className="admin-nav-hover"
          >
            <ExternalLink size={20} />
            {!collapsed && <span>Ver web pública</span>}
          </Link>
        </nav>

        {/* Footer Sidebar */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid var(--bg-border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", gap: "0.5rem" }}>
            {!collapsed && <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Modo oscuro</span>}
            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem",
              width: "100%",
              borderRadius: "var(--radius-lg)",
              color: "var(--status-error)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "background 200ms ease",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <LogOut size={20} />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "absolute",
            right: -12,
            top: 72,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--bg-card)",
            border: "1px solid var(--bg-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-sm)",
            zIndex: 60,
            transform: collapsed ? "rotate(180deg)" : "none",
            transition: "transform 300ms ease",
          }}
        >
          <ChevronLeft size={14} style={{ color: "var(--text-muted)" }} />
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>{children}</div>
      </main>

      <style>{`
        .admin-nav-hover:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
