"use client";

import { useState } from "react";
import { isSameDay } from "date-fns";

import StoryCard from "./story-card";
import { ErrorState } from "../shared/error";
import StoryItemSkeleton from "./skeleton/story";
import EmptyStoryState from "./empty-story";
import Pagination from "../shared/pagination";

import UniversalDatePicker from "../shared/date-picker";
import { cn } from "@/lib/utils";
import { useStories } from "@/hooks/user";

const filterBtn = ["all", "draft", "published", "archived"];

type FilterStatus = "all" | "draft" | "published" | "archived";

export default function Stories() {
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState<FilterStatus>("all");
  const [dateFilter, setDateFilter] = useState<undefined | Date>(undefined);

  const { data, isPending, isError, error, refetch } = useStories(currentPage);

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="flex items-center gap-6">
          {filterBtn.map((b) => (
            <button
              className={cn(
                "text-sm font-bold pb-6 -mb-[25px] cursor-pointer capitalize",
                b === filter
                  ? "text-white border-b-2 border-accent-primary"
                  : "text-foreground/40 hover:text-foreground"
              )}
              key={b}
              onClick={() => setFilter(b as FilterStatus)}
            >
              {b === "all" ? "all stories" : b}
              <span className="ml-1 text-foreground/30 text-[10px]">
                {b === "all"
                  ? data?.pagination?.total_items
                  : data?.stories.filter((s) => s.status === b).length}
              </span>
            </button>
          ))}
        </div>

        <UniversalDatePicker
          date={dateFilter}
          onChange={(date) => setDateFilter(date)}
        />
      </div>

      <div className="space-y-4">
        {isPending ? (
          <StoryItemSkeleton />
        ) : !data || !data.stories ? (
          <EmptyStoryState />
        ) : (
          data.stories
            .filter((s) => (filter === "all" ? true : s.status === filter))
            .filter((s) =>
              dateFilter ? isSameDay(dateFilter, new Date(s.created_at)) : true
            )
            .map((story) => (
              <StoryCard page={currentPage} key={story.id} story={story} />
            ))
        )}
      </div>

      {data?.pagination && (
        <Pagination
          onPageChange={(n) => setCurrentPage(n)}
          data={data.pagination}
        />
      )}
    </section>
  );
}
