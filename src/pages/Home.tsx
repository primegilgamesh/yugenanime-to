import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Sparkles, HeartHandshake, Plus, Flame, MessageSquareText, Star, Play } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import AnimeCard from "@/components/AnimeCard";
import SectionHeader from "@/components/SectionHeader";
import {
  heroPick,
  recentlyReleased,
  trendingAiring,
  editorsPick,
  underratedSeries,
  newOnYugen,
  mostPopular,
  getGradient,
} from "@/data/animeData";

const tabs = ["All", "SUB", "CHINESE"] as const;

const Home = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-[70px]">
        <TopBar />

        {/* Hero - Editor's Pick */}
        <Link to={`/anime/${heroPick.slug}`} className="block relative w-full h-[200px] md:h-[300px] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${heroPick.cover}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8">
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Editor&apos;s Pick</span>
            <h1 className="font-display text-xl md:text-3xl font-bold text-foreground mt-1">{heroPick.title}</h1>
            <p className="text-secondary-foreground text-xs md:text-sm mt-1 max-w-md leading-relaxed hidden md:block">
              Shinichi is a high school student of outstanding talent in detective work, is well-known for having solved several challenging cases.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1">
                <Play size={12} /> Watch Now
              </span>
              <span className="bg-muted text-foreground text-xs px-3 py-1.5 rounded-md">View Details</span>
            </div>
          </div>
        </Link>

        <div className="px-4 md:px-6 py-4 space-y-8">
          {/* Recently Released */}
          <section>
            <SectionHeader icon={Clock} title="Recently Released" />
            <div className="flex gap-2 mb-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-colors ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {recentlyReleased.map((anime, i) => (
                <AnimeCard
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  season={anime.season}
                  score={anime.score}
                  gradient={getGradient(i)}
                  variant="numbered"
                  number={i + 1}
                  subtitle={`${anime.views} • ${anime.timeAgo}`}
                />
              ))}
            </div>
          </section>

          {/* Trending Airing Series */}
          <section>
            <SectionHeader icon={TrendingUp} title="Trending Airing Series" iconColor="text-primary" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {trendingAiring.map((anime, i) => (
                <AnimeCard
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  season={anime.season}
                  score={anime.score}
                  gradient={getGradient(i)}
                />
              ))}
            </div>
          </section>

          {/* Editor's Pick */}
          <section>
            <SectionHeader icon={Sparkles} title="Editor's Pick" iconColor="text-score-star" />
            <p className="text-muted-foreground text-[11px] mb-3 -mt-2">Five of our favourite series of all times</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {editorsPick.map((anime, i) => (
                <AnimeCard
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  season={anime.season}
                  score={anime.score}
                  gradient={getGradient(i + 6)}
                />
              ))}
            </div>
          </section>

          {/* Underrated Series */}
          <section>
            <SectionHeader icon={HeartHandshake} title="Underrated Series" iconColor="text-heart" />
            <p className="text-muted-foreground text-[11px] mb-3 -mt-2">Great anime that never quite got the attention they deserve</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {underratedSeries.map((anime, i) => (
                <AnimeCard
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  season={anime.season}
                  score={anime.score}
                  gradient={getGradient(i + 3)}
                />
              ))}
            </div>
          </section>

          {/* New on YugenAnime */}
          <section>
            <SectionHeader icon={Plus} title="New on YugenAnime" iconColor="text-primary" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {newOnYugen.map((anime, i) => (
                <AnimeCard
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  season={anime.season}
                  score={anime.score}
                  gradient={getGradient(i + 9)}
                />
              ))}
            </div>
          </section>

          {/* Most Popular Series */}
          <section>
            <SectionHeader icon={Flame} title="Most Popular Series" iconColor="text-score-star" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {mostPopular.map((anime, i) => (
                <AnimeCard
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  season={anime.season}
                  score={anime.score}
                  gradient={getGradient(i)}
                  dubbed={anime.dubbed}
                />
              ))}
            </div>
          </section>

          {/* Recent Reviews */}
          <section>
            <SectionHeader icon={MessageSquareText} title="Recent YugenAnime Reviews" iconColor="text-primary" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { anime: "I've Got a Million Skill Points!", user: "MadSlime", quote: "when will this be out i kinda want to watch it so bad", time: "about 6 hours ago", likes: 0 },
                { anime: "Plastic Memories", user: "TimmyFlame", quote: "Heartfelt story with interesting takeaways", time: "about 14 hours ago", likes: 0 },
                { anime: "Kusuriya no Hitorigoto", user: "Maya_cato78", quote: "TALENTED SHIKISO LMFAOOOOOOO", time: "a day ago", likes: 7 },
                { anime: "Youkoso Jitsuryoku Shijou Shugi no Classroom e 3rd Season", user: "Treyennes", quote: "School anime at it's best", time: "a day ago", likes: 3 },
              ].map((review, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3">
                  <div className={`w-full h-24 rounded-md bg-gradient-to-br ${getGradient(i + 2)} mb-2`} />
                  <p className="text-primary text-[11px] font-medium">
                    Review of {review.anime} by {review.user}
                  </p>
                  <p className="text-secondary-foreground text-xs italic mt-1">"{review.quote}"</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground text-[10px]">{review.time}</span>
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                      👍 {review.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
