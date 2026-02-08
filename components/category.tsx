"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Hash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryBar({
  categories,
}: {
  categories: CategoriesRes;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const router = useRouter();

  return (
    <div className="sticky top-[64px] sm:top-[72px] z-40 bg-background/95 backdrop-blur-md border-b border-border py-3 sm:py-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          {/* Label - Hidden on Tablet and Mobile */}
          <div className="hidden xl:flex items-center gap-2 text-foreground/40 shrink-0 border-r border-border pr-6">
            <Hash size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Topics
            </span>
          </div>

          {/* Scroll Container Wrapper */}
          <div className="relative flex-1 flex items-center group overflow-hidden">
            {/* Left Shadow Gradient (Mobile) */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />

            {/* Desktop Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-2 z-20 p-1.5 bg-background border border-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent-primary"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Categories Container */}
            <div
              ref={scrollRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-0 w-full justify-start md:justify-center"
            >
              {categories.map((cat, index) => (
                <button
                  key={cat.name}
                  className={`
                    whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer
                    ${
                      index === 0
                        ? "bg-foreground text-background border-foreground shadow-lg shadow-foreground/10"
                        : "bg-background border-border text-foreground/60 hover:border-accent-primary hover:text-accent-primary"
                    }
                  `}
                  onClick={() => router.push(`/categories/${cat.slug}`)}
                >
                  {cat.name}
                  <span
                    className={`ml-1.5 text-[9px] sm:text-[10px] opacity-50 ${
                      index === 0 ? "text-background" : "text-foreground"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Desktop Scroll Buttons */}
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-2 z-20 p-1.5 bg-background border border-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent-primary"
            >
              <ChevronRight size={18} />
            </button>

            {/* Right Shadow Gradient (Mobile) */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
