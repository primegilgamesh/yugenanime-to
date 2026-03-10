import { useState } from "react";

const tabs = ["Overview", "Watch", "Reviews"];

interface AnimeTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AnimeTabs = ({ activeTab, onTabChange }: AnimeTabsProps) => (
  <div className="flex border-b border-border">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`px-6 py-3 text-sm font-medium transition-colors relative ${
          activeTab === tab
            ? "text-tab-active"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {tab}
        {activeTab === tab && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-tab-active" />
        )}
      </button>
    ))}
  </div>
);

export default AnimeTabs;
