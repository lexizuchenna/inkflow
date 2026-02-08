import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import { stories } from "@/app/generated/prisma/client";

export default function RelatedArticles({
  related_posts,
}: {
  related_posts: Array<stories>;
}) {
  return (
    <section className="bg-foreground/[0.02] dark:bg-white/[0.02] py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold italic">
              Continue the Journey
            </h3>
            <p className="text-foreground/50 text-sm">
              Hand-picked stories based on your interests.
            </p>
          </div>
          <Link
            href="/explore"
            className="group flex items-center gap-2 text-sm font-bold text-accent-primary"
          >
            Explore More{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related_posts.map((article) => (
            <Link
              href={`/story/${article.slug}`}
              key={article.id}
              className="group bg-background border border-border rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-accent-primary/5 transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={
                    article.featured_image ?? "/images/avatar-placeholder.jpg"
                  }
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <h4 className="text-xl font-serif font-bold leading-snug group-hover:text-accent-primary transition-colors">
                  {article.title}
                </h4>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold uppercase tracking-tighter">
                    <Clock size={14} /> {article.reading_time} read
                  </div>
                  <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
