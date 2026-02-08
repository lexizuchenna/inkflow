"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye, Send, X, Plus, Search } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import InkFlowEditor from "@/components/write/editor";
import CoverImageUpload from "@/components/write/cover-image-upload";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { storyService } from "@/services/story";
import { SaveStoryRequest } from "@/services/story/types";
import { useAlert } from "@/providers/alert";
import { useRouter } from "next/navigation";
import CategorySearch from "@/components/write/category";
import Tags from "@/components/write/tags";
import { stories } from "../generated/prisma/client";

export interface BlogPostForm {
  title: string;
  content: string;
  category: string;
  featured_image: string;
  tags: stories["tags"];
  series_id?: stories["series_id"];
}

export default function WritePage() {
  const [seriesSearch, setSeriesSearch] = useState("");
  const router = useRouter();
  const [blogContent, setBlogContent] = useLocalStorage<BlogPostForm>(
    "blog-content",
    {
      title: "",
      content: "",
      category: "",
      featured_image: "",
      tags: [],
      series_id: "",
    }
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem("blog-content");
    };
  });

  const alert = useAlert();

  const saveStory = useMutation({
    mutationFn: (data: SaveStoryRequest) => storyService.saveStory(data),
    onSuccess: (data) => {
      alert.alert("success", {
        message: `This post has been ${
          data.status === "draft" ? "saved as draft" : "pusblished"
        }`,
        onClose: () => {
          router.push("/writer/dashboard");
        },
      });
    },
    onError: (error) => {
      alert.error(error.message || "Something went wrong, try again");
      console.log(error);
    },
  });

  const handleAction = async (status: "published" | "draft") => {
    const { title, content, featured_image } = blogContent;
    if (!title || !content)
      return alert.error("Please add a title and content.");

    if (!featured_image) return alert.error("Please upload a cover image.");

    saveStory.mutate({ status, ...blogContent });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER SECTION (Same as yours) */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] bg-accent-primary/10 px-2 py-1 rounded">
              {saveStory.isPending ? "Saving..." : "Drafting"}
            </span>
            <div className="h-4 w-[1px] bg-border" />
            <input
              value={blogContent.title}
              onChange={(e) =>
                setBlogContent((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter a captivating title..."
              className="bg-transparent font-serif font-bold text-lg outline-none w-48 sm:w-64 md:w-96 placeholder:text-foreground/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-foreground transition-colors">
              <Eye size={16} /> Preview
            </button>
            <button
              onClick={() => handleAction("published")}
              disabled={saveStory.isPending}
              className="bg-accent-primary text-white px-4 sm:px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-accent-primary/20 hover:opacity-90 flex items-center gap-2 cursor-pointer transition-all"
            >
              {saveStory.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              <span className="hidden xs:inline">Publish</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 lg:py-12 px-6">
        <section className="lg:col-span-8 space-y-12">
          <CoverImageUpload
            value={blogContent.featured_image}
            onChange={(featured_image) =>
              setBlogContent((prev) => ({ ...prev, featured_image }))
            }
          />
          <InkFlowEditor
            onChange={(content) =>
              setBlogContent((prev) => ({ ...prev, content }))
            }
            content={blogContent.content}
          />
        </section>

        {/* SIDEBAR SETTINGS */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="p-6 sm:p-8 bg-foreground/[0.02] border border-border rounded-[2.5rem] space-y-8 sticky top-32">
            <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-foreground/30">
              Post Customization
            </h3>

            <CategorySearch
              value={blogContent.category}
              onChange={(category) =>
                setBlogContent((prev) => ({ ...prev, category }))
              }
            />

            <Tags blogContent={blogContent} setBlogContent={setBlogContent} />

            {/* 3. Series Search/Selection */}
            <div className="space-y-4 pt-6 border-t border-border/50">
              <label className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
                Add to Series
              </label>
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-accent-primary transition-colors"
                />
                <input
                  type="text"
                  value={seriesSearch}
                  onChange={(e) => setSeriesSearch(e.target.value)}
                  placeholder="Search your series..."
                  className="w-full bg-background border border-border rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent-primary/10 transition-all"
                />
                {seriesSearch && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-2xl shadow-2xl p-2 z-10 animate-in fade-in slide-in-from-top-2">
                    <p className="text-[10px] p-2 font-bold text-foreground/30 uppercase tracking-widest">
                      Results
                    </p>
                    <button
                      onClick={() => {
                        setBlogContent((prev) => ({
                          ...prev,
                          series_id: "new-series-id",
                        }));
                        setSeriesSearch("My Weekly Tech Bites");
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-foreground/5 transition-colors"
                    >
                      My Weekly Tech Bites
                    </button>
                    <button className="w-full text-left px-3 py-2 text-xs font-bold text-accent-primary border-t border-border/50 mt-1 pt-3">
                      + Create New Series
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <button
                onClick={() => handleAction("draft")}
                className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-border rounded-2xl hover:bg-foreground/5 transition-all active:scale-[0.98] cursor-pointer flex justify-center items-center"
                disabled={saveStory.isPending}
              >
                {saveStory.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Save as Draft"
                )}
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
