import { useState } from "react";
import { Home, TrendingUp, Clock, Compass, PlusCircle, X, History as HistoryIcon, Calendar, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ScheduleModal from "@/components/ScheduleModal";
import { useAuth } from "@/contexts/AuthContext";

const BottomNav = () => {
  const [trayOpen, setTrayOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const isActive = (href: string) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  const linkClass = (href: string) =>
    `flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${isActive(href) ? "text-primary" : "text-foreground"}`;

  return (
    <>
      {trayOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] md:hidden" onClick={() => setTrayOpen(false)} />
      )}

      <div className={`fixed left-0 right-0 bottom-14 z-[70] md:hidden transition-transform duration-300 ${trayOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-card border-t border-border rounded-t-xl px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground font-semibold text-lg">Navigation</h3>
            <button onClick={() => setTrayOpen(false)} className="text-muted-foreground hover:text-foreground p-1"><X size={20} /></button>
          </div>
          <div className="space-y-1">
            <Link to="/history" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors">
              <HistoryIcon size={20} className="text-muted-foreground" />
              <span className="text-sm">History</span>
            </Link>
            <button onClick={() => { setTrayOpen(false); setScheduleOpen(true); }} className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors w-full">
              <Calendar size={20} className="text-muted-foreground" />
              <span className="text-sm">Schedule</span>
            </button>
            {isLoggedIn && (
              <>
                <Link to="/my-list" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors">
                  <User size={20} className="text-muted-foreground" />
                  <span className="text-sm">My List</span>
                </Link>
                <Link to="/profile" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors">
                  <User size={20} className="text-muted-foreground" />
                  <span className="text-sm">Profile</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-card border-t border-border flex items-center justify-around z-[80] md:hidden">
        <Link to="/" className={linkClass("/")}>
          <Home size={20} />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link to="/trending" className={linkClass("/trending")}>
          <TrendingUp size={20} />
          <span className="text-[10px]">Trending</span>
        </Link>
        <button onClick={() => setTrayOpen((v) => !v)} className="flex flex-col items-center gap-0.5 py-1 px-3 text-foreground transition-colors">
          <PlusCircle size={28} />
        </button>
        <Link to="/recents" className={linkClass("/recents")}>
          <Clock size={20} />
          <span className="text-[10px]">Recents</span>
        </Link>
        <Link to="/discover" className={linkClass("/discover")}>
          <Compass size={20} />
          <span className="text-[10px]">Discover</span>
        </Link>
      </nav>

      {/* Mobile schedule modal */}
      {scheduleOpen && (
        <div className="fixed inset-0 z-[100] bg-background md:hidden overflow-y-auto">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground font-display font-bold text-xl">Release Schedule</h2>
              <button onClick={() => setScheduleOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={24} /></button>
            </div>
            <ScheduleModal />
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
