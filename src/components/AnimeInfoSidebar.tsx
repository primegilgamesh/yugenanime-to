import { Star, Heart } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  anime: AnimeEntry;
}

const AnimeInfoSidebar = ({ anime }: Props) => {
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

  const infoItems = [
    { label: "Romaji", value: anime.titleRomaji || anime.title },
    { label: "English", value: anime.titleEnglish || anime.title },
    { label: "Native", value: anime.titleNative || "—" },
    ...(anime.synonyms ? [{ label: "Synonyms", value: anime.synonyms }] : []),
    { label: "Format", value: anime.format || "TV" },
    { label: "Studios", value: anime.studios || "—" },
    { label: "Episodes", value: String(anime.episodes || "—") },
    ...(anime.episodesDub ? [{ label: "Episodes (Dub)", value: String(anime.episodesDub) }] : []),
    { label: "Episodes Duration", value: anime.duration || "24 min per ep" },
    { label: "Status", value: anime.status || "—" },
    { label: "Premiered", value: anime.premiered || anime.season || "—" },
    { label: "Genres", value: anime.genres || "—" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Star size={16} className="text-score-star" fill="currentColor" />
        <span className="text-foreground font-semibold text-sm">{anime.score?.toFixed(2) || "—"} Average Score</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart size={16} className="text-heart" fill="currentColor" />
        <span className="text-foreground text-sm">{anime.favorites?.toLocaleString() || "—"} Favorites</span>
      </div>
      <div className="border-t border-border pt-4 space-y-3">
        {infoItems.map(({ label, value }) => (
          <div key={label}>
            <div className="text-primary text-xs font-medium">{label}</div>
            <div className="text-foreground text-sm">{value}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4">
        <div className="text-primary text-xs font-medium mb-1">External Links</div>
        <div className="text-muted-foreground text-sm">MyAnimeList · AniList · SIMKL</div>
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

export default AnimeInfoSidebar;
