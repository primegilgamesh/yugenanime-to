import { Home, TrendingUp, Clock, Compass, History, Calendar } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: TrendingUp, label: "Trending" },
  { icon: Clock, label: "Recents" },
  { icon: Compass, label: "Discover" },
  { icon: History, label: "History" },
  { icon: Calendar, label: "Schedule" },
];

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-[70px] bg-sidebar-bg flex flex-col items-center pt-4 z-50 border-r border-border">
    <div className="text-primary font-display font-bold text-lg mb-6">Y</div>
    {navItems.map(({ icon: Icon, label }) => (
      <button
        key={label}
        className="flex flex-col items-center gap-1 py-3 px-2 w-full text-sidebar-fg hover:text-foreground hover:bg-sidebar-hover transition-colors"
      >
        <Icon size={20} />
        <span className="text-[10px]">{label}</span>
      </button>
    ))}
  </aside>
);

export default Sidebar;
