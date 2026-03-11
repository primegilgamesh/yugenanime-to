import { useState } from "react";
import { Clock } from "lucide-react";
import { recentlyReleased } from "@/data/homeData";
import AnimeCard from "./AnimeCard";
import SectionHeader from "./SectionHeader";

const tabs = ["All", "SUB", "CHINESE"];

const RecentlyReleasedSection = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section>
      <SectionHeader icon={<Clock size={18} className="text-primary" />} title="Recently Released" onViewAll={() => {}} />
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
        {recentlyReleased.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} showMeta={false} showViews />
        ))}
      </div>
    </section>
  );
};

export default RecentlyReleasedSection;
