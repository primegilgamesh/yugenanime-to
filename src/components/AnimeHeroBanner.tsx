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
    <div className="relative w-full overflow-hidden">
      {/* Banner area */}
      <div className="relative w-full h-[180px] md:h-[280px]">
        <div className={`absolute inset-0 bg-gradient-to-br ${anime.cover}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content overlaid */}
      <div className="relative px-4 md:px-6 -mt-[70px] md:-mt-[90px]">
        {/* Mobile layout: image + buttons side by side */}
        <div className="flex items-end gap-3 md:hidden">
          <div className={`w-[100px] h-[140px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => handleAuthAction("add to list")} className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-md hover:opacity-90 transition">
              Add to List
            </button>
            <button onClick={handleFavorite} className={`p-2 rounded-md transition ${isFavorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
              <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Desktop layout: image with title beside it, buttons below */}
        <div className="hidden md:block">
          <div className="flex items-end gap-4">
            <div className={`w-[130px] h-[185px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
            <h1 className="font-display text-2xl font-bold mb-2">{anime.title}</h1>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <button onClick={() => handleAuthAction("add to list")} className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition">
              Add to List
            </button>
            <button onClick={handleFavorite} className={`p-2 rounded-md transition ${isFavorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
              <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Mobile title */}
        <h1 className="font-display text-xl font-bold mt-2 md:hidden">{anime.title}</h1>
      </div>
    </div>
  );
};

export default AnimeHeroBanner;
