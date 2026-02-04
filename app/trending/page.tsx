import { cn } from "@/lib/utils";

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. PULSE HEADER */}
      <section className="relative py-16 md:py-28 px-6 border-b border-border/50 overflow-hidden">
        {/* Subtitle / Background Glow - Subtle texture */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-primary),0.03),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Title Area */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-primary/80">
                  Live Feed
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tighter leading-[0.8]">
                The Pulse<span className="text-accent-primary">.</span>
              </h1>

              <p className="text-foreground/40 text-sm md:text-base max-w-md font-medium leading-relaxed">
                The most discussed stories in the city, updated in real-time by
                the InkFlow community.
              </p>
            </div>

            {/* Responsive Tab Switcher */}
            <div className="flex items-center p-1 bg-foreground/[0.03] border border-border/50 rounded-2xl w-fit backdrop-blur-sm">
              {["Today", "This Week", "This Month"].map((tab, idx) => (
                <button
                  key={tab}
                  className={cn(
                    "px-4 md:px-6 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer rounded-xl",
                    idx === 0
                      ? "bg-white text-black shadow-xl" // Active Style
                      : "text-foreground/40 hover:text-foreground/80"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING GRID/LIST */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-20 px-6">
        {/* LEFT: Top Ranked Stories */}
        <div className="lg:col-span-8 space-y-32 md:pl-12">
          {[1, 2, 3, 4, 5].map((rank) => (
            <div
              key={rank}
              className="group relative flex flex-col md:flex-row gap-8 items-start"
            >
              {/* 1. RANKING INDICATOR - Enhanced with Momentum */}
              <div className="absolute -left-16 top-0 hidden xl:flex flex-col items-center gap-2">
                <span className="text-[10rem] font-serif font-bold text-white/[0.03] leading-none transition-all duration-500 group-hover:text-accent-primary/10 group-hover:-translate-y-2 pointer-events-none">
                  0{rank}
                </span>
                {/* Momentum Arrow - Visualizes "Trending Up" */}
                <div className="flex flex-col items-center gap-1 animate-bounce duration-[3000ms]">
                  <div className="w-[2px] h-8 bg-gradient-to-b from-accent-primary to-transparent" />
                  <span className="text-[8px] font-bold text-accent-primary uppercase tracking-tighter">
                    Rising
                  </span>
                </div>
              </div>

              {/* 2. THUMBNAIL - Vertical "Book Cover" Style */}
              <div className="relative w-full md:w-56 shrink-0 aspect-[3/4] rounded-[2rem] overflow-hidden border border-border bg-foreground/[0.03] cursor-pointer shadow-2xl transition-all duration-700 group-hover:shadow-accent-primary/10 group-hover:border-accent-primary/30">
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />

                {/* Mobile Rank Badge */}
                <div className="absolute top-4 left-4 z-20 xl:hidden bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-xs font-bold text-accent-primary">
                    #0{rank}
                  </span>
                </div>
              </div>

              {/* 3. CONTENT PREVIEW */}
              <div className="flex-1 space-y-6 md:pt-4">
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-lg">
                    Technology
                  </span>
                  <div className="flex items-center gap-2 text-foreground/30">
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>5 min read</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="italic font-normal lowercase tracking-normal">
                      12.4k reads
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.1] transition-all duration-500 group-hover:text-accent-primary cursor-pointer decoration-accent-primary/30 underline-offset-8 group-hover:underline">
                    The Architecture of Chaos: Scaling Startups in Victoria
                    Island
                  </h2>
                  <p className="text-foreground/50 text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-2 max-w-2xl font-light">
                    Lagos is a city built on momentum. From the yellow Danfo
                    buses weaving through traffic like golden threads in a
                    tapestry to the street vendors selling plantain chips...
                  </p>
                </div>

                {/* AUTHOR & ACTIONS */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-3 group/author cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-foreground/10 border border-border group-hover/author:border-accent-primary transition-colors" />
                    <div>
                      <p className="text-sm font-bold text-foreground/80 group-hover/author:text-white transition-colors">
                        Grace Effiong
                      </p>
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                        Thought Leader
                      </p>
                    </div>
                  </div>

                  <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-accent-primary hover:border-accent-primary transition-all cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Discover More */}
        <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-32">
          {/* 1. HOT TOPICS - Enhanced with Popularity Indicators */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">
                Hot Topics
              </h3>
              <span className="h-[1px] flex-1 bg-border/50 ml-4" />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { name: "Fintech", count: "2.4k" },
                { name: "LagosLifestyle", count: "1.8k" },
                { name: "HNG", count: "5.1k" },
                { name: "WritingTips", count: "900" },
                { name: "Poetry", count: "1.2k" },
              ].map((topic) => (
                <button
                  key={topic.name}
                  className="group flex items-center gap-2 px-4 py-2 bg-foreground/[0.03] border border-border/50 rounded-full transition-all hover:border-accent-primary hover:bg-accent-primary/5 cursor-pointer"
                >
                  <span className="text-xs font-bold text-foreground/60 group-hover:text-accent-primary transition-colors">
                    #{topic.name}
                  </span>
                  <span className="text-[9px] font-bold text-foreground/20 group-hover:text-accent-primary/40">
                    {topic.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. RISING CREATORS - Enhanced with Glassmorphism & Verification */}
          <div className="relative p-1 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-border/50 to-transparent">
            <div className="bg-background rounded-[2.4rem] p-8 space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 text-center">
                Rising Creators
              </h3>

              <div className="space-y-6">
                {[
                  {
                    name: "Afolabi Kola",
                    bio: "Engineering at Choppify",
                    growth: "+12%",
                  },
                  {
                    name: "Chisom Okafor",
                    bio: "Visual Storyteller",
                    growth: "+8%",
                  },
                  {
                    name: "Amara Nwosu",
                    bio: "Tech Policy Analyst",
                    growth: "+24%",
                  },
                ].map((author, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar with Status Ring */}
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-foreground/10 border border-border overflow-hidden cursor-pointer group-hover:border-accent-primary/50 transition-colors" />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-background rounded-full flex items-center justify-center">
                          <div className="h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background" />
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-bold text-white hover:text-accent-primary transition-colors cursor-pointer flex items-center gap-1">
                          {author.name}
                        </p>
                        <p className="text-[10px] text-foreground/40 font-medium line-clamp-1">
                          {author.bio}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <button className="text-[10px] font-bold uppercase tracking-widest text-accent-primary bg-accent-primary/10 px-3 py-1.5 rounded-lg hover:bg-accent-primary hover:text-white transition-all cursor-pointer">
                        Follow
                      </button>
                      <span className="text-[9px] font-bold text-green-500/60 uppercase tracking-tighter">
                        {author.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 hover:text-foreground transition-colors border-t border-border/50 pt-6 cursor-pointer">
                View All Creators
              </button>
            </div>
          </div>

          {/* 3. AD/CALLOUT - Added for Visual Completeness */}
          <div className="p-8 bg-accent-primary rounded-[2.5rem] text-white flex flex-col gap-4 items-center text-center shadow-2xl shadow-accent-primary/20">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              InkFlow Studio
            </p>
            <h4 className="text-xl font-serif font-bold leading-tight">
              Your story deserves to be heard.
            </h4>
            <button className="mt-2 bg-white text-accent-primary px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer">
              Start Writing
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
