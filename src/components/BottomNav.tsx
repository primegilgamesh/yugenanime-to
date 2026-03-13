import { useState } from "react";
import { Home, TrendingUp, Clock, Compass, PlusCircle, X, History, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const trayLinks = [
  { icon: History, label: "History", href: "/history" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
];

const BottomNav = () => {
  const [trayOpen, setTrayOpen] = useState(false);

  return (
    <>
      {trayOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={() => setTrayOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 right-0 bottom-14 z-[70] md:hidden transition-transform duration-300 ${
          trayOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-card border-t border-border rounded-t-xl px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground font-semibold text-lg">Navigation</h3>
            <button
              onClick={() => setTrayOpen(false)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-1">
            {trayLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                to={href}
                onClick={() => setTrayOpen(false)}
                className="flex items-center gap-3 py-2.5 px-2 rounded-md text-foreground hover:bg-accent transition-colors"
              >
                <Icon size={20} className="text-muted-foreground" />
                <span className="text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-card border-t border-border flex items-center justify-around z-[80] md:hidden">
        <Link to="/" className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <Home size={20} />
          <span className="text-[10px]">Home</span>
        </Link>
        <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <TrendingUp size={20} />
          <span className="text-[10px]">Trending</span>
        </button>
        <button
          onClick={() => setTrayOpen((v) => !v)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 text-primary transition-colors"
        >
          <PlusCircle size={28} />
        </button>
        <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <Clock size={20} />
          <span className="text-[10px]">Recents</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-sidebar-fg hover:text-foreground transition-colors">
          <Compass size={20} />
          <span className="text-[10px]">Discover</span>
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
