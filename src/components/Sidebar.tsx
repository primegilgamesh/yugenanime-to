import { Home, TrendingUp, Clock, Compass, History, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: TrendingUp, label: "Trending", href: "/" },
  { icon: Clock, label: "Recents", href: "/" },
  { icon: Compass, label: "Discover", href: "/" },
  { icon: History, label: "History", href: "/history" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
];

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-[70px] bg-sidebar-bg flex-col items-center pt-4 z-50 border-r border-border hidden md:flex">
    <div className="text-primary font-display font-bold text-lg mb-6">Y</div>
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
  </aside>
);

export default Sidebar;
