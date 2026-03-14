import { useState } from "react";

const episodeNames: Record<number, string> = {
  1: "The Journey's End", 2: "It Didn't Have to Be Magic...", 3: "Killing Magic",
  4: "The Land Where Souls Rest", 5: "Phantoms of the Dead", 6: "The Hero of the Village",
  7: "Like a Fairy Tale", 8: "Frieren the Slayer", 9: "Aura the Guillotine",
  10: "A Powerful Mage", 11: "Winter in the Northern Lands", 12: "A Real Hero",
  13: "Aversion to One's Own Kind", 14: "Privilege of the Young", 15: "Smells Like Trouble",
  16: "Long-Lived Friends", 17: "Take Care", 18: "First-Class Mage Exam",
  19: "Well-Laid Plans", 20: "Necessary Killing", 21: "The World of Magic",
  22: "Future Enemies", 23: "Conquering the Labyrinth", 24: "Perfect Replicas",
  25: "A Fatal Vulnerability", 26: "The Height of Magic", 27: "An Era of Humans",
  28: "Sousou no Frieren",
};

interface Props {
  episodes?: number;
  title?: string;
}

const EpisodeGrid = ({ episodes: episodeCount = 12, title = "Anime" }: Props) => {
  const [filter, setFilter] = useState("");

  const episodes = Array.from({ length: episodeCount }, (_, i) => ({
    num: i + 1,
    title: episodeNames[i + 1] || `Episode ${i + 1}`,
    views: `${Math.floor(Math.random() * 40 + 10)}K`,
    time: `${Math.floor(Math.random() * 7 + 1)} months ago`,
  }));

  const filteredEpisodes = filter
    ? episodes.filter((ep) => ep.num.toString().includes(filter))
    : episodes;

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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredEpisodes.map((ep) => (
          <div key={ep.num} className="group cursor-pointer">
            <div className="relative bg-secondary rounded-md overflow-hidden aspect-video mb-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted/30 flex items-center justify-center">
                <span className="text-muted-foreground text-2xl font-display font-bold opacity-30">{ep.num}</span>
              </div>
              <div className="absolute bottom-1 right-1 bg-background/80 text-foreground text-[10px] px-1.5 py-0.5 rounded">24:00</div>
            </div>
            <div className="text-foreground text-xs font-medium group-hover:text-primary transition-colors leading-tight">
              {ep.num}: {ep.title}
            </div>
            <div className="text-muted-foreground text-[10px] mt-0.5">
              {ep.views} views · {ep.time}
            </div>
          </div>
        ))}
        {filteredEpisodes.length === 0 && (
          <div className="col-span-full text-muted-foreground text-sm text-center py-8">No episodes found</div>
        )}
      </div>
    </div>
  );
};

export default EpisodeGrid;
