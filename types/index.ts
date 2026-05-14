export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  readingTime: number;
  published: boolean;
  publishedAt: string;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  categoryId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: "pdf" | "pptx" | "docx" | "jpg" | "png" | "link";
  coverImage: string;
  isPublic: boolean;
  isPremium: boolean;
  downloads: number;
  categoryId: string;
  tags: string[];
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  articleId: string;
  parentId?: string;
  isApproved: boolean;
  isSpam: boolean;
  replies?: Comment[];
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  confirmedAt?: string;
  createdAt: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  description: string;
  authorName: string;
  authorBio: string;
  authorAvatar: string;
  authorManifesto: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  telegram?: string;
  email?: string;
  featuredProjects?: {
    id: string;
    title: string;
    description: string;
    image: string;
    slug: string;
  }[];
}

export interface SearchResult {
  type: "article" | "resource";
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  categoryId: string;
  coverImage?: string;
}
