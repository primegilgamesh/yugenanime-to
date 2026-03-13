import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

const Home = () => (
  <div className="min-h-screen bg-background pb-14 md:pb-0">
    <Sidebar />
    <BottomNav />
    <div className="md:ml-[70px]">
      <TopBar />
      <div className="p-6 md:p-10">
        <h1 className="font-display text-3xl font-bold mb-4">Welcome to YugenAnime</h1>
        <p className="text-secondary-foreground text-sm leading-relaxed max-w-xl mb-8">
          Discover, track, and discuss your favorite anime. Browse trending titles, keep up with new releases, and connect with the community.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Trending", "New Releases", "Top Rated", "Popular", "Upcoming", "Genres"].map((item) => (
            <div
              key={item}
              className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <span className="text-foreground font-semibold text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
