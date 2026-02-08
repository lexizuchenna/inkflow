import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ArrowRight } from "lucide-react";

import { stories } from "@/app/generated/prisma/client";

interface HomeContentProps {
  top_stories: Array<stories>;
  trending_stories: Array<stories>;
}

interface TopPostProps {
  image: string;
  category: string;
  title: string;
  excerpt?: string;
  isLarge?: boolean;
  href: string;
}

export default function HomeContent({
  top_stories,
  trending_stories,
}: HomeContentProps) {
  const single = top_stories[0];
  const rest = top_stories.slice(1, top_stories.length);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
      {/* --- MAIN AREA: TOP POSTS (8 Columns) --- */}
      <div className="lg:col-span-8 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold">Top Stories</h2>
            <Link
              href="/archive"
              className="text-accent-primary flex items-center gap-1 text-sm font-bold group"
            >
              View all{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TopPostCard
              href={`/story/${single.slug}`}
              image={single.featured_image}
              category={single.category}
              title={single.title}
              excerpt={single.excerpt}
              isLarge
            />
            {/* Regular Top Posts */}
            <div className="space-y-8">
              {rest.map((s) => (
                <TopPostCard
                  key={s.id}
                  image={s.featured_image}
                  category={s.category}
                  title={s.title}
                  href={`/story/${s.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* --- ASIDE AREA: TRENDING & NEWSLETTER (4 Columns) --- */}
      <aside className="lg:col-span-4 space-y-12">
        {/* Trending Section */}
        <section className="bg-paper-100 dark:bg-ink-800 p-8 rounded-[2rem]">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-accent-primary" size={20} />
            <h3 className="font-serif text-xl font-bold">Trending Now</h3>
          </div>

          <div className="space-y-6">
            {trending_stories.map((s, i) => (
              <Link
                href={`/story/${s.slug}`}
                key={s.id}
                className="flex gap-4 group cursor-pointer"
              >
                <span className="text-4xl font-serif font-bold text-foreground/10 group-hover:text-accent-primary/20 transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="font-bold leading-tight group-hover:text-accent-primary transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-foreground/50 mt-1 uppercase tracking-widest font-bold">
                    {s.reading_time} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

// Sub-component for clean code
function TopPostCard({
  image,
  category,
  title,
  excerpt,
  isLarge,
  href,
}: TopPostProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-4 ${
        !isLarge ? "flex-row items-center gap-4" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl ${
          isLarge ? "aspect-video" : "w-24 h-24 shrink-0"
          // : "aspect-square"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-accent-primary text-[10px] font-bold uppercase tracking-widest">
          {category}
        </span>
        <h3
          className={`${
            isLarge ? "text-2xl" : "text-lg"
          } font-serif font-bold leading-tight group-hover:underline`}
        >
          {title}
        </h3>
        {isLarge && (
          <p className="text-foreground/60 text-sm line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
