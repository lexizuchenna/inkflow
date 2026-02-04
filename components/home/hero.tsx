import { ArrowUpRight, Clock, User } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Story } from "@/entities";

export default function Hero(story: Story) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <span className="bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Featured Story
            </span>
            <span className="text-foreground/40 text-sm flex items-center gap-1">
              <Clock size={14} /> {story.reading_time} min read
            </span>
          </div>

          <Link href={`/story/${story.slug}`} className="group">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] text-foreground group-hover:text-accent-primary transition-colors duration-300">
              {story.title}
            </h1>
          </Link>

          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
            {story.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent-primary/20">
              <Image
                src={
                  story.author.avatar_url ?? "/images/avatar-placeholder.jpg"
                }
                alt={story.author.display_name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-foreground">
                {story.author.display_name}
              </p>
              <p className="text-sm text-foreground/50">
                {story.category} •{" "}
                {dayjs(story.created_at).format("MMM D, YYYY")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href={`/story/${story.slug}`}
              className="bg-foreground text-background px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Read Full Article <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Image */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-accent-primary/10 group">
            <Image
              src={story.featured_image}
              alt={story.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Gradient for better contrast on mobile if text goes over */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      {/* <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-primary/5 blur-[120px] rounded-full -z-10" /> */}
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full -z-10" />
    </section>
  );
}
