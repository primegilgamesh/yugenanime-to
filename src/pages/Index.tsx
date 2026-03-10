import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import HeroBanner from "@/components/HeroBanner";
import AnimeTabs from "@/components/AnimeTabs";
import AnimeInfoSidebar from "@/components/AnimeInfoSidebar";
import StatusDistribution from "@/components/StatusDistribution";
import EpisodeGrid from "@/components/EpisodeGrid";
import ReviewsSection from "@/components/ReviewsSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[70px]">
        <TopBar />
        <HeroBanner />
        <AnimeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex gap-6 p-6">
          {/* Left info sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <AnimeInfoSidebar />
          </div>
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-8">
            {activeTab === "Overview" && (
              <>
                <StatusDistribution />
                <div className="space-y-2">
                  <h3 className="text-foreground font-display font-semibold text-base">Synopsis</h3>
                  <p className="text-secondary-foreground text-sm leading-relaxed">
                    During their decade-long quest to defeat the Demon King, the members of the hero's party—Himmel
                    himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds
                    through adventures and battles, creating unforgettable precious memories. However, the
                    millennia-old Frieren struggles to understand the human concept of time, and before she knows it,
                    her companions begin to pass away one by one. When Himmel dies, Frieren is struck by grief and
                    regret, realizing that she barely knew anything about those she calls friends. Determined to
                    understand humanity better, Frieren embarks on a new journey, retracing the steps of their
                    original quest while seeking out new companions along the way.
                  </p>
                </div>
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
