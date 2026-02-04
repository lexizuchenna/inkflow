import Image from "next/image";
import dayjs from "dayjs";
import { Calendar, Clock, Share2, Bookmark } from "lucide-react";

interface ArticleHeaderProps {
  title: string;
  category: string;
  author: {
    display_name: string;
    avatar_url?: string;
    role: string;
  };
  created_at: string | Date;
  reading_time: number;
}

export default function ArticleHeader({
  title,
  category,
  author,
  created_at,
  reading_time,
}: ArticleHeaderProps) {
  return (
    <header className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-widest border border-accent-primary/20">
            {category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] text-foreground mb-8 text-balance">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 border-y border-border/50 py-8">
          {/* Author Info */}
          <div className="flex items-center gap-3 text-left">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent-primary/20">
              <Image
                src={author.avatar_url ?? "/images/avatar-placeholder.jpg"}
                alt={author.display_name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-foreground leading-none mb-1">
                {author.display_name}
              </p>
              <p className="text-xs text-foreground/50 uppercase tracking-tighter">
                {author.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-foreground/50 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{dayjs(created_at).format("MMM D, YYYY")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{reading_time}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 pl-6 border-l border-border/50">
            <button
              className="p-2 hover:text-accent-primary transition-colors"
              title="Bookmark"
            >
              <Bookmark size={20} />
            </button>
            <button
              className="p-2 hover:text-accent-primary transition-colors"
              title="Share"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
