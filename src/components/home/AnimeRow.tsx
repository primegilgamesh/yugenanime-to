import type { ReactNode } from "react";
import type { AnimeItem } from "@/data/homeData";
import AnimeCard from "./AnimeCard";
import SectionHeader from "./SectionHeader";

interface AnimeRowProps {
  icon: ReactNode;
  title: string;
  items: AnimeItem[];
  showDubBadge?: boolean;
  showViews?: boolean;
  subtitle?: string;
  columns?: number;
}

const AnimeRow = ({ icon, title, items, showDubBadge = false, showViews = false, subtitle, columns = 6 }: AnimeRowProps) => {
  const gridCols = columns === 4
    ? "grid-cols-2 md:grid-cols-4"
    : columns === 5
    ? "grid-cols-2 md:grid-cols-5"
    : "grid-cols-2 md:grid-cols-6";

  return (
    <section>
      <SectionHeader icon={icon} title={title} onViewAll={() => {}} />
      {subtitle && (
        <p className="text-muted-foreground text-xs mb-3 -mt-2">{subtitle}</p>
      )}
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {items.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            showDubBadge={showDubBadge}
            showViews={showViews}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimeRow;
