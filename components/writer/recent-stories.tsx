"use client";

import StoryItemSkeleton from "./skeleton/story";
import EmptyStoryState from "./empty-story";
import { ErrorState } from "../shared/error";

import { useStories } from "@/hooks/user";

import StoryCard from "./story-card";

export default function RecentStories() {
  const { data, isPending, isError, error, refetch } = useStories();

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white">
            Recent Stories
          </h3>
          <span className="px-2 py-0.5 rounded-md bg-foreground/5 text-[9px] font-bold text-foreground/40 uppercase tracking-tighter">
            {data?.stories.length || 0} Total
          </span>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-accent-primary hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
          View Full Library
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Story Cards List */}
      <div className="space-y-4">
        {isPending ? (
          <StoryItemSkeleton />
        ) : !data || !data.stories ? (
          <EmptyStoryState />
        ) : (
          data.stories
            .slice(0, 3)
            .map((story) => <StoryCard key={story.id} story={story} />)
        )}
      </div>
    </section>
  );
}
