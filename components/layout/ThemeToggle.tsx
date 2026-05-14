"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="btn btn-ghost btn-icon"
      aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      style={{ borderRadius: "var(--radius-md)" }}
    >
      {theme === "dark" ? (
        <Sun size={18} style={{ color: "var(--accent-400)" }} />
      ) : (
        <Moon size={18} style={{ color: "var(--gray-500)" }} />
      )}
    </button>
  );
}
