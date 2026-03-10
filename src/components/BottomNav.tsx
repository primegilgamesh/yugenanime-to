import { Home, TrendingUp, Clock, Compass, PlusCircle } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: TrendingUp, label: "Trending" },
  { icon: PlusCircle, label: "" },
  { icon: Clock, label: "Recents" },
  { icon: Compass, label: "Discover" },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-14 bg-card border-t border-border flex items-center justify-around z-50 md:hidden">
    {navItems.map(({ icon: Icon, label }, i) => (
      <button
        key={i}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
          i === 2
            ? "text-primary"
            : "text-sidebar-fg hover:text-foreground"
        }`}
      >
        <Icon size={i === 2 ? 28 : 20} />
        {label && <span className="text-[10px]">{label}</span>}
      </button>
    ))}
  </nav>
);

export default BottomNav;
