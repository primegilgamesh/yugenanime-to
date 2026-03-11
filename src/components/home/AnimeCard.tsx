import { Star } from "lucide-react";
import type { AnimeItem } from "@/data/homeData";

interface AnimeCardProps {
  anime: AnimeItem;
  showDubBadge?: boolean;
  showMeta?: boolean;
  showViews?: boolean;
}

const AnimeCard = ({ anime, showDubBadge = false, showMeta = true, showViews = false }: AnimeCardProps) => (
  <div className="group cursor-pointer min-w-0">
    <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-2">
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {showDubBadge && anime.dubbed && (
        <span className="absolute bottom-2 right-2 bg-secondary/90 text-secondary-foreground text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
          🎙 Available in Dub
        </span>
      )}
      {anime.episodes && (
        <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">
          {anime.episodes}
        </span>
      )}
    </div>
    <h3 className="text-foreground text-xs md:text-sm font-medium leading-tight line-clamp-2 mb-0.5">
      {anime.title}
    </h3>
    {showMeta && (
      <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground">
        {anime.season && <span>{anime.season}</span>}
        {anime.score && (
          <span className="flex items-center gap-0.5 text-score-star">
            <Star size={10} fill="currentColor" />
            {anime.score.toFixed(2)}
          </span>
        )}
      </div>
    )}
    {showViews && (
      <div className="text-[10px] text-muted-foreground mt-0.5">
        {anime.views} • {anime.timeAgo}
      </div>
    )}
  </div>
);

export default AnimeCard;
