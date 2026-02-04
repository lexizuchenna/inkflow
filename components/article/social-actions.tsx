"use client";

import { useState } from "react";
import {
  Heart,
  Bookmark,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

export default function SocialActions({ like_count }: { like_count: number }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(like_count);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex lg:flex-col items-center justify-center gap-4 py-4 lg:py-0">
      <div className="flex lg:flex-col items-center gap-1 group">
        <button
          onClick={handleLike}
          className={`p-3 rounded-full transition-all duration-300 ${
            liked
              ? "bg-accent-primary/10 text-accent-primary"
              : "bg-foreground/5 text-foreground/40 hover:bg-foreground/10 hover:text-foreground"
          }`}
        >
          <Heart
            size={22}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "scale-110" : ""}
          />
        </button>
        <span className="text-[10px] font-bold text-foreground/40">
          {likesCount}
        </span>
      </div>

      {/* <div className="flex lg:flex-col items-center gap-1 group">
        <button className="p-3 rounded-full bg-foreground/5 text-foreground/40 hover:bg-foreground/10 hover:text-foreground transition-all">
          <MessageCircle size={22} />
        </button>
        <span className="text-[10px] font-bold text-foreground/40">12</span>
      </div> */}

      <div className="h-[1px] w-8 lg:w-[1px] lg:h-8 bg-border my-2" />

      <button
        onClick={() => setSaved(!saved)}
        className={`p-3 rounded-full transition-all ${
          saved
            ? "text-accent-primary"
            : "text-foreground/40 hover:text-foreground"
        }`}
      >
        <Bookmark size={22} fill={saved ? "currentColor" : "none"} />
      </button>

      {/* Share Trigger */}
      <div className="relative group">
        <button className="p-3 rounded-full text-foreground/40 hover:text-foreground transition-all">
          <Share2 size={22} />
        </button>

        {/* Hover/Click Menu for Sharing */}
        <div className="absolute left-full ml-4 top-0 hidden group-hover:flex flex-col gap-2 bg-background border border-border p-2 rounded-2xl shadow-xl animate-in fade-in slide-in-from-left-2 duration-200">
          <button
            className="p-2 hover:bg-foreground/5 rounded-xl transition-colors text-[#1DA1F2]"
            title="Share on Twitter"
          >
            <Twitter size={18} />
          </button>
          <button
            className="p-2 hover:bg-foreground/5 rounded-xl transition-colors text-[#0A66C2]"
            title="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </button>
          <button
            className="p-2 hover:bg-foreground/5 rounded-xl transition-colors text-foreground"
            title="Copy Link"
          >
            <LinkIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
