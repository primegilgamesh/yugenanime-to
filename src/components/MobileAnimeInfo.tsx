import { Star, Heart } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  anime: AnimeEntry;
}

const MobileAnimeInfo = ({ anime }: Props) => {
  const { isLoggedIn } = useAuth();

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
    { label: "Romaji", value: anime.titleRomaji || anime.titleEnglish || anime.title },
    { label: "Native", value: anime.titleNative || "—" },
    { label: "Synonyms", value: anime.synonyms || "—" },
    ...(anime.genres ? [{ label: "Genres", value: anime.genres }] : []),
  ];

  return (
    <div className="md:hidden px-4 space-y-3">
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-score-star/20 text-score-star font-semibold text-sm py-2.5 rounded-md">
          <Star size={16} fill="currentColor" />
          {anime.score?.toFixed(2) || "—"} Average Score
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-heart/20 text-heart font-semibold text-sm py-2.5 rounded-md">
          <Heart size={16} fill="currentColor" />
          {anime.favorites?.toLocaleString() || "—"} Favorites
        </button>
      </div>
      <div className="overflow-x-auto border-b border-border pb-3">
        <div className="flex gap-4 min-w-max">
          {infoColumns.map(({ label, value }) => (
            <div key={label} className="min-w-[100px] max-w-[140px]">
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
