import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  anime: AnimeEntry;
}

const AnimeHeroBanner = ({ anime }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleAuthAction = (action: string) => {
    if (!isLoggedIn) {
      toast("Please login first to " + action, {
        style: { background: "hsla(210, 60%, 55%, 0.85)", color: "white", border: "none" },
        position: "top-right",
      });
    }
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      toast("Please login first to favorite", {
        style: { background: "hsla(210, 60%, 55%, 0.85)", color: "white", border: "none" },
        position: "top-right",
      });
      return;
    }
    setIsFavorited((v) => !v);
  };

  return (
    <div className="relative w-full h-[240px] md:h-[340px] overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${anime.cover}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
        <div className="flex items-end gap-3 mb-2 md:mb-0">
          <div className={`w-[80px] h-[110px] md:w-[100px] md:h-[140px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 md:hidden mb-2 justify-end">
              <button onClick={() => handleAuthAction("add to list")} className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-md hover:opacity-90 transition">Add to List</button>
              <button onClick={handleFavorite} className={`p-2 rounded-md transition ${isFavorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">{anime.title}</h1>
            <p className="text-sm text-secondary-foreground max-w-2xl leading-relaxed mb-4 hidden md:block">
              {anime.synopsis?.slice(0, 200)}...
            </p>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => handleAuthAction("add to list")} className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition">Add to List</button>
              <button onClick={handleFavorite} className={`p-2 rounded-md transition ${isFavorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
                <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHeroBanner;
