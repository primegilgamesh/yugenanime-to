import { useState } from "react";
import { Home, TrendingUp, Clock, Compass, History as HistoryIcon, Calendar, Bookmark, X, UserCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ScheduleModal from "@/components/ScheduleModal";

const Sidebar = () => {
  const { isLoggedIn } = useAuth();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const location = useLocation();

  const topItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: TrendingUp, label: "Trending", href: "/trending" },
  ];

  const browseItems = [
    { icon: Clock, label: "Recents", href: "/recents" },
    { icon: Compass, label: "Discover", href: "/discover" },
  ];

  const activityItems = [
    { icon: HistoryIcon, label: "History", href: "/history" },
  ];

  const isActive = (href: string) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const NavBtn = ({ icon: Icon, label, href }: { icon: typeof Home; label: string; href: string }) => {
    const active = isActive(href);
    return (
      <Link to={href} className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${active ? "text-primary bg-sidebar-hover" : "text-foreground hover:bg-sidebar-hover"}`}>
        <Icon size={20} />
        <span className="text-[10px]">{label}</span>
      </Link>
    );
  };

  const Divider = () => <div className="w-8 h-px bg-border my-2" />;

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-[70px] bg-sidebar-bg flex-col items-center z-50 border-r border-border hidden md:flex">
        {topItems.map((it) => <NavBtn key={it.label} {...it} />)}
        <Divider />
        {browseItems.map((it) => <NavBtn key={it.label} {...it} />)}
        <Divider />
        {activityItems.map((it) => <NavBtn key={it.label} {...it} />)}
        <button
          onClick={() => setScheduleOpen((v) => !v)}
          className={`flex flex-col items-center gap-1 py-3 px-2 w-full transition-colors ${scheduleOpen ? "text-primary bg-sidebar-hover" : "text-foreground hover:bg-sidebar-hover"}`}
        >
          <Calendar size={20} />
          <span className="text-[10px]">Schedule</span>
        </button>
        {isLoggedIn && (
          <>
            <Divider />
            <NavBtn icon={Bookmark} label="List" href="/my-list" />
            <NavBtn icon={UserCircle2} label="Profile" href="/profile" />
          </>
        )}
      </aside>

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
