import { useState } from "react";
import { Home, TrendingUp, Clock, Compass, History, Calendar, List, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ScheduleModal from "@/components/ScheduleModal";

const Sidebar = () => {
  const { isLoggedIn } = useAuth();
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: TrendingUp, label: "Trending", href: "/trending" },
    { icon: Clock, label: "Recents", href: "/recents" },
    { icon: Compass, label: "Discover", href: "/" },
    { icon: History, label: "History", href: "/" },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-[70px] bg-sidebar-bg flex-col items-center pt-4 z-50 border-r border-border hidden md:flex">
        {navItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            to={href}
            className="flex flex-col items-center gap-1 py-3 px-2 w-full text-sidebar-fg hover:text-foreground hover:bg-sidebar-hover transition-colors"
          >
            <Icon size={20} />
            <span className="text-[10px]">{label}</span>
          </Link>
        ))}
        <button
          onClick={() => setScheduleOpen((v) => !v)}
          className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${scheduleOpen ? "text-foreground bg-sidebar-hover" : "text-sidebar-fg hover:text-foreground hover:bg-sidebar-hover"}`}
        >
          <Calendar size={20} />
          <span className="text-[10px]">Schedule</span>
        </button>
        {isLoggedIn && (
          <Link to="/" className="flex flex-col items-center gap-1 py-3 px-2 w-full text-sidebar-fg hover:text-foreground hover:bg-sidebar-hover transition-colors">
            <List size={20} />
            <span className="text-[10px]">List</span>
          </Link>
        )}
      </aside>

      {/* Desktop schedule panel attached to sidebar */}
      {scheduleOpen && (
        <>
          <div className="fixed inset-0 z-[45] hidden md:block" onClick={() => setScheduleOpen(false)} />
          <div className="fixed left-[70px] top-0 h-full w-80 z-[55] bg-card border-r border-border shadow-xl overflow-y-auto hidden md:block">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-foreground font-display font-bold text-lg">Release Schedule</h2>
                <button onClick={() => setScheduleOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
              </div>
              <ScheduleModal />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
