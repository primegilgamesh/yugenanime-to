import { Search, MessageCircle } from "lucide-react";

const TopBar = () => (
  <header className="h-12 bg-card flex items-center px-4 gap-4 border-b border-border">
    <span className="text-primary font-display font-bold text-base mr-4">✦ YugenAnime</span>
    <div className="flex-1 max-w-md hidden md:block">
      <div className="flex items-center bg-secondary rounded-md px-3 py-1.5 gap-2">
        <Search size={14} className="text-muted-foreground" />
        <input
          placeholder="Search"
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>
    </div>
    <div className="ml-auto flex items-center gap-3">
      <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
        <Search size={18} />
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <MessageCircle size={18} />
      </button>
      <button className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md hover:opacity-90 transition">
        Sign in
      </button>
    </div>
  </header>
);

export default TopBar;
