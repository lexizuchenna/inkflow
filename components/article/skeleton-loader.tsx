import React from "react";

import ReadingProgressBar from "@/components/article/progress-bar";

export default async function ArticlePage() {
  return (
    <div className="relative min-h-screen">
      <ReadingProgressBar />

      <section className="py-12 md:py-20 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="placeholder-box h-4 w-24 bg-accent-primary/10 mb-6 rounded-full" />
          <div className="placeholder-box h-16 w-full bg-foreground/5 mb-8 rounded-xl" />
          <div className="placeholder-box h-12 w-64 bg-foreground/5 rounded-full" />
        </div>
      </section>

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          <main className="lg:col-span-7 prose prose-lg dark:prose-invert max-w-none">
            {/* Lead Image Placeholder */}
            <div className="placeholder-box aspect-video w-full bg-foreground/5 rounded-3xl mb-12" />

            {/* Text Content Placeholders */}
            <div className="space-y-6">
              <div className="h-4 w-full bg-foreground/5 rounded" />
              <div className="h-4 w-full bg-foreground/5 rounded" />
              <div className="h-4 w-[90%] bg-foreground/5 rounded" />
              <div className="h-8 w-1/2 bg-foreground/10 rounded mt-12" />
              <div className="h-4 w-full bg-foreground/5 rounded" />
              <div className="h-4 w-[95%] bg-foreground/5 rounded" />
            </div>

            {/* Author Bio Footer Placeholder */}
            <div className="mt-20 pt-10 border-t border-border">
              <div className="placeholder-box h-32 w-full bg-foreground/5 rounded-[2rem]" />
            </div>

            <div className="mt-12">
              <div className="placeholder-box h-64 w-full bg-foreground/5 rounded-[2rem]" />
            </div>
          </main>

          {/* RIGHT SIDEBAR: Table of Contents & Related (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit space-y-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/30">
                On this page
              </h4>
              <div className="space-y-3">
                <div className="h-3 w-3/4 bg-foreground/5 rounded" />
                <div className="h-3 w-1/2 bg-foreground/5 rounded" />
                <div className="h-3 w-2/3 bg-foreground/5 rounded" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="bg-foreground/[0.02] py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10">
            You might also like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="placeholder-box h-64 bg-foreground/5 rounded-2xl" />
            <div className="placeholder-box h-64 bg-foreground/5 rounded-2xl" />
            <div className="placeholder-box h-64 bg-foreground/5 rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
