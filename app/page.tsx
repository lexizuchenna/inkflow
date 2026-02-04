import { Metadata } from "next";

import { AppException } from "@/exceptions";
import { api } from "@/lib/axios";

import CategoryBar from "@/components/category";
import HomeContent from "@/components/home/content";
import Hero from "@/components/home/hero";
import JoinCommunity from "@/components/home/join-community";
import SeriesRow from "@/components/home/series-row";
import TopAuthors from "@/components/home/top-authors";
import { InternalServerError } from "@/components/shared/error";
import { Suspense } from "react";

const ogUrl = `${process.env.NEXT_PUBLIC_API_URL}/og?title=${encodeURIComponent(
  "InnFlow"
)}}`;

export const metadata: Metadata = {
  title: "InkFlow | Discover the Art of Storytelling",
  description:
    "Join InkFlow to explore a world of literary fiction, technical insights, and personal narratives. Publish your stories and grow your audience.",
  openGraph: {
    title: "InkFlow | Professional Publishing Engine",
    description: "The home for professional writers and avid readers.",
    url: "https://inkflow.com",
    siteName: "InkFlow",
    images: [
      {
        url: ogUrl, // Use the dynamic OG route we discussed earlier
        width: 1200,
        height: 630,
        alt: "InkFlow Homepage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkFlow | Discover Great Stories",
    description: "A premium community for writers and readers.",
    images: [ogUrl],
  },
};

export default async function Home() {
  async function getData(): Promise<GetHomeDataRes | AppException> {
    try {
      const res = await api.get<ApiResponse<GetHomeDataRes>>(`/home`);

      return res.data.data;
    } catch (error: any) {
      return new AppException(
        error.message ?? "Something went wrong",
        error.statusCode ?? 500,
        error.error ?? "UNKNOWN_ERROR"
      );
    }
  }

  async function getCategories(): Promise<CategoriesRes> {
    try {
      const { data } = await api.get<ApiResponse<CategoriesRes>>(`/categories`);

      return data.data;
    } catch (error) {
      return [];
    }
  }

  const [data, cateories] = await Promise.all([getData(), getCategories()]);

  console.log("error-m: ", data instanceof AppException);

  if (data instanceof AppException) return <InternalServerError error={data} />;

  const { featured, top_authors, top_stories, trending_stories } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "InkFlow",
        url: `"${process.env.NEXT_PUBLIC_APP_URL}"`,
        potentialAction: {
          "@type": "SearchAction",
          target: `"${process.env.NEXT_PUBLIC_APP_URL}/explore?q={search_term_string}"`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "InkFlow",
        url: `"${process.env.NEXT_PUBLIC_APP_URL}"`,
        logo: `"${process.env.NEXT_PUBLIC_APP_URL}/logo.png"`,
        // "sameAs": [
        //   "https://twitter.com/inkflow",
        //   "https://linkedin.com/company/inkflow"
        // ]
      },
    ],
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero {...featured} />
      <CategoryBar categories={cateories ?? []} />
      <HomeContent
        top_stories={top_stories}
        trending_stories={trending_stories}
      />
      <Suspense>
        <JoinCommunity />
      </Suspense>
      <TopAuthors authors={top_authors} />
      <SeriesRow />
    </div>
  );
}
