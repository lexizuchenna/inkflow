import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Twitter, Globe, ShieldCheck } from "lucide-react";

interface AuthorBioProps {
  author: {
    display_name: string;
    avatar_url?: string;
    role: string;
    bio?: string;
    username: string;
    socials?: {
      twitter?: string;
      website?: string;
    };
  };
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <section className="my-12 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row bg-background border border-border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="sm:w-[240px] p-6 bg-foreground/[0.01] border-b sm:border-b-0 sm:border-r border-border flex flex-col items-center text-center justify-center space-y-4">
          <div className="relative">
            <div className="w-[70px] h-[70px] rounded-full p-1 border border-accent-primary/20 bg-background">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-foreground/5">
                <Image
                  src={author.avatar_url ?? "/images/avatar-placeholder.jpg"}
                  alt={author.display_name}
                  fill
                  className="object-cover"
                  sizes="70px"
                  priority
                />
              </div>
            </div>

            <div className="absolute -top-1 -right-1 bg-background p-1 rounded-full border border-border shadow-sm">
              <ShieldCheck size={12} className="text-accent-primary" />
            </div>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-lg font-serif font-bold text-foreground line-clamp-1">
              {author.display_name}
            </h3>
            <p className="text-accent-primary font-bold text-[9px] uppercase tracking-widest">
              {author.role}
            </p>
          </div>

          <button className="w-full py-2 bg-foreground text-background dark:bg-white dark:text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all active:scale-95 cursor-pointer">
            Follow
          </button>
        </div>

        {/* RIGHT PANEL: Bio & Navigation (Reduced Height) */}
        <div className="flex-1 p-6 md:px-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground/20 font-mono text-[10px] tracking-tight">
                @{author.username.toLowerCase()}
              </span>
              <div className="flex items-center gap-3 text-foreground/40">
                <Link
                  href={author.socials?.twitter || "#"}
                  className="hover:text-accent-primary transition-colors"
                >
                  <Twitter size={14} />
                </Link>
                <Link
                  href={author.socials?.website || "#"}
                  className="hover:text-accent-primary transition-colors"
                >
                  <Globe size={14} />
                </Link>
              </div>
            </div>

            <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
              {author.bio || "Writer and contributor at Inkflow."}
            </p>
          </div>

          <div className="pt-4 border-t border-border/50 flex items-center justify-between">
            <Link
              href={`/profile/${author.username}`}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground group/archive"
            >
              Profile
              <ArrowRight
                size={12}
                className="group-hover/archive:translate-x-1 transition-transform"
              />
            </Link>

            <p className="text-[9px] text-foreground/20 font-bold uppercase tracking-widest hidden xs:block">
              Inkflow Contributor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
