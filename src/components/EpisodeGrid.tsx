const episodes = [
  { num: 1, title: "The Journey's End", views: "172K", time: "7 months ago" },
  { num: 2, title: "It Didn't Have to Be Magic...", views: "47.3K", time: "7 months ago" },
  { num: 3, title: "Killing Magic", views: "40.9K", time: "7 months ago" },
  { num: 4, title: "The Land Where Souls Rest", views: "38.2K", time: "7 months ago" },
  { num: 5, title: "Phantoms of the Dead", views: "35.4K", time: "7 months ago" },
  { num: 6, title: "The Hero of the Village", views: "32.6K", time: "7 months ago" },
  { num: 7, title: "Like a Fairy Tale", views: "31.8K", time: "7 months ago" },
  { num: 8, title: "Frieren the Slayer", views: "30.3K", time: "6 months ago" },
  { num: 9, title: "Aura the Guillotine", views: "31.4K", time: "6 months ago" },
  { num: 10, title: "A Powerful Mage", views: "33K", time: "5 months ago" },
  { num: 11, title: "Winter in the Northern Lands", views: "31K", time: "6 months ago" },
  { num: 12, title: "A Real Hero", views: "35.1K", time: "5 months ago" },
  { num: 13, title: "Aversion to One's Own Kind", views: "40K", time: "5 months ago" },
  { num: 14, title: "Privilege of the Young", views: "30.3K", time: "5 months ago" },
  { num: 15, title: "Smells Like Trouble", views: "38.0K", time: "3 months ago" },
  { num: 16, title: "Long-Lived Friends", views: "30.5K", time: "5 months ago" },
  { num: 17, title: "Take Care", views: "37.6K", time: "4 months ago" },
  { num: 18, title: "First-Class Mage Exam", views: "25.1K", time: "4 months ago" },
  { num: 19, title: "Well-Laid Plans", views: "23K", time: "4 months ago" },
  { num: 20, title: "Necessary Killing", views: "24.3K", time: "3 months ago" },
  { num: 21, title: "The World of Magic", views: "27.4K", time: "3 months ago" },
  { num: 22, title: "Future Enemies", views: "20K", time: "3 months ago" },
  { num: 23, title: "Conquering the Labyrinth", views: "25.3K", time: "3 months ago" },
  { num: 24, title: "Perfect Replicas", views: "25.6K", time: "2 months ago" },
  { num: 25, title: "A Fatal Vulnerability", views: "20K", time: "2 months ago" },
  { num: 26, title: "The Height of Magic", views: "25.5K", time: "2 months ago" },
  { num: 27, title: "An Era of Humans", views: "30.5K", time: "2 months ago" },
  { num: 28, title: "Sousou no Frieren", views: "21.4K", time: "about a month ago" },
];

const EpisodeGrid = () => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-foreground font-display font-semibold text-base">Watch</h3>
      <div className="flex items-center gap-3">
        <span className="text-primary text-xs cursor-pointer hover:underline">Sort by ▾</span>
        <input
          placeholder="Jump to episode..."
          className="bg-secondary text-xs text-foreground placeholder:text-muted-foreground px-3 py-1.5 rounded-md outline-none w-36"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {episodes.map((ep) => (
        <div key={ep.num} className="group cursor-pointer">
          <div className="relative bg-secondary rounded-md overflow-hidden aspect-video mb-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted/30 flex items-center justify-center">
              <span className="text-muted-foreground text-2xl font-display font-bold opacity-30">
                {ep.num}
              </span>
            </div>
            <div className="absolute bottom-1 right-1 bg-background/80 text-foreground text-[10px] px-1.5 py-0.5 rounded">
              24:00
            </div>
          </div>
          <div className="text-foreground text-xs font-medium group-hover:text-primary transition-colors leading-tight">
            {ep.num} : {ep.title}
          </div>
          <div className="text-muted-foreground text-[10px] mt-0.5">
            {ep.views} views · {ep.time}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EpisodeGrid;
