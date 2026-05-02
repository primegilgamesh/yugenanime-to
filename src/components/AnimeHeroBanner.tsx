import { useState, useRef, useEffect } from "react";
import { Heart, Plus, Check } from "lucide-react";
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
  const [tableOpen, setTableOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toggleFavorite, isFavorited, addToList, removeFromList, getListCategory } = useList();
  const popoverRef = useRef<HTMLDivElement>(null);

  const favorited = isFavorited(anime.slug);
  const currentCategory = getListCategory(anime.slug);

  // Close on outside click
  useEffect(() => {
    if (!tableOpen) return;
    const onClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setTableOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [tableOpen]);

  const notify = (msg: string, kind: "info" | "muted" = "info") => {
    toast(msg, {
      style: {
        background: kind === "info" ? "hsla(210, 60%, 55%, 0.85)" : "hsla(0, 0%, 40%, 0.85)",
        color: "white",
        border: "none",
      },
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
    setTableOpen((v) => !v);
  };

  const handleToggleCategory = (cat: ListCategory) => {
    if (currentCategory === cat) {
      removeFromList(anime.slug);
      notify(`${anime.title} removed from ${listOptions.find((o) => o.id === cat)?.label}`, "muted");
    } else {
      addToList(anime.slug, anime.title, anime.cover, cat, anime.episodes);
      notify(`${anime.title} added to ${listOptions.find((o) => o.id === cat)?.label}`);
    }
  };

  const renderListPopover = (size: "sm" | "md") => (
    tableOpen && (
      <div
        ref={popoverRef}
        className={`absolute top-full left-0 mt-1 bg-card border border-border rounded-md shadow-xl z-30 ${size === "sm" ? "min-w-[180px]" : "min-w-[220px]"}`}
      >
        <div className="px-3 py-2 border-b border-border text-foreground text-xs font-semibold">Add to list</div>
        <table className="w-full">
          <tbody>
            {listOptions.map((opt) => {
              const checked = currentCategory === opt.id;
              return (
                <tr
                  key={opt.id}
                  onClick={() => handleToggleCategory(opt.id)}
                  className="cursor-pointer hover:bg-secondary transition-colors"
                >
                  <td className="px-3 py-2 w-6">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                      {checked && <Check size={12} className="text-primary-foreground" />}
                    </div>
                  </td>
                  <td className={`py-2 pr-3 text-sm ${checked ? "text-primary font-semibold" : "text-foreground"}`}>{opt.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );

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
                <Plus size={12} />
                {currentCategory ? listOptions.find((o) => o.id === currentCategory)?.label : "Add to List"}
              </button>
              {renderListPopover("sm")}
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
              <button onClick={handleAddClick} className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition flex items-center gap-1.5">
                <Plus size={14} />
                {currentCategory ? listOptions.find((o) => o.id === currentCategory)?.label : "Add to List"}
              </button>
              {renderListPopover("md")}
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
