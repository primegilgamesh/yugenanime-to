import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Sparkles, HeartHandshake, Plus, Flame, MessageSquareText, Star, Play, ChevronLeft, ChevronRight, Languages, ThumbsUp } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import SectionHeader from "@/components/SectionHeader";
import {
  heroPicks,
  recentlyReleased,
  trendingAiring,
  editorsPick,
  underratedSeries,
  newOnYugen,
  mostPopular,
  getGradient,
} from "@/data/animeData";

const tabs = ["All", "SUB", "CHINESE"] as const;

const reviews = [
  { anime: "I've Got a Million Skill Points!", user: "MadSlime", quote: "when will this be out i kinda want to watch it so bad its hurting my last brain cell, c'mon guys release it already, i cannnot", time: "about 6 hours ago", likes: 0, gradient: 2 },
  { anime: "Plastic Memories", user: "TimmyFlame", quote: "Heartfelt story with interesting takeaways", time: "about 14 hours ago", likes: 0, gradient: 5 },
  { anime: "Kusuriya no Hitorigoto", user: "Maya_cato78", quote: "TALENTED SHIKISO LMFAOOOOOOO", time: "a day ago", likes: 7, gradient: 1 },
  { anime: "Youkoso Jitsuryoku Shijou Shugi no Classroom e 3rd Season", user: "Treyennes", quote: "School anime at it's best", time: "a day ago", likes: 3, gradient: 8 },
  { anime: "Sousou no Frieren", user: "AniChiwa", quote: "Best anime in this genre!", time: "a day ago", likes: 0, gradient: 0 },
  { anime: "I've Got a Million Skill Points!", user: "NightShade587", quote: "Some descriptions, I should be clear, the anime is alright because it currently has no description.", time: "2 days ago", likes: 1, gradient: 3 },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPicks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-[70px]">
        <TopBar />

        {/* Hero - Editor's Pick Slideshow */}
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
          {heroPicks.map((pick, i) => (
            <Link
              key={pick.slug}
              to={`/anime/${pick.slug}`}
              className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pick.cover}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8">
                <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Editor&apos;s Pick</span>
                <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mt-1">{pick.title}</h2>
                <p className="text-secondary-foreground text-xs md:text-sm mt-1 max-w-md leading-relaxed hidden md:block">
                  {pick.synopsis?.slice(0, 160)}...
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1">
                    <Play size={12} /> Watch Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {/* Slide controls */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 flex items-center gap-2">
            <button onClick={() => setCurrentSlide((p) => (p - 1 + heroPicks.length) % heroPicks.length)} className="bg-background/50 text-foreground p-1 rounded-full hover:bg-background/80 transition"><ChevronLeft size={16} /></button>
            <span className="text-foreground text-xs">{currentSlide + 1}/{heroPicks.length}</span>
            <button onClick={() => setCurrentSlide((p) => (p + 1) % heroPicks.length)} className="bg-background/50 text-foreground p-1 rounded-full hover:bg-background/80 transition"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="px-4 md:px-6 py-4 space-y-8">
          {/* Recently Released - Episode cards */}
          <section>
            <SectionHeader icon={Clock} title="Recently Released" />
            <div className="flex gap-2 mb-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-colors ${
                    activeTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {recentlyReleased.map((anime, i) => (
                <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                  <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(i)} aspect-video`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded">
                      EP {anime.episodes}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-background/80 text-foreground text-[9px] px-1 py-0.5 rounded">
                      24:00
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-foreground text-[11px] font-medium leading-tight group-hover:text-primary transition-colors">{i + 1} · {anime.title}</p>
                    <p className="text-muted-foreground text-[9px] mt-0.5">{anime.season} · {anime.episodes} Episodes</p>
                    <p className="text-muted-foreground text-[9px]">{anime.views} · {anime.timeAgo}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Trending Airing Series */}
          <section>
            <SectionHeader icon={TrendingUp} title="Trending Airing Series" iconColor="text-primary" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {trendingAiring.map((anime, i) => (
                <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                  <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(i)} aspect-[3/4]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-foreground text-xs font-semibold leading-tight truncate">{anime.title}</p>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-foreground text-xs font-medium truncate group-hover:text-primary transition-colors">{anime.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {anime.season && <span className="text-muted-foreground text-[10px]">{anime.season}</span>}
                      {anime.score && <span className="flex items-center gap-0.5 text-score-star text-[10px]"><Star size={9} fill="currentColor" /> {anime.score.toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Editor's Pick */}
          <section>
            <SectionHeader icon={Sparkles} title="Editor's Pick" iconColor="text-score-star" />
            <p className="text-muted-foreground text-[11px] mb-3 -mt-2">Five of our favourite series of all times</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {editorsPick.map((anime, i) => (
                <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                  <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(i + 6)} aspect-[3/4]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    {anime.dubbed && <div className="absolute bottom-1.5 left-1.5 bg-card/80 text-foreground text-[9px] flex items-center gap-0.5 px-1.5 py-0.5 rounded"><Languages size={10} /> Dub</div>}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-foreground text-xs font-semibold leading-tight truncate">{anime.title}</p>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-foreground text-xs font-medium truncate group-hover:text-primary transition-colors">{anime.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {anime.season && <span className="text-muted-foreground text-[10px]">{anime.season}</span>}
                      {anime.score && <span className="flex items-center gap-0.5 text-score-star text-[10px]"><Star size={9} fill="currentColor" /> {anime.score.toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Underrated Series */}
          <section>
            <SectionHeader icon={HeartHandshake} title="Underrated Series" iconColor="text-heart" />
            <p className="text-muted-foreground text-[11px] mb-3 -mt-2">Great anime that never quite got the attention they deserve</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {underratedSeries.map((anime, i) => (
                <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                  <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(i + 3)} aspect-[3/4]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-foreground text-xs font-semibold leading-tight truncate">{anime.title}</p>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-foreground text-xs font-medium truncate group-hover:text-primary transition-colors">{anime.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {anime.season && <span className="text-muted-foreground text-[10px]">{anime.season}</span>}
                      {anime.score && <span className="flex items-center gap-0.5 text-score-star text-[10px]"><Star size={9} fill="currentColor" /> {anime.score.toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* New on YugenAnime */}
          <section>
            <SectionHeader icon={Plus} title="New on YugenAnime" iconColor="text-primary" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {newOnYugen.map((anime, i) => (
                <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                  <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(i + 9)} aspect-[3/4]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-foreground text-xs font-semibold leading-tight truncate">{anime.title}</p>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-foreground text-xs font-medium truncate group-hover:text-primary transition-colors">{anime.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {anime.season && <span className="text-muted-foreground text-[10px]">{anime.season}</span>}
                      {anime.score && <span className="flex items-center gap-0.5 text-score-star text-[10px]"><Star size={9} fill="currentColor" /> {anime.score.toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Most Popular Series */}
          <section>
            <SectionHeader icon={Flame} title="Most Popular Series" iconColor="text-score-star" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {mostPopular.map((anime, i) => (
                <Link to={`/anime/${anime.slug}`} key={anime.slug} className="group block">
                  <div className={`relative rounded-md overflow-hidden bg-gradient-to-br ${getGradient(i)} aspect-[3/4]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    {anime.dubbed && <div className="absolute bottom-1.5 left-1.5 bg-card/80 text-foreground text-[9px] flex items-center gap-0.5 px-1.5 py-0.5 rounded"><Languages size={10} /> Available in Dub</div>}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-foreground text-xs font-semibold leading-tight truncate">{anime.title}</p>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-foreground text-xs font-medium truncate group-hover:text-primary transition-colors">{anime.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {anime.season && <span className="text-muted-foreground text-[10px]">{anime.season}</span>}
                      {anime.score && <span className="flex items-center gap-0.5 text-score-star text-[10px]"><Star size={9} fill="currentColor" /> {anime.score.toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Reviews */}
          <section>
            <SectionHeader icon={MessageSquareText} title="Recent YugenAnime Reviews" iconColor="text-primary" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reviews.map((review, i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className={`w-full h-28 bg-gradient-to-br ${getGradient(review.gradient)}`} />
                  <div className="p-3">
                    <p className="text-primary text-[11px] font-medium">
                      Review of {review.anime} by {review.user}
                    </p>
                    <p className="text-secondary-foreground text-xs italic mt-1">"{review.quote}"</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-muted-foreground text-[10px]">{review.time}</span>
                      <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                        <ThumbsUp size={10} /> {review.likes}
                      </span>
                    </div>
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
