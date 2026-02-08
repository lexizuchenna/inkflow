import { Sparkles, Shuffle } from "lucide-react";

export default function SurpriseButton() {
  const handleRandom = () => {
    console.log("Redirecting to a random masterpiece...");
  };

  return (
    <button
      onClick={handleRandom}
      className="group relative flex items-center gap-2 px-6 py-3 bg-foreground text-background dark:bg-paper-50 dark:text-ink-900 rounded-full font-bold overflow-hidden transition-all hover:pr-10"
    >
      <Sparkles size={18} className="text-accent-primary animate-pulse" />
      <span>Surprise Me</span>
      <Shuffle
        size={16}
        className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all"
      />
    </button>
  );
}
