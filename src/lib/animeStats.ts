// Aggregates list/favorite data across all users in localStorage for a given slug.
export interface AnimeAggregate {
  watching: number;
  plan: number;
  completed: number;
  dropped: number;
  favorites: number;
  scoreSum: number;
  scoreCount: number;
}

export const aggregateAnimeStats = (slug: string): AnimeAggregate => {
  const a: AnimeAggregate = { watching: 0, plan: 0, completed: 0, dropped: 0, favorites: 0, scoreSum: 0, scoreCount: 0 };
  if (!slug) return a;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || "";
      if (key.startsWith("yugen_list_")) {
        const items: Array<{ slug: string; category: string; score?: number }> = JSON.parse(localStorage.getItem(key) || "[]");
        const item = items.find((it) => it.slug === slug);
        if (!item) continue;
        if (item.category === "watching") a.watching++;
        else if (item.category === "plan-to-watch") a.plan++;
        else if (item.category === "completed") a.completed++;
        else if (item.category === "dropped") a.dropped++;
        if (typeof item.score === "number" && item.score > 0) {
          a.scoreSum += item.score;
          a.scoreCount++;
        }
      } else if (key.startsWith("yugen_favs_")) {
        const favs: Array<{ slug: string }> = JSON.parse(localStorage.getItem(key) || "[]");
        if (favs.find((f) => f.slug === slug)) a.favorites++;
      }
    }
  } catch {}
  return a;
};

export const averageUserScore = (slug: string): number | null => {
  const a = aggregateAnimeStats(slug);
  return a.scoreCount > 0 ? a.scoreSum / a.scoreCount : null;
};
