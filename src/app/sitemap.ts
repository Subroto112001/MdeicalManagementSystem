import type { MetadataRoute } from "next";
import { articles } from "@/data/content-data";
import { doctors, departments } from "@/data/medical-data";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://healtho.example";
const staticRoutes = ["", "/about", "/services", "/doctors", "/departments", "/tests", "/packages", "/appointment", "/blog", "/gallery", "/careers", "/contact", "/faq", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map(route => ({ url: `${siteUrl}${route || "/"}`, lastModified: now, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...doctors.map(doctor => ({ url: `${siteUrl}/doctors/${doctor.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...departments.map(department => ({ url: `${siteUrl}/departments/${department.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...articles.map(article => ({ url: `${siteUrl}/blog/${article.slug}`, lastModified: new Date(`${article.date}T00:00:00Z`), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
