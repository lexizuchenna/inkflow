import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const NEXT_PUBLIC_APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || "https://inkflow.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/settings/"],
    },
    sitemap: `${NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
