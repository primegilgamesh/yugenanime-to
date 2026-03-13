import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import HeroBanner from "@/components/HeroBanner";
import AnimeTabs from "@/components/AnimeTabs";
import AnimeInfoSidebar from "@/components/AnimeInfoSidebar";
import MobileAnimeInfo from "@/components/MobileAnimeInfo";
import MobileDescription from "@/components/MobileDescription";
import StatusDistribution from "@/components/StatusDistribution";
import EpisodeGrid from "@/components/EpisodeGrid";
import ReviewsSection from "@/components/ReviewsSection";
import { allAnime } from "@/data/animeData";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("Overview");

  const anime = allAnime.find((a) => a.slug === slug);
  const title = anime?.title ?? slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Anime";

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-[70px]">
        <TopBar />
        <HeroBanner />
        <AnimeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="py-4">
          <MobileAnimeInfo title={title} />
        </div>

        <div className="flex gap-6 p-4 md:p-6">
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <AnimeInfoSidebar title={title} />
          </div>
          <div className="flex-1 min-w-0 space-y-6 md:space-y-8">
            {activeTab === "Overview" && (
              <>
                <MobileDescription />
                <div className="hidden md:block space-y-2">
                  <h3 className="text-foreground font-display font-semibold text-base">Synopsis</h3>
                  <p className="text-secondary-foreground text-sm leading-relaxed">
                    The story of {title} follows the adventures and journeys of its protagonists through
                    a world filled with challenges, friendships, and unforgettable moments. Through trials
                    and triumphs, the characters grow and discover what truly matters in life.
                  </p>
                </div>
                <StatusDistribution />
              </>
            )}
            {activeTab === "Watch" && <EpisodeGrid />}
            {activeTab === "Reviews" && <ReviewsSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
