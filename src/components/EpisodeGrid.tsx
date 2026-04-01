import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, RotateCcw, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { EpisodeInfo } from "@/data/animeData";

const EPISODES_PER_PAGE = 48;

const defaultEpisodeNames: Record<number, string> = {
  1: "The Journey's End", 2: "It Didn't Have to Be Magic...", 3: "Killing Magic",
  4: "The Land Where Souls Rest", 5: "Phantoms of the Dead", 6: "The Hero of the Village",
  7: "Like a Fairy Tale", 8: "Frieren the Slayer", 9: "Aura the Guillotine",
  10: "A Powerful Mage", 11: "Winter in the Northern Lands", 12: "A Real Hero",
};

interface Props {
  episodes?: number;
  title?: string;
  slug?: string;
  episodeList?: EpisodeInfo[];
}

const EpisodeGrid = ({ episodes: episodeCount = 12, title: _title = "Anime", slug = "", episodeList }: Props) => {
  const [filter, setFilter] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const episodes = episodeList
    ? episodeList.map((ep) => ({
        num: ep.num,
        title: ep.title,
        views: ep.views || `${Math.floor(Math.random() * 40 + 10)}K`,
        time: ep.timeAgo || `${Math.floor(Math.random() * 7 + 1)} months ago`,
        type: ep.type || "normal",
      }))
    : Array.from({ length: episodeCount }, (_, i) => ({
        num: i + 1,
        title: defaultEpisodeNames[i + 1] || `Episode ${i + 1}`,
        views: `${Math.floor(Math.random() * 40 + 10)}K`,
        time: `${Math.floor(Math.random() * 7 + 1)} months ago`,
        type: "normal" as const,
      }));

  const sortedEpisodes = sortOrder === "desc" ? [...episodes].reverse() : episodes;

  const isFiltering = filter.length > 0;
  const filteredEpisodes = isFiltering
    ? sortedEpisodes.filter((ep) => ep.num.toString().includes(filter))
    : sortedEpisodes;

  const totalPages = Math.ceil(sortedEpisodes.length / EPISODES_PER_PAGE);
  const displayedEpisodes = isFiltering
    ? filteredEpisodes
    : filteredEpisodes.slice(activePage * EPISODES_PER_PAGE, (activePage + 1) * EPISODES_PER_PAGE);

  const renderPagination = () => {
    if (totalPages <= 1 || isFiltering) return null;

    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (activePage > 2) pages.push("...");
      const start = Math.max(1, activePage - 1);
      const end = Math.min(totalPages - 2, activePage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (activePage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1);
    }

    return (
      <div className="flex items-center justify-center gap-1.5 mt-6">
        <button
          onClick={() => setActivePage(Math.max(0, activePage - 1))}
          disabled={activePage === 0}
          className="text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="text-muted-foreground text-xs px-1">...</span>
          ) : (
            <button
              key={p}
              onClick={() => setActivePage(p as number)}
              className={`text-xs w-7 h-7 rounded-md font-medium transition-colors ${
                activePage === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {(p as number) + 1}
            </button>
          )
        )}
        <button
          onClick={() => setActivePage(Math.min(totalPages - 1, activePage + 1))}
          disabled={activePage === totalPages - 1}
          className="text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Header with Sort and Jump to episode */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-foreground font-display font-semibold text-base">Watch</h3>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors bg-secondary px-2.5 py-1.5 rounded-md"
          >
            Sort by <Star size={10} className="text-score-star" fill="currentColor" />
            {sortOrder === "desc" && <span>↓</span>}
          </button>
        </div>
        <input
          placeholder="Jump to episode..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-secondary text-xs text-foreground placeholder:text-muted-foreground px-3 py-1.5 rounded-md outline-none w-36"
        />
      </div>

      {/* Episode Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayedEpisodes.map((ep) => (
          <Link
            to={`/anime/${slug}/watch/${ep.num}`}
            key={ep.num}
            className="group cursor-pointer block"
          >
            <div className="relative bg-secondary rounded-md overflow-hidden aspect-video mb-1.5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted/30 flex items-center justify-center">
                <span className="text-muted-foreground text-2xl font-display font-bold opacity-30">{ep.num}</span>
              </div>
              <div className="absolute bottom-1 right-1 bg-background/80 text-foreground text-[10px] px-1.5 py-0.5 rounded">24:00</div>
              {ep.type === "recap" && (
                <div className="absolute top-1 left-1 bg-amber-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <RotateCcw size={8} /> Recap
                </div>
              )}
              {ep.type === "filler" && (
                <div className="absolute top-1 left-1 bg-violet-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <AlertTriangle size={8} /> Filler
                </div>
              )}
            </div>
            <div className="text-foreground text-[11px] font-medium group-hover:text-primary transition-colors leading-tight line-clamp-2">
              {ep.num} : {ep.title}
            </div>
            <div className="text-muted-foreground text-[10px] mt-0.5">
              {ep.views} views · {ep.time}
            </div>
          </Link>
        ))}
        {displayedEpisodes.length === 0 && (
          <div className="col-span-full text-muted-foreground text-sm text-center py-8">No episodes found</div>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default EpisodeGrid;
