import { Star, Heart } from "lucide-react";

const infoItems = [
  { label: "Romaji", value: "Sousou no Frieren" },
  { label: "English", value: "Frieren: Beyond Journey's End" },
  { label: "Native", value: "葬送のフリーレン" },
  { label: "Synonyms", value: "Frieren at the Funeral" },
  { label: "Format", value: "TV" },
  { label: "Studios", value: "Madhouse" },
  { label: "Episodes", value: "28" },
  { label: "Episodes (Dub)", value: "28" },
  { label: "Duration", value: "24 min per ep" },
  { label: "Status", value: "Finished Airing" },
  { label: "Premiered", value: "Fall 2023" },
  { label: "Genres", value: "Adventure, Drama, Fantasy" },
];

const AnimeInfoSidebar = () => (
  <div className="w-full space-y-4">
    <div className="flex items-center gap-2">
      <Star size={16} className="text-score-star" fill="currentColor" />
      <span className="text-foreground font-semibold text-sm">9.17 Average Score</span>
    </div>
    <div className="flex items-center gap-2">
      <Heart size={16} className="text-heart" fill="currentColor" />
      <span className="text-foreground text-sm">1,217 Favorites</span>
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
    <button className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition">
      Write a Review
    </button>
  </div>
);

export default AnimeInfoSidebar;
