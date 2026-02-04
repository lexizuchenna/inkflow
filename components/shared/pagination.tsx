"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationData {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

interface PaginationProps {
  data: PaginationData;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  data,
  onPageChange,
  className,
}: PaginationProps) {
  const {
    total_items,
    total_pages,
    current_page,
    per_page,
    has_next_page,
    has_previous_page,
  } = data;

  const startRange = (current_page - 1) * per_page + 1;
  const endRange = Math.min(current_page * per_page, total_items);

  const pages = Array.from({ length: total_pages }, (_, i) => i + 1);

  if (total_items === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between pt-12 gap-6",
        className ?? ""
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/20">
        Showing{" "}
        <span className="text-foreground/60">
          {startRange}-{endRange}
        </span>{" "}
        of {total_items} Stories
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={!has_previous_page}
          className="p-3 border border-border rounded-2xl text-foreground/40 hover:text-white hover:border-white transition-all cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center px-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer",
                current_page === page
                  ? "bg-foreground text-background shadow-lg scale-110 z-10"
                  : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={!has_next_page}
          className="p-3 border border-border rounded-2xl text-foreground/40 hover:text-white hover:border-white transition-all cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
