import { cn } from "@/lib/utils";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-12 md:py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* 1. TEXT HEADER - Enhanced Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-accent-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-primary">
                Curated Collections
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none">
              The Archive<span className="text-accent-primary">.</span>
            </h1>
            <p className="text-foreground/40 text-lg font-light max-w-lg leading-relaxed">
              Journey through the curated intersections of Lagosian life, where
              technical logic meets the city's fluid prose.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="text-4xl font-serif italic text-white/10">12</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/20">
              Total Categories
            </span>
          </div>
        </div>

        {/* 2. BENTO GRID - Enhanced with Glassmorphism & Motion */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">
          {/* Main Featured Category: Technology */}
          <div className="md:col-span-7 relative rounded-[3rem] overflow-hidden group cursor-pointer border border-white/5 shadow-2xl">
            {/* Dynamic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 opacity-90 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-accent-primary/5 group-hover:bg-transparent transition-colors z-10" />

            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />

            {/* Content */}
            <div className="absolute bottom-12 left-12 right-12 z-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                  Featured
                </span>
                <span className="h-[1px] w-12 bg-white/20" />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-none group-hover:text-accent-primary transition-colors duration-500">
                Technology
              </h2>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-white text-lg font-bold">1,240</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    Stories
                  </p>
                </div>
                <div>
                  <p className="text-accent-primary text-lg font-bold">+45</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    Today
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Grid Column */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {[
              {
                name: "Lifestyle",
                img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
                count: "842",
              },
              {
                name: "Literature",
                img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
                count: "520",
              },
            ].map((cat) => (
              <div
                key={cat.name}
                className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5 shadow-xl"
              >
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-accent-primary/20 transition-all duration-700 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center group-hover:scale-110 transition-transform duration-[1500ms]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 text-center">
                  <h3 className="text-4xl font-serif font-bold text-white group-hover:translate-y-[-4px] transition-transform duration-500">
                    {cat.name}
                  </h3>
                  <div className="h-[1px] w-0 group-hover:w-16 bg-accent-primary transition-all duration-500 mt-2" />
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                    {cat.count} Artifacts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE LIBRARY: All Categories Grid */}
      <section className="bg-foreground/[0.02] py-24 px-6 border-t border-border relative overflow-hidden">
        {/* Subtle Background Text - Decorative "ARCHIVE" */}
        <div className="absolute -bottom-10 -right-10 text-[20rem] font-serif font-bold text-white/[0.01] pointer-events-none select-none">
          INDEX
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with Tactile View Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-primary">
                Master Index
              </h3>
              <p className="text-2xl font-serif text-white/80">
                Explore by Collection
              </p>
            </div>

            <div className="flex items-center gap-1 bg-background/50 backdrop-blur-md border border-border p-1 rounded-2xl shadow-inner">
              {["Grid", "List"].map((view, idx) => (
                <button
                  key={view}
                  className={cn(
                    "px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer rounded-xl",
                    idx === 0
                      ? "bg-foreground text-background shadow-lg"
                      : "text-foreground/40 hover:text-foreground/80"
                  )}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* The Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
            {[
              { name: "Business", count: 84, color: "text-blue-400" },
              { name: "Design", count: 112, color: "text-purple-400" },
              { name: "Culture", count: 67, color: "text-orange-400" },
              { name: "Science", count: 43, color: "text-emerald-400" },
              { name: "Music", count: 95, color: "text-pink-400" },
              { name: "Travel", count: 31, color: "text-cyan-400" },
            ].map((cat, i) => (
              <div key={i} className="group flex flex-col cursor-pointer">
                {/* Category Identity */}
                <div className="flex items-end justify-between border-b border-border/50 pb-6 mb-8 group-hover:border-accent-primary/50 transition-colors duration-500">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-accent-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                      Discovery
                    </span>
                    <h4 className="text-4xl font-serif font-bold text-white group-hover:italic transition-all duration-500">
                      {cat.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-serif text-white/10 group-hover:text-accent-primary/20 transition-colors">
                      {cat.count < 100 ? `0${cat.count}` : cat.count}
                    </span>
                    <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-tighter">
                      Artifacts
                    </span>
                  </div>
                </div>

                {/* Interactive Mini Preview List */}
                <div className="space-y-6">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="group/item flex items-start gap-4 transition-all duration-300"
                    >
                      <span className="mt-2 h-[1px] w-4 bg-border group-hover/item:w-6 group-hover/item:bg-accent-primary transition-all" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground/40 group-hover/item:text-foreground transition-colors line-clamp-1">
                          The future of banking in West Africa and the rise of
                          Neo-Banks
                        </p>
                        <p className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">
                          Read Article — 4m
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-10 flex items-center gap-3 overflow-hidden">
                  <div className="h-[1px] flex-1 bg-border/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 group-hover:text-accent-primary transition-colors whitespace-nowrap cursor-pointer">
                    Enter Collection
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
