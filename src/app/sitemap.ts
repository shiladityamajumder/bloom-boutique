import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_ORIGIN;
  if (!base) return [];
  return [
    "",
    "/shop",
    "/occasions",
    "/wedding",
    "/about",
    "/contact",
    "/subscriptions",
    "/care",
    ...products.map((p) => `/product/${p.slug}`),
  ].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.7,
  }));
}
