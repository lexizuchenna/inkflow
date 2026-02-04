import Image from "next/image";

import AuthorBio from "@/components/article/author-bio";
import ArticleBody from "@/components/article/body";
import Comments from "@/components/article/comments";
import ArticleHeader from "@/components/article/header";
import ReadingProgressBar from "@/components/article/progress-bar";
import RelatedArticles from "@/components/article/related";
import SocialActions from "@/components/article/social-actions";
import TableOfContents from "@/components/article/table-of-contents";
import { NotFoundError } from "@/components/shared/error";

import { api } from "@/lib/axios";
import { assignHeadingIds } from "@/utils/story";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  async function getStory(): Promise<GetStoryResponse | null> {
    try {
      // prettier-ignore
      const { data } = await api.get<ApiResponse<GetStoryResponse>>(`/stories/${slug}`);

      if (!data.data || data.statusCode === 404) return null;

      return data.data;
    } catch (error) {
      return null;
    }
  }

  const post = await getStory();

  if (!post) return { title: "Story Not Found | InkFlow" };

  const { story } = post;

  const ogUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }/og?title=${encodeURIComponent(story.title)}&author=${encodeURIComponent(
    story.author.display_name
  )}`;

  return {
    title: `${story.title}`,
    description: story.excerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/stories/${slug}`,
    },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/stories/${slug}`,
      siteName: "InkFlow",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: story.created_at as unknown as string,
      authors: [story.author.display_name],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [ogUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  async function getStory(): Promise<GetStoryResponse | null> {
    try {
      // prettier-ignore
      const { data } = await api.get<ApiResponse<GetStoryResponse>>(`/stories/${slug}`);

      if (!data.data || data.statusCode === 404) return null;

      return data.data;
    } catch (error) {
      return null;
    }
  }

  const post = await getStory();

  if (!post) return <NotFoundError />;

  const { story, series_navigation, related_posts } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    image: story.featured_image,
    author: {
      "@type": "Person",
      name: story.author.display_name,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${story.author.username}`,
    },
    publisher: {
      "@type": "Organization",
      name: "InkFlow",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
    },
    datePublished: story.created_at,
    description: story.excerpt,
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />

      <ArticleHeader {...story} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          <aside className="hidden lg:block lg:col-span-1 sticky top-32 h-fit">
            <SocialActions like_count={story.like_count} />
          </aside>
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-lg border border-border px-6 py-2 rounded-full shadow-2xl flex items-center gap-8">
            <SocialActions like_count={story.like_count} />
          </div>

          <main className="lg:col-span-7 max-w-none">
            <div className="relative w-full aspect-video overflow-hidden mb-12 group">
              {/* shadow-2xl shadow-ink-900/10 dark:shadow-black/20 */}
              <Image
                src={story.featured_image}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover rounded-3xl"
              />
            </div>

            <ArticleBody content={assignHeadingIds(story.content)} />

            <AuthorBio author={story.author} />

            <Comments />
          </main>

          <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit space-y-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/30">
                On this page
              </h4>
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
      <RelatedArticles related_posts={related_posts} />
    </div>
  );
}
