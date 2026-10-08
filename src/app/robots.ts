import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/cart", "/wishlist"],
    },
    ...(process.env.SITE_ORIGIN
      ? { sitemap: `${process.env.SITE_ORIGIN}/sitemap.xml` }
      : {}),
  };
}
