// src/components/home/SeriesRow.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers, ArrowRight, PlayCircle } from "lucide-react";

const seriesList = [
  {
    title: "The Lagos Tech Renaissance",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800",
    color: "bg-blue-500",
    description:
      "Documenting the founders and engineers building the new African silicon valley.",
  },
  {
    title: "Modern Stoicism for Writers",
    count: 5,
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800",
    color: "bg-accent-primary",
    description:
      "How ancient philosophy can help modern creators stay focused and resilient.",
  },
  {
    title: "Next.js 15 Masterclass",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=800",
    color: "bg-purple-600",
    description:
      "A comprehensive guide to building full-stack applications with the latest web tech.",
  },
];

export default function SeriesRow() {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 text-accent-primary mb-2">
            <Layers size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Curated Collections
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Deep Dive Series
          </h2>
        </div>
        <Link
          href="/series"
          className="hidden sm:flex items-center gap-2 text-sm font-bold hover:text-accent-primary transition-colors"
        >
          Browse all Series <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {seriesList.map((series) => (
          <Link
            href={`/series/${series.title.toLowerCase().replace(/ /g, "-")}`}
            key={series.title}
            className="group relative"
          >
            {/* The "Stack" Effect Backgrounds */}
            <div className="absolute inset-0 bg-foreground/5 dark:bg-white/5 rounded-[2rem] translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300" />
            <div className="absolute inset-0 bg-foreground/10 dark:bg-white/10 rounded-[2rem] translate-x-1.5 translate-y-1.5 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />

            {/* Main Content Card */}
            <div className="relative bg-background border border-border rounded-[2rem] overflow-hidden p-6 h-full flex flex-col gap-6 shadow-sm group-hover:border-accent-primary/50 transition-colors duration-300">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src={series.image}
                  alt={series.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  {series.count} Parts
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle
                    size={48}
                    className="text-white fill-accent-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-serif font-bold group-hover:text-accent-primary transition-colors">
                  {series.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">
                  {series.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-bold text-foreground/40 group-hover:text-accent-primary transition-colors">
                  START READING
                </span>
                <ArrowRight
                  size={16}
                  className="text-foreground/20 group-hover:text-accent-primary group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
