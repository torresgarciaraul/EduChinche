import siteConfigData from "@/data/site-config.json";
import type { SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = siteConfigData as SiteConfig;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://educhinche.vercel.app";

export const REACTIONS = [
  { type: "HEART", emoji: "❤️", label: "Me encanta" },
  { type: "CLAP", emoji: "👏", label: "Bravo" },
  { type: "LIGHTBULB", emoji: "💡", label: "Muy útil" },
  { type: "FIRE", emoji: "🔥", label: "Impresionante" },
  { type: "BOOKMARK", emoji: "🔖", label: "Lo guardo" },
] as const;

export const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: "PDF",
  pptx: "PowerPoint",
  docx: "Word",
  jpg: "Imagen",
  png: "Imagen",
  link: "Enlace",
};

export const FILE_TYPE_COLORS: Record<string, string> = {
  pdf: "#EF4444",
  pptx: "#F97316",
  docx: "#3B82F6",
  jpg: "#10B981",
  png: "#10B981",
  link: "#8B5CF6",
};

export const NAV_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Recursos", href: "/recursos" },
  { label: "Oposiciones", href: "/blog/categoria/oposiciones" },
  { label: "Sobre mí", href: "/sobre-mi" },
];

export const ARTICLES_PER_PAGE = 9;
export const RESOURCES_PER_PAGE = 12;
