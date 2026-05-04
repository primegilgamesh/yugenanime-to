import { useState, useEffect } from "react";
import { Heart, Plus, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { AnimeEntry } from "@/data/animeData";
import { useAuth } from "@/contexts/AuthContext";
import { useList, ListCategory } from "@/contexts/ListContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import listBg from "@/assets/list-popup-bg.jpg";

const listOptions: { id: ListCategory; label: string }[] = [
  { id: "plan-to-watch", label: "Plan to Watch" },
  { id: "watching", label: "Watching" },
  { id: "completed", label: "Completed" },
  { id: "dropped", label: "Dropped" },
];

interface Props {
  anime: AnimeEntry;
}

const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-2 py-3 border-b border-white/10">
    <label className="text-white/80 text-sm font-medium">{label}</label>
    <div>{children}</div>
  </div>
);

const SelectBox = ({ value, onChange, children, className = "" }: { value: string | number; onChange: (v: string) => void; children: React.ReactNode; className?: string }) => (
  <div className={`relative inline-block ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-black/40 text-white text-sm rounded px-3 py-1.5 pr-8 border border-white/20 hover:border-white/40 focus:outline-none focus:border-primary"
    >
      {children}
    </select>
    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
  </div>
);

const AnimeHeroBanner = ({ anime }: Props) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toggleFavorite, isFavorited, upsertListEntry, removeFromList, getListEntry } = useList();

  const favorited = isFavorited(anime.slug);
  const existing = getListEntry(anime.slug);
  const totalEpisodes = anime.episodes || 0;

  const [status, setStatus] = useState<ListCategory>(existing?.category || "plan-to-watch");
  const [epWatched, setEpWatched] = useState<number>(existing?.episodesWatched || 0);
  const [score, setScore] = useState<string>(existing?.score ? String(existing.score) : "");
  const today = new Date();
  const [startD, setStartD] = useState<{ m: string; d: string; y: string }>(() => {
    if (existing?.startDate) {
      const [y, m, d] = existing.startDate.split("-");
      return { m: String(Number(m)), d: String(Number(d)), y };
    }
    return { m: "", d: "", y: "" };
  });
  const [finishD, setFinishD] = useState<{ m: string; d: string; y: string }>(() => {
    if (existing?.finishDate) {
      const [y, m, d] = existing.finishDate.split("-");
      return { m: String(Number(m)), d: String(Number(d)), y };
    }
    return { m: "", d: "", y: "" };
  });

  useEffect(() => {
    if (open) {
      setStatus(existing?.category || "plan-to-watch");
      setEpWatched(existing?.episodesWatched || 0);
      setScore(existing?.score ? String(existing.score) : "");
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

  const handleSubmit = () => {
    const formatDate = (d: { m: string; d: string; y: string }) => {
      if (!d.m || !d.d || !d.y) return undefined;
      return `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
    };
    upsertListEntry(anime.slug, anime.title, anime.cover, {
      category: status,
      episodesWatched: epWatched,
      score: score ? Number(score) : undefined,
      startDate: formatDate(startD),
      finishDate: formatDate(finishD),
      totalEpisodes,
    });
    notify(`${anime.title} saved to ${listOptions.find((o) => o.id === status)?.label}`);
    setOpen(false);
  };

  const handleRemove = () => {
    removeFromList(anime.slug);
    notify(`${anime.title} removed from your list`, "muted");
    setOpen(false);
  };

  const insertToday = (setter: typeof setStartD) =>
    setter({ m: String(today.getMonth() + 1), d: String(today.getDate()), y: String(today.getFullYear()) });

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
        <DialogContent className="max-w-2xl p-0 border-none overflow-hidden bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <img src={listBg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-semibold flex items-center gap-2">
                  Add Anime to My List <span className="text-pink-400 text-xs font-normal">* Your list is public by default.</span>
                </DialogTitle>
              </DialogHeader>

              <div className="mt-3">
                <Field label="Anime Title">
                  <span className="text-white text-sm">{anime.title}</span>
                </Field>

                <Field label="Status">
                  <SelectBox value={status} onChange={(v) => setStatus(v as ListCategory)}>
                    {listOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </SelectBox>
                </Field>

                <Field label="Episodes Watched">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={totalEpisodes || undefined}
                      value={epWatched || ""}
                      onChange={(e) => setEpWatched(Math.max(0, Math.min(totalEpisodes || 9999, Number(e.target.value) || 0)))}
                      className="w-20 bg-black/40 text-white text-sm rounded px-2 py-1.5 border border-white/20 focus:outline-none focus:border-primary"
                      placeholder="0"
                    />
                    <button onClick={() => setEpWatched((n) => Math.min(totalEpisodes || 9999, n + 1))} className="text-white/70 hover:text-white">+</button>
                    <span className="text-white/60 text-sm">/ {totalEpisodes || "?"}</span>
                  </div>
                </Field>

                <Field label="Your Score">
                  <SelectBox value={score} onChange={setScore}>
                    <option value="">Select score</option>
                    {Array.from({ length: 10 }, (_, i) => 10 - i).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </SelectBox>
                </Field>

                <Field label="Start Date">
                  <div className="flex flex-wrap items-center gap-2">
                    <SelectBox value={startD.m} onChange={(v) => setStartD((s) => ({ ...s, m: v }))}>
                      <option value="">Month</option>
                      {months.slice(1).map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                    </SelectBox>
                    <SelectBox value={startD.d} onChange={(v) => setStartD((s) => ({ ...s, d: v }))}>
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                    </SelectBox>
                    <SelectBox value={startD.y} onChange={(v) => setStartD((s) => ({ ...s, y: v }))}>
                      <option value="">Year</option>
                      {Array.from({ length: 40 }, (_, i) => today.getFullYear() - i).map((y) => <option key={y} value={y}>{y}</option>)}
                    </SelectBox>
                    <button onClick={() => insertToday(setStartD)} className="text-pink-400 text-xs hover:underline">Insert Today</button>
                    <label className="flex items-center gap-1 text-xs text-white/70 cursor-pointer">
                      <input type="checkbox" checked={!startD.m && !startD.d && !startD.y} onChange={() => setStartD({ m: "", d: "", y: "" })} className="accent-primary" />
                      Unknown Date
                    </label>
                  </div>
                </Field>

                <Field label="Finish Date">
                  <div className="flex flex-wrap items-center gap-2">
                    <SelectBox value={finishD.m} onChange={(v) => setFinishD((s) => ({ ...s, m: v }))}>
                      <option value="">Month</option>
                      {months.slice(1).map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                    </SelectBox>
                    <SelectBox value={finishD.d} onChange={(v) => setFinishD((s) => ({ ...s, d: v }))}>
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                    </SelectBox>
                    <SelectBox value={finishD.y} onChange={(v) => setFinishD((s) => ({ ...s, y: v }))}>
                      <option value="">Year</option>
                      {Array.from({ length: 40 }, (_, i) => today.getFullYear() - i).map((y) => <option key={y} value={y}>{y}</option>)}
                    </SelectBox>
                    <button onClick={() => insertToday(setFinishD)} className="text-pink-400 text-xs hover:underline">Insert Today</button>
                    <label className="flex items-center gap-1 text-xs text-white/70 cursor-pointer">
                      <input type="checkbox" checked={!finishD.m && !finishD.d && !finishD.y} onChange={() => setFinishD({ m: "", d: "", y: "" })} className="accent-primary" />
                      Unknown Date
                    </label>
                  </div>
                </Field>

                <div className="text-center py-3 text-white/60 text-sm cursor-default">Show Advanced ⌄</div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  {existing ? (
                    <Button variant="ghost" onClick={handleRemove} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Remove from list</Button>
                  ) : <span />}
                  <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:opacity-90 px-8">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimeHeroBanner;
