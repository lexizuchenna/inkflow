"use client";

import React, { useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Heart,
  MessageCircle,
  Bookmark,
  SearchX,
  RotateCcw,
} from "lucide-react";
import { FilterProps } from "./filter";
import { useStoriesInfinite } from "@/hooks/stories";
import { format } from "date-fns";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function ExploreGrid({
  selectedTags,
  sortBy,
  timeRange,
  setSelectedTags,
  setSortBy,
  setTimeRange,
}: FilterProps & {
  setSelectedTags?: (tags: string[]) => void;
  setSortBy?: (sort: Sort) => void;
  setTimeRange?: (range: TimeRange) => void;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useStoriesInfinite({
      topics: selectedTags,
      sort: sortBy,
      time: timeRange,
    });

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "400px" } // Increased margin for smoother loading
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const stories = data?.pages.flatMap((page) => page.data) || [];

  // 1. Initial Loading State
  if (status === "pending") {
    return (
      <div className="py-24 flex flex-col items-center justify-center w-full animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-accent-primary mb-4" size={40} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
          Gathering Ink...
        </p>
      </div>
    );
  }

  // 2. Empty State
  if (status === "success" && stories.length === 0) {
    return (
      <div className="py-24 px-6 flex flex-col items-center justify-center text-center w-full border border-dashed border-border rounded-[3rem] animate-in zoom-in-95 duration-500">
        <div className="p-6 rounded-full bg-foreground/[0.03] mb-6">
          <SearchX size={48} className="text-foreground/20" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-2">No stories found</h3>
        <p className="text-foreground/50 max-w-xs mb-8 text-sm leading-relaxed">
          We couldn't find any stories matching your current filters. Try
          adjusting your search or topics.
        </p>
        <button
          onClick={() => {
            setSelectedTags?.([]);
            setSortBy?.("newest");
            setTimeRange?.("all");
          }}
          className="flex items-center gap-2 px-6 py-3 bg-foreground text-background dark:bg-white dark:text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95"
        >
          <RotateCcw size={14} /> Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Masonry naturally appends items to the bottom of the columns. 
        Since React doesn't re-render the whole list (only adds new DOM nodes), 
        your scroll position will remain anchored.
      */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {stories.map((story) => (
          <div key={story.id} className="mb-6">
            <ExploreCard story={story} />
          </div>
        ))}
      </Masonry>

      <div
        ref={loaderRef}
        className="py-12 flex justify-center w-full min-h-[100px]"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-accent-primary" size={32} />
            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              Loading more stories
            </p>
          </div>
        ) : !hasNextPage && stories.length > 0 ? (
          <div className="flex flex-col items-center gap-4">
            <div className="h-[1px] w-12 bg-border" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">
              End of the horizon
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ... ExploreCard stays the same ...

function ExploreCard({ story }: { story: any }) {
  // Using ID as seed for consistent random-looking aspects in masonry
  const heights = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-square",
    "aspect-[2/3]",
  ];
  const randomAspect = heights[story.id.length % heights.length];

  return (
    <div className="group bg-background border border-border rounded-[1.5rem] overflow-hidden hover:shadow-2xl hover:shadow-accent-primary/5 transition-all duration-500">
      {/* Image Container */}
      <Link
        href={`/story/${story.slug}`}
        className={`relative block w-full ${randomAspect} overflow-hidden`}
      >
        <Image
          src={
            story.featured_image ||
            `https://picsum.photos/seed/${story.slug}/600/800`
          }
          alt={story.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-accent-primary transition-colors">
              <Heart size={16} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-accent-primary transition-colors">
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-tight text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded">
            {story.category}
          </span>
          <span className="text-[10px] text-foreground/40 font-medium">
            {format(new Date(story.created_at), "MMM d, yyyy")}
          </span>
        </div>

        <Link href={`/story/${story.slug}`}>
          <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-accent-primary transition-colors line-clamp-2">
            {story.title}
          </h3>
        </Link>

        {story.excerpt && (
          <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">
            {story.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent-primary/20 overflow-hidden relative border border-border">
              <Image
                src={
                  story.author?.avatar_url ||
                  `https://i.pravatar.cc/100?u=${story.author?.id}`
                }
                alt={story.author?.display_name || "Author"}
                fill
              />
            </div>
            <span className="text-[11px] font-bold text-foreground/70 tracking-tight">
              {story.author?.display_name || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-foreground/30 text-[10px] font-bold">
            <span className="flex items-center gap-1">
              <Heart size={12} className="text-red-500/50" />{" "}
              {story.like_count || 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={12} /> {story.comment_count || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
