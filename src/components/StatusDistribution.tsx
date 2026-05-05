import { useEffect, useState } from "react";

interface Props {
  slug?: string;
}

interface Counts {
  watching: number;
  plan: number;
  completed: number;
  hold: number;
  dropped: number;
  favorites: number;
}

const computeCounts = (slug?: string): Counts => {
  const counts: Counts = { watching: 0, plan: 0, completed: 0, hold: 0, dropped: 0, favorites: 0 };
  if (!slug) return counts;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || "";
      if (key.startsWith("yugen_list_")) {
        const items: Array<{ slug: string; category: string }> = JSON.parse(localStorage.getItem(key) || "[]");
        const item = items.find((it) => it.slug === slug);
        if (!item) continue;
        if (item.category === "watching") counts.watching++;
        else if (item.category === "plan-to-watch") counts.plan++;
        else if (item.category === "completed") counts.completed++;
        else if (item.category === "dropped") counts.dropped++;
      } else if (key.startsWith("yugen_favs_")) {
        const favs: Array<{ slug: string }> = JSON.parse(localStorage.getItem(key) || "[]");
        if (favs.find((f) => f.slug === slug)) counts.favorites++;
      }
    }
  } catch {}
  return counts;
};

const StatusDistribution = ({ slug }: Props) => {
  const [counts, setCounts] = useState<Counts>(() => computeCounts(slug));

  useEffect(() => {
    setCounts(computeCounts(slug));
    const onStorage = () => setCounts(computeCounts(slug));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [slug]);

  const rows = [
    { label: "Watching", count: counts.watching, color: "bg-status-watching" },
    { label: "Plan to Watch", count: counts.plan, color: "bg-status-plan" },
    { label: "Completed", count: counts.completed, color: "bg-status-completed" },
    { label: "Favorites", count: counts.favorites, color: "bg-heart" },
    { label: "Dropped", count: counts.dropped, color: "bg-status-dropped" },
  ];
  const total = rows.reduce((s, r) => s + r.count, 0) || 1;

  return (
    <div className="space-y-3">
      <h3 className="text-foreground font-display font-semibold text-base">Status Distribution</h3>
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-3 min-w-max">
          {rows.map((s) => {
            const pct = Math.round((s.count / total) * 100);
            return (
              <div key={s.label} className="bg-card border border-border rounded-md px-4 py-2.5 flex flex-col gap-0.5 min-w-[140px]">
                <div className="flex items-center gap-2">
                  <span className={`${s.color} w-2 h-2 rounded-full`} />
                  <span className="text-foreground text-sm font-semibold">{s.label}</span>
                </div>
                <span className="text-muted-foreground text-xs">{s.count} {s.count === 1 ? "user" : "users"} · {pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden flex bg-muted">
        {rows.map((s) => {
          const pct = (s.count / total) * 100;
          if (pct <= 0) return null;
          return <div key={s.label} className={`${s.color} h-full`} style={{ width: `${pct}%` }} />;
        })}
      </div>
    </div>
  );
};

export default StatusDistribution;
