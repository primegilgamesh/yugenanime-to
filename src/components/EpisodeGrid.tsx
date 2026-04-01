import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { EpisodeInfo } from "@/data/animeData";

const EPISODES_PER_PAGE = 28;

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

const EpisodeGrid = ({ episodes: episodeCount = 12, title = "Anime", slug = "", episodeList }: Props) => {
  const [filter, setFilter] = useState("");
  const [activePage, setActivePage] = useState(0);

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

  const isFiltering = filter.length > 0;
  const filteredEpisodes = isFiltering
    ? episodes.filter((ep) => ep.num.toString().includes(filter))
    : episodes;

  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);
  const displayedEpisodes = isFiltering
    ? filteredEpisodes
    : filteredEpisodes.slice(activePage * EPISODES_PER_PAGE, (activePage + 1) * EPISODES_PER_PAGE);

  const getPageLabel = (pageIndex: number) => {
    const start = pageIndex * EPISODES_PER_PAGE + 1;
    const end = Math.min((pageIndex + 1) * EPISODES_PER_PAGE, episodes.length);
    return `${start}-${end}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-display font-semibold text-base">Watch</h3>
        <input
          placeholder="Jump to episode..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-secondary text-xs text-foreground placeholder:text-muted-foreground px-3 py-1.5 rounded-md outline-none w-36"
        />
      </div>

      {totalPages > 1 && !isFiltering && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                activePage === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {getPageLabel(i)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
        {displayedEpisodes.map((ep) => (
          <Link
            to={`/anime/${slug}/watch/${ep.num}`}
            key={ep.num}
            className="group cursor-pointer block"
          >
            <div className="relative bg-secondary rounded-md overflow-hidden aspect-video mb-2">
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
            <div className="text-foreground text-xs font-medium group-hover:text-primary transition-colors leading-tight">
              {ep.num}: {ep.title}
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
    </div>
  );
};

export default EpisodeGrid;
