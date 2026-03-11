import { TrendingUp, Sparkles, Star, Plus, Flame } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import HomeHero from "@/components/home/HomeHero";
import RecentlyReleasedSection from "@/components/home/RecentlyReleasedSection";
import AnimeRow from "@/components/home/AnimeRow";
import HomeReviews from "@/components/home/HomeReviews";
import {
  trendingAiring,
  editorsPick,
  underratedSeries,
  newOnYugen,
  mostPopular,
} from "@/data/homeData";

const HomePage = () => (
  <div className="min-h-screen bg-background pb-14 md:pb-0">
    <Sidebar />
    <BottomNav />
    <div className="md:ml-[70px]">
      <TopBar />
      <HomeHero />
      <div className="px-4 md:px-6 py-6 space-y-10">
        <RecentlyReleasedSection />
        <AnimeRow
          icon={<TrendingUp size={18} className="text-primary" />}
          title="Trending Airing Series"
          items={trendingAiring}
        />
        <AnimeRow
          icon={<Sparkles size={18} className="text-primary" />}
          title="Editor's Pick"
          subtitle="Five of our favourite series of all time."
          items={editorsPick}
          showDubBadge
        />
        <AnimeRow
          icon={<Star size={18} className="text-primary" />}
          title="Underrated Series"
          subtitle="Great anime that should get the attention they deserve."
          items={underratedSeries}
        />
        <AnimeRow
          icon={<Plus size={18} className="text-primary" />}
          title="New on YugenAnime"
          items={newOnYugen}
        />
        <AnimeRow
          icon={<Flame size={18} className="text-primary" />}
          title="Most Popular Series"
          items={mostPopular}
          showDubBadge
        />
        <HomeReviews />
      </div>
    </div>
  </div>
);

export default HomePage;
