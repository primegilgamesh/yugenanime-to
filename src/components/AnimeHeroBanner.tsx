import { useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";
import { useAuth } from "@/contexts/AuthContext";
import { useList, ListCategory } from "@/contexts/ListContext";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toggleFavorite, isFavorited, addToList, getListCategory } = useList();

  const favorited = isFavorited(anime.slug);
  const currentCategory = getListCategory(anime.slug);

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
    const added = toggleFavorite(anime.slug, anime.title, anime.cover);
    toast(added ? `${anime.title} added to Favorites` : `${anime.title} removed from Favorites`, {
      style: { background: added ? "hsla(210, 60%, 55%, 0.85)" : "hsla(0, 0%, 40%, 0.85)", color: "white", border: "none" },
      position: "top-right",
    });
  };

  const handleAddToList = (category: ListCategory) => {
    addToList(anime.slug, anime.title, anime.cover, category);
    setDropdownOpen(false);
    const label = listOptions.find((o) => o.id === category)?.label || category;
    toast(`${anime.title} added to ${label}`, {
      style: { background: "hsla(210, 60%, 55%, 0.85)", color: "white", border: "none" },
      position: "top-right",
    });
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      handleAuthAction("add to list");
      return;
    }
    setDropdownOpen((v) => !v);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-[180px] md:h-[280px]">
        <div className={`absolute inset-0 bg-gradient-to-br ${anime.cover}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative px-4 md:px-6 -mt-[70px] md:-mt-[90px]">
        {/* Mobile layout */}
        <div className="flex items-end gap-3 md:hidden">
          <div className={`w-[100px] h-[140px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <button onClick={handleAddClick} className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-md hover:opacity-90 transition flex items-center gap-1">
                {currentCategory ? listOptions.find(o => o.id === currentCategory)?.label : "Add to List"}
                {isLoggedIn && <ChevronDown size={12} />}
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-md shadow-lg z-20 min-w-[140px]">
                    {listOptions.map((opt) => (
                      <button key={opt.id} onClick={() => handleAddToList(opt.id)} className={`w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors ${currentCategory === opt.id ? "text-primary font-semibold" : "text-foreground"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button onClick={handleFavorite} className={`p-2 rounded-md transition ${favorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
              <Heart size={16} fill={favorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="flex items-end gap-4">
            <div className={`w-[160px] h-[225px] rounded-md bg-gradient-to-br ${anime.cover} border-2 border-background shadow-lg flex-shrink-0`} />
            <h1 className="font-display text-2xl font-bold mb-2">{anime.title}</h1>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="relative">
              <button onClick={handleAddClick} className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition flex items-center gap-1">
                {currentCategory ? listOptions.find(o => o.id === currentCategory)?.label : "Add to List"}
                {isLoggedIn && <ChevronDown size={14} />}
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-md shadow-lg z-20 min-w-[160px]">
                    {listOptions.map((opt) => (
                      <button key={opt.id} onClick={() => handleAddToList(opt.id)} className={`w-full text-left px-3 py-2.5 text-sm hover:bg-secondary transition-colors ${currentCategory === opt.id ? "text-primary font-semibold" : "text-foreground"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button onClick={handleFavorite} className={`p-2 rounded-md transition ${favorited ? "bg-heart/20 text-heart" : "bg-muted text-muted-foreground"}`}>
              <Heart size={18} fill={favorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <h1 className="font-display text-xl font-bold mt-2 md:hidden">{anime.title}</h1>
      </div>
    </div>
  );
};

export default AnimeHeroBanner;
