import { MetadataRoute } from "next";
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from "@/lib/store/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopease.store";

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = DEMO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(p.updated_at || p.created_at || Date.now()),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const categoryRoutes = DEMO_CATEGORIES.map((c) => ({
    url: `${baseUrl}/shop?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
