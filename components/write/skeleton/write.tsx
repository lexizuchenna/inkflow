export default function EditSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <header className="sticky top-0 z-50 bg-background border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 bg-foreground/[0.05] rounded-md" />
            <div className="h-4 w-[1px] bg-border" />
            <div className="h-7 w-48 sm:w-64 md:w-96 bg-foreground/[0.08] rounded-lg" />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block h-5 w-20 bg-foreground/[0.05] rounded-md" />
            <div className="h-10 w-24 sm:w-32 bg-foreground/[0.1] rounded-xl" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 lg:py-12 px-6">
        <section className="lg:col-span-8 space-y-12">
          <div className="w-full aspect-[21/9] rounded-[2.5rem] bg-foreground/[0.03] border border-border/50" />

          <div className="space-y-6">
            <div className="h-10 w-3/4 bg-foreground/[0.08] rounded-lg" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-foreground/[0.03] rounded-md" />
              <div className="h-4 w-full bg-foreground/[0.03] rounded-md" />
              <div className="h-4 w-5/6 bg-foreground/[0.03] rounded-md" />
            </div>
            <div className="h-64 w-full bg-foreground/[0.02] rounded-3xl border border-border/30" />
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-8">
          <div className="p-6 sm:p-8 bg-foreground/[0.02] border border-border rounded-[2.5rem] space-y-8 sticky top-32">
            <div className="h-3 w-32 bg-foreground/[0.05] rounded-full" />

            <div className="space-y-3">
              <div className="h-3 w-20 bg-foreground/[0.05] rounded-full" />
              <div className="h-12 w-full bg-background border border-border/50 rounded-2xl" />
            </div>

            <div className="space-y-4">
              <div className="h-3 w-12 bg-foreground/[0.05] rounded-full" />
              <div className="h-12 w-full bg-background border border-border/50 rounded-2xl" />
              <div className="flex flex-wrap gap-2">
                <div className="h-7 w-16 bg-foreground/[0.03] rounded-full" />
                <div className="h-7 w-20 bg-foreground/[0.03] rounded-full" />
                <div className="h-7 w-14 bg-foreground/[0.03] rounded-full" />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="h-3 w-24 bg-foreground/[0.05] rounded-full" />
              <div className="h-12 w-full bg-background border border-border/50 rounded-2xl" />
            </div>

            <div className="pt-6">
              <div className="h-14 w-full bg-foreground/[0.03] border border-border/50 rounded-2xl" />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
