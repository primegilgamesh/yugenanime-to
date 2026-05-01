const tabs = ["Overview", "Watch", "Reviews"];

interface AnimeTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AnimeTabs = ({ activeTab, onTabChange }: AnimeTabsProps) => (
  <div className="border-b border-border">
    {/* Mobile: spread evenly with original alignment */}
    <div className="flex md:hidden">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`py-3 text-sm font-medium transition-colors relative ${
            i === 0 ? "text-left px-4" : i === 1 ? "px-8 mx-auto" : "ml-auto px-4"
          } ${
            activeTab === tab ? "text-tab-active" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-tab-active" />
          )}
        </button>
      ))}
    </div>
    {/* Desktop: centered with spacing */}
    <div className="hidden md:flex justify-center gap-16 lg:gap-24">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`py-3 px-2 text-sm font-medium transition-colors relative ${
            activeTab === tab ? "text-tab-active" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-tab-active" />
          )}
        </button>
      ))}
    </div>
  </div>
);

export default AnimeTabs;
