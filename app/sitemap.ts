import { MetadataRoute } from "next";
import { api } from "@/lib/axios";

interface StorySitemapItem {
  slug: string;
  updated_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const NEXT_PUBLIC_APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || "https://x-inkflow.vercel.app";

  let storyEntries: MetadataRoute.Sitemap = [];

  try {
    const { data } = await api.get("/api/stories/all-slugs", {
      baseURL: NEXT_PUBLIC_APP_URL,
    });

    storyEntries = data.data.map((story: StorySitemapItem) => ({
      url: `${NEXT_PUBLIC_APP_URL}/stories/${story.slug}`,
      lastModified: new Date(story.updated_at),
      changeFrequency: "monthly" as any,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap fetch failed:", error);
  }

  const routes = ["", "/explore", "/write", "/about"].map((route) => ({
    url: `${NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as any,
    priority: 1.0,
  }));

  return [...routes, ...storyEntries];
}
