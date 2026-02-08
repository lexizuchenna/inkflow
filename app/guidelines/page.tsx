export default function GuidelinesLayout() {
  return (
    <div className="min-h-screen bg-bg-secondary transition-colors">
      <header className="relative py-20 px-6 border-b border-slate-100 dark:border-slate-800 bg-bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
          <span className="text-[300px] font-serif font-bold text-text-primary">
            Ink
          </span>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-orange-600 bg-bg-secondary px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800">
              Governance
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-text-secondary">
              v1.2.0
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-text-primary mb-6 tracking-tight">
            InkFlow Guidelines
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
            The definitive framework for the literary ecosystem. Bridging
            authentic storytelling with the digital economy through
            community-led standards.
          </p>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-text-secondary border-t border-slate-50 dark:border-slate-900 pt-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Last updated: Feb 08, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Authored by:</span>
              <span className="text-text-primary font-medium italic">
                Enohmaje
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 hidden lg:block">
          <nav className="sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-orange-600/30" />
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-bold">
                Table of Contents
              </h3>
            </div>

            <ul className="space-y-1 border-l border-slate-100 dark:border-slate-800 ml-1">
              {[
                {
                  id: "01",
                  title: "Content Integrity",
                  slug: "content-integrity",
                },
                {
                  id: "02",
                  title: "Series Management",
                  slug: "series-management",
                },
                {
                  id: "03",
                  title: "Earnings & Payouts",
                  slug: "earnings-payouts",
                },
                { id: "04", title: "Safety & Respect", slug: "safety-respect" },
              ].map((chapter, index) => (
                <li key={chapter.id} className="relative group">
                  <a
                    href={`#${chapter.slug}`}
                    className={`flex items-center gap-4 py-3 pl-6 transition-all duration-300 border-l-2 -ml-[2px] 
      ${
        index === 0
          ? "border-orange-600 text-orange-600 bg-bg-secondary"
          : "border-transparent text-text-secondary hover:text-text-primary hover:border-slate-300 dark:hover:border-slate-600"
      }`}
                  >
                    <span className="font-mono text-[10px] opacity-60 tracking-tighter">
                      {chapter.id}
                    </span>
                    <span className="text-sm font-medium tracking-tight">
                      {chapter.title}
                    </span>
                  </a>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>

            <div className="mt-12 p-5 bg-bg-secondary rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-[11px] leading-relaxed text-text-secondary">
                By publishing on{" "}
                <span className="text-text-primary font-semibold">InkFlow</span>
                , you acknowledge adherence to these chapters.
              </p>
            </div>
          </nav>
        </aside>

        <main className="lg:col-span-9 pb-24">
          <section id="content-integrity" className="mb-24 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-orange-600" />
              <span className="font-mono text-xs font-bold tracking-widest text-orange-600 uppercase">
                Chapter One
              </span>
            </div>

            <h2 className="text-4xl font-serif font-bold text-text-primary mb-8">
              Content Integrity
            </h2>

            <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
              <p className="lead text-xl text-text-secondary">
                InkFlow is built on the premise of{" "}
                <strong>Quality over Quota</strong>. Our ecosystem thrives when
                stories are treated as assets, not just engagement metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                    The Standard
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Originality: 100% ownership required.",
                      "Depth: Minimum 300 words for visibility.",
                      "AI Policy: Full disclosure mandatory.",
                      "Formatting: Proper use of HTML semantic tags.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-text-secondary"
                      >
                        <span className="text-orange-600 mt-1">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-bg-secondary p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">
                    Prohibited Content
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary mb-0">
                    Plagiarism, hate speech, and "empty" SEO-farming posts are
                    strictly forbidden. Violations result in account suspension
                    and forfeiture of unsettled earnings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="series-management" className="mb-24 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-orange-600" />
              <span className="font-mono text-xs font-bold tracking-widest text-orange-600 uppercase">
                Chapter Two
              </span>
            </div>

            <h2 className="text-4xl font-serif font-bold text-text-primary mb-8">
              Series Management
            </h2>

            <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
              <p className="text-text-secondary">
                Series are the architecture of long-form world-building. To
                maintain the technical integrity of the platform, Series must
                follow strict organizational rules.
              </p>

              <div className="my-10 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden not-prose">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-bg-secondary">
                    <tr>
                      <th className="p-4 text-xs font-bold uppercase text-text-secondary border-b border-slate-100 dark:border-slate-800">
                        Requirement
                      </th>
                      <th className="p-4 text-xs font-bold uppercase text-text-secondary border-b border-slate-100 dark:border-slate-800">
                        Rule
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-4 border-b border-slate-50 dark:border-slate-900 text-text-primary font-medium">
                        Sequential Logic
                      </td>
                      <td className="p-4 border-b border-slate-50 dark:border-slate-900 text-text-secondary italic">
                        Chapters must be numbered correctly in metadata.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-slate-50 dark:border-slate-900 text-text-primary font-medium">
                        Cadence
                      </td>
                      <td className="p-4 border-b border-slate-50 dark:border-slate-900 text-text-secondary italic">
                        Unfinished series should be updated at least monthly.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-text-primary font-medium">
                        Discovery
                      </td>
                      <td className="p-4 text-text-secondary italic">
                        Mis-categorizing a series to manipulate trends is
                        prohibited.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="earnings-payouts" className="mb-24 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-orange-600" />
              <span className="font-mono text-xs font-bold tracking-widest text-orange-600 uppercase">
                Chapter Three
              </span>
            </div>

            <h2 className="text-4xl font-serif font-bold text-text-primary mb-8">
              Earnings & Payouts
            </h2>

            <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none text-text-secondary">
              <p>
                Revenue generated on InkFlow follows a transparent settlement
                cycle to ensure security and prevent fraudulent activity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
                {[
                  {
                    label: "Unsettled",
                    desc: "Funds currently in the 14-day verification window.",
                  },
                  {
                    label: "Settled",
                    desc: "Verified funds available for immediate withdrawal.",
                  },
                  {
                    label: "Payout",
                    desc: "Processed payments sent to your connected account.",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 bg-bg-secondary border border-slate-100 dark:border-slate-800 rounded-xl"
                  >
                    <h5 className="text-orange-600 font-bold text-sm mb-1">
                      {stat.label}
                    </h5>
                    <p className="text-xs text-text-secondary m-0">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="safety-respect" className="mb-24 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-orange-600" />
              <span className="font-mono text-xs font-bold tracking-widest text-orange-600 uppercase">
                Chapter Four
              </span>
            </div>

            <h2 className="text-4xl font-serif font-bold text-text-primary mb-8">
              Safety & Respect
            </h2>

            <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none text-text-secondary">
              <p>
                We maintain a zero-tolerance policy for harassment. Our
                community is built on constructive feedback and the safety of
                all participants.
              </p>
              <blockquote className="border-l-orange-600 bg-bg-secondary p-4 italic text-sm">
                "Critique the work, respect the writer."
              </blockquote>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
