import { useState, useEffect } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";
import { useAuth } from "@/contexts/AuthContext";
import { useList, ListCategory } from "@/contexts/ListContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";


const listOptions: { id: ListCategory; label: string }[] = [
  { id: "plan-to-watch", label: "Plan to Watch" },
  { id: "watching", label: "Watching" },
  { id: "completed", label: "Completed" },
  { id: "dropped", label: "Dropped" },
];

interface Props {
  anime: AnimeEntry;
}

const AnimeHeroBanner = ({ anime }: Props) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toggleFavorite, isFavorited, upsertListEntry, removeFromList, getListEntry, getEpisodesWatched } = useList();

  const favorited = isFavorited(anime.slug);
  const existing = getListEntry(anime.slug);
  const totalEpisodes = anime.episodes || 0;
  const autoEpisodes = Math.max(getEpisodesWatched(anime.slug), existing?.episodesWatched || 0);

  const [status, setStatus] = useState<ListCategory>(existing?.category || "plan-to-watch");
  const [score, setScore] = useState<number>(existing?.score || 0);

  useEffect(() => {
    if (open) {
      setStatus(existing?.category || "plan-to-watch");
      setScore(existing?.score || 0);
    }
  }, [open]); // eslint-disable-line

  const notify = (msg: string, kind: "info" | "muted" = "info") => {
    toast(msg, {
      style: { background: kind === "info" ? "hsla(210, 60%, 55%, 0.85)" : "hsla(0, 0%, 40%, 0.85)", color: "white", border: "none" },
      position: "top-right",
    });
  };

  const handleFavorite = () => {
    if (!isLoggedIn) return notify("Please login first to favorite");
    const added = toggleFavorite(anime.slug, anime.title, anime.cover);
    notify(added ? `${anime.title} added to Favorites` : `${anime.title} removed from Favorites`, added ? "info" : "muted");
  };

  const handleAddClick = () => {
    if (!isLoggedIn) return notify("Please login first to add to list");
    setOpen(true);
  };

  const handleSave = (newStatus: ListCategory, newScore: number) => {
    upsertListEntry(anime.slug, anime.title, anime.cover, {
      category: newStatus,
      episodesWatched: autoEpisodes,
      score: newScore || undefined,
      totalEpisodes,
    });
  };

  const handleRemove = () => {
    removeFromList(anime.slug);
    notify(`${anime.title} removed from your list`, "muted");
    setOpen(false);
  };

  const currentLabel = existing ? listOptions.find((o) => o.id === existing.category)?.label : "Add to List";

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[180px] md:h-[280px] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${anime.cover}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative px-4 md:px-6 -mt-[70px] md:-mt-[90px]">
        {/* Mobile */}
        <div className="flex items-end gap-3 md:hidden">
          <div className={`w-[100px] h-[140px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
          <div className="flex items-center gap-2 mb-2">
            <button onClick={handleAddClick} className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-md hover:opacity-90 transition flex items-center gap-1">
              <Plus size={12} />
              {currentLabel}
            </button>
            <button onClick={handleFavorite} className={`p-2 rounded-md transition ${favorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
              <Heart size={16} fill={favorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex items-end gap-4">
            <div className={`w-[160px] h-[225px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
            <h1 className="font-display text-2xl font-bold mb-2">{anime.title}</h1>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <button onClick={handleAddClick} className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition flex items-center gap-1.5">
              <Plus size={14} />
              {currentLabel}
            </button>
            <button onClick={handleFavorite} className={`p-2 rounded-md transition ${favorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
              <Heart size={18} fill={favorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <h1 className="font-display text-xl font-bold mt-2 md:hidden">{anime.title}</h1>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-card/70 backdrop-blur-xl border-border rounded-md p-0 overflow-hidden">
          <div className="p-4">
            <h3 className="text-foreground font-display text-base font-semibold mb-3">Add to My List</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border/40">
                  <td className="py-2 pr-3 text-muted-foreground w-32">Anime</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-14 rounded bg-gradient-to-br ${anime.cover} flex-shrink-0`} />
                      <span className="text-foreground font-medium">{anime.title}</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="py-2 pr-3 text-muted-foreground">Status</td>
                  <td className="py-2">
                    <select
                      value={status}
                      onChange={(e) => { const v = e.target.value as ListCategory; setStatus(v); handleSave(v, score); }}
                      className="bg-secondary/80 text-foreground text-sm rounded px-3 py-1.5 border border-border focus:outline-none focus:border-primary"
                    >
                      {listOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                    </select>
                  </td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="py-2 pr-3 text-muted-foreground">Episodes Watched</td>
                  <td className="py-2 text-foreground">{autoEpisodes}{totalEpisodes ? ` / ${totalEpisodes}` : ""}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 text-muted-foreground">Score</td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => { setScore(n); handleSave(status, n); }}
                          className={`p-0.5 transition ${n <= score ? "text-score-star" : "text-muted-foreground hover:text-score-star/60"}`}
                          aria-label={`Score ${n}`}
                        >
                          <Star size={16} fill={n <= score ? "currentColor" : "none"} />
                        </button>
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">{score || "—"}/10</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {existing && (
              <div className="pt-3 flex justify-end">
                <button onClick={handleRemove} className="text-destructive text-xs hover:underline">Remove from list</button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimeHeroBanner;
