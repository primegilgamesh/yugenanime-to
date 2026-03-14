import { Star, Heart } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";

interface Props {
  anime: AnimeEntry;
}

const MobileAnimeInfo = ({ anime }: Props) => {
  const isLoggedIn = false;

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      toast("Please login first to write a review", {
        style: { background: "hsla(30, 90%, 50%, 0.85)", color: "white", border: "none" },
        position: "top-right",
      });
      return;
    }
  };

  const infoColumns = [
    { label: "Romaji", value: anime.titleEnglish || anime.title },
    { label: "Native", value: anime.titleNative || "—" },
    { label: "Synonyms", value: anime.synonyms || "—" },
  ];

  return (
    <div className="md:hidden px-4 space-y-3">
      <div className="flex items-center gap-2">
        <Star size={16} className="text-score-star" fill="currentColor" />
        <span className="text-foreground text-sm">{anime.score?.toFixed(2) || "—"} Average Score</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart size={16} className="text-heart" fill="currentColor" />
        <span className="text-foreground text-sm">{anime.favorites?.toLocaleString() || "—"} Favorites</span>
      </div>
      <div className="border-t border-border pt-3">
        <div className="grid grid-cols-3 gap-2">
          {infoColumns.map(({ label, value }) => (
            <div key={label}>
              <div className="text-primary text-xs font-medium">{label}</div>
              <div className="text-foreground text-xs">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleWriteReview}
        className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition"
      >
        Write a Review
      </button>
    </div>
  );
};

export default MobileAnimeInfo;
