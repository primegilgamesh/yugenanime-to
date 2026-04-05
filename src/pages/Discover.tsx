import { useState } from "react";
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Star, Headphones } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { allAnime, getGradient } from "@/data/animeData";

const ITEMS_PER_PAGE = 42; // 7 columns x 6 rows on desktop

const sortedAnime = [...allAnime].sort((a, b) => a.title.localeCompare(b.title));

const Discover = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedAnime.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageAnime = sortedAnime.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return (
      <div className="flex items-center justify-center gap-1 mt-8">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-muted-foreground hover:text-foreground text-xs px-2 py-1.5 disabled:opacity-40">Previous</button>
        {pages.map((page, i) =>
          typeof page === "string" ? (
            <span key={`e-${i}`} className="text-muted-foreground text-xs px-1">{page}</span>
          ) : (
            <button key={page} onClick={() => setCurrentPage(page)} className={`text-xs min-w-[28px] h-7 rounded transition-colors ${page === currentPage ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>{page}</button>
          )
        )}
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-muted-foreground hover:text-foreground text-xs px-2 py-1.5 disabled:opacity-40">Next</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-[70px]">
        <TopBar />
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Compass size={18} className="text-primary" />
            <h1 className="text-foreground font-display font-bold text-lg">
              Discover <span className="text-muted-foreground font-normal text-sm">({sortedAnime.length})</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {pageAnime.map((anime, i) => (
              <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(startIdx + i)} aspect-[3/4]`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  {anime.dubbed && (
                    <div className="absolute bottom-8 left-1.5 bg-card/80 text-foreground text-[9px] flex items-center gap-0.5 px-1.5 py-0.5 rounded">
                      <Headphones size={10} /> Available in Dub
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-foreground text-xs font-semibold leading-tight truncate">{anime.title}</p>
                  </div>
                </div>
                <div className="mt-1.5">
                  <p className="text-foreground text-xs font-medium truncate group-hover:text-primary transition-colors">{anime.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {anime.season && <span className="text-muted-foreground text-[10px]">{anime.season}</span>}
                    {anime.score && (
                      <span className="flex items-center gap-0.5 text-score-star text-[10px]">
                        <Star size={9} fill="currentColor" /> {anime.score.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Discover;
