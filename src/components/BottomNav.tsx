import { useState } from "react";
import { Home, TrendingUp, Clock, Compass, PlusCircle, X, History, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ScheduleModal from "@/components/ScheduleModal";

const BottomNav = () => {
  const [trayOpen, setTrayOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

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
            <Link to="/" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors">
              <History size={20} className="text-muted-foreground" />
              <span className="text-sm">History</span>
            </Link>
            <button onClick={() => { setTrayOpen(false); setScheduleOpen(true); }} className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors w-full">
              <Calendar size={20} className="text-muted-foreground" />
              <span className="text-sm">Schedule</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-card border-t border-border flex items-center justify-around z-[80] md:hidden">
        <Link to="/" className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <Home size={20} />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link to="/trending" className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <TrendingUp size={20} />
          <span className="text-[10px]">Trending</span>
        </Link>
        <button onClick={() => setTrayOpen((v) => !v)} className="flex flex-col items-center gap-0.5 py-1 px-3 text-primary transition-colors">
          <PlusCircle size={28} />
        </button>
        <Link to="/recents" className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <Clock size={20} />
          <span className="text-[10px]">Recents</span>
        </Link>
        <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <Compass size={20} />
          <span className="text-[10px]">Discover</span>
        </button>
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
