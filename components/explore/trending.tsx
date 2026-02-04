// src/components/explore/TrendingSpark.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Zap, TrendingUp, Users, ArrowRight } from "lucide-react";

const sparkItems = [
  {
    id: 1,
    topic: "Next.js 15 Release",
    articles: [
      { title: "Everything new in Next.js 15", readers: 124 },
      { title: "React 19 & Next.js: A deep dive", readers: 89 },
    ],
    tag: "Breaking",
  },
  {
    id: 2,
    topic: "Lagos Startup Week",
    articles: [
      { title: "Funding trends in West Africa", readers: 215 },
      { title: "Top 10 startups to watch", readers: 156 },
    ],
    tag: "Live",
  },
];

export default function TrendingSpark() {
  return (
    <section className="py-8 border-b border-border bg-foreground/[0.02] dark:bg-white/[0.02] mb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent-primary rounded-lg text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <h2 className="text-xl font-serif font-bold italic">The Spark</h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 bg-foreground/5 px-2 py-1 rounded">
            Live Updates
          </span>
        </div>

        {/* Horizontal Reel */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {sparkItems.map((cluster) => (
            <div
              key={cluster.id}
              className="min-w-[320px] md:min-w-[400px] bg-background border border-border rounded-2xl p-5 hover:border-accent-primary transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-accent-primary rounded-full" />
                    <div className="absolute inset-0 w-2 h-2 bg-accent-primary rounded-full animate-ping" />
                  </div>
                  <span className="text-xs font-bold text-accent-primary uppercase tracking-tighter">
                    {cluster.topic}
                  </span>
                </div>
                <span className="text-[10px] text-foreground/30 font-medium">
                  Cluster
                </span>
              </div>

              <div className="space-y-3">
                {cluster.articles.map((article, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="flex items-start justify-between gap-4 p-2 rounded-xl hover:bg-foreground/5 transition-colors group/item"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold leading-snug group-hover/item:text-accent-primary transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-foreground/40 font-bold">
                        <Users size={12} /> {article.readers} reading now
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-1 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-accent-primary"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* View More Card */}
          <button className="min-w-[180px] bg-accent-primary/5 border border-dashed border-accent-primary/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-accent-primary/10 transition-colors group">
            <TrendingUp className="text-accent-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-accent-primary">
              View All Trending
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
