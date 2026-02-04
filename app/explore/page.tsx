"use client";

import { useState } from "react";
import SearchCommandCenter from "@/components/search/search";
import FilterSidebar from "@/components/explore/filter";
import ExploreGrid from "@/components/explore/grid";
import TrendingSpark from "@/components/explore/trending";

export default function Explore() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<Sort>("newest");
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  return (
    <div className="min-h-screen pt-12">
      <div className="mb-16">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Explore InkFlow
          </h1>
          <p className="text-foreground/50">
            Discover new perspectives from across the world.
          </p>
        </div>
        <SearchCommandCenter />
      </div>

      <TrendingSpark />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <FilterSidebar
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setSortBy={setSortBy}
          sortBy={sortBy}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        <div className="flex-1">
          <ExploreGrid
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setSortBy={setSortBy}
            setTimeRange={setTimeRange}
            sortBy={sortBy}
            timeRange={timeRange}
          />
        </div>
      </div>
    </div>
  );
}
