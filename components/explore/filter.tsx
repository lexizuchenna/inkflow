"use client";

import React, { useState } from "react";
import {
  Filter,
  Clock,
  TrendingUp,
  Calendar,
  Hash,
  RotateCcw,
} from "lucide-react";

export interface FilterProps {
  selectedTags: Array<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<Array<string>>>;
  sortBy: "newest" | "most_viewed" | "highest_rated";
  setSortBy: React.Dispatch<
    React.SetStateAction<"newest" | "most_viewed" | "highest_rated">
  >;
  timeRange: "today" | "week" | "month" | "all";
  setTimeRange: React.Dispatch<
    React.SetStateAction<"today" | "week" | "month" | "all">
  >;
}

export default function FilterSidebar({
  selectedTags,
  setSelectedTags,
  setSortBy,
  sortBy,
  timeRange,
  setTimeRange,
}: FilterProps) {
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const categories = [
    "Technology",
    "Design",
    "Lifestyle",
    "Business",
    "Literature",
    "Marketing",
    "Future",
    "Health",
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28 h-fit flex flex-col gap-6 lg:gap-8 max-lg:pb-8 max-lg:border-b max-lg:border-border">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
          <Filter size={16} className="text-accent-primary" />
          <span>Filters</span>
        </div>
        <button
          onClick={() => {
            setSelectedTags([]);
            setSortBy("newest");
            setTimeRange("all");
          }}
          className="text-xs text-foreground/40 hover:text-accent-primary flex items-center gap-1 transition-colors"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* 1. SORT BY SECTION */}
      <FilterGroup title="Sort By" icon={<TrendingUp size={16} />}>
        <div className="flex flex-col gap-2">
          {["Newest", "Most Viewed", "Highest Rated"].map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                checked={sortBy === opt.toLowerCase().replace(" ", "_")}
                onChange={() =>
                  setSortBy(
                    opt.toLowerCase().replace(" ", "_") as
                      | "newest"
                      | "most_viewed"
                      | "highest_rated"
                  )
                }
                className="w-4 h-4 accent-accent-primary"
              />
              <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* 2. TOPIC TAGS (Multi-Select) */}
      <FilterGroup title="Topics" icon={<Hash size={16} />}>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleTag(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedTags.includes(cat)
                  ? "bg-accent-primary border-accent-primary text-white shadow-md shadow-accent-primary/20"
                  : "bg-foreground/5 border-transparent text-foreground/60 hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* 3. TIME RANGE */}
      <FilterGroup title="Time Range" icon={<Calendar size={16} />}>
        <select
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "today" | "week" | "month" | "all")
          }
          className="w-full bg-bg-secondary/5 border border-transparent focus:border-accent-primary rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </FilterGroup>

      {/* 4. READING TIME */}
      <FilterGroup title="Reading Time" icon={<Clock size={16} />}>
        <div className="space-y-4 pt-2">
          <input
            type="range"
            min="1"
            max="30"
            className="w-full accent-accent-primary h-1.5 bg-bg-secondary/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-bold text-foreground/40 uppercase">
            <span>1 min</span>
            <span>30+ mins</span>
          </div>
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-text-primary/80 font-serif font-bold italic">
        {icon}
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
}
