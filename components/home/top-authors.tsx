// src/components/home/TopAuthors.tsx
import Image from "next/image";

export default function TopAuthors({ authors }: { authors: Array<IUser> }) {
  return (
    <section className="">
      <h2 className="text-3xl font-serif font-bold mb-8">Meet the Minds</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author.display_name}
            className="bg-background border border-border p-6 rounded-[2rem] hover:border-accent-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={author.avatar_url ?? "/images/avatar-placeholder.jpg"}
                  alt={author.display_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-accent-primary">
                  {author.display_name}
                </h3>
                <p className="text-accent-primary text-xs font-bold uppercase tracking-widest">
                  {author.role}
                </p>
              </div>
            </div>
            <p className="mt-4 text-foreground/60 text-sm leading-relaxed">
              {author.bio ?? "Writer and contributor at Inkflow."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
