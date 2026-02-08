import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="py-16 px-6 border-b border-slate-100 dark:border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            How can we help?
          </h1>
          <p className="text-text-secondary text-lg mb-8">
            Search our knowledge base or browse categories below.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for articles, guides, or keywords..."
              className="w-full py-4 px-6 rounded-2xl bg-bg-secondary border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
              Search
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Getting Started",
              icon: "🚀",
              desc: "Learn the basics of creating and publishing your first story.",
            },
            {
              title: "Account & Pro",
              icon: "👤",
              desc: "Manage your profile, subscription, and account security.",
            },
            {
              title: "Earnings & Payouts",
              icon: "💰",
              desc: "Understand how revenue works and how to withdraw funds.",
            },
            {
              title: "Series & Collections",
              icon: "📚",
              desc: "Organize your writing into chapters and curated series.",
            },
            {
              title: "Community Rules",
              icon: "⚖️",
              desc: "Guidelines on safety, integrity, and interaction.",
            },
            {
              title: "Technical Support",
              icon: "🛠️",
              desc: "Troubleshoot editor issues, image uploads, or site errors.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-8 bg-bg-secondary rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-orange-600/50 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-secondary py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8">
            Popular Articles
          </h2>
          <div className="space-y-4">
            {[
              "How to set up your payout method",
              "Understanding the 14-day settlement period",
              "Best practices for formatting your story",
              "Adding collaborators to a Series",
              "What qualifies for the Pro Referral program?",
            ].map((article, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-bg-primary rounded-xl border border-slate-100 dark:border-slate-800 hover:pl-6 transition-all cursor-pointer group"
              >
                <span className="font-medium group-hover:text-orange-600">
                  {article}
                </span>
                <span className="text-slate-300">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-orange-600 rounded-3xl p-10 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Still need help?
          </h2>
          <p className="mb-8 opacity-90">
            Our support team is available Monday through Friday to assist you
            with any inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
              Contact Support
            </button>
            <button className="bg-transparent border border-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
              Join Discord
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
