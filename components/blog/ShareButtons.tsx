"use client";
import { X, Users, Briefcase, Send, Link2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  vertical?: boolean;
}

const NETWORKS = [
  {
    name: "WhatsApp",
    icon: <MessageSquare size={17} />,
    color: "#25D366",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + "\n" + url)}`,
  },
  {
    name: "X",
    icon: <X size={17} />,
    color: "#000000",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: <Users size={17} />,
    color: "#1877F2",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: <Briefcase size={17} />,
    color: "#0A66C2",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Telegram",
    icon: <Send size={17} />,
    color: "#0088CC",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

export function ShareButtons({ url, title, vertical = false }: ShareButtonsProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("¡Enlace copiado!");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        gap: "0.5rem",
        flexWrap: vertical ? "nowrap" : "wrap",
      }}
    >
      {NETWORKS.map((network) => (
        <a
          key={network.name}
          href={network.getUrl(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${network.name}`}
          title={`Compartir en ${network.name}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: vertical ? "0.5rem 0.75rem" : "0.5rem",
            borderRadius: "var(--radius-md)",
            background: network.color + "15",
            color: network.color,
            border: `1px solid ${network.color}33`,
            textDecoration: "none",
            fontSize: "0.8125rem",
            fontWeight: 600,
            transition: "all 150ms ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = network.color;
            el.style.color = "white";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = network.color + "15";
            el.style.color = network.color;
          }}
        >
          {network.icon}
          {vertical && network.name}
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copiar enlace"
        title="Copiar enlace"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: vertical ? "0.5rem 0.75rem" : "0.5rem",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-secondary)",
          color: "var(--text-secondary)",
          border: "1px solid var(--bg-border)",
          fontSize: "0.8125rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 150ms ease",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-sans)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--primary-600)";
          el.style.color = "white";
          el.style.borderColor = "var(--primary-600)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--bg-secondary)";
          el.style.color = "var(--text-secondary)";
          el.style.borderColor = "var(--bg-border)";
        }}
      >
        <Link2 size={17} />
        {vertical && "Copiar enlace"}
      </button>
    </div>
  );
}
