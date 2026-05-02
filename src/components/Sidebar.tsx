import { useState } from "react";
import { Home, TrendingUp, Clock, Compass, History as HistoryIcon, Calendar, List, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ScheduleModal from "@/components/ScheduleModal";

const Sidebar = () => {
  const { isLoggedIn } = useAuth();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: TrendingUp, label: "Trending", href: "/trending" },
    { icon: Clock, label: "Recents", href: "/recents" },
    { icon: Compass, label: "Discover", href: "/discover" },
    { icon: HistoryIcon, label: "History", href: "/history" },
  ];

  const isActive = (href: string) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-[70px] bg-sidebar-bg flex-col items-center pt-4 z-50 border-r border-border hidden md:flex">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              to={href}
              className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${active ? "text-primary bg-sidebar-hover" : "text-foreground hover:bg-sidebar-hover"}`}
            >
              <Icon size={20} />
              <span className="text-[10px]">{label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setScheduleOpen((v) => !v)}
          className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${scheduleOpen ? "text-primary bg-sidebar-hover" : "text-foreground hover:bg-sidebar-hover"}`}
        >
          <Calendar size={20} />
          <span className="text-[10px]">Schedule</span>
        </button>
        {isLoggedIn && (
          <Link to="/my-list" className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${isActive("/my-list") ? "text-primary bg-sidebar-hover" : "text-foreground hover:bg-sidebar-hover"}`}>
            <List size={20} />
            <span className="text-[10px]">List</span>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/profile" className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${isActive("/profile") ? "text-primary bg-sidebar-hover" : "text-foreground hover:bg-sidebar-hover"}`}>
            <User size={20} />
            <span className="text-[10px]">Profile</span>
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
